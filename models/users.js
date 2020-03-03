// All requires
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Extracting The Schema From The Mongoose
const Schema = mongoose.Schema;

// creating the schema for the users
const userSchema = new Schema({
    username :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    location:{
        type:String
    },
    imagePath: {
        type: String,
        // required: true
    },
    intrests: [{
        type: String
    }],
    otp: {
        type: Number
    },
    verified: {
        type: Boolean,
        default: false
    }
},
    {timestamps:true}
    );

 // Implementing The Pre-save Function To Hash The Password
 userSchema.pre("save", function(next){
   if(this.password && this.isModified("password")){
       bcrypt.hash(this.password,10,(err,password)=>{
           if(err) return next(err);
           this.password = password;
           next();
       })
   } else{
       next();
   }
 });
 
 // Comparig The Hash And Plane Password
 userSchema.methods.verifyPassword = function(password,done){
     bcrypt.compare(password,this.password,(err,matched)=>{
         if(err) return done(null,false);
         done(null,matched);
     });
 };

// making the model of the schema and exporting the model
module.exports = mongoose.model("User", userSchema);