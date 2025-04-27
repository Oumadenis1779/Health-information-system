const express = require('express');
const router = express.Router();
const {
  registerClient,
  enrollClient,
  searchClients,
  getClientProfile,
} = require('../controllers/clientController');
const auth = require('../middleware/auth');



// No token required for these routes
router.post('/register', registerClient); // Remove auth middleware here
router.post('/enroll', enrollClient); // Remove auth middleware here

// These routes require a token
router.get('/search', auth, searchClients); // Protected, requires token
router.get('/:id', getClientProfile); // Public API for external systems

module.exports = router;
