<template>
    <v-app-bar app color="primary" dark>
        <v-toolbar-title>
            <router-link to="/" class="navbar-brand">게시판</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn text to="/" class="nav-link">홈</v-btn>
        <v-btn text to="/create" class="nav-link">게시글 작성</v-btn>
        <v-btn text to="/sign-up" class="nav-link">회원가입</v-btn>
        <v-btn text to="/login" class="nav-link">로그인</v-btn>
    </v-app-bar>
</template>

<script>
export default {
    name: 'HeaderComponent',
};
</script>

<style scoped>
.navbar-brand {
    color: white;
    text-decoration: none;
}

.navbar-brand:hover {
    text-decoration: none;
}

.nav-link {
    color: white;
    font-size: 1em;
}

.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
    .nav-link {
        font-size: 0.9em;
    }
}
</style>