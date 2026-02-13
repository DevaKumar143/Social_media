const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const authRoutes = require("./modules/auth/auth.route");
const errorMiddleware = require("./middlewares/error.middleware");
const userRoutes = require("./modules/users/user.route");
const postRoutes = require("./modules/posts/post.route");
const followRoutes = require("./modules/follows/follow.route");
const cors = require('cors');
app.use(express.json());
app.use(cors());


main()
  .then((res) => {
    console.log("Connection Successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/instagram");
}

app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/posts", postRoutes);
app.use("/", followRoutes);
app.use(errorMiddleware);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
