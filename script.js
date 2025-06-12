document.addEventListener('DOMContentLoaded', function() {

    const toggleButton = document.getElementById('toggle-sidebar-btn');
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');
    const dynamicContentArea = document.getElementById('dynamic-content-area');
    const sidebarLinks = document.querySelectorAll('#sidebar nav ul li a');

    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        content.classList.toggle('full-width');
    });

    function loadPageContent(pageName) {
        const fullHtmlUrl = `${pageName}_full.html`; 


        dynamicContentArea.innerHTML = ''; 
        const iframeElement = document.createElement('iframe');
        iframeElement.src = fullHtmlUrl;
        iframeElement.style.width = '100%';
        iframeElement.style.height = '100%'; 
        iframeElement.style.border = 'none'; 
        iframeElement.loading = 'lazy';
        iframeElement.sandbox = 'allow-scripts allow-same-origin'; 

        dynamicContentArea.appendChild(iframeElement);
        console.log(`Grafo carregado via iframe de '${fullHtmlUrl}'.`);


        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
            content.classList.add('full-width');
        }
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const pageToLoad = this.dataset.page;
            if (pageToLoad) {
                loadPageContent(pageToLoad);
            }
        });
    });

    loadPageContent('grafo_interesses');
});