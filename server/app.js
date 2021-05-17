const dotenv    = require('dotenv');
const express   = require('express');
const cors      = require('cors');
const app       = express();
dotenv.config({path: './config.env'});
require('./db/conn');
const { graphqlHTTP } = require('express-graphql');
const schema    = require('./schema/schema');
const port      = process.env.PORT;

//allow cros-origin-requests
app.use(cors());

app.use('/graphql', graphqlHTTP({
        schema: schema, //You can also write only schema because of ES6
        graphiql: true,
    }),
  );

app.get('/', async (req, res) => {
    res.send('Working Fine');
});


app.listen(port, () => {
    console.log('connected to server');
})