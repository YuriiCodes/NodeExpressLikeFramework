module.exports = (req, res)  => {
    res.sendJson = function (data) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
    }
}