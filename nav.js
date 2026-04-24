/* nav.js — shared navigation + common utilities for FEEL */

// ── Page map ──
const PAGE_MAP = {
  home:     'index.html',
  emotions: 'emotions.html',
  journal:  'journal.html',
  data:     'data.html',
  profile:  'profile.html',
};

// ── Inject radial nav into every page ──
function initNav(activePage) {

  // ── Inject required CSS ──
  const style = document.createElement('style');
  style.textContent = `
    .radial-nav-wrap {
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: var(--w, 834px);
      z-index: 200;
      pointer-events: none;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 58px;
    }
    .radial-scene {
      position: relative;
      width: 120px;
      height: 120px;
      pointer-events: all;
      transform: scale(0.6);
      transform-origin: center bottom;
    }
    .r-circle {
      position: absolute;
      border-radius: 50%;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform .15s, background .15s, box-shadow .15s;
      box-shadow: 0 4px 18px rgba(0,0,0,0.32);
    }
    .r-circle:hover { background: #1a1a1a; box-shadow: 0 6px 24px rgba(0,0,0,0.45); }
    .r-center {
      width: 120px; height: 120px;
      top: 0; left: 0; z-index: 10;
    }
    .r-center svg { width: 52%; height: 52%; }
    .r-orbit {
      width: 80px; height: 80px;
      top: 20px; left: 20px;
      opacity: 0;
      pointer-events: none;
      transform: scale(0.4);
      transition: opacity .22s ease, transform .3s cubic-bezier(.34,1.56,.64,1);
    }
    .r-orbit svg { width: 40%; height: 40%; }
    .radial-scene.open .r-orbit {
      opacity: 1;
      pointer-events: all;
      transform: translate(var(--ox), var(--oy)) scale(1);
    }
    .radial-scene.open .r-orbit:nth-child(1) { transition-delay: .02s; }
    .radial-scene.open .r-orbit:nth-child(2) { transition-delay: .05s; }
    .radial-scene.open .r-orbit:nth-child(3) { transition-delay: .08s; }
    .radial-scene.open .r-orbit:nth-child(4) { transition-delay: .11s; }
    .radial-scene.open .r-orbit:nth-child(5) { transition-delay: .14s; }
    .r-orbit .r-label {
      position: absolute;
      bottom: -22px; left: 50%;
      transform: translateX(-50%);
      font-size: 10px; font-weight: 600;
      color: #333; white-space: nowrap;
      pointer-events: none; opacity: 0;
      transition: opacity .15s;
      font-family: 'Roboto', sans-serif;
    }
    .radial-scene.open .r-orbit .r-label { opacity: 1; transition-delay: .2s; }
    .r-orbit.active-page {
      background: #222;
      box-shadow: 0 0 0 3px #77DEF8, 0 4px 18px rgba(0,0,0,0.32);
    }
  `;
  document.head.appendChild(style);

  // ── Build HTML ──
  const wrap = document.createElement('div');
  wrap.className = 'radial-nav-wrap';

  wrap.innerHTML = `
    <div class="radial-scene" id="radial-scene">

      <!-- Orbit 1: Home -->
      <div class="r-circle r-orbit ${activePage === 'home' ? 'active-page' : ''}"
           style="--ox:0px;--oy:-110px"
           onclick="window.location.href='index.html'">
        <svg viewBox="0 0 227 227" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M115.965 44.9C115.305 44.27 114.427 43.92 113.513 43.92C112.6 43.92 111.722 44.27 111.062 44.9L29.44 122.88C29.09 123.21 28.82 123.61 28.63 124.05C28.44 124.49 28.34 124.97 28.34 125.44L28.33 198.63C28.33 202.39 29.83 206 32.49 208.66C35.15 211.32 38.76 212.81 42.52 212.81H85.13C87.01 212.81 88.81 212.07 90.14 210.74C91.47 209.41 92.22 207.6 92.22 205.72V145.42C92.22 144.48 92.59 143.58 93.26 142.91C93.92 142.25 94.83 141.88 95.77 141.88H131.23C132.18 141.88 133.08 142.25 133.74 142.91C134.41 143.58 134.78 144.48 134.78 145.42V205.72C134.78 207.6 135.53 209.41 136.86 210.74C138.19 212.07 139.99 212.81 141.88 212.81H184.46C188.23 212.81 191.84 211.32 194.5 208.66C197.16 206 198.65 202.39 198.65 198.63V125.44C198.65 124.97 198.56 124.49 198.37 124.05C198.18 123.61 197.9 123.21 197.56 122.88L115.965 44.9Z" fill="white"/>
          <path d="M217.65 108.25L184.49 76.52V28.38C184.49 26.49 183.74 24.69 182.41 23.36C181.08 22.03 179.27 21.28 177.39 21.28H156.11C154.23 21.28 152.43 22.03 151.1 23.36C149.77 24.69 149.02 26.49 149.02 28.38V42.56L123.34 18.01C120.94 15.58 117.36 14.19 113.5 14.19C109.65 14.19 106.09 15.58 103.68 18.01L9.38 108.24C6.62 110.9 6.28 115.27 8.79 118.16C9.42 118.88 10.19 119.47 11.06 119.89C11.92 120.31 12.86 120.55 13.83 120.6C14.79 120.64 15.75 120.49 16.65 120.15C17.55 119.81 18.37 119.29 19.06 118.63L111.062 30.72C111.722 30.08 112.6 29.73 113.513 29.73C114.427 29.73 115.305 30.08 115.965 30.72L207.97 118.63C209.33 119.93 211.14 120.63 213.02 120.6C214.9 120.56 216.68 119.78 217.99 118.43C220.71 115.61 220.48 110.96 217.65 108.25Z" fill="white"/>
        </svg>
      </div>

      <!-- Orbit 2: Profile -->
      <div class="r-circle r-orbit ${activePage === 'profile' ? 'active-page' : ''}"
           style="--ox:-115px;--oy:-35px"
           onclick="window.location.href='profile.html'">
        <svg viewBox="0 0 227 227" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M147.48 28.63C138.85 19.32 126.8 14.19 113.5 14.19C100.13 14.19 88.04 19.29 79.45 28.54C70.77 37.9 66.54 50.62 67.53 64.36C69.5 91.46 90.12 113.5 113.5 113.5C136.88 113.5 157.46 91.46 159.46 64.37C160.47 50.76 156.21 38.06 147.48 28.63Z" fill="white"/>
          <path d="M191.53 212.81H35.47C33.43 212.84 31.4 212.41 29.55 211.56C27.69 210.7 26.05 209.45 24.74 207.88C21.86 204.43 20.7 199.73 21.56 194.97C25.3 174.21 36.98 156.78 55.33 144.54C71.64 133.67 92.29 127.69 113.5 127.69C134.71 127.69 155.36 133.67 171.67 144.54C190.02 156.77 201.7 174.21 205.44 194.97C206.3 199.73 205.14 204.43 202.26 207.87C200.95 209.44 199.31 210.7 197.45 211.55C195.6 212.41 193.57 212.84 191.53 212.81Z" fill="white"/>
        </svg>
      </div>

      <!-- Orbit 3: Emotions / Tracker -->
      <div class="r-circle r-orbit ${activePage === 'emotions' ? 'active-page' : ''}"
           style="--ox:115px;--oy:-35px"
           onclick="window.location.href='emotions.html'">
        <svg viewBox="0 0 239 233" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M160.83 220.5C147.25 220.5 134.01 214.45 124.49 203.91C123.19 202.47 121.43 201.68 119.53 201.68C117.64 201.68 115.86 202.47 114.51 203.92C110.69 207.99 107.28 210.87 103.47 213.27C95.97 217.99 87.31 220.5 78.44 220.5C71.56 220.5 64.6 218.95 58.33 216.03C45.87 210.24 36.52 199.44 32.66 186.41C28.77 173.31 30.76 159.08 38.11 147.37C38.86 146.18 39.03 144.65 38.58 143.06C38.05 141.12 36.69 139.41 35.05 138.58C31.88 136.99 28.49 135.16 25.1 132.63C8.74 120.41 2.2 99.23 8.84 79.91C15.37 60.91 33.29 48.14 53.43 48.14C57.36 48.14 61.32 48.63 65.19 49.59C65.5 49.67 65.84 49.71 66.18 49.71C68.93 49.71 71.99 47.07 72.35 44.4C73 39.54 73.68 35.15 75.38 30.66C82.24 12.49 99.96 0.28 119.47 0.28C122.03 0.28 124.61 0.49 127.14 0.91C148.83 4.5 165.1 22.55 166.69 44.81C166.88 47.43 170.43 49.69 173.21 49.69C173.57 49.69 173.92 49.65 174.24 49.57C178.01 48.63 181.87 48.16 185.72 48.16C203.59 48.16 219.68 58.11 227.68 74.14C233.47 85.73 234.28 98.76 229.96 110.84C225.59 123.04 216.55 132.74 204.51 138.15C202.67 138.98 201.14 140.74 200.52 142.74C199.99 144.5 200.19 146.27 201.09 147.74C207.52 158.15 209.73 170.44 207.32 182.35C204.89 194.28 198.03 204.73 188 211.78C179.89 217.49 170.48 220.5 160.81 220.5H160.83Z" fill="white"/>
          <path d="M75.63 209.36C56.89 208.07 42.08 192.75 41.4 174.28C40.91 161.24 47.37 149.38 58.43 142.58C66.13 137.85 74.38 134.14 83.27 132.4C98.82 129.36 113.39 140.28 114.94 156.01C115.9 165.76 114.72 175.76 111.7 185.14C106.74 200.51 91.94 210.48 75.63 209.35V209.36Z" fill="white"/>
          <path d="M141.32 78.48C133.12 88.8 118.95 92.57 106.81 86.08C102.4 83.72 98.96 80.43 96.02 76.4C91.45 70.11 87.79 63.49 85.36 56.09C81.31 43.81 84.29 30.47 93.19 21.15C104.69 9.11 122.77 6.48 137.27 14.58C151.95 22.78 158.93 40.14 153.56 56.24C150.87 64.33 146.64 71.79 141.33 78.48H141.32Z" fill="white"/>
          <path d="M186.38 129.92C177.43 129.8 164.97 127.26 157.34 122.94C143.95 115.37 139.32 98.83 147.14 85.49C151.32 78.34 157 72.02 163.48 66.67C180.55 52.56 205.39 57.06 216.82 75.11C224.96 87.95 224.16 104.47 214.83 116.4C207.94 125.2 197.57 130.08 186.37 129.93L186.38 129.92Z" fill="white"/>
          <path d="M78.86 124.36C70.48 127.98 61.78 129.7 52.79 129.91C42.76 130.15 33.23 126.23 26.39 119.06C16.2 108.39 13.67 92.63 19.85 79.22C26.12 65.63 40.5 57.19 55.52 58.44C62.24 59 68.41 61.44 73.79 65.46C81.13 70.94 87.33 77.81 91.89 85.75C100.11 100.07 94.04 117.81 78.86 124.36Z" fill="white"/>
          <path d="M157.95 209.3C143.32 208.14 131.3 198.24 127.01 184.48C124.08 175.12 122.24 160.38 125.02 150.99C129.04 137.42 142.66 129.41 156.54 132.53C164.6 134.34 172.08 137.72 179.22 141.76C194.53 150.42 201.37 168.51 195.45 185.05C189.93 200.45 174.66 210.62 157.95 209.3Z" fill="white"/>
        </svg>
      </div>

      <!-- Orbit 4: Analytics / Data -->
      <div class="r-circle r-orbit ${activePage === 'data' ? 'active-page' : ''}"
           style="--ox:-80px;--oy:85px"
           onclick="window.location.href='data.html'">
        <svg viewBox="0 0 277 277" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M246.7 69.25C243.18 69.25 239.71 70.11 236.6 71.76C233.48 73.41 230.81 75.79 228.83 78.7C226.84 81.61 225.6 84.96 225.21 88.46C224.81 91.96 225.28 95.51 226.56 98.79L181.02 144.33C175.95 142.33 170.3 142.33 165.23 144.33L132.67 111.77C133.96 108.49 134.43 104.95 134.04 101.44C133.64 97.94 132.4 94.59 130.41 91.67C128.43 88.76 125.76 86.38 122.65 84.73C119.53 83.08 116.06 82.22 112.53 82.22C109.01 82.22 105.53 83.08 102.42 84.73C99.3 86.38 96.63 88.76 94.65 91.67C92.66 94.59 91.42 97.94 91.03 101.44C90.63 104.95 91.1 108.49 92.39 111.77L38.2 165.97C33.57 164.15 28.46 163.99 23.72 165.5C18.98 167.01 14.91 170.1 12.19 174.26C9.46 178.42 8.26 183.39 8.77 188.34C9.28 193.28 11.48 197.9 14.99 201.42C18.51 204.93 23.12 207.13 28.07 207.64C33.02 208.15 37.99 206.94 42.15 204.22C46.31 201.5 49.4 197.42 50.91 192.69C52.42 187.95 52.25 182.84 50.44 178.21L104.63 124.02C109.71 126.02 115.35 126.02 120.43 124.02L152.98 156.57C151.69 159.85 151.23 163.4 151.62 166.9C152.01 170.4 153.26 173.76 155.24 176.67C157.23 179.58 159.9 181.97 163.01 183.62C166.13 185.26 169.6 186.12 173.13 186.12C176.65 186.12 180.12 185.26 183.24 183.62C186.36 181.97 189.02 179.58 191.01 176.67C193 173.76 194.24 170.4 194.63 166.9C195.02 163.4 194.56 159.85 193.27 156.57L238.8 111.03C241.77 112.2 244.95 112.69 248.13 112.49C251.3 112.28 254.4 111.37 257.18 109.83C259.97 108.29 262.38 106.16 264.25 103.58C266.12 100.998 267.39 98.04 267.98 94.91C268.57 91.78 268.47 88.56 267.67 85.48C266.87 82.4 265.41 79.53 263.38 77.08C261.34 74.63 258.8 72.65 255.91 71.3C253.03 69.95 249.89 69.25 246.7 69.25Z" fill="white"/>
        </svg>
      </div>

      <!-- Orbit 5: Journal -->
      <div class="r-circle r-orbit ${activePage === 'journal' ? 'active-page' : ''}"
           style="--ox:80px;--oy:85px"
           onclick="window.location.href='journal.html'">
        <svg viewBox="0 0 227 227" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M189.76 99.31H127.69C122.04 99.31 116.63 97.07 112.64 93.08C108.65 89.09 106.41 83.68 106.41 78.03V15.96C106.41 15.49 106.22 15.04 105.89 14.71C105.55 14.37 105.1 14.19 104.63 14.19H63.84C56.32 14.19 49.1 17.18 43.78 22.5C38.46 27.82 35.47 35.04 35.47 42.56V184.44C35.47 191.96 38.46 199.18 43.78 204.5C49.1 209.82 56.32 212.81 63.84 212.81H163.16C170.68 212.81 177.9 209.82 183.22 204.5C188.54 199.18 191.53 191.96 191.53 184.44V101.09C191.53 100.62 191.34 100.17 191.01 99.83C190.68 99.5 190.23 99.31 189.76 99.31ZM148.97 170.25H78.03C76.15 170.25 74.35 169.5 73.02 168.17C71.68 166.84 70.94 165.04 70.94 163.16C70.94 161.28 71.68 159.47 73.02 158.14C74.35 156.81 76.15 156.06 78.03 156.06H148.97C150.85 156.06 152.65 156.81 153.99 158.14C155.32 159.47 156.06 161.28 156.06 163.16C156.06 165.04 155.32 166.84 153.99 168.17C152.65 169.5 150.85 170.25 148.97 170.25ZM148.97 134.78H78.03C76.15 134.78 74.35 134.03 73.02 132.7C71.68 131.37 70.94 129.57 70.94 127.69C70.94 125.81 71.68 124 73.02 122.67C74.35 121.34 76.15 120.59 78.03 120.59H148.97C150.85 120.59 152.65 121.34 153.99 122.67C155.32 124 156.06 125.81 156.06 127.69C156.06 129.57 155.32 131.37 153.99 132.7C152.65 134.03 150.85 134.78 148.97 134.78Z" fill="white"/>
          <path d="M185.87 83.62L122.11 19.86C121.98 19.74 121.82 19.65 121.65 19.62C121.48 19.58 121.3 19.6 121.14 19.67C120.98 19.74 120.84 19.85 120.74 19.99C120.65 20.14 120.59 20.31 120.59 20.48V78.04C120.59 79.92 121.34 81.72 122.67 83.05C124 84.38 125.81 85.13 127.69 85.13H185.24C185.42 85.13 185.59 85.08 185.73 84.98C185.88 84.88 185.99 84.74 186.06 84.58C186.12 84.42 186.14 84.24 186.11 84.07C186.07 83.9 185.99 83.74 185.87 83.62Z" fill="white"/>
        </svg>
      </div>

      <!-- Centre smiley button -->
      <div class="r-circle r-center" id="radial-center-btn">
        <svg viewBox="0 0 368 365" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mm" fill="white"><path d="M367.196 194.863C360.101 292.407 279.919 364.898 183.609 364.848C86.3284 364.798 5.99311 289.841 0.327788 193.002C-5.49065 94.0997 66.7805 10.1386 167.021 0.831952C280.583 -9.73236 375.413 81.7243 367.196 194.913V194.863ZM347.852 238.177C372.708 167.094 348.822 91.7353 292.015 46.9124C233.576 0.831895 151.097 -2.13617 88.8293 38.1088C27.4295 77.8507 -2.17318 151.7 15.7415 223.538C34.2686 297.689 99.3433 350.913 175.034 354.434C252.103 358.006 321.975 312.228 347.903 238.177H347.852Z"/></mask>
          <path d="M367.196 194.863C360.101 292.407 279.919 364.898 183.609 364.848C86.3284 364.798 5.99311 289.841 0.327788 193.002C-5.49065 94.0997 66.7805 10.1386 167.021 0.831952C280.583 -9.73236 375.413 81.7243 367.196 194.913V194.863ZM347.852 238.177C372.708 167.094 348.822 91.7353 292.015 46.9124C233.576 0.831895 151.097 -2.13617 88.8293 38.1088C27.4295 77.8507 -2.17318 151.7 15.7415 223.538C34.2686 297.689 99.3433 350.913 175.034 354.434C252.103 358.006 321.975 312.228 347.903 238.177H347.852Z" fill="white"/>
          <path d="M285.842 194.608C310.647 198.683 265.478 284.405 182.794 283.952C134.103 283.701 93.5273 253.718 74.7449 210.354C72.244 204.619 76.1741 195.866 80.6655 193.954C85.7694 191.791 95.3137 195.111 97.6105 200.695C112.412 236.614 145.74 258.95 183.764 259C221.788 259.051 254.963 236.614 269.918 200.544C271.857 195.916 281.402 193.904 285.893 194.659L285.842 194.608Z" fill="white"/>
          <path d="M228.423 108.891C241.897 102.602 256.443 107.784 262.364 119.354C268.182 130.673 264.201 145.866 250.88 152.305C240.672 157.235 226.126 153.915 219.287 142.948C212.805 132.585 214.643 115.33 228.423 108.941V108.891Z" fill="white"/>
          <path d="M116.957 108.287C129.716 102.955 143.752 107.432 149.775 119.757C155.287 131.026 151.255 145.262 137.831 151.651C126.807 156.933 112.057 152.959 105.881 141.288C99.5523 129.366 103.431 113.922 116.957 108.287Z" fill="white"/>
        </svg>
      </div>

    </div>
  `;

  document.body.appendChild(wrap);

  // ── Toggle logic ──
  const scene = wrap.querySelector('#radial-scene');
  const centerBtn = wrap.querySelector('#radial-center-btn');
  let radialOpen = false;

  centerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    radialOpen = !radialOpen;
    scene.classList.toggle('open', radialOpen);
  });

  document.addEventListener('click', (e) => {
    if (radialOpen && !scene.contains(e.target)) {
      radialOpen = false;
      scene.classList.remove('open');
    }
  });

  // ── Toast ──
  if (!document.getElementById('toast')) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ── Shared data utilities ──
