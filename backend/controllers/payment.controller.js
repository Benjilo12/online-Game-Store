import { stripe } from "../lib/stripe.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products } = req.body;

    // Validate the products array
    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid  or empty products array" });
    }

    let totalAmount = 0;

    // Validate each product
    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100); // Convert to cents
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity,
      };
    });

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: ` ${process.env.CLIENT_URL}/purchase-cancel`,
      metadata: {
        userId: req.user._id.toString(),
      },
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({ error: "Internal server error" });
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
