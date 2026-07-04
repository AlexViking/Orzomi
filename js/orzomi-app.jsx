/* ORZOMI app — master frame, boot sequence, blueprint overlay, nav, status bars, tweaks. */
(function () {
  const { useState, useEffect, useRef } = React;
  const A = () => window.OrzomiAudio;

  const SECTIONS = ['home', 'projects', 'specs', 'contact'];
  const STATUS = {
    home: 'STATUS: IDLE // READY',
    projects: 'STATUS: ARCHIVE OPEN // 4 RECORDS',
    specs: 'STATUS: SPEC SHEET LOADED',
    contact: 'STATUS: CHANNEL OPEN // AWAITING INPUT',
  };

  const MARK = (
    <svg viewBox="64 94 476 754" fill="currentColor" aria-hidden="true">
      <use href="#orzomi-mark" />
    </svg>
  );

  /* ---------- boot overlay ---------- */
  const BOOT_LINES = [
    ['> loading proportion tables', 'φ = 1.6180339'],
    ['> synthesizing audio graph', 'OK'],
    ['> grid: 21px', 'RATIO LOCKED'],
    ['> emulsion', 'READY'],
    ['STATUS: INITIALIZED', ''],
  ];

  function Boot({ onDone }) {
    const [shown, setShown] = useState(0);
    const [out, setOut] = useState(false);
    const done = useRef(false);

    function finish() {
      if (done.current) return;
      done.current = true;
      setOut(true);
      setTimeout(onDone, 280);
    }
    useEffect(() => {
      A().hum();
      const timers = BOOT_LINES.map((_, i) =>
        setTimeout(() => { setShown(i + 1); A().tic(); }, 130 + i * 190)
      );
      timers.push(setTimeout(finish, 130 + BOOT_LINES.length * 190 + 260));
      const onKey = () => finish();
      window.addEventListener('keydown', onKey);
      return () => { timers.forEach(clearTimeout); window.removeEventListener('keydown', onKey); };
    }, []);

    return (
      <div className={'boot' + (out ? ' done' : '')} onClick={finish}>
        <div>
          <svg className="boot-mark" viewBox="64 94 476 754" fill="currentColor"><use href="#orzomi-mark" /></svg>
          <div className="boot-log">
            {BOOT_LINES.slice(0, shown).map(([l, r], i) => (
              <div className="line" key={i}><span>{l}</span><span className="ok">{r}</span></div>
            ))}
          </div>
          <div className="boot-skip">CLICK TO SKIP</div>
        </div>
      </div>
    );
  }

  /* ---------- blueprint overlay ---------- */
  function BlueprintOverlay() {
    const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
    useEffect(() => {
      const onR = () => setSize({ w: window.innerWidth, h: window.innerHeight });
      window.addEventListener('resize', onR);
      return () => window.removeEventListener('resize', onR);
    }, []);
    const { w, h } = size;
    const sideW = Math.round(w * 0.236);
    const goldenX = sideW + Math.round((w - sideW) / 1.618);
    const goldenY = 56 + Math.round((h - 90) / 1.618);
    return (
      <div className="bp-overlay" aria-hidden="true">
        <div className="bp-vline" style={{ left: sideW }}></div>
        <div className="bp-vline" style={{ left: goldenX }}></div>
        <div className="bp-hline" style={{ top: 56 }}></div>
        <div className="bp-hline" style={{ top: goldenY }}></div>
        <div className="bp-hline" style={{ top: h - 34 }}></div>
        <div className="bp-dim" style={{ left: sideW / 2 - 34, top: h - 76 }}>{sideW}PX // 23.6%</div>
        <div className="bp-dim" style={{ left: goldenX + 8, top: goldenY + 8 }}>φ SPLIT // {goldenX - sideW}:{w - goldenX}</div>
        <div className="bp-dim" style={{ right: 8, top: 62 }}>VIEWPORT {w}×{h} // GRID 21PX</div>
      </div>
    );
  }

  /* ---------- top bar ---------- */
  function TopBar({ section, goTo, audioOn, setAudioOn, blueprint, setBlueprint }) {
    /* proximity sensing on nav links */
    const navRef = useRef(null);
    useEffect(() => {
      let raf = 0;
      function onMove(e) {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          if (!navRef.current) return;
          navRef.current.querySelectorAll('.nav-link').forEach((el) => {
            const r = el.getBoundingClientRect();
            const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
            const d = Math.hypot(e.clientX - cx, e.clientY - cy);
            el.style.setProperty('--prox', String(Math.max(0, 1 - d / 180).toFixed(2)));
          });
        });
      }
      window.addEventListener('mousemove', onMove);
      return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
    }, []);

    return (
      <header className="topbar" data-bp="TOP // 56PX">
        <div className="brand">
          {MARK}
          <span className="brand-name">ORZOMI</span>
          <span className="brand-edition">ED.01</span>
        </div>
        <nav className="nav" ref={navRef}>
          {SECTIONS.map((s) => (
            <button
              key={s}
              className={'nav-link prox' + (section === s ? ' active' : '')}
              onMouseEnter={() => A().tick()}
              onClick={() => goTo(s)}
            >[{s.toUpperCase()}]</button>
          ))}
        </nav>
        <div className="top-controls">
          <button className={'ctrl' + (blueprint ? ' on' : '')} onMouseEnter={() => A().tick()} onClick={() => { A().click(); setBlueprint(!blueprint); }}>
            <span className="ctrl-dot"></span> BLUEPRINT
          </button>
          <button className={'ctrl' + (audioOn ? ' on' : '')} onClick={() => setAudioOn(!audioOn)}>
            <span className="ctrl-dot"></span> AUDIO
          </button>
        </div>
      </header>
    );
  }

  /* ---------- bottom bars ---------- */
  function CoordBar() {
    const ref = useRef(null);
    useEffect(() => {
      let raf = 0;
      function onMove(e) {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          if (ref.current) {
            ref.current.textContent =
              '[X: ' + String(e.clientX).padStart(4, '0') + ' // Y: ' + String(e.clientY).padStart(4, '0') + ']';
          }
        });
      }
      window.addEventListener('mousemove', onMove);
      return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
    }, []);
    return <div className="coordbar"><span ref={ref}>[X: 0000 // Y: 0000]</span></div>;
  }

  /* ---------- app ---------- */
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "bootSequence": true,
    "audioVolume": 50,
    "canvasMotion": true
  }/*EDITMODE-END*/;

  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const initial = (location.hash || '').replace('#', '');
    const [section, setSection] = useState(SECTIONS.includes(initial) ? initial : 'home');
    const [booting, setBooting] = useState(t.bootSequence !== false);
    const [audioOn, setAudioOnState] = useState(!A().isMuted());
    const [blueprint, setBlueprint] = useState(false);
    const [sliceKey, setSliceKey] = useState(0);

    useEffect(() => { A().setVolume((t.audioVolume ?? 50) / 100); }, [t.audioVolume]);
    useEffect(() => {
      document.documentElement.classList.toggle('blueprint', blueprint);
    }, [blueprint]);

    function goTo(s) {
      if (s === section) return;
      A().swoosh();
      setSection(s);
      setSliceKey((k) => k + 1);
      history.replaceState(null, '', '#' + s);
    }
    function setAudioOn(on) {
      A().setMuted(!on);
      setAudioOnState(on);
    }

    const Panel = { home: HomePanel, projects: ProjectsPanel, specs: SpecsPanel, contact: ContactPanel }[section];
    const scrolly = section === 'specs' || section === 'contact' || section === 'projects';

    return (
      <div>
        {booting ? <Boot onDone={() => setBooting(false)} /> : null}
        <div className="frame" data-screen-label={'ORZOMI // ' + section.toUpperCase()}>
          <TopBar section={section} goTo={goTo} audioOn={audioOn} setAudioOn={setAudioOn} blueprint={blueprint} setBlueprint={setBlueprint} />
          <Sidebar />
          <main className="main" data-bp="WORKSPACE // 76.4%">
            <div className={'panel' + (scrolly ? ' scrolly' : '')} key={section + sliceKey}>
              <Panel goTo={goTo} motion={t.canvasMotion !== false} blueprint={blueprint} />
            </div>
            <div className="slice-edge" key={'edge' + sliceKey}></div>
          </main>
          <CoordBar />
          <footer className="statusbar">
            <span>{STATUS[section]}<span className="cursor-blink">_</span></span>
            <span>ORZOMI // SOFTWARE, CRAFTED IN PROPORTION</span>
          </footer>
        </div>
        <BlueprintOverlay />
        <TweaksPanel>
          <TweakSection label="System" />
          <TweakToggle label="Boot sequence" value={t.bootSequence !== false} onChange={(v) => setTweak('bootSequence', v)} />
          <TweakToggle label="Canvas motion" value={t.canvasMotion !== false} onChange={(v) => setTweak('canvasMotion', v)} />
          <TweakSection label="Audio" />
          <TweakSlider label="Volume" value={t.audioVolume ?? 50} min={0} max={100} unit="%" onChange={(v) => setTweak('audioVolume', v)} />
        </TweaksPanel>
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
