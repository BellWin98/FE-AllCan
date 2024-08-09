<template>
    <v-container class="post-list-container">
        <v-card outlined>
            <v-card-title>
                <h1>게시글 목록</h1>
            </v-card-title>
            <v-card-text>
                <v-list>
                    <v-list-item v-for="post in posts" :key="post.id"
                        :to="{ name: 'PostView', params: { id: post.id } }" link>
                        <v-list-item-content>
                            <v-list-item-title>{{ post.title }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
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
}

.v-card-title {
    font-size: 1.5em;
    font-weight: bold;
}

.v-list-item {
    transition: background-color 0.3s ease;
}

.v-list-item:hover {
    background-color: rgba(0, 123, 255, 0.1);
}

.v-icon {
    color: #007bff;
}
</style>