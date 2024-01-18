const express = require('express');
const router = express.Router();
const Person = require('../Models/personModel');


// Route to create many records
router.post('/create-people', async (req, res) => {
  const arrayOfPeople = req.body;

  try {
    const savedPeople = await Person.create(arrayOfPeople);
    res.json(savedPeople);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to find all people with a given name
 router.get('/find-by-name/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const people = await Person.find({ name });
    res.json(people);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
 });

// Route to find one person with a specific favorite food
router.get('/find-by-food/:food', async (req, res) => {
  const { food } = req.params;

  try {
    const person = await Person.findOne({ favoriteFoods: food });
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to find person by ID
router.get('/find-by-id/:personId', async (req, res) => {
  const { personId } = req.params;

  try {
    const person = await Person.findById(personId);
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
 });

// Route to update person's favoriteFoods
router.put('/update-favorite-foods/:personId', async (req, res) => {
  const { personId } = req.params;
  const newFavoriteFood = 'Hamburger'; // Update with your new favorite food

  try {
    const person = await Person.findById(personId);

    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    person.favoriteFoods.push(newFavoriteFood);
    await person.save();

    res.json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update person's age
 router.put('/update-age/:personName', async (req, res) => {
   const { personName } = req.params;
   const newAge = 20;

   try {
     const updatedPerson = await Person.findOneAndUpdate(
       { name: personName },
       { age: newAge },
       { new: true }
     );

     res.json(updatedPerson);
   } catch (err) {
     res.status(500).json({ error: err.message });
   }
 });

// Route to delete person by ID
router.delete('/delete-by-id/:personId', async (req, res) => {
  const { personId } = req.params;

  try {
    const deletedPerson = await Person.findOneAndDelete({ _id: personId });
    
    if (!deletedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json(deletedPerson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to delete people by name
 router.delete('/delete-by-name/:name', async (req, res) => {
  const { name } = req.params;
   try {
     const result = await Person.deleteMany({ name });
     res.json(result);
   } catch (err) {
     res.status(500).json({ error: err.message });
   }
 });

module.exports = router;
