<template>
    <form @submit.prevent="addActivity">
      <input v-model="description" type="text" placeholder="Tambah kegiatan baru" />
      <button type="submit">Tambah</button>
    </form>
  </template>
  
  <script setup>
  import { ref, getCurrentInstance } from 'vue';
  
  const description = ref('');
  const { emit } = getCurrentInstance();
  
  function addActivity() {
    const trimmedDescription = description.value.trim();
    if (trimmedDescription !== '') {
      // Emit event to parent component (todos.vue) with the description
      emit('add', trimmedDescription);
      description.value = ''; // Reset input after adding
    } else {
      console.warn('Deskripsi tidak boleh kosong');
    }
  }
  </script>
  
  <style scoped>
  form {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    background-color: #28a745;
    color: white;
    cursor: pointer;
  }
  button:hover {
    background-color: #218838;
  }
  </style>
  