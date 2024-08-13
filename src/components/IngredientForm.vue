

<template>

  <div class="bg-lightGray min-h-screen">


    <div>
    <NavigationBar />
</div>
<br>
<div class="websiteLabel">

<h1> My Recipes</h1>
</div>
<br>
<div class="image">

<img src="../assets/food3.webp" alt="">

</div>
<br>
  <div>
  

    <div class="search">
  <div class="labelText">
    <div class="GetYour">Get your recipes </div>
    Tell us what’s in your fridge, and we'll find delicious recipes you can whip up!  
  </div>

  <div class="form-container">
    <form class="max-w-md mx-auto" @submit.prevent="getRecipes">
      <div class="flex">
        <label class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white" for="ingredients">Enter ingredients (comma-separated):</label>
        <div class="relative w-full">
          <input type="text" v-model="ingredients" id="ingredients" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-e-lg border-s-gray-50 border-s-2 border border-white focus:ring-white focus:border-white dark:bg-white dark:border-s-gray-700 dark:border-white dark:placeholder-gray-400 dark:text-black dark:focus:border-white" placeholder="Search for recipes" required />
          <button type="submit" class="absolute top-0 right-0 h-full p-2.5 text-sm font-medium text-white bg-lightGreen rounded-e-lg border border-blightGreen hover:bg-lightGreen focus:ring-4 focus:outline-none focus:ring-lightGreen dark:bg-lightGreen dark:hover:bg-darkGreen dark:focus:ring-blue-800">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span class="sr-only">Get Recipes</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</div>

<br>

<div v-if="recipes.length" class="recipe-list">
        <ResultCards v-for="recipe in recipes" :key="recipe.name" :recipe="recipe"  class="cards"/>
      </div>
<br>

  
  </div>


  </div>




 
</template>

<script>
import { ref } from 'vue';
import '../assets/tailwind.css'


import NavigationBar from './NavigationBar.vue';
import ResultCards from './ResultCards.vue'




export default {
  components: { NavigationBar, ResultCards },
  name: 'IngredientForm',
  setup() {
    const ingredients = ref('');
    const recipes = ref([]);

    const getRecipes = async () => {
      try {
    const response = await fetch('http://localhost:3000/api/recipes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ ingredients: ingredients.value }),
});

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        recipes.value = await response.json();
      } catch (error) {
        console.error('Failed to fetch:', error);
      }
    };

    return {
      ingredients,
      recipes,
      getRecipes,
    };
  },
};
</script>

<style scoped>

</style>