const STORAGE_KEY = 'spark_api_data';

function loadStoredData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch(e) {}
  return [];
}

function saveData(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e) {}
}

function mergeAndStore(existing, fresh) {
  const map = new Map(existing.map(d => [d.id, d]));
  fresh.forEach(d => map.set(d.id, d));
  const merged = [...map.values()].sort((a,b) => b.id - a.id);
  saveData(merged);
  return merged;
}

function formatTime(ts) {
  return new Date(ts.replace(' ','T') + 'Z').toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
}
function utcTimestampToLocalDate(ts) {
  return new Date(ts.replace(' ','T') + 'Z').toLocaleDateString('en-CA');
}
function todayLocalStr() { return new Date().toLocaleDateString('en-CA'); }

// ── Shared emotion config ──
const defaultEmotions = [
  { name:'Happiness', key:1 }, { name:'Sadness', key:2 },
  { name:'Boredom',   key:3 }, { name:'Envy',    key:4 },
  { name:'Excitement',key:5 },
];

function loadEmotions() {
  return JSON.parse(localStorage.getItem('spark_emotions') || 'null') || defaultEmotions;
}
function saveEmotions(emotions) {
  localStorage.setItem('spark_emotions', JSON.stringify(emotions));
}

const EMOTION_GRADIENTS = {
  'Happiness':'linear-gradient(135deg,#f5a623,#f0c040,#fde68a)',
  'Joy':'linear-gradient(135deg,#f5a623,#f0c040,#fde68a)',
  'Sadness':'linear-gradient(135deg,#2d3a8c,#3b5bdb,#1a1a4e)',
  'Boredom':'linear-gradient(135deg,#2a1f3d,#3d2b55,#1e1428)',
  'Envy':'linear-gradient(135deg,#52a86b,#8bc4a0,#b86fa0)',
  'Excitement':'linear-gradient(135deg,#fde68a,#f5a623,#e8456a)',
  'Calm':'linear-gradient(135deg,#a3c4bc,#cce4df)',
  'Anxious':'linear-gradient(135deg,#e88a8a,#f4c4c4)',
  'Angry':'linear-gradient(135deg,#e8456a,#c0392b)',
  'Calmness':'linear-gradient(135deg,#cde8c0,#a8d8a0,#e8f5c0)',
  'Satisfaction':'linear-gradient(135deg,#e8f5c0,#f5e642,#77DEF8)',
  'Horror':'linear-gradient(135deg,#3d1a1a,#6b2e2e,#2d1010)',
  'Fear':'linear-gradient(135deg,#2d1a3d,#4a2d55,#1a1028)',
  'Anger':'linear-gradient(135deg,#c0a0a0,#d4b8b8,#a88888)',
  'Surprise':'linear-gradient(135deg,#e88ae8,#77DEF8,#f5a623)',
  'Pride':'linear-gradient(135deg,#e84040,#c83030,#f06050)',
  'Relief':'linear-gradient(135deg,#c8f0c8,#a0d8a0,#e0f8e0)',
};
const EMOTION_COLORS = {
  'Happiness':'#f5a623','Joy':'#f5c97a','Sadness':'#3b5bdb',
  'Boredom':'#3d2b55','Envy':'#b8a8d8','Excitement':'#e8456a',
  'Calm':'#a3c4bc','Calmness':'#9fd4a8','Anxious':'#e88a8a',
  'Angry':'#c0a0a0','Anger':'#c0a0a0','Satisfaction':'#e8f5c0',
  'Horror':'#6b2e2e','Fear':'#4a2d55','Surprise':'#e88ae8',
  'Pride':'#e84040','Relief':'#c8f0c8',
};

function getGrad(name) { return EMOTION_GRADIENTS[name] || 'linear-gradient(135deg,#c0bdb8,#a8a5a0)'; }
function getCol(name)  { return EMOTION_COLORS[name]  || '#aaa'; }
function getEmotionByKey(emotions, val) { return emotions.find(e => e.key === val) || { name:'Unknown', key:val }; }