// import { useState } from "react";

// const dummyProducts = [
//   { 
//     id: 1, 
//     name: "T-Shirt", 
//     description: "A cool cotton T-shirt", 
//     price: 499, 
//     stock: 20, 
//     category: "Clothing", 
//     images: [] 
//   },
//   { 
//     id: 2, 
//     name: "Sneakers", 
//     description: "Comfortable running sneakers", 
//     price: 1999, 
//     stock: 10, 
//     category: "Footwear", 
//     images: [] 
//   },
//   { 
//     id: 3, 
//     name: "Watch", 
//     description: "Stylish wrist watch", 
//     price: 2999, 
//     stock: 5, 
//     category: "Accessories", 
//     images: [] 
//   },
// ];

// export default function Products() {
//   const [products, setProducts] = useState(dummyProducts);
//   const [showForm, setShowForm] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "",
//     price: "",
//     stock: "",
//     images: [],
//   });

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle image upload
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => ({
//       file,
//       url: URL.createObjectURL(file),
//     }));
//     setFormData((prev) => ({
//       ...prev,
//       images: [...prev.images, ...newImages].slice(0, 8), // Max 8 images
//     }));
//   };

//   // Add or Update Product
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingProduct) {
//       setProducts((prev) =>
//         prev.map((p) =>
//           p.id === editingProduct.id ? { ...editingProduct, ...formData } : p
//         )
//       );
//     } else {
//       const newProduct = {
//         id: products.length + 1,
//         ...formData,
//       };
//       setProducts((prev) => [...prev, newProduct]);
//     }
//     resetForm();
//   };

//   const resetForm = () => {
//     setFormData({
//       name: "",
//       description: "",
//       category: "",
//       price: "",
//       stock: "",
//       images: [],
//     });
//     setEditingProduct(null);
//     setShowForm(false);
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setFormData(product);
//     setShowForm(true);
//   };

//   const handleDelete = (id) => {
//     setProducts((prev) => prev.filter((p) => p.id !== id));
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Products</h1>

//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-semibold"
//         >
//           + Add Product
//         </button>
//       </div>

//       {/* Product Form */}
//       {showForm && (
//         <div className="mb-6 p-4 border rounded-lg bg-gray-50 shadow-md relative">
//           {/* X Close Button */}
//           <button
//             onClick={resetForm}
//             className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full w-7 h-7 flex items-center justify-center font-bold"
//           >
//             &times;
//           </button>

//           <h2 className="text-xl font-semibold mb-4">
//             {editingProduct ? "Edit Product" : "Add Product"}
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
            
//             {/* Image Upload Box */}
//             <div>
//               <label className="block font-semibold mb-2">Images (1-8)</label>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg h-64 flex flex-wrap p-2 gap-2 relative">
//                 {formData.images.map((img, idx) => (
//                   <div key={idx} className="relative w-24 h-24">
//                     <img
//                       src={img.url}
//                       alt="preview"
//                       className="w-full h-full object-cover rounded"
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           images: prev.images.filter((_, i) => i !== idx),
//                         }))
//                       }
//                       className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
//                     >
//                       x
//                     </button>
//                   </div>
//                 ))}

//                 {/* Add more images button */}
//                 {formData.images.length < 8 && (
//                   <label className="flex items-center justify-center w-24 h-24 border-2 border-gray-300 rounded cursor-pointer text-gray-400 text-3xl hover:border-gray-500">
//                     +
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleImageChange}
//                     />
//                   </label>
//                 )}
//               </div>
//               <p className="text-sm text-gray-500 mt-1">
//                 You can upload 1 to 8 images.
//               </p>
//             </div>

//             {/* Other Fields */}
//             <div>
//               <label className="block font-semibold">Title</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded px-3 py-2"
//               />
//             </div>
//             <div>
//               <label className="block font-semibold">Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded px-3 py-2"
//               />
//             </div>
//             <div>
//               <label className="block font-semibold">Category</label>
//               <input
//                 type="text"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded px-3 py-2"
//               />
//             </div>
//             <div className="flex space-x-4">
//               <div>
//                 <label className="block font-semibold">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   required
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//               <div>
//                 <label className="block font-semibold">Stock</label>
//                 <input
//                   type="number"
//                   name="stock"
//                   value={formData.stock}
//                   onChange={handleChange}
//                   required
//                   className="w-full border rounded px-3 py-2"
//                 />
//               </div>
//             </div>

//             {/* Submit Buttons */}
//             <div className="flex space-x-2">
//               <button
//                 type="submit"
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//               >
//                 {editingProduct ? "Update" : "Add"}
//               </button>
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Products Table */}
//       <div className="overflow-x-auto bg-white rounded-xl shadow-md">
//         <table className="min-w-full">
//           <thead className="bg-gray-100 text-gray-600 text-left">
//             <tr>
//               <th className="px-6 py-3">ID</th>
//               <th className="px-6 py-3">Title</th>
//               <th className="px-6 py-3">Category</th>
//               <th className="px-6 py-3">Price</th>
//               <th className="px-6 py-3">Stock</th>
//               <th className="px-6 py-3">Images</th>
//               <th className="px-6 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((p) => (
//               <tr key={p.id} className="border-b hover:bg-gray-50">
//                 <td className="px-6 py-3">{p.id}</td>
//                 <td className="px-6 py-3">{p.name}</td>
//                 <td className="px-6 py-3">{p.category}</td>
//                 <td className="px-6 py-3">₹{p.price}</td>
//                 <td className="px-6 py-3">{p.stock}</td>
//                 <td className="px-6 py-3 flex space-x-2">
//                   {p.images?.map((img, idx) => (
//                     <img
//                       key={idx}
//                       src={img.url || URL.createObjectURL(img.file)}
//                       alt="product"
//                       className="h-10 w-10 object-cover rounded"
//                     />
//                   ))}
//                 </td>
//                 <td className="px-6 py-3 space-x-2">
//                   <button
//                     onClick={() => handleEdit(p)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(p.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";

