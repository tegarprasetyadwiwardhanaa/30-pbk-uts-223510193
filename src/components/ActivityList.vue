<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><button @click="currentView = 'Todos'">Todos</button></li>
          <li><button @click="currentView = 'Post'">Post</button></li>
        </ul>
      </nav>
    </header>

    <div v-if="currentView === 'Todos'" class="container">
      <h2>Daftar Kegiatan</h2>
      <button @click="toggleFilter">
        {{ showOnlyUncompleted ? 'Tampilkan Semua' : 'Tampilkan yang Belum Selesai' }}
      </button>
      <ul class="activity-list">
        <li v-for="(activity, index) in filteredActivities" :key="index">
          <input type="checkbox" v-model="activity.completed" />
          <span :class="{ completed: activity.completed }">{{ index + 1 }}. {{ activity.description }}</span>
          <button @click="removeActivity(index)">Hapus</button>
          <div v-if="activity.completed" class="completed-box">Sudah Selesai</div>
        </li>
      </ul>
      <form @submit.prevent="addActivity" class="activity-form">
        <input type="text" v-model="newActivity" placeholder="Tambah kegiatan baru" />
        <button type="submit">Tambah</button>
      </form>
    </div>

    <div v-if="currentView === 'Post'" class="container">
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';

// State for activities (Todos)
const activities = ref([]);
const newActivity = ref('');
const showOnlyUncompleted = ref(false);
const currentView = ref('Todos');

// Functions for Todos
const addActivity = () => {
  if (newActivity.value.trim() !== '') {
    activities.value.push({
      description: newActivity.value,
      completed: false,
    });
    newActivity.value = '';
  }
};

const removeActivity = (index) => {
  activities.value.splice(index, 1);
};

const toggleFilter = () => {
  showOnlyUncompleted.value = !showOnlyUncompleted.value;
};

const filteredActivities = computed(() => {
  if (showOnlyUncompleted.value) {
    return activities.value.filter(activity => !activity.completed);
  }
  return activities.value;
});

// State for posts
const users = ref([]);
const posts = ref([]);
const selectedUserId = ref(null);

// Fetch users and posts
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
header {
  background-color: #428bca;
  color: white;
  padding: 15px 20px;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 20px;
  justify-content: center; /* Menyelaraskan menu ke tengah */
}

nav ul li {
  display: inline;
}

nav ul li button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

nav ul li button:hover {
  text-decoration: underline;
}

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

button {
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  background-color: #428bca;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

button:hover {
  background-color: #357ebd;
}

.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.activity-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

input[type="checkbox"] {
  margin-right: 10px;
}

.activity-list li span {
  flex: 1;
}

.completed {
  text-decoration: line-through;
}

.activity-list li button {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  background-color: #d9534f;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.activity-list li button:hover {
  background-color: #c9302c;
}

.activity-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.activity-form input[type="text"] {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.activity-form button {
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  background-color: #20a8d8;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.activity-form button:hover {
  background-color: #1b87b8;
}

.completed-box {
  background-color: #28a745;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
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
