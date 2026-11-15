(() => {
  'use strict';

  // ==========================================
  // AUDIO SYNTHESIZER (Web Audio API)
  // ==========================================
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      return this.enabled;
    }

    playThrow(isFire = false) {
      if (!this.enabled || !this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = isFire ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(isFire ? 520 : 380, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.12);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    }

    playSwing(isGold = false) {
      if (!this.enabled || !this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isGold ? 300 : 210, now);
      osc.frequency.exponentialRampToValueAtTime(65, now + 0.16);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    }

    playBatHit() {
      if (!this.enabled || !this.ctx) return;
      const now = this.ctx.currentTime;
      // Sharp wood crack
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(720, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.14);
      gain.gain.setValueAtTime(0.32, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    }

    playDeflect() {
      if (!this.enabled || !this.ctx) return;
      const now = this.ctx.currentTime;
      // High metallic home-run ping!
      const freqs = [880, 1320];
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.03);
        osc.frequency.exponentialRampToValueAtTime(f * 1.15, now + 0.32);
        gain.gain.setValueAtTime(0.24, now + idx * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.03);
        osc.stop(now + 0.32);
      });
    }

    playBallHit() {
      if (!this.enabled || !this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.09);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    }

    playPowerup() {
      if (!this.enabled || !this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.055);
        gain.gain.setValueAtTime(0.16, now + i * 0.055);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.055 + 0.14);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.055);
        osc.stop(now + i * 0.055 + 0.14);
      });
    }

    playKO() {
      if (!this.enabled || !this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.35);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    }

    playFanfare(win = true) {
      if (!this.enabled || !this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = win
        ? [523.25, 659.25, 783.99, 1046.5]
        : [392.0, 349.23, 329.63, 261.63];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const t = now + i * 0.11;
        const dur = i === notes.length - 1 ? 0.45 : 0.12;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + dur);
      });
    }
  }

  const sfx = new SoundFX();

  // ==========================================
  // CONSTANTS & ARENA CONFIGURATION
  // ==========================================
  const ARENA = {
    width: 1700,
    height: 1700,
    centerX: 850,
    centerY: 850,
    wallPadding: 70
  };

  const BOT_PROFILES = [
    { name: 'Slugger', number: '44', primary: '#ef4444', cap: '#991b1b', aggression: 0.9 },
    { name: 'Ace',     number: '11', primary: '#f97316', cap: '#9a3412', aggression: 0.78 },
    { name: 'Curve',   number: '27', primary: '#a855f7', cap: '#581c87', aggression: 0.72 },
    { name: 'Bunter',  number: '08', primary: '#10b981', cap: '#065f46', aggression: 0.68 },
    { name: 'Homer',   number: '99', primary: '#eab308', cap: '#854d0e', aggression: 0.85 }
  ];

  const POWERUP_TYPES = {
    GOLDEN_BAT: {
      id: 'GOLDEN_BAT',
      label: 'GOLDEN BAT',
      icon: '🌟',
      color: '#facc15',
      glow: 'rgba(250, 204, 21, 0.4)',
      duration: 9.0
    },
    FASTBALL: {
      id: 'FASTBALL',
      label: 'FIRE FASTBALL',
      icon: '🔥',
      color: '#f97316',
      glow: 'rgba(249, 115, 22, 0.4)',
      duration: 9.0
    },
    HOTDOG: {
      id: 'HOTDOG',
      label: '+45 HP HOTDOG',
      icon: '🌭',
      color: '#4ade80',
      glow: 'rgba(74, 222, 128, 0.4)',
      heal: 45
    }
  };

  // ==========================================
  // MATH & GEOMETRY HELPERS
  // ==========================================
  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function dist(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function normalizeAngle(a) {
    while (a > Math.PI) a -= Math.PI * 2;
    while (a < -Math.PI) a += Math.PI * 2;
    return a;
  }

  function lerpAngle(a, b, t) {
    const diff = normalizeAngle(b - a);
    return a + diff * t;
  }

  // Circle vs Axis-Aligned Rounded Box collision & resolution
  function resolveCircleRect(circle, rect) {
    const closestX = clamp(circle.x, rect.x, rect.x + rect.w);
    const closestY = clamp(circle.y, rect.y, rect.y + rect.h);
    const dx = circle.x - closestX;
    const dy = circle.y - closestY;
    const d2 = dx * dx + dy * dy;
    const r = circle.radius;

    if (d2 < r * r) {
      const d = Math.sqrt(d2);
      if (d > 0.0001) {
        const overlap = r - d;
        circle.x += (dx / d) * overlap;
        circle.y += (dy / d) * overlap;
        return { hit: true, nx: dx / d, ny: dy / d };
      } else {
        // Inside rect center fallback
        circle.y -= r;
        return { hit: true, nx: 0, ny: -1 };
      }
    }
    return { hit: false, nx: 0, ny: 0 };
  }

  // Line segment intersection with rectangle (for AI line-of-sight)
  function lineIntersectsRect(x1, y1, x2, y2, rx, ry, rw, rh) {
    const steps = 10;
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const px = x1 + (x2 - x1) * t;
      const py = y1 + (y2 - y1) * t;
      if (px >= rx && px <= rx + rw && py >= ry && py <= ry + rh) {
        return true;
      }
    }
    return false;
  }

  // ==========================================
  // DOM ELEMENTS
  // ==========================================
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');

  const hudEl = document.getElementById('hud');
  const playerStatusEl = document.getElementById('player-status');
  const aliveCountEl = document.getElementById('alive-count');
  const killCountEl = document.getElementById('kill-count');
  const killFeedEl = document.getElementById('kill-feed');
  const powerupBannersEl = document.getElementById('powerup-banners');
  const audioToggleBtn = document.getElementById('audio-toggle');

  const hudHpFill = document.getElementById('hud-hp-fill');
  const hudHpText = document.getElementById('hud-hp-text');
  const hudAmmoSlots = Array.from(document.querySelectorAll('#hud-ammo-row .ammo-slot'));

  const startScreen = document.getElementById('start-screen');
  const endScreen = document.getElementById('end-screen');
  const playBtn = document.getElementById('play-btn');
  const playAgainBtn = document.getElementById('play-again-btn');

  const endBadge = document.getElementById('end-badge');
  const endTitle = document.getElementById('end-title');
  const endSubtitle = document.getElementById('end-subtitle');
  const statRank = document.getElementById('stat-rank');
  const statKills = document.getElementById('stat-kills');
  const statDamage = document.getElementById('stat-damage');
  const statDeflects = document.getElementById('stat-deflects');

  // ==========================================
  // GAME STATE
  // ==========================================
  let viewWidth = window.innerWidth;
  let viewHeight = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  let gameState = 'MENU'; // 'MENU' | 'PLAYING' | 'ENDED'
  let lastTime = performance.now();

  let players = [];
  let humanPlayer = null;
  let baseballs = [];
  let obstacles = [];
  let powerups = [];
  let particles = [];
  let floatingTexts = [];
  let swingEffects = [];

  let camera = {
    x: ARENA.centerX,
    y: ARENA.centerY,
    shakeTime: 0,
    shakeMagnitude: 0
  };

  let powerupSpawnTimer = 4.0;
  let matchTime = 0;
  let stormRadius = 1180; // Slowly closes in late-game to force action

  // ==========================================
  // CONTROLS STATE (Multi-Touch + Desktop)
  // ==========================================
  const controls = {
    isTouchDevice: ('ontouchstart' in window) || navigator.maxTouchPoints > 0,
    keys: {},
    mouse: {
      x: 0,
      y: 0,
      worldX: ARENA.centerX,
      worldY: ARENA.centerY,
      active: false
    },
    leftStick: {
      active: false,
      touchId: null,
      originX: 110,
      originY: 0,
      currX: 110,
      currY: 0,
      dx: 0,
      dy: 0,
      maxRadius: 56
    },
    rightStick: {
      active: false,
      touchId: null,
      originX: 0,
      originY: 0,
      currX: 0,
      currY: 0,
      dx: 0,
      dy: 0,
      aimAngle: 0,
      aimMagnitude: 0,
      maxRadius: 56
    },
    swingButton: {
      active: false,
      touchId: null,
      x: 0,
      y: 0,
      radius: 44
    }
  };

  function updateControlLayout() {
    const bottomOffset = Math.min(130, Math.max(92, viewHeight * 0.2));
    const sideOffset = Math.min(125, Math.max(82, viewWidth * 0.14));

    if (!controls.leftStick.active) {
      controls.leftStick.originX = sideOffset;
      controls.leftStick.originY = viewHeight - bottomOffset;
      controls.leftStick.currX = controls.leftStick.originX;
      controls.leftStick.currY = controls.leftStick.originY;
    }

    if (!controls.rightStick.active) {
      controls.rightStick.originX = viewWidth - sideOffset;
      controls.rightStick.originY = viewHeight - bottomOffset;
      controls.rightStick.currX = controls.rightStick.originX;
      controls.rightStick.currY = controls.rightStick.originY;
    }

    // Place BAT SWING button comfortably near the right thumb (up-left arc from right stick)
    controls.swingButton.x = viewWidth - sideOffset - 96;
    controls.swingButton.y = viewHeight - bottomOffset - 54;
    controls.swingButton.radius = viewWidth < 500 ? 38 : 44;
  }

  function resizeCanvas() {
    viewWidth = window.innerWidth;
    viewHeight = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(viewWidth * dpr);
    canvas.height = Math.floor(viewHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    updateControlLayout();
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // ==========================================
  // STADIUM OBSTACLES & LAYOUT
  // ==========================================
  function createStadiumObstacles() {
    const cx = ARENA.centerX;
    const cy = ARENA.centerY;

    obstacles = [
      // Central Pitcher's Mound L-Screens (provide tactical cover in center)
      {
        x: cx - 125,
        y: cy - 22,
        w: 75,
        h: 26,
        type: 'screen',
        label: 'L-SCREEN'
      },
      {
        x: cx + 50,
        y: cy - 22,
        w: 75,
        h: 26,
        type: 'screen',
        label: 'L-SCREEN'
      },
      // Top-Left Visitor Dugout
      {
        x: cx - 440,
        y: cy - 380,
        w: 220,
        h: 64,
        type: 'dugout',
        color: '#b91c1c',
        label: 'VISITORS DUGOUT'
      },
      // Top-Right Home Dugout
      {
        x: cx + 220,
        y: cy - 380,
        w: 220,
        h: 64,
        type: 'dugout',
        color: '#1d4ed8',
        label: 'HOME DUGOUT'
      },
      // Bottom-Left Bullpen Bench
      {
        x: cx - 430,
        y: cy + 310,
        w: 64,
        h: 190,
        type: 'bench',
        label: 'BENCH'
      },
      // Bottom-Right Bullpen Bench
      {
        x: cx + 366,
        y: cy + 310,
        w: 64,
        h: 190,
        type: 'bench',
        label: 'BENCH'
      },
      // Left & Right Batting Cage Barriers
      {
        x: cx - 540,
        y: cy - 70,
        w: 44,
        h: 140,
        type: 'screen',
        label: 'CAGE NET'
      },
      {
        x: cx + 496,
        y: cy - 70,
        w: 44,
        h: 140,
        type: 'screen',
        label: 'CAGE NET'
      },
      // Upper Outfield Scoreboard Stand Pillars
      {
        x: cx - 75,
        y: cy - 540,
        w: 150,
        h: 48,
        type: 'dugout',
        color: '#334155',
        label: 'SCOREBOARD'
      },
      // Lower Home-Plate Backstop Barrier
      {
        x: cx - 95,
        y: cy + 510,
        w: 190,
        h: 44,
        type: 'screen',
        label: 'BACKSTOP'
      }
    ];
  }

  // ==========================================
  // ENTITIES: PLAYER / AI FIGHTER
  // ==========================================
  class Fighter {
    constructor(config) {
      this.id = config.id;
      this.name = config.name;
      this.number = config.number || '01';
      this.isAI = config.isAI;
      this.x = config.x;
      this.y = config.y;
      this.vx = 0;
      this.vy = 0;
      this.knockVx = 0;
      this.knockVy = 0;
      this.radius = 24;
      this.angle = config.angle || 0;

      this.primaryColor = config.primaryColor;
      this.capColor = config.capColor;

      this.maxHp = 100;
      this.hp = 100;
      this.alive = true;
      this.placement = 0;

      // Movement
      this.baseSpeed = 248;

      // Ranged Baseball Ammo
      this.maxAmmo = 3;
      this.ammo = 3;
      this.ammoRechargeTimer = 0;
      this.ammoRechargeDuration = 1.25;
      this.throwCooldown = 0;

      // Melee Bat Swing
      this.swingCooldown = 0;
      this.swingCooldownMax = 0.62;
      this.isSwinging = false;
      this.swingTimer = 0;
      this.swingDuration = 0.19;
      this.swingStartAngle = 0;
      this.swingHitTargets = new Set();

      // Power-ups
      this.goldenBatTimer = 0;
      this.fastballTimer = 0;

      // Visual & Stats
      this.hitFlash = 0;
      this.stepDistance = 0;
      this.kills = 0;
      this.damageDealt = 0;
      this.deflections = 0;

      // AI State
      this.aggression = config.aggression || 0.75;
      this.aiThinkTimer = 0;
      this.aiStrafeDir = Math.random() < 0.5 ? 1 : -1;
      this.aiWanderAngle = Math.random() * Math.PI * 2;
      this.aiTarget = null;
    }

    get hasGoldenBat() {
      return this.goldenBatTimer > 0;
    }

    get hasFastball() {
      return this.fastballTimer > 0;
    }

    update(dt) {
      if (!this.alive) return;

      // Timers
      if (this.hitFlash > 0) this.hitFlash = Math.max(0, this.hitFlash - dt);
      if (this.throwCooldown > 0) this.throwCooldown = Math.max(0, this.throwCooldown - dt);
      if (this.swingCooldown > 0) this.swingCooldown = Math.max(0, this.swingCooldown - dt);
      if (this.goldenBatTimer > 0) this.goldenBatTimer = Math.max(0, this.goldenBatTimer - dt);
      if (this.fastballTimer > 0) this.fastballTimer = Math.max(0, this.fastballTimer - dt);

      // Ammo recharge
      if (this.ammo < this.maxAmmo) {
        const rate = this.hasFastball ? 1.55 : 1.0;
        this.ammoRechargeTimer += dt * rate;
        if (this.ammoRechargeTimer >= this.ammoRechargeDuration) {
          this.ammo++;
          this.ammoRechargeTimer = 0;
          if (!this.isAI) updateAmmoHUD();
        }
      } else {
        this.ammoRechargeTimer = 0;
      }

      // Active Bat Swing Hitbox check
      if (this.isSwinging) {
        this.swingTimer += dt;
        this.checkBatCollisions();
        if (this.swingTimer >= this.swingDuration) {
          this.isSwinging = false;
        }
      }

      // AI decision making
      if (this.isAI) {
        this.updateAI(dt);
      } else {
        this.updateHumanInput(dt);
      }

      // Apply movement + knockback decay
      this.knockVx *= Math.pow(0.0015, dt);
      this.knockVy *= Math.pow(0.0015, dt);

      const moveX = (this.vx + this.knockVx) * dt;
      const moveY = (this.vy + this.knockVy) * dt;
      this.x += moveX;
      this.y += moveY;

      // Footstep dust particles
      this.stepDistance += Math.hypot(moveX, moveY);
      if (this.stepDistance > 36) {
        this.stepDistance = 0;
        spawnParticles(this.x, this.y + 14, 2, '#d6b485', 25, 0.28, 3.5);
      }

      // Collide with stadium walls
      const minX = ARENA.wallPadding + this.radius;
      const maxX = ARENA.width - ARENA.wallPadding - this.radius;
      const minY = ARENA.wallPadding + this.radius;
      const maxY = ARENA.height - ARENA.wallPadding - this.radius;
      this.x = clamp(this.x, minX, maxX);
      this.y = clamp(this.y, minY, maxY);

      // Collide with arena obstacles
      for (const obs of obstacles) {
        resolveCircleRect(this, obs);
      }

      // Foul storm boundary damage if outside closing ring
      const distFromCenter = dist(this.x, this.y, ARENA.centerX, ARENA.centerY);
      if (distFromCenter > stormRadius) {
        this.takeDamage(14 * dt, null, false);
        // Gently push AI inward
        if (this.isAI) {
          const angleIn = Math.atan2(ARENA.centerY - this.y, ARENA.centerX - this.x);
          this.x += Math.cos(angleIn) * 60 * dt;
          this.y += Math.sin(angleIn) * 60 * dt;
        }
      }
    }

    updateHumanInput(dt) {
      let moveX = 0;
      let moveY = 0;

      // 1. Keyboard WASD / Arrow Keys
      if (controls.keys['KeyW'] || controls.keys['ArrowUp']) moveY -= 1;
      if (controls.keys['KeyS'] || controls.keys['ArrowDown']) moveY += 1;
      if (controls.keys['KeyA'] || controls.keys['ArrowLeft']) moveX -= 1;
      if (controls.keys['KeyD'] || controls.keys['ArrowRight']) moveX += 1;

      if (moveX !== 0 || moveY !== 0) {
        const len = Math.hypot(moveX, moveY);
        moveX /= len;
        moveY /= len;
      }

      // 2. Left Virtual Joystick overrides if active
      if (controls.leftStick.active) {
        moveX = controls.leftStick.dx;
        moveY = controls.leftStick.dy;
      }

      const speedMult = this.hasGoldenBat ? 1.12 : 1.0;
      this.vx = moveX * this.baseSpeed * speedMult;
      this.vy = moveY * this.baseSpeed * speedMult;

      // Aiming orientation:
      // Priority: 1. Right Aim Joystick, 2. Active Mouse cursor, 3. Movement direction
      if (controls.rightStick.active && controls.rightStick.aimMagnitude > 0.12) {
        this.angle = controls.rightStick.aimAngle;
      } else if (controls.mouse.active && !controls.leftStick.active) {
        const worldMouseX = camera.x - viewWidth / 2 + controls.mouse.x;
        const worldMouseY = camera.y - viewHeight / 2 + controls.mouse.y;
        this.angle = Math.atan2(worldMouseY - this.y, worldMouseX - this.x);
      } else if (Math.hypot(moveX, moveY) > 0.15) {
        this.angle = lerpAngle(this.angle, Math.atan2(moveY, moveX), Math.min(1, dt * 14));
      }
    }

    updateAI(dt) {
      this.aiThinkTimer -= dt;
      if (this.aiThinkTimer <= 0) {
        this.aiThinkTimer = 0.25 + Math.random() * 0.25;
        if (Math.random() < 0.35) this.aiStrafeDir *= -1;
        this.aiWanderAngle += (Math.random() - 0.5) * 1.2;
      }

      // 1. Check incoming baseballs to either deflect with bat or sidestep
      for (const ball of baseballs) {
        if (ball.owner === this) continue;
        const d = dist(this.x, this.y, ball.x, ball.y);
        if (d < 135) {
          // Check if ball is heading toward this bot
          const toBotX = this.x - ball.x;
          const toBotY = this.y - ball.y;
          const dot = toBotX * ball.vx + toBotY * ball.vy;
          if (dot > 0) {
            if (d < 92 && this.swingCooldown <= 0 && Math.random() < 0.68) {
              this.angle = Math.atan2(ball.y - this.y, ball.x - this.x);
              this.swingBat();
              break;
            }
          }
        }
      }

      // 2. Find best enemy target
      let bestTarget = null;
      let bestScore = Infinity;
      for (const other of players) {
        if (other === this || !other.alive) continue;
        const d = dist(this.x, this.y, other.x, other.y);
        // Prefer closer targets & low HP targets
        const score = d - (100 - other.hp) * 1.8;
        if (score < bestScore) {
          bestScore = score;
          bestTarget = other;
        }
      }
      this.aiTarget = bestTarget;

      // 3. Look for nearby power-up if convenient or low HP
      let desiredPowerup = null;
      let bestPowDist = this.hp < 60 ? 520 : 300;
      for (const p of powerups) {
        const d = dist(this.x, this.y, p.x, p.y);
        if (p.type.id === 'HOTDOG' && this.hp >= 95) continue;
        if (d < bestPowDist) {
          bestPowDist = d;
          desiredPowerup = p;
        }
      }

      let moveDirX = 0;
      let moveDirY = 0;

      if (desiredPowerup) {
        const angleToPow = Math.atan2(desiredPowerup.y - this.y, desiredPowerup.x - this.x);
        moveDirX = Math.cos(angleToPow);
        moveDirY = Math.sin(angleToPow);
      } else if (bestTarget) {
        const d = dist(this.x, this.y, bestTarget.x, bestTarget.y);
        const angleToTarget = Math.atan2(bestTarget.y - this.y, bestTarget.x - this.x);

        // Aim with slight target lead
        const leadTime = clamp(d / 680, 0, 0.45);
        const predX = bestTarget.x + bestTarget.vx * leadTime;
        const predY = bestTarget.y + bestTarget.vy * leadTime;
        const aimAngle = Math.atan2(predY - this.y, predX - this.x);
        this.angle = lerpAngle(this.angle, aimAngle, Math.min(1, dt * 11));

        // Check line of sight against obstacles
        let hasLOS = true;
        for (const obs of obstacles) {
          if (lineIntersectsRect(this.x, this.y, bestTarget.x, bestTarget.y, obs.x, obs.y, obs.w, obs.h)) {
            hasLOS = false;
            break;
          }
        }

        // Melee range -> charge in & swing bat!
        const meleeReach = this.hasGoldenBat ? 105 : 82;
        if (d <= meleeReach) {
          this.angle = angleToTarget;
          this.swingBat();
        } else if (d < 500 && hasLOS && this.ammo > 0 && this.throwCooldown <= 0) {
          // Ranged throw
          if (Math.random() < 0.08 * this.aggression || this.ammo === this.maxAmmo) {
            this.throwBaseball(aimAngle);
          }
        }

        // Desired engagement distance
        const idealRange = this.hasGoldenBat ? 45 : (this.ammo > 0 ? 250 : 55);
        let forwardWeight = 0;
        if (!hasLOS) {
          forwardWeight = 0.85;
        } else if (d > idealRange + 55) {
          forwardWeight = 0.85;
        } else if (d < idealRange - 45 && this.hp < 50 && !this.hasGoldenBat) {
          forwardWeight = -0.75;
        } else {
          forwardWeight = 0.2;
        }

        const strafeAngle = angleToTarget + (Math.PI / 2) * this.aiStrafeDir;
        moveDirX = Math.cos(angleToTarget) * forwardWeight + Math.cos(strafeAngle) * 0.65;
        moveDirY = Math.sin(angleToTarget) * forwardWeight + Math.sin(strafeAngle) * 0.65;
      } else {
        moveDirX = Math.cos(this.aiWanderAngle);
        moveDirY = Math.sin(this.aiWanderAngle);
      }

      // 4. Obstacle & Wall Avoidance steering
      const feelerDist = 68;
      for (const obs of obstacles) {
        const cx = clamp(this.x, obs.x, obs.x + obs.w);
        const cy = clamp(this.y, obs.y, obs.y + obs.h);
        const d = dist(this.x, this.y, cx, cy);
        if (d < feelerDist) {
          const pushStrength = (feelerDist - d) / feelerDist;
          const awayX = (this.x - cx) / (d || 1);
          const awayY = (this.y - cy) / (d || 1);
          // Also add tangential slide so AI doesn't get stuck head-on
          const tangentX = -awayY * this.aiStrafeDir;
          const tangentY = awayX * this.aiStrafeDir;
          moveDirX += (awayX * 1.6 + tangentX * 1.2) * pushStrength;
          moveDirY += (awayY * 1.6 + tangentY * 1.2) * pushStrength;
        }
      }

      // Keep inside arena bounds & storm circle
      const distCenter = dist(this.x, this.y, ARENA.centerX, ARENA.centerY);
      if (distCenter > stormRadius - 120) {
        const toCenter = Math.atan2(ARENA.centerY - this.y, ARENA.centerX - this.x);
        moveDirX += Math.cos(toCenter) * 1.8;
        moveDirY += Math.sin(toCenter) * 1.8;
      }

      const len = Math.hypot(moveDirX, moveDirY);
      if (len > 0.001) {
        moveDirX /= len;
        moveDirY /= len;
      }

      const speedMult = this.hasGoldenBat ? 1.1 : 0.94;
      this.vx = moveDirX * this.baseSpeed * speedMult;
      this.vy = moveDirY * this.baseSpeed * speedMult;
    }

    throwBaseball(overrideAngle = null) {
      if (!this.alive || this.ammo <= 0 || this.throwCooldown > 0) return false;

      const angle = overrideAngle !== null ? overrideAngle : this.angle;
      this.angle = angle;
      this.ammo--;
      this.throwCooldown = 0.22;

      const isFire = this.hasFastball;
      const speed = isFire ? 860 : 660;
      const damage = isFire ? 26 : 18;
      const spawnDist = this.radius + 10;

      baseballs.push({
        x: this.x + Math.cos(angle) * spawnDist,
        y: this.y + Math.sin(angle) * spawnDist,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: isFire ? 9 : 7.5,
        owner: this,
        damage: damage,
        isFire: isFire,
        isDeflected: false,
        spin: 0,
        life: 1.65,
        trail: []
      });

      sfx.playThrow(isFire);
      if (!this.isAI) updateAmmoHUD();
      return true;
    }

    swingBat() {
      if (!this.alive || this.swingCooldown > 0 || this.isSwinging) return false;

      this.isSwinging = true;
      this.swingTimer = 0;
      this.swingCooldown = this.hasGoldenBat ? 0.46 : this.swingCooldownMax;
      this.swingStartAngle = this.angle;
      this.swingHitTargets.clear();

      const swingRadius = this.hasGoldenBat ? 102 : 78;
      const swingArc = this.hasGoldenBat ? Math.PI * 0.92 : Math.PI * 0.76;

      swingEffects.push({
        owner: this,
        x: this.x,
        y: this.y,
        angle: this.angle,
        radius: swingRadius,
        arc: swingArc,
        isGold: this.hasGoldenBat,
        timer: 0,
        duration: 0.22
      });

      sfx.playSwing(this.hasGoldenBat);
      this.checkBatCollisions();
      return true;
    }

    checkBatCollisions() {
      const swingRadius = this.hasGoldenBat ? 104 : 80;
      const halfArc = (this.hasGoldenBat ? Math.PI * 0.92 : Math.PI * 0.78) / 2;

      // 1. Deflect incoming enemy baseballs!
      for (const ball of baseballs) {
        if (ball.owner === this) continue;
        const d = dist(this.x, this.y, ball.x, ball.y);
        if (d <= swingRadius + ball.radius + 10) {
          const angleToBall = Math.atan2(ball.y - this.y, ball.x - this.x);
          const angleDiff = Math.abs(normalizeAngle(angleToBall - this.angle));
          if (angleDiff <= halfArc + 0.3) {
            // Reflect baseball in our aim direction with turbo speed!
            ball.owner = this;
            ball.isDeflected = true;
            const currentSpeed = Math.hypot(ball.vx, ball.vy);
            const newSpeed = Math.min(1100, currentSpeed * 1.48);
            ball.vx = Math.cos(this.angle) * newSpeed;
            ball.vy = Math.sin(this.angle) * newSpeed;
            ball.damage = Math.round(ball.damage * 1.85);
            ball.life = 1.5;

            this.deflections++;
            sfx.playDeflect();
            addScreenShake(8, 0.18);
            spawnParticles(ball.x, ball.y, 16, '#facc15', 220, 0.4, 5);
            spawnFloatingText(ball.x, ball.y - 16, 'DEFLECT! ⚡', '#facc15', 1.15);
          }
        }
      }

      // 2. Hit enemy fighters in the swing cone!
      for (const other of players) {
        if (other === this || !other.alive || this.swingHitTargets.has(other.id)) continue;
        const d = dist(this.x, this.y, other.x, other.y);
        if (d <= swingRadius + other.radius) {
          const angleToEnemy = Math.atan2(other.y - this.y, other.x - this.x);
          const angleDiff = Math.abs(normalizeAngle(angleToEnemy - this.angle));
          if (angleDiff <= halfArc + 0.22) {
            this.swingHitTargets.add(other.id);
            const dmg = this.hasGoldenBat ? 52 : 34;
            const knockImpulse = this.hasGoldenBat ? 780 : 540;

            other.knockVx += Math.cos(angleToEnemy) * knockImpulse;
            other.knockVy += Math.sin(angleToEnemy) * knockImpulse;
            other.takeDamage(dmg, this, true);

            sfx.playBatHit();
            if (this === humanPlayer || other === humanPlayer) {
              addScreenShake(this.hasGoldenBat ? 13 : 9, 0.22);
            }
            spawnParticles(
              other.x,
              other.y,
              this.hasGoldenBat ? 22 : 14,
              this.hasGoldenBat ? '#facc15' : '#ffffff',
              240,
              0.45,
              5.5
            );
            spawnFloatingText(
              other.x,
              other.y - 28,
              this.hasGoldenBat ? `HOME RUN! -${dmg}` : `BONK! -${dmg}`,
              this.hasGoldenBat ? '#facc15' : '#fb7185',
              1.15
            );
          }
        }
      }
    }

    takeDamage(amount, attacker, isMelee = false) {
      if (!this.alive) return;
      this.hp -= amount;
      this.hitFlash = 0.16;

      if (attacker && attacker !== this) {
        attacker.damageDealt += Math.round(amount);
      }

      if (this === humanPlayer) {
        updateHealthHUD();
      }

      if (this.hp <= 0) {
        this.hp = 0;
        this.alive = false;
        const aliveNow = players.filter(p => p.alive).length;
        this.placement = aliveNow + 1;

        if (attacker && attacker !== this) {
          attacker.kills++;
          addKillFeed(`${attacker.name} ${isMelee ? '🏏 BONKED' : '⚾ STRUCK OUT'} ${this.name}!`);
        } else {
          addKillFeed(`${this.name} WAS ELIMINATED!`);
        }

        sfx.playKO();
        addScreenShake(11, 0.28);
        spawnParticles(this.x, this.y, 28, this.primaryColor, 260, 0.65, 6.5);
        spawnParticles(this.x, this.y, 16, '#ffffff', 180, 0.5, 4);
        spawnFloatingText(this.x, this.y - 20, 'YER OUT! 💀', '#ef4444', 1.35);

        updateTopHUD();
        checkMatchEnd();
      }
    }
  }

  // ==========================================
  // VISUAL JUICE: PARTICLES & FLOATING TEXT
  // ==========================================
  function spawnParticles(x, y, count, color, maxSpeed = 160, maxLife = 0.45, size = 4) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const spd = (0.25 + Math.random() * 0.75) * maxSpeed;
      const life = (0.55 + Math.random() * 0.45) * maxLife;
      particles.push({
        x,
        y,
        vx: Math.cos(a) * spd,
        vy: Math.sin(a) * spd,
        color,
        life,
        maxLife: life,
        size: size * (0.65 + Math.random() * 0.6)
      });
    }
  }

  function spawnFloatingText(x, y, text, color = '#ffffff', scale = 1) {
    floatingTexts.push({
      x,
      y,
      vy: -52,
      text,
      color,
      scale,
      life: 0.85,
      maxLife: 0.85
    });
  }

  function addScreenShake(magnitude, duration) {
    camera.shakeMagnitude = Math.max(camera.shakeMagnitude, magnitude);
    camera.shakeTime = Math.max(camera.shakeTime, duration);
  }

  function addKillFeed(message) {
    const item = document.createElement('div');
    item.className = 'kill-toast';
    item.textContent = message;
    killFeedEl.appendChild(item);
    while (killFeedEl.children.length > 3) {
      killFeedEl.removeChild(killFeedEl.firstChild);
    }
    setTimeout(() => {
      if (item.parentNode) item.parentNode.removeChild(item);
    }, 3200);
  }

  // ==========================================
  // POWER-UP SPAWNING
  // ==========================================
  function spawnRandomPowerup() {
    if (powerups.length >= 4) return;
    const keys = Object.keys(POWERUP_TYPES);
    const chosenType = POWERUP_TYPES[keys[Math.floor(Math.random() * keys.length)]];

    // Pick valid spot not inside obstacles
    for (let attempt = 0; attempt < 15; attempt++) {
      const angle = Math.random() * Math.PI * 2;
      const rad = 110 + Math.random() * Math.min(480, stormRadius - 140);
      const px = ARENA.centerX + Math.cos(angle) * rad;
      const py = ARENA.centerY + Math.sin(angle) * rad;

      let blocked = false;
      for (const obs of obstacles) {
        if (px > obs.x - 36 && px < obs.x + obs.w + 36 && py > obs.y - 36 && py < obs.y + obs.h + 36) {
          blocked = true;
          break;
        }
      }

      if (!blocked) {
        powerups.push({
          x: px,
          y: py,
          radius: 22,
          type: chosenType,
          bobPhase: Math.random() * Math.PI * 2
        });
        spawnParticles(px, py, 10, chosenType.color, 90, 0.4, 4);
        break;
      }
    }
  }

  // ==========================================
  // MATCH INITIALIZATION & FLOW
  // ==========================================
  function initMatch() {
    createStadiumObstacles();
    players = [];
    baseballs = [];
    powerups = [];
    particles = [];
    floatingTexts = [];
    swingEffects = [];
    killFeedEl.innerHTML = '';
    powerupBannersEl.innerHTML = '';

    matchTime = 0;
    stormRadius = 1180;
    powerupSpawnTimer = 2.5;

    // Spawn 6 fighters in a circle around the diamond
    const spawnRadius = 460;
    const totalFighters = 6;

    for (let i = 0; i < totalFighters; i++) {
      const spawnAngle = (Math.PI / 2) + (i * (Math.PI * 2)) / totalFighters;
      const sx = ARENA.centerX + Math.cos(spawnAngle) * spawnRadius;
      const sy = ARENA.centerY + Math.sin(spawnAngle) * spawnRadius;
      const faceCenter = Math.atan2(ARENA.centerY - sy, ARENA.centerX - sx);

      if (i === 0) {
        humanPlayer = new Fighter({
          id: 'player',
          name: 'YOU',
          number: '01',
          isAI: false,
          x: sx,
          y: sy,
          angle: faceCenter,
          primaryColor: '#3b82f6',
          capColor: '#1d4ed8'
        });
        players.push(humanPlayer);
      } else {
        const botCfg = BOT_PROFILES[i - 1];
        players.push(new Fighter({
          id: `bot_${i}`,
          name: botCfg.name,
          number: botCfg.number,
          isAI: true,
          x: sx,
          y: sy,
          angle: faceCenter,
          primaryColor: botCfg.primary,
          capColor: botCfg.cap,
          aggression: botCfg.aggression
        }));
      }
    }

    // Spawn 2 initial powerups
    spawnRandomPowerup();
    spawnRandomPowerup();

    camera.x = humanPlayer.x;
    camera.y = humanPlayer.y;

    gameState = 'PLAYING';
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    hudEl.classList.remove('hidden');
    playerStatusEl.classList.remove('hidden');

    updateTopHUD();
    updateHealthHUD();
    updateAmmoHUD();
  }

  function checkMatchEnd() {
    if (gameState !== 'PLAYING') return;

    const alivePlayers = players.filter(p => p.alive);

    // End immediately if human died OR only 1 fighter remains
    if (!humanPlayer.alive || alivePlayers.length <= 1) {
      gameState = 'ENDED';
      const isWinner = humanPlayer.alive && alivePlayers.length === 1;
      if (isWinner) {
        humanPlayer.placement = 1;
        spawnParticles(humanPlayer.x, humanPlayer.y, 55, '#facc15', 320, 1.1, 6);
        spawnParticles(humanPlayer.x, humanPlayer.y, 45, '#38bdf8', 280, 1.0, 5);
      }

      sfx.playFanfare(isWinner);

      setTimeout(() => {
        showEndScreen(isWinner);
      }, 650);
    }
  }

  function showEndScreen(isWinner) {
    hudEl.classList.add('hidden');
    playerStatusEl.classList.add('hidden');
    endScreen.classList.remove('hidden');

    if (isWinner) {
      endBadge.textContent = '🏆 CHAMPION';
      endBadge.style.background = '#22c55e';
      endTitle.innerHTML = 'VICTORY!<span>⚾</span>';
      endSubtitle.textContent = 'You are the last batter standing in the stadium!';
    } else {
      endBadge.textContent = '💥 KNOCKED OUT';
      endBadge.style.background = '#ef4444';
      endTitle.innerHTML = `ELIMINATED<span>#${humanPlayer.placement}</span>`;
      endSubtitle.textContent = `You placed #${humanPlayer.placement} out of 6 batters. Watch out for those swings!`;
    }

    statRank.textContent = `#${humanPlayer.placement} / 6`;
    statKills.textContent = `${humanPlayer.kills}`;
    statDamage.textContent = `${humanPlayer.damageDealt}`;
    statDeflects.textContent = `${humanPlayer.deflections}`;
  }

  // ==========================================
  // HUD UPDATES
  // ==========================================
  function updateTopHUD() {
    const aliveCount = players.filter(p => p.alive).length;
    aliveCountEl.textContent = `${aliveCount}/${players.length}`;
    if (humanPlayer) {
      killCountEl.textContent = `${humanPlayer.kills}`;
    }
  }

  function updateHealthHUD() {
    if (!humanPlayer) return;
    const pct = clamp((humanPlayer.hp / humanPlayer.maxHp) * 100, 0, 100);
    hudHpFill.style.width = `${pct}%`;
    hudHpText.textContent = `${Math.ceil(humanPlayer.hp)} / ${humanPlayer.maxHp} HP`;

    if (pct > 55) {
      hudHpFill.style.background = 'linear-gradient(90deg, #22c55e, #4ade80)';
    } else if (pct > 28) {
      hudHpFill.style.background = 'linear-gradient(90deg, #eab308, #facc15)';
    } else {
      hudHpFill.style.background = 'linear-gradient(90deg, #dc2626, #f87171)';
    }
  }

  function updateAmmoHUD() {
    if (!humanPlayer) return;
    hudAmmoSlots.forEach((slot, idx) => {
      if (idx < humanPlayer.ammo) {
        slot.classList.add('ready');
        slot.classList.remove('recharging');
      } else {
        slot.classList.remove('ready');
        slot.classList.add('recharging');
      }
    });
  }

  function updatePowerupHUD() {
    if (!humanPlayer) return;
    let html = '';
    if (humanPlayer.goldenBatTimer > 0) {
      html += `<div class="powerup-pill">🌟 GOLDEN BAT ${humanPlayer.goldenBatTimer.toFixed(1)}s</div>`;
    }
    if (humanPlayer.fastballTimer > 0) {
      html += `<div class="powerup-pill fastball">🔥 FASTBALL ${humanPlayer.fastballTimer.toFixed(1)}s</div>`;
    }
    if (powerupBannersEl.innerHTML !== html) {
      powerupBannersEl.innerHTML = html;
    }
  }

  // ==========================================
  // INPUT HANDLERS (MULTI-TOUCH + MOUSE/KEYBOARD)
  // ==========================================
  function handleTouchStart(e) {
    if (gameState !== 'PLAYING') return;
    e.preventDefault();
    sfx.init();
    controls.isTouchDevice = true;

    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      const tx = t.clientX;
      const ty = t.clientY;

      // Ignore touches on top-right mute button
      if (ty < 70 && tx > viewWidth - 70) continue;

      // 1. Check BAT SWING Button first
      const dSwing = dist(tx, ty, controls.swingButton.x, controls.swingButton.y);
      if (dSwing <= controls.swingButton.radius + 16 && controls.swingButton.touchId === null) {
        controls.swingButton.active = true;
        controls.swingButton.touchId = t.identifier;
        if (humanPlayer && humanPlayer.alive) {
          humanPlayer.swingBat();
        }
        continue;
      }

      // 2. Left half of screen -> Left Virtual Movement Joystick
      if (tx < viewWidth * 0.48 && controls.leftStick.touchId === null) {
        controls.leftStick.active = true;
        controls.leftStick.touchId = t.identifier;
        controls.leftStick.originX = tx;
        controls.leftStick.originY = ty;
        controls.leftStick.currX = tx;
        controls.leftStick.currY = ty;
        controls.leftStick.dx = 0;
        controls.leftStick.dy = 0;
        continue;
      }

      // 3. Right half of screen -> Right Virtual Aim & Throw Joystick
      if (tx >= viewWidth * 0.48 && controls.rightStick.touchId === null) {
        controls.rightStick.active = true;
        controls.rightStick.touchId = t.identifier;
        controls.rightStick.originX = tx;
        controls.rightStick.originY = ty;
        controls.rightStick.currX = tx;
        controls.rightStick.currY = ty;
        controls.rightStick.dx = 0;
        controls.rightStick.dy = 0;
        controls.rightStick.aimMagnitude = 0;
      }
    }
  }

  function handleTouchMove(e) {
    if (gameState !== 'PLAYING') return;
    e.preventDefault();

    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];

      // Update Left Stick
      if (t.identifier === controls.leftStick.touchId) {
        const rawDx = t.clientX - controls.leftStick.originX;
        const rawDy = t.clientY - controls.leftStick.originY;
        const d = Math.hypot(rawDx, rawDy);
        const maxR = controls.leftStick.maxRadius;
        const clamped = Math.min(d, maxR);
        const angle = Math.atan2(rawDy, rawDx);

        controls.leftStick.currX = controls.leftStick.originX + Math.cos(angle) * clamped;
        controls.leftStick.currY = controls.leftStick.originY + Math.sin(angle) * clamped;
        controls.leftStick.dx = d > 6 ? (Math.cos(angle) * (clamped / maxR)) : 0;
        controls.leftStick.dy = d > 6 ? (Math.sin(angle) * (clamped / maxR)) : 0;
      }

      // Update Right Aim Stick
      if (t.identifier === controls.rightStick.touchId) {
        const rawDx = t.clientX - controls.rightStick.originX;
        const rawDy = t.clientY - controls.rightStick.originY;
        const d = Math.hypot(rawDx, rawDy);
        const maxR = controls.rightStick.maxRadius;
        const clamped = Math.min(d, maxR);
        const angle = Math.atan2(rawDy, rawDx);

        controls.rightStick.currX = controls.rightStick.originX + Math.cos(angle) * clamped;
        controls.rightStick.currY = controls.rightStick.originY + Math.sin(angle) * clamped;
        controls.rightStick.dx = Math.cos(angle) * (clamped / maxR);
        controls.rightStick.dy = Math.sin(angle) * (clamped / maxR);
        controls.rightStick.aimMagnitude = clamped / maxR;
        if (d > 8) {
          controls.rightStick.aimAngle = angle;
        }
      }
    }
  }

  function handleTouchEnd(e) {
    if (gameState !== 'PLAYING') return;
    e.preventDefault();

    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];

      if (t.identifier === controls.leftStick.touchId) {
        controls.leftStick.active = false;
        controls.leftStick.touchId = null;
        controls.leftStick.dx = 0;
        controls.leftStick.dy = 0;
        updateControlLayout();
      }

      if (t.identifier === controls.rightStick.touchId) {
        // Releasing right joystick throws a fast baseball in the aimed direction!
        if (humanPlayer && humanPlayer.alive) {
          if (controls.rightStick.aimMagnitude > 0.16) {
            humanPlayer.throwBaseball(controls.rightStick.aimAngle);
          } else {
            // Quick tap on right stick throws toward nearest visible enemy or current facing
            humanPlayer.throwBaseball(humanPlayer.angle);
          }
        }
        controls.rightStick.active = false;
        controls.rightStick.touchId = null;
        controls.rightStick.dx = 0;
        controls.rightStick.dy = 0;
        controls.rightStick.aimMagnitude = 0;
        updateControlLayout();
      }

      if (t.identifier === controls.swingButton.touchId) {
        controls.swingButton.active = false;
        controls.swingButton.touchId = null;
      }
    }
  }

  canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
  canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
  canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
  canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false });

  // Desktop Mouse & Keyboard controls (plus clicking the on-screen Bat Swing button)
  window.addEventListener('keydown', e => {
    controls.keys[e.code] = true;
    if ((e.code === 'Space' || e.code === 'KeyE') && gameState === 'PLAYING') {
      e.preventDefault();
      sfx.init();
      if (humanPlayer && humanPlayer.alive) {
        humanPlayer.swingBat();
      }
    }
  });

  window.addEventListener('keyup', e => {
    controls.keys[e.code] = false;
  });

  let mouseDragStick = null; // 'left' | 'right' | null

  canvas.addEventListener('mousemove', e => {
    controls.mouse.x = e.clientX;
    controls.mouse.y = e.clientY;
    controls.mouse.active = true;

    if (mouseDragStick === 'left') {
      const rawDx = e.clientX - controls.leftStick.originX;
      const rawDy = e.clientY - controls.leftStick.originY;
      const d = Math.hypot(rawDx, rawDy);
      const maxR = controls.leftStick.maxRadius;
      const clamped = Math.min(d, maxR);
      const angle = Math.atan2(rawDy, rawDx);
      controls.leftStick.currX = controls.leftStick.originX + Math.cos(angle) * clamped;
      controls.leftStick.currY = controls.leftStick.originY + Math.sin(angle) * clamped;
      controls.leftStick.dx = d > 6 ? Math.cos(angle) * (clamped / maxR) : 0;
      controls.leftStick.dy = d > 6 ? Math.sin(angle) * (clamped / maxR) : 0;
    } else if (mouseDragStick === 'right') {
      const rawDx = e.clientX - controls.rightStick.originX;
      const rawDy = e.clientY - controls.rightStick.originY;
      const d = Math.hypot(rawDx, rawDy);
      const maxR = controls.rightStick.maxRadius;
      const clamped = Math.min(d, maxR);
      const angle = Math.atan2(rawDy, rawDx);
      controls.rightStick.currX = controls.rightStick.originX + Math.cos(angle) * clamped;
      controls.rightStick.currY = controls.rightStick.originY + Math.sin(angle) * clamped;
      controls.rightStick.dx = Math.cos(angle) * (clamped / maxR);
      controls.rightStick.dy = Math.sin(angle) * (clamped / maxR);
      controls.rightStick.aimMagnitude = clamped / maxR;
      if (d > 8) {
        controls.rightStick.aimAngle = angle;
      }
    }
  });

  canvas.addEventListener('mousedown', e => {
    if (gameState !== 'PLAYING') return;
    sfx.init();
    const mx = e.clientX;
    const my = e.clientY;

    // Check if player clicked the on-screen BAT SWING button with mouse
    const dSwing = dist(mx, my, controls.swingButton.x, controls.swingButton.y);
    if (dSwing <= controls.swingButton.radius + 10) {
      controls.swingButton.active = true;
      if (humanPlayer && humanPlayer.alive) humanPlayer.swingBat();
      setTimeout(() => { controls.swingButton.active = false; }, 150);
      return;
    }

    // Allow dragging the on-screen left or right virtual joysticks with the mouse for desktop testing
    const dLeft = dist(mx, my, controls.leftStick.originX, controls.leftStick.originY);
    if (dLeft <= controls.leftStick.maxRadius + 10 && e.button === 0) {
      mouseDragStick = 'left';
      controls.leftStick.active = true;
      return;
    }

    const dRight = dist(mx, my, controls.rightStick.originX, controls.rightStick.originY);
    if (dRight <= controls.rightStick.maxRadius + 10 && e.button === 0) {
      mouseDragStick = 'right';
      controls.rightStick.active = true;
      controls.rightStick.aimMagnitude = 0;
      return;
    }

    if (e.button === 2) {
      // Right click swings bat
      if (humanPlayer && humanPlayer.alive) humanPlayer.swingBat();
    } else if (e.button === 0) {
      // Left click throws baseball toward mouse cursor
      if (humanPlayer && humanPlayer.alive) {
        const worldMouseX = camera.x - viewWidth / 2 + mx;
        const worldMouseY = camera.y - viewHeight / 2 + my;
        const aimAngle = Math.atan2(worldMouseY - humanPlayer.y, worldMouseX - humanPlayer.x);
        humanPlayer.throwBaseball(aimAngle);
      }
    }
  });

  window.addEventListener('mouseup', () => {
    if (mouseDragStick === 'left') {
      controls.leftStick.active = false;
      controls.leftStick.dx = 0;
      controls.leftStick.dy = 0;
      updateControlLayout();
    } else if (mouseDragStick === 'right') {
      if (humanPlayer && humanPlayer.alive) {
        if (controls.rightStick.aimMagnitude > 0.16) {
          humanPlayer.throwBaseball(controls.rightStick.aimAngle);
        } else {
          humanPlayer.throwBaseball(humanPlayer.angle);
        }
      }
      controls.rightStick.active = false;
      controls.rightStick.dx = 0;
      controls.rightStick.dy = 0;
      controls.rightStick.aimMagnitude = 0;
      updateControlLayout();
    }
    mouseDragStick = null;
  });

  window.addEventListener('contextmenu', e => e.preventDefault());

  // UI Buttons
  playBtn.addEventListener('click', () => {
    sfx.init();
    initMatch();
  });

  playAgainBtn.addEventListener('click', () => {
    sfx.init();
    initMatch();
  });

  audioToggleBtn.addEventListener('click', e => {
    e.stopPropagation();
    sfx.init();
    const isOn = sfx.toggle();
    audioToggleBtn.textContent = isOn ? '🔊' : '🔇';
  });

  // ==========================================
  // MAIN UPDATE LOOP
  // ==========================================
  function update(dt) {
    if (gameState !== 'PLAYING') {
      // Gentle camera orbit on menu background
      matchTime += dt;
      camera.x = ARENA.centerX + Math.cos(matchTime * 0.25) * 140;
      camera.y = ARENA.centerY + Math.sin(matchTime * 0.25) * 140;
      return;
    }

    matchTime += dt;

    // Slowly shrink foul storm ring after 15 seconds to keep Battle Royale fast-paced
    if (matchTime > 15 && stormRadius > 420) {
      stormRadius = Math.max(420, stormRadius - 12 * dt);
    }

    // Power-up spawning
    powerupSpawnTimer -= dt;
    if (powerupSpawnTimer <= 0) {
      powerupSpawnTimer = 6.5;
      spawnRandomPowerup();
    }

    // Update fighters
    for (const p of players) {
      p.update(dt);
    }

    // Fighter-vs-Fighter body separation
    for (let i = 0; i < players.length; i++) {
      const a = players[i];
      if (!a.alive) continue;
      for (let j = i + 1; j < players.length; j++) {
        const b = players[j];
        if (!b.alive) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.hypot(dx, dy);
        const minDist = a.radius + b.radius;
        if (d < minDist && d > 0.001) {
          const overlap = (minDist - d) * 0.5;
          const nx = dx / d;
          const ny = dy / d;
          a.x -= nx * overlap;
          a.y -= ny * overlap;
          b.x += nx * overlap;
          b.y += ny * overlap;
        }
      }
    }

    // Update power-ups & pickups
    for (let i = powerups.length - 1; i >= 0; i--) {
      const pow = powerups[i];
      pow.bobPhase += dt * 4;

      for (const p of players) {
        if (!p.alive) continue;
        if (dist(p.x, p.y, pow.x, pow.y) <= p.radius + pow.radius) {
          // Apply power-up
          if (pow.type.id === 'GOLDEN_BAT') {
            p.goldenBatTimer = pow.type.duration;
            spawnFloatingText(p.x, p.y - 28, '🌟 GOLDEN BAT!', '#facc15', 1.15);
          } else if (pow.type.id === 'FASTBALL') {
            p.fastballTimer = pow.type.duration;
            p.ammo = p.maxAmmo;
            if (!p.isAI) updateAmmoHUD();
            spawnFloatingText(p.x, p.y - 28, '🔥 FIRE FASTBALL!', '#f97316', 1.15);
          } else if (pow.type.id === 'HOTDOG') {
            p.hp = Math.min(p.maxHp, p.hp + pow.type.heal);
            if (!p.isAI) updateHealthHUD();
            spawnFloatingText(p.x, p.y - 28, '🌭 +45 HP!', '#4ade80', 1.15);
          }

          if (p === humanPlayer) sfx.playPowerup();
          spawnParticles(pow.x, pow.y, 18, pow.type.color, 180, 0.45, 5);
          powerups.splice(i, 1);
          break;
        }
      }
    }

    // Update baseball projectiles
    for (let i = baseballs.length - 1; i >= 0; i--) {
      const b = baseballs[i];
      b.life -= dt;
      if (b.life <= 0) {
        baseballs.splice(i, 1);
        continue;
      }

      b.trail.push({ x: b.x, y: b.y });
      if (b.trail.length > 7) b.trail.shift();

      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.spin += dt * 22;

      if (b.isFire || b.isDeflected) {
        if (Math.random() < 0.6) {
          spawnParticles(
            b.x,
            b.y,
            1,
            b.isDeflected ? '#facc15' : '#f97316',
            45,
            0.2,
            3.5
          );
        }
      }

      // Check stadium outer wall collision
      if (
        b.x < ARENA.wallPadding ||
        b.x > ARENA.width - ARENA.wallPadding ||
        b.y < ARENA.wallPadding ||
        b.y > ARENA.height - ARENA.wallPadding
      ) {
        spawnParticles(b.x, b.y, 8, '#ffffff', 120, 0.25, 3);
        baseballs.splice(i, 1);
        continue;
      }

      // Check obstacle collision
      let hitObstacle = false;
      for (const obs of obstacles) {
        if (
          b.x + b.radius > obs.x &&
          b.x - b.radius < obs.x + obs.w &&
          b.y + b.radius > obs.y &&
          b.y - b.radius < obs.y + obs.h
        ) {
          spawnParticles(b.x, b.y, 9, '#e2e8f0', 140, 0.28, 3.5);
          hitObstacle = true;
          break;
        }
      }
      if (hitObstacle) {
        baseballs.splice(i, 1);
        continue;
      }

      // Check fighter collision
      let hitFighter = false;
      for (const p of players) {
        if (!p.alive || p === b.owner) continue;
        if (dist(b.x, b.y, p.x, p.y) <= b.radius + p.radius) {
          const hitAngle = Math.atan2(b.vy, b.vx);
          const knockForce = b.isDeflected ? 420 : (b.isFire ? 280 : 190);
          p.knockVx += Math.cos(hitAngle) * knockForce;
          p.knockVy += Math.sin(hitAngle) * knockForce;
          p.takeDamage(b.damage, b.owner, false);

          sfx.playBallHit();
          if (p === humanPlayer || b.owner === humanPlayer) {
            addScreenShake(b.isDeflected ? 8 : 4.5, 0.14);
          }

          spawnParticles(
            b.x,
            b.y,
            12,
            b.isDeflected ? '#facc15' : (b.isFire ? '#f97316' : '#ffffff'),
            190,
            0.35,
            4
          );
          spawnFloatingText(
            p.x,
            p.y - 24,
            `-${b.damage}`,
            b.isDeflected ? '#facc15' : '#f8fafc',
            b.isDeflected ? 1.15 : 0.95
          );
          hitFighter = true;
          break;
        }
      }
      if (hitFighter) {
        baseballs.splice(i, 1);
      }
    }

    // Update swing arc visual effects
    for (let i = swingEffects.length - 1; i >= 0; i--) {
      const s = swingEffects[i];
      s.timer += dt;
      if (s.owner) {
        s.x = s.owner.x;
        s.y = s.owner.y;
      }
      if (s.timer >= s.duration) {
        swingEffects.splice(i, 1);
      }
    }

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const pt = particles[i];
      pt.life -= dt;
      if (pt.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
      pt.vx *= 0.92;
      pt.vy *= 0.92;
    }

    // Update floating combat texts
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
      const ft = floatingTexts[i];
      ft.life -= dt;
      if (ft.life <= 0) {
        floatingTexts.splice(i, 1);
        continue;
      }
      ft.y += ft.vy * dt;
      ft.vy *= 0.94;
    }

    // Smooth camera follow on humanPlayer
    if (humanPlayer) {
      const targetX = humanPlayer.x + Math.cos(humanPlayer.angle) * 32;
      const targetY = humanPlayer.y + Math.sin(humanPlayer.angle) * 32;
      camera.x = lerp(camera.x, targetX, Math.min(1, dt * 8.5));
      camera.y = lerp(camera.y, targetY, Math.min(1, dt * 8.5));
    }

    if (camera.shakeTime > 0) {
      camera.shakeTime = Math.max(0, camera.shakeTime - dt);
      if (camera.shakeTime === 0) camera.shakeMagnitude = 0;
    }

    updatePowerupHUD();
  }

  // ==========================================
  // RENDERING PIPELINE
  // ==========================================
  function render() {
    ctx.clearRect(0, 0, viewWidth, viewHeight);

    // Compute camera offset with screen shake
    let shakeX = 0;
    let shakeY = 0;
    if (camera.shakeTime > 0) {
      shakeX = (Math.random() - 0.5) * 2 * camera.shakeMagnitude;
      shakeY = (Math.random() - 0.5) * 2 * camera.shakeMagnitude;
    }

    const camLeft = camera.x - viewWidth / 2 + shakeX;
    const camTop = camera.y - viewHeight / 2 + shakeY;

    ctx.save();
    ctx.translate(-camLeft, -camTop);

    drawStadiumBackground();
    drawObstacles();
    drawPowerups();
    drawSwingEffects();
    drawAimGuide();
    drawFighters();
    drawBaseballs();
    drawParticles();
    drawFloatingTexts();
    drawStormRing();

    ctx.restore();

    // Screen-space overlays (Off-screen indicators, Mini-map, Virtual Joysticks)
    if (gameState === 'PLAYING') {
      drawOffscreenIndicators(camLeft, camTop);
      drawMiniMap();
      drawTouchControls();
    }
  }

  function drawStadiumBackground() {
    const cx = ARENA.centerX;
    const cy = ARENA.centerY;

    // Outer stadium concrete & crowd stands
    ctx.fillStyle = '#0f2917';
    ctx.fillRect(0, 0, ARENA.width, ARENA.height);

    // Mowed outfield grass checkerboard / stripes
    const pad = ARENA.wallPadding;
    const fieldW = ARENA.width - pad * 2;
    const fieldH = ARENA.height - pad * 2;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(pad, pad, fieldW, fieldH, 48);
    ctx.clip();

    const stripeSize = 85;
    for (let x = pad; x < ARENA.width - pad; x += stripeSize) {
      for (let y = pad; y < ARENA.height - pad; y += stripeSize) {
        const ix = Math.floor((x - pad) / stripeSize);
        const iy = Math.floor((y - pad) / stripeSize);
        ctx.fillStyle = (ix + iy) % 2 === 0 ? '#1f7a38' : '#1a6b30';
        ctx.fillRect(x, y, stripeSize + 1, stripeSize + 1);
      }
    }

    // Dirt Warning Track around perimeter
    ctx.strokeStyle = '#9a653c';
    ctx.lineWidth = 48;
    ctx.strokeRect(pad + 18, pad + 18, fieldW - 36, fieldH - 36);

    // Baseball Infield Dirt Diamond
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = '#b97a45';
    ctx.strokeStyle = '#8a562d';
    ctx.lineWidth = 6;
    const diamondSize = 440;
    ctx.beginPath();
    ctx.roundRect(-diamondSize / 2, -diamondSize / 2, diamondSize, diamondSize, 26);
    ctx.fill();
    ctx.stroke();

    // Inner Grass Infield Square
    const innerGrassSize = 260;
    ctx.fillStyle = '#22873e';
    ctx.beginPath();
    ctx.roundRect(-innerGrassSize / 2, -innerGrassSize / 2, innerGrassSize, innerGrassSize, 14);
    ctx.fill();
    ctx.restore();

    // White Chalk Foul / Base Lines
    const baseOffset = 295;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.78)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(cx, cy + baseOffset); // Home
    ctx.lineTo(cx + baseOffset, cy); // 1st
    ctx.lineTo(cx, cy - baseOffset); // 2nd
    ctx.lineTo(cx - baseOffset, cy); // 3rd
    ctx.closePath();
    ctx.stroke();

    // Pitcher's Dirt Mound Circle
    ctx.fillStyle = '#b97a45';
    ctx.beginPath();
    ctx.arc(cx, cy, 56, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#8a562d';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Pitcher's Rubber
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(cx - 16, cy - 5, 32, 10);

    // Bases (1st, 2nd, 3rd) + Home Plate
    const bases = [
      { x: cx + baseOffset, y: cy },
      { x: cx, y: cy - baseOffset },
      { x: cx - baseOffset, y: cy }
    ];
    bases.forEach(b => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-13, -13, 26, 26);
      ctx.restore();
    });

    // Home plate pentagon
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    const hy = cy + baseOffset;
    ctx.moveTo(cx, hy + 14);
    ctx.lineTo(cx - 14, hy);
    ctx.lineTo(cx - 14, hy - 14);
    ctx.lineTo(cx + 14, hy - 14);
    ctx.lineTo(cx + 14, hy);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // Stadium Padded Wall Border
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.roundRect(pad, pad, fieldW, fieldH, 48);
    ctx.stroke();

    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(pad - 3, pad - 3, fieldW + 6, fieldH + 6, 50);
    ctx.stroke();
  }

  function drawObstacles() {
    for (const obs of obstacles) {
      ctx.save();

      // Drop shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.beginPath();
      ctx.roundRect(obs.x + 6, obs.y + 8, obs.w, obs.h, 10);
      ctx.fill();

      if (obs.type === 'dugout') {
        ctx.fillStyle = obs.color || '#1e3a8a';
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(obs.x, obs.y, obs.w, obs.h, 10);
        ctx.fill();
        ctx.stroke();

        // Roof stripes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
        for (let sx = obs.x + 16; sx < obs.x + obs.w - 12; sx += 28) {
          ctx.fillRect(sx, obs.y + 4, 12, obs.h - 8);
        }
      } else if (obs.type === 'bench') {
        ctx.fillStyle = '#92400e';
        ctx.strokeStyle = '#451a03';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(obs.x, obs.y, obs.w, obs.h, 8);
        ctx.fill();
        ctx.stroke();

        // Wood planks
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(obs.x + obs.w * 0.35, obs.y + 6);
        ctx.lineTo(obs.x + obs.w * 0.35, obs.y + obs.h - 6);
        ctx.moveTo(obs.x + obs.w * 0.65, obs.y + 6);
        ctx.lineTo(obs.x + obs.w * 0.65, obs.y + obs.h - 6);
        ctx.stroke();
      } else {
        // Pitcher L-Screen / Mesh Net Barrier
        ctx.fillStyle = '#334155';
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(obs.x, obs.y, obs.w, obs.h, 8);
        ctx.fill();
        ctx.stroke();

        // Netting crosshatch hint
        ctx.fillStyle = '#cbd5e1';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(obs.label || 'COVER', obs.x + obs.w / 2, obs.y + obs.h / 2);
      }

      ctx.restore();
    }
  }

  function drawPowerups() {
    for (const pow of powerups) {
      const bobY = Math.sin(pow.bobPhase) * 4;
      ctx.save();
      ctx.translate(pow.x, pow.y + bobY);

      // Pulsing ground aura
      const pulse = 1 + Math.sin(pow.bobPhase * 1.5) * 0.12;
      ctx.fillStyle = pow.type.glow;
      ctx.beginPath();
      ctx.arc(0, 0, pow.radius * 1.45 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Badge circle
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = pow.type.color;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(0, 0, pow.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Icon
      ctx.font = '20px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(pow.type.icon, 0, 1);

      ctx.restore();
    }
  }

  function drawAimGuide() {
    if (!humanPlayer || !humanPlayer.alive) return;

    const showTouchAim = controls.rightStick.active && controls.rightStick.aimMagnitude > 0.12;
    const showDesktopAim = !controls.isTouchDevice && controls.mouse.active;

    if (!showTouchAim && !showDesktopAim) return;

    const aimAngle = showTouchAim ? controls.rightStick.aimAngle : humanPlayer.angle;
    const length = 260;

    ctx.save();
    ctx.translate(humanPlayer.x, humanPlayer.y);
    ctx.rotate(aimAngle);

    // Dotted trajectory line
    ctx.strokeStyle = humanPlayer.hasFastball
      ? 'rgba(249, 115, 22, 0.7)'
      : 'rgba(56, 189, 248, 0.65)';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(humanPlayer.radius + 10, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();

    // Target reticle at end of aim line
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(length, 0, 9, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  function drawSwingEffects() {
    for (const s of swingEffects) {
      const progress = clamp(s.timer / s.duration, 0, 1);
      const alpha = (1 - progress) * 0.65;

      ctx.save();
      ctx.translate(s.x, s.y);

      const startA = s.angle - s.arc / 2;
      const endA = s.angle + s.arc / 2;

      // Filled arc slash
      ctx.fillStyle = s.isGold
        ? `rgba(250, 204, 21, ${alpha})`
        : `rgba(226, 232, 240, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, s.radius, startA, endA);
      ctx.closePath();
      ctx.fill();

      // Bright outer edge swipe
      ctx.strokeStyle = s.isGold
        ? `rgba(254, 240, 138, ${ (1 - progress) * 0.95 })`
        : `rgba(255, 255, 255, ${ (1 - progress) * 0.95 })`;
      ctx.lineWidth = s.isGold ? 7 : 5;
      ctx.beginPath();
      ctx.arc(0, 0, s.radius, startA, endA);
      ctx.stroke();

      ctx.restore();
    }
  }

  function drawFighters() {
    for (const p of players) {
      if (!p.alive) continue;

      ctx.save();
      ctx.translate(p.x, p.y);

      // Player indicator ring under feet
      if (!p.isAI) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius + 9, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Golden Bat or Fastball aura
      if (p.hasGoldenBat || p.hasFastball) {
        ctx.strokeStyle = p.hasGoldenBat ? 'rgba(250, 204, 21, 0.7)' : 'rgba(249, 115, 22, 0.7)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius + 5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Drop shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.beginPath();
      ctx.arc(3, 5, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Rotate character body & bat toward aim angle
      ctx.save();
      ctx.rotate(p.angle);

      // Draw Baseball Bat
      let batAngleOffset = -0.75; // Held cocked at right side
      if (p.isSwinging) {
        const swingProg = clamp(p.swingTimer / p.swingDuration, 0, 1);
        batAngleOffset = lerp(-1.25, 1.35, swingProg);
      }

      ctx.save();
      ctx.rotate(batAngleOffset);
      const batLen = p.hasGoldenBat ? 54 : 42;
      ctx.fillStyle = p.hasGoldenBat ? '#facc15' : '#d97706';
      ctx.strokeStyle = p.hasGoldenBat ? '#854d0e' : '#451a03';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(p.radius - 6, -4.5, batLen, 9, 4.5);
      ctx.fill();
      ctx.stroke();
      // Grip tape
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(p.radius - 4, -3.5, 11, 7);
      ctx.restore();

      // Shoulders / Jersey Body Circle
      ctx.fillStyle = p.hitFlash > 0 ? '#ffffff' : p.primaryColor;
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Baseball Cap Brim pointing forward (+X)
      ctx.fillStyle = p.hitFlash > 0 ? '#ffffff' : p.capColor;
      ctx.beginPath();
      ctx.ellipse(10, 0, 14, 13, 0, -Math.PI / 2, Math.PI / 2);
      ctx.fill();
      ctx.stroke();

      // Cap Crown
      ctx.fillStyle = p.hitFlash > 0 ? '#ffffff' : p.primaryColor;
      ctx.beginPath();
      ctx.arc(-2, 0, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Cap button dot
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(-3, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Overhead Name, Health Bar & Ammo Pips (non-rotated)
      const barW = 54;
      const barH = 7;
      const barY = -p.radius - 20;

      // Name label
      ctx.font = 'bold 12px "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#0f172a';
      ctx.fillText(p.name, 1, barY - 6);
      ctx.fillStyle = p.isAI ? '#f8fafc' : '#38bdf8';
      ctx.fillText(p.name, 0, barY - 7);

      // Health bar background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      ctx.roundRect(-barW / 2 - 1, barY - 1, barW + 2, barH + 2, 4);
      ctx.fill();

      // Health bar fill
      const hpRatio = clamp(p.hp / p.maxHp, 0, 1);
      ctx.fillStyle = p.isAI
        ? (hpRatio > 0.35 ? '#ef4444' : '#f97316')
        : (hpRatio > 0.35 ? '#22c55e' : '#ef4444');
      ctx.beginPath();
      ctx.roundRect(-barW / 2, barY, barW * hpRatio, barH, 3);
      ctx.fill();

      // Small ammo pips under player
      if (!p.isAI) {
        for (let i = 0; i < p.maxAmmo; i++) {
          const px = (i - 1) * 11;
          const py = p.radius + 14;
          ctx.fillStyle = i < p.ammo ? '#f8fafc' : 'rgba(255, 255, 255, 0.25)';
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(px, py, 3.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }

      ctx.restore();
    }
  }

  function drawBaseballs() {
    for (const b of baseballs) {
      // Motion trail
      if (b.trail.length > 1) {
        for (let i = 0; i < b.trail.length; i++) {
          const t = b.trail[i];
          const ratio = (i + 1) / b.trail.length;
          ctx.fillStyle = b.isDeflected
            ? `rgba(250, 204, 21, ${ratio * 0.48})`
            : (b.isFire ? `rgba(249, 115, 22, ${ratio * 0.45})` : `rgba(255, 255, 255, ${ratio * 0.32})`);
          ctx.beginPath();
          ctx.arc(t.x, t.y, b.radius * ratio * 0.85, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.spin);

      // Ball sphere
      ctx.fillStyle = b.isDeflected ? '#fef08a' : '#ffffff';
      ctx.strokeStyle = b.isDeflected ? '#ca8a04' : (b.isFire ? '#ea580c' : '#1e293b');
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Red baseball stitches
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(-b.radius * 0.45, 0, b.radius * 0.65, -0.8, 0.8);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(b.radius * 0.45, 0, b.radius * 0.65, Math.PI - 0.8, Math.PI + 0.8);
      ctx.stroke();

      ctx.restore();
    }
  }

  function drawParticles() {
    for (const pt of particles) {
      const alpha = clamp(pt.life / pt.maxLife, 0, 1);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size * alpha, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function drawFloatingTexts() {
    for (const ft of floatingTexts) {
      const alpha = clamp(ft.life / ft.maxLife, 0, 1);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = `900 ${Math.round(15 * ft.scale)}px "Segoe UI", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = '#0f172a';
      ctx.fillText(ft.text, ft.x + 1.5, ft.y + 1.5);
      ctx.fillStyle = ft.color;
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    }
  }

  function drawStormRing() {
    if (stormRadius >= 1150) return;
    ctx.save();
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
    ctx.lineWidth = 6;
    ctx.setLineDash([18, 12]);
    ctx.beginPath();
    ctx.arc(ARENA.centerX, ARENA.centerY, stormRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // ==========================================
  // SCREEN-SPACE OVERLAYS: INDICATORS, MINIMAP & TOUCH STICKS
  // ==========================================
  function drawOffscreenIndicators(camLeft, camTop) {
    if (!humanPlayer || !humanPlayer.alive) return;

    const margin = 34;
    for (const p of players) {
      if (!p.alive || p === humanPlayer) continue;

      const screenX = p.x - camLeft;
      const screenY = p.y - camTop;

      // If visible on screen, skip indicator
      if (
        screenX >= 20 &&
        screenX <= viewWidth - 20 &&
        screenY >= 20 &&
        screenY <= viewHeight - 20
      ) {
        continue;
      }

      const angle = Math.atan2(p.y - humanPlayer.y, p.x - humanPlayer.x);
      const centerX = viewWidth / 2;
      const centerY = viewHeight / 2;

      const maxRx = centerX - margin;
      const maxRy = centerY - margin;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      const scale = Math.min(
        Math.abs(maxRx / (cos || 0.0001)),
        Math.abs(maxRy / (sin || 0.0001))
      );

      const indX = centerX + cos * scale;
      const indY = centerY + sin * scale;

      ctx.save();
      ctx.translate(indX, indY);
      ctx.rotate(angle);

      // Arrow pointer
      ctx.fillStyle = p.primaryColor;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(-10, -9);
      ctx.lineTo(-6, 0);
      ctx.lineTo(-10, 9);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }
  }

  function drawMiniMap() {
    const mapSize = viewWidth < 500 ? 86 : 108;
    const padX = 16;
    const padY = 58;
    const mapX = viewWidth - mapSize - padX;
    const mapY = padY;

    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.78)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(mapX, mapY, mapSize, mapSize, 12);
    ctx.fill();
    ctx.stroke();

    // Diamond outline inside minimap
    const mcx = mapX + mapSize / 2;
    const mcy = mapY + mapSize / 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(mcx, mcy - 18);
    ctx.lineTo(mcx + 18, mcy);
    ctx.lineTo(mcx, mcy + 18);
    ctx.lineTo(mcx - 18, mcy);
    ctx.closePath();
    ctx.stroke();

    // Powerups on minimap
    for (const pow of powerups) {
      const px = mapX + (pow.x / ARENA.width) * mapSize;
      const py = mapY + (pow.y / ARENA.height) * mapSize;
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Fighters on minimap
    for (const p of players) {
      if (!p.alive) continue;
      const px = mapX + (p.x / ARENA.width) * mapSize;
      const py = mapY + (p.y / ARENA.height) * mapSize;
      ctx.fillStyle = p.isAI ? '#ef4444' : '#38bdf8';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(px, py, p.isAI ? 3.5 : 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawTouchControls() {
    // 1. Left Virtual Movement Joystick
    drawVirtualStick(
      controls.leftStick,
      'MOVE',
      'rgba(56, 189, 248, 0.25)',
      'rgba(56, 189, 248, 0.85)'
    );

    // 2. Right Virtual Aim & Throw Joystick
    drawVirtualStick(
      controls.rightStick,
      'AIM / THROW',
      'rgba(249, 115, 22, 0.25)',
      'rgba(249, 115, 22, 0.88)'
    );

    // 3. Dedicated BAT SWING Button
    const btn = controls.swingButton;
    ctx.save();
    ctx.translate(btn.x, btn.y);

    const ready = humanPlayer && humanPlayer.swingCooldown <= 0;
    const isGold = humanPlayer && humanPlayer.hasGoldenBat;

    // Outer button circle
    ctx.fillStyle = btn.active
      ? 'rgba(250, 204, 21, 0.92)'
      : (isGold ? 'rgba(234, 179, 8, 0.82)' : 'rgba(220, 38, 38, 0.78)');
    ctx.strokeStyle = ready ? '#ffffff' : 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(0, 0, btn.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Cooldown radial sweep if on cooldown
    if (humanPlayer && humanPlayer.swingCooldown > 0) {
      const ratio = humanPlayer.swingCooldown / humanPlayer.swingCooldownMax;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, btn.radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ratio);
      ctx.closePath();
      ctx.fill();
    }

    // Icon & Label
    ctx.font = '22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🏏', 0, -6);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 10px "Segoe UI", sans-serif';
    ctx.fillText('BAT SWING', 0, 15);

    ctx.restore();
  }

  function drawVirtualStick(stick, label, baseFill, knobFill) {
    ctx.save();
    const alpha = stick.active ? 0.95 : 0.48;
    ctx.globalAlpha = alpha;

    // Base ring
    ctx.fillStyle = baseFill;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(stick.originX, stick.originY, stick.maxRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Label below stick when idle
    if (!stick.active) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.font = 'bold 10px "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, stick.originX, stick.originY + stick.maxRadius + 15);
    }

    // Thumb Knob
    ctx.fillStyle = knobFill;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(stick.currX, stick.currY, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  // ==========================================
  // INITIALIZE & START RAF LOOP
  // ==========================================
  createStadiumObstacles();

  function gameLoop(now) {
    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;

    update(dt);
    render();

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
})();
