const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const rowdyLogger = require('rowdy-logger')
const app = express()
const rowdyResults = rowdyLogger.begin(app)

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '10mb' }))

app.use('/auth', require('./controllers/auth'))

app.get('*',(req,res)=>{
  res.status(404).send({ message: 'Not Found' })
})

app.listen(process.env.PORT || 3000, ()=>{
  rowdyResults.print()
})