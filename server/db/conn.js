const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(() => {
    console.log('connected to database');
}).catch(err => {
    console.log('Error' + err);
});