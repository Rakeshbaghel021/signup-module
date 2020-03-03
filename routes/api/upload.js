const express = require('express');
const router = express.Router();
const avatar = require('../../controllers/uploads');

router.post('/', avatar.uploadImage)


module.exports = router;