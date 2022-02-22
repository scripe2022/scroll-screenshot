<template>
    <div class="result-container" @mouseup="mouseUp" @mousemove="mouseMove($event)">
        <FlexImage
            :image="imageArray[0]"
            index="c1"
            :mouseClientY="mouseClientY"
            :isMouseDown="isMouseDown"
        ></FlexImage>
        <FlexImage
            :image="imageArray[1]"
            index="c2"
            :mouseClientY="mouseClientY"
            :isMouseDown="isMouseDown"
        ></FlexImage>
    </div>
</template>

<script setup>
    const props = defineProps({
        imageArray: Object,
    });
    let mouseClientY = ref(0);
    let isMouseDown = ref('');
    const mouseUp = () => {
        isMouseDown.value = Date.parse(new Date()).toString();
    };
    const mouseMove = (event) => {
        mouseClientY.value = event.clientY;
    };
</script>

<style scoped>
    .result-container {
        padding: 100px;
    }
</style>
