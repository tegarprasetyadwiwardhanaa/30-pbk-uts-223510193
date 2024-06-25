<template>
    <div class="album-list">
      <h1>Album List</h1>
      <ul v-if="albums.length">
        <li v-for="album in albums" :key="album.id" class="album-item">
          <router-link :to="{ name: 'AlbumDetail', params: { id: album.id } }"> 
            <h3>{{ album.title }}</h3> 
          </router-link>
        </li>
      </ul>
      <p v-else class="loading-message">Loading albums...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AlbumList',
    data() {
      return {
        albums: [],
      };
    },
    async mounted() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        this.albums = await response.json();
      } catch (error) {
        console.error('Error fetching albums:', error);

      }
    },
  };
  </script>
  
  
  
  <style scoped>

  .album-thumbnail {
    max-width: 100px;
    height: auto;
  }
  </style>
  