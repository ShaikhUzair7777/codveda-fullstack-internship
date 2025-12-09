import { useEffect, useState } from "react";
import { getProduct, updateProduct } from "../services/api";
import Modal from "./Modal";

function EditModal({ isOpen, onClose, productId, onSuccess, onError }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: ""
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && productId) {
      loadProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const res = await getProduct(productId);
      setProduct(res.data);
    } catch (error) {
      onError?.("Failed to load product");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.price) {
      onError?.("Please fill in all required fields");
      return;
    }
    try {
      setSubmitting(true);
      await updateProduct(productId, { ...product, price: Number(product.price) });
      onSuccess?.("✅ Product updated successfully!");
      onClose();
    } catch (error) {
      onError?.("Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="✏️ Edit Product"
    >
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          Loading product...
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (₹) *</label>
            <input
              id="price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Updating..." : "💾 Update Product"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default EditModal;
