const Banner = require("../../models/bannerModel");
const bannerModal = require("../../models/bannerModel")
const { validationResult } = require("express-validator")
const cloudinary = require("../../services/cloudinary")

// app.use(express.json());

// create banner ------------------------------------------------------------------------
const createBanner = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {

            throw new Error("Bad input string", errors)
        }
        if (!req.file) {
            throw new Error("no file found")
        }
        const upload = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
        console.log(req.body);
        const newBanner = new bannerModal({
            bannerImage: upload.secure_url,
            description: req.body.description,
            bannerTitle: req.body.bannerTitle,
            relatedItemId: req.body.relatedItemId,
            clickType: req.body.clickType,
        });

        newBanner.save();
        console.log("banner created successfully", upload);
        res.status(200).json({
            message: "Banner Created successfully"
        })
       
    } catch (error) {
        console.error(error);
      
    }
};

// GET all banners----------------------------------------------------------------------

const getAllBanners = () => {
    return bannerModal.find({})
        .then((banners) => {
            return {
                statusCode: 200,
                message: "Banners retrieved successfully",
                data: banners,
            };
        })
        .catch((error) => {
            return {
                statusCode: 500,
                message: "Internal Server Error",
                error: error.message,
            };
        });
};

// GET Banner by Id---------------------------------------------------------------------
const getBannerById = (bannerId) => {
    return bannerModal.findById(bannerId)
        .then((banner) => {
            if (!banner) {
                return {
                    statusCode: 404,
                    message: "Banner not found",
                };
            }
            return {
                statusCode: 200,
                message: "Banner retrieved successfully",
                data: banner,
            };
        })
        .catch((error) => {
            return {
                statusCode: 500,
                message: "Internal Server Error",
                error: error.message,
            };
        });
};

// UPDATE banner----------------------------------------------------------------------------------------
const updateBanner = async (req, res, next) => {
    try {
        console.log("new errorrrrrr",req.body);
        const bannerId = req.params.id
        
        // const {bannerTitle,description}=req.body; //old one
        const {bannerTitle,description,relatedItemId,clickType}=req.body;
        
        const banner=Banner.findById(bannerId)
        if(!banner){
            throw new Error("Banner does not exist");
        }
        let uploadimg
        if (req.file) {

            uploadimg = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });

            console.log(uploadimg);
        }
        const bannerImage=uploadimg?uploadimg.secure_url:banner.bannerImage
        console.log(bannerImage);
        console.log(description);
        console.log(bannerTitle);
        const updatedData = await bannerModal.findByIdAndUpdate(
            bannerId,
            {
                $set:{
                    bannerImage,
                    description,
                    bannerTitle,
                    relatedItemId,
                    clickType
                },
            },
            { new: true }
        )
        console.log("banner Updated Successfully",);
        res.status(200).json({
            message: "Banner Updated successfully"

        })
        console.log(updatedData);

    } catch (error) {
        console.error(error);
        next(error);
    }

};


// DELETE banner
const deleteBanner = (bannerId) => {
    console.log("banDelete", bannerId);
    return Banner.findByIdAndDelete(bannerId)
        .then((banner) => {
            if (!banner) {
                return {
                    statusCode: 404,
                    message: "Banner Not Found"
                };

            }
            return {
                statusCode: 200,
                message: "Banner created ,Hurray!!"
            };

        })
        .catch((error) => {
            return {
                statusCode: 500,
                message: "Iternal server ERROR :( ",
                // console.error(error),
                error: error.message,
            };
        });
};
//------------------------------------------------------------------------------
// Validator function
const bodyRequiredDataValidator = (body, fields) => {
    let required = []
    fields.forEach((key) => {
        if ([undefined, '', null].includes(body[key])) {
            required.push(key)
        }
    })
    return required.length ? { "missing": required } : undefined
}
//------------------------------------------------------------------------------ 


// _____________________________________________________________________
module.exports = {
    createBanner,
    getAllBanners,
    getBannerById,
    updateBanner,
    deleteBanner
};




// ------------------------------------------------------------------------------
// const required = ["bannerTitle", "bannerImage", "description"]
// const validationError = bodyRequiredDataValidator(updatedBannerData, required);
// if (validationError) {
//     return {
//         statusCode: 400,
//         error: validationError,
//     }
// }
// ------------------------------------------------------------------------------