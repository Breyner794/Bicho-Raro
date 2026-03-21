    /* ─── CURSOR ─────────────────────────────────────────────── */
    const cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });

    /* ─── CHARACTERS DATA ────────────────────────────────────────
        📝 COMO PERSONALIZAR:
        - name: Nombre del personaje
        - title: Apodo / rol
        - image: Ruta a la foto (ej: './fotos/picho.jpg') — deja '' para placeholder
        - videoUrl: URL de YouTube embed (ej: 'https://www.youtube.com/embed/VIDEO_ID')
                    o ruta local (ej: './videos/picho.mp4')
        - stats: valores del 0 al 100
    ────────────────────────────────────────────────────────────── */
    const characters = [
      {
        name: "PICHO",
        title: "El Lider",
        image: "img/590-removebg-preview.png", // 👈 pon la URL/path de la foto aquí
        videoUrl: "video/Que.mp4",  // 👈 pon el link del video aquí
        stats: {
          SWAG:    95,
          FLOW:    88,
          DRIP:    92,
          VIBES:   97,
          NIVEL:   90,
        }
      },
      {
        name: "HUNTER 2",
        title: "El Socio",
        image: "img/594-removebg-preview.png",
        videoUrl: "video/km_20241228-Copiar_1080p_60f_20241229_110114.mp4",
        stats: {
          SWAG:    80,
          FLOW:    75,
          DRIP:    85,
          VIBES:   78,
          NIVEL:   82,
        }
      },
      {
        name: "HUNTER 3",
        title: "El Silencioso",
        image: "img/596-removebg-preview.png",
        videoUrl: "video/km_20241228-Copiar_1080p_60f_20241229_122214.mp4",
        stats: {
          SWAG:    70,
          FLOW:    95,
          DRIP:    60,
          VIBES:   88,
          NIVEL:   76,
        }
      },
      {
        name: "HUNTER 4",
        title: "El Artista",
        image: "img/WhatsApp Image 2026-03-21 at 11.05.24 (2).jpeg",
        videoUrl: "video/km_20241228-Copiar_1080p_60f_20241229_122234.mp4",
        stats: {
          SWAG:    88,
          FLOW:    65,
          DRIP:    72,
          VIBES:   91,
          NIVEL:   80,
        }
      },
      {
        name: "HUNTER 5",
        title: "El Novato",
        image: "img/WhatsApp Image 2026-03-21 at 11.05.24.jpeg",
        videoUrl: "video/km_20241228-Copiar_1080p_60f_20241229_122309.mp4",
        stats: {
          SWAG:    60,
          FLOW:    70,
          DRIP:    65,
          VIBES:   72,
          NIVEL:   66,
        }
      },
    ];

    /* ─── STATE ──────────────────────────────────────────────── */
    let currentIndex = 0;

    /* ─── SCREEN MANAGEMENT ──────────────────────────────────── */
    const screens = {
      title:  document.getElementById('screen-title'),
      select: document.getElementById('screen-select'),
      video:  document.getElementById('screen-video'),
    };

    function showScreen(name) {
      Object.values(screens).forEach(s => s.classList.add('hidden'));
      screens[name].classList.remove('hidden');
    }

    /* ─── RENDER CHARACTER CARD ──────────────────────────────── */
    const STAT_COLORS = ['#39ff14','#ffe600','#ff2d9b','#00e5ff','#ff8c00'];

    function renderCard(index) {
      const char = characters[index];

      // counter
      document.getElementById('char-counter').textContent =
        `${index + 1} / ${characters.length}`;

      // image or placeholder
      const wrap = document.getElementById('char-img-wrap');
      if (char.image) {
        wrap.innerHTML = `<img src="${char.image}" class="char-img" alt="${char.name}" />`;
      } else {
        // Pixel placeholder with emoji number
        const emoji = ['🎩','🧢','🪖','👒','🎓'][index] || '👤';
        wrap.innerHTML = `
          <div class="char-placeholder">
            <div class="px-emoji">${emoji}</div>
            <div style="font-family:'Press Start 2P',monospace;font-size:7px;color:#555;text-align:center;">
              SIN FOTO<br>AÚN
            </div>
          </div>`;
      }

      // name & title
      document.getElementById('char-name').textContent  = char.name;
      document.getElementById('char-title').textContent = char.title;

      // stats
      const statsEl = document.getElementById('char-stats');
      const entries = Object.entries(char.stats);
      statsEl.innerHTML = entries.map(([key, val], i) => `
        <div class="stat-row">
          <span class="stat-label">${key}</span>
          <div class="stat-bar-bg">
            <div class="stat-bar-fill"
                 style="width:${val}%;background:${STAT_COLORS[i % STAT_COLORS.length]};
                        box-shadow:0 0 6px ${STAT_COLORS[i % STAT_COLORS.length]}">
            </div>
          </div>
          <span class="stat-val">${val}</span>
        </div>
      `).join('');
    }

    /* ─── RENDER VIDEO ───────────────────────────────────────── */
    function renderVideo(index) {
      const char = characters[index];
      document.getElementById('video-title-bar').textContent =
        `📼 ${char.name} — ${char.title}`;

      const container = document.getElementById('video-container');

      if (!char.videoUrl) {
        container.innerHTML = `
          <div class="video-placeholder">
            <div class="play-icon">▶</div>
            <p>VIDEO DE ${char.name}<br>PRÓXIMAMENTE<br><br>
               <span style="font-size:1rem;color:#444;">
                 Agrega la URL en characters[${index}].videoUrl
               </span>
            </p>
          </div>`;
        return;
      }

      // Detectar si es YouTube o video local
      if (char.videoUrl.includes('youtube.com') || char.videoUrl.includes('youtu.be')) {
        container.innerHTML = `
          <iframe class="video-frame"
            src="${char.videoUrl}?autoplay=1&rel=0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            allowfullscreen>
          </iframe>`;
      } else {
        // Video local (mp4, etc.)
        container.innerHTML = `
          <video class="video-frame" controls autoplay>
            <source src="${char.videoUrl}">
          </video>`;
      }
    }

    /* ─── EVENTS ─────────────────────────────────────────────── */
    // Play → pantalla select
    document.getElementById('btn-play').addEventListener('click', () => {
      renderCard(currentIndex);
      showScreen('select');
    });

    // Back → title
    document.getElementById('btn-back').addEventListener('click', () => {
      showScreen('title');
    });

    // Prev character
    document.getElementById('btn-prev').addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + characters.length) % characters.length;
      renderCard(currentIndex);
    });

    // Next character
    document.getElementById('btn-next').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % characters.length;
      renderCard(currentIndex);
    });

    // Keyboard navigation (← →)
    document.addEventListener('keydown', e => {
      if (screens.select.classList.contains('hidden')) return;
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + characters.length) % characters.length;
        renderCard(currentIndex);
      }
      if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % characters.length;
        renderCard(currentIndex);
      }
    });

    // Seleccionar personaje → video
    document.getElementById('btn-select-char').addEventListener('click', () => {
      renderVideo(currentIndex);
      showScreen('video');
    });

    // Cerrar video
    document.getElementById('btn-close-video').addEventListener('click', () => {
      // Stop video al cerrar
      document.getElementById('video-container').innerHTML = '';
      showScreen('select');
    });

    /* ─── INIT ───────────────────────────────────────────────── */
    showScreen('title');