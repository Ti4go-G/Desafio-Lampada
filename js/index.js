const img = document.getElementById('lamps');
let ligthOn = false
let isBroken = false
let timesTurnedOn = 0
let lastTurnedOff
let timerOverHeat

function breakLight() {
    img.src = 'imgs/broken_light_bulb.jpg';
    isBroken = true;
}

function turnOffCounter() {
    if (!ligthOn || isBroken) return
    intervalOff = setTimeout(() => {
        turnOff();
    }, 15000)
}

function turnOff() {
    if (isBroken) return;
    img.src = 'imgs/light_bulb_off.jpg';
    lastTurnedOff = Date.now();
    ligthOn = false;
    clearTimeout(timerOverHeat);
}
function turnOn() {
    if (isBroken) return

    if (ligthOn) {
        clearTimeout(timerOverHeat);
        clearTimeout(intervalOff);
        return
    }

    img.src = 'imgs/light_bulb_on.jpg'
    ligthOn = true;
    timesTurnedOn++

    if (timesTurnedOn >= 5) {
        breakLight()
        return
    }

    const now = Date.now();
    const timeOff = now - lastTurnedOff;
    if (lastTurnedOff && timeOff < 5000) {
        timerOverHeat = setTimeout(() => {
            breakLight()
        }, 10000)
    }
    clearTimeout(intervalOff);

}
img.addEventListener('mouseenter', turnOn)
img.addEventListener('mouseleave', turnOffCounter)

