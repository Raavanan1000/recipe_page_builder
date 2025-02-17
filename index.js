const fs = require('fs');
const path = require('path');

// Paths to files
const recipePath = path.join(__dirname, 'recipe.json');

// Read the recipe JSON file
fs.readFile(recipePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading recipe.json:', err);
    return;
  }

  const recipe = JSON.parse(data);

  console.log('Recipe:', recipe);
});
