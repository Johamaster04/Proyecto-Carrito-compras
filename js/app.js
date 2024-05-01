const carrito = document.querySelector("#carrito");
let contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
  //Agregar cursos al apretar Agregar al carrito
  listaCursos.addEventListener("click", agregarCursos);

  //eliminar cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //Vaciar Carrito
  vaciarCarritoBtn.addEventListener('click', ()=>{
    articulosCarrito = [] // reseteamos el arreglo

    limpiarHTML()
  })
}

//Funciones

function agregarCursos(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
  }
}

//Funcion para eliminar Curso
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //elimina del arreglo del articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHtml(); //itera sobre el carrito y devuelve el HTML
  }
}

//Leer el Html del que dimos click y extraemos la info del curso
function leerDatosCurso(curso) {
  // console.log(curso)

  //crear objeto con contenido de curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector("span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //primero comprobamos si un elemento ya existe y simplemente le suma la cantidad
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe == true) {
    const curso = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // retorna el objeto duplicado
      } else {
        return curso; // retorna el curso que no esta duplicado en el carrito
      }
    });
    articulosCarrito = [...curso];
  } else {
    //Agregar articulos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);
  }
  carritoHtml();
}

//Muestra el carrito de compras en el HTMl
function carritoHtml() {
  //Limpiar el HTML
  limpiarHTML();

  //recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;

    const row = document.createElement("tr");
    row.innerHTML = `
    <td><img src="${imagen}" width="100"</td>
     <td>${titulo}</td>
     <td>${precio}</td>
     <td>${cantidad}</td>
     <td><a href="#" class="borrar-curso" data-id="${id}"> X </td>
    `;

    //agregando el HTML en el carrito
    contenedorCarrito.appendChild(row);
  });
}

//Limpia los cursos del tbody para agregar los nuevos
function limpiarHTML() {
  //Forma Lenta
  // contenedorCarrito.innerHTML = ''

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}