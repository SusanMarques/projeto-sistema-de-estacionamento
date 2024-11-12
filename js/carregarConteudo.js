document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("main-content");

    // Função para carregar o conteúdo e o CSS da página
    function loadPage(page) {
        let pageToLoad;
        let cssToLoad;

        // Define o caminho do HTML e do CSS de acordo com a página
        switch (page) {
            case "home.html":
                pageToLoad = "../../app/home.html";
                cssToLoad = "../style.css";
                break;
            case "pagamento.html":
                pageToLoad = "../../app/pagamento.html";
                cssToLoad = "../style-pagamento.css";
                break;
            case "clientes.html":
                pageToLoad = "../../app/clientes.html";
                cssToLoad = "../style-clientes.css";
                break;
            case "pesquisar.html":
                pageToLoad = "../../app/pesquisar.html";
                cssToLoad = "../style-pesquisar.css";
                break;
            default:
                pageToLoad = "../../app/home.html";
                cssToLoad = "../style.css";
                break;
        }

        // Carregar conteúdo HTML na <main>
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
            })
            .catch(error => console.error("Erro ao carregar o conteúdo:", error));
    }

    // Carrega a página inicial (home) ao abrir
    loadPage("home.html");

    // Configura os links de navegação para carregar páginas sem recarregar o layout
    document.querySelectorAll(".menu-lateral a").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const page = link.getAttribute("href"); // Obtém a página a partir do href
            loadPage(page);  // Carrega o conteúdo da página
        });
    });
});
