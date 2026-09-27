const express = require('express')
const cors = require('cors')
const pool = require('./db/database')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Recipes API is running'
  })
})

app.get('/api/v1/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')

    res.json({
      message: 'Congratulations! Database connected',
      time: result.rows[0].now
    })
  } catch (error) {
    console.error('Database test failed:', error)

    res.status(500).json({
      error: 'Database connection failed',
      details: error.message
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})