const categoryModal = require("../../models/categoryModel");
const productModal = require("../../models/productModel")

// CATEGORIES
// ADD_category
const createcategory = async (categoryData) => {
  console.log("categdata******", categoryData)


  try {
    const caT = await categoryModal.findOne({ categoryName: categoryData.categoryName })
    console.log("cat_cons", caT);
    if (caT) {
      return {
        statusCode: 400,
        message: "CATEGORY EXISTS",
        data: caT.categoryName,
      };
    }
    const newcategories = new categoryModal({
      categoryName: categoryData.categoryName,
      categoryImages: categoryData.categoryImages,
      description: categoryData.description,
    })
    await newcategories.save()
    return {
      statusCode: 200,
      message: "category created"
    }
  }
  catch (error) {
    console.log(error);
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

const updatecategory = (categoryId, updatedcategoryData) => {
  return categoryModal.findByIdAndUpdate(
    categoryId,
    updatedcategoryData,
    { new: true }
  )
    .then((category) => {
      if (!category) {
        console.log("Category not found");
        return {
          statusCode: 404,
          message: "Category not found",
        };
      }
      console.log("Category updated successfully:", category);
      return {
        statusCode: 200,
        message: "Category updated successfully",
        data: category,
      };
    })
    .catch((error) => {
      console.error("Internal Server Error:", error);
      return {
        statusCode: 500,
        message: "Internal Server Error",
        error: error.message,
      };
    });
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