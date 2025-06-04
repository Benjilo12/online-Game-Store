import { Loader, PlusCircle, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["action", "adventure", "sports", "shooter", "simulation"];
const platforms = ["PC", "PS5", "Xbox", "Nintendo Switch", "PS4", "Mobile"];

function CreateProductForm() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    platform: [],
    image: null,
  });

  const { createProduct, loading } = useProductStore();

  const handlePlatformChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setNewProduct((prev) => ({
      ...prev,
      platform: checked
        ? [...prev.platform, value]
        : prev.platform.filter((p) => p !== value),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed!");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;
      setNewProduct((prev) => ({
        ...prev,
        image: base64Image,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!newProduct.image) {
        alert("Please upload an image.");
        return;
      }

      await createProduct(newProduct);

      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        platform: [],
        image: null,
      });

      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-emerald-300 text-center">
        Create New Game
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Game Name
          </label>
          <input
            type="text"
            id="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            rows="3"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-300"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            step="0.01"
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300"
          >
            Category
          </label>
          <select
            id="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Platform
          </label>
          <div className="grid grid-cols-2 gap-2">
            {platforms.map((plat) => (
              <label
                key={plat}
                className="text-gray-300 flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  value={plat}
                  checked={newProduct.platform.includes(plat)}
                  onChange={handlePlatformChange}
                  className="text-emerald-500"
                />
                <span>{plat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-1 flex items-center space-x-4">
          <input
            type="file"
            id="image"
            accept="image/*"
            className="sr-only"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>

          {newProduct.image && (
            <div className="flex items-center space-x-2">
              <img
                src={newProduct.image}
                alt="Preview"
                className="w-16 h-16 object-cover rounded"
              />
              <span className="text-sm text-green-400">Image ready ✅</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="mr-2 h-5 w-5 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Game
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default CreateProductForm;
