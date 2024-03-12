const express = require("express");
const route = express.Router();

const {
   getAllCustomer,
   genCustomer,
   getDataCustomer,
   deleteCustomer,
   updateCustomer,
} = require("../Controller/CustomerController");

// get all customer
route.get("/customer", getAllCustomer);

// gen customer
route.post("/customer", genCustomer);

// get detail customer
// route.get("/customer/:customerId", getDataCustomer);

// update customer
route.put("/customer/:customerId", updateCustomer);

// delete customer
route.delete("/customer/:customerId", deleteCustomer);

module.exports = route;