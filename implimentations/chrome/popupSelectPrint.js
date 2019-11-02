document.addEventListener('DOMContentLoaded', function() {
    var go = document.getElementById('go');
    go.addEventListener('click', function() {
        magics();
    });
});

function magics() {
    var url = document.getElementById('goto').value;
    var url = "http://" + url + ":5100/upload.html";
    console.log("Going to " + url);
    window.location.href = url;
}