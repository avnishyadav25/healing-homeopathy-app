const Product = require('../models/Product');
const generateSKU = require('../utils/skuGenerator');

const createProduct = async (productData) => {
  const { name, category } = productData;
  const sku = generateSKU(name, category);
  const product = new Product({ ...productData, sku });
  await product.save();
  return product;
};

const getAllProducts = async () => {
  return await Product.find({});
};

const getProductById = async (productId) => {
  return await Product.findById(productId);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
