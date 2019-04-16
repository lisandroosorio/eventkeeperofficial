var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  name: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  due_at: Date,  //date that it takes place on 

  group_id: String, //related to the group it is assocated with 
  date: String,
  
  description: String,
  isFavBy: [],
  type: String,
  private : Boolean,

  //If location address is different from group creator's address
  event_address: {
    street: String,
    city: String,
    state: String,
    zip_code: Number
  }
});

module.exports = mongoose.model('Event', EventSchema);