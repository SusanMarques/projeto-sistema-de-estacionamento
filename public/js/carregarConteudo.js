document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("main-content");

    // Função para carregar o conteúdo e o CSS da página
    function loadPage(page) {
        let pageToLoad;
        let cssToLoad;
        let scriptToLoad;

        // Define o caminho do HTML e do CSS de acordo com a página
        switch (page) {
            case "home.html":
                pageToLoad = "../app/home.html";
                cssToLoad = "../assets/style-home.css";
                scriptToLoad = "../js/script.js";
                console.log("Carregando Script:", scriptToLoad);
                break;
            case "index.html":
                pageToLoad = "../app/index.html";
                cssToLoad = "../assets/style.css";
                scriptToLoad = "../js/script.js";
                console.log("Carregando Script:", scriptToLoad);
                break;
            case "pagamento.html":
                pageToLoad = "../app/pagamento.html";
                cssToLoad = "../assets/style-pagamento.css";
                scriptToLoad = "../js/pagamento.js";
                console.log("Carregando Script:", scriptToLoad);
                break;
            case "clientes.html":
                pageToLoad = "../app/clientes.html";
                cssToLoad = "../assets/style-clientes.css";
                scriptToLoad = "../js/clientes.js";
                console.log("Carregando Script:", scriptToLoad);
                break;
            case "pesquisar.html":
                pageToLoad = "../app/pesquisar.html";
                cssToLoad = "../assets/style-pesquisar.css";
                scriptToLoad = "../js/pesquisar.js";
                console.log("Carregando Script:", scriptToLoad);
                break;
            default:
                pageToLoad = "../app/home.html";
                cssToLoad = "../assets/style-home.css";
                scriptToLoad = null;
                break;
        }

        fetch(pageToLoad)
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar a página");
            return response.text();
        })
        .then(data => {
            mainContent.innerHTML = data;  // Insere o conteúdo HTML no main

            // Remove qualquer CSS específico da página anterior
            let existingCss = document.getElementById("page-specific-css");
            if (existingCss) existingCss.remove();

            // Adiciona o CSS específico da página atual
            const linkElement = document.createElement("link");
            linkElement.rel = "stylesheet";
            linkElement.href = cssToLoad;
            linkElement.id = "page-specific-css";
            document.head.appendChild(linkElement);

            // Remove qualquer script específico da página anterior
            let existingScript = document.getElementById("page-specific-script");
            if (existingScript) existingScript.remove();

            // Adiciona o script específico da página atual
            if (scriptToLoad) {
                const scriptElement = document.createElement("script");
                scriptElement.src = scriptToLoad;
                scriptElement.id = "page-specific-script";
                document.body.appendChild(scriptElement);
            }
        })
        .catch(error => console.error("Erro ao carregar o conteúdo:", error));
}
    // Carrega a página inicial (home) ao abrir
    loadPage("../../app/home.html");

    document.querySelectorAll(".menu-lateral a").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const page = link.getAttribute("href"); // Obtém a página a partir do href
            loadPage(page);  // Carrega o conteúdo da página
        });
    });

});