let mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");
const app = express();
let UserModel = require('./models/user');

const server = 'localhost:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'testDb';      // REPLACE WITH YOUR DB NAME


var corsOptions = {
    origin: "http://localhost:8081"
  };
  app.use(cors(corsOptions));
  // parse requests of content-type - application/json
  app.use(express.json());
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  // simple route
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to EarnBux. Go back to where you came from or suffer the consequences." });
  });
  app.get("/:username", (req, res) => {
    this.findOne(req,res);
  });
  app.put("/:username", (req, res) => {
    this.update(req,res);
  });
  app.delete("/:username", (req, res) => {
    this.delete(req,res);
  });
  app.post("/add", (req, res) => {
    this.create(req,res);
  });
  // set port, listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });



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

exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
      res.status(400).send({ message: "Username can not be empty!" });
      return;
    }
    // Create a User
    const user = new UserModel({
        username: req.body.username,
        robuxcount: 30

    });
    // Save User in the database
    user
      .save(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
           "User Already Exists " + err.message  || "Some error occurred while creating the user."
        });
      });
  };

  exports.findOne = (req, res) => {
    const username = req.params.username;
    console.log(username);
    UserModel.find({username: username })
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with username " + username });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with username=" + username });
      });
  };


  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const username = req.params.username;
    UserModel.findOneAndUpdate(username, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${username}. Maybe Tutorial was not found!`
          });
        } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + username
        });
      });
  };



  exports.delete = (req, res) => {
    const username2 = req.params.username;
    console.log(username2);
    UserModel.findOneAndDelete(username2)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete username with username=${username2}. Maybe username was not found!`
          });
        } else {
          res.send({
            message: "username was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete username with id=" + username2
        });
      });
  };
  

module.exports = new Database();











