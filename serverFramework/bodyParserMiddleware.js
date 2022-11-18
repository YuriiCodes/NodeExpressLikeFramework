module.exports = (req, res) => {
    res.parseBody = function () {
        return new Promise((resolve, reject) => {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", () => {
                try {
                    const parsedBody = JSON.parse(body);
                    resolve(parsedBody);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
}