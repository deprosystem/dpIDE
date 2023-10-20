function editUX_UI() {
    if (ux_ui.innerHTML == "U I") {
        isUX = false;
        ux_ui.innerHTML = "UX";
        plus_screen.style.display = "none";
        corners.style.display = "none";
        document.documentElement.style.setProperty('--r_data', 465 + "px");
        setTimeout(showTypeInsActive, 400);
        document.documentElement.style.setProperty('--w_ux_p', '21%');
        document.documentElement.style.setProperty('--w_ux_r', '24%');
        document.documentElement.style.setProperty('--left_compon', '21%');
    } else {
        isUX = true;
        ux_ui.innerHTML = "U I";
        type_insert.style.display = "none";
        active.style.display = "none";
        plus_screen.style.display = "block";
        corners.style.display = "block";
        document.documentElement.style.setProperty('--r_data', 150 + "px");
        document.documentElement.style.setProperty('--w_ux_p', '60%');
        document.documentElement.style.setProperty('--w_ux_r', '0px');
        document.documentElement.style.setProperty('--left_compon', '0px');
        scrLayoutAttr.scroll_y.resize(scrLayoutAttr);
    }
}

function showTypeInsActive() {
    type_insert.style.display = "block";
    active.style.display = "block";
}


