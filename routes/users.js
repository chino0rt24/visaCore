var express = require('express');
var router = express.Router();
const ChatController = require('../src/controllers/Chat')
const axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/chat', async(req, res) => {
  console.log("apasjdoiajwdoi");
  const { userInput } = req.body;
    try {
      // Realiza la solicitud al API de OpenAI
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: userInput,
        max_tokens: 50, // Configura la cantidad de tokens en la respuesta
        temperature: 0.7, // Controla la creatividad de la respuesta (0.0 - 1.0)
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ process.env.OPENAI_KEY, // Reemplaza con tu API key de OpenAI
        },
      });
  console.log(response);
      // Obtiene la respuesta de OpenAI
      const { choices } = response.data;
      const aiResponse = choices[0].text.trim();
  
      // Envía la respuesta al cliente
      res.json({ response: aiResponse });
    } catch (error) {
      console.error('Error al realizar la solicitud a OpenAI:', error);
      res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
    }
});

module.exports = router;
