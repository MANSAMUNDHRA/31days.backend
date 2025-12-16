// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use("/api/tracker", require("./routes/tracker.routes"));

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", require("./routes/auth.routes.js"));

// app.get("/", (req, res) => {
//   res.send("API running");
// });

// module.exports = app;
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware should come BEFORE routes
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes.js"));
app.use("/api/tracker", require("./routes/tracker.routes"));

app.get("/", (req, res) => {
  res.send("API running");
});

module.exports = app;