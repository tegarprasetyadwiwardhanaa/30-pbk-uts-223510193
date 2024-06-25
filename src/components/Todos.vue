<template>
  <div class="container">
    <h2>Daftar Kegiatan</h2>
    <button @click="todoStore.toggleFilter">
      {{ todoStore.showOnlyUncompleted ? 'Tampilkan Semua' : 'Tampilkan yang Belum Selesai' }}
    </button>
    <ul class="activity-list">
    <todo-item
      v-for="todo in todoStore.filteredActivities"  
      :key="todo.id"       
      :todo="todo"
      @remove="todoStore.removeActivity(todo.id)" 
      @toggle-completed="todoStore.toggleCompleted(todo.id)"  
    />
  </ul>
    <activity-form @add="todoStore.addActivity" />
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore';
import TodoItem from './TodoItem.vue';
import ActivityForm from './ActivityForm.vue';

const todoStore = useTodoStore();
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
</style>
