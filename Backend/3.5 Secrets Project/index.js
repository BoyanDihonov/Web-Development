import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
}));

function passwordCheck(req, res, next) {
    const password = req.body["password"];
    if (password === "ILoveProgramming") {
        req.session.userIsAuthorised = true;
    }
    next();
}

app.use(passwordCheck);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/check", (req, res) => {
    if (req.session.userIsAuthorised) {
        res.sendFile(path.join(__dirname, "/public/secret.html"));
    } else {
        res.sendFile(path.join(__dirname, "/public/index.html"));
    }
});
