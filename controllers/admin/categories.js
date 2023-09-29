
// REQUIRE from database
const db = require("../database")
// const db = require("models/categoryModel.js")


//------------------------------------------------------------------------------ 

// CATEGORIES
// ADD_category
const createcategory = async (categoryData) => {
  // validating categoryname, categoryimage, description
  if (!categoryData.categoryName) {
    return {
      statusCode: 400,
      message: "Category name not found"
    }
  }
  // if (!categoryData.categoryImages) {
  //   return {
  //     statusCode: 400,
  //     message: "Category Image not found"
  //   }
  // }
  if (!categoryData.description) {
    return {
      statusCode: 400,
      message: "Category Description not found"
    }
  }

  try {
    const caT = await db.Category.findOne({ categoryName: categoryData.categoryName })
    console.log("cat_cons", caT);
    if (caT) {
      return {
        statusCode: 401,
        message: "CATEGORY EXISTS",
        data: caT.categoryName,
      };
    }
    else {
      const newcategories = new db.Category({
        categoryName: categoryData.categoryName,
        categoryImages: categoryData.categoryImages,
        description: categoryData.description,
      })
      newcategories.save()
      return {
        statusCode: 200,
        message: "category created"
      }
    }
  } catch (error) {
    console.log(error);
  }




  // .then((category) => {
  //     console.log("kirrrrrrr",category);
  //     if (category) {
  //       return {
  //         statusCode: 401,
  //         message: "CATEGORY EXISTS",
  //         data: category,
  //       };
  //     }
  //     else {
  //       const newcategories = new db.Category({
  //         categoryName: categoryData.categoryName,
  //         categoryImages: categoryData.categoryImages,
  //         description: categoryData.description,
  //       })
  //       newcategories.save()
  //       return {
  //         statusCode: 200,
  //         message: "category created"
  //       }
  //     }
  //   });
};


// GET_ALL_CATEGOrIES

const getAllcategorys = () => {
  return db.Category.find()
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
  return db.Category.findById(categoryId)
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
  return db.Category.findByIdAndUpdate(
    categoryId,
    updatedcategoryData,
    { new: true }
  )
    .then((category) => {
      if (!category) {
        return {
          statusCode: 404,
          message: "category not found",
        };
      }
      return {
        statusCode: 200,
        message: "category updated successfully",
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



// DELETE_CATEGOrIES
const deletecategory = (categoryId) => {
  return db.Category.findByIdAndDelete(categoryId)
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


//------------------------------------------------------------------------------ 
module.exports = {
  createcategory,
  getAllcategorys,
  getcategoryById,
  updatecategory,
  deletecategory
};  