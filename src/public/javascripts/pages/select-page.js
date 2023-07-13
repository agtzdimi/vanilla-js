function getCookie(cookie) {
    if (document.cookie.length > 0) {
        let cookieStart = document.cookie.indexOf(cookie + '=');
        if (cookieStart != -1) {
            cookieStart = cookieStart + cookie.length + 1;
            let cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            return decodeURI(document.cookie.substring(cookieStart, cookieEnd));
        }
    }
    return '';
}

function goToVariant() {
    window.location.href = '/redirect?page=variant';
}

function goToControl() {
    window.location.href = '/redirect?page=control';
}

const adminCookie = getCookie('admin');
if (!adminCookie) {
    window.location.href = '/pricing';
}

window.onload = function () {
    document.getElementById('control-btn').addEventListener('click', goToControl);
    document.getElementById('variant-btn').addEventListener('click', goToVariant);
};
