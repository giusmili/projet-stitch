document.addEventListener("DOMContentLoaded", () => {
/*   Configuration Tailwind (script de Tailwind) après que le DOM soit prêt
  Remarque: avec le CDN Tailwind, la config est généralement définie avant le script CDN.
  Ici, on la place tout de même dans DOMContentLoaded comme demandé. */
  window.tailwind = window.tailwind || {};
  window.tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          primary: "#07ab43",
          "background-light": "#fafafa",
          "background-dark": "#102216",
        },
        fontFamily: {
          display: ["Lexend", "sans-serif"],
        },
        borderRadius: {
          DEFAULT: "0.5rem",
          lg: "1rem",
          xl: "1.5rem",
          full: "9999px",
        },
      },
    },
  };


});
