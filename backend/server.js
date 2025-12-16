// 
require("dotenv").config();
const express = require("express");
const connectDB = require("./db");

connectDB();

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));