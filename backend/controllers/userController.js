const User = require("../models/User");
const create_user_get = (req, res) => {
  const new_user = new User({
    first_name: "Lukarp",
    last_name: "Lawarga",
    username: "Lula",
    password: "xyz",
    age: 20,
    contact_no: 9876543211,
  });
  new_user
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const create_user_post = (req, res) => {
  console.log(req.body);
  // res.status(200).json({message : 'received'});

  const user = new User(req.body);

  user
    .save()
    .then((result) => {
      console.log("User saved");
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const display_all = (req, res) => {
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const display_one = (req, res) => {
  User.findById("63eba09b5f75bed5fd8fbc7d")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const display_by_id = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.send(user);
  } catch (err) {
    console.log(err);
  }
};

const delete_by_id = async (req, res) => {
  try {
    const id = req.params.id;
    const temp = await User.findByIdAndDelete(id);
    console.log(temp);
    res.send("Deletion complete");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  create_user_get,
  create_user_post,
  display_all,
  display_one,
  display_by_id,
  delete_by_id,
};
