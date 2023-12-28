const usermodal = require("../../models/userModel")
const authModal = require('../../models/authModal');

const addShipmentAddress = async (req, res) => {
    try {
        const { firstname, lastname, address, country, state, pincode } = req.body;
        if (!firstname || !lastname || !address || !country || !state || !pincode)
            return res.status(400).json({
                statusCode: 400,
                message: "feilds missing"
            });
        const newshipmentaddress = new usermodal({
            firstname,
            lastname,
            address,
            country,
            state,
            pincode
        });
        await newshipmentaddress.save();
        authModal.findByIdAndUpdate(req.user._id,{userid:newshipmentaddress._id})
        return res.status(201).json({ message: "Shipment address addedsuccessfully", statusCode: 201 })
    } catch (error) {
        console.log(error);
        console.error(error);
    }
}

const updateShipmentAddress = async(req,res)=>{
    const userdetails=await authModal.findOne({userid})
    if(!userdetails){
        // return res.
    }
}
module.exports = {
    addShipmentAddress,
    updateShipmentAddress 
}