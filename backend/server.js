const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 4444
const { errorHandler } = require('./middleware/errorMiddleware')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/faq', require('./routes/faqRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use(errorHandler)
app.listen(port, () => 
    console.log(`Server started starting on port : ${port}`)
)
