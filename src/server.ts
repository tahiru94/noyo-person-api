import app from './app';

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Express API running on http://localhost:${PORT}`);
});