const express = require('express');
const path = require('path')
const fs = require('fs');
const multer = require('multer');

const router = express.Router();


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const folderPath = 'public/uploads'
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath, {recursive: true});
		}
		cb(null, folderPath)
	}, filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({storage: storage})


router.post('/', upload.single('file'), (req, res, next) => {
	const {file} = req;
	if (!file) {
		const error = new Error('Please upload a file');
		error.httpStatusCode = 400;
		return next(error);
	}
	const fileUrl = `/uploads/${file.filename}`;

	res.send({
		data: fileUrl
	});
});

module.exports = router;
