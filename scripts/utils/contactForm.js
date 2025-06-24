function displayModal() {
  const modal = document.getElementById("contact_modal");
  if (!modal) {
    console.error("[displayModal] Erreur : modale introuvable.");
    return;
  }
  modal.style.display = "block";
  console.log("[displayModal] Modale affichée");
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  if (!modal) {
    console.error("[closeModal] Erreur : modale introuvable.");
    return;
  }
  modal.style.display = "none";
  console.log("[closeModal] Modale fermée");
}
