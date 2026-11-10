function enviarPedido() {
  let nombre = document.getElementById("nombre").value;
  let direccion = document.getElementById("direccion").value;
  let producto = document.getElementById("milanesa").value;
  let cantidad = document.getElementById("cantidad").value;
  let bebida = document.getElementById("bebida").value;
  let pago = document.getElementById("pago").value;

  let mensaje = "Hola! Soy " + nombre + ", quiero hacer un pedido:\n" +
                "- " + cantidad + " x " + producto + "\n" +
                "bebida: " + bebida + "\n" +
                "Dirección: " + direccion + "\n" +
                "Pago: " + pago;

  let numero = "542995233259";
  let link = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje);
  window.open(link, "_blank");
}