const slug = n => n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
/* =====================================================================
   PARTE 1: DATOS QUE DEBES EDITAR (todo lo demás funciona solo)
   ===================================================================== */

// WHATSAPP: escribe tu número con código de país, sin + ni espacios. Ejemplo: "51987654321"
// A este número llegan los pedidos, las solicitudes de adopción y los mensajes.
const WA = "51999999999";

// YAPE / PLIN: el número que se muestra en "Cómo ayudar" para recibir donaciones.
const YAPE = "999 999 999";

// IMÁGENES GENERALES (los archivos van dentro de la carpeta img)
const IMAGENES = {
  logo: "logo.png",   // AQUÍ COLOCA EL NOMBRE DE TU LOGO (arriba a la izquierda). Archivo en: img\
  hero: "hero.jpg"    // AQUÍ COLOCA EL NOMBRE DE LA FOTO DE PORTADA (la grande de Inicio). Archivo en: img\
};

// TRANSPARENCIA: a dónde va el dinero de las ventas. Se ve en Inicio y en Cómo ayudar.
// t = lo que se financia | p = porcentaje. Los porcentajes deben sumar 100.
const DESTINO = [
  {t: "Alimentación y atención veterinaria", p: 50},
  {t: "Rescates y adopciones", p: 30},
  {t: "Costos del emprendimiento", p: 20}
];

// PRODUCTOS DE LA TIENDA: un bloque por producto. Las fotos van en la carpeta img\productos\
// Para agregar un producto, copia un bloque completo, pégalo antes del "];" y cambia sus datos.
const PRODUCTOS = [
  // ---- EJEMPLO EXPLICADO: así se lee cada campo ----
  {
    n: "Cheesecake de maracuyá",                  // NOMBRE: lo que se ve como título de la tarjeta
    c: "postres",                                 // CATEGORÍA: "postres", "articulos" o "kits" (sirve para los filtros)
    p: 18,                                        // PRECIO en soles, solo el número (sin S/)
    d: "Porción individual con base de galleta.", // DESCRIPCIÓN corta, debajo del nombre
    i: "cheesecake.jpg"                           // AQUÍ COLOCA EL NOMBRE DE TU IMAGEN (con extensión). Archivo en: img\productos\
  },
  // ---- DEMÁS PRODUCTOS: mismo orden (nombre, categoría, precio, descripción, imagen) ----
  {n: "Brownies patita (caja x4)", c: "postres", p: 20, d: "Brownies con forma de huellita.", i: "brownies.jpg"},               // <- aquí el nombre de la imagen
  {n: "Galletas huellitas (x6)", c: "postres", p: 15, d: "Galletas decoradas a mano.", i: "galletas.jpg"},                      // <- aquí el nombre de la imagen
  {n: "Cupcakes del rescate (x4)", c: "postres", p: 22, d: "Con decoración de mascotas.", i: "cupcakes.jpg"},                   // <- aquí el nombre de la imagen
  {n: "Tote bag Huellas", c: "articulos", p: 25, d: "Bolsa de tela reutilizable.", i: "tote.jpg"},                              // <- aquí el nombre de la imagen
  {n: "Taza con causa", c: "articulos", p: 28, d: "Taza de cerámica con diseño de huellas.", i: "taza.jpg"},                   // <- aquí el nombre de la imagen
  {n: "Pack de chapas y stickers", c: "articulos", p: 10, d: "Ideal para regalar.", i: "stickers.jpg"},                         // <- aquí el nombre de la imagen
  {n: "Kit de cuidado básico", c: "kits", p: 45, d: "Plato, collar y juguete para tu mascota.", i: "kit-cuidado.jpg"},         // <- aquí el nombre de la imagen
  {n: "Kit de bienvenida", c: "kits", p: 60, d: "Para quien acaba de adoptar.", i: "kit-bienvenida.jpg"}                       // <- aquí el nombre de la imagen
];

// ANIMALES EN ADOPCIÓN: un bloque por animal. Las fotos van en la carpeta img\animales\
// Para agregar un animal, copia un bloque completo, pégalo antes del "];" y cambia sus datos.
const ANIMALES = [
  // ---- EJEMPLO EXPLICADO: así se lee cada campo ----
  {
    n: "Canela",                                                              // NOMBRE del animal (título de la tarjeta)
    e: "Perra",                                                               // ESPECIE o sexo: Perro, Perra, Gato, Gata...
    edad: "2 años",                                                           // EDAD
    t: "Mediana",                                                             // TAMAÑO: Pequeño, Mediano, Grande
    h: "Cariñosa y juguetona. Busca una familia con patio o paseos diarios.", // HISTORIA corta: carácter y qué hogar necesita
    i: "canela.jpg"                                                           // AQUÍ COLOCA EL NOMBRE DE TU IMAGEN (con extensión). Archivo en: img\animales\
  },
  // ---- DEMÁS ANIMALES: mismo orden (nombre, especie, edad, tamaño, historia, imagen) ----
  {n: "Michi", e: "Gato", edad: "1 año", t: "Pequeño", h: "Tranquilo y sociable. Se lleva bien con niños.", i: "michi.jpg"},        // <- aquí el nombre de la imagen
  {n: "Rocky", e: "Perro", edad: "4 años", t: "Grande", h: "Leal y obediente. Necesita un hogar con espacio.", i: "rocky.jpg"}      // <- aquí el nombre de la imagen
];

