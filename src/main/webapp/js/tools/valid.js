function isUrlValid(userInput) {
    var regexQuery = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
    var url = new RegExp(regexQuery,"i");
    return url.test(userInput);
}

function checkLatinKey(e) {
    let kUp = e.key.toUpperCase();
    if ( ! ((kUp >= "A" && kUp <= "Z") || kUp == "_" || (kUp >= "0" && kUp <= "9")))  {
        e.preventDefault();
        tooltipMessage(e.currentTarget, "Только английские буквы, _ и цифры");
    }
}

function editFloat(event) {
    let k = event.keyCode;
    let z = event.key;
    if (k < 47) {
        return true;
    }
    if ((k > 47 && k < 58) || k == 173 || z == ".") {
        if (k == 173) {
            if (event.target.selectionStart > 0) {
                event.preventDefault();
                tooltipMessage(event.target, "Минус не в начале");
                return false;
            }
        } else if (z == ".") {
            let vv = event.target.value;
            if (vv.indexOf(".") > -1) {
                event.preventDefault();
                tooltipMessage(event.target, "Точка уже есть");
                return false;
            }
        }
        return true;
    } else {
        event.preventDefault();
        tooltipMessage(event.target, "Только цифры");
        return false;
    }
}
