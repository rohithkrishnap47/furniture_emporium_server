const usermodal = require("../../models/userModel")
const authModal = require('../../models/authModal');

const addShipmentAddress = async (req, res) => {
    try {
        console.log("req.user",req.user);
        const { firstname, lastname, address, country, state, pincode } = req.body;
        if (!firstname || !lastname || !address || !country || !state || !pincode)
            return res.status(400).json({
                statusCode: 400,
                message: "feilds missing"+ firstname+ lastname+ address+ country+ state+ pincode
            });
        const newshipmentaddress = new usermodal({
            firstname,
            lastname,
            address,
            country,
            state,
            pincode
        });
        const data = await newshipmentaddress.save();
        console.log("newshipmentaddress",data);
        authModal.findByIdAndUpdate(req.user._id, { userid: data._id })
        return res.status(201).json({ message: "Shipment address addedsuccessfully", statusCode: 201 })
    } catch (error) {
        console.log(error);
        console.error(error);
    }
}



const updateShipmentAddress = async (req, res) => {
    try {
        const { userid } = req.body;


        if (!userid) {
            return res.status(400).json({
                statusCode: 400,
                message: "userid is missing in the request"
            });
        }

        const userdetails = await authModal.findOne({ userid });


        if (!userdetails) {
            return res.status(404).json({
                statusCode: 404,
                message: "User details not found for the provided userid"
            });
        }


        const { firstname, lastname, address, country, state, pincode } = req.body;
        if (firstname) userdetails.firstname = firstname;
        if (lastname) userdetails.lastname = lastname;
        if (address) userdetails.address = address;
        if (country) userdetails.country = country;
        if (state) userdetails.state = state;
        if (pincode) userdetails.pincode = pincode;


        await userdetails.save();

        return res.status(200).json({
            message: "Shipment address updated successfully",
            statusCode: 200
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            message: "Internal server error"
        });
    }
};

module.exports = {
    addShipmentAddress,
    updateShipmentAddress
}