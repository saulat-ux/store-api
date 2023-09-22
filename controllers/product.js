const Product = require('../models/product')

const getAllProductsStatic = async (req ,res) => {
    // for the filter of products/ data functionality pass the properties of data in the find method
    const products = await Product.find({})

        res.status(200).json({products, nbHits:products.length})
}

const getAllProducts = async (req ,res) => {
    console.log(req.query)
    res.status(200).json({msg:'products route'})
}
module.exports = {
    getAllProductsStatic,
    getAllProducts,
}