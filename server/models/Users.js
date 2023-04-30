const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  email: { type: String },
  randori: {
    time: {
      minutes: { type: Number, default: 2 },
      seconds: { type: Number, default: 0 },
    },
    rounds: { type: Number, default: 6 },
    rest: {
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 30 },
    },
    warning: {
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 15 },
    },
    prepare: {
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 10 },
    },
  },
  uchikomi: {
    time: {
      minutes: { type: Number, default: 3 },
      seconds: { type: Number, default: 0 },
    },
    rest: {
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 30 },
    },
    warning: {
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 15 },
    },
    prepare: {
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 10 },
    },
  },
  threePerson: {
    time: {
      minutes: { type: Number, default: 3 },
      seconds: { type: Number, default: 0 },
    },
    rounds: { type: Number, default: 5 },
    rest: {
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 30 },
    },
    warning: {
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 15 },
    },
    prepare: {
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 10 },
    },
  },
  waterBreak: {
    time: {
      minutes: { type: Number, default: 3 },
      seconds: { type: Number, default: 0 },
    },
    rest: {
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 30 },
    },
    warning: {
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 15 },
    },
    prepare: {
      minutes: { type: Number, default: 0 },
      seconds: { type: Number, default: 10 },
    },
  },
});

module.exports = mongoose.model('User', UsersSchema);
