const GoalModel = require('../models/goal')

class Goal {
  getAll (userId) {
    return new Promise((resolve, reject) => {
      GoalModel.find({
        userId: userId
      }).sort({ deadline: 'asc' })
        .then(bullets => {
          resolve(bullets)
        })
        .catch(err => reject(err))
    })
  }

  getOne (id) {
    return new Promise((resolve, reject) => {
      GoalModel.findById({ _id: id })
        .then(goal => {
          resolve(goal)
        })
        .catch(err => reject(err))
    })
  }

  getActive (userId) {
    return new Promise((resolve, reject) => {
      GoalModel.find({
        userId: userId,
        'status.selected': 'active'
      }).sort({ deadline: 'asc' })
        .then(goals => {
          resolve(goals)
        })
        .catch(err => reject(err))
    })
  }

  getCompleted (userId) {
    return new Promise((resolve, reject) => {
      GoalModel.find({
        userId: userId,
        'status.selected': 'completed'
      }).sort({ deadline: 'asc' })
        .then(goals => {
          resolve(goals)
        })
        .catch(err => reject(err))
    })
  }

  getCancelled (userId) {
    return new Promise((resolve, reject) => {
      GoalModel.find({
        userId: userId,
        'status.selected': 'cancelled'
      }).sort({ deadline: 'asc' })
        .then(goals => {
          resolve(goals)
        })
        .catch(err => reject(err))
    })
  }

  create (data) {
    return new Promise((resolve, reject) => {
      const newGoal = new GoalModel({
        name: data.name,
        description: data.description,
        deadline: data.deadline,
        userId: data.userId,
        creationDate: data.creationDate,
        status: {
          selected: 'active'
        }
      })
      newGoal.save()
        .then(goal => resolve(goal))
        .catch(err => reject(err))
    })
  }

  edit (id) {
    return new Promise((resolve, reject) => {
      GoalModel.findById({ _id: id })
        .then(data => {
          const goal = ({
            id: data._id.toString(),
            name: data.name,
            status: data.status,
            description: data.description,
            deadline: data.deadline.toISOString().split('T')[0]
          })
          resolve(goal)
        })
        .catch(err => reject(err))
    })
  }

  update (id, { data }) {
    return new Promise((resolve, reject) => {
      GoalModel.findByIdAndUpdate(id, {
        name: data.name,
        description: data.description,
        deadline: data.deadline,
        userId: data.userId,
        creationDate: data.creationDate,
        status: {
          selected: data.status.selected
        }
      })
        .then(goal => resolve(`Object ${id} updated`))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      GoalModel.findByIdAndDelete({ _id: id })
        .then(goal => resolve(`Object ${id} deleted`))
        .catch(err => reject(err))
    })
  }
}

module.exports = Goal
