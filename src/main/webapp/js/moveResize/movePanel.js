function movePanel(event) {
    x = event.pageX;
    y = event.pageY;

    x_block = popUp.offsetLeft;
    y_block = popUp.offsetTop;

    delta_x = x_block - x;
    delta_y = y_block - y;

    document.onmousemove = moveBlock;
    if (browser == 'o' || browser == 'f') {
       document.addEventListener("onmousemove", moveBlock, false);
    }
    document.onmouseup = clearMove;
}

function moveBlock(event) {
    x = event.pageX;
    y = event.pageY;

    new_x = delta_x + x;
    new_y = delta_y + y;
    popUp.style.top = new_y + "px";
    popUp.style.left = new_x + "px";
}