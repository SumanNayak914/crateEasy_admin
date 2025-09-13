import { useState } from "react";

const dummyProducts = [
  { 
    id: 1, 
    name: "T-Shirt", 
    description: "A cool cotton T-shirt", 
    price: 499, 
    stock: 20, 
    category: "Clothing", 
    images: [] 
  },
  { 
    id: 2, 
    name: "Sneakers", 
    description: "Comfortable running sneakers", 
    price: 1999, 
    stock: 10, 
    category: "Footwear", 
    images: [] 
  },
  { 
    id: 3, 
    name: "Watch", 
    description: "Stylish wrist watch", 
    price: 2999, 
    stock: 5, 
    category: "Accessories", 
    images: [] 
  },
];

export default function Products() {
  const [products, setProducts] = useState(dummyProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    images: [],
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 8), // Max 8 images
    }));
  };

  // Add or Update Product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...editingProduct, ...formData } : p
        )
      );
    } else {
      const newProduct = {
        id: products.length + 1,
        ...formData,
      };
      setProducts((prev) => [...prev, newProduct]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      images: [],
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-semibold"
        >
          + Add Product
        </button>
      </div>

      {/* Product Form */}
      {showForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50 shadow-md relative">
          {/* X Close Button */}
          <button
            onClick={resetForm}
            className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-7 h-7 flex items-center justify-center font-bold"
          >
            &times;
          </button>

          <h2 className="text-xl font-semibold mb-4">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Image Upload Box */}
            <div>
              <label className="block font-semibold mb-2">Images (1-8)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg h-64 flex flex-wrap p-2 gap-2 relative">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24">
                    <img
                      src={img.url}
                      alt="preview"
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== idx),
                        }))
                      }
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                    >
                      x
                    </button>
                  </div>
                ))}

                {/* Add more images button */}
                {formData.images.length < 8 && (
                  <label className="flex items-center justify-center w-24 h-24 border-2 border-gray-300 rounded cursor-pointer text-gray-400 text-3xl hover:border-gray-500">
                    +
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                You can upload 1 to 8 images.
              </p>
            </div>

            {/* Other Fields */}
            <div>
              <label className="block font-semibold">Title</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex space-x-4">
              <div>
                <label className="block font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                {editingProduct ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Images</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{p.id}</td>
                <td className="px-6 py-3">{p.name}</td>
                <td className="px-6 py-3">{p.category}</td>
                <td className="px-6 py-3">₹{p.price}</td>
                <td className="px-6 py-3">{p.stock}</td>
                <td className="px-6 py-3 flex space-x-2">
                  {p.images?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.url || URL.createObjectURL(img.file)}
                      alt="product"
                      className="h-10 w-10 object-cover rounded"
                    />
                  ))}
                </td>
                <td className="px-6 py-3 space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
