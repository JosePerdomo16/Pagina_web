// Datos procesados del CSV
const wifiData = [
    {Municipio: "Apia", Cantidad: 4, TipoEnlace: "Radio enlace", Zona: "Mixta", Ubicaciones: ["Galería", "Parque Principal", "Jordania", "Vereda La María"]},
    {Municipio: "Balboa", Cantidad: 3, TipoEnlace: "Radio enlace", Zona: "Mixta", Ubicaciones: ["Parque Principal", "Hospital", "Tambores"]},
    {Municipio: "Belen de Umbria", Cantidad: 5, TipoEnlace: "Radio enlace", Zona: "Mixta", Ubicaciones: ["La Plazuela", "Parque Principal", "Patinodromo", "Taparcal", "Columbia"]},
    {Municipio: "La Celia", Cantidad: 4, TipoEnlace: "Radio enlace", Zona: "Mixta", Ubicaciones: ["Parque Principal", "Campina Hogar Colombiano", "Verdum", "Patio Bonito"]},
    {Municipio: "Dosquebradas", Cantidad: 11, TipoEnlace: "Mixto", Zona: "Mixta", Ubicaciones: ["Camilo Torres", "La Capilla", "La Esneda", "Villa Alexandra", "Parque Los Lagos", "Primavera Azul", "Pueblo Sol Bajo", "El Balso", "La Mariana", "Pinos/Guamos", "Santa Ana Alta"]},
    {Municipio: "Guatica", Cantidad: 7, TipoEnlace: "Radio enlace", Zona: "Mixta", Ubicaciones: ["Santa Ana", "Travesias", "El Vergel Bajo", "Milán", "El Paraiso", "Alcaldía", "San Clemente"]},
    {Municipio: "Marsella", Cantidad: 4, TipoEnlace: "Radio enlace", Zona: "Mixta", Ubicaciones: ["Galería", "Parque Principal", "El Rayo", "Estación Pereira"]},
    {Municipio: "Mistrato", Cantidad: 2, TipoEnlace: "Mixto", Zona: "Mixta", Ubicaciones: ["Parque Principal", "San Antonio Del Chamí"]},
    {Municipio: "Pueblo Rico", Cantidad: 4, TipoEnlace: "Mixto", Zona: "Mixta", Ubicaciones: ["Parque Principal", "Villa Claret", "Santa Teresa", "Santa Cecilia"]},
    {Municipio: "Quinchia", Cantidad: 3, TipoEnlace: "Mixto", Zona: "Mixta", Ubicaciones: ["Plaza Bolivar Irra", "Batero", "Plaza La Paz"]},
    {Municipio: "Santuario", Cantidad: 3, TipoEnlace: "Radio enlace", Zona: "Mixta", Ubicaciones: ["Parque Principal", "La Bretaña", "Peralonso"]},
    {Municipio: "Santa Rosa de Cabal", Cantidad: 9, TipoEnlace: "Mixto", Zona: "Mixta", Ubicaciones: ["Alcaldía", "Barrios Unidos", "El Español", "Cedralito-Las Mangas", "Galería", "Parque Los Fundadores", "Parque El Hueco", "Polideportivo La Hermosa", "Villa Gladys"]},
    {Municipio: "La Virginia", Cantidad: 7, TipoEnlace: "Mixto", Zona: "Mixta", Ubicaciones: ["Parque Fundadores", "Barrio Libertador", "Parque Pio-Xii", "Parque Lineal Sopinga", "El Aguacate", "Parque Principal", "La Bombonera"]},
    {Municipio: "Pereira", Cantidad: 4, TipoEnlace: "Mixto", Zona: "RURAL", Ubicaciones: ["Las Colonias", "Estación Villegas", "Galicia", "Caimalito"]}
];

// Contadores para tipos de enlace
const enlaceCount = {
    "Radio enlace": 0,
    "Fibra": 0,
    "Satelital": 0,
    "Mixto": 0
};

// Contadores para tipos de zona
const zonaCount = {
    "URBANA": 0,
    "RURAL": 0,
    "Mixta": 0
};

// Procesar datos para contar tipos de enlace y zona
wifiData.forEach(municipio => {
    if (municipio.TipoEnlace === "Radio enlace") enlaceCount["Radio enlace"] += municipio.Cantidad;
    else if (municipio.TipoEnlace === "Mixto") enlaceCount["Mixto"] += municipio.Cantidad;
    
    if (municipio.Zona === "URBANA") zonaCount["URBANA"] += municipio.Cantidad;
    else if (municipio.Zona === "RURAL") zonaCount["RURAL"] += municipio.Cantidad;
    else if (municipio.Zona === "Mixta") zonaCount["Mixta"] += municipio.Cantidad;
});

