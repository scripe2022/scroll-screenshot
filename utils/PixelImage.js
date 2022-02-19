import { base64ToPixels, pixelsToBase64 } from './imageUtils';
import md5 from 'blueimp-md5';

let PixelImage = class {
    constructor() {
        this.P = 1e9 + 7;
    }
    setBase64 = (base64) => {
        this.base64 = base64;
    };
    setPixels = (pixelsArray, height, width) => {
        this.pixel = pixelsArray;
        this.height = height;
        this.width = width;
    };
    setLines = () => {
        this.lines = [];
        for (let i = 0; i < this.height; ++i) {
            const start = i * this.width * 4;
            const end = (i + 1) * this.width * 4;
            let hashValue = 0;
            for (let j = start; j < end; ++j) {
                hashValue *= 256;
                hashValue += this.pixel[j];
                hashValue %= this.P;
            }
            this.lines.push(hashValue);
        }
    };
    base64ToPixels = async () => {
        const imageInfo = await base64ToPixels(this.base64);
        this.height = imageInfo.height;
        this.width = imageInfo.width;
        this.pixel = imageInfo.pixel;
    };
    pixelsToBase64 = async () => {
        this.base64 = await pixelsToBase64(this.pixel, this.height, this.width);
    };
    getPixel = (x, y) => {
        const index = (x * this.width + y) * 4;
        const pixel = {
            red: this.pixel[index],
            green: this.pixel[index + 1],
            blue: this.pixel[index + 2],
            alpha: this.pixel[index + 3],
        };
        return pixel;
    };
};

export { PixelImage };
