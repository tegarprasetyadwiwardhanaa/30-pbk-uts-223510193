<template>
  <div id="app">
    <header>
      <h1>Todo & Post App</h1>
      <nav>
        <ul>
          <li><button @click="currentView = 'Todos'">Todos</button></li>
          <li><button @click="currentView = 'Post'">Post</button></li>
        </ul>
      </nav>
    </header>
    <main>
      <component :is="currentViewComponent" />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Todos from './components/Todos.vue';
import Post from './components/Post.vue';

const currentView = ref('Todos');

const currentViewComponent = computed(() => {
  return currentView.value === 'Todos' ? Todos : Post;
});
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

header {
  background-color: #007bff;
  color: white;
  padding: 15px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  margin: 0;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: 0;
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
  padding: 10px 20px;
  transition: all 0.3s ease;
  border-radius: 5px;
}

nav ul li button:hover {
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

nav ul li button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
}

nav ul li button.active {
  background-color: rgba(255, 255, 255, 0.3);
}

main {
  flex: 1;
}

footer {
  background-color: #f8f9fa;
  padding: 10px 0;
}
</style>
