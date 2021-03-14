const express = require("express")
const bodyParser = require("body-parser")
const eventRoutes = require("./api/routes/events")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST PATCH, DELETE, GET")
    return res.status(200).json({})
  }
  next()
})

app.use("/events", eventRoutes)

mongoose.connect(
  `mongodb+srv:${process.env.MONGO_ATLAS_PW}//complete2:@node-basic-crud.ptzen.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

app.use((req, res, next) => {
  const error = new Error("Not found")
  error.status = 400
  next(error)
})

app.use((error, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
})

module.exports = app
