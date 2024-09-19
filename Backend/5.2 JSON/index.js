import express from "express";
import bodyParser from "body-parser";
import fs from "fs";  // Import the fs module to read the file

const app = express();
const port = 3000;

// Read and parse the recipe.json file synchronously (or you can use async if you prefer)
let recipes;
try {
  const data = fs.readFileSync("recipe.json", "utf8");
  recipes = JSON.parse(data);
} catch (err) {
  console.error("Error reading the recipe.json file:", err);
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let selectedRecipe;  // This will store the selected recipe

// Serve the home page with the selected recipe (if any)
app.get("/", (req, res) => {
  res.render("index.ejs", { recipe: selectedRecipe });
});

// Handle POST requests to /recipe
app.post("/recipe", (req, res) => {
  const choice = req.body.choice;

  // Find the recipe based on the user's choice
  switch (choice) {
    case "chicken":
      selectedRecipe = recipes[0]; // Chicken Taco
      break;
    case "beef":
      selectedRecipe = recipes[1]; // Beef Taco
      break;
    case "fish":
      selectedRecipe = recipes[2]; // Fish Taco
      break;
    default:
      selectedRecipe = null;  // Handle unknown choices
  }

  // Redirect to the home page to display the selected recipe
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
