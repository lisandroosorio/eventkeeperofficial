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

  isFollowedBy: [],

  description: String, //new
  school : String,  //new 
  private : Boolean,

  items : [],
  total_price: Number,
  offer_price: Number,
  status: String,


  //If location address is different from Group creator's address
  location_address: {
    street: String,
    city: String,
    state: String,
    zip_code: Number
  }
});

module.exports = mongoose.model('Group', GroupSchema);