const express = require('express');
const http = require("http");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');

const app = express();
app.use(require('cors')());

// DB Setup
mongoose.connect("mongodb+srv://admin:user123@cluster0.3snih.mongodb.net/salesEntry?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected.....'))
  .catch(err => console.log(err));

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
router(app);

// Server Setup
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(process.env.PORT, function(){
  console.log("Server running on localhost:5000......")
});
