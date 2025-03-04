const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const { taskRouter } = require("./routes/task.route");

const app = express();

const corsOptions = {
  origin: function(origin, callback) {
    const allowedOrigins = [
      "https://newfrontend-six.vercel.app", // Remove trailing slash
      "http://localhost:3000", 
      "https://localhost:3000"
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  allowedHeaders: [
    "Content-Type", 
    "Authorization", 
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Headers"
  ],
};

// Global CORS middleware
app.use(cors(corsOptions));

// Explicit OPTIONS handler for all routes
app.options('*', cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

// Add explicit CORS headers middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
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