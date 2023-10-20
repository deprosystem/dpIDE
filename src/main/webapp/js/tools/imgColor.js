// Змінити колір іконки
function changeImgColor(canvas, url, rgb) {
    let r, g, b;
    let context = canvas.getContext("2d");
    let w = canvas.width;
    let h = canvas.height;
    context.clearRect(0, 0, w, h);
    let img = new Image();
    img.src = url;
    if (rgb != null) {
        r = rgb.r; 
        g = rgb.g;
        b = rgb.b;
    }
    img.onload = function() {
        context.drawImage(img, 0, 0, w, h);
        if (rgb != null) {
            let imageData = context.getImageData(0,0, w, h);
            let ik = imageData.data.length;
            for (var i = 0; i < ik; i += 4) {
                if (imageData.data[i + 3] != 0) {
                    imageData.data[i] = r;
                    imageData.data[i + 1] = g;
                    imageData.data[i + 2] = b;
                }
            }
            context.putImageData(imageData, 0, 0);
        }
    };
}

