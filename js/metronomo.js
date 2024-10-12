let intervalId;
let isRunning = false;
let audioContext;
let clickSound;

// Función para calcular el intervalo en milisegundos basado en los BPM
function getInterval(bpm) {
    return 60000 / bpm; // 60,000 ms por minuto dividido por BPM
}

// Función para iniciar/detener el metrónomo
function toggleMetronome() {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
    } else {
        const bpm = document.getElementById('bpm').value;
        const interval = getInterval(bpm);
        intervalId = setInterval(playBeat, interval);
        isRunning = true;
    }
}

// Función que reproduce el "beat"
function playBeat() {
    const beatElement = document.getElementById('beat');
    beatElement.textContent = '🎵';  // Indicador visual

    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Crear sonido en cada beat
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // Puedes cambiar a 'square', 'triangle', etc.
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Frecuencia del sonido
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);  // Sonido de 100ms

    setTimeout(() => {
        beatElement.textContent = '⏳'; // Vuelve al estado original
    }, 100);  // Visualización del beat dura 100ms
}

function toggleTexto() {
    var descripcion = document.querySelector(".descripcion");
    var btn = document.getElementById("verMasBtn");

    if (descripcion.classList.contains("expandido")) {
        descripcion.classList.remove("expandido");
        btn.textContent = "Ver más";
    } else {
        descripcion.classList.add("expandido");
        btn.textContent = "Ver menos";
    }
}
