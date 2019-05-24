var driver = require('mysql');

/** dbcon
 * 
 * @brief Gestiona la conexión a la base de datos, es un objeto del controlador de MySQL.
 * @returns (void)
 */
var dbcon = driver.createConnection({
	host: 'lab.achichincle.net',
	user: 'usrwblog',
	password: 'w3m4nc0NN3ct',
	database: 'wemanblog',
	port: 3714
});

module.exports = dbcon;
