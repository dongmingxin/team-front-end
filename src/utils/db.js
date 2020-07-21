const mongoose = require('mongoose');

exports.connectToDB = () => {
    return mongoose.connect('mongodb://localhost/ming-pseronal-project', {useNewUrlParser: true, useUnifiedTopology:true});
}