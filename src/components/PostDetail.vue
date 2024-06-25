<template>
    <div class="post-detail">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  // Define props
  const props = defineProps({
    post: {
      type: Object,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .post-detail {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 5px;
    background-color: #f9f9f9;
    margin-top: 20px;
  }
  
  .post-detail h2 {
    margin-top: 0;
    font-size: 1.5rem;
    color: #333;
  }
  
  .post-detail p {
    font-size: 1rem;
    color: #666;
  }
  </style>
  