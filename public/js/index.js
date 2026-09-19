// Initialize AOS
AOS.init({
    once: false,
    mirror: true,
    duration: 1000
});

// Initialize tsParticles for IT theme background
loadSlim(tsParticles);
tsParticles.load("tsparticles", {
    background: {
        color: { value: "transparent" }
    },
    fpsLimit: 60,
    interactivity: {
        events: {
            onClick: { enable: true, mode: "push" },
            onHover: { enable: true, mode: "repulse" },
            resize: true
        },
        modes: {
            push: { quantity: 4 },
            repulse: { distance: 100, duration: 0.4 }
        }
    },
    particles: {
        color: { value: ["#0d6efd", "#0dcaf0", "#6610f2"] },
        links: {
            color: "#0d6efd",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1
        },
        move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: false,
            speed: 2,
            straight: false
        },
        number: {
            density: { enable: true, area: 800 },
            value: 80
        },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } }
    },
    detectRetina: true
});

// Dark Mode Toggle
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const body = document.body;

function switchTheme(e) {
    if (e.target.checked) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        document.documentElement.setAttribute('data-bs-theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Audio Player
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

// Attempt Autoplay on page load
window.addEventListener('DOMContentLoaded', () => {
    bgMusic.play().then(() => {
        isPlaying = true;
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        musicToggle.classList.add('playing');
    }).catch(e => {
        console.log("Audio autoplay blocked by browser, waiting for user interaction");
        // Fallback: Autoplay on first interaction if blocked
        document.addEventListener('click', function initAudio() {
            if (!isPlaying) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                    musicToggle.classList.add('playing');
                }).catch(e => console.log("Audio play failed"));
            }
            document.removeEventListener('click', initAudio);
        }, { once: true });
    });
});

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        musicToggle.classList.remove('playing');
    } else {
        bgMusic.play();
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        musicToggle.classList.add('playing');
    }
    isPlaying = !isPlaying;
});