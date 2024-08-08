<template>
    <div class="post-list-container">
        <h1>게시글 목록</h1>
        <ul class="post-list">
            <li v-for="post in posts" :key="post.id" class="post-item">
                <router-link class="post-link" :to="{ name: 'PostView', params: { id: post.id } }">{{ post.title
                    }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts: []
        };
    },
    created() {
        this.fetchPosts();
    },
    methods: {
        async fetchPosts() {
            this.posts = await this.$store.dispatch('fetchPosts');
        }
    }
};
</script>

<style scoped>
.post-list-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 2em;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.post-list {
    list-style-type: none;
    padding: 0;
}

.post-item {
    margin-bottom: 1em;
}

.post-link {
    color: #007bff;
    text-decoration: none;
    font-size: 1.25em;
    transition: color 0.3s ease;
}

.post-link:hover {
    color: #0056b3;
}
</style>