const express = require("express");
const router = express.Router();
const { addProduct, getProducts, getLowStockProducts, updateProduct, deleteProduct } = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addProduct);
router.get("/", protect, getProducts);
router.get("/low-stock", protect, getLowStockProducts);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
