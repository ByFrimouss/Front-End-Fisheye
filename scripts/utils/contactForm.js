function displayModal() {
  const modal = document.getElementById("contact_modal");
  console.log("[displayModal] Ouverture de la modale", modal);
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  console.log("[closeModal] Fermeture de la modale", modal);
  modal.style.display = "none";
}
