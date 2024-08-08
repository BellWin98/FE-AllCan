<template>
    <div class="post-detail-container">
        <h1>{{ post.title }}</h1>
        <p>{{ post.content }}</p>
        <div class="actions">
            <router-link class="btn edit-btn" :to="{ name: 'PostEdit', params: { id: post.id } }">Edit</router-link>
            <button class="btn delete-btn" @click="deletePost">Delete</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            post: {}
        };
    },
    created() {
        this.fetchPost();
    },
    methods: {
        async fetchPost() {
            const postId = this.$route.params.id;
            this.post = await this.$store.dispatch('fetchPostById', postId);
        },
        async deletePost() {
            await this.$store.dispatch('deletePost', this.post.id);
            this.$router.push('/');
        }
    }
};
</script>

<style scoped>
.post-detail-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 2em;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.actions {
    display: flex;
    justify-content: flex-start;
    gap: 1em;
}

.btn {
    padding: 0.75em 1.5em;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.edit-btn {
    background-color: #007bff;
}

.edit-btn:hover {
    background-color: #0056b3;
}

.delete-btn {
    background-color: #dc3545;
}

.delete-btn:hover {
    background-color: #a71d2a;
}
</style>