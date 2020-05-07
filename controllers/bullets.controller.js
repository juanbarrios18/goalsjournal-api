const Bullet = require('../lib/bullets')
const newBullet = new Bullet()

// GET DATA
module.exports.getAll = (req, res, next) => {
  newBullet.getAll(req.user.id)
    .then(bullets => {
      res.status(200).json(bullets)
    })
    .catch(e => next(e))
}

module.exports.getMonth = (req, res, next) => {
  const month = Number(req.params.month)
  newBullet.getMonth(month)
    .then(bullets => {
      res.status(200).json(bullets)
    })
    .catch(e => next(e))
}

module.exports.getWeek = (req, res, next) => {
  const week = Number(req.params.week)

  newBullet.getWeek(week)
    .then(bullets => {
      res.status(200).json(bullets)
    })
    .catch(e => next(e))
}

module.exports.getDay = (req, res, next) => {
  const month = Number(req.params.month)
  const day = Number(req.params.day)

  newBullet.getWeek(month, day)
    .then(bullets => {
      res.status(200).json(bullets)
    })
    .catch(e => next(e))
}

// CREATE
module.exports.new = (req, res, next) => {
  const selectOptions = ['task', 'note', 'event'].map(option => {
    return {
      value: option
    }
  })
  res.status(200).json(selectOptions)
}

module.exports.doNew = (req, res, next) => {
  newBullet.create(req.body, req.user)
    .then(bullet => res.status(201).json(bullet))
    .catch(e => next(e))
}

// EDIT
module.exports.edit = (req, res, next) => {
  newBullet.edit(req.params.id)
    .then(values => {
      const bullet = values.bullet
      const selectOptions = values.selectOptions
      const statusOptions = values.statusOptions
      res.status(200).json({ bullet, selectOptions, statusOptions })
    })
    .catch(e => next(e))
}

module.exports.doEdit = (req, res, next) => {
  newBullet.update(req.params.id, req.body)
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
