const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));  // Serves files like index.html

// Endpoint to handle data submission
app.post('/submit', (req, res) => {
  const data = req.body;
  
  // Append data to data.json
  fs.readFile('data.json', 'utf8', (err, fileData) => {
    const json = fileData ? JSON.parse(fileData) : [];
    json.push(data);
    fs.writeFile('data.json', JSON.stringify(json, null, 2), () => {
      res.json(data);  // Send back the data to confirm submission
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
