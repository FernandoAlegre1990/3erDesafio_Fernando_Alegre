const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000; 

const manager = new ProductManager('products.json'); 


app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit, 10);

  if (!isNaN(limit)) {
    const limitedProducts = manager.getProducts().slice(0, limit);
    res.json({ products: limitedProducts });
  } else {
    res.json({ products: manager.getProducts() });
  }
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid, 10);

  if (!isNaN(productId)) {
    const product = manager.getProductById(productId);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } else {
    res.status(400).json({ error: 'Invalid product ID' });
  }
});

// Inicio el server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

