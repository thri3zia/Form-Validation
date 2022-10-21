const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const phone = document.getElementById('phone');
const dob = document.getElementById('dob');

// show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}
 
// show success message
function showSuccess(input) {
  formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//check email is valid
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Please enter a valid email');
  }
}

//check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//check input lenght
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input,'Please enter valid user name');
  } else if (input.value.length > max) {
    showError(input,'Please enter valid user name');
  } else {
    showSuccess(input);
  }
}




// check passwords match

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Your passwords do not match. Please try again');
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//Check dob
function onChangeDob (executionContext){
    var formContext=executionContext.getFormContext();
    var birthdate = formContext.getAttribute('dob').getValue();
    var today = new Date();
    var validMinDate = new Date(
        today.getFullYear()-18,
        today.getMonth(),
        today.getDate(),
        today.getHours(),
        today.getMinutes());
    var birthDateFieldControl = formContext.getControl('date');
    if (birthDateFieldControl){
        birthDateFieldControl.setNotification("Minimum Age must be 18 years.","BDATE");
    }

}

function checkPhone(input,min,max){
  const reg= /^(09|\+639)\d{9}$/;
    if (reg.test(input.value.trim())){
      showSuccess(input);
    }else {
      showError(input,'Please enter valid number');

    }
        
}

// Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2, dob, phone]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  onChangeDob(dob);
  checkPhone(phone, 3, 11);
  checkPasswordsMatch(password, password2);
});