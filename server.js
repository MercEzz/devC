const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

connectDB();

// init middleware
app.use(express.json({ extended: false }));

// define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));

// serve statuc assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const Port = process.env.PORT || 5000;

app.listen(Port, () => console.log(`server started on ${Port}`));
