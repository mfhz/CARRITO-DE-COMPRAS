// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');







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
    if (e.target.classList.contains('agregar-carrito')) {
        // console.log('SI');
        const curso = e.target.parentElement.parentElement;
        // console.log(curso);
        leerDatosCurso(curso)
    }
}

// Lee los datos del curso
function leerDatosCurso(cur) {
    console.log(cur);
}