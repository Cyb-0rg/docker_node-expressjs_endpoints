const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port  = 3000;

app.use(bodyParser.json()); // Middleware for parsing JSON request bodies

//for the visitor 
let endPoints = [
    { path:"/api/products", description: 'Retrieves a list of products', method: "GET" } ,
    { path: "/api/products", description: 'Creates a new product', method: "POST" },
    { path: "/api/products/:id", description: 'Updates a product by ID' , method: "PUT"},
    { path: "/api/products/:id", description: 'Partially updates a product by ID' , method: "PATCH"},
    { path: "/api/products/:id", description: 'Deletes a product by ID', method: "DELETE" },
    { path: "/api/products", description: 'Implementation for OPTIONS method' , method: "OPTIONS"},
    { path: "/api/products", description: 'Implementation for HEAD method', method: "HEAD" },
    { path: "/api/products", description: 'Implementation for CONNECT method', method: "CONNECT" },
    { path: "/api/products", description: 'Implementation for TRACE method', method: "TRACE" }
  ];


// Example data for demonstration purposes
let products = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' }
];



// GET default home
app.get('', (req, res) => {
    //res.send("list of endpoints: ");
    res.json(endPoints);
  });


// GET /api/products - Retrieves a list of products
app.get('/api/products', (req, res) => {
  res.json(products);
});


// POST /api/products - Creates a new product
app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.json(newProduct);
});

// GET /api/products/:id - Retrieves a single product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// PUT /api/products/:id - Updates a product by ID
app.put('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    products[productIndex] = updatedProduct;
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// PATCH /api/products/:id - Partially updates a product by ID
app.patch('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// DELETE /api/products/:id - Deletes a product by ID
app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Other methods - OPTIONS, HEAD, CONNECT, and TRACE
app.options('/api/products', (req, res) => {
  // Implementation for OPTIONS method
  res.json({ methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE' , 'CONNECT',  'HEAD', 'TRACE'] });
});

app.head('/api/products', (req, res) => {
  // Implementation for HEAD method
  // (Similar to GET, but only returns headers, not the actual response body)
  res.json({ status: 'ok' });
});

app.connect('/api/products', (req, res) => {
  // Implementation for CONNECT method
  // (Typically used for proxy server communication)
  res.json({ status: 'ok' });
});

app.trace('/api/products', (req, res) => {
    // Implementation for TRACE method
  // (Typically used for debugging purposes)
  res.json({ status: 'ok' });
});

// Catch-all route for handling unknown routes
app.all('*', (req, res) => {
  //res.send(`http://localhost:${port}/home`);
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});