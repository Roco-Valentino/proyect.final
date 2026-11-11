// Arma el mensaje del pedido con los datos del formulario y lo abre en WhatsApp.
// Se llama desde el atributo onsubmit del <form> de pedidos.html.
function enviarPedido() {
  // Lee el valor (lo que escribió o eligió el usuario) de cada campo, usando su id.
  let nombre = document.getElementById("nombre").value;
  let direccion = document.getElementById("direccion").value;
  let telefono = document.getElementById("telefono").value;
  let producto = document.getElementById("milanesa").value;
  let cantidad = document.getElementById("cantidad").value;
  let bebida = document.getElementById("bebida").value;
  let pago = document.getElementById("pago").value;

  // Arma el texto del mensaje uniendo los datos con "+".
  // "\n" es un salto de línea, así el mensaje se ve ordenado en WhatsApp.
  let mensaje = "Hola! Soy " + nombre + ", quiero hacer un pedido:\n" +
                "- " + cantidad + " x " + producto + "\n" +
                "bebida: " + bebida + "\n" +
                "Dirección: " + direccion + "\n" +
                "Teléfono: " + telefono + "\n" +
                "Pago: " + pago;

  // Número del restaurante, en formato internacional sin el "+".
  let numero = "542995233259";
  // encodeURIComponent convierte el texto en formato seguro para una URL (espacios, saltos de línea, tildes).
  let link = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje);
  // Abre el link en una pestaña nueva ("_blank"), que lleva a WhatsApp con el mensaje ya escrito.
  window.open(link, "_blank");
}
