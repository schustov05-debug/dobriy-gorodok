// index.js (в корне проекта)
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
// Разрешаем фронтенду делать запросы к нашему бэкенду
app.use(cors({
  origin: 'http://localhost:5173', // Указываем точный адрес твоего фронтенда
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true // Важно, если используются токены/куки
}));
app.use(cors());
app.use(express.json());

// Существующие роуты
const feedbackRouter = require('./routes/feedback'); 
app.use(feedbackRouter);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));

// 👇 НОВЫЕ РОУТЫ: ПОДКЛЮЧАЕМ СИСТЕМУ ПИТОМЦЕВ И ЗАЯВОК
app.use('/api/pets', require('./routes/pets'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/applications', require('./routes/applications'));
const articlesRouter = require('./routes/articles');
app.use('/api/articles', articlesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер приюта «Добрый городок» запущен на порту ${PORT}`);
});
