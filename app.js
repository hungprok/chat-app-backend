const express = require('express');
const router = new express.Router();

const app = express();

app.use(router)
router.route("/").get((req,res)=> {
  res.send("ok")
})

module.exports = app;