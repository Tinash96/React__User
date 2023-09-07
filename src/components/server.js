const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer'); 
const fs = require('fs');

app.use(bodyParser.json());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); 
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = file.originalname.split('.').pop();
    cb(null, `${timestamp}.${extension}`); 
  },
});

const upload = multer({ storage });

app.post('/users', upload.single('image'), (req, res) => {
  const { fullName, jobId } = req.body;

  const newUser = {
    id: Date.now().toString(),
    fullName,
    jobId,
    image: req.file ? req.file.filename : null,
  };

  const users = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  users.push(newUser);
  fs.writeFileSync('db.json', JSON.stringify(users, null, 2), 'utf8');

  res.json(newUser);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
