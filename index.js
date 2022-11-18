const Router = require("./serverFramework/Router");
const  App = require('./serverFramework/App.js')
const PORT = process.env.PORT || 3000;
const sendJsonMiddleware = require("./serverFramework/sendJsonMiddleware");

const app = new App();
app.use(sendJsonMiddleware);
const router = new Router();

const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
]
router.get("/", (req, res) => {
    res.end("Hello World");
});
router.get("/post", (req, res) => {
    res.end("Hello Post!");
});
router.get("/users", (req, res) => {
    res.sendJson(users);

    // res.writeHead(200, { "Content-Type": "application/json" });
    // res.end(JSON.stringify(users));
});


app.addRouter(router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
