function showRegistrationForm() {
    const userType = document.getElementById('userType').value;
    const userTypeForm = document.getElementById('userTypeForm');
    const registrationForm = document.getElementById('registrationForm');
    const userTypeDisplay = document.getElementById('userTypeDisplay');

    userTypeForm.style.display = 'none';
    registrationForm.style.display = 'block';

    // نمایش نوع کاربر انتخابی
    userTypeDisplay.innerText = `نوع کاربر: ${userType}`;
    userTypeDisplay.style.display = 'block';

    // Show or hide fields based on user type
    toggleFields(userType);
}

function goBackToUserType() {
    const userTypeForm = document.getElementById('userTypeForm');
    const registrationForm = document.getElementById('registrationForm');

    userTypeForm.style.display = 'block';
    registrationForm.style.display = 'none';

    // Reset user type display
    document.getElementById('userTypeDisplay').style.display = 'none';
    document.getElementById('userType').value = '';
}

function toggleFields(userType) {
    const studentIDGroup = document.getElementById('studentIDGroup');
    const employeeIDGroup = document.getElementById('employeeIDGroup');
    const nationalIDGroup = document.getElementById('nationalIDGroup');
    const facultyGroup = document.getElementById('facultyGroup');
    const majorGroup = document.getElementById('majorGroup');

    studentIDGroup.style.display = userType === 'student' ? 'block' : 'none';
    employeeIDGroup.style.display = userType === 'professor' || userType === 'staff' ? 'block' : 'none';
    nationalIDGroup.style.display = userType === 'staff' ? 'block' : 'none';
    facultyGroup.style.display = userType === 'student' ? 'block' : 'none';
    majorGroup.style.display = userType === 'student' ? 'block' : 'none';

    validateAllFields();
}

function validateInput(input, regex, min, max) {
    const errorMessageElement = document.getElementById(input.id + 'Error');
    if (!regex.test(input.value)) {
        errorMessageElement.innerText = getErrorMessage(input.id, false);
        input.classList.add('invalid');
        input.classList.remove('valid');
    } else if (input.value.length < min || input.value.length > max) {
        errorMessageElement.innerText = getErrorMessage(input.id, true);
        input.classList.add('invalid');
        input.classList.remove('valid');
    } else {
        errorMessageElement.innerText = '';
        input.classList.add('valid');
        input.classList.remove('invalid');
    }
    validateAllFields();
}

function validatePassword() {
    const password = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    
    if (!regex.test(password.value)) {
        passwordError.innerText = "باید بین 8 تا 20 کاراکتر باشد.";
        password.classList.add('invalid');
        password.classList.remove('valid');
    } else {
        passwordError.innerText = '';
        password.classList.add('valid');
        password.classList.remove('invalid');
    }
    validateConfirmPassword();
    validateAllFields();
}

function validateConfirmPassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    if (confirmPassword.value !== password) {
        confirmPasswordError.innerText = "با رمز عبور اصلی مطابقت ندارد.";
        confirmPassword.classList.add('invalid');
        confirmPassword.classList.remove('valid');
    } else {
        confirmPasswordError.innerText = '';
        confirmPassword.classList.add('valid');
        confirmPassword.classList.remove('invalid');
    }
    validateAllFields();
}

function validateAllFields() {
    const inputs = document.querySelectorAll('input');
    const submitButton = document.getElementById('submitButton');
    let allValid = true;

    inputs.forEach(input => {
        if (input.classList.contains('invalid')) {
            allValid = false;
        }
    });

    submitButton.disabled = !allValid;
    if (allValid) {
        submitButton.classList.add('bg-blue-600', 'animate-pulse');
        submitButton.classList.remove('bg-gray-600');
    } else {
        submitButton.classList.remove('bg-blue-600', 'animate-pulse');
        submitButton.classList.add('bg-gray-600');
    }
}

function getErrorMessage(fieldName, isLengthError) {
    const messages = {
        firstName: {
            invalid: "فقط حروف الفبا مجاز است.",
            length: "حداقل 2 و حداکثر 50 کاراکتر باشد."
        },
        lastName: {
            invalid: "فقط حروف الفبا مجاز است.",
            length: "حداقل 2 و حداکثر 50 کاراکتر باشد."
        },
        email: {
            invalid: "آدرس ایمیل معتبر نیست.",
            length: "نباید بیشتر از 100 کاراکتر باشد."
        },
        studentID: {
            invalid: "باید شامل دقیقاً 10 رقم باشد."
        },
        employeeID: {
            invalid: "باید بین 6 تا 10 رقم باشد."
        },
        nationalID: {
            invalid: "باید شامل دقیقاً 10 رقم باشد."
        },
        mobile: {
            invalid: "باید شامل 11 رقم و با '09' شروع شود."
        },
        password: {
            invalid: "باید بین 8 تا 20 کاراکتر باشد."
        },
        faculty: {
            invalid: "فقط حروف الفبا مجاز است.",
            length: "حداقل 2 و حداکثر 50 کاراکتر باشد."
        },
        major: {
            invalid: "فقط حروف الفبا مجاز است.",
            length: "حداقل 2 و حداکثر 50 کاراکتر باشد."
        }
    };

    return isLengthError ? messages[fieldName].length : messages[fieldName].invalid;
}

document.getElementById('registrationForm').onsubmit = function (event) {
    event.preventDefault();
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('hidden');
    this.reset();
    toggleFields();
}