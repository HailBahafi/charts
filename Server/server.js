const express = require('express')
const app = express()
const cors =require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3001;
require('dotenv').config({ path: './dev.env' });

app.use(cors())
app.use(express.json())

const UserModel=require('./models/Users')

const password = process.env.PASSWORD

mongoose.connect(`mongodb+srv://Hail:${password}@cluster0.ma16vla.mongodb.net/MERN_STACK_ASSIGNMENT?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});


app.get('/user', async (req, res) => {
    try {
        const Users = await UserModel.find();
        res.status(200).json(Users);
        console.log('Hello')
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal server error');
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
