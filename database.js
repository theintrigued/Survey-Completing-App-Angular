let mongoose = require('mongoose');
let UserModel = require('./models/user');





const server = 'localhost:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'testDb';      // REPLACE WITH YOUR DB NAME



class User {
    constructor() {}


     createAndSavePerson(name,email)  {
        let msg = new UserModel({
            name:name,
          email:email
        
        })
        
        msg.save()
           .then(doc => {
             console.log(doc)
           })
           .catch(err => {
             console.error(err)
           });
        
        
        }

        findPerson(email) {
            UserModel
            .find({
              email: email   // search query
            })
            .then(doc => {
              console.log(doc)
            })
            .catch(err => {
              console.error(err)
            })

        }

        updatePerson(oldEmail,newEmail){
            UserModel
            .findOneAndUpdate(
              {
                email: oldEmail // search query
              }, 
              {
                email: newEmail   // field:values to update
              },
              {
                new: true,                       // return updated doc
                runValidators: true              // validate before update
              })
            .then(doc => {
              console.log(doc)
            })
            .catch(err => {
              console.error(err)
            })
        }




}

usee = new User();


class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`mongodb://${server}/${database}`)
       .then(() => {



         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new Database()
//usee.createAndSavePerson('AHEMD','IDK@MGAI>COM');
usee.findPerson();
usee.updatePerson('AWTFF@GMAIL>COM', 'ictali1423@gmail.com');



