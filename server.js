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

app.post("/user", async (req, res) => {
  const user = req.body.find;
  console.log(user);
  const userindb = await links.findOne({ name: user });
  if (userindb) {
    const userId = userindb._id;
    res.redirect(`/${userId}`);
  } else {
    res.redirect("/");
  }
});

app.post("/", async (req, res) => {
  const linkarr = [req.body.link1, req.body.link2, req.body.link3];
  const link = new links({
    name: req.body.name,
    links: linkarr,
  });

  try {
    const result = await link.save();
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
  if (user == null) res.redirect("/");
  res.render("user", { user: user });
});

const port = process.env.PORT || 3000;
app.listen(port);
