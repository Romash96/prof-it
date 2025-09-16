document.querySelectorAll('.icon-box').forEach(box => {
    const popup = box.querySelector('.popup');
    const close = box.querySelector('.close-popup');

    // Клик на иконку — открываем/закрываем
    box.addEventListener('click', (e) => {
        // если клик по кресту, не триггерим toggle
        if (e.target === close) return;
        box.classList.toggle('active');
    });

    // Крестик закрывает
    close.addEventListener('click', () => {
        box.classList.remove('active');
    });

    const rect = box.getBoundingClientRect();
    const popupWidth = popup.offsetWidth;
    if (rect.right + popupWidth > window.innerWidth) {
        popup.style.left = 'auto';
        popup.style.right = '100%'; // показываем слева
    } else {
        popup.style.left = '100%';
        popup.style.right = 'auto';
    }
});

// Клик в любом месте страницы закрывает все открытые popup
document.addEventListener('click', (e) => {
    document.querySelectorAll('.icon-box.active').forEach(box => {
        // если клик не внутри текущего блока — закрыть
        if (!box.contains(e.target)) {
            box.classList.remove('active');
        }
    });
});

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Символы (латиница, цифры, спецсимволы)
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%';
const charsArray = chars.split('');

const fontSize = 20;
const columns = Math.floor(canvas.width / fontSize);

// Массив для "струй" кода
const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * canvas.height / fontSize;
}

// Функция возвращает случайный оттенок зелёного
function randomGreen() {
    const g = 150 + Math.floor(Math.random() * 100); // 150-249
    return `rgb(0,${g},0)`;
}

// Рисуем кадр
function draw() {
    // Полупрозрачный фон для эффекта "следа"
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        // случайный символ
        const text = charsArray[Math.floor(Math.random() * charsArray.length)];

        // случайный оттенок зелёного для мерцания
        ctx.fillStyle = randomGreen();
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // падаем вниз
        drops[i] += Math.random() * 0.5 + 0.5; // плавное разное ускорение

        // если вышли за экран — сбросить наверх
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
    }
}

// Анимация
function animate() {
    requestAnimationFrame(animate);
    draw();
}
animate();

const screenWidth = window.innerWidth;

if(screenWidth < 600) {
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.width = '90%';
  popup.style.maxWidth = '400px';
} else {
  popup.style.position = 'absolute';
  popup.style.top = '0';
  popup.style.left = '100%';
  popup.style.right = 'auto';
  popup.style.transform = 'none';
  popup.style.width = 'auto';
  popup.style.maxWidth = '300px';
}

