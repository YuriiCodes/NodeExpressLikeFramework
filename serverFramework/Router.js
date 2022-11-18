module.exports = class Router
{
    constructor()
    {
        // Here is how endpoints look like
        // const endpoints = {
        //     '/test': {
        //         'GET': handler1,
        //         'POST': handler2,
        //         'PUT': handler3,
        //     }
        // }
        this.endpoints = {};
    }

    request(method, path, callback)
    {
        if (this.endpoints[path] === undefined) {
            this.endpoints[path] = {};
        }
        const endpoint = this.endpoints[path];

        if (endpoint[method]) {
            throw new Error(`${method} ${path} already exists`);
        }
        endpoint[method] = callback;

    }

    get(path, callback)
    {
        this.request("GET", path, callback);
    }

    post(path, callback)
    {
        this.request("POST", path, callback);
    }

    put(path, callback)
    {
        this.request("PUT", path, callback);
    }
    delete (path, callback)
    {
        this.request("DELETE", path, callback);
    }

}