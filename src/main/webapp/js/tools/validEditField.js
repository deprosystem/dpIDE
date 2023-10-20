function validName(e) {
    var k = e.key;
    var kUp = k.toUpperCase();
    if ((kUp >= "A" && kUp <= "Z") || kUp == "_" || (kUp >= "0" && kUp <= "9") || 
            k == 'ArrowLeft' || k == 'ArrowRight' || k == 'Delete' || k == 'Backspace' || k == 'Shift' || k == 'Alt')  {
        let el = e.target;
        if (el.selectionStart == 0 && k >= "0" && k <= "9") {
            tooltipMessage(e.currentTarget, "The first character cannot be a digit");
            return false;
        } else {
            return true;
        }
//        return true;
    } else {
        tooltipMessage(e.currentTarget, "Только английские буквы, _ и цифры");
        return false;
    }
}

function validNameParam(e) {
    var k = e.key;
    var kUp = k.toUpperCase();
    if ((kUp >= "A" && kUp <= "Z") || kUp == "_" || (kUp >= "0" && kUp <= "9") || 
            k == 'ArrowLeft' || k == 'ArrowRight' || k == 'Delete' || k == 'Backspace' || k == 'Shift' || k == 'Alt')  {
        let el = e.target;
        if (el.selectionStart == 0 && k >= "0" && k <= "9") {
            tooltipMessage(e.currentTarget, "The first character cannot be a digit");
            return false;
        } else {
            return true;
        }
//        return true;
    } else {
        tooltipMessage(e.currentTarget, "Только английские буквы, _ и цифры");
        return false;
    }
}

function validNameLower(e) {
    let k = e.key;
    if ((k >= "a" && k <= "z") || k == "_" || (k >= "0" && k <= "9") || 
            k == 'ArrowLeft' || k == 'ArrowRight' || k == 'Delete' || k == 'Backspace' || k == 'Enter'
            || k == "Tab" || k == 'ArrowDown' || k == 'ArrowUp' || k == 'Shift' || k == 'Alt' || k == 'Home' || k == 'End')  {
        let el = e.target;
        if (el.selectionStart == 0) {
            if (k >= "0" && k <= "9") {
                tooltipMessage(e.currentTarget, "The first character cannot be a digit");
                return false;
            }
            if (k == "_") {
                tooltipMessage(e.currentTarget, "The first character cannot be a _");
                return false;
            }
            return true;
        } else {
            return true;
        }
    } else {
        tooltipMessage(e.currentTarget, "Только английские буквы в нижнем регистре, _ и цифры");
        return false;
    }
}

function validNumber(event) {
    let k = event.keyCode;
    if (k < 47) {
        return true;
    } else {
        if (k < 48 || k > 57) {
            event.preventDefault();
            tooltipMessage(event.currentTarget, "Only numbers");
        }
    }
//    return false;
}

function validNumberSign(event) {
    let k = event.keyCode;
    if (k < 47) {
        return true;
//        return clickUpInput(event);
    } else {
        if ( ! ((k > 47 && k < 58) || k == 173)) {
            event.preventDefault();
            tooltipMessage(event.target, "Только цифры");
        } else {
            if (k == 173) {
                if (event.target.selectionStart > 0) {
                    event.preventDefault();
                    tooltipMessage(event.target, "Минус не в начале");
                }
            }
        }
    }
}

function validFloat(event) {
    let k = event.keyCode;
    let z = event.key;
    if (k < 47) {
        return true;
    }
    if ((k > 47 && k < 58) || k == 173 || z == ".") {
        if (k == 173) {
            if (event.target.selectionStart > 0) {
                event.preventDefault();
                tooltipMessage(event.target, "Minus not at the beginning");
                return false;
            }
        } else if (z == ".") {
            let vv = event.target.value;
            if (vv.indexOf(".") > -1) {
                event.preventDefault();
                tooltipMessage(event.target, "The point is already there");
                return false;
            }
        }
        return true;
    } else {
        event.preventDefault();
        tooltipMessage(event.target, "Only numbers");
        return false;
    }
}