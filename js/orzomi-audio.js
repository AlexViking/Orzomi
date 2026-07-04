/* ORZOMI audio engine — pure Web Audio synthesis, zero files.
   Sounds are "tactile, acoustic feedback": isolated, high-frequency, low-volume. */
window.OrzomiAudio = (function () {
  var ctx = null, master = null;
  var muted = localStorage.getItem('orzomi-audio-muted') === '1';
  var volume = 0.5; // 0..1, scaled down internally

  function ensure() {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      ctx = new AC();
      master = ctx.createGain();
      master.connect(ctx.destination);
      applyGain();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return true;
  }
  function applyGain() {
    if (master) master.gain.value = muted ? 0 : volume * 0.4;
  }

  /* micro-tick: camera-dial detent. ~15ms, 1.8kHz */
  function tick() {
    if (muted || !ensure()) return;
    var t = ctx.currentTime;
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'square'; o.frequency.value = 1800;
    g.gain.setValueAtTime(0.05, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.015);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + 0.02);
  }

  /* click: mechanical switch engaging — two-stage transient */
  function click() {
    if (muted || !ensure()) return;
    var t = ctx.currentTime;
    var o1 = ctx.createOscillator(), g1 = ctx.createGain();
    o1.type = 'square'; o1.frequency.value = 2600;
    g1.gain.setValueAtTime(0.07, t);
    g1.gain.exponentialRampToValueAtTime(0.0001, t + 0.012);
    o1.connect(g1); g1.connect(master);
    o1.start(t); o1.stop(t + 0.015);
    var o2 = ctx.createOscillator(), g2 = ctx.createGain();
    o2.type = 'triangle'; o2.frequency.value = 620;
    g2.gain.setValueAtTime(0.0001, t + 0.012);
    g2.gain.linearRampToValueAtTime(0.05, t + 0.016);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    o2.connect(g2); g2.connect(master);
    o2.start(t + 0.012); o2.stop(t + 0.06);
  }

  /* swoosh: data-routing sweep — filtered noise, matches panel slice (~320ms) */
  var noiseBuf = null;
  function getNoise() {
    if (!noiseBuf) {
      var len = ctx.sampleRate * 0.4;
      noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      var d = noiseBuf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    return noiseBuf;
  }
  function swoosh() {
    if (muted || !ensure()) return;
    var t = ctx.currentTime;
    var src = ctx.createBufferSource(); src.buffer = getNoise();
    var f = ctx.createBiquadFilter();
    f.type = 'bandpass'; f.Q.value = 6;
    f.frequency.setValueAtTime(240, t);
    f.frequency.exponentialRampToValueAtTime(3200, t + 0.28);
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.06, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);
    src.connect(f); f.connect(g); g.connect(master);
    src.start(t); src.stop(t + 0.35);
  }

  /* boot hum: low sine swell used once at initialization */
  function hum() {
    if (muted || !ensure()) return;
    var t = ctx.currentTime;
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(88, t);
    o.frequency.linearRampToValueAtTime(132, t + 0.9);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.05, t + 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + 1.2);
  }

  /* faint canvas tic — quieter, higher, rate-limited by caller */
  function tic() {
    if (muted || !ensure()) return;
    var t = ctx.currentTime;
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = 3400;
    g.gain.setValueAtTime(0.012, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.01);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + 0.012);
  }

  return {
    tick: tick, click: click, swoosh: swoosh, hum: hum, tic: tic,
    isMuted: function () { return muted; },
    setMuted: function (m) {
      muted = !!m;
      localStorage.setItem('orzomi-audio-muted', muted ? '1' : '0');
      applyGain();
      if (!muted) { ensure(); click(); }
    },
    setVolume: function (v) { volume = Math.max(0, Math.min(1, v)); applyGain(); }
  };
})();
