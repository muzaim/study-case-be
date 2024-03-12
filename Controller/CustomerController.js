const CustomerModel = require("../Model/CustomerModel");

// get All Customer
exports.getAllCustomer = (req, res, next) => {
   const currentPage = req.query.currentPage || 1;
   const perPage = req.query.perPage || 100;
   let totalData = 0;

   CustomerModel.find()
      .countDocuments()
      .then((count) => {
         totalData = count;
         return CustomerModel.find()
            .skip(parseInt(currentPage - 1) * parseInt(perPage))
            .limit(parseInt(perPage));
      })
      .then((result) => {
         res.status(200).json({ OUT_STAT: "T", OUT_DATA: result });
      })
      .catch((err) => {
         console.log(err);
      });
};

// gen Customer
exports.genCustomer = (req, res, next) => {
   const { name, address, npwp, pic, phone, city, customer_price_category } = req.body;
   const sendData = new CustomerModel({
      name,
      address,
      npwp,
      pic,
      phone,
      city,
      customer_price_category,
   });

   sendData
      .save()
      .then((result) => {
         res
            .status(200)
            .json({ OUT_STAT: "T", OUT_MESS: "Success", OUT_DATA: result });
      })
      .catch((err) => {
         console.log(err);
      });
};

// get Customer by Id
exports.getDetailCustomer = (req, res, next) => {
   const customerId = req.params.customerId;
   CustomerModel.findById(customerId)
      .then((result) => {
         if (!result) {
            const err = new Error(`Customer with id : ${customerId} not found!`);
            err.errorStatus = 404;
            throw err;
         }
         res.status(200).json({ OUT_STAT: "T", OUT_DATA: result });
      })
      .catch((err) => {
         next(err);
      });
};

// update Customer
exports.updateCustomer = (req, res, next) => {
   const { name, address, npwp } = req.body;
   const { customerId } = req.params;

   CustomerModel.findById(customerId)
      .then((customer) => {
         if (!customer) {
            const err = new Error(`Customer with id ${customerId} are not found`);
            err.errorStatus = 404;
            throw err;
         }
         customer.name = name;
         customer.address = address;
         customer.npwp = npwp;

         return customer.save();
      })
      .then((result) => {
         res.status(200).json({ OUT_STAT: "T", OUT_DATA: result });
      })
      .catch((err) => {
         next(err);
      });
};

// delete Customer
exports.deleteCustomer = (req, res, next) => {
   const customerId = req.params.customerId;

   CustomerModel.findById(customerId)
      .then((customer) => {
         if (!customer) {
            const err = new Error(`Customer with id ${customerId} are not found!`);
            err.errorStatus = 404;
            throw err;
         }
         return CustomerModel.findByIdAndRemove(customerId);
      })
      .then((result) => {
         res.status(200).json({ OUT_STAT: "T", OUT_DATA: result });
      })
      .catch((err) => {
         next(err);
      });
};