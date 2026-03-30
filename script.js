/* global jsnes */
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
        name: "Mickey Ak47",
        title: "Mikyflow",
        image: "img/Personaje_1.webp", // 👈 pon la URL/path de la foto aquí
        videoUrl: "video/Personaje_1.mp4",  // 👈 pon el link del video aquí
        stats: {
          SWAG:    95,
          FLOW:    88,
          DRIP:    92,
          VIBES:   97,
          NIVEL:   90,
        }
      },
      {
        name: "CSB",
        title: "Four Players",
        image: "img/Personaje_2.webp",
        videoUrl: "video/Personaje_2.mp4",
        stats: {
          SWAG:    80,
          FLOW:    75,
          DRIP:    85,
          VIBES:   78,
          NIVEL:   82,
        }
      },
      {
        name: "BICHO",
        title: "Un Jugador",
        image: "img/Personaje_3.webp",
        videoUrl: "video/Personaje_3.mp4",
        stats: {
          SWAG:    70,
          FLOW:    95,
          DRIP:    60,
          VIBES:   88,
          NIVEL:   76,
        }
      },
      // {
      //   name: "HUNTER 4",
      //   title: "El Artista",
      //   image: "img/WhatsApp Image 2026-03-21 at 11.05.24 (2).jpeg",
      //   videoUrl: "video/km_20241228-Copiar_1080p_60f_20241229_122234.mp4",
      //   stats: {
      //     SWAG:    88,
      //     FLOW:    65,
      //     DRIP:    72,
      //     VIBES:   91,
      //     NIVEL:   80,
      //   }
      // },
      // {
      //   name: "HUNTER 5",
      //   title: "El Novato",
      //   image: "img/WhatsApp Image 2026-03-21 at 11.05.24.jpeg",
      //   videoUrl: "video/km_20241228-Copiar_1080p_60f_20241229_122309.mp4",
      //   stats: {
      //     SWAG:    60,
      //     FLOW:    70,
      //     DRIP:    65,
      //     VIBES:   72,
      //     NIVEL:   66,
      //   }
      // },
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

    /* ─── EMULADOR JSNES ─────────────────────────────────────── */
    const canvas = document.getElementById("nes-canvas");
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(256, 240);
    const buf = new Uint32Array(imageData.data.buffer);

    let animationId = null;
    let nes = null;

    function createNes() {
      return new jsnes.NES({
        onFrame: function (buffer) {
          for (var i = 0; i < 256 * 240; i++) {
            buf[i] = 0xff000000 | buffer[i];
          }
          ctx.putImageData(imageData, 0, 0);
        }
      });
    }

    function loadROM() {
        const container = document.getElementById("nes-container");

        // 1. Detener cualquier proceso previo antes de empezar
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }

        // 2. Reiniciar el emulador para evitar estados acumulados
        nes = createNes();

        fetch("roms/duck-hunt.nes")
            .then((response) => response.arrayBuffer())
            .then((data) => {
                const romData = new Uint8Array(data);
                let binary = "";
                for (let i = 0; i < romData.length; i++) {
                    binary += String.fromCharCode(romData[i]);
                }

                nes.loadROM(binary);

                document.querySelector(".title-box").style.display = "none";
                container.style.display = "flex";
                container.style.flexDirection = "column";
                btnExitGame.style.display = "block";

                function step() {
                    if (container.style.display !== "flex") {
                        return;
                    }
                    nes.frame();
                    animationId = requestAnimationFrame(step);
                }
                animationId = requestAnimationFrame(step);
            })
            .catch((error) => {
                console.error("Error cargando ROM:", error);
            });
    }

    // 3. Controles de teclado
    const nesContainer = document.getElementById("nes-container");
    const btnExitGame = document.getElementById("btn-exit-game");

    /* ─── CONTROLES DE NES UNIFICADOS ────────────────────────── */

    // 1. Definimos el mapa de teclas una sola vez fuera de los eventos
    const keyMap = {
      38: jsnes.Controller.BUTTON_UP,    // Flecha Arriba
      40: jsnes.Controller.BUTTON_DOWN,  // Flecha Abajo
      37: jsnes.Controller.BUTTON_LEFT,  // Flecha Izquierda
      39: jsnes.Controller.BUTTON_RIGHT, // Flecha Derecha
      13: jsnes.Controller.BUTTON_START, // Enter (START)
      17: jsnes.Controller.BUTTON_SELECT,// Ctrl Izquierdo (SELECT)
      90: jsnes.Controller.BUTTON_A,     // Z (BOTÓN A / DISPARAR)
      88: jsnes.Controller.BUTTON_B      // X (BOTÓN B)
    };

    // 2. Evento KEYDOWN (Presionar)
    document.addEventListener("keydown", (e) => {
      // Solo actuamos si el contenedor del NES es visible
      const isVisible = window.getComputedStyle(nesContainer).display !== "none";
      if (!isVisible || !nes) return;

      if (keyMap[e.keyCode] !== undefined) {
        nes.buttonDown(1, keyMap[e.keyCode]);
        e.preventDefault(); // Evita que la página haga scroll con las flechas
      }
    });

    // 3. Evento KEYUP (Soltar)
    document.addEventListener("keyup", (e) => {
      const isVisible = window.getComputedStyle(nesContainer).display !== "none";
      if (!isVisible || !nes) return;

      if (keyMap[e.keyCode] !== undefined) {
        nes.buttonUp(1, keyMap[e.keyCode]);
        e.preventDefault();
      }
    });

    /* ─── DISPARO CON MOUSE (ZAPPER SIMULATION) ──────────────── */
    canvas.addEventListener("mousemove", (e) => {
      const isVisible = window.getComputedStyle(nesContainer).display !== "none";
      if (!isVisible || !nes) return;

      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(((e.clientX - rect.left) / rect.width) * 256);
      const y = Math.floor(((e.clientY - rect.top) / rect.height) * 240);
      nes.zapperMove(x, y);
    });

    canvas.addEventListener("mousedown", (e) => {
      const isVisible = window.getComputedStyle(nesContainer).display !== "none";
      if (!isVisible || !nes) return;

      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(((e.clientX - rect.left) / rect.width) * 256);
      const y = Math.floor(((e.clientY - rect.top) / rect.height) * 240);
      nes.zapperMove(x, y);
      nes.zapperFireDown();
      e.preventDefault();
    });

    canvas.addEventListener("mouseup", () => {
      const isVisible = window.getComputedStyle(nesContainer).display !== "none";
      if (!isVisible || !nes) return;
      nes.zapperFireUp();
    });

    document.getElementById("btn-exit-game").addEventListener("click", () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }

        nes = null;
        nesContainer.style.display = "none";
        btnExitGame.style.display = "none";
        document.querySelector(".title-box").style.display = "block";
        document.querySelector(".hud").style.display = "flex";

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    document.getElementById("btn-open-classic").onclick = function(e) {
        document.querySelector(".hud").style.display = "none";
        e.preventDefault();
        loadROM();
    };