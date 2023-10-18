const express = require('express')
// const router = {express}
const adminController = require('../controllers/admin/admin')
const router = express.Router()

// ADMIN_ROUTE
router.post("/adminRegister", (req, res) => {
    // console.log(req.body)
    adminController.registerAdmin(req.body).then(result => {
        res.status(result.statusCode).json(result)
        // console.log("helloooo",result.statusCode);
    })
})
// Update 
router.put("/updateAdmin/:id", (req, res) => {
    const productId = req.params.id;
    const updateddata = req.body;
    // console.log(updateddata);
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
// ADMIN_ROUTE

// router
//      .route("/adminRegister/")
//  .post(adminController.)

module.exports = router 