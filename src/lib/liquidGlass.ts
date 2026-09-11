'use client';

/**
 * liquid-glass.ts — Apple-style liquid glass refraction for web elements.
 * Supports SVG displacement refraction on desktop Chromium, and high-performance
 * liquid frosted glass on Mobile & Safari/Firefox.
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

// Detect whether SVG filter in backdrop-filter is fully supported by browser
function checkSVGBackdropSupport(): boolean {
  if (typeof window === 'undefined' || typeof CSS === 'undefined') return false;
  const ua = navigator.userAgent;
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
  const isSafari = /Safari/.test(ua) && !/Chrome|Chromium|Edg/.test(ua);
  const isFirefox = /Firefox/.test(ua);

  // Safari, Mobile Safari/Chrome iOS, Firefox do not support SVG filter inside backdrop-filter
  if (isMobile || isSafari || isFirefox) return false;

  return (
    (CSS.supports && CSS.supports('backdrop-filter', 'url(#test)')) ||
    (CSS.supports && CSS.supports('-webkit-backdrop-filter', 'url(#test)'))
  );
}

export interface LiquidGlassOptions {
  scale?: number;      // displacement strength (−60 subtle ... −180 dramatic)
  chroma?: number;     // per-channel scale stagger (prism fringe)
  border?: number;     // neutral interior inset fraction
  mapBlur?: number;    // map blur radius for rim curvature
  blur?: number;       // backdrop blur in px
  saturate?: number;   // saturation boost
  radius?: number;     // corner radius
}

export function applyLiquidGlass(el: HTMLElement, options: LiquidGlassOptions = {}) {
  if (typeof window === 'undefined' || !el) return { refresh: () => {}, destroy: () => {} };

  const {
    scale = -112,
    chroma = 6,
    border = 0.07,
    mapBlur = 12,
    blur = 3,
    saturate = 1.5,
    radius = null,
  } = options;

  const supportsSVG = checkSVGBackdropSupport();
  const filterId = `lg-filter-${++uid}`;
  const defs = supportsSVG ? ensureDefs() : null;

  let filterEl: SVGFilterElement | null = null;
  if (supportsSVG && defs) {
    filterEl = document.createElementNS(SVG_NS, 'filter');
    filterEl.setAttribute('id', filterId);
    filterEl.setAttribute('x', '-20%');
    filterEl.setAttribute('y', '-20%');
    filterEl.setAttribute('width', '140%');
    filterEl.setAttribute('height', '140%');
    filterEl.setAttribute('color-interpolation-filters', 'sRGB');
    defs.appendChild(filterEl);
  }

  function updateMap() {
    if (!supportsSVG || !filterEl) return;

    const rect = el.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));

    let computedRadius = radius;
    if (computedRadius === null) {
      const cs = window.getComputedStyle(el);
      computedRadius = parseFloat(cs.borderRadius) || Math.min(w, h) / 2;
    }

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Red ramp X
    const gx = ctx.createLinearGradient(0, 0, w, 0);
    gx.addColorStop(0, 'rgb(0,0,0)');
    gx.addColorStop(1, 'rgb(255,0,0)');
    ctx.fillStyle = gx;
    ctx.fillRect(0, 0, w, h);

    // Blue ramp Y (difference)
    const gy = ctx.createLinearGradient(0, 0, 0, h);
    gy.addColorStop(0, 'rgb(0,0,0)');
    gy.addColorStop(1, 'rgb(0,0,255)');
    ctx.globalCompositeOperation = 'difference';
    ctx.fillStyle = gy;
    ctx.fillRect(0, 0, w, h);

    // Neutral gray interior inset
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

    const mapUrl = canvas.toDataURL();

    if (chroma !== 0) {
      filterEl.innerHTML = `
        <feImage href="${mapUrl}" result="map" preserveAspectRatio="none"/>
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
        <feImage href="${mapUrl}" result="map" preserveAspectRatio="none"/>
        <feDisplacementMap in="SourceGraphic" in2="map" scale="${scale}" xChannelSelector="R" yChannelSelector="B" result="dispOut"/>
      `;
    }
  }

  // Pointer glare position handler (only on desktop hover devices)
  const isHoverDevice = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  function handlePointerMove(e: PointerEvent) {
    if (!isHoverDevice) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--gx', `${x.toFixed(1)}%`);
    el.style.setProperty('--gy', `${y.toFixed(1)}%`);
  }

  if (supportsSVG) {
    updateMap();
    el.style.backdropFilter = `url(#${filterId}) blur(${blur}px) saturate(${saturate})`;
    (el.style as any).webkitBackdropFilter = `url(#${filterId}) blur(${blur}px) saturate(${saturate})`;
  } else {
    // Mobile / Safari / Firefox high-density frosted liquid glass fallback
    const mobileBlur = Math.max(20, blur * 6);
    el.style.backdropFilter = `blur(${mobileBlur}px) saturate(${saturate})`;
    (el.style as any).webkitBackdropFilter = `blur(${mobileBlur}px) saturate(${saturate})`;
  }

  if (isHoverDevice) {
    el.addEventListener('pointermove', handlePointerMove);
  }

  const ro = new ResizeObserver(() => updateMap());
  ro.observe(el);

  return {
    refresh: updateMap,
    destroy: () => {
      ro.disconnect();
      if (isHoverDevice) {
        el.removeEventListener('pointermove', handlePointerMove);
      }
      if (filterEl && filterEl.parentNode) {
        filterEl.parentNode.removeChild(filterEl);
      }
    },
  };
}
