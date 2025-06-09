let signUpBtn = $('#signUpBtn');
signUpBtn.on('click',()=>{

    let userName = $('#userNameInput')[0].value.trim();
    let fullName = $('#nameInput')[0].value.trim();
    let email = $('#emailInput')[0].value.trim();
    let password = $('#passwordInput')[0].value.trim();

    if(userName=='' || fullName=='' || email=='' || password==''){
        Swal.fire({
            title: 'Error!',
            text: 'All fields required',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    const usernameRegex = /^[a-zA-Z0-9_@]{3,16}$/;
    const fullNameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^[A-Za-z\d@$!%*?#&]{6,}$/;

    let userNameValidation = usernameRegex.test(userName);
    let nameValidation = fullNameRegex.test(fullName);
    let emailValidation = emailRegex.test(email);
    let passwordValidation = passwordRegex.test(password);

    if(!userNameValidation || !nameValidation || !emailValidation || !passwordValidation){
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    let data = {
        "userName": userName,
        "fullName": fullName,
        "email": email,
        "password": password
    }

    $.ajax({
        url: 'http://localhost:8080/BackEnd_Web_exploded/signup',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (res) {
            if(res=='exist'){
                Swal.fire({
                    title: 'Error!',
                    text: 'This User Name Already Exist,Try Another UserName or Sign In',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                return;
            }

            console.log("success");
            // window.location.href = '../../../index.html';
            // window.location.replace("http://localhost:63342/supermarket-pos-web-with-backend-javaee/index.html");
            window.open("http://localhost:63342/supermarket-pos-web-with-backend-javaee/sign-in.html", "_self");

            clean();
        },
        error: function (xhr) {
            console.log("error text: "+xhr.responseText);
            if(xhr.responseText=='exist'){
                Swal.fire({
                    title: 'Error!',
                    text: 'This User Name Already Exist,Try Another UserName or Sign In',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
            else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed To Sign Up, Please Try Again Later',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                console.log("an error ocure while sign up");
            }
        }
    });
});



function clean() {

    $('#userNameInput')[0].value = '';
    $('#nameInput')[0].value = '';
    $('#emailInput')[0].value = '';
    $('#passwordInput')[0].value = '';
}






