// ==================== КОНФИГУРАЦИЯ ====================
const API_KEY = 'eaf97d077bae7bd0d658a97c0dae546b';

// Базовый URL для API запросов
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Текущая выбранная единица измерения температуры ('metric' для °C, 'imperial' для °F)
let currentUnit = 'metric';

// Хранилище для текущих данных о погоде (нужны для конвертации °C/°F)
let currentWeatherData = null;
let currentForecastData = null;

// Массив избранных городов (максимум 5)
let favorites = [];

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

/**
 * Показать сообщение об ошибке
 * @param {string} message - Текст ошибки
 */
function showError(message) {
    // Удаляем предыдущее сообщение об ошибке, если оно есть
    const existingError = document.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Создаем новый элемент с ошибкой
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = `${message}`;
    
    // Вставляем ошибку перед секцией с погодой
    const currentWeather = document.getElementById('current-weather');
    currentWeather.parentNode.insertBefore(errorDiv, currentWeather);
    
    // Автоматически скрываем ошибку через 5 секунд
    setTimeout(() => {
        if (errorDiv.parentNode) errorDiv.remove();
    }, 5000);
}

/**
 * Показать/скрыть индикатор загрузки
 * @param {boolean} show - Показывать или скрывать
 */
function showLoader(show) {
    const loader = document.getElementById('loader');
    if (show) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}

/**
 * Конвертирует температуру из Цельсия в Фаренгейт
 * @param {number} celsius - Температура в градусах Цельсия
 * @returns {number} - Температура в градусах Фаренгейта
 */
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

/**
 * Обновляет отображение температуры в зависимости от выбранной единицы
 */
function updateTemperatureDisplay() {
    if (!currentWeatherData) return;
    
    // Получаем температуру в Цельсиях из исходных данных
    const tempC = currentWeatherData.main.temp;
    const feelsLikeC = currentWeatherData.main.feels_like;
    
    let temp, feelsLike, unitSymbol;
    
    if (currentUnit === 'metric') {
        // Показываем в Цельсиях
        temp = Math.round(tempC);
        feelsLike = Math.round(feelsLikeC);
        unitSymbol = '°C';
    } else {
        // Конвертируем в Фаренгейты
        temp = Math.round(celsiusToFahrenheit(tempC));
        feelsLike = Math.round(celsiusToFahrenheit(feelsLikeC));
        unitSymbol = '°F';
    }
    
    // Обновляем DOM элементы
    document.getElementById('temp').textContent = temp;
    document.getElementById('temp-unit').textContent = unitSymbol;
    document.getElementById('feels-like').textContent = `Ощущается как: ${feelsLike}${unitSymbol}`;
}

/**
 * Меняет фоновый градиент в зависимости от погодных условий
 * @param {string} weatherMain - Основной тип погоды (Clear, Clouds, Rain, Snow и т.д.)
 */

function changeBackgroundByWeather(weatherMain) {
    const gradients = {
        'Clear': 'linear-gradient(135deg, #f9e428, #fab561, #f89b4a)',  // Солнечный закат
        'Clouds': 'linear-gradient(135deg, #6B7280, #9CA3AF, #D1D5DB)',   // Серебристые облака
        'Rain': 'linear-gradient(135deg, #1E3A5F, #2C5F8A, #1B4F72)',      // Дождливое небо
        'Drizzle': 'linear-gradient(135deg, #3A7CA5, #5DADE2, #85C1E9)',   // Легкий дождь
        'Thunderstorm': 'linear-gradient(135deg, #1A1A2E, #16213E, #0F3460)', // Гроза
        'Snow': 'linear-gradient(135deg, #D4E6F1, #AED6F1, #85C1E9)',       // Снежное утро
        'Mist': 'linear-gradient(135deg, #95A5A6, #BDC3C7, #D5D8DC)',       // Туман
        'Haze': 'linear-gradient(135deg, #CACFD2, #E5E8E8, #F2F3F4)'        // Дымка
    };
    
    // Выбираем градиент или стандартный радужный
    const gradient = gradients[weatherMain] || '#cea571';
    
    // Плавно меняем фон
    document.body.style.background = gradient;
    document.body.style.transition = 'background 0.8s ease';
}

