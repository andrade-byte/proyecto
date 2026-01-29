

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
  console.log(`Lamentablemente, ${nombre}, no podés pasar, aquí respetamos al fisco y no a los pobres`);
}

if (edad >= 18 && tienePlata) {
  bienvenida ();
} else {
  despedida ();
}

