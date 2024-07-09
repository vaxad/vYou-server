import dotenv from "dotenv";
dotenv.config({ path: '.env.local' });
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
export const app = express();
import multer, { diskStorage } from 'multer';
import bodyParser from "body-parser";
import { createPosts2 } from "./controllers/posts.js";
import { fetchuser } from "./middleware/fetchuser.js";

// const upload = multer({ dest: 'uploads/' });
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));


const storage = diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});


const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
    return cb(new Error('Not an image!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter })

app.post("/posts/multer", fetchuser, upload.single("img"), createPosts2);

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors())

app.use('/posts', postRoutes);
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
  res.send("Server is working");
});

const CONNECTION_URL = process.env.REACT_APP_URL;
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: "true", useUnifiedTopology: "true" })
  .then(() => app.listen(PORT, () => console.log(`listening to port ${PORT}`)))
  .catch((err) => console.log(err.message));
