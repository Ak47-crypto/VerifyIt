const mongoose = require('mongoose');
const mongourl='mongodb+srv://ak47:random1234@cluster0.ebctdyz.mongodb.net/verifyit?retryWrites=true&w=majority';
async function connectToMongo(){
    try{await mongoose.connect(mongourl)
    console.log('db connectin established')
    }
    catch(error){
        console.log("db connection failed")
    }

}



module.exports=connectToMongo