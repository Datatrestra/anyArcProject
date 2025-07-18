const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
    const formData = req.body;

    fs.readFile('data.json', 'utf8', (err, data) => {
        let json = [];
        if (!err && data) json = JSON.parse(data);
        json.push(formData);

        fs.writeFile('data.json', JSON.stringify(json, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving data');
            res.status(200).send('Form submitted successfully!');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
