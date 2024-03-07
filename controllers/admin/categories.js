const { body } = require("express-validator");
const categoryModal = require("../../models/categoryModel");
const productModal = require("../../models/productModel")
const cloudinary = require("../../services/cloudinary");


// CATEGORIES
// ADD_category
const createcategory = async (req, res) => {
  try {
    console.log("Received category data:", req.body);
    const { categoryName, description } = req.body;

    // Check if file exists in the request
    if (!req.file) {
      res.status(400).json({
        statusCode: 400,
        message: "No file found",
      });
    }

    console.log("File received:", req.file);

    // Check if category already exists
    const existingCategory = await categoryModal.findOne({ categoryName: categoryName });
    console.log(existingCategory, "007");
    if (existingCategory) {
      res.status(400).json({
        statusCode: 400,
        message: "Category already exists",
        data: existingCategory.categoryName,
      });
    }

    console.log("Uploading file to Cloudinary...");
    const upload = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
    console.log("File uploaded to Cloudinary:", upload);

    // Create new category
    const newCategory = new categoryModal({
      categoryName: categoryName,
      categoryImages: upload.secure_url,
      description: description,
    });

    await newCategory.save();

    res.status(200).json({
      statusCode: 200,
      message: "Category created",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};



// GET_ALL_CATEGOrIES

const getAllcategorys = () => {
  return categoryModal.find()
    .then((categorys) => {
      return {
        statusCode: 200,
        message: "categorys retrieved successfully",
        data: categorys,
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

// GET_SINGLE_CATEGOrIES
const getcategoryById = (categoryId) => {
  return categoryModal.findById(categoryId)
    .then((category) => {
      if (!category) {
        return {
          statusCode: 404,
          message: "category not found",
        };
      }
      return {
        statusCode: 200,
        message: "category retrieved successfully",
        data: category,
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


//   UPDATE_CATEGOrIES

// const updatecategory = (categoryId, updatedcategoryData) => {
//   return categoryModal.findByIdAndUpdate(
//     categoryId,
//     updatedcategoryData,
//     { new: true }
//   )
//     .then((category) => {
//       if (!category) {
//         console.log("Category not found");
//         return {
//           statusCode: 404,
//           message: "Category not found",
//         };
//       }
//       console.log("Category updated successfully:", category);
//       return {
//         statusCode: 200,
//         message: "Category updated successfully",
//         data: category,
//       };
//     })
//     .catch((error) => {
//       console.error("Internal Server Error:", error);
//       return {
//         statusCode: 500,
//         message: "Internal Server Error",
//         error: error.message,
//       };
//     });
// };

// UPDATE-CATEGORY-NEW-ONE
const updatecategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { categoryName, description } = req.body;

    console.log("Request Body:", req.body);

    let uploadimg;
    if (req.file) {
      uploadimg = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      console.log("Uploaded Image:", uploadimg);
    }

    const updatedData = {};
    if (categoryName) updatedData.categoryName = categoryName;
    if (uploadimg) updatedData.categoryImages = uploadimg.secure_url;
    if (description) updatedData.description = description;
    console.log("updatedData",updatedData);
    const category = await categoryModal.findByIdAndUpdate(
      { _id: categoryId },
      updatedData,
      { new: true }
    );

    if (!category) {
      console.log("Category not found");
      return res.status(404).json({
        statusCode: 404,
        message: "Category not found",
      });
    }

    console.log("Category updated SUCCESSFULLY :)", category);
    res.status(200).json({
      statusCode: 200,
      message: "Category updated SUCCESSFULLY :)",
      data: category,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};






// DELETE_CATEGOrIES
const deletecategory = (categoryId) => {
  return categoryModal.findByIdAndDelete(categoryId)
    .then((category) => {
      if (!category) {
        return {
          statusCode: 404,
          message: "category not found",
        };
      }
      return {
        statusCode: 200,
        message: "category deleted successfully",
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

// GET-PRODUCT-BY-CATEGORY
exports.getProductsByCategory = async (req, res) => {
  try {
    console.log("haiiiii");
    const categorylist = categoryModal.find()
    const productlist = productModal.find()
    const productByCategory = categorylist.forEach(item => {
      item.products = productlist.find(p => {
        return p.category == item.categoryName
      })

    })
    return {
      statusCode: 200,
      message: "success",
      data: productByCategory,
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//------------------------------------------------------------------------------ 
module.exports = {
  createcategory,
  getAllcategorys,
  getcategoryById,
  updatecategory,
  deletecategory
};  