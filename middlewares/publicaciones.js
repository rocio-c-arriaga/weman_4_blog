const dbcon = require('../models/db.js');

/** dameListado
 * 
 * @brief Lee las publicaciones y los devuelve en un arreglo JSON para que puedan ser proyectados por el front.
 * @param resp el objeto Response a donde va a escribir el resultado de lo obtenido.
 * @returns Escribe un objeto JSON con la propiedad "error" siendo "0" el estado exitoso, y un arreglo con los registros encontrados en la propiedad "registros".
 * 		En caso de existir algún error establece la propiedad "errmsg" con una pequeña leyenda descriptiva al respecto.
 * 
 */
const dameListado = (resp) => {
	let retval = {
		error: "99",
		errmsg: "Algo raro salió muy raro"
	};
	let qry = "select * from publicacion;";
	console.log("Entra a revisar las publicaciones...");
	dbcon.query(qry, (err, res, campos) => {
		if (err) {
			//Marcamos el error
			console.log(err + "\n:(");
			retval.error = "98";
			retval.errmssg = "Falló la consulta a las publicaciones";
		} else {
			retval.error = "0";
			retval.errmsg = "";
			retval.registros = res;
			console.log("Encontró " + res.length + " registros");
		}
		resp.json(retval);
	});
}
/** pub
 * 
 * @brief Publica un comentario, esta función debe ser llamada desde una petición POST en el router.
 * @param idusr El ID de usuario que está publicando. Requerido!
 * @param titulo El título que acompañará a la publicación.
 * @param txt El texto completo de la publicación.
 * @param resp El objeto Response donde se escribirá el resultado obtenido.
 * @returns Escribe un objeto JSON con la propiedad "error", siendo "0" su indicador de éxito.
 * 		En caso de existir algún error, establece la propiedad "errmsg" con una pequeña leyennda descriptiva.
 */
const pub = (idusr, titulo, txt, resp) => {
	let retval = {
		error: "99",
		errmsg: "Algo raro salió muy raro"
	};
	let qry = "insert into publicacion (idusuario, titulo, contenido) values ('"+idusr+"', '"+titulo+"', '"+txt+"');";
	dbcon.query(qry, (err, result) => {
		if (err) {
			retval.error = "98";
			retval.errmsg = "Problemas insertando registro...";
		} else {
			retval.error = "0";
			retval.errmsg = "";
		}
		resp.json(retval);
	});
};

module.exports = {
	leePublicaciones: (resp) => dameListado(resp),
	publica: (idusr, titulo, texto, resp) => pub(idusr, titulo, texto, resp)
}
