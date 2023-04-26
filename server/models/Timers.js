const mongoose = require('mongoose');

// const TimersSchema = new mongoose.Schema([
//   { email: { type: String } },
//   {
//     mode: { type: String, default: 'randori' },
//     time: {
//       minutes: { type: Number, default: 2 },
//       seconds: { type: Number, default: 0 },
//     },
//     rounds: { type: Number, default: 6 },
//     warning: {
//       minutes: { type: Number, default: 0 },
//       seconds: { type: Number, default: 15 },
//     },
//     rest: {
//       minutes: { type: Number, default: 0 },
//       seconds: { type: Number, default: 30 },
//     },
//     prepare: {
//       minutes: { type: Number, default: 0 },
//       seconds: { type: Number, default: 10 },
//     },
//   },
//   {
//     mode: { type: String, default: 'uchikomi' },
//     time: {
//       minutes: { type: Number, default: 3 },
//       seconds: { type: Number, default: 0 },
//     },
//     warning: {
//       minutes: { type: Number, default: 0 },
//       seconds: { type: Number, default: 15 },
//     },
//     prepare: {
//       minutes: { type: Number, default: 0 },
//       seconds: { type: Number, default: 10 },
//     },
//   },
//   {
//     mode: { type: String, default: '3Person' },
//     time: {
//       minutes: { type: Number, default: 1 },
//       seconds: { type: Number, default: 0 },
//     },
//     warning: {
//       minutes: { type: Number, default: 0 },
//       seconds: { type: Number, default: 15 },
//     },
//     rest: {
//       minutes: { type: Number, default: 0 },
//       seconds: { type: Number, default: 30 },
//     },
//     prepare: {
//       minutes: { type: Number, default: 0 },
//       seconds: { type: Number, default: 10 },
//     },
//   },
//   {
//     mode: { type: String, default: 'waterBreak' },
//     time: {
//       minutes: { type: Number, default: 3 },
//       seconds: { type: Number, default: 0 },
//     },
//     warning: {
//       minutes: { type: Number, default: 0 },
//       seconds: { type: Number, default: 15 },
//     },
//     prepare: {
//       minutes: { type: Number, default: 0 },
//       seconds: { type: Number, default: 10 },
//     },
//   },
// ]);

const TimersSchema = new mongoose.Schema({
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

module.exports = mongoose.model('User', TimersSchema);
