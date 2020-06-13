
const mongoose 				= require('mongoose');
const utils = require('../helpers/utils')
// Create a Event schema
const Schema = mongoose.Schema;
const VehicleSchema = new Schema({
    name        : 			{   type : String, required : true},
    deviceId    :           {   type : String, required : true},
    latitude    :           {   type : String, required : true},
    longitude   :           {   type : String, required : true},
    modifiedDate:           Date,
    creationDate: 			Date,
    updatedRecently : {type : Boolean, default : false},
})



// on every save, update the created/modified date
VehicleSchema.pre('save', function(next) {
    // get the current date
    const currentDate = new Date();
    // change the modified field to current date
    this.modifiedDate = currentDate;
    // if createdDate doesn't exist, add to that field
    if (!this.creationDate)
      this.creationDate = currentDate;
    next();
});
  

VehicleSchema.virtual('modifiedDate_gmt').get(function(){
	return utils.getFormattedDateInUTCFormat(this.modifiedDate); // date in "dd/mm/yyyy hh:mm" format
});
  
VehicleSchema.set('toJSON', { virtuals: true });
VehicleSchema.set('toObject', { virtuals: true });

// Create a Model
const Vehicle = mongoose.model('Vehicle', VehicleSchema);


// Make Vehicle available everywhere in the app
module.exports = Vehicle;
