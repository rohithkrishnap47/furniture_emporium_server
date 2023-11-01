const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/admin/banner');
const uploader = require("../services/multer")
const cloudinary = require("../services/cloudinary")
const {check}=require("express-validator")

const bannerValidator = [
    // body("bannerImage").notEmpty(),
    check("description").notEmpty(),
    check("bannerTitle").notEmpty(),
]


// Create Banner
router.post("/createbanner", uploader.single("file"),bannerValidator, bannerController.createBanner);


// Update Banner
router.put("/updateBanner/:id", bannerController.updateBanner);


// Get Banner by ID
router.get("/getBanner/:id", (req, res) => {
    const bannerId = req.params.id;
    bannerController.getBannerById(bannerId).then(result => {
        res.status(result.statusCode).json(result);
    });
});

// Get All Banners
router.get("/getAllBanners", (req, res) => {
    bannerController.getAllBanners().then(result => {
        res.status(result.statusCode).json(result);
    });
});

// Delete Banner
router.delete("/deleteBanner/:id", (req, res) => {
    const bannerId = req.params.id;
    bannerController.deleteBanner(bannerId).then(result => {
        res.status(result.statusCode).json(result);
    });
});

module.exports = router;
