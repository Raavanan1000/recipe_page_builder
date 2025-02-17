const fs = require('fs');
const path = require('path');

// Paths to files
const recipePath = path.join(__dirname, 'recipe.json');
const templatePath = path.join(__dirname, 'result-template.html');
const outputPath = path.join(__dirname, 'result-template.html');

// Read the recipe JSON file
fs.readFile(recipePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading recipe.json:', err);
    return;
  }

  const recipe = JSON.parse(data);

  // Build HTML content
  let recipeHTML = `
    <h1>TEST</h1>
  `;

  // Read the HTML template
  fs.readFile(templatePath, 'utf8', (err, template) => {
    if (err) {
      console.error('Error reading result-template.html:', err);
      return;
    }

    // Replace the placeholder with the generated HTML
    const finalHTML = template.replace('REPLACEME', recipeHTML);

    // Write the result to result.html
    fs.writeFile(outputPath, finalHTML, (err) => {
      if (err) {
        console.error('Error writing result.html:', err);
        return;
      }
      console.log('HTML recipe generated successfully!');
    });
  });
});
