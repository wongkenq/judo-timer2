const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  email: { type: String },
  randori: {
    time: {
      minutes: { type: Number, default: 2 },
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
      seconds: { type: Number, default: 15 },
    },
    rounds: { type: Number, default: 6 },
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
      seconds: { type: Number, default: 15 },
    },
    rounds: { type: Number, default: 1 },
  },
  threePerson: {
    time: {
      minutes: { type: Number, default: 1 },
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
      seconds: { type: Number, default: 15 },
    },
    rounds: { type: Number, default: 6 },
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
      seconds: { type: Number, default: 15 },
    },
    rounds: { type: Number, default: 1 },
  },
});

module.exports = mongoose.model('User', UsersSchema);
