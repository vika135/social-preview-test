const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/', async (req, res) => {
    try {
        const response = await fetch('https://vika135.github.io/db/data.json');
        const data = await response.json();

        const { title, description } = data;

        const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Page Title</title>
          <meta property="og:title" content="${title}">
          <meta property="og:description" content="${description}">
      </head>
      <body>

          <header>
              <h1>Your Website Name</h1>
          </header>

          <section>
              <h2>Welcome to Your Website!</h2>
              <p>This is a simple HTML template. Replace this content with your own.</p>
          </section>

          <footer>
              <p>&copy; 2024 Your Website. All rights reserved.</p>
          </footer>

      </body>
      </html>
    `;

        res.setHeader('Cache-Control', 'no-cache');
        res.send(html);
    } catch (error) {
        console.error('Error fetching JSON:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
