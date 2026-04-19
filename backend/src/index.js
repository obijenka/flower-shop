const express = require('express')
const cors = require('cors')
require('dotenv').config()
const pool = require('./db')
const authRoutes = require('./routes/authRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)

// Проверка подключения к БД
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({ 
      message: 'Сервер работает!', 
      db: 'connected',
      time: result.rows[0].now
    })
  } catch (err) {
    res.status(500).json({ 
      message: 'Ошибка подключения к БД', 
      error: err.message 
    })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Бэкенд запущен на порту ${PORT}`)
})