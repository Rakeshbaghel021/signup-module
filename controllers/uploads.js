const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
})

var upload = multer({ storage: storage }).single('profileImage');

module.exports = {
  uploadImage: function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.json({ success: false, err });
        }
        res.json({
            success: true,
            path: req.file.path,
            message: "Profile pic uploaded successfully!"
        })
    })
  }
}