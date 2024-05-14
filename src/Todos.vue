<template>
  <div class="container">
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
</template>

<script setup>
import { ref, computed } from 'vue';

const activities = ref([]);
const newActivity = ref('');
const showOnlyUncompleted = ref(false);

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
</script>

<style scoped>
.container {
  width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #0056b3;
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
  background-color: #fff;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.activity-list li:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

input[type="checkbox"] {
  margin-right: 10px;
  cursor: pointer;
}

.activity-list li span {
  flex: 1;
  font-size: 1rem;
  color: #555;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

.activity-list li button {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.activity-list li button:hover {
  background-color: #c82333;
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
  font-size: 1rem;
  margin-right: 10px;
  transition: border-color 0.3s ease-in-out;
}

.activity-form input[type="text"]:focus {
  border-color: #007bff;
  outline: none;
}

.activity-form button {
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.activity-form button:hover {
  background-color: #218838;
}

.completed-box {
  background-color: #28a745;
  padding: 5px 10px;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
}
</style>
