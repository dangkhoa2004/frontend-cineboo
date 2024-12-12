export default function logints() {
    const movieContainer = document.querySelector(".movie-container") as HTMLElement | null;
    const pwShowHide = document.querySelectorAll<HTMLElement>(".showHidePw");
    const pwFields = document.querySelectorAll<HTMLInputElement>(".password");
    const signUp = document.querySelector(".movie-signup-link") as HTMLElement | null;
    const login = document.querySelector(".movie-login-link") as HTMLElement | null;

    if (pwShowHide.length > 0) {
        pwShowHide.forEach((eyeIcon) => {
            eyeIcon.addEventListener("click", () => {
                pwFields.forEach((pwField) => {
                    if (pwField.type === "password") {
                        pwField.type = "text";
                        pwShowHide.forEach((icon) => {
                            icon.classList.replace("fa-eye-slash", "fa-eye");
                        });
                    } else {
                        pwField.type = "password";
                        pwShowHide.forEach((icon) => {
                            icon.classList.replace("fa-eye", "fa-eye-slash");
                        });
                    }
                });
            });
        });
    }

    // toggle signup and login form
    if (signUp && login && movieContainer) {
        signUp.addEventListener("click", (e) => {
            e.preventDefault();
            movieContainer.classList.add("active");
        });

        login.addEventListener("click", (e) => {
            e.preventDefault();
            movieContainer.classList.remove("active");
        });
    }
}