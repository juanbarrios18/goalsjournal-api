const mongoose = require('mongoose')

const bulletSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  priority: {
    selected: String,
    options: {
      type: [String],
      default: ['primary', 'secondary', 'others']
    }
  },
  type: {
    selected: String,
    options: {
      type: [String],
      default: ['task', 'event', 'note']
    }
  },
  status: {
    selected: String,
    options: {
      type: [String],
      default: ['active', 'completed', 'cancelled']
    }
  },
  date: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Bullet = mongoose.model('Bullet', bulletSchema)

module.exports = Bullet
