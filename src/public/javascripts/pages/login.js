class Login {
    constructor() {
        this.clickListener = document
            .getElementById('login-btn')
            .addEventListener('click', this._validateonSubmit);
    }

    _validateonSubmit = () => {
        const validUserName = this._validateUserName();
        const validPassword = this._validatePassword();
        if (validUserName && validPassword) {
            const isValidAdmin = this._validateCorrectness();
            if (isValidAdmin) {
                this._setCookie('admin', 'true', 60);
                document
                    .getElementById('login-btn')
                    .removeEventListener('click', this._validateonSubmit);
                window.location.href = '/select-page';
            }
        }
    };

    _validateUserName = () => {
        const usernameInput = document.getElementById('login-username');
        const username = usernameInput?.value.trim();
        if (!username) {
            const span = document.getElementById('login-username-error');
            span.ariaHidden = 'false';
            span.innerHTML = 'Please fill in your user name';
            this.usernameListener = document
                .getElementById('login-username')
                .addEventListener('input', () => {
                    span.ariaHidden = 'true';
                    span.innerHTML = '';
                    document
                        .getElementById('login-username')
                        .removeEventListener('input', this.usernameListener);
                });
            usernameInput.focus();
            return false;
        }
        return true;
    };

    _validatePassword = () => {
        const passwordInput = document.getElementById('login-password');
        const password = passwordInput?.value;

        if (!password) {
            const span = document.getElementById('login-password-error');
            span.ariaHidden = 'false';
            span.innerHTML = 'Please fill in your password';
            this.passwordListener = document
                .getElementById('login-password')
                .addEventListener('input', () => {
                    span.ariaHidden = 'true';
                    span.innerHTML = '';
                    document
                        .getElementById('login-password')
                        .removeEventListener('input', this.passwordListener);
                });
            return false;
        }
        return true;
    };

    _validateCorrectness = () => {
        const usernameInput = document.getElementById('login-username');
        const passwordInput = document.getElementById('login-password');
        const username = usernameInput?.value.trim();
        const password = passwordInput?.value.trim();
        if (password !== 'admin' || username !== 'admin') {
            const span = document.getElementById('login-error');
            span.ariaHidden = 'false';
            span.innerHTML = 'Username/Password is incorrect.';
            return false;
        }
        return true;
    };

    _setCookie(name, value, mins) {
        let expires;
        if (mins) {
            const date = new Date();
            date.setTime(date.getTime() + mins * 60 * 1000);
            expires = '; expires=' + date.toUTCString();
        } else {
            expires = '';
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }
}

window.onload = function () {
    new Login();
};
