// Слайдер
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(index) {
    // Скрываем все слайды
    slides.forEach(slide => slide.classList.remove('active'));
    // Показываем текущий слайд
    slides[index].classList.add('active');
    
    // Обновляем активные точки
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Обработчики кнопок
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Обработчики точек
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'));
        showSlide(slideIndex);
    });
});

// Автоматическое переключение слайдов каждые 5 секунд
let slideInterval = setInterval(nextSlide, 5000);

// Останавливаем автоматическое переключение при наведении на слайдер
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Услуги - раскрытие описаний (ПОЛНОСТЬЮ ИСПРАВЛЕНО)
// Теперь каждая карточка обрабатывается индивидуально без использования общих ID
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    const header = card.querySelector('.service-header');
    const description = card.querySelector('.service-description');
    const arrow = card.querySelector('.arrow');
    
    // Добавляем обработчик клика только для этой конкретной карточки
    header.addEventListener('click', function(e) {
        e.stopPropagation(); // Предотвращаем всплытие события
        
        // Переключаем состояние только для текущей карточки
        const isExpanded = description.classList.contains('show');
        
        if (isExpanded) {
            description.classList.remove('show');
            arrow.classList.remove('rotated');
        } else {
            description.classList.add('show');
            arrow.classList.add('rotated');
        }
    });
});

// Форма обратного звонка
const callbackForm = document.getElementById('callbackForm');

if (callbackForm) {
    callbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        
        // Здесь можно добавить отправку данных на сервер
        console.log('Заявка на обратный звонок:', { name, phone });
        
        // Показываем сообщение об успешной отправке
        alert(`Спасибо, ${name}! Мы перезвоним вам в ближайшее время.`);
        
        // Очищаем форму
        callbackForm.reset();
    });
}

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимации при прокрутке
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
}

// Добавляем классы анимации к элементам
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
});

document.querySelectorAll('.advantage-card, .stat-item, .testimonial-card').forEach(card => {
    card.classList.add('fade-in-up');
});

// Запускаем анимации при загрузке и прокрутке
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Дополнительная защита от багов с раскрытием
document.addEventListener('DOMContentLoaded', function() {
    // Убеждаемся, что все описания изначально скрыты
    const allDescriptions = document.querySelectorAll('.service-description');
    allDescriptions.forEach(desc => {
        desc.classList.remove('show');
    });
    
    // Убеждаемся, что все стрелки в исходном положении
    const allArrows = document.querySelectorAll('.arrow');
    allArrows.forEach(arrow => {
        arrow.classList.remove('rotated');
    });
});