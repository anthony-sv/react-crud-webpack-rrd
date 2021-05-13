const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(process.cwd() + "/dist"));
app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd() + "/dist/index.html"));
});

app.listen(9090, () => {
    console.log("Listening on port 9090");
});