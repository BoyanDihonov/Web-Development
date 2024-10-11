import express, { json } from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "BoyanDihonov88";
const yourPassword = "mypassword";
const yourAPIKey = "02d63571-d913-45f4-86a5-d8dbb1073879";
const yourBearerToken = "a34b2df4-3cac-499a-b04a-c09fa12e9e59";

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "random");
    const content = JSON.stringify(response.data);
    res.render('index.ejs', { content: content });
  } catch (error) {
    console.error("Error fetching data from /random:", error);
    res.status(500).send("Error fetching data.");
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + 'all?page=2', {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });

    const content = JSON.stringify(response.data);
    res.render('index.ejs', { content: content });
  } catch (error) {
    console.error("Error fetching data from /all:", error);
    res.status(500).send("Error fetching data.");
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(API_URL + 'filter', {
      params: {
        score: 5,
        apiKey: yourAPIKey
      }
    });
    const content = JSON.stringify(response.data);
    res.render('index.ejs', { content: content });
  } catch (error) {
    console.error("Error fetching data from /filter:", error);
    res.status(500).send("Error fetching data.");
  }
});


app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}secrets/42`, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`
      },
    });

    const content = JSON.stringify(response.data);
    res.render('index.ejs', { content: content });
  } catch (error) {
    console.error("Error fetching data from /secrets/42:", error);
    res.status(500).send("Error fetching data.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
