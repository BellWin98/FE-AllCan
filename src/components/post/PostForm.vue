<template>
    <v-container class="post-form-container" max-width="600px">
        <v-card class="pa-5" outlined>
            <v-card-title class="justify-center">
                {{ isEdit ? '게시글 수정' : '게시글 작성' }}
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="handleSubmit">
                    <v-text-field v-model="post.title" label="제목" outlined required></v-text-field>

                    <v-textarea v-model="post.content" label="내용" outlined required auto-grow></v-textarea>

                    <v-btn type="submit" color="primary" block>
                        {{ isEdit ? '수정하기' : '등록하기' }}
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            post: {
                title: '',
                content: ''
            }
        };
    },
    created() {
        if (this.isEdit) {
            this.fetchPost();
        }
    },
    methods: {
        async fetchPost() {
            const postId = this.$route.params.id;
            this.post = await this.$store.dispatch('fetchPostById', postId);
        },
        async handleSubmit() {
            if (this.isEdit) {
                await this.$store.dispatch('updatePost', this.post);
            } else {
                await this.$store.dispatch('createPost', this.post);
            }
            this.$router.push('/');
        }
    }
};
</script>

<style scoped>
.post-form-container {
    margin: 50px auto;
}
</style>