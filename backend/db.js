const mongoose = require('mongoose');
const mongourl='mongodb://127.0.0.1:27017/test';
async function connectToMongo(){
    try{await mongoose.connect(mongourl)
    console.log('db connectin established')
    }
    catch(error){
        console.log("db connection failed")
    }

}



module.exports=connectToMongo