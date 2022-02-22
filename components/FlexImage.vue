<template>
    <img class="flex-image" :src="image.base64" />
</template>

<script setup>
    const props = defineProps({
        image: Object,
    });
</script>

<style scoped>
    .flex-image {
        max-width: 500px;
    }
</style>
