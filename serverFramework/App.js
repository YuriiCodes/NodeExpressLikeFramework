const http = require("http");
const EventEmitter = require("events");

module.exports = class App{
    constructor(){
        this.emitter = new EventEmitter();
        this.server = this._createServer();
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path]
            Object.keys(endpoint).forEach(httpMethod => {
                const handler = endpoint[httpMethod];
                // Events will be structured like so: [path]:[method], e.g.[/users]:[GET]
                this.emitter.on(this._getRouterMask(path, httpMethod) , (req, res) => {
                    handler(req, res);
                });

            })
        })
    }
    listen (port, callback) {
        this.server.listen(port, callback);
    }
    _createServer () {
        return http.createServer((req, res) => {
            const isEmitted = this.emitter.emit(this._getRouterMask(req.url, req.method), req, res);
            if (!isEmitted) {
                res.statusCode = 404;
                res.end("Not Found");
            }
        });
    }

    _getRouterMask(path, method) {
        return `[${path}]:[${method}]`;
    }
}