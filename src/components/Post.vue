<template>
  <div class="container">
    <h2>Postingan User</h2>
    <select v-model="selectedUserId" @change="fetchPosts">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <post-list :posts="posts" @selectPost="selectPost" />
    <post-detail v-if="selectedPost" :post="selectedPost" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import PostList from './PostsList.vue';
import PostDetail from './PostDetail.vue';

const users = ref([]);
const posts = ref([]);
const selectedUserId = ref(null);
const selectedPost = ref(null);

const fetchUsers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const fetchPosts = async () => {
  if (selectedUserId.value) {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId.value}`);
      posts.value = response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  } else {
    posts.value = [];
  }
};

const selectPost = (postId) => {
  selectedPost.value = posts.value.find(post => post.id === postId);
};

onMounted(fetchUsers);
watch(selectedUserId, fetchPosts);
</script>

<style scoped>
.container {
  width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #222;
}

select {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 20px;
}
</style>
