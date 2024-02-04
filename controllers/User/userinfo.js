const addressModal = require("../../models/addressModal")
const authModal = require('../../models/authModal');
const Contact = require('../../models/contactUsModel');


// ADD-SHIPMENT-ADDRESS
const addShipmentAddress = async (req, res) => {
    try {
        console.log("req.user", req.user);
        const { firstname, lastname, address, country, state, pincode } = req.body;
        if (!firstname || !lastname || !address || !country || !state || !pincode)
            return res.status(400).json({
                statusCode: 400,
                message: "feilds missing" + firstname + lastname + address + country + state + pincode
            });
        const newshipmentaddress = new addressModal({
            firstname,
            lastname,
            address,
            country,
            state,
            pincode
        });
        const data = await newshipmentaddress.save();
        console.log("newshipmentaddress", data);
        let auth = await authModal.findById(req.user._id)
        let ids = auth.addressids || []    //array
        ids.push(data._id)
        const updatedAuth = await authModal.findByIdAndUpdate(req.user._id, { addressids: ids })
        return res.status(201).json({ message: "Shipment address added Successfully", statusCode: 201 })
    } catch (error) {
        console.log(error);
        console.error(error);
    }
}

// const { ObjectId } = require('mongoose').Types;
// GET-ADDRESS-By-ID

const getAddressById = async (req, res) => {
    try {
        const addressId = req.query.addressId;
        console.log("addressId", addressId);

        if (!addressId ) {
            return res.status(400).json({
                statusCode: 400,
                message: "Valid Address ID is required."
            });
        }
        // const objectId = new ObjectId(addressId);
        // console.log("objectId",objectId);
        // Find the address by ID
        const address = await addressModal.findById(addressId);

        // Check if the address exists
        if (!address) {
            return res.status(404).json({
                statusCode: 404,
                message: "Address not found."
            });
        }

        return res.status(200).json({
            message: "Address retrieved successfully",
            statusCode: 200,
            address: address
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
};



// UPDATE-SHIPMENT-ADDRESS
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

// - - - - - - - - - - - - - - - - - - - - - - - - -
// GET all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST a new contact
exports.createContact = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, message } = req.body;

    try {
        const newContact = new Contact({
            firstName,
            lastName,
            email,
            phoneNumber,
            message
        });

        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE a contact by ID
exports.deleteContact = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = {
    addShipmentAddress,
    updateShipmentAddress,
    getAddressById
}