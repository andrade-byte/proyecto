

alert("Gusto en verte, quiero darte la bienvenida al bailongo");

const password = "1234";
let passwordIngresada = prompt("Seguramente te hayan dicho la contraseña...");

while (passwordIngresada !== password) { 
    passwordIngresada = prompt("De nuevo, tengo tiempo hasta que el while sea true");
}

let edad = Number(prompt("Qué bueno que sepas la clave, pero, ¿qué edad tenés?"));

while (Number.isNaN(edad) || edad <18) {
  edad = Number(prompt("O tu edad es un Nan o sos menor. Decime una edad válida."));
}

let nombre = (prompt("¿Cómo te llamás?"));

let respuestaPlata = prompt(`Solo para saber ${nombre}, por sí o por no, ¿trajiste plata?`).toLowerCase().trim();
let tienePlata = respuestaPlata === "si" || respuestaPlata === "sí";

function bienvenida () {
  console.log(`Pasá en confianza, ${nombre}, hay 2x1 en fernet`);
}

function despedida () {
  console.log(`Lamentablemente, ${nombre}, no podés pasar, por la plata baila el mono`);
}

if (edad >= 18 && tienePlata) {
  bienvenida ();
} else {
  despedida ();
}

console.log("De todos modos, te quería mostrar también un índice de toda la gente que ha intentado entrar, de su edad y de su situación financiera por si tenías la duda:");

let intentosEntrada = [
  {nombre:"José", edad:20, tienePlata: false},
  {nombre:"María", edad:90, tienePlata: true},
  {nombre:"María José", edad: 15, tienePlata: false},
  {nombre:"José María", edad: 16, tienePlata: true},
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

  //personasAdentro.sort ((a,b)=> a.localeCompare(b));

for (let i = 0; i < intentosEntrada.length; i++) {
  let persona = intentosEntrada[i];

  console.log(`${persona.nombre} tiene ${persona.edad} años y ` +
    (persona.tienePlata ? "tiene plata" : "no tiene plata")
  );
};

console.log("Esto quiere decir que:");

for (let i = 0; i < intentosEntrada.length; i++) {
  let personasAdentro = intentosEntrada[i];

  if (personasAdentro.edad >= 18 && personasAdentro.tienePlata) {
    console.log(`${personasAdentro.nombre} entró por ser mayor de edad y tener plata`);
  } else {
    console.log(`${personasAdentro.nombre} no entró por ser menor de edad y/o pobre`);
  }
};
