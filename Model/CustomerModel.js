const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerModel = new Schema(
   {
      name: {
         type: String,
         required: false,
      },
      address: {
         type: String,
         required: false,
      },
      pic: {
         type: String,
         required: false,
      },
      phone: {
         type: String,
         required: false,
      },
      city: {
         type: String,
         required: false,
      },
      customer_price_category: {
         type: String,
         required: false,
      },
      npwp: {
         type: String,
         required: false,
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model("Customer", CustomerModel);