const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/User");

const initialize = (passport) => {
  const verify = (email, password, done) => {
    User.findOne({ email })
      .then(async (user) => {
        if (user) {
          try {
            if (await bcrypt.compare(password, user.password)) {
              console.log("Podano poprawne dane użytkownika");
              done(null, user);
            } else {
              console.log("Podano niepoprawne dane użytkownika");
              done(null, null);
            }
          } catch (e) {
            console.log("Błąd w porównywaniu hasła");
            done(e);
          }
        } else {
          console.log("Nieznany użytkownik");
          done(null, null);
        }
      })
      .catch((err) => {
        console.log(`Błąd: ${err}`);
        done(err);
      });
  };
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      verify
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        console.dir(`Błąd: ${err}`);
        done(err);
      });
  });
};

module.exports = initialize;
