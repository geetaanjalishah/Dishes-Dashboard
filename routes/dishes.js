const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish'); 

// GET all dishes
router.get('/', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Toggle publish status
router.post('/toggle/:id', async (req, res) => {
  try {
    const dishId = req.params.id; // Keep as string if using dishId as string
    const dish = await Dish.findOne({ dishId }); // Query by dishId
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    dish.isPublished = !dish.isPublished;
    await dish.save();
    res.json(dish);
  } catch (err) {
    console.error('Error in toggle route:', err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