/* =====================================================================
   PARTE 2: FUNCIONES AUXILIARES (no necesitas tocarlas)
   ===================================================================== */

// Atajo para buscar un elemento de la página por su selector
const $ = s => document.querySelector(s);

// Crea el enlace de WhatsApp con un mensaje ya escrito
const wa = m => "https://wa.me/" + WA + "?text=" + encodeURIComponent(m);

// Si el nombre de la foto no trae extensión, le agrega .jpg. Si la trae (ejemplo: "torta.png"), la respeta
const conExt = n => /\.\w+$/.test(n) ? n : n + ".jpg";

// Dibuja el recuadro de una foto. Si el archivo no existe, se queda la huellita de relleno
const img = (r, alt) => `<div class="ph"><img src="${r}" alt="${alt}" loading="lazy" onerror="this.remove()"></div>`;

/* =====================================================================
   PARTE 3: IMÁGENES GENERALES, TRANSPARENCIA Y ENLACES DE WHATSAPP
   ===================================================================== */

// Pone el logo y la foto de portada según la lista IMAGENES de arriba
const logoEl = $("#logoImg"), heroEl = $("#heroImg");
if (logoEl) { logoEl.onload = () => { const t = $(".logo .nombre"); if (t) t.hidden = true; }; logoEl.src = "img/" + IMAGENES.logo; }
if (heroEl) heroEl.src = "img/" + IMAGENES.hero;

// Dibuja las barras de porcentaje en Inicio (#barras1) y en Cómo ayudar (#barras2)
const barras = DESTINO.map(d => `<div class="barra"><span>${d.t}<span>${d.p}%</span></span><i><b style="width:${d.p}%"></b></i></div>`).join("");
$("#barras1").innerHTML = barras; $("#barras2").innerHTML = barras;

// Muestra el número de Yape/Plin en "Cómo ayudar"
$("#yape").textContent = YAPE;

// Botones de voluntario, hogar temporal y contacto del pie de página (abren WhatsApp)
$("#waVol").href = wa("Hola, quiero ser voluntario en Huellas al rescate.");
$("#waHogar").href = wa("Hola, puedo ofrecer hogar temporal a un animal.");
$("#waPie").href = wa("Hola, quiero más información sobre Huellas al rescate.");

/* =====================================================================
   PARTE 4: TIENDA (filtros y tarjetas de productos)
   ===================================================================== */

// Nombres de los filtros que se ven en la tienda. Cada clave coincide con la categoría (c) de los productos
const CATS = {todo: "Todo", postres: "Postres", articulos: "Artículos", kits: "Kits"};
let cat = "todo";   // filtro activo

// Dibuja los filtros y las tarjetas según el filtro activo
function pintarTienda() {
  $("#chips").innerHTML = Object.entries(CATS).map(([k, v]) => `<button class="chip${k === cat ? " on" : ""}" data-c="${k}">${v}</button>`).join("");
  $("#productos").innerHTML = PRODUCTOS.filter(p => cat === "todo" || p.c === cat).map(p => `
    <article class="card">${img("img/productos/" + conExt(p.i), p.n)}
      <div class="body"><h3>${p.n}</h3><p class="meta">${p.d}</p><span class="price">S/ ${p.p.toFixed(2)}</span>
      <a class="btn wa" target="_blank" rel="noopener" href="${wa("Hola, quiero pedir: " + p.n + " (S/ " + p.p + ")")}">Pedir por WhatsApp</a></div>
    </article>`).join("");
}

// Al pulsar un filtro, se cambia la categoría y se vuelve a dibujar la tienda
$("#chips").addEventListener("click", e => { if (e.target.dataset.c) { cat = e.target.dataset.c; pintarTienda(); } });
pintarTienda();

/* =====================================================================
   PARTE 5: ADOPCIONES (tarjetas de animales y formulario)
   ===================================================================== */

// Tarjetas de los animales, cada una con su botón de WhatsApp
$("#animales").innerHTML = ANIMALES.map(a => `
  <article class="card">${img("img/animales/" + conExt(a.i), a.n)}
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
   PARTE 6: MENÚ (muestra una sola sección a la vez)
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
