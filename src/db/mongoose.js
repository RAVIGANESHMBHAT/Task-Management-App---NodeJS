const mongoose = require('mongoose')

const connectionURL = process.env.DATABASE_URL;

mongoose.connect(connectionURL, { useNewUrlParser: true})


