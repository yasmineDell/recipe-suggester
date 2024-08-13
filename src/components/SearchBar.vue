

<template>

<form  @submit.prevent="getRecipes" class="max-w-md mx-auto" >
    <div class="flex">
        <label class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white" for="ingredients"> Enter ingredients </label>
       
      
        <div class="relative w-full">
            <input type="text"  v-model="ingredients" id="ingredients"  class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search for city or address" required />
            <button  type="submit" class="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span class="sr-only">Get Recipes</span>
            </button>
           
        </div>
    </div>
</form>

  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { ref } from 'vue';
  
  export default defineComponent({
    name: 'SearchBar',
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
  });
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  




