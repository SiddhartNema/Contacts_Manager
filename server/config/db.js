const mongoose = require('mongoose')
const connectDB = async() =>{
    return mongoose.connect("mongodb://localhost/contact_manager")
    .then(()=> console.log(`conect to db`))
    .catch((err)=> console.log(err))
}

module.exports = connectDB