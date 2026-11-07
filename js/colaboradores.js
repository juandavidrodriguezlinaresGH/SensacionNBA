const color = document.getElementById("color");
const password = document.getElementById("clave");
const name = document.getElementById("nombre");
const form = document.getElementById("form");
const image = document.getElementById("foto");

const modalData = document.getElementById("modalDatos");
const exitModal = document.getElementById("cerrarModal");
const imagenPreview = document.getElementById("imagenPreview");
const modalname = document.getElementById("modalNombre");
const modalTextColor = document.getElementById("modalColorTexto");
const modalColorBox = document.getElementById("modalColorCaja");
const modalPassword = document.getElementById("modalClave");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const userColor = color.value;
  const userPassword = password.value;
  const nameUser = name.value;
  const userImage = image.files[0];

  if (!userImage) {
    alert("Debes Cargar Una imagen ");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
   
    imagenPreview.src = reader.result;
    modalname.textContent = nameUser;
    modalPassword.textContent=userPassword;
    modalTextColor.textContent = userColor;
    modalColorBox.style.backgroundColor = userColor;
    modalData.style.display = "block";
  };

  reader.readAsDataURL(userImage);

  exitModal.addEventListener("click", function (event) {
    modalData.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modalData) {
      modalData.style.display = "none";
    }
  });
});
