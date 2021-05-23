/*
 ** Lista de usuarios con permitidos
 */
const userList = ["admin", "gcamach0", "utch"];

/*
 ** formaHandler es la funcion que manda llamar el event listener en el boton de enviar del formulario.
 ** La funcionalidad de la funcion esta dividida en otras funciones siguiendo el principio de responsabilidad única.
 ** El orden de las acciones realizadas por la funcion es:
 ** 1.- Prevenir el comportamiento por defecto de el boton (que se recargue la pagina).
 ** 2.- Obtener el nombre de usuario y contraseña del formulario y almacenarlos en una constante.
 ** 3.- Validar que los datos ingresados por el usuario cumplan con las condiciones necesarias.
 ** 4.- Generar un elemento paragraph y agregarle la contraseña encriptada como su contenido.
 ** 5.- Revelar una animacion que retroalimenta al usuario sobre el resultado de su petición.
 */
const formHandler = () => {
  event.preventDefault();
  const [user, password] = getUserData();
  const isDataValid = validateData(user, password);
  appendPassword(isDataValid, password);
  triggerAnimation(isDataValid);
};

/*
 ** validateData es la funcion que valida que:
 ** 1.- El nombre de usuario ingresado se encuentre dentro de la lista de nombres validos.
 ** 2.- Que el campo de contraseña no este vacio.
 */
const validateData = (username, password) => {
  if (!userList.includes(username)) return false;
  if (password == "") return false;
  return true;
};

/*
 ** getUserData es la función que se encarga de obtener los valores de usuario y contraseña del html.
 */
const getUserData = () => {
  return [
    document.getElementById("username").value,
    document.getElementById("pass").value,
  ];
};

/*
 ** appendPassword es la función que se encarga de:
 ** 1.- Generar un elemento paragraph.
 ** 2.- Encriptar la contraseña.
 ** 3.- Asignar la contraseña encriptada como contenido del paragraph generado.
 ** 4.- Agregar el pargraph a el dom.
 */
const appendPassword = (isUserValid, password) => {
  if (!isUserValid) {
    return;
  }
  const newParagraph = document.createElement("p");
  const enctryptedPassword = encryptPassword(password);
  newParagraph.textContent = enctryptedPassword;
  document.getElementById("passwordDump").appendChild(newParagraph);
};

/*
 ** encryptPassword es la función que se encarga de encriptar la contraseña y retornar la nueva contraseña generada.
 */
const encryptPassword = (password) => {
  const encryptedPassword = CryptoJS.MD5(password);
  return encryptedPassword;
};

/*
 ** triggerAnimation es la función que se encarga de manipular las clases que ya estan creadas en css para generar animaciones
 ** que retroalimentan al usuario sobre el resultado de su petición.
 ** Dos segundos despues, se resetean las clases.
 */
const triggerAnimation = (isUserValid) => {
  const button = document.getElementById("hiddenbutton");
  const originalClass = "" + button.className;

  assignAnimationIcon(isUserValid);

  if (isUserValid) {
    button.className += " showValid";
  } else {
    button.className += " showInvalid";
  }

  setTimeout(() => {
    button.className = originalClass;
  }, 2000);
};

/*
 ** encryptPassword es la función que se encarga de decidir que icono que usara la animación del formulario,
 ** basandose en el valor generado por la función validateData.
 */
const assignAnimationIcon = (isUserValid) => {
  const icon = document.getElementById("animationIcon");
  if (isUserValid) {
    icon.className = "fas fa-check";
  } else {
    icon.className = "fas fa-times";
  }
};

/*
 ** Se "bindea" la función formHanlder al boton del formulario.
 */
document.getElementById("send-button").addEventListener("click", formHandler);
