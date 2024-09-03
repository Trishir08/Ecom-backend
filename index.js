import dotenv from "dotenv" 
import dataBaseConnection from "./config/dataBase.js";
import { app } from "./app.js";


dotenv.config({
    path : "./env"
})


dataBaseConnection()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Server running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Mongo-Db connection failed !!" ,err);
}) 


