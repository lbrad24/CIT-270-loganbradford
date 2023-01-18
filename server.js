const express = require ("express");

const app = express();

const port = 3000;

const bodyParser = require ("body-parser");

app.use(bodyParser.json()); //This looks for incoming data using body-parser

app.get("/", (req, res) => {
    res.send("Hello Logan");
});

app.post('/login', (req, res) => {
    const loginUser = req.body.userName;
    console.log('Login username:'+loginUser);
    res.send('Hello '+loginUser);
});

app.listen(port, () => {
    console.log("listening");
});