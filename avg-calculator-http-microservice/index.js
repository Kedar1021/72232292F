const express = require('express');
const dotenv = require('dotenv');
const fetchNumbers = require('./services/fetchNumbers');
const { updateWindow } = require('./utils/windowManager');

dotenv.config();
const app = express();
const port = process.env.PORT || 9876;

let window = [];
const windowSize = 10;

app.get('/numbers/:numberid', async (req, res) => {
    const type = req.params.numberid;
    const allowed = ['p', 'f', 'e', 'r'];

    if (!allowed.includes(type)) {
        return res.status(400).json({ error: 'Invalid number type' });
    }

    try {
        const { numbers } = await fetchNumbers(type);
        const windowPrevState = [...window];
        window = updateWindow(window, numbers, windowSize);
        const avg = (window.reduce((sum, n) => sum + n, 0) / window.length).toFixed(2);

        res.status(200).json({
            windowPrevState,
            windowCurrState: window,
            numbers,
            avg: parseFloat(avg)
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch numbers or timeout' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
