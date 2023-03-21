import mysql from "mysql2";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE } from "../src/config.js";
export const conexion = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
});

conexion.connect((error) =>{
    if (error) {
      console.error('Erro al conectar la base de datos', error);  
    }
    console.log('conectado a la base de datos');
});

