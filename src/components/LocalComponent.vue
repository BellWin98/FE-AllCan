<template>
    <div>
        <button @click="showTitle">Click</button>
        <span>{{ title }}</span>
    </div>
</template>

<script>
export default {
    name: 'LocalComponent',
    data() {
        return {
            title: "",
        }
    },
    methods: {
        showTitle() {
            this.title = 'Local Component!!'
        }
    }
}
</script>

<style scoped>
div {
    padding: 20px
}

div span {
    margin: 20px
}
</style>