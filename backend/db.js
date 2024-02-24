const mongoose=require('mongoose');
// const mongoURI="mongodb://127.0.0.1:27017/API"
const MONGODB_URL = "mongodb+srv://chelawatak:KX5pnrRcFeHuwfn8@cluster1.o89uvgr.mongodb.net/apiapp"
require("dotenv").config();


const connectToMongo=()=>{
    mongoose.connect(MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })

    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )



    // mongoose.connect(mongoURI);
    // console.log("connected to mongo successfully");
}

module.exports = connectToMongo;