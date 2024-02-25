const LIST_PEOPLE = JSON.parse(localStorage.getItem("listPeople")) || [];

const setListPeople = () => {
  return localStorage.setItem("listPeople", JSON.stringify(LIST_PEOPLE));
};

const formData = () => {
  const email = document.getElementById("iputEmail1").value;
  const name = document.getElementById("inputName").value;
  const phone = document.getElementById("inputTelefono").value;

  return {
    email,
    name,
    phone,
  };
};

const clearData = () => {
  document.getElementById("btnAdd").style.display = "block";
  document.getElementById("btnUpdate").style.display = "none";
  document.getElementById("iputEmail1").value = "";
  document.getElementById("inputName").value = "";
  document.getElementById("inputTelefono").value = "";
};

const validateForm = () => {
  const { email, name, phone } = formData();
  if (email === "" || name === "" || phone === "") {
    alert("Los 3 campos son Obligatorios");
    return;
  }
  if (!email.includes("@")) {
    alert("el campo de correo debe incluir un @");
    return;
  }

  return true;
};

const readData = () => {
  let html = "";

  LIST_PEOPLE.forEach((element, index) => {
    html += "<tr>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.phone + "</td>";
    html +=
      '<td> <button class="btn btn-warning" onclick=updateData(' +
      index +
      ')>Actualizar Dato</button> <button class="btn btn-danger" onclick=deleteData(' +
      index +
      ")>Eliminar Dato</button>  </td>";
    html += "</tr>";
  });

  document.getElementById("tableData").innerHTML = html;
};

const addData = () => {
  if (validateForm()) {
    const { email, name, phone } = formData();

    LIST_PEOPLE.push({
      email,
      name,
      phone,
    });
    clearData();
    setListPeople();
    readData();
  }
};

document.onload = readData();

const updateData = (index) => {
  const buttonAdd = document.getElementById("btnAdd");
  const buttonUpdate = document.getElementById("btnUpdate");
  const find = LIST_PEOPLE[index];
  document.getElementById("iputEmail1").value = find.email;
  document.getElementById("inputName").value = find.name;
  document.getElementById("inputTelefono").value = find.phone;

  buttonAdd.style.display = "none";
  buttonUpdate.style.display = "block";

  buttonUpdate.onclick = () => {
    if (validateForm()) {
      const { email, name, phone } = formData();
      find.email = email;
      find.name = name;
      find.phone = phone;
      setListPeople();
      clearData();
    }
  };
};

const deleteData = (index) => {
  LIST_PEOPLE.splice(index, 1);
  setListPeople();
  clearData();
  readData();
};
