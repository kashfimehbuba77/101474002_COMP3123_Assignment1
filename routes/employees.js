const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("../models/employees");

const routes = express.Router();

// Get All Employees
routes.get("/employees", async (req, res) => {
  try {
    const employees = await EmployeeModel.find({});
    res.status(200).json({
      status: true,
      message: "Employees fetched successfully",
      count: employees.length,
      data: employees,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

// Add New Employee
routes.post("/employees", async (req, res) => {
  try {
    const newEmployeeData = req.body;
    const newEmployee = new EmployeeModel(newEmployeeData);
    const savedEmployee = await newEmployee.save();

    res.status(201).json({
      status: true,
      message: "Employee created successfully",
      employee_id: savedEmployee._id,
      data: savedEmployee,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Get Employee by ID
routes.get("/employees/:eid", async (req, res) => {
  const employeeId = req.params.eid;

  try {
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid Employee ID",
      });
    }

    const employee = await EmployeeModel.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        status: false,
        message: `Employee not found for id: ${employeeId}`,
      });
    }

    res.status(200).json({
      status: true,
      message: `Employee fetched successfully for id: ${employeeId}`,
      data: employee,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

// Update Employee by ID
routes.put("/employees/:eid", async (req, res) => {
  const employeeId = req.params.eid;
  const updatedEmployeeData = { ...req.body };

  // Prevent _id from being updated
  delete updatedEmployeeData._id;

  try {
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid Employee ID",
      });
    }

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      employeeId,
      updatedEmployeeData,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        status: false,
        message: `Employee not found for id: ${employeeId}`,
      });
    }

    res.status(200).json({
      status: true,
      message: `Employee updated successfully for id: ${employeeId}`,
      data: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// Delete Employee by ID
routes.delete("/employees/:eid", async (req, res) => {
  const employeeId = req.params.eid;

  try {
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid Employee ID",
      });
    }

    const deletedEmployee = await EmployeeModel.findByIdAndDelete(employeeId);
    if (!deletedEmployee) {
      return res.status(404).json({
        status: false,
        message: `Employee not found for id: ${employeeId}`,
      });
    }

    res.status(200).json({
      status: true,
      message: `Employee deleted successfully for id: ${employeeId}`,
      data: deletedEmployee,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

module.exports = routes;
