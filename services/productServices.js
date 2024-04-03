const Product = require("../models/productModel");

// search products
exports.getAllproducts = async (options, sort) => {
    console.log(options)
    let pipeline = []
    if (options.name) {
        pipeline.push({ $match: { name: { $regex: options.name, $options: "i" } } })
        // pipeline.push({ $match: { name: { $regex: '^' + options.name, $options: "i" } } });   //starting with that perticular letter

    }
    if (options.category?.length) {
        pipeline.push({
            $match: {
                category: { $in: options.category || [] }, // Use an empty array if options.category is not defined
            },
        });
    }
    if (options.minPrice !== undefined || options.maxPrice !== undefined) {
        let priceRangeCondition = {};

        if (options.minPrice !== undefined) {
            priceRangeCondition.$gte = options.minPrice;
        }

        if (options.maxPrice !== undefined) {
            priceRangeCondition.$lte = options.maxPrice;
        }

        pipeline.push({
            $match: {
                price: priceRangeCondition,
            },
        });
    }
    pipeline.push(
        { $sort: sort },
        {
            $project: {
                _id: 1,
                name: '$name',  // Rename 'name' to 'productName'
                price: 1,               // Project 'price' as is
                images: 1,
                discount: 1,
                category: 1,
                stock: 1,
                warranty: 1
            }
        },
    );
    return await Product.aggregate(pipeline);
}

