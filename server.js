//const handlebars = require("express-handlebars");
const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const Productos = require("./api/productos.js");

let productos = new Productos();
const mensajes = [];

//config socket
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
    res.sendFile("index.html")
});

//conexion sockets
io.on("connection", (socket) =>{
    console.log("Se conectó un usuario")

    socket.emit("mensajes", mensajes);

    socket.on("new-mensaje", (data) =>{
        mensajes.push(data);
        io.sockets.emit("mensajes", mensajes)
    })
})
/*router.get("/productos/vista", (req, res) => {
	let prods = productos.listarAll();

	res.render("vista", {
		productos: prods,
		hayProductos: prods.length,
	});
});
router.post("/productos/guardar", (req, res) => {
	let producto = req.body;
	productos.guardar(producto);
	//res.json(producto)
	res.redirect("/");
});
*/
//establecemos la configuración de handlebars
/*app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		defaultLayout: "index.hbs",
	})
);
app.set("view engine", "hbs");
app.set("views", "./views");
*/
//servidor
const PORT = 8080;

httpServer.listen(PORT, () => console.log("Servidor levantado"));


