const Product = require('../Models/Productmodel')
const { findOne, findById } = require('../Models/UserModel')
const User = require('../Models/UserModel')

const addProduct = async(req,res) => {
    try{
        const {name,category,count} = req.body
        const user = await User.findById({_id:req.user._id})
        if(user){
            const product = await Product.create({
                user:user._id,
                name:name,
                category:category,
                count:count
            })
            if(product){
                res.status(200).json(product)
            }else{
                res.status.json({message:"unable to add product"})
            }
        }else{
            res.status(404).json({message:"Not Authorized"})
        }
    }catch(error){
        console.log(error)
    }
}

const getAllProducts = async(req,res) =>{
    try{
        const user = await User.findById({_id:req.user._id})

        if(user){
            const products = await Product.find({user:user._id})
            res.status(200).json(products)
        }else{
            res.status(404).json({message:"Not authorized"})
        }
    }catch(error){
        console.log(error)
    }
}

const getProductById = async(req,res) => {
    try{
        let id = req.params.id
        const user = await User.findById({_id:req.user._id})
        if(user){
            const product = await Product.findById({_id:id})
            res.status(200).json(product)
        }else{
            res.status(404).json({message:"Not authorized"})
        }
    }catch(error){
        console.log(error)
    }
}

const updateProductById = async(req,res) => {
    try{
        const {name ,category,count} = req.body
        let id = req.params.id
        const user = await User.findById({_id:req.user._id})
        if(user){
            const product =await Product.findById({_id:id})
            if(product){
                product.name = name
                product.category = category
                product.count = count

                const updatedProduct = await product.save()
                res.status(200).json(updatedProduct)
            }else{
                res.status(404).json({message:"Invalid product id"})
            }
        }else{
            res.status(404).json({message:"Not authorized"})
        }
    }catch(error){
        console.log(error)
    }
}

const deleteProduct = async (req,res) =>{
    try{
        let id = req.params.id
        const user = await User.findById({_id:req.user._id})
        if(user){
            const productDel = await Product.deleteOne({_id:id})
            if(productDel){
                res.status(200).json({message:"Producyt deleted successfully"})
            }else{
                res.status(404).json({message:"unable to delete successfully"})
            }
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProduct
}