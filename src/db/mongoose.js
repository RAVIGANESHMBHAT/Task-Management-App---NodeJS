const mongoose = require('mongoose')

require('dotenv').config();

const databaseName = "task-manager-api"
const password = process.env.DB_PASSWORD
const connectionURL = `mongodb+srv://raviganeshm:${password}@cluster0.fvf2b.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

mongoose.connect(connectionURL, { useNewUrlParser: true})


