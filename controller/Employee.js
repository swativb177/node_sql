const Joi = require("joi");
const Employee = require("../models/Employee");
const { Op } = require("sequelize");

const schema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    "string.base": '"firstName" should be a type of "text"',
    "string.empty": '"firstName" cannot be an empty field',
    "string.min": '"firstName" should have a minimum length of {#limit}',
    "string.max": '"firstName" should have a maximum length of {#limit}',
    "any.required": '"firstName" is a required field',
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    "string.base": '"lastName" should be a type of "text"',
    "string.empty": '"lastName" cannot be an empty field',
    "string.min": '"lastName" should have a minimum length of {#limit}',
    "string.max": '"lastName" should have a maximum length of {#limit}',
    "any.required": '"lastName" is a required field',
  }),
  mobile: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[6-9][0-9]{9}$/)
    .required()
    .messages({
      "string.empty": "Mobile number is required",
      "string.pattern.base":
        "Mobile number must start with 6-9 and have exactly 10 digits",
      "string.min": "Mobile number must be at least 2 characters long",
      "string.max": "Mobile number must be less than 50 characters long",
    }),
  email: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.empty": "email address is required",
      "string.pattern.base":
        "the emial address invalid,please enter valid email address",
      "string.min": "email address must be at least 2 characters long",
      "string.max": "email address must be less than 50 characters long",
    }),
  address: Joi.string().min(2).max(50).required().messages({
    "string.base": '"address" be a type of "text"',
    "string.empty": '"address"be an empty field',
    "string.min": '"address" should have a minimum length of {#limit}',
    "string.max": '"address" should have a maximum length of {#limit}',
    "any.required": '"address" is a required field',
  }),
});

const create = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { firstName, lastName, mobile, email } = req.body;

    const existingemployee = await Employee.findOne({
      where: { [Op.or]: [{ mobile }, { email }] },
    });
    if (existingemployee) {
      if (existingemployee.mobile === mobile) {
        return res.status(400).json({
          message: `The mobile "${mobile}" is already taken. Please choose a different one.`,
        });
      }

      if (existingemployee.email === email) {
        return res.status(400).json({
          message: `The email "${email}" is already taken. Please choose a different one.`,
        });
      }
    }

    const data = await Employee.create({
      firstName,
      lastName,
      mobile,
      email,
    });

    res.status(200).send({ messege: "the employee added succeffuly", data });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
};

const fetch = async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id);

    if (isNaN(employeeId)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    const employee = await Employee.findOne({
      where: { id: employeeId },
    });

    if (!employee) {
      return res.status(404).json({
        message: `Employee with ID ${employeeId} not found.`,
      });
    }

    res.status(200).json({
      message: "Employee found",
      employee: employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
};


const update = async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id, 10);

    if (isNaN(employeeId)) {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }

    const { firstName, lastName, email, mobile } = req.body;

    if (!firstName && !lastName && !email && !mobile) {
      return res.status(400).json({
        message: 'Please provide at least one field (firstName, lastName, email, or mobile) to update.',
      });
    }

    const employee = await Employee.findOne({ where: { id: employeeId } });

    if (!employee) {
      return res.status(404).json({
        message: `Employee with ID ${employeeId} not found.`,
      });
    }

    const updatedEmployee = await employee.update({
      firstName: firstName || employee.firstName,
      lastName: lastName || employee.lastName,
      email: email || employee.email,
      mobile: mobile || employee.mobile,
    });

    res.status(200).json({
      message: 'Employee successfully updated',
      employee: updatedEmployee,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
};


module.exports = { create, fetch , update };
