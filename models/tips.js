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
  mdFile: {
    type: String,
    required: true
  },
  categories: [String], // ex.: global objects
  seeAlso: [String], // ids
  tags: [String], // ids
}, {
        timestamps: true
    }
);


schema.index({ title: 1, type: 1 });
schema.index({ categories: 1, type: 1 });

module.exports = mongoose.model('Tip', schema);
