import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePhotoAlbumStore = defineStore('photoAlbum', () => {
  const albums = ref([]);
  const photos = ref([]);
  const selectedAlbum = ref(null);
  const isLoading = ref(false);

  const fetchAlbums = async () => {
    isLoading.value = true;
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      albums.value = await response.json();
    } catch (error) {
      console.error('Error fetching albums:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const selectAlbum = async (albumId) => {
    isLoading.value = true;
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
      selectedAlbum.value = await response.json();
      const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
      photos.value = await photosResponse.json();
    } catch (error) {
      console.error('Error fetching album details:', error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    albums,
    photos,
    selectedAlbum,
    isLoading,
    fetchAlbums,
    selectAlbum,
  };
});
