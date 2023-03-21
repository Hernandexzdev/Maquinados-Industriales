import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import session from "express-session";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import bodyparser from "body-parser";
import { fileURLToPath } from "url";
import proyectosRoutes  from "./routes/proyecto.routes.js";
import propuestasRoutes from "./routes/propuesta.routes.js";
import materialesRoutes  from "./routes/material.routes.js";
import maquinasRoutes from "./routes/maquinado.routes.js";
import entregasRoutes from "./routes/entrega.routes.js";
import empleadosRoutes from "./routes/empleado.routes.js";
import loginRoutes from "./routes/login.routes.js";
import pass from "./utils/handleGenerador.utils.js";


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//todo: Configuracion
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'))

//?: Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cookieParser(pass));




//*: Rutas


app.use('/menu', (req, res) =>{
    res.status(202).render('menu', {tituloweb: 'Menu Principal'});
});


app.get('/menu-proyecto', (req, res) => {
    res.status(202).render('menu_proyecto', {tituloweb: 'Menu Proyecto'})
});

app.use('/api', loginRoutes);

app.use('/api', empleadosRoutes);

app.use('/api', proyectosRoutes);

app.use('/api', propuestasRoutes);

app.use('/api', materialesRoutes);

app.use('/api', maquinasRoutes);

app.use('/api', entregasRoutes);


app.use( (req, res, next) => {
    res.status(404).redirect('404.html');
    
});


export default app;