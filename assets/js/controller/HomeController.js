$(document).ready(function() {
    var username = localStorage.getItem('username');
    if (!username) {
        window.open("http://localhost:63342/supermarket-pos-web-with-backend-javaee/sign-in.html", "_self");
    }else {
        //
    }
});

$(document).ready(function() {
    window.addEventListener('pageshow', function(event) {
        // Check if page was loaded from browser cache (back/forward button)
        if (event.persisted) {
            // Page was loaded from cache, force reload
            window.location.reload();
        }
    });
});

function getStatics() {

    $.ajax({
        url: 'http://localhost:8080/BackEnd_Web_exploded/home',
        method: 'GET',
        success: function (res) {
            let arr = res.split(",");

            let boxOne = $('#box-one>.box-calculations');
            boxOne[0].innerHTML = arr[0];

            let boxTwo = $('#box-two>.box-calculations');
            boxTwo[0].innerHTML = arr[1];

            let boxThree = $('#box-three>.box-calculations');
            boxThree[0].innerHTML = arr[2];
        },
        error: function () {
            console.log("error loading statics")
        }
    });
}


getStatics();