// Function to render charts
function renderCharts() {
    // Bar Chart - Cantidad por Municipio
    const barCtx = document.getElementById('barChart');
    if (barCtx) {
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: wifiData.map(m => m.Municipio),
                datasets: [{
                    label: 'Cantidad de Zonas WiFi',
                    data: wifiData.map(m => m.Cantidad),
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Importante: desactivar mantenimiento de aspecto
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cantidad de Zonas WiFi'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
    }
    
    // Pie Chart - Distribución por Tipo de Zona
    const pieCtx = document.getElementById('pieChart');
    if (pieCtx) {
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(zonaCount),
                datasets: [{
                    data: Object.values(zonaCount),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Importante: desactivar mantenimiento de aspecto
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: 'Distribución por Tipo de Zona'
                    }
                }
            }
        });
    }
    
    // Scatter Chart - Relación entre cantidad y tipo de enlace
    const scatterCtx = document.getElementById('scatterChart');
    if (scatterCtx) {
        // Preparar datos para el gráfico de dispersión
        const scatterData = wifiData.map(municipio => {
            let value = 0;
            if (municipio.TipoEnlace === "Radio enlace") value = 1;
            else if (municipio.TipoEnlace === "Fibra") value = 2;
            else if (municipio.TipoEnlace === "Satelital") value = 3;
            else if (municipio.TipoEnlace === "Mixto") value = 4;
            
            return {
                x: value,
                y: municipio.Cantidad,
                municipio: municipio.Municipio,
                tipo: municipio.TipoEnlace
            };
        });
        
        new Chart(scatterCtx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Zonas WiFi por Municipio',
                    data: scatterData,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Importante: desactivar mantenimiento de aspecto
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Tipo de Enlace (1=Radio, 2=Fibra, 3=Satelital, 4=Mixto)'
                        },
                        min: 0,
                        max: 5
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Cantidad de Zonas WiFi'
                        },
                        beginAtZero: true
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Municipio: ${context.raw.municipio}, Tipo: ${context.raw.tipo}, Cantidad: ${context.raw.y}`;
                            }
                        }
                    }
                }
            }
        });
    }
}



// Function to render municipios cards
function renderMunicipios() {
    const container = document.getElementById('municipios-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    wifiData.forEach(municipio => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        
        col.innerHTML = `
            <div class="card municipio-card">
                <div class="municipio-header">
                    <h5>${municipio.Municipio}</h5>
                </div>
                <div class="municipio-body">
                    <div class="municipio-count">${municipio.Cantidad} zonas WiFi</div>
                    <p><strong>Tipo de enlace:</strong> ${municipio.TipoEnlace}</p>
                    <p><strong>Área:</strong> ${municipio.Zona}</p>
                    <div class="municipio-locations">
                        <strong>Principales ubicaciones:</strong>
                        <ul>
                            ${municipio.Ubicaciones.slice(0, 3).map(loc => `<li>${loc}</li>`).join('')}
                            ${municipio.Ubicaciones.length > 3 ? '<li>...</li>' : ''}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

// Function to render charts
function renderCharts() {
    // Bar Chart - Cantidad por Municipio
    const barCtx = document.getElementById('barChart');
    if (barCtx) {
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: wifiData.map(m => m.Municipio),
                datasets: [{
                    label: 'Cantidad de Zonas WiFi',
                    data: wifiData.map(m => m.Cantidad),
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cantidad de Zonas WiFi'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
    }
    
    // Pie Chart - Distribución por Tipo de Zona
    const pieCtx = document.getElementById('pieChart');
    if (pieCtx) {
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(zonaCount),
                datasets: [{
                    data: Object.values(zonaCount),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: 'Distribución por Tipo de Zona'
                    }
                }
            }
        });
    }
    
    // Scatter Chart - Relación entre cantidad y tipo de enlace
    const scatterCtx = document.getElementById('scatterChart');
    if (scatterCtx) {
        // Preparar datos para el gráfico de dispersión
        const scatterData = wifiData.map(municipio => {
            let value = 0;
            if (municipio.TipoEnlace === "Radio enlace") value = 1;
            else if (municipio.TipoEnlace === "Fibra") value = 2;
            else if (municipio.TipoEnlace === "Satelital") value = 3;
            else if (municipio.TipoEnlace === "Mixto") value = 4;
            
            return {
                x: value,
                y: municipio.Cantidad,
                municipio: municipio.Municipio,
                tipo: municipio.TipoEnlace
            };
        });
        
        new Chart(scatterCtx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Zonas WiFi por Municipio',
                    data: scatterData,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Tipo de Enlace (1=Radio, 2=Fibra, 3=Satelital, 4=Mixto)'
                        },
                        min: 0,
                        max: 5
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Cantidad de Zonas WiFi'
                        },
                        beginAtZero: true
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Municipio: ${context.raw.municipio}, Tipo: ${context.raw.tipo}, Cantidad: ${context.raw.y}`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Inicializar elementos cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    // Resaltar enlace activo en el menú
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Renderizar elementos específicos de cada página
    if (document.getElementById('municipios-container')) {
        renderMunicipios();
    }
    
    if (document.getElementById('barChart')) {
        renderCharts();
    }
});