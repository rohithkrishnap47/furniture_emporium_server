
// REQUIRE from database
const { validationResult } = require("express-validator");
const Product = require("../../models/productModel");
const cloudinary = require("../../services/cloudinary")
//------------------------------------------------------------------------------ 
// PRODUCTS

// ADD_product
const createProduct = async (req, res) => {
  try {
      const productData = req.body;
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
          return res.status(400).json({
              statusCode: 400,
              message: "Bad input string",
              errors: errors.array(),
          });
      }

      const product = await Product.findOne({ name: productData.name });

      if (product) {
          return res.status(401).json({
              statusCode: 401,
              message: "Product already exists",
              data: product,
          });
      }

      if (!req.file) {
          return res.status(400).json({
              statusCode: 400,
              message: "No file found",
          });
      }

      const upload = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });

      const newProduct = new Product({
          name: productData.name,
          category: productData.category,
          type: productData.type,
          images: upload.secure_url,
          warranty: productData.warranty,
          price: productData.price,
          discount: productData.discount,
          stock: productData.stock,
      });

      await newProduct.save();

      res.status(201).json({
          statusCode: 201,
          message: "Product created successfully",
          data: newProduct,
      });

  } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({
          statusCode: 500,
          message: "Internal server error",
      });
  }
};

module.exports = createProduct;



// GET_ALL_PRODUCTS

const getAllProducts = () => {
  return Product.find({})
    .then((products) => {
      return {
        statusCode: 200,
        message: "Products retrieved successfully",
        data: products,
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

// GET_SINGLE_PRODUCT
const getProductById = (productId) => {
  return Product.findById(productId)
    .then((product) => {
      if (!product) {
        return {
          statusCode: 404,
          message: "Product not found",
        };
      }
      return {
        statusCode: 200,
        message: "Product retrieved successfully",
        data: product,
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


//   UPDATE_PRODUCT

const updateProduct = (productId, updatedProductData) => {
  const required = ["name", "category", "warranty","price","discount"]
  const validationError = bodyRequiredDataValidator(body, required);
  if (validationError) {
    return {
      statusCode: 400,
      error: validationError,
    }
  }
  return Product.findByIdAndUpdate(
    productId,
    updatedProductData,
    { new: true }
  )
    .then((product) => {
      if (!product) {
        return {
          statusCode: 404,
          message: "Product not found",
        };
      }
      return {
        statusCode: 200,
        message: "Product updated successfully",
        data: product,
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



// DELETE_PRODUCT
const deleteProduct = (productId) => {
  return Product.findByIdAndDelete(productId)
    .then((product) => {
      if (!product) {
        return {
          statusCode: 404,
          message: "Product not found",
        };
      }
      return {
        statusCode: 200,
        message: "Product deleted successfully",
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
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};  