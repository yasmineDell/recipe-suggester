<template>
  <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-darkGreen dark:border-darkGreen">
    <a :href="recipe.url">
      <img class="rounded-t-lg" :src="recipe.image" :alt="recipe.name" />
    </a>
    <div class="p-5">
      <a :href="recipe.url">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ recipe.name }}</h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <span v-if="!isExpanded">{{ truncatedInstructions }}</span>
        <!-- <span v-if="isExpanded">{{ fullInstructions }}</span> -->
      </p>
      <button @click="toggleExpand" class="text-blue-500 dark:text-white dark:bg-lightGreen  hover:underline border border-gray-200 rounded-lg p-1">
        {{ isExpanded ? 'Read Less' : 'Read More' }}
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'ResultCards',
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const isExpanded = ref(false);

    // Function to remove HTML tags from text
    const stripHtmlTags = (html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    };

    // Limit the length of instructions and strip HTML tags
    const truncatedInstructions = computed(() => {
      const maxLength = 300; // Adjust as needed
      const plainTextInstructions = stripHtmlTags(props.recipe.instructions);
      return plainTextInstructions.length > maxLength
        ? plainTextInstructions.substring(0, maxLength) + '...'
        : plainTextInstructions;
    });

    // Full instructions
    const fullInstructions = computed(() => {
      return stripHtmlTags(props.recipe.instructions);
    });

    // Toggle function to expand/collapse the instructions
    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value;
    };

    return {
      isExpanded,
      truncatedInstructions,
      fullInstructions,
      toggleExpand
    };
  }
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
