const name = document.getElementById("nombre");
const email = document.getElementById("email");
const age = document.getElementById("edad");
const phone = document.getElementById("Telefono");
const form = document.getElementById("form");
const date = document.getElementById("fecha");
const satisfaction = document.getElementById("nivel");
const knowUs = document.getElementById("conocido");

const modalData = document.getElementById("modalDatos");
const exitModal = document.getElementById("cerrarModal");
const modalname = document.getElementById("modalNombre");
const modalDate = document.getElementById("modalFecha");
const modalEmail = document.getElementById("modalEmail");
const modalPhone = document.getElementById("modalTelefono");
const modalAge = document.getElementById("modalEdad");
const modalGender = document.getElementById("modalGenero");
const modalKnownUS = document.getElementById("modalConocido");
const modalExperience = document.getElementById("modalExperiencia");


form.addEventListener("submit", function (event) {
  event.preventDefault();
  const gender = document.querySelector('input[name="Genero"]:checked');
  const knowUUser = knowUs.options[conocido.selectedIndex].text;
  const satisfactionUser = satisfaction.value;
  const nameUser = name.value;
  const emailUser = email.value;
  const ageUser = age.value;
  const phoneUser = phone.value;
  const genderUser = gender.value;
  const dateUser = date.value;
  switch (genderUser) {
    case "H":
      gender.value = "Hombre";
      break;
    case "M":
      gender.value = "Mujer";
      break;
    case "N":
      gender.value = "No binario";
      break;
    case "O":
      gender.value = "Otro";
      break;

    default:
      "No selcciono Genero";
  }

  const genderUserSelect = gender.value;

    modalname.textContent = nameUser;
    modalDate.textContent=dateUser;
    modalEmail.textContent=emailUser;
    modalAge.textContent=ageUser;
    modalPhone.textContent=phoneUser;
    modalGender.textContent=genderUserSelect;
    modalKnownUS.textContent=knowUUser;
    modalExperience.textContent=satisfactionUser;

    modalData.style.display = "block";


  exitModal.addEventListener("click", function (event) {
    modalData.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modalData) {
      modalData.style.display = "none";
    }
  });


  
});
