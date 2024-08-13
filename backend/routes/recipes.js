const express = require('express');
const axios = require('axios');
const router = express.Router();

const SPOONACULAR_API_KEY = '3104baf27d8f4a2687788fe7864cef76'; // Replace with your Spoonacular API key

router.post('/recipes', async (req, res) => {
  const userIngredients = req.body.ingredients.split(',').map(i => i.trim().toLowerCase());

  try {
    // Fetch recipes based on ingredients
    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        ingredients: userIngredients.join(','),
        number: 10, // Number of recipes to return
        apiKey: SPOONACULAR_API_KEY
      }
    });

    // Fetch detailed information for each recipe
    const recipeDetailsPromises = response.data.map(recipe =>
      axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information`, {
        params: {
          apiKey: SPOONACULAR_API_KEY
        }
      })
    );

    const recipes = await Promise.all(recipeDetailsPromises);

    // Format recipes to include necessary details
    const formattedRecipes = recipes.map(recipe => ({
      name: recipe.data.title,
      ingredients: recipe.data.extendedIngredients.map(ingredient => ingredient.original),
      instructions: recipe.data.instructions,
      image: recipe.data.image, // Include image URL
      url: recipe.data.sourceUrl // Optional: Recipe source URL
    }));

    res.json(formattedRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

module.exports = router;
