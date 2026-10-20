/* =====================================================================
   DATOS QUE DEBES EDITAR (todo lo demás funciona solo)
   ===================================================================== */

// Tu número de WhatsApp con código de país, sin + ni espacios. Ejemplo: "51987654321"
const WA = "51999999999";

// Número de Yape o Plin donde recibirás donaciones (se muestra en "Cómo ayudar")
const YAPE = "999 999 999";

// TRANSPARENCIA: a dónde va el dinero. t = descripción, p = porcentaje. La suma debe dar 100.
const DESTINO = [
  {t:"Alimentación y atención veterinaria", p:50},
  {t:"Rescates y adopciones", p:30},
  {t:"Costos del emprendimiento", p:20}
];

// TIENDA: un bloque por producto.
//   n = nombre | c = categoría (postres, articulos o kits) | p = precio en soles
//   d = descripción corta | i = nombre de la foto, que va en la carpeta img\productos\
// Para agregar un producto, copia una línea, cámbiale los datos y pon su foto en img\productos\
const PRODUCTOS = [
  {n:"Cheesecake de maracuyá", c:"postres", p:18, d:"Porción individual con base de galleta.", i:"cheesecake"},        // foto: img\productos\cheesecake.jpg
  {n:"Brownies patita (caja x4)", c:"postres", p:20, d:"Brownies con forma de huellita.", i:"brownies"},               // foto: img\productos\brownies.jpg
  {n:"Galletas huellitas (x6)", c:"postres", p:15, d:"Galletas decoradas a mano.", i:"galletas"},                      // foto: img\productos\galletas.jpg
  {n:"Cupcakes del rescate (x4)", c:"postres", p:22, d:"Con decoración de mascotas.", i:"cupcakes"},                   // foto: img\productos\cupcakes.jpg
  {n:"Tote bag Huellas", c:"articulos", p:25, d:"Bolsa de tela reutilizable.", i:"tote"},                              // foto: img\productos\tote.jpg
  {n:"Taza con causa", c:"articulos", p:28, d:"Taza de cerámica con diseño de huellas.", i:"taza"},                   // foto: img\productos\taza.jpg
  {n:"Pack de chapas y stickers", c:"articulos", p:10, d:"Ideal para regalar.", i:"stickers"},                         // foto: img\productos\stickers.jpg
  {n:"Kit de cuidado básico", c:"kits", p:45, d:"Plato, collar y juguete para tu mascota.", i:"kit-cuidado"},         // foto: img\productos\kit-cuidado.jpg
  {n:"Kit de bienvenida", c:"kits", p:60, d:"Para quien acaba de adoptar.", i:"kit-bienvenida"}                      // foto: img\productos\kit-bienvenida.jpg
];

// ADOPCIONES: un bloque por animal.
//   n = nombre | e = especie | edad | t = tamaño | h = historia corta | i = nombre de la foto (carpeta img\animales\)
const ANIMALES = [
  {n:"Canela", e:"Perra", edad:"2 años", t:"Mediana", h:"Cariñosa y juguetona. Busca una familia con patio o paseos diarios.", i:"canela"},  // foto: img\animales\canela.jpg
  {n:"Michi", e:"Gato", edad:"1 año", t:"Pequeño", h:"Tranquilo y sociable. Se lleva bien con niños.", i:"michi"},                             // foto: img\animales\michi.jpg
  {n:"Rocky", e:"Perro", edad:"4 años", t:"Grande", h:"Leal y obediente. Necesita un hogar con espacio.", i:"rocky"}                          // foto: img\animales\rocky.jpg
];

/* =====================================================================
   FUNCIONES AUXILIARES (no necesitas tocarlas)
   ===================================================================== */

// Atajo para buscar un elemento de la página por su selector
const $ = s => document.querySelector(s);

// Crea el enlace de WhatsApp con un mensaje ya escrito
const wa = m => "https://wa.me/" + WA + "?text=" + encodeURIComponent(m);

// Dibuja el recuadro de una foto. Si la foto no existe, se queda la huellita rosa
const img = (r, alt) => `<div class="ph"><img src="${r}" alt="${alt}" loading="lazy" onerror="this.remove()"></div>`;

