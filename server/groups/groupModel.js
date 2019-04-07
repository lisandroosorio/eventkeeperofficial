var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
  name: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  delivered_at: Date,
  due_at: Date,
  expired_at: Date,
  creator_id: String,
  deliverer_id: String,

  //items is a array containing all Group items
  //Each item should be follow this structure:
  // {
  //    item_name: String,
  //    quantity:  Number,
  //    unite_price: Number  //this is typo, and too late to change for us.
  // }
  items : [],
  total_price: Number,
  offer_price: Number,
  status: String,

  //If delivery address is different from Group creator's address
  delivery_address: {
    street: String,
    city: String,
    state: String,
    zip_code: Number
  }
});

module.exports = mongoose.model('Group', GroupSchema);