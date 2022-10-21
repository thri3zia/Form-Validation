const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const phone = document.getElementById('phone');
const dob = document.getElementById('dob');
const logEmail = document.getElementById('logEmail');
const logPass = document.getElementById('logPass');


// show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}
 
// show success message
function showSuccess(input) {
  alert("Form Succesfully Submitted");
  window.location.reload();
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

// jQuery.validator.addMethod("name_regex", function(value, element) {
//   return this.optional(element) || /^[a-zA-z\.\-_Jr., Sr., II III]{1,30}$/i.test(value);

// }, "No special characters");




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
      alert("Only 18 years old and above to create an account.");
    }
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

  if ($('#myCheck').is(':checked')) {
    //Check if checkbox is checked then show modal
      $('#myModal').modal('show');
    }

  checkRequired([username, email, password, password2, dob, phone]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkEmail(logEmail);
  getAge(dob);
  checkPhone(phone, 3, 11);
  checkLength(logPass, 3, 25);
  checkPasswordsMatch(password, password2);
});

$('#myForm').on('submit', function(e) {
  
  e.preventDefault(); //stop submit
  
  if ($('#myCheck').is(':checked')) {
  //Check if checkbox is checked then show modal
    $('#myModal').modal('show');
  }
});