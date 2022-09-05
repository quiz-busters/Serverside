const mongoose = require('mongoose')

async function connectDB(url) {
   
    const connected =  await mongoose
    .connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
   return connected;
}

module.exports = connectDB
