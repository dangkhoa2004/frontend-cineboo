export default function logints() {
    const movieContainer = document.querySelector(".movie-container") as HTMLElement | null;
    const pwShowHide = document.querySelector(".showHidePw") as HTMLElement | null;
    const pwFields = document.querySelectorAll<HTMLInputElement>(".password");
    const signUp = document.querySelector(".movie-signup-link") as HTMLElement | null;
    const login = document.querySelector(".movie-login-link") as HTMLElement | null;

    // Toggle password visibility
    if (pwShowHide && pwFields.length > 0) {
        pwShowHide.addEventListener("click", () => {
            const isPassword = pwFields[0].type === "password"; // Giả sử tất cả các trường password đều giống nhau
            pwFields.forEach((pwField) => {
                pwField.type = isPassword ? "text" : "password";
            });
            // Toggle eye icon class
            pwShowHide.classList.toggle("fa-eye", isPassword);
            pwShowHide.classList.toggle("fa-eye-slash", !isPassword);
        });
    }

    // Toggle signup and login form
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
