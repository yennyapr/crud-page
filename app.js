// 1. Set up a new Node.js project
// 2. Install necessary dependencies
// npm install express mongodb body-parser

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// let db
// // 4. Connect to MongoDB
// const url = 'mongodb://localhost:27017';
// MongoClient.connect(url, (err, client) => {
//   if (err) return console.log(err);
//   db = client.db('mydatabase'); // whatever your database name is
//   // username and password authentication
//   db.authenticate('username', 'password', (err, result) => {
//     if (err) return console.log(err);
//     console.log('Authenticated');
//   });
//   console.log('Connected to MongoDB');
// });

const mysql = require('mysql');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'mydatabase'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

// 3. Set up Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// 5. Create routes for CRUD operations
// 6. Implement functions for each route to interact with MongoDB

// // Create
// app.post('/items', (req, res) => {
//   db.collection('items').insertOne(req.body, (err, result) => {
//     if (err) return console.log(err);
//     res.send(result.ops[0]);
//   });
// });

// // Read
// app.get('/items', (req, res) => {
//   db.collection('items').find().toArray((err, results) => {
//     if (err) return console.log(err);
//     res.send(results);
//   });
// });

// // Update
// app.put('/items/:id', (req, res) => {
//   db.collection('items').updateOne({_id: ObjectId(req.params.id)}, {
//     $set: {
//       // whatever fields you want to update
//     }
//   }, (err, result) => {
//     if (err) return console.log(err);
//     res.send(result);
//   });
// });

// // Delete
// app.delete('/items/:id', (req, res) => {
//   db.collection('items').deleteOne({_id: ObjectId(req.params.id)}, (err, result) => {
//     if (err) return console.log(err);
//     res.send(result);
//   });
// });

// Create
app.post('/items', (req, res) => {
  console.log(JSON.stringify(req.body))
  const { name } = req.body;
  const query = `INSERT INTO items (name) VALUES ('${name}')`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send('Item added');
  });
});

// Read
app.get('/items', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) throw err;
    console.log(JSON.stringify(results))
    res.json(results);
  });
});

// Update
app.put('/items/:id', (req, res) => {
  console.log(JSON.stringify(req.body))
  console.log(JSON.stringify(req.params))
  const { name } = req.body;
  const { id } = req.params;
  const query = `UPDATE items SET name = '${name}' WHERE id = ${id}`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send('Item updated');
  });
});

// Delete
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM items WHERE id = ${id}`;
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send('Item deleted');
  });
});

// 7. Create a basic Bootstrap front-end
// This is a bit more involved and would typically involve creating HTML files with Bootstrap styling.
// You would then use JavaScript (or jQuery) to make AJAX calls to your API.

// 8. Make AJAX calls from the front-end to the API for CRUD operations
// This would involve using the fetch API, axios, or jQuery's AJAX method to make HTTP requests to your API.
