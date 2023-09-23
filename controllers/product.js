const Product = require('../models/product')

const getAllProductsStatic = async (req ,res) => {
    
    // for the filter of products/ data functionality pass the properties of data in the find method
    const products = await Product.find({}).select('name price')
        res.status(200).json({products, nbHits:products.length})
}

const getAllProducts = async (req ,res) => {
   
    const {feature , company, name, sort , fields, numericFilters} = req.query
    const queryObject = {}
    if(feature){
        queryObject.feature = feature === 'true' ? true : false
    } 
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }
    if(numericFilters){
        operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$gt',
            '>=':'$lte',

        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) =>`-${operatorMap[match]}-` )
        const options = ['price' ,'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator,value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
        console.log(numericFilters)
    }
    console.log(queryObject)
    let result =  Product.find(queryObject)
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
  
    else {
        result = result.sort('createdAt')
    }
    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    const page = Number(req.query.page) || 1
    const limit =Number(req.query.limit) || 10
    const skip =(page - 1) * limit

    result = result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({products, nbHits:products.length})
}
module.exports = {
    getAllProductsStatic,
    getAllProducts,
}