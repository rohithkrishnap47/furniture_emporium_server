const Product = require("../models/productModel");

// search products
exports.getAllproducts = async (options, sort) => {
    console.log(options)
    let pipeline = []
    if (options.name) {
        pipeline.push({ $match: { name: { $regex: options.name, $options: "i" } } })
    }
    pipeline.push(
        { $sort: sort },
        {
            $project: {
                _id: 1,
                name: '$name',  // Rename 'name' to 'productName'
                price: 1,               // Project 'price' as is
                images: 1,
                discount: 1
            }
        },
        {
            $facet: {
              metadata: [
                {
                  $group: {
                    _id: null,
                    total: { $sum: 1 },
                  },
                },
              ],
              data: [
                {
                  $skip: options.page * options.size,
                },
                {
                  $limit: options.size,
                },
              ],
            },
          },
    );
    return await Product.aggregate(pipeline);
}

