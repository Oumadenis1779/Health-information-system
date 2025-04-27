const Client = require('../models/Client');
const Program = require('../models/Program');
const { validateClient } = require('../utils/validator');

// Register a new client
exports.registerClient = async (req, res, next) => {
  try {
    const { error } = validateClient(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const client = await Client.create(req.body);
    res.status(201).json({ success: true, data: client });
  } catch (error) {
    next(error);
  }
};

// Enroll client in a program
exports.enrollClient = async (req, res, next) => {
  try {
    const { clientId, programId } = req.body;

    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    const program = await Program.findById(programId);
    if (!program) return res.status(404).json({ message: 'Program not found' });

    if (client.programs.includes(programId)) {
      return res.status(400).json({ message: 'Client already enrolled in this program' });
    }

    client.programs.push(programId);
    await client.save();

    res.status(200).json({ success: true, data: client });
  } catch (error) {
    next(error);
  }
};

// Search clients
exports.searchClients = async (req, res, next) => {
  try {
    const { name } = req.query;
    const clients = await Client.find({
      name: { $regex: name, $options: 'i' },
    }).populate('programs');
    res.status(200).json({ success: true, data: clients });
  } catch (error) {
    next(error);
  }
};

// View client profile
exports.getClientProfile = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id).populate('programs');
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json({ success: true, data: client });
  } catch (error) {
    next(error);
  }
};