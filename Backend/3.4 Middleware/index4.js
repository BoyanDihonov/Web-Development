import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  const { street, pet } = req.body;
  console.log(req.body);
  res.send(`Your Band Name is: ${street}${pet}🖖`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
