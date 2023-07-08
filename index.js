require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const { off } = require('./models/Person')
const personRoutes = require('./routes/personRoutes')
const jobsRoutes = require('./routes/jobsRoutes')
const registerRoutes = require('./routes/userRoutes')
const userCVRoutes = require('./routes/userCVRoutes')
const userSendNewPasword = require('./routes/sendNewPasswordRoutes')


const app = express()
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use('/person', personRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Lucas Node API - Seek Jobs' })
})

app.use('/jobs', jobsRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Seek Jobs API' })
})

app.use('/auth', registerRoutes)

app.use("/usercv", userCVRoutes)

app.use('/send-new-password', userSendNewPasword)


const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
mongoose.connect(`mongodb+srv://SeekJobs:${PASSWORD}@cluster0.butjmpf.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Conexão Efetuada com Sucesso!')
    app.listen(4000)
  })
  .catch((err) => console.log(err))
