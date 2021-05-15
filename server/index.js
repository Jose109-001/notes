const express = require("express");
const app = express();
const notes = require("./notes/functions");
const bodyParser = require("body-parser");

// Middlewares
app.use(bodyParser.json());
app.use(
  express.static("public", {
    extensions: ["html"],
  })
);

app.get("/api/notes", async (req, res) => {
  const data = await notes.read(notes);
  res.json(data);
});

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  const note = {
    title,
    text,
  };
  notes.write(note);
  res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  notes.remove(id);
  res.json({ id });
});

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
