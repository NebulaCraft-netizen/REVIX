document.getElementById("loginBtn").addEventListener("click", () => {
  window.location.href = "/auth/google";
});

fetch("/auth/status")
  .then(res => res.json())
  .then(user => {
    if (user.name) {
      document.getElementById("userInfo").innerHTML = `
        <h3>👋 Logged in as ${user.name}</h3>
        <p>Email: ${user.email}</p>
        <img src="${user.picture}" width="60" style="border-radius: 50%;" />
      `;
    } else {
      document.getElementById("userInfo").innerHTML = "You're not logged in.";
    }
  })
  .catch(() => {
    document.getElementById("userInfo").innerHTML = "You're not logged in.";
  });
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Google Auth Config
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serve public files
app.use(express.static("public"));

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.redirect("/")
);

app.get("/auth/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      name: req.user.displayName,
      email: req.user.emails[0].value,
      picture: req.user.photos[0].value
    });
  } else {
    res.json({});
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
