module.exports = (req, res) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
};