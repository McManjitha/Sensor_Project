const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const port = 4000;

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
      type: Date,
      required: true,
      default: 0,
    },
  });
  const slotCollection = mongoose.model("slots", Slots);

// Handle POST requests to /api/data endpoint
app.post('/api/data', (req, res) => {
  //const available = req.body.distance;
  /*const para1 = req.body.slot1;
  const para2 = req.body.slot2;
  const para3 = req.body.slot3;*/

  const para1 = req.body.distance;

  slotCollection.findOneAndUpdate(
    { Slot_Id: 1 },
    {$set : {Available: para1}},
    { new: true }
  )
  .then((updatedDocument) => console.log('Document updated successfully', updatedDocument))
  .catch((error) => console.log('Error updating document', error));

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

  console.log(`Distance: ${para1}`);
  //console.log(`Param2:e ap ${para2}`);

  //res.send("HelloS");
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
