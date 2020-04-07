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
  syntax: String,
  description: { // in markdown format
      type: String,
      required: true
  },
  categories: [String], // ex.: global objects
  examples: [String], // in markdown format
  seeAlso: [String], // ids
}, {
        timestamps: true
    }
);

schema.index({ title: 1, type: 1 });
schema.index({ categories: 1, type: 1 });

module.exports = mongoose.model('Tip', schema);
