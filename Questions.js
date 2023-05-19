const mongoose = require('mongoose');

// Definir el esquema del modelo
const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  }
});

// Crear el modelo basado en el esquema
const Question = mongoose.model('Question', QuestionSchema);

// Exportar el modelo
module.exports = Question;
