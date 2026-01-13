// Estado de la aplicación
let watchedItems = new Set();
let currentFilter = 'all'; // 'all', 'movies', 'series', 'watched', 'unwatched'

// Inicializar la aplicación
function init() {
    loadWatchedItems();
    renderTimeline();
    updateStats();
    setupEventListeners();
}

// Cargar items vistos desde localStorage
function loadWatchedItems() {
    const saved = localStorage.getItem('ucm-watched');
    if (saved) {
        watchedItems = new Set(JSON.parse(saved));
    }
}

// Guardar items vistos en localStorage
function saveWatchedItems() {
    localStorage.setItem('ucm-watched', JSON.stringify([...watchedItems]));
}

// Renderizar la línea de tiempo
function renderTimeline() {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';

    let filteredData = ucmData;

    // Aplicar filtros
    if (currentFilter === 'movies') {
        filteredData = ucmData.filter(item => item.type === 'movie');
    } else if (currentFilter === 'series') {
        filteredData = ucmData.filter(item => item.type === 'series' || item.type === 'special');
    } else if (currentFilter === 'watched') {
        filteredData = ucmData.filter(item => watchedItems.has(item.id));
    } else if (currentFilter === 'unwatched') {
        filteredData = ucmData.filter(item => !watchedItems.has(item.id));
    }

    filteredData.forEach(item => {
        const isWatched = watchedItems.has(item.id);
        const itemElement = createTimelineItem(item, isWatched);
        timeline.appendChild(itemElement);
    });
}

// Crear elemento de línea de tiempo
function createTimelineItem(item, isWatched) {
    const div = document.createElement('div');
    div.className = `timeline-item ${item.type} ${isWatched ? 'watched' : ''}`;
    div.dataset.id = item.id;

    const typeLabel = item.type === 'movie' ? 'Película' : 
                     item.type === 'series' ? 'Serie' : 'Especial';
    
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    const imageUrl = item.image || 'https://via.placeholder.com/150x225?text=Sin+imagen';
    
    div.innerHTML = `
        <div class="checkbox-container">
            <input type="checkbox" id="item-${item.id}" ${isWatched ? 'checked' : ''}>
            <label for="item-${item.id}" class="custom-checkbox"></label>
        </div>
        <div class="item-poster">
            <img src="${imageUrl}" alt="${item.title}" class="poster-image" loading="lazy">
        </div>
        <div class="item-info">
            <div class="item-title">${item.title}</div>
            <div class="item-meta">
                <span class="item-type ${item.type}">${typeLabel}</span>
                <span class="item-date">📅 ${formattedDate}</span>
                <span class="item-phase">${item.phase}</span>
            </div>
        </div>
    `;

    // Agregar evento al checkbox
    const checkbox = div.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
        toggleWatched(item.id);
    });

    return div;
}

// Alternar estado de visto
function toggleWatched(id) {
    if (watchedItems.has(id)) {
        watchedItems.delete(id);
    } else {
        watchedItems.add(id);
    }
    saveWatchedItems();
    renderTimeline();
    updateStats();
}

// Actualizar estadísticas
function updateStats() {
    const watchedCount = watchedItems.size;
    const totalCount = ucmData.length;
    const progress = totalCount > 0 ? Math.round((watchedCount / totalCount) * 100) : 0;

    document.getElementById('watched-count').textContent = watchedCount;
    document.getElementById('total-count').textContent = totalCount;
    document.getElementById('progress-percent').textContent = `${progress}%`;
    
    const progressFill = document.getElementById('progress-fill');
    progressFill.style.width = `${progress}%`;
    progressFill.textContent = progress > 0 ? `${progress}%` : '';
}

// Configurar event listeners
function setupEventListeners() {
    // Botón marcar todas
    document.getElementById('mark-all-btn').addEventListener('click', () => {
        ucmData.forEach(item => watchedItems.add(item.id));
        saveWatchedItems();
        renderTimeline();
        updateStats();
    });

    // Botón desmarcar todas
    document.getElementById('unmark-all-btn').addEventListener('click', () => {
        watchedItems.clear();
        saveWatchedItems();
        renderTimeline();
        updateStats();
    });

    // Botón de filtro
    document.getElementById('filter-btn').addEventListener('click', () => {
        const filters = ['all', 'movies', 'series', 'watched', 'unwatched'];
        const filterLabels = {
            'all': 'Todas',
            'movies': 'Películas',
            'series': 'Series',
            'watched': 'Vistas',
            'unwatched': 'No vistas'
        };
        
        const currentIndex = filters.indexOf(currentFilter);
        const nextIndex = (currentIndex + 1) % filters.length;
        currentFilter = filters[nextIndex];
        
        document.getElementById('filter-text').textContent = `Mostrar: ${filterLabels[currentFilter]}`;
        renderTimeline();
    });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
