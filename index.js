const express = require("express");

const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const cors = require("cors");
const { taskRouter } = require("./routes/task.route");

const app = express();
app.use(express.json());
app.use(
  cors({
      origin: "https://prodiosbackend-1.onrender.com/", 
      credentials: true, 
  })
);
app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.use("/user", userRouter);
app.use("/task", taskRouter);



app.listen(1010, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (e) {
    console.log(e);
  }

  console.log("listening 1010");
});