/**
 * Обновляет активную кнопку переключателя единиц измерения
 */
function updateUnitButtons() {
    const btnC = document.getElementById('unit-c');
    const btnF = document.getElementById('unit-f');
    
    if (currentUnit === 'metric') {
        btnC.classList.add('active');
        btnF.classList.remove('active');
    } else {
        btnC.classList.remove('active');
        btnF.classList.add('active');
    }
}

// ==================== ОСНОВНЫЕ ФУНКЦИИ ОТОБРАЖЕНИЯ ====================

/**
 * Отображает текущую погоду на странице
 * @param {Object} data - Данные о погоде от API
 */
function displayWeather(data) {
    // Сохраняем данные для конвертации температуры
    currentWeatherData = data;
    
    // Отображаем название города
    document.getElementById('city-name').textContent = data.name;
    
    // Отображаем описание погоды (первая буква заглавная)
    const description = data.weather[0].description;
    document.getElementById('description').textContent = description.charAt(0).toUpperCase() + description.slice(1);
    
    // Отображаем иконку погоды
    const iconCode = data.weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById('weather-icon').alt = description;
    
    // Отображаем влажность
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    
    // Отображаем скорость ветра (м/с или миль/ч в зависимости от единиц)
    let windSpeed = data.wind.speed;
    let windUnit = currentUnit === 'metric' ? 'м/с' : 'миль/ч';
    document.getElementById('wind').textContent = `${windSpeed.toFixed(1)} ${windUnit}`;
    
    // Отображаем давление (гПа)
    document.getElementById('pressure').textContent = `${data.main.pressure} гПа`;
    
    // Обновляем отображение температуры
    updateTemperatureDisplay();
    
    // Меняем фон в зависимости от погоды
    changeBackgroundByWeather(data.weather[0].main);
}

/**
 * Отображает прогноз на 5 дней
 * @param {Object} data - Данные прогноза от API
 */
function displayForecast(data) {
    // Сохраняем данные для конвертации
    currentForecastData = data;
    
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Очищаем контейнер
    
    // Группируем прогнозы по дням (API дает данные каждые 3 часа)
    const dailyForecasts = {};
    
    data.list.forEach(item => {
        // Получаем дату в формате ГГГГ-ММ-ДД
        const date = new Date(item.dt * 1000);
        const dateKey = date.toLocaleDateString('ru-RU');
        
        // Если для этой даты еще нет записи, создаем
        if (!dailyForecasts[dateKey]) {
            dailyForecasts[dateKey] = {
                temps: [],
                icon: item.weather[0].icon,
                weatherMain: item.weather[0].main
            };
        }
        
        // Добавляем температуру в массив для этого дня
        dailyForecasts[dateKey].temps.push(item.main.temp);
    });
    
    // Берем прогнозы на 5 дней (исключаем сегодняшний день)
    const dates = Object.keys(dailyForecasts).slice(1, 6);
    
    dates.forEach(dateKey => {
        const dayData = dailyForecasts[dateKey];
        // Вычисляем среднюю температуру за день
        const avgTemp = dayData.temps.reduce((a, b) => a + b, 0) / dayData.temps.length;
        
        // Создаем карточку прогноза
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        
        // Форматируем дату для отображения
        const date = new Date(dateKey.split('.').reverse().join('-'));
        const formattedDate = date.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'numeric' });
        
        // Конвертируем температуру если нужно
        let displayTemp = avgTemp;
        if (currentUnit === 'imperial') {
            displayTemp = celsiusToFahrenheit(avgTemp);
        }
        
        forecastCard.innerHTML = `
            <div class="forecast-date">${formattedDate}</div>
            <img src="https://openweathermap.org/img/wn/${dayData.icon}.png" alt="weather" class="forecast-icon">
            <div class="forecast-temp">${Math.round(displayTemp)}${currentUnit === 'metric' ? '°C' : '°F'}</div>
        `;
        
        forecastContainer.appendChild(forecastCard);
    });
}

