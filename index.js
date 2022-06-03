const express = require("express");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// routes
const projectRoutes = require("./routes/projectRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

// middlewares
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as templating engine
app.set("view engine", "ejs");

// routes
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/api/greetings", (req, res) => {
  res.json({ message: "Hello World!" }).status(200);
});

app.use("/api", (req, res) => {
  res.setHeader("Last-Modified", new Date().toUTCString());
  res.sendStatusCode = 200;

  res.end("Project Book API Service.");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running and up at port ${PORT}`);
});
