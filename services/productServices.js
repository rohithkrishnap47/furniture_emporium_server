const Product = require("../models/productModel");

// search products
exports.getAllproducts = async (options) => {
    console.log(options)
    let pipeline = []
    if (options.name) {
        pipeline.push({ $match: { name: { $regex: options.name, $options: "i" } } })
    }
    pipeline.push({
        $project: {
            _id: 1,
            name: '$name',  // Rename 'name' to 'productName'
            price: 1,               // Project 'price' as is
            images:1,
            discount:1
        }
    });
    return await Product.aggregate(pipeline);
}