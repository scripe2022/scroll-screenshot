<template>
    <div class="documentation-container">
        <div>
            <input type="file" ref="file" accept="image/*" multiple @change="getFile($event)" />
        </div>
        <!-- <img :src="imgSrc" /> -->
        <!-- <img :src="picsBase64[1]" /> -->
        <ResultImage v-if="fuck" :imageArray="imageArray"></ResultImage>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import { loadPics, getPos } from '~/utils/imageUtils';
    import tempBase64 from '~/utils/pic.json';
    import { PixelImage } from '~/utils/PixelImage';

    let imgSrc = ref('');
    let fuck = ref(false);

    let imageArray = [];
    imageArray.push(new PixelImage());
    imageArray.push(new PixelImage());
    imageArray[0].setBase64(tempBase64['pic1']);
    imageArray[1].setBase64(tempBase64['pic2']);
    for (let i = 0; i < imageArray.length; ++i) {
        await imageArray[i].base64ToPixels();
    }
    fuck.value = true;

    const getFile = async (event) => {
        const files = event.target.files;
        let filePromises = [];
        for (let i = 0; i < files.length; ++i) {
            if (files[i].size && files[i].type.indexOf('image') != '-1') {
                filePromises.push(loadPics(files[i]));
            }
        }
        const imageBase64List = await Promise.all(filePromises);
        for (let i = 0; i < imageBase64List.length; ++i) {
            imageArray.push(new PixelImage());
            imageArray[i].setBase64(imageBase64List[i]);
            await imageArray[i].base64ToPixels();
            imageArray[i].setLines();
        }

        let pos = [];
        let resultHeight = 0;
        for (let i = 0; i < imageArray.length; ++i) resultHeight += imageArray[i].height;
        let resultWidth = imageArray[0].width;
        let result = new PixelImage();
        for (let i = 0; i < imageArray.length - 1; ++i) {
            pos.push(getPos(imageArray[i], imageArray[i + 1]));
            resultHeight -= imageArray[i].height - pos[i].posCurrent;
            resultHeight -= pos[i].posNext;
        }
        let resultPixels = new Uint8ClampedArray(4 * resultHeight * resultWidth);
        let last = 0;
        for (let i = 0; i < imageArray.length - 1; ++i) {
            const top = i == 0 ? 0 : pos[i - 1].posNext;
            const bottom = pos[i].posCurrent;
            resultPixels.set(imageArray[i].pixel.slice(top * resultWidth * 4, bottom * resultWidth * 4), last);
            last = (bottom - top - 1) * resultWidth * 4;
        }
        const lastTop = pos[imageArray.length - 2].posNext;
        const lastBottom = imageArray[imageArray.length - 1].height;
        resultPixels.set(
            imageArray[imageArray.length - 1].pixel.slice(lastTop * resultWidth * 4, lastBottom * resultWidth * 4),
            last,
        );

        result.setPixels(resultPixels, resultHeight, resultWidth);
        await result.pixelsToBase64();
        imgSrc.value = result.base64;

        // const temp = new PixelImage();
        // let newPixels = new Uint8ClampedArray(imageArray[0].pixel.length + imageArray[1].pixel.length);
        // newPixels.set(imageArray[0].pixel);
        // newPixels.set(imageArray[1].pixel, imageArray[0].pixel.length);
        // console.log(newPixels);
        // const newHeight = imageArray[0].height + imageArray[1].height;
        // const newWidth = imageArray[0].width;
        // temp.setPixels(newPixels, newHeight, newWidth);
        // await temp.pixelsToBase64();
        // imgSrc.value = temp.base64;
        fuck.value = true;
    };
</script>

<style scoped>
    .documentation-container {
        margin: 50px;
    }
</style>
