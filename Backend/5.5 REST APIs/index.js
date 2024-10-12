import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourBearerToken = "a34b2df4-3cac-499a-b04a-c09fa12e9e59";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  try {
    const result = await axios.post(API_URL + "/secrets", req.body, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    if (error.response) {
      res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    } else {
      res.render("index.ejs", { content: "An error occurred: " + error.message });
    }
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.put(API_URL + `/secrets/${searchId}`, req.body, config)
    res.render("index.ejs", { content: JSON.stringify(result.data) })
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  if (!searchId) {
    return res.render("index.ejs", { content: "ID is missing" });
  }

  try {
    const result = await axios.patch(API_URL + `/secrets/${searchId}`, req.body, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    const errorMessage = error.response ? error.response.data : "Unknown error occurred";
    res.render("index.ejs", { content: JSON.stringify(errorMessage) });
  }
});


app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.delete(`${API_URL}/secrets/${searchId}`, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    if (error.response) {
      res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    } else {
      res.render("index.ejs", { content: "An error occurred: " + error.message });
    }
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
