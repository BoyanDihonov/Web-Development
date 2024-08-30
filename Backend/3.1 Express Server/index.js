import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("<h1>Helloooooo</h1>");
});
app.get("/register", (req, res) => {
    res.send("<h1>Register form</h1>");
});app.get("/about", (req, res) => {
    res.send("<h1>My address will go here...</h1>");
});app.get("/contacts", (req, res) => {
    res.send("<h1>And my phone and email will go here :)</h1>");
});
app.get("*", (req, res) => {
    res.send("<h1>404 ERROR    ! You mistyped something ! </h1>");
});