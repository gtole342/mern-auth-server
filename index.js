const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '10mb' }))

app.get('*',(req,res)=>{
  res.status(404).send({ message: 'Not Found' })
})

app.listen(process.env.PORT || 3000)