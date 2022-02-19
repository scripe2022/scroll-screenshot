const loadPics = (imageFile) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = (e) => {
            resolve(e.target.result);
        };
    });
};

const base64ToPixels = (base64) => {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = base64;
        image.onload = () => {
            let canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;

            let context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);
            let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            console.log(imageData);
            resolve({
                height: image.height,
                width: image.width,
                pixel: imageData.data,
            });
        };
    });
};

const pixelsToBase64 = (pixelsArray, height, width) => {
    return new Promise((resolve, reject) => {
        let canvas = document.createElement('canvas');
        canvas.height = height;
        canvas.width = width;

        let context = canvas.getContext('2d');
        let imageData = context.createImageData(width, height);
        for (let i = 0; i < pixelsArray.length; ++i) {
            imageData.data[i] = pixelsArray[i];
        }
        context.putImageData(imageData, 0, 0);
        let fuck = context.getImageData(0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL());
    });
};

const getPos = (currentPic, nextPic) => {
    for (let i = 0; i < currentPic.height; ++i) {
        const pos = nextPic.lines.indexOf(currentPic.lines[i]);
        if (pos != -1) {
            return {
                posCurrent: i,
                posNext: pos,
            };
        }
    }
    return -1;
};

export { loadPics, base64ToPixels, pixelsToBase64, getPos };
