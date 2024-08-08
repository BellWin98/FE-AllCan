<template>
    <header class="header">
        <nav class="navbar">
            <div class="navbar-brand">
                <router-link to="/">게시판</router-link>
            </div>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">홈</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/create">게시글 작성</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/sign-up">회원가입</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/login">로그인</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
.header {
    background-color: #174a7a;
    color: white;
    padding: 1em 2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
}

.navbar-brand {
    font-size: 1.5em;
    font-weight: bold;
}

.navbar-brand a {
    color: white;
    text-decoration: none;
}

.navbar-nav {
    list-style-type: none;
    display: flex;
    margin: 0;
    padding: 0;
}

.nav-item {
    margin-left: 1.5em;
}

.nav-link {
    color: white;
    text-decoration: none;
    font-size: 1em;
}

.nav-link:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .navbar-nav {
        flex-direction: column;
        align-items: flex-start;
    }

    .nav-item {
        margin-left: 0;
        margin-top: 0.5em;
    }
}
</style>