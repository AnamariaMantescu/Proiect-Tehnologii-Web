const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'project',
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


app.post('/login',(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err, result) => {
            if(err) {
                res.send({err: err});
            }

            if(result.length > 0) {
                res.send(result);
            }else{
                res.send({message: 'Wrong username/password'})
            }
        }
    )
})

app.get('/api/matters/get',(req, res) => {
    const sqlSelect = "SELECT * FROM matters"
    db.query(sqlSelect, (err, result) => {
        if(err) {
            res.send({err: err});
        }else{
            res.send(result);
        }
    })
})

app.get('/api/notes/get',(req, res) => {
    const sqlSelect = "SELECT * FROM notes"
    db.query(sqlSelect, (err, result) => {
        if(err) {
            res.send({err: err});
        }else{
            res.send(result);
        }
    })
})

app.post('/api/notes/create',(req, res) => {
    const userId = req.body.userId;
    const matterId = req.body.matterId;
    const title = req.body.title;
    const description = req.body.description;
    const created = req.body.created;
    const matterName = req.body.matterName;
    const sqlInsert = "INSERT INTO notes (userId, matterId, title, description, created, matterName) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert, [userId, matterId, title, description, created, matterName], (err, result) => {
        if(err) {
            res.send({err: err});
        }else{
            res.send({message: 'Notita a fost creata cu success'});
        }
    })
})

app.put('/api/notes/update',(req, res) => {
    const id = req.body.id
    const userId = req.body.userId;
    const matterId = req.body.matterId;
    const title = req.body.title;
    const description = req.body.description;
    const created = req.body.created;
    const matterName = req.body.matterName;
    const sqlUpdate = "UPDATE SET notes (userId, matterId, title, description, created, matterName) VALUES (?,?,?,?,?,?) WHERE id = ?"
    db.query(sqlUpdate, [userId, matterId, title, description, created, matterName, id], (err, result) => {
        if(err) {
            res.send({err: err});
        }else{
            res.send({message: 'Notita a fost modificata cu success'});
        }
    })
})

app.delete('/api/notes/delete/:id',(req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM notes WHERE id = ?"
    db.query(sqlDelete, id, (err, result) => {
        if(err) {
            res.send({err: err});
        }else{
            res.send({message: 'Success'});
        }
    })
})
app.get('/api/note/get/:id',(req, res) => {
    const id = req.params.id;
    const sqlGetById = "SELECT FROM notes WHERE id = ?"
    db.query(sqlGetById, id, (err, result) => {
        if(err) {
            res.send({err: err});
        }else{
            res.send(result);
        }
    })
})

app.listen(3001, () => { console.log("Server started on port 3001")})