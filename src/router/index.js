import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import PostCreate from '@/views/PostCreate.vue';
import PostEdit from '@/views/PostEdit.vue';
import PostView from '@/views/PostView.vue';
import SignUp from '@/views/SignUp.vue';
import LoginView from '@/views/LoginView.vue';

const routes = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/create', name: 'PostCreate', component: PostCreate },
  { path: '/edit/:id', name: 'PostEdit', component: PostEdit },
  { path: '/post/:id', name: 'PostView', component: PostView },
  { path: '/sign-up', name: 'SignUp', component: SignUp },
  { path: '/login', name: 'LoginView', component: LoginView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
