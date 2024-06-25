<template>
    <ul class="post-list">
      <li v-for="post in posts" :key="post.id" @click="selectPost(post.id)">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    posts: Array,
  });
  
  const emits = defineEmits(['selectPost']);
  
  const selectPost = (postId) => {
    emits('selectPost', postId);
  };
  </script>
  
  <style scoped>
  .post-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .post-list li {
    margin-bottom: 15px;
    padding: 15px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
  }
  
  .post-list li h3 {
    margin: 0 0 10px;
  }
  
  .post-list li p {
    margin: 0;
  }
  </style>
  