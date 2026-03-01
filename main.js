document.addEventListener("DOMContentLoaded", function () {


  const form = document.getElementById("login");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const usuario = document.getElementById("usuario").value.trim().toLowerCase();
      const password = document.getElementById("contrasena").value;
      const error = document.getElementById("error");

      if (usuario === "coder" && password === "1234") {
        sessionStorage.setItem("usuario", usuario);
        window.location.href = "bienvenida.html";
      } else {
        error.textContent = "Usuario o contraseña incorrectos";
      }
    });
  }
  const logoutBtn = document.getElementById("logout");

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


  const contenedorTabla = document.getElementById("tabla-personas");

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
  }

  /* menu del carriot */

  const menuContainer = document.getElementById("menu-tragos");
  const carritoLista = document.getElementById("carrito-lista");
  const totalTexto = document.getElementById("total");
  const btnPagar = document.getElementById("pagar");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const tragos = [
    { nombre: "Fernet (hay 2x1)", precio: 450 },
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

      if (item.nombre === "Fernet 2x1") {
        cantidadFernet++;
      } else {
        total += item.precio;
      }
    });

    const precioFernet = 500;
    const fernetQuePaga = Math.ceil(cantidadFernet / 2);
    total += fernetQuePaga * precioFernet;

    totalTexto.textContent = `Total: $${total}`;

    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  if (btnPagar) {
    btnPagar.addEventListener("click", function () {

      const mensaje = document.getElementById("mensaje");

      if (carrito.length === 0) {
        mensaje.textContent = "El carrito está vacío";
        return;
      }

      mensaje.textContent = "¡Salud!";

      carrito = [];
      actualizarCarrito();
    });
  }

  actualizarCarrito();

});













