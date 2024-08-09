<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <!-- PostList 컴포넌트가 이곳에 렌더링됩니다 -->
            <PostList />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PostList from '@/components/post/PostList.vue';

export default {
  components: {
    PostList
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
