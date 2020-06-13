const Vehicle = require('../Models/vehicleModel')
const moment = require('moment');


const updateVehicleDetails = async(vehiclesJSON)=>{
    try {
        console.log("vehiclesJSON", vehiclesJSON)
       for(let vehicleJSON of vehiclesJSON){
        vehicleJSON = JSON.parse(vehicleJSON)
        let vehicleDetails = await Vehicle.findOne({"deviceId": vehicleJSON.deviceId})
        if(vehicleDetails){
             vehicleDetails.latitude = vehicleJSON.latitude;
             vehicleDetails.logitude = vehicleJSON.logitude;
             vehicleDetails.modifiedDate = new Date().toString();
             await vehicleDetails.save();
        }else {
            let newVehicle = new Vehicle()
            newVehicle.deviceId = vehicleJSON.deviceId;
            newVehicle.latitude = vehicleJSON.latitude;
            newVehicle.name = vehicleJSON.name;
            newVehicle.longitude = vehicleJSON.longitude;
            newVehicle.modifiedDate = new Date().toString();
            newVehicle.creationDate = new Date().toString();
            newVehicle.save();
        }
       }
       return {"status":true, "message":"Vehicle Details Updated Successfully"}
    } catch (error) {
        throw {"status":false, "message":error.message}
    }
}


const getVehicleDetails = async()=>{
    try {
        let vehicleDetails = await Vehicle.find().sort({"modifiedDate":-1})
        for(let vehicle  of vehicleDetails){
            let currentDate = moment(new Date())
            let modDate = moment(vehicle.modifiedDate)
            console.log(currentDate, modDate)
            let diff = currentDate.diff(modDate, 'seconds')
            console.log("inside loop", diff, typeof diff)
            if(diff>10){
                vehicle.updatedRecently = false
            }else{
                vehicle.updatedRecently = true
            }
            console.log( vehicle)
        }
        return {status : true, "data": vehicleDetails}
    } catch (error) {
        throw {"status":false, "message":error.message}
    }
}

module.exports = {
    updateVehicleDetails,
    getVehicleDetails
}