var inputName = document.querySelector (".input__field[name='name']");
var inputWeight = document.querySelector (".input__field[name='weight']");
var inputAge = document.querySelector (".input__field[name='age']");
var inputPhone = document.querySelector (".input__field[name='phone']");
var inputEmail = document.querySelector (".input__field[name='email']");
var btn = document.querySelector(".form-choice__btn");

btn.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (!inputName.value) {
    inputName.classList.add("input__field--error");
    console.log("Нужно заполнить все поля");
  }
  else { delError(inputName)}

  if (!inputWeight.value) {
    inputWeight.classList.add("input__field--error");
    console.log("Нужно заполнить все поля");
  }

  else { delError(inputWeight)}

  if (!inputAge.value) {
    inputAge.classList.add("input__field--error");
    console.log("Нужно заполнить все поля");
  }

  else { delError(inputAge)}

  if (!inputPhone.value) {
    inputPhone.classList.add("input__field--error");
    console.log("Нужно заполнить все поля");
  }

  else { delError(inputPhone)}

  if (!inputEmail.value) {
    inputEmail.classList.add("input__field--error");
    console.log("Нужно заполнить все поля");
  }

  else { delError(inputEmail)}
});

function delError (input) {
  if ( input.classList.contains("input__field--error") )
  {
    input.classList.remove("input__field--error");
  }
}
