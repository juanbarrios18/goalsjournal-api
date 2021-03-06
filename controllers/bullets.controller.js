const moment = require('moment')
const Bullet = require('../lib/bullets')
const newBullet = new Bullet()

// GET DATA
module.exports.getAll = (req, res, next) => {
  newBullet.getAll(req.params.userid)
    .then(bullets => {
      res.status(200).json(bullets)
    })
    .catch(e => next(e))
}

module.exports.getMonth = (req, res, next) => {
  const month = req.params.month
  const userId = req.params.id

  newBullet.getMonth(userId, month)
    .then(bullets => {
      res.status(200).json(bullets)
    })
    .catch(e => next(e))
}

module.exports.getWeek = (req, res, next) => {
  const week = Number(req.params.week)
  const userId = req.params.id

  newBullet.getWeek(userId, week)
    .then(bullets => {
      res.status(200).json(bullets)
    })
    .catch(e => next(e))
}

module.exports.getDay = (req, res, next) => {
  const userId = req.params.id
  const month = Number(req.params.month)
  const day = Number(req.params.day)

  newBullet.getDay(userId, month, day)
    .then(bullets => {
      res.status(200).json(bullets)
    })
    .catch(e => next(e))
}

module.exports.getOne = (req, res, next) => {
  const userId = req.params.userid
  const id = req.params.id

  newBullet.getOne(userId, id)
    .then(bullets => {
      res.status(200).json(bullets)
    })
    .catch(e => next(e))
}

// CREATE
module.exports.new = (req, res, next) => {
  const selectOptions = ['task', 'note', 'event']
  const priorityOptions = ['primary', 'secondary', 'others']
  res.status(200).json({ selectOptions, priorityOptions })
}

module.exports.doNew = (req, res, next) => {
  // console.log('doNew ' + typeof (req.body))
  console.log('doNew ' + JSON.stringify(req.body.data))
  newBullet.create(req.body.data)
    .then(bullet => res.status(201).json(bullet))
    .catch(e => next(e))
}

// EDIT
module.exports.edit = (req, res, next) => {
  newBullet.edit(req.params.id)
    .then(bullet => {
      console.log(bullet)
      res.status(200).json({ bullet })
    })
    .catch(e => next(e))
}

module.exports.doEdit = (req, res, next) => {
  const id = req.params.id
  const data = req.body
  newBullet.update(id, data)
    .then(bullet => res.status(201).json(bullet))
    .catch(e => next(e))
}

// DELETE
module.exports.delete = (req, res, next) => {
  console.log(req.params.id)
  newBullet.delete(req.params.id)
    .then(bullet => res.status(201).json(bullet))
    .catch(e => next(e))
}
