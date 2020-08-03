// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');






// Listeners
cargarEventListeners();
function cargarEventListeners() {
    // Dispara cuando se presiona el boton agregar carrito
    cursos.addEventListener('click', comprarCurso);

    // Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Al cargar el documento mostrar el localStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);

}








// Funciones

///Funcion que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();

    // console.log(e.target.classList);

    // Delegation para agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) {
        // console.log('SI');
        const curso = e.target.parentElement.parentElement;
        // console.log(curso);
        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso)
    }
}

/// Lee los datos del curso
function leerDatosCurso(cur) {
    // console.log(cur);
    const infoCurso = {
        imagen: cur.querySelector('img').src,
        texto: cur.querySelector('h4').textContent,
        precio: cur.querySelector('.precio span').textContent,
        id: cur.querySelector('a').getAttribute('data-id')
    };
    // console.log(infoCurso);

    insertarCarrito(infoCurso);
}

/// Muestra el curso seleccionado en el carrito
function insertarCarrito(infcur) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${infcur.imagen}" width=100>
        </td>
        <td>${infcur.texto}</td>
        <td>${infcur.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${infcur.id}">X</a>
        </td>
        
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(infcur);
}

/// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();
    // console.log('Eliminado');
    let curso;
    if(e.target.classList.contains('borrar-curso')) {
        // console.log(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.remove();
    }
}

/// Elimina todos los cursos del carrito en el DOM
function vaciarCarrito(e) {
    //Forma lenta
    // listaCursos.innerHTML = '';

    //Forma rapida y recomendada    
    while (listaCursos.firstChild) {
        // console.log(listaCursos.firstChild);
        listaCursos.removeChild(listaCursos.firstChild);
    }
    // console.log(listaCursos.firstChild);

    //Este return es para que cuando elimine los cursos con el boton no haga ese salto en la pagina
    return false;
    
}

///Almacena curso del carrito en LocalStorage
function guardarCursoLocalStorage(ls) {
    // console.log(ls);
    let cursos;
    
    // Toma el valor de una arreglo con datos de LS o vacio
    cursos = obtenerCursosLocalStorage();
    // console.log(cursos);

    // El cursos seleccionado se agrega al arreglo
    cursos.push(ls);

    localStorage.setItem('cursos', JSON.stringify(cursos));

}


/// Compreba que haya elementos en localStorage
function obtenerCursosLocalStorage() {
    let cursosLS;

    //Comprobamos si hay algo en localStorage
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

/// Imprime los cursos del local storage en el carrito
function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();
    // console.log(cursosLS);
    cursosLS.forEach(function(infcur){
        // Construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${infcur.imagen}" width=100>
            </td>
            <td>${infcur.texto}</td>
            <td>${infcur.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${infcur.id}">X</a>
            </td>
            
        `;
        listaCursos.appendChild(row);
    });
}