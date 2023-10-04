module.exports=(app)=>{
    app.use("/admin",require("./admin_route")),
    app.use("/category",require("./category_route")),
    app.use("/product",require("./product_route"))
    app.use("/banner",require("./banner_route"))
    app.use("/auth",require("./auth_route"))
    
    
}