import express from 'express'
import compression from 'compression'
import index from './routes/index'
import path from 'path'

// Server var
const app = express()

// View engine setup
app.set('views', path.join(__dirname, 'static', 'views'))
app.set('view engine', 'ejs')

// Middleware
app.use(compression())
app.use('/public', express.static(path.join(__dirname, 'static', 'public')))

// Routes
app.use('/', index)

const port = process.env.PORT || 3000

app.listen(port, function listenHandler () {
  console.info(`Running on ${port}`)
})
