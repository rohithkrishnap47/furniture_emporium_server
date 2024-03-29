const express = require('express')
// const router = {express}
const adminController = require('../controllers/admin/admin')
const router = express.Router()

// ADMIN_ROUTE
router.post("/adminRegister", (req, res) => {
    adminController.registerAdmin(req.body).then(result => {
        res.status(result.statusCode).json(result)
    })
})
// Update 
router.put("/updateAdmin/:id", (req, res) => {
    const productId = req.params.id;
    const updateddata = req.body;
    adminController.updateAdmin(productId, updateddata).then(result => {
        res.status(result.statusCode).json(result)
    })

})
// GET
router.get("/getAdmin/:id", (req, res) => {
    const productId = req.params.id;
    adminController.getAdmin(productId).then(result => {
        res.status(result.statusCode).json(result);
    });
});

router.get("/getAllAdmins", (req, res) => {
    // const productId = req.params;

    adminController.getAllAdmins().then(result => {
        res.status(result.statusCode).json(result);
    });
});

// DELETE
router.delete("/deleteAdmin/:id", (req, res) => {
    const productId = req.params.id;

    adminController.deleteAdmin(productId).then(result => {
        res.status(result.statusCode).json(result);
    });
});

// --------------------------------------------------------------------------------------
module.exports = router 