// server.js
require("dotenv").config(); //required for use of dotenv
const connectDb = require("./utils/db");
const cors = require("cors");
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-rahul:admin-rahul@cluster0.pcvof.mongodb.net/dashboard?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const projectRoute = require("./routes/project-route");
const authRoute = require("./routes/auth-route");



// applying cors to frontend
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };
  app.use(cors(corsOptions));
  

  app.use(express.json()); //middleware for get and post json data
  
  app.use("/auth", authRoute); //set app to use router as a path
  
  app.use("/api", projectRoute); //set app to use router as a path




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
