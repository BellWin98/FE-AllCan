<template>
    <v-container class="post-detail-container">
        <v-card outlined>
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-text>{{ post.content }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" :to="{ name: 'PostEdit', params: { id: post.id } }" text>수정</v-btn>
                <v-btn color="error" @click="deletePost" text>삭제</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
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
}

.v-card {
    padding: 2em;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.v-card-title {
    font-size: 1.5em;
    font-weight: bold;
}

.v-card-text {
    margin-bottom: 1.5em;
    white-space: pre-wrap;
    /* To preserve the formatting of content */
}
</style>