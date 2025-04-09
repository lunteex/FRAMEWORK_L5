const Framework = require("./src/framework/Framework");
const loggerMiddleware = require("./src/middlewares/logger");

const server = new Framework();
const port = 5173;

server.use(loggerMiddleware);

const philosopherRouter = require("./src/routes/philosophers");
const bookRouter = require("./src/routes/books");

server.addRouter(philosopherRouter);
server.addRouter(bookRouter);

server.listen(port, () => console.log(`Сервер запущен на порту ${port}`));