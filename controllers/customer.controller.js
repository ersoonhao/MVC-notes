const Customer = require("../models/customer.model.js");





// for understanding of why callback functions 
////https://techsparx.com/nodejs/learning/callback-programming.html 


// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const customer = new Customer({
      email: req.body.email,
      name: req.body.name,
      active: req.body.active
    });
  
    // Save Customer in the database
    Customer.create(customer, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  };

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
        if (err) {
            // internal server error 
            res.status(500).send({
                message: err.message || "Error occured while retrieving customers"
            });
        } else {
            res.send(data);
        }
    })
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Customer not found with id ${req.params.customerId}`
                })
            } else {
                res.status(500).send({
                    message: `Error retrieving customer ID ${req.params.customerId}`
                })
            }
        } else {
            // 
            console.log(data);
            res.send(data);

        }
    });

};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // validate request. 
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    // Params vs Body 
    // params is for routes parameters 
    // app.put('/api/todos/:_id', ...)
    // req.body is for key value pairs of data submitted in the request body. populated by body-parsing middleware such as body-parser

    Customer.updateById(req.params.customerId, new Customer(req.body), (err, data) => {
        if (err) {
            if (err.kind = "not_found") {
                // maybe should use .json?? mm 
                res.status(404).send({
                    message: `Customer not found with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating customer with id ${req.params.customerId}.`
                });
            }
        } else {
            res.send(send);
        }

    })

};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Customer.remove(req.params.customerId, (err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).send({
                    message: `Customer not found with id ${req.params.customerId}.`
                });
            }
            else{
                res.status(500).send({
                    message: `Error deleting customer with id ${req.params.customerId}.`
                });
            }
        }else{
            res.send({ message: `Customer was deleted successfully!` });
        }
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Customer.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all customers."
          });
        else res.send({ message: `All Customers were deleted successfully!` });
      });

};