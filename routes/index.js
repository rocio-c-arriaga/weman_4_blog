const express = require('express');
const router = express.Router();
const ruta = require('path');
const appDir = ruta.dirname(require.main.filename);
const fs = require('fs');
const pubs = require('../middlewares/publicaciones.js');
const seg = require('../middlewares/cancervero.js');

/** Ruta: /
 * @brief Obtiene por default el index.html de la aplicación
 */
router.get('/', (pet, resp) => {
	const ppal = fs.readFileSync(appDir + '/views/index.html').toString('utf8');
	//Regresamos la página principal...
	resp.send(ppal);
});

/** Ruta: /comentarios
 * @brief Lee la lista de comentarios publicados en el blog.
 * @ref middlewares/publicaciones.js
 */
router.get('/comentarios', (pet, resp) => {
	//Aquí vamos a enviar los comentarios en formato JSON. Lo haremos de manera asíncrona.
	//Esperar el asíncrono...
	pubs.leePublicaciones(resp);
	/*
	console.log("Termina la ejecución de la función y dijo: ");
	console.log(res);
	resp.json(res);
*/
});

/** Ruta: /login
 * @brief Ejecuta la validación de usuario y contraseña. Esta ruta debe de llamarse a través del método POST
 * @ref middlewares/cancervero.js
 */
router.post('/login', (pet, resp) => {
	//Vamos a hacer la petición de entrada aquí...
	console.log("Petición de acceso para usuarios");
	let res = seg.valida(pet.body.usr, pet.body.pwd, resp);
});

/** Ruta: /publica
 * @brief Publica un comentario en la base de datos.
 * @ref middlewares/publicaciones.js
 */
router.post('/publica', (pet, resp) => {
	pubs.publica(pet.body.idusr, pet.body.titulo, pet.body.texto, resp);
});

module.exports = router;
