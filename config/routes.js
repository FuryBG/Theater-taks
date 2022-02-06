const authController = require("../controllers/authController");
const productsController = require("../controllers/productController");


module.exports = (app) => {
    app.use("/auth", authController);
    app.use("/", productsController);
};