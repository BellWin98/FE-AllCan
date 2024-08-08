import { createStore } from 'vuex';
import axios from 'axios';

// axios.create : axios 인스턴스를 생성하는 메소드
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default createStore({

  // state는 프로젝트에서 공통으로 사용할 변수를 정의 (모든 곳에서 참조 및 사용 가능)
  state: {
    posts: [],
    member: null
  },

  // mutations의 주요 목적은 state를 변경시키는 역할 (mutations을 통해서만 state 변경해야 함)
  // 동기처리: 위 함수가 실행되고 종료된 후 아래 함수 실행
  // commit('함수명', '전달인자')로 실행
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },

    addPost(state, post) {
      state.posts.push(post);
    },

    updatePost(state, updatedPost){
      const index = state.posts.findIndex(post => post.id === updatedPost.id);
      if (index !== -1){
        state.posts[index] = updatedPost;
      }
    },

    deletePost(state, postId) {
      state.posts = state.posts.filter(post => post.id !== postId);
    },

    setMember(state, member){
      state.member = member; 
    }
  },

  // actions의 주요 목적은 mutations를 실행시키는 역할
  // 비동기처리: 순서에 상관없이 먼저 종료된 함수의 피드백을 받아 후속처리
  // dispatch('함수명', '전달인자')로 실행
  actions: {
    
    async fetchPosts({ commit }){
      
      try {
        const response = await apiClient.get('/api/posts');
        commit('setPosts', response.data);

        return response.data;
      } catch (error) {
        console.error("게시글 목록 조회 에러: ", error);
      }
    },

    async fetchPostById({ state }, postId){
      
      const post = state.posts.find(post => post.id === postId);
      if (post){
        return post;
      } else {
        try {
          const response = await apiClient.get(`posts/${postId}`);
          return response.data;
        } catch (error){
          console.error("게시글 상세 조회 에러: ", error);
        }
      }
    },

    async createPost({ commit }, post) {
      try {
        const response = await apiClient.post('/posts', post);
        commit('addPost', response.data);
        return response.data;
      } catch (error) {
        console.error('게시글 생성 에러: ', error);
      }
    },

    async updatePost({ commit }, post) {
      try {
        const response = await apiClient.put(`/posts/${post.id}`, post);
        commit('updatePost', response.data);
        return response.data;
      } catch (error) {
        console.error('게시글 수정 에러: ', error);
      }
    },

    async deletePost({ commit }, postId) {
      try {
        await apiClient.delete(`/posts/${postId}`);
        commit('deletePost', postId);
      } catch (error) {
        console.error('게시글 삭제 에러: ', error);
      }
    },

    async signUp({ commit }, memberData) {
      try {
        const response = await apiClient.post('/sign-up', memberData);
        commit('setMember', response.data);
        return response.data;
      } catch (error) {
        console.error('회원가입 에러: ', error);
      }
    },

    async login({ commit }, memberData) {
      try {
        const response = await apiClient.post('/login', memberData);
        commit('setMember', response.data);
        return response.data;
      } catch (error) {
        console.error('로그인 에러: ', error);
      }
    },
  }
})