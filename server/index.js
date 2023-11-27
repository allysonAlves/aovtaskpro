const express = require('express')
const path = require('path');
const cors = require('cors');
const injectRoutes = require('./injectRoutes')
const app = express()
const port = process.env.PORT || 6001

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.use('/api', injectRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
