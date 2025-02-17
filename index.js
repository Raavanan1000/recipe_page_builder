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
    <div class="container mt-5 mb-5">
        <h2 class="mt-4">Temps</h2>
        <div class="row">
            <div class="col-md-6">
                <p><strong>Total :</strong> ${recipe.timing.total.quantity} ${recipe.timing.total.unit}</p>
                <p><strong>Préparation :</strong> ${recipe.timing.preparation.quantity} ${recipe.timing.preparation.unit}</p>
            </div>
            <div class="col-md-6">
                <p><strong>Repos :</strong> ${recipe.timing.rest.quantity} ${recipe.timing.rest.unit}</p>
                <p><strong>Cuisson :</strong> ${recipe.timing.cooking.quantity} ${recipe.timing.cooking.unit}</p>
            </div>
        </div>

        <h2 class="mt-4 mb-3">Ingrédients</h2>
        <div class="row mb-4">
        ${recipe.ingredients.map(ingredient => `
            <div class="col-6 col-sm-4 col-md-3 mb-3">
                <div class="card" style="height: 220px;">
                    <img src="pictures/${ingredient.picture}" class="card-img-top" alt="${ingredient.translated_name[0].fr}" style="height: 120px; object-fit: contain;">
                    <div class="card-body p-2">
                        <h5 class="card-title fs-6">${ingredient.translated_name[0].fr}</h5>
                        <p class="card-text fs-7">${ingredient.quantity} ${ingredient.unit}</p>
                    </div>
                </div>
            </div>
        `).join('')}
        </div>

        <h2 class="mt-4 mb-3">Étapes</h2>
        <ol class="list-group mb-4">
            ${recipe.steps.map(step => {
            const stepIngredients = step.ingredients.map(index => {
                const ingredient = recipe.ingredients[index - 1];
                return `${ingredient.translated_name[0].fr} (${ingredient.quantity} ${ingredient.unit})`;
            }).join(', ');

            return `
                <li class="list-group-item step-item">
                <h3 class="step-title">Étape ${step.order}:</h3>
                <p class="step-description">${step.description}</p>
                ${stepIngredients ? `<p><strong>Ingrédients utilisés:</strong> ${stepIngredients}</p>` : ''}
                </li>`;
            }).join('')}
        </ol>
    </div>
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
