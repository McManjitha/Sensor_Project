// server.js

const express = require('express');
const WebSocket = require('ws');
const mongoose = require('mongoose');

var data_Array = [], diffTime = ['Null', 'Null', 'Null'];

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
        type: String,
        required: false,
        default: 0,
      },
      EndTime:{
        type : String
      }
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
          data_Array.length = 0;
          const availabilities = docs.map(doc => doc.Available);
          const Times = docs.map(doc => doc.Time);
          const EndTimes = docs.map(doc => doc.EndTime);
          
          data_Array.push(availabilities);
          //data_Array.push(Times);
          //data_Array.push(EndTimes);

          for(var i = 0; i < 3; i++){
            if(Times[i] != "NULL" && EndTimes[i] != "NULL"){
              diffTime[i] = timeDiff(Times[i], EndTimes[i]).toFixed(2);
            }
            else{
              diffTime[i] = '...';
            }
          }
          data_Array.push(diffTime);

          // Send data to connected clients
          ws.send(JSON.stringify(data_Array));
        });
      }, 1000);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

  function timeDiff(startTime, endTime) {
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    const diff = end - start;
    const hours = diff / (1000 * 60 * 60);
    return hours;
  }
