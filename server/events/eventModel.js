var mongoose = require('mongoose');

var ListSchema = new mongoose.Schema({
  name: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  due_at: Date,  //date that it takes place on 

  group_id: String, //related to the group it is assocated with 
  
  eventdes: String,
  
  type: String,
  privateAccess : Boolean,

  //If delivery address is different from list creator's address
  event_address: {
    street: String,
    city: String,
    state: String,
    zip_code: Number
  }
});

module.exports = mongoose.model('List', ListSchema);