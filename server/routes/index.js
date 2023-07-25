var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

// Define Item schema and model
const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  imageURL: String,
});

const Item = mongoose.model('Item', itemSchema);

router.get('/', async (req, res, next) => {
  const query = {
    price: { $exists: true, $ne: null } // Include this line to filter out items where price is undefined or null
  };

  if (req.query.minPrice) {
    query.price.$gte = Number(req.query.minPrice); // Add to the existing query instead of replacing it
  }
  let items = await Item.find(query).exec();

  return res.send(items);
});

router.post('/', async (req, res) => {
  const newItem = new Item(req.body);
  // initialState.items.push(newItem);
  await newItem.save();
  return res.send(newItem);
});

router.get('/latestId', async (req, res) => {
  const latestItem = await Item.findOne({}, { id: 1 }).sort({ id: -1 }).exec();

  if (latestItem) {
    return res.send({ latestId: latestItem.id });
  } else {
    return res.send({ latestId: 0 });
  }
});

// DELETE request to delete an item by ID
router.delete('/:id', async (req, res) => {
  const itemId = parseInt(req.params.id);
  // const itemIndex = initialState.items.findIndex(item => item.id === itemId);
  const result = await Item.deleteOne({ id: itemId });
  if (result.deletedCount === 0) {
    return res.status(404).send('Item not found');
  } else {
    return res.send({ id: itemId });
  }
  // const deletedItem = initialState.items.splice(itemIndex, 1);
  // return res.send(deletedItem);
});

module.exports = router;
