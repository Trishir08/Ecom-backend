import { Router } from "express";
import express from "express"
import { addProducts, getAllProducts, getNewCollections, removeProducts } from "../controllers/productController.js";

const router = Router() ; 

router.route("/addproduct").post(addProducts) ; 
router.route("/removeproduct").post(removeProducts) ;
router.route("/allProducts").get(getAllProducts) ;
router.route("/newcollections").get(getNewCollections) ;

export default router ; 