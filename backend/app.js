const express = require("express");
const app = express();

const multer = require('multer');
const upload = multer({dest:'uploads/'}).single("profile_image");

// this code goes inside the object passed to multer()
function fileFilter (req, file, cb) {    
  // Allowed ext
   const filetypes = /jpeg|jpg|png|gif/;

 // Check ext
  const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
 // Check mime
 const mimetype = filetypes.test(file.mimetype);

 if(mimetype && extname){
     return cb(null,true);
 } else {
     cb('Error: Images Only!');
 }
}
app.post("/image", (req, res) => {
  upload(req, res, (err) => {
   if(err) {
     res.status(400).send("Something went wrong!");
   }
   res.send(req.file);
 });
});



// cors
const cors = require("cors");

// tools
const path = require("path");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

// auth
const { requireAuth } = require("./middlewares/auth.middleware");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.get("/jwtid", requireAuth);

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;