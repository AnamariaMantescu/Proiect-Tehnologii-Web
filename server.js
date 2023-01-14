const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "project",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//! Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./client/src/assets"); // './public/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});


//Images

//Upload Image
app.post("/upload/image/:noteId", upload.single("image"), (req, res) => {
  if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    res.send({ msg: "Only image files (jpg, jpeg, png) are allowed!" });
  } else {
    const image = req.file.filename;
    const noteId = req.params.noteId;
    const sqlInsert = "INSERT INTO images (noteId, image) VALUES (?,?)";
    db.query(sqlInsert, [noteId, image], (err, result) => {
      if (err) {
        res.send({ err: err });
      } else if (result) {
        res.send({ data: result, message: "Success" });
      }
    });
  }
});
//Retrieve Images
app.get("/api/images/:noteId",  (req, res) => {
    const id = req.params.noteId;
    const sqlSelect = "SELECT * FROM images WHERE noteId = ?"
    db.query(sqlSelect, id, (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          res.send(result);
        }
      });
  });

  //Delete Image
  app.delete("/api/images/:id",  (req, res) => {
    const id = JSON.parse(req.params.id);
    const sqlSelect = "DELETE FROM images WHERE id = ?"
    db.query(sqlSelect, id, (err, result) => {
        if (err) {
            res.send({ err: err });
          } else {
            res.send({ message: "Success" });
          }
      });
  });


  //Upload file
app.post("/upload/file/:noteId", upload.single("file"), (req, res) => {
    if (!req.file.originalname.match(/\.(pdf|PDF|txt|TXT)$/)) {
      res.send({ msg: "Only files (pdf, txt) are allowed!" });
    } else {
      const file = req.file.filename;
      const noteId = req.params.noteId;
      const sqlInsert = "INSERT INTO files (noteId, file) VALUES (?,?)";
      db.query(sqlInsert, [noteId, file], (err, result) => {
        if (err) {
          res.send({ err: err });
        } else if (result) {
          res.send({ data: result, message: "Success" });
        }
      });
    }
  });
  //Retrieve files
  app.get("/api/files/:noteId",  (req, res) => {
      const id = req.params.noteId;
      const sqlSelect = "SELECT * FROM files WHERE noteId = ?"
      db.query(sqlSelect, id, (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            res.send(result);
          }
        });
    });
  
    //Delete file
    app.delete("/api/files/:id",  (req, res) => {
      const id = req.params.id;
      const sqlSelect = "DELETE FROM files WHERE id = ?"
      db.query(sqlSelect, id, (err, result) => {
          if (err) {
              res.send({ err: err });
            } else {
              res.send({ message: "Success" });
            }
        });
    });
  
//Login
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong username/password" });
      }
    }
  );
});


//Retrieve matters
app.get("/api/matters/get", (req, res) => {
  const sqlSelect = "SELECT * FROM matters";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

//Retrieve notes
app.get("/api/notes/get/:userId", (req, res) => {
  const id = req.params.userId;
  const sqlSelect = "SELECT * FROM notes WHERE userId = ?";
  db.query(sqlSelect, id, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

//Retrieve note by id
app.get("/api/note/get/:id", (req, res) => {
  const id = req.params.id;
  const sqlGetById = "SELECT * FROM notes WHEE id = ?";
  db.query(sqlGetById, id, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

//Create note
app.post("/api/notes/create", (req, res) => {
  const userId = req.body.userId;
  const matterId = req.body.matterId;
  const title = req.body.title;
  const description = req.body.description;
  const created = req.body.created;
  const matterName = req.body.matterName;
  const sqlInsert =
    "INSERT INTO notes (userId, matterId, title, description, created, matterName) VALUES (?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [userId, matterId, title, description, created, matterName],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Notita a fost creata cu success" });
      }
    }
  );
});

//Uptade note
app.put("/api/notes/update", (req, res) => {
  const id = req.body.id;
  const userId = req.body.userId;
  const matterId = req.body.matterId;
  const title = req.body.title;
  const description = req.body.description;
  const created = req.body.created;
  const matterName = req.body.matterName;
  const sqlUpdate =
    "UPDATE notes SET userId = ?, matterId =? , title = ?, description =? , created =?, matterName= ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [userId, matterId, title, description, created, matterName, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Notita a fost modificata cu success" });
      }
    }
  );
});

//Delete Note
app.delete("/api/notes/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM notes WHERE id = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send({ message: "Success" });
    }
  });
});
//Retrieve users
app.get("/api/users/", (req, res) => {
  const sqlSelect = "SELECT * FROM users";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
