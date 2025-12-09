import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css";

import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Modal from "./components/Modal";
import ToastContainer from "./components/ToastContainer";

function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <Router>
      {/* NAVBAR */}
      <motion.div
        className="navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            🛍️ CodVeda Store Dashboard
          </Link>

          <div className="nav-links">
            <Link to="/" className="nav-link">
              Products
            </Link>
            <button
              className="add-btn"
              onClick={() => setShowAddModal(true)}
            >
              + Add Product
            </button>
          </div>
        </div>
      </motion.div>

      {/* MODAL FOR ADDING PRODUCT */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="➕ Add New Product"
      >
        <AddProduct
          onClose={() => setShowAddModal(false)}
          onSuccess={(msg) => {
            addToast(msg, "success");
            setShowAddModal(false);
          }}
          onError={(msg) => addToast(msg, "error")}
          isModal={true}
        />
      </Modal>

      {/* MAIN CONTENT */}
      <motion.div
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProductList
                onAddSuccess={(msg) => addToast(msg, "success")}
                onError={(msg) => addToast(msg, "error")}
              />
            }
          />
        </Routes>
      </motion.div>

      {/* FLOATING ACTION BUTTON */}
      <motion.button
        className="fab"
        onClick={() => setShowAddModal(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        +
      </motion.button>

      {/* TOAST NOTIFICATIONS */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </Router>
  );
}

export default App;
