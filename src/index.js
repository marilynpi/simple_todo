const express = require('express');
const morgan = require('morgan'); // shows http methods in console
const cors = require('cors'); // needed to enable cors

const routes = require('./routes/tasks.routes');

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); //needed to express read json objects
app.use(routes);

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

app.listen(port);

console.log('Server on port ' + port );