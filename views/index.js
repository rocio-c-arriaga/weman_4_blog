/** Este archivo se usará para poner funciones de ejemplo para llamadas asíncronas
 * Aunque no vienen pensadas en ejercicio original, es bueno pensarlas de una vez.
 */
function peticionAsync(tipo, url, parametros) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (ajax.status == 200) {
                //El resultado es exitoso!
                //Tomar las acciones necesarias aquí
                let resp = JSON.parse(ajax.responseText);
                if (resp.error == "0") {
                    if (url === '/comentarios') {
                        dibujaPublicaciones(resp.registros);
                    } else if (url === '/login') {
                        alert("bienvenido: " + resp.nombre);
                    }
                    //A partir de aquí tenemos que prepararnos para otras peticiones
                    //y manejarlas según el caso.
                    //Dado que tenemos la convención de que la propiedad "error" es omnipresente
                    //En todas las peticiones, podemos saber (sin importar la petición ) que fue
                    //Es de recordarse que es una CONVENCIÓN de trabajo, no una regla
                } else if (resp.error == "1") {
                    alert("Error de credenciales");
                }
            } else if (ajax.status == 404) {
                //No encontró el servicio o API
            } else {
                //Una respuesta inesperada por parte del servidor
                alert('Saliendo precipitadamente de la aldea por culpa de la escaces de rinocerontes');
            }
        }
    };
    //El tipo puede ser GET, POST, PUT, DELETE o cualquier tipo aceptado por HTTP
    //La URL es a dondo hará la petición...
    //Por último, el "true" indica que es una petición asíncrona
    ajax.open(tipo, url, true);
    //Se establece cómo será enviado el contenido.
    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //La función encodeURI se encarga que la petición tenga el formato adecuado para ser enviado...
    //un ejemplo de petición puede ser variable=valor&otravariable=otrovalor...
    ajax.send(encodeURI(parametros));
}

function leerPublicaciones() {
    peticionAsync('GET', '/comentarios', '');
}

function login() {
    var formulario = document.getElementById('frmLogin');
    peticionAsync('Post', '/login', 'usr' + formulario.usr.value + '&pwd=' + formulario.pwd.value);
}

function comentarios() {
    var formulario = document.getElementById('comentarios');
    peticionAsync('Post', '/publica', 'idusr=23&titulo=' + formulario.nombre.value + '&texto=' + formulario.contenido.value);
}

function dibujaPublicaciones(publis) {
    let contenedor = document.getElementById('publicaciones');
    for (let i = 0; i < publis.length; i++) {
        let nuevaPublicacion = '<div class="bloque">\
        <div class="texto">\
        <article>'+ publis[i].titulo + '</article><br>\
        <time>'+ publis[i].momento + '</time>\
        <p>'+ publis[i].contenido + '.</p>\
        <small>'+ publis[i].idusuario + '</small>\
        </div>\
        <div class="imgbloque">\
        <img class="foto_artículo" src="img/all.jpg"\
            alt="una imagen" title="group"><br>\
            </div>\
            </div>';
        contenedor.innerHTML += nuevaPublicacion;
    }
}
