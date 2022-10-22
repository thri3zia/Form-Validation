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
function checkLengthPass(input, min) {
  if (input.value.length < min) {
    showError(input,'Your password must have 8 characters or more.');
  } else {
    showSuccess(input);
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input,'Please enter valid user name');
  } else if (input.value.length > max) {
    showError(input,'Please enter valid user name');
  } else {
    showSuccess(input);
  }
}

function checkName(input){
  const reg = /^[a-zA-z\.\-_Jr., Sr., II III]{1,30}$/i;
  if (reg.test(input.test(value).trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Please enter a valid name');
  }
}

// check passwords match

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//Check dob
  function getAge() {
  var warningAge = document.getElementById("age");
  var dateString = document.getElementById("dob").value;
  if (dateString != "") {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    var da = today.getDate() - birthDate.getDate();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (m < 0) {
      m += 12;
    }
    if (da < 0) {
      da += 30;
    }

    if (age < 18) {
      showSuccess(input,"Only 18 years old and above to create an account.");
    }else {
      showError(input,'Please enter valid number');
    } 
    }
    }

// Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2, dob, phone]);
  checkLength(username, 3, 15);
  checkName(username);
  checkLengthPass(password, 6);
  checkEmail(email);
  checkEmail(logEmail);
  getAge(dob);
  checkPhone(phone, 3, 11);
  checkLength(logPass, 3, 25);
  checkPasswordsMatch(password, password2);

});



