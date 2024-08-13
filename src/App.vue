<template>
  <div id="app">
    <IngredientForm />
  </div>
</template>

<script>
import IngredientForm from './components/IngredientForm.vue';
import './assets/tailwind.css'

export default {
  name: 'App',
  components: {
    IngredientForm
  }
};
</script>

<style>
/* Add any global styles here */
</style>
