const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');

const port = 4000;

var refPara1 = 0, refPara2 = 0, refPara3 = 0;
var timeStamp = 0;
const date = new Date(); // create a new date object
var hours;
var minutes;
var seconds;

// Use bodyParser middleware to parse incoming POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://SensorProject:SensorProject@cluster0.8wcby6i.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    
  });
  const Slots = new mongoose.Schema({
      
    Slot_Id: {
      type: Number,
      required: true,
    },
    Available: {
      type: Boolean,
      required: true,
      default: 0,
    },
    Time: {
      type: String,
      required: false,
      default: 0,
    },
    EndTime:{
      type:String
    }
  });
  const slotCollection = mongoose.model("slots", Slots);

// Handle POST requests to /api/data endpoint
app.post('/api/data', (req, res) => {
  //const available = req.body.distance;
  /*const para1 = req.body.slot1;
  const para2 = req.body.slot2;
  const para3 = req.body.slot3;*/

  const para1 = req.body.distance;
  hours = date.getHours(); // get the current hour (0-23)
  minutes = date.getMinutes(); // get the current minute (0-59)
  seconds = date.getSeconds(); // get the current second (0-59)
  timeStamp = hours+':'+minutes+':'+seconds;
  console.log('time = '+timeStamp);

//-------------------------slot 1 -----------------------------------------------------------------

  if(refPara1 == 0 && para1 == 1){

    slotCollection.findOneAndUpdate(
    { Slot_Id: 1 },
    {$set : {Available: para1, Time:timeStamp, EndTime:"NULL"}},
    { new: true }
    )
    .then((updatedDocument) => console.log('Document updated successfully', updatedDocument))
    .catch((error) => console.log('Error updating document', error));

    refPara1 = 1;
  }
  else if(refPara == 1 && para1 == 0){
    slotCollection.findOneAndUpdate(
    { Slot_Id: 1 },
    {$set : {Available: para1, EndTime:timeStamp}},
    { new: true }
    )
    .then((updatedDocument) => console.log('Document updated successfully', updatedDocument))
    .catch((error) => console.log('Error updating document', error));
    refPara1 = 0;
  }
//-------------------------slot 2 -----------------------------------------------------------------
  if(refPara2 == 0 && para2 == 1){

    slotCollection.findOneAndUpdate(
    { Slot_Id: 2 },
    {$set : {Available: para2, Time:timeStamp, EndTime:"NULL"}},
    { new: true }
    )
    .then((updatedDocument) => console.log('Document updated successfully', updatedDocument))
    .catch((error) => console.log('Error updating document', error));

    refPara2 = 1;
  }
  else if(refPara2 == 1 && para2 == 0){
    slotCollection.findOneAndUpdate(
    { Slot_Id: 2 },
    {$set : {Available: para2, EndTime:timeStamp}},
    { new: true }
    )
    .then((updatedDocument) => console.log('Document updated successfully', updatedDocument))
    .catch((error) => console.log('Error updating document', error));
    refPara1 = 0;
  }
//-------------------------slot 3 -----------------------------------------------------------------

if(refPara3 == 0 && para3 == 1){

  slotCollection.findOneAndUpdate(
  { Slot_Id: 3 },
  {$set : {Available: para3, Time:timeStamp, EndTime:"NULL"}},
  { new: true }
  )
  .then((updatedDocument) => console.log('Document updated successfully', updatedDocument))
  .catch((error) => console.log('Error updating document', error));

  refPara3 = 1;
}
else if(refPara3 == 1 && para3 == 0){
  slotCollection.findOneAndUpdate(
  { Slot_Id: 3 },
  {$set : {Available: para3, EndTime:timeStamp}},
  { new: true }
  )
  .then((updatedDocument) => console.log('Document updated successfully', updatedDocument))
  .catch((error) => console.log('Error updating document', error));
  refPara3 = 0;
}
  

  

  /*slotCollection.findOneAndUpdate(
    { Slot_Id: 2 },
    {$set : {Available: para2}},
    { new: true }
  )
  .then((updatedDocument) => console.log('Document updated successfully', updatedDocument))
  .catch((error) => console.log('Error updating document', error));


  slotCollection.findOneAndUpdate(
    { Slot_Id: 3 },
    {$set : {Available: para3}},
    { new: true }
  )
  .then((updatedDocument) => console.log('Document updated successfully', updatedDocument))
  .catch((error) => console.log('Error updating document', error));*/

  console.log(`Distance: ${para1}`)
  //console.log(`Param2:e ap ${para2}`);

  //res.send("HelloS");
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
