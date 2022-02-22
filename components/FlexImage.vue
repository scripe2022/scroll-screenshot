<template>
    <div class="container">
        <div class="image-container" :id="index" :style="containerStyle">
            <img :src="image.base64" />
        </div>
        <div class="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="controler" @mousedown="mouseDown($event)">
                <line
                    :x1="lineStyle.x1"
                    :y1="lineStyle.y1"
                    :x2="lineStyle.x2"
                    :y2="lineStyle.y2"
                    class="line-style"
                ></line>
            </svg>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        image: Object,
        index: String,
        mouseClientY: Number,
        isMouseDown: String,
    });
    const emit = defineEmits(['updateIsMouseDown']);
    let containerStyle = ref({
        height: props.image.height + 'px',
        width: props.image.width + 'px',
    });
    let lineStyle = ref({
        x1: 0,
        y1: 5,
        x2: props.image.width,
        y2: 5,
    });
    let localClientY = 0;
    let localMouseDown = false;
    const mouseDown = (event) => {
        localMouseDown = true;
        localClientY = event.clientY;
    };
    watch(
        () => props.mouseClientY,
        (newValue, oldValue) => {
            if (localMouseDown == true) {
                // lineStyle.value.y1 += newValue - localClientY;
                // lineStyle.value.y2 += newValue - localClientY;
                containerStyle.value.height = parseInt(containerStyle.value.height) + newValue - localClientY + 'px';
                localClientY = newValue;
            }
        },
    );
    watch(
        () => props.isMouseDown,
        (newValue, oldValue) => {
            console.log(newValue);
            localMouseDown = false;
        },
    );
</script>

<style scoped>
    .container {
        margin: 0;
        padding: 0;
    }
    .svg-container {
        height: 10px;
    }
    .image-container {
        overflow: hidden;
        user-select: none;
    }
    .controler {
        /* position: absolute; */
        overflow: visible;
    }
    .line-style {
        stroke: rgb(255, 0, 0);
        stroke-width: 10;
        cursor: grab;
    }
    .line-style:hover {
        stroke: rgb(255, 70, 0);
    }
</style>
