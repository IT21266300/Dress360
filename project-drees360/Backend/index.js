const express = require('express');
const app = express();
const mongoose = require('mongoose');
const admin = require('./routes/admin');


mongoose.connect('mongodb+srv://vihi:vihi@itpcluster.bhmi6vu.mongodb.net/Dress360?retryWrites=true&w=majority')
 .then(() => console.log('Connect to MongoDB...'))
 .catch(err => console.error('Could not connect to MongoDB..'))

 app.use(express.json());


 var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }

  app.use(allowCrossDomain);
  app.use('/api/admin', admin);
  
  

  const PORT = parseInt(process.env.PORT);
const port = process.env.PORT || 5030;
app.listen(port, () => console.log('Listening on port ${port}'));
console.log(port);