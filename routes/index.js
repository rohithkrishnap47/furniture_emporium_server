// const router = require("./admin_route")

module.exports = (app) => {
    app.use("/admin", require("./admin_route")),
    app.use("/admin", require("./auth_route")),
    app.use("/admin", require("./coupon_route")),
    app.use("/cart", require("./cart_route")),
    app.use("/category", require("./category_route")),
    app.use("/product", require("./product_route")),
    app.use("/banner", require("./banner_route")),
    app.use("/auth", require("./auth_route")),
    app.use("/user", require("./user_route"))
    app.use("/user", require("./order_route"))
    // app.use("/user", require("./category_route"))

}
// module.exports=router