// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');







// Listeners
cargarEventListeners();
function cargarEventListeners() {
    // Dispara cuando se presiona el boton agregar carrito
    cursos.addEventListener('click', comprarCurso);
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
}