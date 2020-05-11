const BulletModel = require('../models/bullet')
const moment = require('moment')

const groupBy = (data, key, format) => {
  return data.reduce((Acc, obj) => {
    const grouper = moment(obj[key]).format(format)
    Acc[grouper] = (Acc[grouper] || []).concat(obj)
    return Acc
  }, {})
}

const groupBy2 = (data, key, format) => {
  return data.reduce((Acc, obj) => {
    const grouper = moment(obj[key]).format(format)
    Acc[grouper] = (Acc[grouper] || []).concat(obj)
    return Acc
  }, {})
}

class Bullet {
  getAll (userId) {
    return new Promise((resolve, reject) => {
      BulletModel.find({ userId: userId })
        .then(bullets => {
          resolve(bullets)
        })
        .catch(err => reject(err))
    })
  }

  getOne (userId, id) {
    return new Promise((resolve, reject) => {
      BulletModel.find({ userId: userId, _id: id })
        .then(bullet => resolve(bullet))
        .catch(err => reject(err))
    })
  }

  getMonth (userId, month) {
    return new Promise((resolve, reject) => {
      const currentYear = moment().year()
      const start = moment(`${month}-${currentYear}`, 'M-YYYY')
      const end = moment(start).endOf('month')
      BulletModel.find({
        userId: userId,
        date: { $gte: start, $lte: end }
      }).sort({ date: 'asc', priority: 'asc' })
        .then(bullets => {
          const groupWeeks = { week: groupBy(bullets, 'date', 'YYYY-W') }
          for (const keys in groupWeeks.week) {
            groupWeeks.week[keys] = { day: groupBy(groupWeeks.week[keys], 'date', 'YYYY-M-D') }
          }
          resolve(groupWeeks)
        })
        .catch(err => reject(err))
    })
  }

  getWeek (userId, week) {
    const currentYear = moment().year()
    const start = moment(`${week}-${currentYear}`, 'W-YYYY')
    const end = moment(start).endOf('week')
    return new Promise((resolve, reject) => {
      BulletModel.find({
        userId: userId,
        date: { $gte: start, $lte: end }
      }).sort({ date: 'asc', priority: 'asc' })
        .then(bullets => {
          const groupDays = groupBy(bullets, 'date', 'YYYY-MM-DD')
          resolve(groupDays)
        })
        .catch(e => reject(e))
    })
  }

  getDay (userId, month, day) {
    const currentYear = moment().year()
    const start = moment(`${currentYear}-${month}-${day}`, 'YYYY-MM-DD')
    const end = moment(start).endOf('day')
    return new Promise((resolve, reject) => {
      BulletModel.find({
        userId: userId,
        date: { $gte: start, $lte: end }
      }).sort({ priority: 'asc' })
        .then(bullets => {
          const grouped = { days: groupBy2(bullets, 'date', 'YYYY-MM-DD') }
          resolve(grouped)
        })
        .catch(e => reject(e))
    })
  }

  create (data, user) {
    return new Promise((resolve, reject) => {
      const newBullet = new BulletModel({
        name: data.name,
        priority: {
          selected: data.priority
        },
        type: {
          selected: data.type
        },
        status: {
          selected: 'active'
        },
        date: data.date,
        userId: user._id
      })
      newBullet.save()
        .then(bullet => resolve(bullet))
        .catch(err => reject(err))
    })
  }

  edit (id) {
    return new Promise((resolve, reject) => {
      BulletModel.findById({ _id: id })
        .then(data => {
          const bullet = ({
            id: data.id.toString(),
            date: data.date.toISOString().split('T')[0],
            type: data.type,
            name: data.name,
            status: data.status
          })
          resolve({ bullet })
        })
        .catch(err => reject(err))
    })
  }

  update (id, data) {
    return new Promise((resolve, reject) => {
      BulletModel.findByIdAndUpdate(id, {
        name: data.name,
        priority: {
          selected: data.priority
        },
        type: {
          selected: data.type
        },
        status: {
          selected: data.status
        },
        date: new Date(data.date)
      })
        .then(bullet => resolve(`Object ${id} updated`))
        .catch(err => reject(err))
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      BulletModel.findByIdAndDelete({ _id: id })
        .then(bullet => resolve(`Object ${id} deleted`))
        .catch(err => reject(err))
    })
  }
}

module.exports = Bullet
