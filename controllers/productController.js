import { Product } from "../models/productSchema.js"
import { User } from "../models/userschema.js";

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
    let products = await Product.find({}) ; 
    let newcollection = products.slice(1).slice(-8) ; 
    res.send(newcollection) ; 
}

const popularWomen = async(req,res)=>{
    let products = await Product.find({category : "women"}) ;
    let popular_in_women = products.slice(0,4) ; 
    res.send(popular_in_women) ; 
}

const fetchUser = async(req ,res , next)=>{
try{
    const token = req.header('auth-token') ;
    if(!token){
        res.status(401).send({error : "Please authenticate urself"})
    }else{
        const data = jwt.verify(token , 'secret_ecom') ;
        req.user = data.user ; 
        next() ; 
    }
}catch(error){
    res.status(401).send({errors : "please auhenticATE URSEL"}) ;
}
}

const addToCart = async(req , res)=>{
    let userData = await User.findOne({_id : req.user.id}) ;
    userData.cartData[req.body.itemId] += 1 ;
    await User.findOneAndUpdate({_id : req.user.id} , {cartData : userData.cartData})
    res.send("Added successfully") ; 
}

const removeFromCart = async(req , res)=>{
    let userData = await User.findOne({_id : req.user.id}) ;
    if( userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1 ;
    await User.findOneAndUpdate({_id : req.user.id} , {cartData : userData.cartData})
    res.send("Added successfully") ; 
}

const getCart = async(req , res)=>{
    let userData = await User.findOne({_id : req.user.id}) ; 
    res.json(userData.cartData) ;
}

export {getCart , getNewCollections , getAllProducts ,addProducts , removeProducts , popularWomen , addToCart , fetchUser , removeFromCart} ;