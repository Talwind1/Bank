const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/bank",()=>{
//   console.log('connect');
// });
const url =
  "mongodb+srv://tal:284659006@cluster0.c2vdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; //connect my requests to the db in the cloud.

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
