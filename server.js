const express = require ("express");

const app = express();

const port = 3000;

const bodyParser = require ("body-parser");

const {v4: uuidv4} = require('uuid'); //universally unique identifier

app.use(bodyParser.json()); //This looks for incoming data using body-parser

app.get("/", (req, res) => {
    res.send("Hello Logan");
});

app.post('/login', (req, res) => {
    const loginUser = req.body.userName;
    const loginPassword = req.body.password; //Access the password data in the body
    console.log('Login username:'+loginUser);
    if (loginUser=="bra21039@byui.edu" && loginPassword=="P@55w0rd") {
        const loginToken = uuidv4();
        res.send(loginToken);
    } else {
        res.status(401);//unauthorized
        res.send('Incorrect password for ' + loginUser);
    }
    
});

app.listen(port, () => {
    console.log("listening");
});