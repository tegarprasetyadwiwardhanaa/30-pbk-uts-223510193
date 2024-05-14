<template>
  <div class="container">
    <h2>Postingan User</h2>
    <select v-model="selectedUserId" @change="fetchPosts">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <ul class="post-list">
      <li v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const users = ref([]);
const posts = ref([]);
const selectedUserId = ref(null);

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

.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-list li {
  margin-bottom: 15px;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.post-list li h3 {
  margin: 0 0 10px;
}

.post-list li p {
  margin: 0;
}
</style>
