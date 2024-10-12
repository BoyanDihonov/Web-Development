import express from 'express';
import axios from 'axios';


const port = 3000;
const app = express();

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://secrets-api.appbrewery.com/random");
        res.render("index.ejs", {
            secret: result.data.secret,
            user: result.data.user
        })
    } catch (error) {
        console.error(error);
        res.render('index', { secret: 'Error getting secret', user: '' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
