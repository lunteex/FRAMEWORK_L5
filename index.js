const Framework = require("./framework/Application.js");
const Router = require("./framework/Router.js");

const server = new Framework();
const port = 5173;

server.use((req, res) => {
    console.log(`${req.method} ${req.url}`);
});

server.listen(port, () => console.log(`Server started on port ${port}`));

const userRouter = new Router();

userRouter.get("/users", (req, res) => {
    res.json({ id: 1, name: "Nikita", age: 19 });
});

userRouter.post("/users", (req, res) => {
    res.status(201).json({ message: "User created", data: req.body });
});

server.addRouter(userRouter);