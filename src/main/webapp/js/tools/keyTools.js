
function keyText(event, valid) {
    let k = event.key;
    if (k == "ArrowUp" || k == "ArrowDown") {
        return clickUpInput(event);
    } else { 
        if (k == "ArrowRight" || k == "ArrowLeft" || k == "Tab" 
            || k == "Home" || k == "End" || k == "Backspace" || k == "Delete" || k == 'Shift') {
            return true;
        }
    }
    if (valid != null) {
        switch (valid) {
            case "latin":
                let kUp = event.key.toUpperCase();
                if ( ! ((kUp >= "A" && kUp <= "Z") || kUp == "_" || (kUp >= "0" && kUp <= "9")))  {
                    event.preventDefault();
                    tooltipMessage(event.target, "Только английские буквы, _ и цифры");
                }
                break
            case "name_low":
                let targ = event.target;
//                        let k = event.key;
                if ( ! ((k >= "a" && k <= "z") || k == "_" || (k >= "0" && k <= "9")))  {
                    event.preventDefault();
                    tooltipMessage(targ, "Только английские буквы, _ и цифры");
                } else {
                    if (targ.value.length == 0 && k >= "0" && k <= "9") {
                        event.preventDefault();
                        tooltipMessage(targ, "The first character cannot be a digit");
                    }
                }
                break
        }
    }
}