
// REQUIRE from database
const { validationResult } = require("express-validator");
const Product = require("../../models/productModel");
const cloudinary = require("../../services/cloudinary");
const { productService } = require("../../services");//from "index.js" services
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



// ----------------------------------------
// GET_ALL_PRODUCTS
const getAllProducts = async (req, res) => {
  try {
    let name = req.query ? req.query.name : ""
    console.log("req.query", req.query);
    let price = parseInt(req.query.price)
    let nameSort = parseInt(req.query.namesort)
    let categoryName = (req.query?.cat ?? [])
    let decodeCat = decodeURIComponent(categoryName)
    let priceFilter = parseInt(req.query.PriceFil)
    let minPrice = parseInt(req.query.minvalue)
    let maxPrice = parseInt(req.query.maxvalue)
    const options = { name }
    console.log("cat", categoryName)

    let sort = { _id: -1 }; //default sort
    if (price) {
      delete sort._id;
      sort["price"] /* model */ = price //price declared above;
    }
    if (nameSort) {
      delete sort._id;
      sort["name"] = nameSort;
    }
    // --
    if (categoryName?.length) {
      options["category"] = (JSON.parse(decodeCat));
    }
    if (priceFilter) {
      options["priceFilter"] = priceFilter;
    }
    if (minPrice) {
      options["minPrice"] = minPrice;
    }
    if (maxPrice) {
      options["maxPrice"] = maxPrice;
    }
    // FUTURE-->
    // if (brandName) {
    //   options["brandName"] = brandName;
    // }
    // --
    const result = await productService.getAllproducts(options, sort)
    console.log("result", result);
    return res.json({
      statusCode: 200,
      message: "Products retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
}
// ----------------------------------------


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


// -----------------------------------------------------
// update_product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const body = req.body
    const product = Product.find(productId)
    if (!product) {
      throw new Error("product not found")
    }
    let uploadimg
    if (req.file) {

      uploadimg = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      console.log("uploadimg", uploadimg);
    }
    if (!uploadimg) {
      return {
        statusCode: 200,
        message: "Product found",
      }

    };
    const updatedData = await Product.findByIdAndUpdate(productId, body)
    return {
      statusCode: 200,
      message: "Product updated",
    };
  } catch (error) {
    return {
      statusCode: 200,
      message: "Product found",
      error: error.message,
    }

  };
}
// -----------------------------------------------------
// DELETE_PRODUCT
const deleteProduct = (productId) => {
  console.log("productId", productId);
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