const dummyProducts = [
  { 
    id: 1, 
    name: "Coca Cola 250ml", 
    description: "Refreshing cola drink", 
    price: 20, 
    stock: 100, 
    category: "Coca Cola", 
    boxSize: "1 box",
    images: [] 
  },
  { 
    id: 2, 
    name: "Pepsi 500ml", 
    description: "Cool refreshing pepsi", 
    price: 40, 
    stock: 50, 
    category: "Pepsi", 
    boxSize: "0.50 box",
    images: [] 
  },
  { 
    id: 3, 
    name: "Sprite 300ml", 
    description: "Lemon-lime flavored drink", 
    price: 25, 
    stock: 75, 
    category: "Sprite", 
    boxSize: "0.25 box",
    images: [] 
  },
];

const categoryOptions = [
  "Coca Cola", 
  "Pepsi", 
  "Sprite", 
  "Fanta", 
  "Thumbs Up", 
  "Limca", 
  "Mountain Dew", 
  "7UP", 
  "Mirinda", 
  "Maaza",
  "Frooti",
  "Real Juice",
  "Minute Maid",
  "Kinley",
  "Aquafina",
  "Bisleri"
];
const boxSizeOptions = ["0.25 box", "0.50 box", "1 box"];

export default function Products() {
  const [products, setProducts] = useState(dummyProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    boxSize: "",
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
      boxSize: "",
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
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">🛍️ Products Management</h1>
          <p className="text-gray-600 mt-1">Manage your colddrink inventory with ease</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
        >
          ➕ Add New Product
        </button>
      </div>

      {/* Product Form */}
      {showForm && (
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-100 relative">
          {/* X Close Button */}
          <button
            onClick={resetForm}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg shadow-md transition-all duration-200 hover:scale-110"
          >
            ×
          </button>

          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-lg mr-3 text-lg">
              {editingProduct ? "✏️" : "➕"}
            </span>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Column - Image Upload */}
            <div>
              <label className="block font-semibold mb-3 text-gray-700 text-lg">📸 Product Images (1-8)</label>
              <div className="border-2 border-dashed border-blue-300 rounded-xl h-64 flex flex-wrap p-3 gap-3 bg-white shadow-inner hover:border-blue-400 transition-colors">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20 group">
                    <img
                      src={img.url}
                      alt="preview"
                      className="w-full h-full object-cover rounded-lg border-2 border-gray-200 group-hover:border-blue-300 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== idx),
                        }))
                      }
                      className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {/* Add more images button */}
                {formData.images.length < 8 && (
                  <label className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer text-blue-500 text-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group">
                    <span className="group-hover:scale-125 transition-transform">+</span>
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
              <p className="text-sm text-blue-600 mt-2 font-medium">
                💡 Upload high-quality product images for better visibility
              </p>
            </div>

            {/* Right Column - Product Details */}
            <div className="space-y-4">
              {/* Product Title */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">🏷️ Product Title</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter product name..."
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold mb-2 text-gray-700">📝 Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Describe your product..."
                  rows="3"
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                />
              </div>
              
              {/* Category and Box Size */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">🏢 Brand</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="">Select Brand</option>
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">📦 Box Size</label>
                  <select
                    name="boxSize"
                    value={formData.boxSize}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    <option value="">Select Size</option>
                    {boxSizeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">💰 Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    placeholder="0"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">📊 Stock Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    placeholder="0"
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-8 pt-4 border-t-2 border-gray-200">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-md"
            >
              ❌ Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-md"
            >
              {editingProduct ? "💾 Update Product" : "✅ Add Product"}
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b">
          <h3 className="text-xl font-bold text-gray-800">📋 Product Inventory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">ID</th>
                <th className="px-6 py-4 text-left font-semibold">Product Name</th>
                <th className="px-6 py-4 text-left font-semibold">Brand</th>
                <th className="px-6 py-4 text-left font-semibold">Box Size</th>
                <th className="px-6 py-4 text-left font-semibold">Price</th>
                <th className="px-6 py-4 text-left font-semibold">Stock</th>
                <th className="px-6 py-4 text-left font-semibold">Images</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((p, index) => (
                <tr key={p.id} className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="px-6 py-4 font-medium text-gray-900">#{p.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">{p.name}</div>
                      <div className="text-sm text-gray-500">{p.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                      {p.boxSize}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-green-600">₹{p.price}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${p.stock > 50 ? 'bg-green-100 text-green-800' : p.stock > 20 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-1">
                      {p.images?.slice(0, 3).map((img, idx) => (
                        <img
                          key={idx}
                          src={img.url || URL.createObjectURL(img.file)}
                          alt="product"
                          className="h-12 w-12 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                        />
                      ))}
                      {p.images?.length > 3 && (
                        <div className="h-12 w-12 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center text-xs text-gray-500 font-medium">
                          +{p.images.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-md"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-md"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}