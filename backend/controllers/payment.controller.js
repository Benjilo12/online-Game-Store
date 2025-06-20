import { stripe } from "../lib/stripe.js";
import Order from "../models/order.model.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products } = req.body;

    // Validate the products array
    if (!Array.isArray(products)) {
      return res.status(400).json({ error: "Products must be an array" });
    }

    // Create minimal product data for metadata
    const minimalProducts = products.map((product) => ({
      id: product._id,
      quantity: product.quantity || 1,
      price: product.price,
    }));

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100), // Convert to cents
      },
      quantity: product.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      metadata: {
        userId: req.user._id.toString(),
        products: JSON.stringify(minimalProducts), // Store minimal product data
        productCount: products.length, // Additional useful metadata
        totalAmount: products.reduce(
          (sum, product) => sum + product.price * (product.quantity || 1),
          0
        ),
      },
    });

    // Return the session ID
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({
      error: error.message,
      details:
        error.type === "StripeInvalidRequestError"
          ? "Metadata too large - simplified product data"
          : undefined,
    });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // create a new Order
    const products = JSON.parse(session.metadata.products);
    const newOrder = new Order({
      user: session.metadata.userId,
      products: products.map((product) => ({
        product: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount: session.amount_total / 100, // convert from cents to dollars,
      stripeSessionId: sessionId,
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Payment successful, order created.",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};
