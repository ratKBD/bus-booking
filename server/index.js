const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const busRouter = require("./routes/busRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api", busRouter);

mongoose
  .connect(
    "mongodb+srv://vratheesh123:ronaldo07@cluster0.5nbgktv.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB:", error));

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = 8001;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
