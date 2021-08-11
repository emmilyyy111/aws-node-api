const express = require ('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(
    process.env.DB_CONNECTION,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
)
.then(() => {
    app.listen('5000', () => {
        console.log('listening on port 5000')
    })
})
.catch(error => console.log(error))

const UserSchema = mongoose.Schema({
      fname: { type: String, required: true },
      lname: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
    },
    { timestamps: true }
  )
  const UsersModel = mongoose.model('Users', UserSchema)

  app.get('/users', (req, res) => {
    UsersModel.find()
      .then(allUsers => res.status(200).send(allUsers))
      .then(() => console.log('all users sent'))
      .catch(err => console.log(err))
  })
  
  app.post('/users', (req, res) => {
    console.log('this is req body', req.body)
    new UsersModel(req.body)
      .save()
      .then(() => res.status(200).send('User has been created'))
      .catch(err => console.log(err))
  })
  
  app.post('/login', (req, res) => {
    UsersModel.findOne({ email: req.body.email })
      .then(userFound => res.status(200).send(userFound))
      .catch(err => console.log(err))
})