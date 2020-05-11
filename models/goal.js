const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    selected: {
      type: String,
      default: 'active'
    },
    options: {
      type: [String],
      default: ['active', 'completed', 'cancelled']
    }
  },
  description: String,
  deadline: Date,
  creationDate: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal
