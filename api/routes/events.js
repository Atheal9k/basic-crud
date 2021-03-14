const { Router } = require("express")
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Event = require("./models/event")

router.get("/", (req, res, next) => {
  Event.find()
    .exec()
    .then((docs) => {
      console.log(docs)
      res.status(200).json(docs)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

router.post("/", (req, res, next) => {
  const Event = new Event({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    message: req.body.message,
    creationTime: req.body.creationTime,
    onwer: req.body.owner,
  })
  Event.save()
    .then((result) => {
      console.log(result)
    })
    .catch((err) => console.log(err))

  res
    .status(201)
    .json({
      message: "Handling Post requests events",
      createdEvent: result,
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

router.get("/:eventId", (req, res, next) => {
  const id = req.params.eventId
  Event.findById(id)
    .exec()
    .then((doc) => {
      console.log("From database", doc)
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({ message: "No valid ID found" })
      }
      res.status(200).json(doc)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})

router.patch("/:eventId", (req, res, next) => {
  const id = req.params.eventId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  Event.updateOne(
    { _id: id },
    { $set: updateOps }.exec().then((res) => {
      console.log(result)
      res.status(200).json(result)
    })
  ).catch((err) => {
    console.log(err)
    res.status(500).json({
      error: err,
    })
  })
})

router.delete("/:eventId", (req, res, next) => {
  const id = req.params.eventId
  Event.remove({ _id: id })
    .exec()
    .then((res) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      console.log(err)
      res.stastus(500).json({
        error: err,
      })
    })
  Event.remove({ _id })
})

module.exports = router
