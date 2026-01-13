// Datos del Universo Cinematográfico de Marvel en orden cronológico
const ucmData = [
    // Fase 1
    { id: 1, title: "Iron Man", type: "movie", date: "2008-05-02", phase: "Fase 1", image: "./imgs/iron-man.png" },
    { id: 2, title: "El Increíble Hulk", type: "movie", date: "2008-06-13", phase: "Fase 1", image: "./imgs/el-increible-hulk.png" },
    { id: 3, title: "Iron Man 2", type: "movie", date: "2010-05-07", phase: "Fase 1", image: "https://image.tmdb.org/t/p/w500/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg" },
    { id: 4, title: "Thor", type: "movie", date: "2011-05-06", phase: "Fase 1", image: "./imgs/thor.png" },
    { id: 5, title: "Capitán América: El Primer Vengador", type: "movie", date: "2011-07-22", phase: "Fase 1", image: "./imgs/capitan-america-el-primer-vengador.png" },
    { id: 6, title: "Los Vengadores", type: "movie", date: "2012-05-04", phase: "Fase 1", image: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg" },
    
    // Fase 2
    { id: 7, title: "Iron Man 3", type: "movie", date: "2013-05-03", phase: "Fase 2", image: "https://image.tmdb.org/t/p/w500/1Ilv6ryHUv6rt9zIsbSEJUmmbEi.jpg" },
    { id: 8, title: "Thor: El Mundo Oscuro", type: "movie", date: "2013-11-08", phase: "Fase 2", image: "./imgs/thor-el-mundo-oscuro.png" },
    { id: 9, title: "Capitán América: El Soldado de Invierno", type: "movie", date: "2014-04-04", phase: "Fase 2", image: "./imgs/capitan-america-el-soldado-de-invierno.png" },
    { id: 10, title: "Guardianes de la Galaxia", type: "movie", date: "2014-08-01", phase: "Fase 2", image: "./imgs/guardianes-de-la-galaxia.png" },
    { id: 11, title: "Vengadores: La Era de Ultrón", type: "movie", date: "2015-05-01", phase: "Fase 2", image: "https://image.tmdb.org/t/p/w500/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg" },
    { id: 12, title: "Ant-Man", type: "movie", date: "2015-07-17", phase: "Fase 2", image: "./imgs/ant-man.png" },
    
    // Fase 3
    { id: 15, title: "Capitán América: Civil War", type: "movie", date: "2016-05-06", phase: "Fase 3", image: "./imgs/capitan-america-civil-war.png" },
    { id: 16, title: "Doctor Strange", type: "movie", date: "2016-11-04", phase: "Fase 3", image: "./imgs/doctor-strange.png" },
    { id: 17, title: "Guardianes de la Galaxia Vol. 2", type: "movie", date: "2017-05-05", phase: "Fase 3", image: "./imgs/guardianes-de-la-galaxia-vol-2.png" },
    { id: 18, title: "Spider-Man: Homecoming", type: "movie", date: "2017-07-07", phase: "Fase 3", image: "./imgs/spider-man-homecoming.png" },
    { id: 19, title: "Thor: Ragnarok", type: "movie", date: "2017-11-03", phase: "Fase 3", image: "./imgs/thor-ragnarok.png" },
    { id: 20, title: "Black Panther", type: "movie", date: "2018-02-16", phase: "Fase 3", image: "./imgs/black-panther.png" },
    { id: 21, title: "Vengadores: Infinity War", type: "movie", date: "2018-04-27", phase: "Fase 3", image: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" },
    { id: 22, title: "Ant-Man y la Avispa", type: "movie", date: "2018-07-06", phase: "Fase 3", image: "./imgs/ant-man-y-la-avispa.png" },
    { id: 23, title: "Capitana Marvel", type: "movie", date: "2019-03-08", phase: "Fase 3", image: "https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg" },
    { id: 24, title: "Vengadores: Endgame", type: "movie", date: "2019-04-26", phase: "Fase 3", image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg" },
    { id: 25, title: "Spider-Man: Lejos de Casa", type: "movie", date: "2019-07-02", phase: "Fase 3", image: "https://image.tmdb.org/t/p/w500/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg" },
    
    // Fase 4
    { id: 26, title: "WandaVision", type: "series", date: "2021-01-15", phase: "Fase 4", image: "./imgs/wanda-vision.png" },
    { id: 27, title: "Falcon y el Soldado de Invierno", type: "series", date: "2021-03-19", phase: "Fase 4", image: "https://image.tmdb.org/t/p/w500/6kbAMLteGO8yyewYau6bJ683sw7.jpg" },
    { id: 28, title: "Loki (Temporada 1)", type: "series", date: "2021-06-09", phase: "Fase 4", image: "https://image.tmdb.org/t/p/w500/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg" },
    { id: 29, title: "Black Widow", type: "movie", date: "2021-07-09", phase: "Fase 4", image: "https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg" },
    { id: 30, title: "¿Qué pasaría si...?", type: "series", date: "2021-08-11", phase: "Fase 4", image: "https://image.tmdb.org/t/p/w500/lztz5XBMG1x6Y5ubz7CxfPFsAcW.jpg" },
    { id: 31, title: "Shang-Chi y la Leyenda de los Diez Anillos", type: "movie", date: "2021-09-03", phase: "Fase 4", image: "https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg" },
    { id: 32, title: "Eternals", type: "movie", date: "2021-11-05", phase: "Fase 4", image: "https://image.tmdb.org/t/p/w500/6AdXwFTRTAzggD2QUTt5B7JFGKL.jpg" },
    { id: 33, title: "Hawkeye", type: "series", date: "2021-11-24", phase: "Fase 4", image: "./imgs/hawkeye.png" },
    { id: 34, title: "Spider-Man: No Way Home", type: "movie", date: "2021-12-17", phase: "Fase 4", image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg" },
    { id: 35, title: "Moon Knight", type: "series", date: "2022-03-30", phase: "Fase 4", image: "./imgs/moon-knight.png" },
    { id: 36, title: "Doctor Strange en el Multiverso de la Locura", type: "movie", date: "2022-05-06", phase: "Fase 4", image: "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg" },
    { id: 37, title: "Ms. Marvel", type: "series", date: "2022-06-08", phase: "Fase 4", image: "./imgs/ms-marvel.png" },
    { id: 38, title: "Thor: Love and Thunder", type: "movie", date: "2022-07-08", phase: "Fase 4", image: "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg" },
    { id: 39, title: "She-Hulk: Abogada", type: "series", date: "2022-08-18", phase: "Fase 4", image: "./imgs/she-hulk-abogada.png" },
    { id: 40, title: "Werewolf by Night", type: "special", date: "2022-10-07", phase: "Fase 4", image: "./imgs/werewolf-by-night.png" },
    { id: 41, title: "Black Panther: Wakanda Forever", type: "movie", date: "2022-11-11", phase: "Fase 4", image: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg" },
    { id: 42, title: "The Guardians of the Galaxy Holiday Special", type: "special", date: "2022-11-25", phase: "Fase 4", image: "./imgs/the-guardians-of-the-galaxy-holiday-special.png" },
    
    // Fase 5
    { id: 43, title: "Ant-Man y la Avispa: Quantumania", type: "movie", date: "2023-02-17", phase: "Fase 5", image: "./imgs/ant-man-y-la-avispa-quantumania.png" },
    { id: 44, title: "Guardianes de la Galaxia Vol. 3", type: "movie", date: "2023-05-05", phase: "Fase 5", image: "./imgs/guardianes-de-la-galaxia-vol-3.png" },
    { id: 45, title: "Secret Invasion", type: "series", date: "2023-06-21", phase: "Fase 5", image: "./imgs/secret-invasion.png" },
    { id: 46, title: "Loki (Temporada 2)", type: "series", date: "2023-10-05", phase: "Fase 5", image: "./imgs/loki-temporada-2.png" },
    { id: 47, title: "The Marvels", type: "movie", date: "2023-11-10", phase: "Fase 5", image: "./imgs/the-marvels.png" },
    { id: 48, title: "What If...? (Temporada 2)", type: "series", date: "2023-12-22", phase: "Fase 5", image: "https://image.tmdb.org/t/p/w500/lztz5XBMG1x6Y5ubz7CxfPFsAcW.jpg" },
    { id: 49, title: "Echo", type: "series", date: "2024-01-10", phase: "Fase 5", image: "./imgs/echo.png" },
    { id: 50, title: "Deadpool & Wolverine", type: "movie", date: "2024-07-26", phase: "Fase 5", image: "./imgs/deadpool-wolverine.png" },
    { id: 51, title: "Agatha: Darkhold Diaries", type: "series", date: "2024-09-18", phase: "Fase 5", image: "./imgs/agatha-darkhold-diaries.png" },
    { id: 52, title: "Daredevil: Born Again", type: "series", date: "2025-01-01", phase: "Fase 5", image: "./imgs/daredevil-born-again.png" },
    
    // Fase 6 (Futuro)
    { id: 53, title: "Capitán América: Brave New World", type: "movie", date: "2025-02-14", phase: "Fase 6", image: "./imgs/capitan-america-brave-new-world.png" },
    { id: 54, title: "Thunderbolts", type: "movie", date: "2025-05-02", phase: "Fase 6", image: "https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg" },
    { id: 55, title: "Los 4 Fantásticos", type: "movie", date: "2025-07-25", phase: "Fase 6", image: "https://image.tmdb.org/t/p/w500/6AdXwFTRTAzggD2QUTt5B7JFGKL.jpg" },
    { id: 56, title: "Blade", type: "movie", date: "2025-11-07", phase: "Fase 6", image: "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg" },
];

// Ordenar por fecha de lanzamiento
ucmData.sort((a, b) => new Date(a.date) - new Date(b.date));
