<template>
  <div class="container">
    <h2>Postingan User</h2>

    <div v-if="isLoadingUsers || isLoadingPosts">Loading...</div>
    <div v-else>
      <select v-model="selectedUserId" @change="fetchPosts">
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>

      <PostList :posts="posts" @select-post="handleSelectPost" /> <PostDetail :post="selectedPost" v-if="selectedPost" />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';
import { useUserPostsStore } from '../stores/posts';
import PostList from './PostsList.vue';
import PostDetail from './PostDetail.vue';

const userPostsStore = useUserPostsStore();
const { users, posts, selectedUserId, selectedPost, isLoadingUsers, isLoadingPosts } = storeToRefs(userPostsStore);

onMounted(userPostsStore.fetchUsers);

watch(() => selectedUserId.value, userPostsStore.fetchPosts);

function handleSelectPost(postId) {
  userPostsStore.selectPost(postId);
}
</script>





<style scoped>
.container {
  width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #222;
}

select {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 20px;
}
</style>
