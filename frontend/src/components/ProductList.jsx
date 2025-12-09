import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/api";
import { motion } from "framer-motion";
import EditModal from "./EditModal";

function ProductList({ onAddSuccess, onError }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      onError?.("Failed to load products");
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    if (window.confirm("🗑️ Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        onAddSuccess?.("✅ Product deleted successfully!");
        loadProducts();
      } catch (error) {
        onError?.("Failed to delete product");
      }
    }
  };

  const handleEditClick = (id) => {
    setEditingId(id);
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        ⏳ Loading products...
      </div>
    );
  }

  return (
    <div>
      {/* SEARCH BAR */}
      <motion.div
        className="search-container"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search products by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      {/* PRODUCTS TITLE */}
      <motion.h1
        className="products-section-title"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        📦 Our Products {filteredProducts.length > 0 && `(${filteredProducts.length})`}
      </motion.h1>

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 && (
        <motion.div
          className="empty-state"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2>📦 {searchQuery ? "No products found" : "No Products Yet"}</h2>
          <p>
            {searchQuery
              ? "Try adjusting your search query"
              : "Start by adding your first product!"}
          </p>
        </motion.div>
      )}

      {/* PRODUCTS GRID */}
      <motion.div
        className="products-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product._id}
            className="product-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <div className="product-header">
              <h3>{product.name}</h3>
              <div className="product-price">₹{product.price.toFixed(2)}</div>
            </div>
            <div className="product-body">
              <p className="product-description">
                {product.description || "No description available"}
              </p>
              <div className="product-actions">
                <button
                  className="btn btn-edit"
                  onClick={() => handleEditClick(product._id)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => removeProduct(product._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* EDIT MODAL */}
      {editingId && (
        <EditModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingId(null);
          }}
          productId={editingId}
          onSuccess={(msg) => {
            onAddSuccess?.(msg);
            loadProducts();
          }}
          onError={onError}
        />
      )}
    </div>
  );
}

export default ProductList;
