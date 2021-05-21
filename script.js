const userList = ["admin", "gcamach0", "utch"];

const formHandler = () => {
  event.preventDefault();
  const [user, password] = getUserData();
  isUserValid = validateUser(user);
  appendPassword(isUserValid, password);
  triggerAnimation(isUserValid);
};

const validateUser = (username) => {
  if (!userList.includes(username)) return false;
  return true;
};

const getUserData = () => {
  return [
    document.getElementById("username").value,
    document.getElementById("pass").value,
  ];
};

const appendPassword = (isUserValid, password) => {
  if (!isUserValid) {
    alert("El usuario que ingresaste no tiene permiso");
    return;
  }
  const newParagraph = document.createElement("p");
  const enctryptedPassword = encryptPassword(password);
  newParagraph.textContent = enctryptedPassword;
  document.getElementById("passwordDump").appendChild(newParagraph);
};

const encryptPassword = (password) => {
  const encryptedPassword = CryptoJS.MD5(password);
  return encryptedPassword;
};

const triggerAnimation = (isUserValid) => {
  const button = document.getElementById("hiddenbutton");
  const originalClass = "" + button.className;

  if (isUserValid) {
    button.className += " showValid";
  } else {
    button.className += " showInvalid";
  }

  setTimeout(() => {
    button.className = originalClass;
  }, 2000);
};

document.getElementById("send-button").addEventListener("click", formHandler);
