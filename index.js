const express = require('express');
const request = require('request');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/ex/:value', (req, res) => {
    const {value} = req.params;
    request(
        { url: `https://test-api.techsee.me/api/ex/${value}` },
        (error, response, body) => {
        if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: error.message });
        }

        if (body == '') {
            res.json([]);
        } else {
            res.json(JSON.parse(body));
        }
        
               
        }
    )
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
