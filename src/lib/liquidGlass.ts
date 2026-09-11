'use client';

/**
 * liquid-glass.ts — Apple-style liquid glass refraction for web elements.
 * Provides displacement refraction in Chromium and elegant frosted glass in Safari/Firefox.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';
let uid = 0;
let svgDefs: SVGDefsElement | null = null;

function ensureDefs(): SVGDefsElement {
  if (svgDefs && document.body.contains(svgDefs.ownerSVGElement!)) return svgDefs;
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.position = 'absolute';
  svg.style.pointerEvents = 'none';
  svgDefs = document.createElementNS(SVG_NS, 'defs');
  svg.appendChild(svgDefs);
  document.body.appendChild(svg);
  return svgDefs;
}

export interface LiquidGlassOptions {
  scale?: number;      // displacement strength (negative = magnifying bulge)
  chroma?: number;     // chromatic aberration / prism fringe
  border?: number;     // neutral interior inset fraction
  mapBlur?: number;    // map blur radius for rim curvature
  blur?: number;       // backdrop blur in px
  saturate?: number;   // saturation multiplier
  radius?: number;     // corner radius (autodetected if omitted)
}

export function applyLiquidGlass(el: HTMLElement, options: LiquidGlassOptions = {}) {
  if (typeof window === 'undefined' || !el) return { destroy: () => {} };

  const {
    scale = -65,
    chroma = 3,
    border = 0.12,
    mapBlur = 20,
    blur = 10,
    saturate = 1.3,
    radius = null,
  } = options;

  const filterId = `lg-filter-${++uid}`;
  const defs = ensureDefs();

  const filterEl = document.createElementNS(SVG_NS, 'filter');
  filterEl.setAttribute('id', filterId);
  filterEl.setAttribute('x', '-20%');
  filterEl.setAttribute('y', '-20%');
  filterEl.setAttribute('width', '140%');
  filterEl.setAttribute('height', '140%');
  filterEl.setAttribute('color-interpolation-filters', 'sRGB');

  defs.appendChild(filterEl);

  function update() {
    const rect = el.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));

    let computedRadius = radius;
    if (computedRadius === null) {
      const cs = window.getComputedStyle(el);
      computedRadius = parseFloat(cs.borderRadius) || Math.min(w, h) / 2;
    }

    // Build displacement canvas
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gx = ctx.createLinearGradient(0, 0, w, 0);
    gx.addColorStop(0, 'rgb(0,0,0)');
    gx.addColorStop(1, 'rgb(255,0,0)');
    ctx.fillStyle = gx;
    ctx.fillRect(0, 0, w, h);

    const gy = ctx.createLinearGradient(0, 0, 0, h);
    gy.addColorStop(0, 'rgb(0,0,0)');
    gy.addColorStop(1, 'rgb(0,0,255)');
    ctx.globalCompositeOperation = 'difference';
    ctx.fillStyle = gy;
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'source-over';
    const inset = border * Math.min(w, h);
    ctx.filter = `blur(${mapBlur}px)`;
    ctx.fillStyle = 'rgb(128, 0, 128)';
    ctx.beginPath();
    const r = Math.max(0, computedRadius - inset);
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(inset, inset, w - 2 * inset, h - 2 * inset, r);
    } else {
      ctx.rect(inset, inset, w - 2 * inset, h - 2 * inset);
    }
    ctx.fill();

    const mapDataUrl = canvas.toDataURL();

    if (chroma !== 0) {
      filterEl.innerHTML = `
        <feImage href="${mapDataUrl}" result="map" preserveAspectRatio="none"/>
        <feDisplacementMap in="SourceGraphic" in2="map" scale="${scale}" xChannelSelector="R" yChannelSelector="B" result="dispR"/>
        <feDisplacementMap in="SourceGraphic" in2="map" scale="${scale + chroma}" xChannelSelector="R" yChannelSelector="B" result="dispG"/>
        <feDisplacementMap in="SourceGraphic" in2="map" scale="${scale + chroma * 2}" xChannelSelector="R" yChannelSelector="B" result="dispB"/>
        <feColorMatrix in="dispR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
        <feColorMatrix in="dispG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>
        <feColorMatrix in="dispB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>
        <feBlend in="r" in2="g" mode="screen" result="rg"/>
        <feBlend in="rg" in2="b" mode="screen" result="chromaOut"/>
      `;
    } else {
      filterEl.innerHTML = `
        <feImage href="${mapDataUrl}" result="map" preserveAspectRatio="none"/>
        <feDisplacementMap in="SourceGraphic" in2="map" scale="${scale}" xChannelSelector="R" yChannelSelector="B" result="dispOut"/>
      `;
    }
  }

  update();

  // Apply backdrop-filter url(#id) with fallbacks
  el.style.backdropFilter = `url(#${filterId}) blur(${blur}px) saturate(${saturate})`;
  (el.style as any).webkitBackdropFilter = `url(#${filterId}) blur(${blur}px) saturate(${saturate})`;

  const ro = new ResizeObserver(() => update());
  ro.observe(el);

  return {
    update,
    destroy: () => {
      ro.disconnect();
      if (filterEl.parentNode) filterEl.parentNode.removeChild(filterEl);
    },
  };
}
