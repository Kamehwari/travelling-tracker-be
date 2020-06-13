
const express   =       require('express');
const router    =       express.Router();
const {schemaValidator, sendResponse} = require("../helpers/utils");
const vehicleDataMgr = require('../dataManagers/vehicleDataMgr')

router.put('/vehicles', async(req, res)=>{
    try {
        let vehicleJSON = req.body;
        let result = await vehicleDataMgr.updateVehicleDetails(vehicleJSON);
        if(result.status){
            return sendResponse(res, 200, result.message, "vehicle", result.data)
        }else{
            return sendResponse(res, 400, result.message, "vehicle")
        }
    } catch (error) {
        return sendResponse(res, 500, error.message, "vehicle")
    }
})

router.get('/vehicles', async(req, res)=>{
    try {
        let filters = (req.headers.filters) ? JSON.parse(req.headers.filters) : {}
        let result = await vehicleDataMgr.getVehicleDetails(filters);
        if(result.status){
            return sendResponse(res, 200, result.message, "vehicle", result.data)
        }else{
            return sendResponse(res, 400, result.message, "vehicle")
        }
    } catch (error) {
        return sendResponse(res, 500, error.message, "vehicle")
    }
})

module.exports = router;