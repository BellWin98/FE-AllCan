<template>
  <div>
    <HeaderComponent />
    <!-- URL 경로에 따라 적절한 컴포넌트를 동적으로 렌더링 -->
    <router-view />
    <FooterComponent />
  </div>
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

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  padding-bottom: 50px;
  /* For fixed footer space */
}
</style>