<template>
    <div class="album-detail">
      <h1 v-if="album">{{ album.title }}</h1>
      <p v-else>Loading album...</p>
  
      <div class="photos-grid" v-if="photos && photos.length">
        <img
          v-for="photo in photos"
          :key="photo.id"
          :src="photo.thumbnailUrl"
          @click="openPhotoModal(photo)"
          :alt="`Thumbnail for ${photo.title}`"
          class="photo-thumbnail"
        />
      </div>
      <p v-else-if="!photos">Loading photos...</p> 
      <p v-else>No photos found for this album.</p> 
  
      <PhotoModal v-if="selectedPhoto" :photo="selectedPhoto" @close="closePhotoModal" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import PhotoModal from './PhotoModal.vue';
  
  export default {
    name: 'AlbumDetail',
    components: { PhotoModal },
    props: {
      id: { type: Number, required: true },
    },
    setup(props) {
      const album = ref(null);
      const photos = ref([]);
      const selectedPhoto = ref(null);
  
      onMounted(async () => {
        try {
          const [albumResponse, photosResponse] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/albums/${props.id}`),
            fetch(`https://jsonplaceholder.typicode.com/albums/${props.id}/photos`),
          ]);
  
          if (albumResponse.ok && photosResponse.ok) {
            album.value = await albumResponse.json();
            photos.value = await photosResponse.json();
          } else {
            throw new Error('Network response was not ok.');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      });
  
      const openPhotoModal = (photo) => {
        selectedPhoto.value = photo;
      };
  
      const closePhotoModal = () => {
        selectedPhoto.value = null;
      };
  
      return {
        album,
        photos,
        selectedPhoto,
        openPhotoModal,
        closePhotoModal,
      };
    },
  };
  </script>  

