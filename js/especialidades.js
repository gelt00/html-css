(() => {
  "use strict";

  const KEY_CART = "pcafe_cart_v1";
  const IVA = 0.16;

  // Catálogo básico de productos
  const PRODUCTOS = [
    { id: 101, nombre: "Latte", precio: 48 },
    { id: 102, nombre: "Capuccino", precio: 52 },
    { id: 201, nombre: "Pastel", precio: 65 },
    { id: 202, nombre: "Brownie", precio: 58 },
  ];

  // Inciar carrito con arreglo vacío
  let carrito = [];

  //Guardar y cargar el carrito (localStorage y json)
  function cargar() {
    const raw = localStorage.getItem(KEY_CART);
    carrito = raw ? JSON.parse(raw) : [];
  }
  function guardar() {
    localStorage.setItem(KEY_CART, JSON.stringify(carrito));
  }

  //Lista de funciones princiapales
  function listarProductos() {
    console.table(PRODUCTOS);
    alert("Catálogo mostrado en la consola.");
  }

  function agregarAlCarrito(id, qty) {
    if (id == null) id = Number(prompt("ID del producto:"));
    if (qty == null) qty = Number(prompt("Cantidad:"));

    if (!Number.isInteger(id) || !Number.isInteger(qty) || qty <= 0) {
      alert("Datos inválidos. Usa enteros (ej. id=101, cantidad=1).");
      return;
    }

    const prod = PRODUCTOS.find((p) => p.id === id);
    if (!prod) return alert("Producto no encontrado.");

    const i = carrito.findIndex((it) => it.id === id);
    if (i === -1) carrito.push({ id, qty });
    else carrito[i].qty += qty;

    guardar();
    alert(`Agregado: ${prod.nombre} x ${qty}`);
  }

  function eliminarDelCarrito(id) {
    if (id == null) {
      id = prompt("ID a eliminar:");
      if (id === null) return;
      id = Number(id);
    }
    if (isNaN(id)) {
      return alert("Por favor ingresa un número válido.");
    }
    const i = carrito.findIndex((it) => it.id === id);
    if (i === -1) return alert("Ese producto no está en el carrito.");
    carrito.splice(i, 1);
    guardar();
    alert("Producto eliminado.");
  }

  function mostrarCarrito() {
    if (carrito.length === 0) return alert("Carrito vacío.");

    const filas = [];
    let subtotal = 0;

    for (const item of carrito) {
      const p = PRODUCTOS.find((x) => x.id === item.id);
      if (!p) continue;
      const st = p.precio * item.qty;
      subtotal += st;
      filas.push({
        id: p.id,
        nombre: p.nombre,
        precio: p.precio.toFixed(2),
        cantidad: item.qty,
        subtotal: st.toFixed(2),
      });
    }

    console.table(filas);
    const iva = subtotal * IVA;
    const total = subtotal + iva;
    console.log(
      `Subtotal: $${subtotal.toFixed(2)} | IVA: $${iva.toFixed(
        2
      )} | Total: $${total.toFixed(2)}`
    );
    alert("Desglose de productos en carritpo.");
  }

  function vaciarCarrito() {
    if (confirm("¿Vaciar carrito?")) {
      carrito = [];
      guardar();
      alert("Carrito vacío.");
    }
  }

  function checkout() {
    if (carrito.length === 0) return alert("Agrega productos antes de pagar.");
    if (!confirm("¿Confirmar compra (simulada)?")) return;
    carrito = [];
    guardar();
    alert("Compra simulada OK. Carrito limpiado.");
  }

  function menu() {
    cargar();
    let op;
    do {
      op = prompt(
        [
          "Carrito de compra de Pausa y Café",
          "1) Listar productos",
          "2) Agregar al carrito",
          "3) Eliminar del carrito",
          "4) Ver carrito",
          "5) Vaciar carrito",
          "6) Checkout",
          "0) Salir",
        ].join("\n")
      );
      if (op === null) break;

      switch (op.trim()) {
        case "1":
          listarProductos();
          break;
        case "2":
          agregarAlCarrito();
          break;
        case "3":
          eliminarDelCarrito();
          break;
        case "4":
          mostrarCarrito();
          break;
        case "5":
          vaciarCarrito();
          break;
        case "6":
          checkout();
          break;
        case "0":
          alert("¡Hasta luego!");
          break;
        default:
          alert("Opción no válida.");
      }
    } while (op !== "0");
  }

  function ayuda() {
    console.log(`
Comandos:
- Carrito.menu()
- Carrito.listarProductos()
- Carrito.agregarAlCarrito(id, qty)
- Carrito.eliminarDelCarrito(id)
- Carrito.mostrarCarrito()
- Carrito.vaciarCarrito()
- Carrito.checkout()
`);
    alert("Detalle de comandos en la consola.");
  }

  cargar();
  window.Carrito = {
    menu,
    ayuda,
    listarProductos,
    agregarAlCarrito,
    eliminarDelCarrito,
    mostrarCarrito,
    vaciarCarrito,
    checkout,
  };
  console.log("Carrito listo. Usa Carrito.menu() o Carrito.ayuda() .");
})();
