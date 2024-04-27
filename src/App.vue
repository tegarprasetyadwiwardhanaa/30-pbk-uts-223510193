<template>
  <div>
    <h1>list kegiatan sehari-hari</h1>
    <ActivityList />
  </div>
</template>

<script setup>
import ActivityList from './components/ActivityList.vue';
</script>

<style scoped>

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #222;
}


h1 {
  /* Headline style */
  font-size: 2.5rem; /* Large font size for a headline */
  text-align: center; /* Center align the text */
  padding: 20px; /* Add padding around the text */
  margin: 0; /* Remove default margins to avoid extra spacing */
  background-color: #f0f0f0; /* Light background color to make it stand out */
  color: #333; /* Dark color for the text */
  text-transform: uppercase; /* Uppercase letters for emphasis */
  border-bottom: 2px solid #ccc; /* Border at the bottom for separation */
}
</style>