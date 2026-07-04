/* GoldenCanvas — golden-ratio subdivision + spiral + reactive dot matrix.
   Mouse distorts geometry; faint synthesized tics on grid-cell crossings. */
(function () {
  const { useRef, useEffect } = React;
  const PHI = 1.6180339887;

  function GoldenCanvas({ motion = true, blueprint = false }) {
    const ref = useRef(null);
    const mouse = useRef({ x: -9999, y: -9999, cell: null });
    const raf = useRef(0);
    const lastTic = useRef(0);

    useEffect(() => {
      const canvas = ref.current;
      const cx = canvas.getContext('2d');
      let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

      function resize() {
        const r = canvas.parentElement.getBoundingClientRect();
        W = r.width; H = r.height;
        canvas.width = W * dpr; canvas.height = H * dpr;
        canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
        cx.setTransform(dpr, 0, 0, dpr, 0, 0);
        draw();
      }

      function draw() {
        cx.clearRect(0, 0, W, H);
        const mx = mouse.current.x, my = mouse.current.y;

        /* dot matrix, 34px pitch */
        const pitch = 34;
        const ox = (W % pitch) / 2, oy = (H % pitch) / 2;
        for (let x = ox; x <= W; x += pitch) {
          for (let y = oy; y <= H; y += pitch) {
            const dx = x - mx, dy = y - my;
            const d = Math.sqrt(dx * dx + dy * dy);
            let px = x, py = y, a = 0.16;
            if (motion && d < 144) {
              const f = (1 - d / 144);
              px += (dx / (d || 1)) * f * 6;
              py += (dy / (d || 1)) * f * 6;
              a = 0.16 + f * 0.5;
            }
            cx.fillStyle = 'rgba(138,133,122,' + a.toFixed(3) + ')';
            cx.fillRect(px - 0.75, py - 0.75, 1.5, 1.5);
          }
        }

        /* golden rectangle subdivision, centered */
        let gw = W * 0.72, gh = gw / PHI;
        if (gh > H * 0.78) { gh = H * 0.78; gw = gh * PHI; }
        let rx = (W - gw) / 2, ry = (H - gh) / 2, rw = gw, rh = gh;
        cx.lineWidth = 1;
        let dir = 0;
        const corners = [];
        for (let i = 0; i < 9; i++) {
          cx.strokeStyle = blueprint ? 'rgba(82,76,69,0.9)' : 'rgba(82,76,69,0.55)';
          cx.strokeRect(rx + 0.5, ry + 0.5, rw, rh);
          const s = Math.min(rw, rh); // square side
          if (dir === 0)      { corners.push([rx + s, ry + s, s]); rx += s; rw -= s; }
          else if (dir === 1) { corners.push([rx + rw - (rw>rh?s:0), ry + s, s]); ry += s; rh -= s; }
          else if (dir === 2) { corners.push([rx, ry, s]); rw -= s; }
          else                { corners.push([rx, ry, s]); rh -= s; }
          dir = (dir + 1) % 4;
        }

        /* spiral — quarter arcs through the squares, gold, mouse-distorted */
        let sw2 = gw, sh2 = gw / PHI;
        let sx = (W - gw) / 2, sy = (H - gh) / 2;
        cx.strokeStyle = blueprint ? 'rgba(217,160,56,0.95)' : 'rgba(217,160,56,0.8)';
        cx.lineWidth = 1.25;
        cx.beginPath();
        let side = Math.min(gw, gh) === gh ? gh : gh;
        let x0 = sx, y0 = sy, w0 = gw, h0 = gh, d0 = 0;
        const centers = [
          // computed per-iteration below
        ];
        for (let i = 0; i < 9; i++) {
          const s = Math.min(w0, h0);
          let ccx, ccy, a0, a1;
          if (d0 === 0)      { ccx = x0 + s; ccy = y0 + s; a0 = Math.PI;     a1 = Math.PI * 1.5; x0 += s; w0 -= s; }
          else if (d0 === 1) { ccx = x0;     ccy = y0 + s; a0 = Math.PI*1.5; a1 = Math.PI * 2;   y0 += s; h0 -= s; }
          else if (d0 === 2) { ccx = x0 + w0 - s; ccy = y0; a0 = 0;          a1 = Math.PI * 0.5; w0 -= s; }
          else               { ccx = x0 + w0; ccy = y0 + h0 - s; a0 = Math.PI*0.5; a1 = Math.PI; h0 -= s; }
          /* draw arc as segments so we can distort */
          const steps = 24;
          for (let k = 0; k <= steps; k++) {
            const a = a0 + (a1 - a0) * (k / steps);
            let px = ccx + Math.cos(a) * s, py = ccy + Math.sin(a) * s;
            if (motion) {
              const dx = px - mx, dy = py - my;
              const d = Math.sqrt(dx * dx + dy * dy);
              if (d < 160) {
                const f = (1 - d / 160) * 10;
                px += (dx / (d || 1)) * f;
                py += (dy / (d || 1)) * f;
              }
            }
            if (i === 0 && k === 0) cx.moveTo(px, py); else cx.lineTo(px, py);
          }
          d0 = (d0 + 1) % 4;
        }
        cx.stroke();

        /* cursor cell coordinate readout */
        if (motion && mx > 0 && my > 0 && mx < W && my < H) {
          cx.font = '10px "IBM Plex Mono", monospace';
          cx.fillStyle = 'rgba(138,133,122,0.85)';
          const gx = Math.floor(mx / pitch), gy = Math.floor(my / pitch);
          cx.fillText('[' + String(gx).padStart(2, '0') + ':' + String(gy).padStart(2, '0') + ']', mx + 13, my - 9);
          cx.strokeStyle = 'rgba(217,160,56,0.5)';
          cx.lineWidth = 1;
          cx.strokeRect(gx * pitch + ox - pitch / 2 + 0.5, gy * pitch + oy - pitch / 2 + 0.5, pitch, pitch);
        }
      }

      function onMove(e) {
        const r = canvas.getBoundingClientRect();
        mouse.current.x = e.clientX - r.left;
        mouse.current.y = e.clientY - r.top;
        const cell = Math.floor(mouse.current.x / 34) + ':' + Math.floor(mouse.current.y / 34);
        if (cell !== mouse.current.cell) {
          mouse.current.cell = cell;
          const now = performance.now();
          if (now - lastTic.current > 130) { lastTic.current = now; window.OrzomiAudio.tic(); }
        }
        if (!raf.current) raf.current = requestAnimationFrame(() => { raf.current = 0; draw(); });
      }
      function onLeave() {
        mouse.current.x = -9999; mouse.current.y = -9999;
        if (!raf.current) raf.current = requestAnimationFrame(() => { raf.current = 0; draw(); });
      }

      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas.parentElement);
      canvas.parentElement.addEventListener('mousemove', onMove);
      canvas.parentElement.addEventListener('mouseleave', onLeave);
      return () => {
        ro.disconnect();
        canvas.parentElement.removeEventListener('mousemove', onMove);
        canvas.parentElement.removeEventListener('mouseleave', onLeave);
        cancelAnimationFrame(raf.current);
      };
    }, [motion, blueprint]);

    return <canvas ref={ref} className="golden-canvas" aria-hidden="true"></canvas>;
  }

  window.GoldenCanvas = GoldenCanvas;
})();
