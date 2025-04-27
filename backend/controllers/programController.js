const Program = require('../models/Program');

// Create a new health program
exports.createProgram = async (req, res, next) => {
  try {
    const program = await Program.create(req.body);
    res.status(201).json({ success: true, data: program });
  } catch (error) {
    next(error);
  }
};

// Get all programs
exports.getPrograms = async (req, res, next) => {
  try {
    const programs = await Program.find();
    res.status(200).json({ success: true, data: programs });
  } catch (error) {
    next(error);
  }
};