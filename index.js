const Router = require("./serverFramework/Router");
const  App = require('./serverFramework/App.js')
const PORT = process.env.PORT || 3000;
const sendJsonMiddleware = require("./serverFramework/sendJsonMiddleware");
const parseBodyMiddleware = require("./serverFramework/bodyParserMiddleware");

const app = new App();
app.use(sendJsonMiddleware);
app.use(parseBodyMiddleware);
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
});
router.post("/users", async (req, res) => {
    let user;
    try {user = await res.parseBody();}
    catch (error) {
        res.statusCode = 400;
        res.end("Bad Request");
        return;
    }

    users.push(user);
    res.sendJson(user);

});

app.addRouter(router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
