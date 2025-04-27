const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const clientRoutes = require('./routes/clientRoutes');
const programRoutes = require('./routes/programRoutes');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  // Remove deprecated options
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/clients', clientRoutes);
app.use('/api/programs', programRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));