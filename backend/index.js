const keys = require('./keys');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const redis = require('redis');
const redisClient = redis.createClient = ({
    host: keys.redisHost,
    port: keys.redisPort,
});


const {Pool} = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,    
});

pgClient.on('error',() =>
    console.log('error postgresql')
);

// console.log('its key', keys,'\n');

app.get('/',(req, resp) => {
    console.log('main site');
 resp.send('hello  here main site')
});

app.get('/:param1/:param2', async(req, resp) => {
  
    const param1 = req.params.param1;
    const param2 = req.params.param2;
    const redisKey = `${param1}:${param2}`;
   
    redisClient.get(redisKey, (err, redisVal) => {
        if(redisVal == null) redisVal = rectangle(param1, param2);

        resp.send(`rectangle: ${redisVal}`)
        redisClient.set(redisKey, parseInt(redisVal));

        // pgClient.query('INSERT INTO results(number) VALUES' + redisVal).catch(err =>
        //     console.log(err));
    });   
});

app.listen(3000,err => {
    console.log('Server is working on port 3000')
});




// pgClient.query('CREATE TABLE IF NOT EXISTS results(number INT UNIQUE)').catch(err =>
//     console.log(err));


function rectangle(n, g){
    return n*g;
}











