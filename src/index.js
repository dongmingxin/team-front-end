require('express-async-errors');
const express = require('express');
const routes = require('./routes');
const { connectToDB } = require('./utils/db');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);
app.use(helmet());
app.use(morgan("common"))

const PORT = process.env.PORT || 3900;




connectToDB().then(()=>{
    app.listen(PORT, ()=> {
        console.log(`server listen on port: ${PORT}`)
    })
})

