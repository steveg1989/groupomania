const express = require("express");
const path = require("path");
const app = express();

// cors
const cors = require("cors");

// make uploads folder static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// tools
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