// ==================== API ЗАПРОСЫ ====================

/**
 * Получает данные о погоде для указанного города
 * @param {string} city - Название города
 */
async function getWeather(city) {
    // Проверяем, что город не пустой
    if (!city || city.trim() === '') {
        showError('Пожалуйста, введите название города');
        return;
    }
    
    showLoader(true);
    
    try {
        // Формируем URL для запроса текущей погоды
        const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${currentUnit}&lang=ru`;
        
        const response = await fetch(url);
        
        // Обработка ошибок HTTP
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Город "${city}" не найден. Проверьте правильность написания.`);
            } else if (response.status === 401) {
                throw new Error('Неверный API ключ. Проверьте настройки.');
            } else {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
        }
        
        const data = await response.json();
        displayWeather(data);
        
        // После получения текущей погоды, получаем прогноз
        await getForecast(city);
        
    } catch (error) {
        // Обработка ошибок сети и других исключений
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            showError('Нет соединения с интернетом. Проверьте подключение.');
        } else {
            showError(error.message);
        }
        console.error('Ошибка:', error);
    } finally {
        showLoader(false);
    }
}

/**
 * Получает прогноз погоды на 5 дней
 * @param {string} city - Название города
 */
async function getForecast(city) {
    try {
        const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=ru`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Не удалось получить прогноз');
        }
        
        const data = await response.json();
        displayForecast(data);
        
    } catch (error) {
        console.error('Ошибка прогноза:', error);
        // Не показываем ошибку пользователю, так как текущая погода уже отображается
    }
}

/**
 * Получает погоду по координатам (для геолокации)
 * @param {number} lat - Широта
 * @param {number} lon - Долгота
 */
async function getWeatherByCoords(lat, lon) {
    showLoader(true);
    
    try {
        const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${currentUnit}&lang=ru`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Не удалось получить погоду по вашему местоположению');
        }
        
        const data = await response.json();
        displayWeather(data);
        
        // Получаем прогноз по координатам
        const forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
        
    } catch (error) {
        showError(error.message);
    } finally {
        showLoader(false);
    }
}

// ==================== ГЕОЛОКАЦИЯ ====================

/**
 * Определяет местоположение пользователя через браузер
 */
function getLocation() {
    // Проверяем поддержку геолокации браузером
    if (!navigator.geolocation) {
        showError('Ваш браузер не поддерживает геолокацию');
        return;
    }
    
    showLoader(true);
    
    // Запрашиваем текущее положение
    navigator.geolocation.getCurrentPosition(
        // Успешное определение позиции
        (position) => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoords(latitude, longitude);
        },
        // Ошибка определения позиции
        (error) => {
            showLoader(false);
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    showError('Доступ к геолокации запрещен. Разрешите доступ в настройках браузера.');
                    break;
                case error.POSITION_UNAVAILABLE:
                    showError('Информация о местоположении недоступна');
                    break;
                case error.TIMEOUT:
                    showError('Время ожидания геолокации истекло');
                    break;
                default:
                    showError('Ошибка при определении местоположения');
            }
        }
    );
}

// ==================== ИЗБРАННЫЕ ГОРОДА ====================

/**
 * Загружает избранные города из localStorage
 */
function loadFavorites() {
    const saved = localStorage.getItem('favoriteCities');
    if (saved) {
        favorites = JSON.parse(saved);
        renderFavorites();
    }
}

/**
 * Сохраняет избранные города в localStorage
 */
function saveFavorites() {
    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
    renderFavorites();
}

/**
 * Добавляет текущий город в избранное
 */
function addToFavorites() {
    if (!currentWeatherData) {
        showError('Сначала найдите город');
        return;
    }
    
    const cityName = currentWeatherData.name;
    
    // Проверяем, есть ли уже город в избранном
    if (favorites.includes(cityName)) {
        showError(`${cityName} уже в избранном`);
        return;
    }
    
    // Проверяем лимит (максимум 5 городов)
    if (favorites.length >= 5) {
        showError('Можно добавить не более 5 городов в избранное');
        return;
    }
    
    // Добавляем город
    favorites.push(cityName);
    saveFavorites();
    showError(`✅ ${cityName} добавлен в избранное`);
}

