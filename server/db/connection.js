const mongoose=require('mongoose');



const connectDB=async()=>{

   

    try{
        const conn=await mongoose.connect("mongodb+srv://demo:vijay@cluster0.6thcx.mongodb.net/notification?retryWrites=true&w=majority",({
                useNewUrlParser: true,
                useUnifiedTopology: true,
        }));

       console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch(err){

        console.log(err);
        process.exit(1)
    
    
    }

}

module.exports=connectDB;