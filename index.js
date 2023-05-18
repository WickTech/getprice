const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/', async (req, res) => {
  try {
    // Scrape the website
    const response = await axios.get('https://www.metal.com/Lithium-ion-Battery/202303240001');
    const $ = cheerio.load(response.data);

    // Check if the price element exists
    const priceElement = $('#__next > div > div.main___1ft3R.detail___2oeiJ > div.left___wCEQV > div:nth-child(3) > div.metalsContent___3T_m3 > div.priceContent___3lf_D > div > div:nth-child(1) > span.strong___1JlBD.priceDown___2TbRQ');
    if (priceElement.length === 0) {
      throw new Error('Price element not found on the website.');
    }

    // Extract the latest price
    const price = priceElement.text();

    // Return the price
    res.json({ price });

  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the price.' });
  }
});

app.listen(9000, () => {
  console.log(`Server is running on port 9000`);
});
