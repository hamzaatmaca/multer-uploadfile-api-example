const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const Document = require("../models/document");
const { v4: uuid } = require("uuid");

let storage = multer.diskStorage({
  destination: (req, file, cb) => (null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}- ${Math.round(
      Math.random(Math.randow() * 1e9)
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  limit: {
    filesSize: 1000000 * 100,
  },
}).single("mydocument");

router.post("/", (req, res) => {
  //Validate request
  if (!req.file) {
    return res.json({ error: "All field are required" });
  }
  //Store document
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }

    //Store in db
    const file = new Document({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
  });

  //Store into Database
  //Response -> Link
});

module.exports = router;
