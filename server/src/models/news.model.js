const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    publishedAt: {
      type: Date,
      required: true,
    },
    sourceId: {
      type: String,
      required: true,
    },
    articles: [
      {
        publishedAt: {
          type: Date,
          required: true,
        },
        sourceName: { type: String, required: true },
        wordsCount: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
        title: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const NewsDB = mongoose.model('News', newsSchema);

module.exports = NewsDB;
