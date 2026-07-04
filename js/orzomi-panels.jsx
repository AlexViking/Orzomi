/* ORZOMI panels — sidebar + the four workspace views. */
(function () {
  const { useState, useEffect } = React;
  const DS = window.ORZOMIDesignSystem_c0dedb || {};
  const A = () => window.OrzomiAudio;

  /* ---------- content ---------- */
  const PRACTICES = [
    { icon: 'code', label: 'PRODUCTS' },
    { icon: 'web', label: 'CLIENT WORK' },
    { icon: 'games', label: 'GAMES' },
    { icon: 'academy', label: 'ACADEMY' },
  ];

  const PROJECTS = [
    { id: 'p01', tag: 'PROJECT_01', cat: 'PRODUCT', title: 'Project title pending', blurb: 'Slot reserved for a product built and stood behind under the ORZOMI name.' },
    { id: 'p02', tag: 'PROJECT_02', cat: 'CLIENT', title: 'Project title pending', blurb: 'Slot reserved for a client website or mobile app.' },
    { id: 'p03', tag: 'PROJECT_03', cat: 'GAME', title: 'Project title pending', blurb: 'Slot reserved for a game, built with the same rigor as tools.' },
    { id: 'p04', tag: 'PROJECT_04', cat: 'ACADEMY', title: 'Project title pending', blurb: 'Slot reserved for an education program or cohort.' },
    { id: 'p05', tag: 'PROJECT_05', cat: 'PRODUCT', title: 'Project title pending', blurb: 'Slot reserved for a product built and stood behind under the ORZOMI name.' },
    { id: 'p06', tag: 'PROJECT_06', cat: 'CLIENT', title: 'Project title pending', blurb: 'Slot reserved for a client website or mobile app.' },
    { id: 'p07', tag: 'PROJECT_07', cat: 'GAME', title: 'Project title pending', blurb: 'Slot reserved for a game, built with the same rigor as tools.' },
    { id: 'p08', tag: 'PROJECT_08', cat: 'ACADEMY', title: 'Project title pending', blurb: 'Slot reserved for an education program or cohort.' },
  ];

  const DETAIL_ROWS = ['BRIEF', 'APPROACH', 'STACK', 'RESULT'];

  /* ---------- sidebar ---------- */
  function Clock() {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
      const t = setInterval(() => setNow(new Date()), 1000);
      return () => clearInterval(t);
    }, []);
    const p = (n) => String(n).padStart(2, '0');
    return <span>{p(now.getHours())}:{p(now.getMinutes())}:{p(now.getSeconds())}</span>;
  }

  const ICON_PATHS = {
    code: <path d="M8 6 L3 12 L8 18 M16 6 L21 12 L16 18"></path>,
    web: <React.Fragment><rect x="3" y="4" width="18" height="13"></rect><path d="M8 21 H16"></path></React.Fragment>,
    mobile: <React.Fragment><rect x="7" y="2.5" width="10" height="19"></rect><path d="M10 18.5 H14"></path></React.Fragment>,
    games: <React.Fragment><circle cx="12" cy="12" r="9"></circle><path d="M8 12 H16 M12 8 V16"></path></React.Fragment>,
    academy: <path d="M2 9 L12 4 L22 9 L12 14 Z M6 11.5 V17 C6 17 8 19.5 12 19.5 C16 19.5 18 17 18 17 V11.5"></path>,
    online: <React.Fragment><circle cx="12" cy="12" r="9"></circle><path d="M3 12 H21 M12 3 C8 8 8 16 12 21 C16 16 16 8 12 3"></path></React.Fragment>,
  };

  function Glyph({ icon }) {
    return (
      <svg className="icon-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        {ICON_PATHS[icon]}
      </svg>
    );
  }

  function Sidebar() {
    return (
      <aside className="sidebar" data-bp="SIDE // 23.6%">
        <div className="side-block">
          <div className="side-head">
            <span className="idx">(00)</span>
            <span className="mono-label">Design philosophy</span>
          </div>
          <p className="side-body">Geometric precision. Structured code. Every measure on this screen derives from φ — type, spacing, columns, even the proportion of gold to charcoal.</p>
        </div>

        <div className="side-block">
          <div className="side-head">
            <span className="idx">(01)</span>
            <span className="mono-label">Practices</span>
          </div>
          <div className="side-practices">
            {PRACTICES.map((pr) => (
              <div className="side-practice" key={pr.label}>
                <Glyph icon={pr.icon} />
                <span>{pr.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="side-block">
          <div className="side-head">
            <span className="idx">(02)</span>
            <span className="mono-label">System status</span>
          </div>
          <dl className="side-kv">
            <dt>ENGINE</dt><dd className="ok">STABLE</dd>
            <dt>RATIO</dt><dd className="ok">φ 1.6180339</dd>
            <dt>LOC</dt><dd>41.71°N // 44.79°E</dd>
            <dt>TIME</dt><dd><Clock /></dd>
            <dt>GRID</dt><dd>21PX // LOCKED</dd>
          </dl>
        </div>

        <div className="side-spacer"></div>

        <div className="side-foot">
          <span className="mono-label">Channel</span>
          <a className="gold-link" href="mailto:hello@orzomi.com" onMouseEnter={() => A().tick()} onClick={() => A().click()}>→ hello@orzomi.com</a>
        </div>
      </aside>
    );
  }

  /* ---------- home ---------- */
  function HomePanel({ goTo, motion, blueprint }) {
    return (
      <div className="home" data-bp="CANVAS // φ MATRIX">
        <GoldenCanvas motion={motion} blueprint={blueprint} />
        <div className="home-meta">
          <span>ORZOMI // SOFTWARE HOUSE</span>
          <span>EDITION 01 — 2026</span>
        </div>
        <div className="home-copy">
          <div className="mono-label home-kicker">[ SYSTEM READY ]</div>
          <h1>Software, crafted in proportion<span className="phi">.</span></h1>
          <p className="home-sub">We build software products, client apps, games — and programmers. Everything to one standard of craft.</p>
          <button className="cta" onMouseEnter={() => A().tick()} onClick={() => { A().click(); goTo('projects'); }}>→ open the archive</button>
        </div>
      </div>
    );
  }

  /* ---------- projects ---------- */
  function ProjectsPanel() {
    const [open, setOpen] = useState(null);
    const proj = PROJECTS.find((p) => p.id === open);

    if (proj) {
      return (
        <div className="workspace-pad" data-bp="RECORD // EXPANDED">
          <div className="panel-head">
            <h2>{proj.tag} <span style={{ color: 'var(--graphite)' }}>//</span> {proj.cat}</h2>
            <button className="back-btn" onMouseEnter={() => A().tick()} onClick={() => { A().swoosh(); setOpen(null); }}>← BACK TO ARCHIVE</button>
          </div>
          <div className="proj-detail">
            <image-slot id={'proj-' + proj.id + '-hero'} shape="rect" placeholder={'Drop hero image — ' + proj.tag}></image-slot>
            <div className="detail-rows">
              {DETAIL_ROWS.map((r) => (
                <div className="detail-row" key={r}>
                  <span className="mono-label">{r}</span>
                  <p className="pending">— awaiting project data —</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="workspace-pad" data-bp="GRID // 1.618:1">
        <div className="panel-head">
          <h2>Selected work</h2>
          <span className="mono-label">{PROJECTS.length} RECORDS // 2026</span>
        </div>
        <div className="proj-grid">
          {PROJECTS.map((p) => (
            <button className="proj-card" key={p.id} onMouseEnter={() => A().tick()} onClick={() => { A().swoosh(); setOpen(p.id); }}>
              <image-slot id={'proj-' + p.id + '-card'} shape="rect" placeholder={'Drop image — ' + p.tag}></image-slot>
              <span className="proj-card-body">
                <span className="proj-tag"><span className="cat">[{p.cat}]</span><span>{p.tag} // RES_2026</span></span>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ---------- specs ---------- */
  const STEPS = [
    { n: '01', code: 'SYSTEM_BLUEPRINT', what: 'Wireframing, math, and alignment mapping. You sign off the plan before we write code.', dur: 'WEEKS 1–2' },
    { n: '02', code: 'COMPILATION', what: 'Clean, modular, high-performance code. Working software every week, not a reveal at the end.', dur: 'WEEKS 3–8' },
    { n: '03', code: 'STRESS_TESTING', what: 'Speed optimization and cross-browser diagnostics against a strict performance budget.', dur: 'WEEKS 9–11' },
    { n: '04', code: 'DEPLOYMENT', what: 'Your app ships in 12 weeks. Launch, then ongoing optimization.', dur: 'WEEK 12' },
  ];
  const STACK = [
    ['STRUCTURE', 'Semantic HTML // CSS grid'],
    ['INTERFACE', 'React // TypeScript'],
    ['ANIMATION', 'Zero-dependency // GPU-composited'],
    ['AUDIO', 'Web Audio API — synthesized, zero files'],
    ['LAYOUT', 'Golden-ratio grid // φ 1.618'],
    ['BUDGET', '≤ 100KB per page // no trackers'],
  ];

  function SpecsPanel() {
    return (
      <div className="workspace-pad" data-bp="SPEC SHEET">
        <div className="panel-head">
          <h2>Four practices, one standard</h2>
          <span className="mono-label">SPEC // 2026</span>
        </div>
        <div className="vp-grid">
          <div className="vp">
            <span className="mono-label">Products</span>
            <Glyph icon="code" />
            <h3>Our own software</h3>
            <p>Designed, built and stood behind under our own name.</p>
          </div>
          <div className="vp">
            <span className="mono-label">Client work</span>
            <Glyph icon="web" />
            <h3>Websites &amp; apps</h3>
            <p>For businesses that want structure, speed and no bloat.</p>
          </div>
          <div className="vp">
            <span className="mono-label">Games</span>
            <Glyph icon="games" />
            <h3>Play, engineered</h3>
            <p>Game development with the same rigor as tools.</p>
          </div>
          <div className="vp">
            <span className="mono-label">Academy</span>
            <Glyph icon="academy" />
            <h3>Programmers, made</h3>
            <p>Lesson 1: you will write real code today.</p>
          </div>
        </div>
        <div className="spec-cols">
          <div className="spec-block">
            <h3>Build pipeline</h3>
            <ol className="step-list">
              {STEPS.map((s) => (
                <li key={s.n}><span className="num">{s.n}</span><span className="what"><span className="step-code">[{s.n} // {s.code}]</span>{s.what}</span><span className="dur">{s.dur}</span></li>
              ))}
            </ol>
          </div>
          <div className="spec-block">
            <h3>Standards</h3>
            <ul className="stack-list">
              {STACK.map(([k, v]) => (
                <li key={k}><b>{k}</b><span>{v}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- contact ---------- */
  function ContactPanel() {
    const [name, setName] = useState('');
    const [msg, setMsg] = useState('');
    const [sent, setSent] = useState(false);
    function send() {
      A().click();
      setSent(true);
      const body = encodeURIComponent(msg + (name ? '\n\n— ' + name : ''));
      window.location.href = 'mailto:hello@orzomi.com?subject=' + encodeURIComponent('Project inquiry') + '&body=' + body;
    }
    return (
      <div className="workspace-pad" data-bp="CHANNEL // OPEN">
        <div className="panel-head">
          <h2>Start a project</h2>
          <span className="mono-label">RESPONSE &lt; 48H</span>
        </div>
        <div className="contact-grid">
          <div className="contact-meta">
            <p className="big">Tell us the problem. We will send a plan, with dates.</p>
            <div>
              <span className="mono-label">Direct</span><br />
              <a className="gold-link" href="mailto:hello@orzomi.com" onMouseEnter={() => A().tick()}>→ hello@orzomi.com</a>
            </div>
            <div>
              <span className="mono-label">Founder</span><br />
              <span style={{ font: '400 14px/1.6 var(--font-body)', color: 'var(--body-dark)' }}>Aziz Orzomi — Tbilisi, Georgia</span>
            </div>
          </div>
          <div className="contact-form term" data-bp="TERMINAL">
            <div className="term-head mono-label">ORZOMI://ENGAGE — v1.0</div>
            <label className="term-line">
              <span className="term-prompt">&gt; EMAIL:</span>
              <input className="term-input" type="email" value={name} onChange={(e) => setName(e.target.value)} placeholder="you@company.com" spellCheck="false" />
            </label>
            <label className="term-line">
              <span className="term-prompt">&gt; SCOPE:</span>
              <input className="term-input" type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="what should exist that does not yet?" spellCheck="false" />
            </label>
            <button className="cta term-send" onMouseEnter={() => A().tick()} onClick={send}>
              [ INITIALIZE_PROJECT_ENGAGEMENT ]
            </button>
            <div className="term-status mono-label">{sent ? 'STATUS: MESSAGE ROUTED // RESPONSE < 48H' : 'STATUS: AWAITING INPUT'}<span className="cursor-blink">_</span></div>
          </div>
        </div>
      </div>
    );
  }

  Object.assign(window, { Sidebar, HomePanel, ProjectsPanel, SpecsPanel, ContactPanel });
})();
