<template>
    <li :class="{ completed: isChecked }">
      <input type="checkbox" v-model="isChecked" @change="toggleCompleted" />
      <span :class="{ 'completed': isChecked }">{{ todo.description }}</span>
      <button @click="removeActivity">Hapus</button>
    </li>
  </template>
  
  <script setup>
  import { defineProps, ref, getCurrentInstance } from 'vue';
  
  const props = defineProps(['todo']);
  const isChecked = ref(props.todo.completed);
  const { emit } = getCurrentInstance();
  
  function toggleCompleted() {
    emit('toggle-completed', props.todo.id);
  }
  
  function removeActivity() {
    emit('remove', props.todo.id);
  }
  </script>
  
  <style scoped>
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding: 15px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
  
  li:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  input[type="checkbox"] {
    margin-right: 10px;
    cursor: pointer;
  }
  
  span {
    flex: 1;
    font-size: 1rem;
    color: #555;
  }
  
  .completed {
    text-decoration: line-through;
    color: #999;
  }
  
  .completed::after {
    content: '✔️';
    color: #28a745;
    margin-left: 5px;
  }
  
  button {
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    background-color: #dc3545;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  button:hover {
    background-color: #c82333;
  }
  </style>
  