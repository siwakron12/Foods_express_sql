const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors'); // นำเข้า CORS
app.use(cors());

const db = mysql.createConnection({
  host: "balz6jgrb4iqladoghkm-mysql.services.clever-cloud.com",
  user: "ubcztc017pqtxteb",
  password: "IW6vH6Mhll6odliVpm9m",
  database: "balz6jgrb4iqladoghkm",
 
  });
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('MySQL Connected...');
  });

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  app.get('/', (req, res) => {
    const query = 'SELECT * FROM foods';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching foods');
            return;
        }

        // แปลงคอลัมน์ ingredients จาก JSON string เป็น array
        results.forEach(food => {
            food.ingredients = JSON.parse(food.ingredients);
        });

        res.json(results);
    });
});