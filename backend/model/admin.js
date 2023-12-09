const mongoose=require( 'mongoose')
const { Schema } = mongoose;

const adminSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  walletAddress:{
    type:String,
    required:true
  },
  date:{
    type: Date,
    default: Date.now
  }
});
module.exports= mongoose.model('admin', adminSchema);
