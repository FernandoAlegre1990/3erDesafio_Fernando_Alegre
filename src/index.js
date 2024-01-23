//Agrego productos para probar el código
const ProductManager = require('./ProductManager');

const manager = new ProductManager('./products.json');

manager.addProduct({ title: 'Product 1', description: 'Description 1', price: 10, thumbnail: 'thumbnail1.jpg', code: 'CODE1', stock: 50 });
manager.addProduct({ title: 'Product 2', description: 'Description 2', price: 20, thumbnail: 'thumbnail2.jpg', code: 'CODE2', stock: 30 });
manager.addProduct({ title: 'Product 3', description: 'Description 3', price: 15, thumbnail: 'thumbnail3.jpg', code: 'CODE3', stock: 40 });
manager.addProduct({ title: 'Product 4', description: 'Description 4', price: 25, thumbnail: 'thumbnail4.jpg', code: 'CODE4', stock: 20 });
manager.addProduct({ title: 'Product 5', description: 'Description 5', price: 30, thumbnail: 'thumbnail5.jpg', code: 'CODE5', stock: 35 });
manager.addProduct({ title: 'Product 6', description: 'Description 6', price: 18, thumbnail: 'thumbnail6.jpg', code: 'CODE6', stock: 25 });


// Obtener todos los productos
const allProducts = manager.getProducts();
console.log('All products:', allProducts);

// Actualizar un producto
const productToUpdate = manager.getProductById(1);
const updatedProduct = manager.updateProduct(productToUpdate, { price: 15, stock: 60 });
console.log('Updated product:', updatedProduct);

// Eliminar un producto
const productIdToDelete = 2;
const deletedProduct = manager.deleteProduct(productIdToDelete);
console.log('Deleted product:', deletedProduct);

// Obtener todos los productos después de la eliminación
console.log('All products after deletion:', manager.getProducts());