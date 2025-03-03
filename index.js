const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

// ВАШ Telegram Bot Token:
const BOT_TOKEN = "7856336539:AAFYULTPflxCljl2aStdw4r8a_ZBLUxwXrk";

// Раздаём статические файлы (html, css, js) из папки public
app.use(express.static(path.join(__dirname, "public")));

// Простейший роут getUserProfilePhotos
app.get("/getUserProfilePhotos", async (req, res) => {
  try {
    const userId = req.query.user_id;      // Читаем user_id из запроса ?user_id=...
    if (!userId) {
      return res.status(400).json({ error: "No user_id in query" });
    }
    // Запрашиваем у Telegram фото пользователя:
    const tgUrl = `https://api.telegram.org/bot${BOT_TOKEN}/getUserProfilePhotos`;
    const response = await axios.get(tgUrl, {
      params: {
        user_id: userId,
        limit: 1
      }
    });
    // Ответ от API Telegram возвращаем клиенту
    res.json(response.data);
  } catch (error) {
    console.error("Ошибка при запросе к Telegram:", error.message);
    res.status(500).json({ error: "Ошибка сервера или Bot API." });
  }
});

// Запускаем сервер
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
