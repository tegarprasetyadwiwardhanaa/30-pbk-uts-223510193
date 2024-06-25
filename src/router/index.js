import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/Todos.vue';
import Post from '../components/Post.vue';
import AlbumList from '../components/AlbumList.vue';
import AlbumDetail from '../components/AlbumDetail.vue';



const routes = [
  { path: '/', redirect: '/todos' },
  { path: '/todos', component: Todos },
  { path: '/posts', component: Post },
  { path: '/albums', component: AlbumList },
  {
    path: '/albums/:id',
    name: 'AlbumDetail',
    component: AlbumDetail,
    props: (route) => ({ 
      id: Number(route.params.id) 
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
