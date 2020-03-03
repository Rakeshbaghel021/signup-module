const User = require('../models/users');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rkrkumar021@gmail.com',
    pass: process.env.EMAILPASSWORD
  }
});

module.exports = {
    Signup : async (req,res,next) => {
        try{
          let user = await User.create(req.body);

          if(!user)
          return res.json({success:false,message:"user not found"});
          if(user) {
            let otp = Math.floor(Math.random() * 90000) + 10000

            var mailOptions = {
              from: 'rkrkumar021@gmail.com',
              to: `${user.email}`,
              subject: "OTP for registration.",
              text: `${otp}`
            }

            transporter.sendMail(mailOptions, function(error, info) {
              if(error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            })

            await User.findByIdAndUpdate(user.id, { otp: otp }, { new: true });

            // Generate Token
          jwt.sign(
            {
                userid: user._id,
                username: user.username,
                email: user.email
                         
             },
                process.env.SECRET,
                (err, token) => {
                if (err) return next(err);
                    res.json({ success: true, user, token });
                    }
                    );
          }
        } catch(error){
            return next(error);
        }
        },
// Signin 
 
    Signin : async (req,res,next) => {
            let {email,password} = req.body;
            try{
                let user = await User.findOne({email});
                if(!user) res.json({success:false,message:"Invalid email"});
               
                if(user.verified) {
                  user.verifyPassword(password,(err,matched)=>{
                    if(err) return next(err);
                    if(!matched)
                    return res.json({success:false,message:"Invaild passowrd"});

// jwt
         jwt.sign(
            {
                userid: user._id,
                username: user.username,
                email: user.email
                         
             },
                process.env.SECRET,
                (err, token) => {
                if (err) return next(err);
                    res.json({ success: true, message: "you are logged in", token, user });
                    }
                    );
                });
                } else {
                  res.json({ msg: "Verification Failed!" })
                }
                  } catch (err) {
                    return next(err);
                  }
                },
                
            
//get single user
SingleUser: async (req, res, next) => {
    const id = req.params.id;
    try {
      let user = await User.findById(id, "-password");
      if (!user) res.json({ success: false, message: "no user found!" });
      res.json({ user, success: true });
    } catch (err) {
      return next(err);
    }
  },

// Get current user
CurrentUser: async (req, res, next) => {
  const id = req.userId;
  try {
    let user = await User.findById(id, "-password");
    if (!user) res.json({ success: false, message: "no user found!" });
    res.json({ user, success: true });
  } catch (err) {
    return next(err);
  }
},
        
 // list of all users
 
 ListUsers: async (req, res, next) => {
    try {
      let users = await User.find({}, "-password");
      // console.log(users)
      if (!users)
        return res.json({ success: false, message: "no users found!" });
      res.json({ success: true, users });
    } catch (err) {
      return next(err);
    }
  },

  UpdateIntrests: async (req, res, next) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.userId, { intrests: req.body.intrests }, { new: true });
      if (updatedUser) {
        return res.json({ updatedUser });
      }
    } catch (err) {
      next(err)
    }
  },

  UpdateUserVerification: async (req, res, next) => {
    try {
      console.log("Inside verification");
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, { verified: true }, { new: true });
      if (updatedUser) {
        return res.json({ updatedUser });
      }
    } catch (err) {
      next(err)
    }
  }
}