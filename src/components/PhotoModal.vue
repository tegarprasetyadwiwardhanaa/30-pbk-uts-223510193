<template>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content">
        <button class="close-button" @click="$emit('close')">&times;</button>
        <img v-if="photo" :src="photo.url" :alt="photo.title" class="modal-image" />
        <p v-if="photo" class="photo-title">{{ photo.title }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PhotoModal',
    props: {
      photo: {
        type: Object,
        required: true,
      },
    },
  };
  </script>

  <style scoped>
  .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  max-width: 90vw; 
  max-height: 90vh; 
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); 
  position: relative; 
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 28px; 
  background: none;
  border: none;
  color: #333; 
  cursor: pointer;
  transition: color 0.2s; 
}

.close-button:hover {
  color: #999; /* Lighter color on hover */
}

.modal-image {
  max-width: 100%; /* Ensure image doesn't overflow container */
  height: auto;  /* Maintain aspect ratio */
  display: block; /* Prevent extra space below the image */
  margin: 20px auto; /* Center the image */
}

.photo-title {
  text-align: center;
  font-size: 18px; /* Larger font for title */
  margin-top: 10px;
}
</style>