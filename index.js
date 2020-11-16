const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("connected");
});

app.get("", (req, res) => {
  res.send("hello world");
});
