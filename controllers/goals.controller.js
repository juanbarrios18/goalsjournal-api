const Goal = require('../lib/goals')
const newGoal = new Goal()

// GET DATA
module.exports.getAll = (req, res, next) => {
  newGoal.getAll(req.params.userid)
    .then(goals => {
      res.status(200).json(goals)
    })
    .catch(e => next(e))
}

module.exports.getOne = (req, res, next) => {
  newGoal.getOne(req.params.id)
    .then(goal => {
      res.status(200).json(goal)
    })
    .catch(e => next(e))
}

module.exports.getActive = (req, res, next) => {
  newGoal.getActive(req.params.id)
    .then(goals => {
      res.status(200).json(goals)
    })
    .catch(e => next(e))
}

module.exports.getCompleted = (req, res, next) => {
  newGoal.getCompleted(req.params.id)
    .then(goals => {
      res.status(200).json(goals)
    })
    .catch(e => next(e))
}

module.exports.getCancelled = (req, res, next) => {
  newGoal.getCancelled(req.params.id)
    .then(goals => {
      res.status(200).json(goals)
    })
    .catch(e => next(e))
}

// CREATE
module.exports.doNew = (req, res, next) => {
  newGoal.create(req.body.data)
    .then(goal => res.status(201).json(goal))
    .catch(e => next(e))
}

// EDIT
module.exports.edit = (req, res, next) => {
  newGoal.edit(req.params.id)
    .then(goal => {
      res.status(200).json(goal)
    })
    .catch(e => next(e))
}

module.exports.doEdit = (req, res, next) => {
  const id = req.params.id
  const data = req.body
  console.log(data)
  newGoal.update(id, data)
    .then(goal => res.status(201).json(goal))
    .catch(e => next(e))
}

// DELETE
module.exports.delete = (req, res, next) => {
  newGoal.delete(req.params.id)
    .then(goal => res.status(201).json(goal))
    .catch(e => next(e))
}
