const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/price', async (req, res) => {
  try {
    // Scrape the website
    const response = await axios.get('https://www.metal.com/Lithium-ion-Battery/202303240001');
    const $ = cheerio.load(response.data);
    
    // Check if the price element exists
    const priceElement = $('span.strong___1JlBD.priceDown___2TbRQ');
    if (priceElement.length === 0) {
      throw new Error('Price element not found on the website.');
    }   

    // Extract the latest price
    const price = priceElement.text();

    // Return the price
    res.json({ price });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'An error occurred while fetching the price.' });
  }
});

app.use((req, res) => {
    // Handle invalid routes
    res.status(404).json({ error: 'Invalid route.' });
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
