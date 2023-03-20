// server.js

const express = require('express');
const WebSocket = require('ws');
const mongoose = require('mongoose');

const app = express();
app.use(express.static('public'));

const server = app.listen(3000, () => {
  console.log('Listening on port 3000');
});

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://SensorProject:SensorProject@cluster0.8wcby6i.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    
    const Slots = new mongoose.Schema({
      
      Slot_Id: {
        type: Number,
        required: true,
      },
      Available: {
        type: Number,
        required: true,
        default: 0,
      },
      Time: {
        type: Date,
        required: false,
        default: 0,
      },
    });
    const Collection = mongoose.model("slots", Slots);


    // Create WebSocket server
    const wss = new WebSocket.Server({ server });


    wss.on('connection', (ws) => {
      console.log('WebSocket connected');

      console.log("Done");
    

      // Send data every second
      setInterval(() => {
        Collection.find({}, (err, docs) => {
          if (err) throw err;

          // Map documents to an array of availability values
          //console.log(docs);
          
          const availabilities = docs.map(doc => doc.Available);
          //console.log(availabilities);

          // Send data to connected clients
          ws.send(JSON.stringify(availabilities));
        });
      }, 1000);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));
