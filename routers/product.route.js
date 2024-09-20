import { Router } from "express";
import express from "express"
import { addProducts, getAllProducts, getNewCollections, removeProducts , popularWomen , addToCart , fetchUser , removeFromCart , getCart} from "../controllers/productController.js";

const router = Router() ; 

router.route("/addproduct").post(addProducts) ; 
router.route("/removeproduct").post(removeProducts) ;
router.route("/allProducts").get(getAllProducts) ;
router.route("/newcollections").get(getNewCollections) ;
router.route('/popular-women').get(popularWomen) ;
router.post('/addtocart' , fetchUser , addToCart) ; 
router.post('/removeFromCart' , fetchUser , removeFromCart) ; 
router.post('/getCart' , fetchUser , getCart) ; 


export default router ; 