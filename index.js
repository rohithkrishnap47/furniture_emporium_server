const express = require("express")
const cors = require("cors")
const router = express.Router();
const app = express()


const adminController = require("./controllers/admin/admin")
const productController = require("./controllers/admin/product")
const categoryController = require("./controllers/admin/categories")


app.use(express.json())
app.use(cors({ origin: "*" }))

// PORT DECLARING
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log("port is now running",PORT)
})

// routing happens here
require("./routes/index")(app)


// ----------------------------------------------------------------------------------
// const express = require('express')
// const router = {express}


// // ADMIN_ROUTE
// app.post("/adminRegister", (req, res) => {
//     // console.log(req.body)
//     adminController.registerAdmin(req.body).then(result => {
//         res.status(result.statusCode).json(result)
//     })
// })
// // Update 
// app.put("/updateAdmin/:id",(req,res)=>{
//     const productId= req.params.id;
//     const updateddata= req.body;
//     // console.log(updateddata);
//     adminController.updateAdmin(productId,updateddata).then(result => {
//         res.status(result.statusCode).json(result)
//     })
    
// })
// // GET
// app.get("/getAdmin/:id", (req, res) => {
//     const productId = req.params.id;

//     adminController.getAdmin(productId).then(result => {
//         res.status(result.statusCode).json(result);
//     });
// });

// app.get("/getAllAdmins", (req, res) => {
//     // const productId = req.params;

//     adminController.getAllAdmins().then(result => {
//         res.status(result.statusCode).json(result);
//     });
// });

// // DELETE
// app.delete("/deleteAdmin/:id", (req, res) => {
//     const productId = req.params.id;

//     adminController.deleteAdmin(productId).then(result => {
//         res.status(result.statusCode).json(result);
//     });
// });

// --------------------------------------------------------------------------------------
// Category_ROUTE
// CREATE
app.post("/createCategory", (req, res) => {
    // console.log(req.body)
    categoryController.createcategory(req.body).then(result => {
        res.status(result.statusCode).json(result)
    })
})
// Update 
app.put("/updatecategory/:id",(req,res)=>{
    const productId= req.params.id;
    const updateddata= req.body;
    categoryController.updatecategory(productId,updateddata).then(result => {
        res.status(result.statusCode).json(result)
    })
    
})
// GET
app.get("/category/:id", (req, res) => {
    const productId = req.params.id;

    categoryController.getcategoryById(productId).then(result => {
        res.status(result.statusCode).json(result);
    });
});

app.get("/categoryAll", (req, res) => {
    // const productId = req.params;

    categoryController.getAllcategorys().then(result => {
        res.status(result.statusCode).json(result);
    });
});

// DELETE
app.delete("/deletecategory/:id", (req, res) => {
    const productId = req.params.id;

    categoryController.deletecategory(productId).then(result => {
        res.status(result.statusCode).json(result);
    });
});

// --------------------------------------------------------------------------------------
// Create a new product
app.post('/createProducts', async (req, res) => {
    try {
        const result = await productController.createProduct(req.body);
        res.status(result.statusCode).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a product by ID
app.put('/UpdateProducts/:id', async (req, res) => {
    const productId = req.params.id;
    const updatedProductData = req.body;

    try {
        const result = await productController.updateProduct(productId, updatedProductData);
        res.status(result.statusCode).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a product by ID
app.get('/UpdateProducts/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const result = await productController.getProductById(productId);
        res.status(result.statusCode).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all products
app.get('/productsAll', async (req, res) => {
    try {
        const result = await productController.getAllProducts();
        res.status(result.statusCode).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a product by ID
app.delete('/deleteProducts/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const result = await productController.deleteProduct(productId);
        res.status(result.statusCode).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;



// --------------------------------------------------------------------------------------
// ADMIN_ROUTE

// router
//      .route("/adminRegister/")
    //  .post(adminController.)

module.exports = app 
// .................................................................................
