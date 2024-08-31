const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/userSchema')
const SECRET_KEY= 'secretkeyy'

const app=express()

const dbURI= 'mongodb+srv://surajsenapati58:Suraj%4024@cluster0.yzsvn.mongodb.net/UsersDB?retryWrites=true&w=majority&appName=Cluster0'
mongoose
.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
 })
 .then(() => {
    app.listen(3001, () => {
        console.log('Server is connected to port 3001 and connected to MongoDb')
    })
 })
 .catch((error) => {
    console.log('Unnable to connect to server or mongoDB')
 })

//middleware
app.use(bodyParser.json())
app.use(cors())

//Routes
//User registeration
//post signup
app.post('/signup', async (req, res) => {
    try{
        const { name, email, password }=req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'User created succesfully' })
    } catch (error) {
        res.status(500).json({error: 'Error Signing Up'})
    }
})
//get signedup users
app.get('/signup', async (req, res) => {
    try{
        const users = await User.find()
        res.status(201).json(users)
    }catch (error) {
        res.status(500).json({ error: 'Unable to get users' })
    }
})

//Get Login
app.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body
        const user= await User.findOne({ email })
        if(!user){
            return res.status(401).json({ error: 'Invalid Credentials' })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({error: 'Invalid Credentials' })
        }
        const token=jwt.sign({ userId: user._id}, SECRET_KEY, { expiresIn: '1hr' })
        res.json({message: 'Login successful'})
    }catch (error) {
        res.status(500).json({ error: 'Error logging in'})
    }
})




// Create // POST REQUEST
// Read // GET REQUEST


