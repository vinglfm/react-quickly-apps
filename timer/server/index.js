const path = require('path');
const express = require('express');
const {
  PORT = 3000
} = process.env;
const app = express();

app.use('/build', express.static(path.resolve(process.cwd(), 'build')));

app.use('*', (req, res) => {
  res.sendFile('index.html', {
    root: process.cwd()
  })
});

app.listen(PORT, () => console.log(`Running server on port ${PORT}`));
