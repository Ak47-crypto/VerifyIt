const mongoose=require( 'mongoose')
const { Schema } = mongoose;

const manufacturerSchema = new Schema({
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
  address:{
    type:String,
    required:true
  },
  date:{
    type: Date,
    default: Date.now
  }
});
module.exports= mongoose.model('manufacturer', manufacturerSchema);
