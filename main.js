document.addEventListener("DOMContentLoaded", function () {


const formLogin = document.getElementById("login");
const formRegistro = document.getElementById("registro");
const logoutBtn = document.getElementById("logout");

if (formRegistro) {
  formRegistro.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim().toLowerCase();
    const password = document.getElementById("contrasena").value;
    const error = document.getElementById("error");

    if (!usuario || !password) {
      error.textContent = "Completá todos los campos";
      return;
    }

    localStorage.setItem("usuario", usuario);
    localStorage.setItem("password", password);
    sessionStorage.setItem("usuario", usuario);

    window.location.href = "bienvenida.html";
  });
}

if (formLogin) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim().toLowerCase();
    const password = document.getElementById("contrasena").value;
    const error = document.getElementById("error");

    const usuarioGuardado = localStorage.getItem("usuario");
    const passwordGuardado = localStorage.getItem("password");

    if (usuario === usuarioGuardado && password === passwordGuardado) {
      sessionStorage.setItem("usuario", usuario);
      window.location.href = "bienvenida.html";
    } else {
      error.textContent = "Usuario o contraseña incorrectos";
    }
  });
}

const btnRegistro = document.getElementById("btnRegistro");

if (btnRegistro) {
  btnRegistro.addEventListener("click", function () {
    window.location.href = "registro.html";
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    sessionStorage.removeItem("usuario");
    window.location.href = "index.html";
  });
}


const toggleBtn = document.getElementById("tema");

  if (toggleBtn) {

    const temaGuardado = localStorage.getItem("tema");

    if (temaGuardado === "dark") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.add("light");
    }

    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      document.body.classList.toggle("light");

      if (document.body.classList.contains("dark")) {
        localStorage.setItem("tema", "dark");
      } else {
        localStorage.setItem("tema", "light");
      }
    });
  }






fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(data => {

    const contenedorTabla = document.getElementById("tabla-personas");

        let filtro = data.filter(usuario =>
      usuario.address.city === "McKenziehaven"
    );

    let tabla = document.createElement("table");

    tabla.innerHTML = `
      <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>Ciudad</th>
      </tr>
    `;

    filtro.forEach(usuario => {
      tabla.innerHTML += `
        <tr>
          <td>${usuario.name}</td>
          <td>${usuario.email}</td>
          <td>${usuario.address.city}</td>
        </tr>
      `;
    });

    contenedorTabla.appendChild(tabla);
  })
  .catch(error => console.log("Error:", error));

















/*   const contenedorTabla = document.getElementById("tabla-personas");

  if (contenedorTabla) {

    let intentosEntrada = [
      {nombre:"José", edad:20, tienePlata: false},
      {nombre:"María", edad:90, tienePlata: true},
      {nombre:"María José", edad:15, tienePlata: false},
      {nombre:"José María", edad:16, tienePlata: true},
    ];

    intentosEntrada.push({
      nombre: "Álvaro el Palito Pereira",
      edad: 40,
      tienePlata: true
    });

    intentosEntrada.unshift({
      nombre: "José José",
      edad: 78,
      tienePlata: true
    });
   
    
intentosEntrada.sort(function(a, b) {
  return a.nombre.localeCompare(b.nombre);
});

    let tabla = document.createElement("table");

    tabla.innerHTML = `
      <tr>
        <th>Nombre</th>
        <th>Edad</th>
        <th>Tiene plata</th>
        <th>¿Entra?</th>
      </tr>
    `;

    for (let i = 0; i < intentosEntrada.length; i++) {

      let persona = intentosEntrada[i];

      let entra = (persona.edad >= 18 && persona.tienePlata)
        ? "Sí"
        : "No";

      tabla.innerHTML += `
        <tr>
          <td>${persona.nombre}</td>
          <td>${persona.edad}</td>
          <td>${persona.tienePlata ? "Sí" : "No"}</td>
          <td>${entra}</td>
        </tr>
      `;
    }

    contenedorTabla.appendChild(tabla);
  } */

  /* menu del carriot */

  const menuContainer = document.getElementById("menu-tragos");
  const carritoLista = document.getElementById("carrito-lista");
  const totalTexto = document.getElementById("total");
  const btnPagar = document.getElementById("pagar");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const tragos = [
    { nombre: "Fernet (2x1)", precio: 450 },
    { nombre: "Cerveza sin limón", precio: 150 },
    { nombre: "Jagger con monster", precio: 450 },
    { nombre: "Gin", precio: 500 },
    { nombre: "Limón", precio: 50 }
  ];

  if (menuContainer) {

    tragos.forEach((trago, index) => {

      let div = document.createElement("div");

      div.innerHTML = `
        ${trago.nombre} - $${trago.precio}
        <button data-index="${index}" data-accion="agregar">Agregar</button>
        <button data-index="${index}" data-accion="eliminar">Eliminar</button>
      `;

      menuContainer.appendChild(div);
    });

    menuContainer.addEventListener("click", function (e) {

      if (e.target.tagName === "BUTTON") {

        let index = e.target.dataset.index;
        let accion = e.target.dataset.accion;
        let producto = tragos[index];

      if (accion === "agregar") {
    carrito.push(producto);

    Toastify({
    text: `Marcha un ${producto.nombre} para el señor, ¿algo más?`,
    duration: 2000,
    gravity: "top",
    position: "right"
  }).showToast();
}

        if (accion === "eliminar") {
          const posicion = carrito.findIndex(
            item => item.nombre === producto.nombre
          );

          if (posicion !== -1) {
            carrito.splice(posicion, 1);
          }
          
        }

        actualizarCarrito();
      }
    });
  }


function actualizarCarrito() {

  if (!carritoLista) return;

  carritoLista.innerHTML = "";

  let total = 0;
  let cantidadFernet = 0;

  carrito.forEach((item) => {

    let li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    carritoLista.appendChild(li);

    if (item.nombre.toLowerCase().includes("fernet")) {
      cantidadFernet++;
    } else {
      total += item.precio;
    }
  });

  // fenando 2x1
  if (cantidadFernet > 0) {
    const precioFernet = 450;
    const fernetQuePaga = Math.ceil(cantidadFernet / 2);
    total += fernetQuePaga * precioFernet;
  }

  totalTexto.textContent = `Total: $${total}`;

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

 if (btnPagar) {
  btnPagar.addEventListener("click", function () {

    if (carrito.length === 0) {
      
    Swal.fire({
    title: "¿Vas a llevar algo macho?",
    text: "¿O estás esperando broncearte con la bola de disco?",
    icon: "warning"
  });

      return;
  }

    Swal.fire({
    title: "Gracias por tu compra",
    text: "Que tengas una linda noche",
    icon: "success",
    confirmButtonText: "Aceptar"
});

      carrito = [];
      actualizarCarrito();
    });
  }

  actualizarCarrito();

});