let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')

let userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: String,
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    validate: {
      validator: (input) =>{
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input)
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 32
  },
  profileUrl: String
})

userSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, 12)
  next()
})

userSchema.set('toJSON', {
  transform: (doc, user) => {
    delete user.password
    return user
  }
})

userSchema.methods.isAuthenticated = function(typedPassword) {
  return bcrypt.compareSync(typedPassword, this.password)
}


module.exports = mongoose.model('User', userSchema)