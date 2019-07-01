const bcrypt = require('bcryptjs');

module.exports = {
  async register(req, res) {
    console.log(req.body)
    const {username, email, first_name, last_name, password} = req.body;
    
    const db = req.app.get("db");

    //Checks to make sure that no one else has the same email, returns an array
    const isUserEmailTaken = await db.find_user_by_email(email);

    //If there is an object inside the array, (which should only ever be at max 1 long) let the user know that teair email is allready taken.
    if (isUserEmailTaken.length = 0) {
      return res.status(200).send({ message: "email is taken" });
    }

    //generates a salt and hashes the pw the user gave so the password in the database is secure
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    //adds the user to the database and returns their database info without the hash
    const user = await db.register_user(email, first_name, last_name, username, hash);

    console.log(user)

    //here we are going to automatically log the user back in
    req.session.user = {
      email: user[0].email,
      first_name: user[0].first_name,
      last_name: user[0].last_name,
      username: user[0].username,
    };

    res.status(200).send(req.session.user);
  },

  async login(req, res) {
    const { email, password } = req.body;
    const db = req.app.get("db");

    //same as register, except we are grabbing all the information, that way if we DO find a users email we can check if the password the user gave us matches up.
    console.log('1')
    const user = await db.find_user_by_email_login(email);

    //if the email was not found then return a message that the account does not exist
    if (!user[0]) {
      return res.status(404).send({ message: 'Account does not exist. Please Register.' });
    }

    console.log(user[0])

    //result is a true or false value, we are testing against the hash created when a user is registered and the one the user is giving us to login
    const result = bcrypt.compareSync(password, user[0].hash);

    //if the result is false
    if (!result) {
      return res.status(404).send({ message: "Incorrect password" });
    }

    //only one user should ever be found at a time, so since the response is an array of object(s) we are going to grab the first one, and set our session user to it.
    //if you are not really familiar with express-session then basically we can add information to a req.session object that will be saved to a users cookies. If we want to grab the current logged in user for any functions in the back end, we can use req.session.*object you created here*, so we use it for req.session.user
    
    req.session.user = {
      email: user[0].email,
      first_name: user[0].first_name,
      last_name: user[0].last_name,
      username: user[0].username,
    };
    console.log(req.session.user, '123123123213')
    res.status(200).send(req.session.user);
  },

  async logout(req, res) {
    //removes the req.session 
    req.session.destroy();
    return res.status(200).send({ message: "you have successfully logged out" });
  },

  async createListing(req, res) {
    const {list_name, condition, price, available, city, username, email, category} = req.body;
    const db = req.app.get('db');

    if (available.toLowerCase() === 'true') {
      await db.create_new_listing(list_name, username, condition, price, true, city, email, category).catch(err=>console.log(err));                        
    } else {
      await db.create_new_listing(list_name, username, condition, price, false, city, email, category).catch(err=>console.log(err));                        
    };

    //returns a status of 200 to our front end
    res.sendStatus(200);
  },

  async grabAllListings(req, res) {
    const db = req.app.get('db');
    const listings = await db.grab_all_listings().catch(err=>res.status(402).send(err));
    res.status(200).send(listings);
  },
  async deleteListing(req, res) {
    const {id} = req.params;
    const db = req.app.get('db');
    await db.delete_listing(id).then(()=>{
      console.log('deleted')
      res.sendStatus(200)
    }).catch(err=>{
      console.log(err)
      res.sendStatus(404)
    });

    //incase it doesnt hit catch or then
    res.status(500).send('delete');
  }
};