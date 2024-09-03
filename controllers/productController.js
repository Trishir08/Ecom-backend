import { Product } from "../models/productSchema.js"

const addProducts = async (req , res)=>{

    try{
    let products = await Product.find({}) ; 
    let id ; 

    if(products.length > 0){
        let last_product_array = products.slice(-1) ; 
        let last_product = last_product_array[0] ; 
        id = last_product.id + 1 ; 
    }else{
        id = 1 ; 
    }

    const product = new Product({
        id : id ,
        name : req.body.name ,
        image : req.body.image ,
        category : req.body.category ,
        new_price : req.body.new_price , 
        old_price : req.body.old_price , 
    })

    console.log(product);
    await product.save() ; 

    res.json({
        success : true , 
        name : req.body.name
    })
 }catch(error){
    console.log(error);
 }} 


const removeProducts = async (req , res) => {
    try{

        await Product.findOneAndDelete({id : req.body.id}) ; 
        console.log("removed");
        res.json({
            message : "Product is removed from the database" , 
            success : true
        })
    }catch(error){ 
        console.log(error);
    }
}


const getAllProducts = async(req , res)=>{
    try{

         let products = await Product.find({}) ; 
         console.log("All products are fetched");
         res.send(products) ;   
    }catch(error){
        console.log(error);
    }
}

const getNewCollections = async(req , res)=>{
    let products = await Product.find() ; 
    let newcollection = products.slice(1).slice(-8) ; 
    res.send(newcollection) ; 
}

export { getNewCollections , getAllProducts ,addProducts , removeProducts} ;