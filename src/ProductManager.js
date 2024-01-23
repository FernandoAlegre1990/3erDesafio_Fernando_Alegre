const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.loadProducts();
    this.productIdCounter = this.calculateNextId();
  }

  addProduct(productData) {
   
    const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
    const missingFields = requiredFields.filter(field => !(field in productData));
  
    if (missingFields.length > 0) {
      console.error(`Missing required fields: ${missingFields.join(', ')}`);
      return null;
    }
  
   
    const isCodeUnique = !this.products.some(product => product.code === productData.code);
  
    if (!isCodeUnique) {
      console.error(`Product with code "${productData.code}" already exists.`);
      return null;
    }
  
   
    const newProduct = {
      id: this.productIdCounter,
      ...productData,
    };
  
    this.products.push(newProduct);
    this.productIdCounter++;
    this.saveProducts();
  
    return newProduct;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    return product || null;
  }

  updateProduct(updatedProduct, updatedFields) {
    const productIndex = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (productIndex !== -1) {
      this.products[productIndex] = { ...updatedProduct, ...updatedFields };
      this.saveProducts();
      return this.products[productIndex];
    }
    return null;
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      const deletedProduct = this.products.splice(productIndex, 1)[0];
      this.saveProducts();
      return deletedProduct;
    }
    return null;
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      const parsedData = JSON.parse(data);
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      console.error('Error loading products:', error.message);
      return [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
  }

  calculateNextId() {
    const maxIdFromProducts = this.products.reduce((max, product) => {
      const productId = typeof product.id === 'number' ? product.id : 0;
      return productId > max ? productId : max;
    }, 0);
  
    return isNaN(maxIdFromProducts) ? 1 : maxIdFromProducts + 1;
  }
}

module.exports = ProductManager;


