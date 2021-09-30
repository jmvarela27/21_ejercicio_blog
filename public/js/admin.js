document.addEventListener("click", (e) => {
  // Cerrar modal
  if (e.target.matches("#cancelar-modal") || e.target.matches("#dark-background")) {
    document.getElementById("dark-background").classList.remove("show");
    document.getElementById("modal-box").classList.remove("show");
    document.querySelector("#contenido-sin-modal").classList.remove("blur-background");
  }
});

function clickEliminar(id) {
  document.getElementById(
    "modal-msg",
  ).textContent = `Seguro quiere eliminar el usuario con ID ${id}`;
  document.getElementById("aceptar-modal").href = `/admin/articulos/eliminar/${id}`;

  document.getElementById("dark-background").classList.add("show");
  document.getElementById("modal-box").classList.add("show");
  document.querySelector("#contenido-sin-modal").classList.add("blur-background");
}
