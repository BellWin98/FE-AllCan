<template>
    <div class="post-form-container">
        <h1>{{ isEdit ? '게시글 수정' : '게시글 작성' }}</h1>
        <form @submit.prevent="handleSubmit" class="post-form">
            <div class="form-group">
                <label for="title">제목</label>
                <input v-model="post.title" id="title" required />
            </div>
            <div class="form-group">
                <label for="content">내용</label>
                <textarea v-model="post.content" id="content" required></textarea>
            </div>
            <button type="submit" class="btn">{{ isEdit ? '수정하기' : '등록하기' }}</button>
        </form>
    </div>
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
    max-width: 800px;
    margin: 50px auto;
    padding: 2em;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.post-form .form-group {
    margin-bottom: 1.5em;
}

.post-form label {
    display: block;
    margin-bottom: 0.5em;
    font-weight: bold;
}

.post-form input,
.post-form textarea {
    width: 100%;
    padding: 0.75em;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1em;
}

.post-form textarea {
    height: 150px;
}

.btn {
    width: 100%;
    padding: 0.75em;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #555;
}
</style>