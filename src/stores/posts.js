import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useUserPostsStore = defineStore('userPosts', () => {
  const users = ref([]);
  const posts = ref([]);
  const selectedUserId = ref(null);
  const selectedPost = ref(null);
  const isLoadingUsers = ref(false);
  const isLoadingPosts = ref(false);

  const fetchUsers = async () => {
    isLoadingUsers.value = true;
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      users.value = response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      isLoadingUsers.value = false;
    }
  };

  const fetchPosts = async () => {
    if (selectedUserId.value) {
      isLoadingPosts.value = true;
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId.value}`);
        posts.value = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        isLoadingPosts.value = false;
      }
    } else {
      posts.value = [];
    }
  };

  const selectPost = (postId) => {
    selectedPost.value = posts.value.find(post => post.id === postId);
  };

  return {
    users,
    posts,
    selectedUserId,
    selectedPost,
    isLoadingUsers,
    isLoadingPosts,
    fetchUsers,
    fetchPosts,
    selectPost,
  };
});
