const express = require ("express");

const app = express();

const port = 3000;

const bodyParser = require ("body-parser");

const {v4: uuidv4} = require('uuid'); //universally unique identifier

const Redis = require('redis'); // the libary 

const redisClient = Redis.createClient({url:"redis://127.0.0.1:6379"}); //this points to redis

app.use(express.static('public'));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(bodyParser.json()); //This looks for incoming data using body-parser

app.use(express.static('public'));

app.get("/validate", async (req, res) => {
    const loginToken = req.cookies.stedicookie;
    console.log("loginToken", loginToken);
    const loginUser = await redisClient.hGet("TokenMap",loginToken);
    res.send(loginUser);
});

app.post('/rapidsteptest', async (req,res)=>{
    const steps =req.body;
    await redisClient.zAdd("Steps", steps, 0);
    console.log("Steps", steps);
    res.send('saved');
})

app.post('/login',async (req, res) => {
    const loginUser = req.body.userName;
    const loginPassword = req.body.password; //Access the password data in the body
    console.log('Login username:'+loginUser);
    const correctPassword = await redisClient.hGet('UserMap', loginUser);
    if (correctPassword == loginPassword){
        const loginToken = uuidv4();
        await redisClient.hSet('TokenMap',loginToken,loginUser);
        res.cookie('stedicookie', loginToken);
        res.send(loginToken);
    } else {
        res.status(401);//unauthorized
        res.send('Incorrect password for ' + loginUser);
    }
    
});

app.listen(port, () => {
    redisClient.connect(); 
    console.log("listening");
});