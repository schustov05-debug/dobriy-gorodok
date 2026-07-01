const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Загружаем переменные окружения в самом начале

const app = express();

// Разрешаем фронтенду делать запросы к нашему бэкенду (ТОЛЬКО ОДИН ВЫЗОВ)
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true 
}));

app.use(express.json());

// Существующие роуты
const feedbackRouter = require('./routes/feedback'); 
app.use(feedbackRouter);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));

// НОВЫЕ РОУТЫ: ПОДКЛЮЧАЕМ СИСТЕМУ ПИТОМЦЕВ И ЗАЯВОК
app.use('/api/pets', require('./routes/pets'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/applications', require('./routes/applications'));
const articlesRouter = require('./routes/articles');
app.use('/api/articles', articlesRouter);

// Если порт не передан в .env, используем 5001 вместо 3000/5000
const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => {
  console.log(`Сервер приюта «Добрый городок» запущен на порту ${PORT}`);
});