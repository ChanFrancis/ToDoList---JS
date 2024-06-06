const menuBurger = document.getElementById("menuBurger");
const nav = document.getElementById("nav");

const closeNav = document.getElementById("closeNav");

menuBurger.addEventListener("click", () => {
    nav.classList.add("active")
})

closeNav.addEventListener("click", () => {
    nav.classList.remove("active")
})

document.addEventListener("click", (event) => {
    const insideClick = nav.contains(event.target)
    const burgerClick = menuBurger.contains(event.target)

    if (!insideClick && !burgerClick) {
        nav.classList.remove("active")
    }
});