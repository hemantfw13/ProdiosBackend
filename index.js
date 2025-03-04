const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const { taskRouter } = require("./routes/task.route");

const app = express();

const corsOptions = {
  origin: [
    "https://newfrontend-six.vercel.app/",
    "http://localhost:3000", 
    "https://localhost:3000"
  ],
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

// app.use(cors())

app.use(express.json());

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.use("/user", userRouter);
app.use("/task", taskRouter);

app.listen(1010, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
  }
  console.log("Listening on port 1010");
});