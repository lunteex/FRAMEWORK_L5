const EventEmitter = require("events");
const http = require("http");

class Framework {
    constructor() {
        this.server = this._createServer();
        this.emitter = new EventEmitter();
        this.middlewares = [];
    }

    listen(port, callback) {
        this.server.listen(port, callback);
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach((path) => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach((method) => {
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    const handler = endpoint[method];
                    handler(req, res);
                });
            });
        });
    }

    _createServer() {
        return http.createServer((req, res) => {
            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", () => {
                if (body) {
                    try {
                        req.body = JSON.parse(body);
                    } catch (e) {
                        req.body = body;
                    }
                }

                const urlParts = req.url.split('?');
                req.path = urlParts[0];
                req.query = urlParts[1] ? Object.fromEntries(new URLSearchParams(urlParts[1])) : {};

                res.send = (data) => {
                    res.end(data);
                };

                res.json = (data) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                };

                res.status = (code) => {
                    res.statusCode = code;
                    return res;
                };

                this.middlewares.forEach((middleware) => middleware(req, res));

                const emitted = this.emitter.emit(
                    this._getRouteMask(req.path, req.method),
                    req,
                    res
                );

                if (!emitted) {
                    res.status(404).send('Not Found');
                }
            });
        });
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`;
    }
}

module.exports = Framework;