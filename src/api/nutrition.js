const https = require('https');

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Invalid JSON')); }
      });
    }).on('error', reject);
  });
}

module.exports = async (req, res) => {
  const USDA_KEY = process.env.USDA_API_KEY;
  const query    = req.query.q;

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (!query) return res.status(400).json({ error: 'Query param q is required.' });
  if (!USDA_KEY) return res.status(503).json({ error: 'USDA_API_KEY not set.', foods: [] });

  try {
    const url = [
      'https://api.nal.usda.gov/fdc/v1/foods/search',
      `?query=${encodeURIComponent(query)}`,
      `&api_key=${USDA_KEY}`,
      `&pageSize=5`,
      `&dataType=Survey%20%28FNDDS%29,SR%20Legacy`
    ].join('');

    const data = await httpsGet(url);

    const foods = (data.foods || []).map(f => ({
      name:     f.description,
      calories: f.foodNutrients.find(n => n.nutrientName === 'Energy')?.value,
      protein:  f.foodNutrients.find(n => n.nutrientName === 'Protein')?.value,
      sodium:   f.foodNutrients.find(n => n.nutrientName === 'Sodium, Na')?.value,
      fiber:    f.foodNutrients.find(n => n.nutrientName === 'Fiber, total dietary')?.value,
    }));

    res.json({ foods });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch nutrition data.', foods: [] });
  }
};
