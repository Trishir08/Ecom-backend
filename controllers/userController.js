import { User } from "../models/userschema.js"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"

const registerUser = async (req , res) =>{
    
    try{

     if(!req.body.name || !req.body.email || !req.body.password){
            return res.status(401).json({
                message : "ALL fields are required ." ,
                success : false 
            })
        }

    let check = await User.findOne({email : req.body.email}) ; 
    if(check){
        return res.status(400).json({
            success : false , 
            errors : "User already exists"
        })
    }

    let cart = {} ; 
    for(let i = 0 ; i<300 ; i++){
        cart[i] =0 ;
    }

    const hashedPassword = await bcryptjs.hash(req.body.password ,10) ; 

    const user = new User({
        name : req.body.name , 
        email : req.body.email , 
        password : hashedPassword ,
        cartData :  cart,
    })

    await user.save() ; 

    const data = {
        user : {
            id : user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom')
    res.json({success : true , token , message:"Account created successfully"}) ;

    }catch(error){
        console.log(error);
    }
}

const loginUser = async (req , res)=>{
    try{

        let user = await User.findOne({email : req.body.email}) ;
        if(user){
            const isMatch = req.body.password === user.password;
            if(isMatch){
                const data = {
                    user : {
                        id : user.id ,
                    }
                }

                const token = jwt.sign(data , 'secret_ecom') ; 
                res.json({success : true , token , message : "Logged in Successfully"}) ; 
            }else{
                res.json({success : false , error : "Wrong Password"}) ; 
            }   
        }else{
            res.json({
                success : false ,
                error : "Wrong email id " ,
            })
        }
    }catch(error){
        console.log(error);
    }
}


export {registerUser , loginUser}