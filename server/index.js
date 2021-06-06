// ============= NODE PACKAGE IMPORTS =================
const express = require('express'); // Framework for writing server-side code
const cors = require('cors'); // Import cors node package to resolve cross-origin issues

// ============= SERVER SETUP & STARTUP =================
const PORT = process.env.PORT || 3001;  // Defines port number for server to listen to
const app = express();  // Instantiates app as an express object
const api = require('./routes/api'); // Imports api.js
app.use(cors());  // Allows for cross origin resource access
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api); // Uses api route for REST services
app.listen( PORT,function(){
  console.log('Server runing on localhost:' + PORT);
});

// ============= REST SERVICES =================

// GET request at root
app.get('/', function(req, res){
  res.send('Hello from server');
});
