const Joi = require('joi');

const validateClient = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    contact: Joi.object({
      email: Joi.string().email().required(),
      phone: Joi.string().optional(),
    }).required(),
  });
  return schema.validate(data);
};

module.exports = { validateClient };