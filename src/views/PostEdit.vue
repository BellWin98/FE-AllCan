<template>
    <div>
        <PostForm :isEdit="true" />
    </div>
</template>

<script>
import PostForm from '@/components/post/PostForm.vue';

export default {
    components: {
        PostForm
    }
};
</script>