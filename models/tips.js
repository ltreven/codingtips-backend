const mongoose = require('mongoose');

const schema = new mongoose.Schema({    
  title: {
      type: String,
      required: true
  },
  summary: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  sintaxe: String,
  description: { // in markdown format
      type: String,
      required: true
  },
  categories: [String], // ex.: global objects
  examples: [String], // in markdown format
  seeAlso: [String], // ids
  score: {
      type: Number,
      min: [0, 'Score accepts values between 0 and 10'],
      max: [10, 'Score accepts values between 0 and 10']
    }
}, {
        timestamps: true
    }
);

schema.index({ title: 1, type: 1 });
schema.index({ categories: 1, type: 1 });

module.exports = mongoose.model('Tip', schema);
