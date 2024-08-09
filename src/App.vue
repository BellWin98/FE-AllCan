<template>
  <v-app>
    <!-- Header Component -->
    <HeaderComponent />

    <!-- Main Content -->
    <v-main>
      <v-container>
        <!-- URL 경로에 따라 적절한 컴포넌트를 동적으로 렌더링 -->
        <router-view />
      </v-container>
    </v-main>

    <!-- Footer Component -->
    <FooterComponent />
  </v-app>
</template>

<script>
import HeaderComponent from '@/components/common/HeaderComponent.vue';
import FooterComponent from '@/components/common/FooterComponent.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent
  }
};
</script>

<style scoped>
/* Vuetify의 기본 스타일을 유지하면서 커스터마이징이 필요할 경우 사용합니다. */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

v-main {
  flex: 1;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>