function clickEliminar(id) {
  document.getElementById(
    "modal-msg",
  ).textContent = `Seguro quiere eliminar el usuario con ID ${id}?`;
  document.getElementById("aceptar-modal").href = `/admin/articulos/eliminar/${id}`;
}