/**
 * Удаляет город из избранного
 * @param {string} city - Название города
 */
function removeFromFavorites(city) {
    favorites = favorites.filter(c => c !== city);
    saveFavorites();
}

/**
 * Отображает список избранных городов в интерфейсе
 */
function renderFavorites() {
    const container = document.getElementById('favorites-list');
    container.innerHTML = '';
    
    favorites.forEach(city => {
        const favItem = document.createElement('div');
        favItem.className = 'favorite-item';
        
        const citySpan = document.createElement('span');
        citySpan.textContent = city;
        citySpan.style.cursor = 'pointer';
        // При клике на город - показываем погоду
        citySpan.onclick = () => getWeather(city);
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '✖';
        removeBtn.className = 'remove-fav';
        removeBtn.onclick = (e) => {
            e.stopPropagation(); // Предотвращаем срабатывание клика на городе
            removeFromFavorites(city);
        };
        
        favItem.appendChild(citySpan);
        favItem.appendChild(removeBtn);
        container.appendChild(favItem);
    });
}

// ==================== ИНИЦИАЛИЗАЦИЯ И ОБРАБОТЧИКИ ====================

/**
 * Настраивает все обработчики событий
 */
function setupEventListeners() {
    // Поиск города по кнопке
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
            cityInput.value = ''; // Очищаем поле ввода
        } else {
            showError('Введите название города');
        }
    });
    
    // Поиск по нажатию Enter в поле ввода
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
    
    // Кнопка геолокации
    const locationBtn = document.getElementById('location-btn');
    locationBtn.addEventListener('click', getLocation);
    
    // Кнопка добавления в избранное
    const addFavoriteBtn = document.getElementById('add-favorite');
    addFavoriteBtn.addEventListener('click', addToFavorites);
    
    // Переключатели единиц измерения
    const unitC = document.getElementById('unit-c');
    const unitF = document.getElementById('unit-f');
    
    unitC.addEventListener('click', () => {
        if (currentUnit !== 'metric') {
            currentUnit = 'metric';
            updateUnitButtons();
            // Обновляем отображение без нового запроса
            if (currentWeatherData) {
                updateTemperatureDisplay();
                // Обновляем скорость ветра
                const windSpeed = currentWeatherData.wind.speed;
                document.getElementById('wind').textContent = `${windSpeed.toFixed(1)} м/с`;
                // Обновляем прогноз
                if (currentForecastData) {
                    displayForecast(currentForecastData);
                }
            }
        }
    });
    
    unitF.addEventListener('click', () => {
        if (currentUnit !== 'imperial') {
            currentUnit = 'imperial';
            updateUnitButtons();
            if (currentWeatherData) {
                updateTemperatureDisplay();
                // Конвертируем скорость ветра (1 м/с = 2.23694 миль/ч)
                const windSpeedMph = currentWeatherData.wind.speed * 2.23694;
                document.getElementById('wind').textContent = `${windSpeedMph.toFixed(1)} миль/ч`;
                // Обновляем прогноз
                if (currentForecastData) {
                    displayForecast(currentForecastData);
                }
            }
        }
    });
}

/**
 * Загружает погоду для города по умолчанию при старте
 */
function initDefaultCity() {
    // Пробуем загрузить последний просмотренный город из localStorage
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        getWeather(lastCity);
    } else {
        // Или показываем Москву по умолчанию
        getWeather('Moscow');
    }
}

/**
 * Сохраняет последний просмотренный город
 */
function saveLastCity() {
    if (currentWeatherData) {
        localStorage.setItem('lastCity', currentWeatherData.name);
    }
}

// Сохраняем последний город перед закрытием страницы
window.addEventListener('beforeunload', saveLastCity);

// ==================== ЗАПУСК ПРИЛОЖЕНИЯ ====================
// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();          // Загружаем избранные города
    setupEventListeners();    // Настраиваем обработчики событий
    initDefaultCity();        // Загружаем погоду для города по умолчанию
});