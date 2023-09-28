// THIS CODE WAS EXTRACTED FROM "https://blog.openreplay.com/image-manipulation-with-react-easy-crop/"

import { Area } from "react-easy-crop";

function createImage(url: string) {

    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous");
        image.src = url;
    });
}

export async function getCroppedImg(imageSrc: string, pixelCrop: Area) {
    const url = await generateImage(imageSrc, pixelCrop)

    if (url != null) {
        const response = await fetch(url)
        const data = await response.blob()
        const file = new File([data], "avatar", { type: "image/jpeg" })

        return {
            url, file
        }
    }

    return null
}

async function generateImage(imageSrc: string, pixelCrop: Area): Promise<string | null> {
    const image = await createImage(imageSrc) as HTMLImageElement;
    const { width, height } = image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return null

    canvas.width = width;
    canvas.height = height;

    ctx.translate(width / 2, height / 2);
    ctx.rotate(0);
    ctx.scale(1, 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    ctx.drawImage(image, 0, 0);

    const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);


    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(data, 0, 0);

    return new Promise((resolve) => {
        canvas.toBlob((file) => {
            resolve(URL.createObjectURL(file as File))
        }, "image/jpeg");
    });
}