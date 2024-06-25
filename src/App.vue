<template>
  <div id="app"> 
    <header>
      <h1>Tugas UAS</h1>
      <nav>
        <ul>
          <li>
            <router-link to="/todos">Todos</router-link>
          </li>
          <li>
            <router-link to="/posts">Posts</router-link>
          </li>
          <li>
            <router-link to="/albums">Albums</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePhotoAlbumStore } from './stores/photoAlbum';

const photoAlbumStore = usePhotoAlbumStore();

onMounted(() => {
  photoAlbumStore.fetchAlbums();
});
</script>


<style scoped>

#app {
  font-family: Arial, sans-serif;
  text-align: center;
  display: flex; 
  flex-direction: column; 
  min-height: 100vh; 
}

header, main, footer {
  padding: 15px; 
}

main {
  flex: 1; 
}


header {
  background-color: #007bff;
  color: white;
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


nav a { 
  background: none; 
  border: none;
  color: white; 
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;
  transition: all 0.3s ease; 
  border-radius: 5px;
  text-decoration: none;
}

nav a:hover {
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.2); 
  transform: translateY(-2px); 
}

nav a:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5); 
}

.router-link-active { 
  background-color: rgba(255, 255, 255, 0.3); 
}


footer {
  background-color: #f8f9fa; 
}

</style>
