import mongoose from "mongoose";


const dataBaseConnection = async ()=>{

    try{
        await mongoose.connect(`${process.env.MONGO_DB_URI}`) ; 
        console.log("DataBase connection successfull");
    }catch(error){
        console.log(error);
    }
}

export default dataBaseConnection