const http = require("http");
const EventEmitter = require("events");
const Router = require("./serverFramework/Router");

const emitter = new EventEmitter();
const  App = require('./serverFramework/App.js')
const PORT = process.env.PORT || 3000;


const app = new App();


const router = new Router();
router.get("/", (req, res) => {
    res.end("Hello World");
});
router.get("/post", (req, res) => {
    res.end("Hello Post!");
});

app.addRouter(router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
