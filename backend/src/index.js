const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const zetdcRoutes = require('./routes/zetdcRoutes');
const suburbRoutes = require('./routes/suburbRoutes');
const areasNearbyRoutes = require('./routes/areasNearbyRoutes');
const loadsheddingStatusRoutes = require('./routes/loadsheddingStatusRouter');
const areaStatusRoutes = require('./routes/areaStatusRoutes');
const { swaggerUi, specs } = require('./swagger');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();

// Connect to MongoDB
connectDB();

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Define the secret key for signing JWT tokens
const secretKey = process.env.SECRET_KEY || '95e9c82b2525897a0a707fc3b1459f002bc1e171b45372dfa60cd24fbec0d8f8';

// Mock user data for authentication
const users = [
  {
    id: 1,
    username: 'user1',
    password: 'password123' // In a real application, passwords should be hashed
  }
];

// Authentication endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT
  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

  // Log the generated token
  console.log('Generated token:', token);

  // Send the token back to the client
  res.json({ token });
});

// Define routes
app.use('/api', zetdcRoutes, suburbRoutes, areasNearbyRoutes, loadsheddingStatusRoutes, areaStatusRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Define a default route
app.get('/', (req, res) => {
  res.send('Welcome to ZETDC API');
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app };
