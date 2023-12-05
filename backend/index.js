const express = require('express')
const app = express()
const port = 3000
const connectToMongo = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const manufacturer = require('./model/manufacture')
const seller = require('./model/seller')
const fetchUser = require('./middleware/fetchUser')
const cors = require('cors')
const saltRounds = 10;
const secreatKey='akisdon'
connectToMongo();
app.use(cors(
     {
         origin: ["https://verifyit.netlify.app","https://verifyit.vercel.app","http://localhost:5173"],
         methods: ["POST", "GET","DELETE","PUT"], 
         credentials: true
     }
))
app.use(express.json())

app.post('/createManufacturer', async (req, res) => {
    const { email } = req.body

    try{let checkEmail = await manufacturer.findOne({ email })
    if (checkEmail) { return res.status(400).json({ result: "email already registered" }) }
    try {
        let hash;
        hash = await bcrypt.hash(req.body.password, saltRounds)
        const user = manufacturer()
        user.name = req.body.name
        user.email = req.body.email
        user.address = req.body.address
        user.password = hash
        user.save()
        res.json({result:"user created succefully"})
    }
    catch (err) {
        // console.log(err)
        res.status(400).json({ error: err.message })
    }
}
catch(err){
    res.status(500).json({error:"Internal Server Error"})
}
    // res.send(req.body)
    // console.log(user)
})
app.post('/createSeller', async (req, res) => {
    const { email } = req.body

    try{let checkEmail = await seller.findOne({ email })
    if (checkEmail) { return res.status(400).json({ result: "email already registered" }) }
    try {
        let hash;
        hash = await bcrypt.hash(req.body.password, saltRounds)
        const user = seller()
        user.name = req.body.name
        user.email = req.body.email
        user.address = req.body.address
        user.password = hash
        user.save()
        res.json({result:"user created succefully"})
    }
    catch (err) {
        // console.log(err)
        res.status(400).json({ error: err.message })
    }
}
catch(err){
    res.status(500).json({error:"Internal Server Error"})
}
    // res.send(req.body)
    // console.log(user)
})

app.post('/loginManufacturer',async(req,res)=>{
    try{
    const {email,password}=req.body
    let user = await manufacturer.findOne({ email })
    if (!user) { 
        return res.status(400).json({ result: "User does not exist" })
     }
     const hash = user.password
     const authPass=await bcrypt.compare(password,hash)
     if(!authPass){ return res.status(400).json({ result: "please enter correct credentials" })}
    
    //  genetrating jwt token
    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, secreatKey)
    res.json({ token,name:user.name,email:user.email,status:"true",ids:"M"})
}
catch(err){
    res.status(500).json({error:"Internal Server Error"})
}

})
// login seller
app.post('/loginSeller',async(req,res)=>{
    try{
    const {email,password}=req.body
    let user = await seller.findOne({ email })
    if (!user) { 
        return res.status(400).json({ result: "User does not exist" })
     }
     const hash = user.password
     const authPass=await bcrypt.compare(password,hash)
     if(!authPass){ return res.status(400).json({ result: "please enter correct credentials" })}
    
    //  genetrating jwt token
    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, secreatKey)
    res.json({ token,"name":user.name,"email":user.email,status:"true",ids:"S" })
}
catch(err){
    res.status(500).json({error:"Internal Server Error"})
}

})


app.post('/fetchManufacturer',fetchUser,async(req,res)=>{
    try{const {userId}=req
    // let user = await manufacturer.findOne({ userId })
    let user= await manufacturer.find({"_id" :userId})
    const userSendData={
        name:user[0].name,
        email:user[0].email,
        address:user[0].address
    }
    res.send(userSendData)}
    catch(err){
        res.status(500).json({error:"Internal Server Error"})
    }
})
// fetch seller
app.post('/fetchSeller',fetchUser,async(req,res)=>{
    try{const {userId}=req
    // let user = await manufacturer.findOne({ userId })
    let user= await seller.find({"_id" :userId})
    const userSendData={
        name:user[0].name,
        email:user[0].email,
        address:user[0].address
    }
    res.send(userSendData)}
    catch(err){
        res.status(500).json({error:"Internal Server Error"})
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
