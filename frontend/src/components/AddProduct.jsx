import { useState } from "react";
import { createProduct } from "../services/api";
import { motion } from "framer-motion";

function AddProduct({ onClose, onSuccess, onError, isModal = false }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      onError?.("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      await createProduct({
        name: formData.name,
        price: Number(formData.price),
        description: formData.description
      });
      onSuccess?.("✅ Product added successfully!");
      setFormData({ name: "", price: "", description: "" });
      onClose?.();
    } catch (error) {
      onError?.("Failed to add product");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="form-group">
        <label htmlFor="name">Product Name *</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price (₹) *</label>
        <input
          id="price"
          name="price"
          type="number"
          placeholder="Enter price"
          value={formData.price}
          onChange={handleChange}
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
          placeholder="Enter product description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />
      </div>

      {isModal ? (
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
            {submitting ? "Adding..." : "✅ Add Product"}
          </button>
        </div>
      ) : (
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
          style={{ marginTop: "20px" }}
        >
          {submitting ? "Adding..." : "✅ Add Product"}
        </button>
      )}
    </motion.form>
  );
}

export default AddProduct;
