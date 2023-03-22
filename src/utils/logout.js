const Logout = () => {
    localStorage.clear();
    // localStorage.setItem("already_login", true);
    window.location.reload();
}

export default Logout;