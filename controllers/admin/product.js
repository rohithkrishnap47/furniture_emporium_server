
// REQUIRE from database
const Product = require("../../models/productModel");
//------------------------------------------------------------------------------ 
// PRODUCTS

// ADD_product
const createProduct = (productData) => {
    // const newProduct = new Product(productData);
    return Product.findOne({ name:productData.name})
      .then((product) => {
        if(product){
            return {
                statusCode: 401,
                message: "Product EXISTS",
                data: product,
              };
        }
        else{
            const newProduct = new Product({
              name:productData.name,
              category:productData.category,
              type:productData.type,
              images:productData.images,
              description:productData.description,
              warranty:productData.warranty,
              price:productData.price,
              discount:productData.discount,
              stock:productData.stock,
              selling_price:productData.selling_price
            })
            newProduct.save()
            return {
              statusCode:200,
              message:"product created"
            }
        }
      });
  };


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
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};  