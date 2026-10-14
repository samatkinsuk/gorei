// Mobile menu
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Artwork filters
const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    projectCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

// Accessible project detail dialog
const dialog = document.querySelector("#project-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogType = document.querySelector("#dialog-type");
const dialogDescription = document.querySelector("#dialog-description");
const dialogArt = document.querySelector("#dialog-art");
const dialogClose = document.querySelector("#dialog-close");
let lastProjectButton = null;

document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => {
    lastProjectButton = button;
    dialogTitle.textContent = button.dataset.title;
    dialogType.textContent = button.dataset.type;
    dialogDescription.textContent = button.dataset.description;
   

const art = document.createElement("div");
art.className = "project-image";

const img = document.createElement("img");
img.src = button.dataset.image;
img.alt = button.dataset.title;
img.onerror = () => {
  console.error("Could not load artwork:", img.src);
};

art.appendChild(img);
dialogArt.replaceChildren(art);


    dialog.showModal();
    document.body.classList.add("dialog-open");
    dialogClose.focus();
  });
});

function closeDialog() {
  dialog.close();
  document.body.classList.remove("dialog-open");
  if (lastProjectButton) lastProjectButton.focus();
}

dialogClose.addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
});

// Current copyright year
document.querySelector("#year").textContent = new Date().getFullYear();