/* =====================================================================
   TRANSPARENCIA, DONACIONES Y ENLACES DE WHATSAPP
   ===================================================================== */

// Las barras de porcentaje se dibujan en Inicio (#barras1) y en Cómo ayudar (#barras2)
const barras = DESTINO.map(d => `<div class="barra"><span>${d.t}<span>${d.p}%</span></span><i><b style="width:${d.p}%"></b></i></div>`).join("");
$("#barras1").innerHTML = barras; $("#barras2").innerHTML = barras;

// Número de Yape/Plin en "Cómo ayudar"
$("#yape").textContent = YAPE;

// Botones de voluntario, hogar temporal y contacto del pie de página
$("#waVol").href = wa("Hola, quiero ser voluntario en Huellas al rescate.");
$("#waHogar").href = wa("Hola, puedo ofrecer hogar temporal a un animal.");
$("#waPie").href = wa("Hola, quiero más información sobre Huellas al rescate.");

/* =====================================================================
   TIENDA: filtros y tarjetas de productos
   ===================================================================== */

// Nombres de los filtros que se ven en la tienda
const CATS = {todo:"Todo", postres:"Postres", articulos:"Artículos", kits:"Kits"};
let cat = "todo";   // filtro activo

// Dibuja los filtros y las tarjetas según el filtro activo
function pintarTienda() {
  $("#chips").innerHTML = Object.entries(CATS).map(([k, v]) => `<button class="chip${k === cat ? " on" : ""}" data-c="${k}">${v}</button>`).join("");
  $("#productos").innerHTML = PRODUCTOS.filter(p => cat === "todo" || p.c === cat).map(p => `
    <article class="card">${img("img/productos/" + p.i + ".jpg", p.n)}
      <div class="body"><h3>${p.n}</h3><p class="meta">${p.d}</p><span class="price">S/ ${p.p.toFixed(2)}</span>
      <a class="btn wa" target="_blank" rel="noopener" href="${wa("Hola, quiero pedir: " + p.n + " (S/ " + p.p + ")")}">Pedir por WhatsApp</a></div>
    </article>`).join("");
}

// Cuando se pulsa un filtro, se cambia la categoría y se vuelve a dibujar
$("#chips").addEventListener("click", e => { if (e.target.dataset.c) { cat = e.target.dataset.c; pintarTienda(); } });
pintarTienda();

/* =====================================================================
   ADOPCIONES: tarjetas de animales y formulario
   ===================================================================== */

// Tarjetas de los animales, cada una con su botón de WhatsApp
$("#animales").innerHTML = ANIMALES.map(a => `
  <article class="card">${img("img/animales/" + a.i + ".jpg", a.n)}
    <div class="body"><h3>${a.n}</h3><p class="meta">${a.e} · ${a.edad} · ${a.t}</p><p>${a.h}</p>
    <a class="btn" target="_blank" rel="noopener" href="${wa("Hola, quiero información para adoptar a " + a.n)}">Quiero adoptar a ${a.n}</a></div>
  </article>`).join("");

// Lista desplegable del formulario con los nombres de los animales
$("#selAnimal").innerHTML = ANIMALES.map(a => `<option>${a.n}</option>`).join("");

// Al enviar el formulario se abre WhatsApp con los datos escritos (no se guarda nada en internet)
$("#formAdop").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  window.open(wa(`Solicitud de adopción\nNombre: ${f.get("nombre")}\nCelular: ${f.get("cel")}\nAnimal: ${f.get("animal")}\nMotivo: ${f.get("motivo")}`), "_blank");
});

/* =====================================================================
   MENÚ: muestra una sola sección a la vez
   ===================================================================== */

// Nombres de las secciones. Deben coincidir con los href del menú y los data-v del HTML
const vistas = ["inicio", "tienda", "adopciones", "ayuda", "nosotros"];

// Muestra la sección que indica la dirección (#tienda, #ayuda...) y marca el menú activo
function ir() {
  let v = location.hash.slice(1);
  if (!vistas.includes(v)) v = "inicio";
  document.querySelectorAll(".view").forEach(s => s.classList.toggle("on", s.dataset.v === v));
  document.querySelectorAll("nav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + v));
  scrollTo(0, 0);
}
addEventListener("hashchange", ir); ir();
