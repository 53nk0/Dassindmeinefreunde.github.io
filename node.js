const express = require('express');
const app = express();

// Ändere hier den Port
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server läuft unter http://localhost:${PORT}`);
});
