const express = require('express')
const {addProduct ,getAllProducts,getProductById, updateProductById, deleteProduct} = require('../Controllers/ProductController')
const Tokenverify = require('../Middlewares/VerifyToken')
const router = express.Router()

router.post("/api/v1/addProduct",Tokenverify,addProduct)

router.get("/api/v1/getAllProducts",Tokenverify,getAllProducts)

router.get("/api/v1/getProductByid/:id",Tokenverify,getProductById)

router.put("/api/v1/updateProductByid/:id",Tokenverify,updateProductById)

router.delete("/api/v1/deleteProductByid/:id",Tokenverify,deleteProduct)

module.exports = router