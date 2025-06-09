let signInBtn = $('#signInBtn');
signInBtn.on('click',()=>{

    let userName = $('#userNameInput')[0].value.trim();
    let password = $('#passwordInput')[0].value.trim();

    if(userName=='' || password==''){
        Swal.fire({
            title: 'Error!',
            text: 'All fields required',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    let data = {
        "userName": userName,
        "password": password
    }

    $.ajax({
        url: 'http://localhost:8080/BackEnd_Web_exploded/signin',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (res) {

            if(res=='true'){
                clean();
                localStorage.setItem("username",userName);
                window.open("http://localhost:63342/supermarket-pos-web-with-backend-javaee/index.html", "_self");
                return;
            }
            if(res=='not exist'){
                Swal.fire({
                    title: 'Error!',
                    text: 'This User Name Not Exist, Please Sign Up',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                clean();
                return;
            }
            Swal.fire({
                title: 'Error!',
                text: 'Password Incorect!',
                icon: 'error',
                confirmButtonText: 'Ok'
            });

        },
        error: function (xhr) {
            console.log("error text: "+xhr.responseText);
        }
    });
});



function clean() {

    $('#userNameInput')[0].value = '';
    $('#passwordInput')[0].value = '';
}






