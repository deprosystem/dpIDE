var screenEmulator;
function setComponentsScr() {
    if (emulator_inf.innerHTML == "Preview") {
        emulator_inf.innerHTML = "Editor";
        screenEmulator = new emalator();
        screenEmulator.setEmulator();
    } else {
        emulator_inf.innerHTML = "Preview";
        screenEmulator.noEmulatorComponents();
        screenEmulator = null;
    }
}

function offEmulator() {
    if (emulator_inf.innerHTML == "Editor") {
        screenEmulator.noEmulatorComponents();
        screenEmulator = null;
        emulator_inf.innerHTML = "Preview";
    }
}

function onEmulator() {
    if (emulator_inf.innerHTML == "Preview") {
        emulator_inf.innerHTML = "Editor";
        screenEmulator = new emalator();
        screenEmulator.setEmulator();
    }
}


