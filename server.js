const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/link-share", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const links = require("./models/links");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const link = new links({
    name: req.body.name,
    links: req.body.links,
  });

  try {
    const result = await link.save();
    console.log(result.id);
    res.redirect(`/${result.id}`);
  } catch (e) {
    console.log(e);
    res.render("/newUser", { link: link });
  }
});

app.get("/newUser", (req, res) => {
  res.render("newUser", { link: new links() });
});

app.get("/:id", async (req, res) => {
  const user = await links.findById(req.params.id);
  console.log({ user });
  if (user == null) res.redirect("/");
  res.render("user", { user: user });
});

const port = process.env.PORT || 3000;
app.listen(port);
