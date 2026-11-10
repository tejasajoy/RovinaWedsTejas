/* =====================================================================
   Shared engine for both designs (sakura.html and ocean.html).
   You don't need to edit this file. Change config.js instead.
   ===================================================================== */
(function(){
"use strict";
const W = window.WeddingSite = {};
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
Object.assign(W, { $, $$, esc, reduce });

/* ---------------- font library ---------------- */
W.FONTS = {
  script: ["Great Vibes","Parisienne","Alex Brush","Pinyon Script","Allura","Tangerine","Sacramento","Dancing Script","Italianno","Rouge Script",
           "Mea Culpa","Corinthia","Monsieur La Doulaise","Herr Von Muellerhoff","Mrs Saint Delafield","Petit Formal Script","Rochester","Arizonia",
           "Imperial Script","Ballet","Birthstone","Ephesis","Lavishly Yours","WindSong","Island Moments","The Nautigal","Waterfall","Ms Madi",
           "Fleur De Leah","Love Light","Comforter","Qwitcher Grypen","Explora","Send Flowers","Hurricane","Meddon","Monte Carlo","Bilbo Swash Caps",
           "Kaushan Script","Satisfy","Yellowtail","Cookie"],
  heading: ["Cormorant Garamond","Playfair Display","Cinzel","Cinzel Decorative","Marcellus","Prata","Lora","EB Garamond","Italiana","Bodoni Moda",
            "Yeseva One","Libre Baskerville","Cormorant Upright","Gilda Display","Forum","Rozha One","Tenor Sans","DM Serif Display","Fraunces","Della Respira"],
  body: ["Mulish","Lato","Nunito","Poppins","Josefin Sans","Raleway","Quicksand","Karla","Montserrat","Work Sans","Jost","Open Sans","DM Sans","Outfit","Figtree"],
};
const loaded = new Set();
W.loadFont = function(name, withBold){
  if (!name || loaded.has(name)) return; loaded.add(name);
  const fam = encodeURIComponent(name).replace(/%20/g, "+");
  const qs = ["family=" + fam]; if (withBold) qs.push("family=" + fam + ":wght@600;700");
  qs.forEach(q => { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?" + q + "&display=swap"; l.onerror = () => l.remove(); document.head.appendChild(l); });
};

const ICONS = {
  ring:'<circle cx="12" cy="14" r="7"/><path d="M9 4h6l-3 3z"/>',
  church:'<path d="M12 2v4M10 4h4M6 22V12l6-5 6 5v10M3 22h18M10 22v-5a2 2 0 0 1 4 0v5"/>',
  glass:'<path d="M7 3h10l-1 7a4 4 0 0 1-8 0zM12 14v7M8 21h8"/>',
  heart:'<path d="M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z"/>',
  dove:'<path d="M3 13c4 0 6-2 8-6 1 3 3 4 6 4l4-2-2 4c-1 4-5 7-10 7-3 0-5-1-6-3l3-1"/>',
  leaf:'<path d="M5 19C5 9 11 5 20 4c-1 9-5 15-15 15z"/><path d="M5 19l8-8"/>',
  music:'<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  cake:'<path d="M4 21V12h16v9M2 21h20M4 16c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 4 0M12 12V8M12 5a1 1 0 0 1 0-2"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
  wave:'<path d="M2 12c3-3 5-3 8 0s5 3 8 0 3-2 4-2M2 18c3-3 5-3 8 0s5 3 8 0 3-2 4-2"/>',
  dance:'<circle cx="13.5" cy="3.5" r="2"/><path d="M13 6.5l-1.5 6.5M12.4 8.6l4.6-2.6 2-3.5M12.4 8.6L7 11l-2.5-1.5M11.5 13l3.5 3.5-.5 5M11.5 13l-4 3.5-3 .5M8.5 15.5c1.5 1.8 4.5 1.8 6 0"/>',
  dhol:'<ellipse cx="12" cy="8" rx="7" ry="3"/><path d="M5 8v8c0 1.7 3.1 3 7 3s7-1.3 7-3V8M5 12c2 1.2 4.5 1.8 7 1.8s5-.6 7-1.8M15 5l5-4M9 5L4 1"/>',
  diya:'<path d="M3 14h18c-1 4-4.5 6-9 6s-8-2-9-6z"/><path d="M12 11c-2.2-2-1.6-5 0-8 1.6 3 2.2 6 0 8z"/><path d="M9 20l-1 2h8l-1-2"/>',
};
const DEFAULT_TITLES = {
  couple:  { eyebrow:"Meet",          title:"The Bride & Groom",   nav:"Couple" },
  events:  { eyebrow:"Join us for",   title:"The Celebrations",    nav:"Events" },
  story:   { eyebrow:"How it began",  title:"Our Story",           nav:"Our Story" },
  gallery: { eyebrow:"Moments",       title:"Gallery",             nav:"Gallery" },
  venues:  { eyebrow:"Where",         title:"Venues",              nav:"Venues" },
  rsvp:    { eyebrow:"Kindly reply",  title:"Will you join us?",   nav:"RSVP" },
  faq:     { eyebrow:"Good to know",  title:"Questions",           nav:"FAQ" },
  interlude:{ eyebrow:"", title:"", nav:"" },
};
const REVEALS = [["mixed","Mixed (a bit of everything)"],["up","Float up"],["blur","Soft focus"],["zoom","Zoom in"],["slide","Slide from the sides"],["flip","Fold open"],["drop","Drop down"],["tilt","Tilt up"],["spin","Turn in"],["none","No scroll animation"]];

/* ---------------- shared styles ---------------- */
const CSS = `
[hidden]{display:none!important}
.js [data-anim]{opacity:.1;transition:opacity calc(1s*var(--speed)) ease,transform calc(1.1s*var(--speed)) cubic-bezier(.2,.8,.2,1),filter calc(1s*var(--speed)) ease}
.js [data-anim="up"]{transform:translateY(46px)}
.js [data-anim="left"]{transform:translateX(-70px)}
.js [data-anim="right"]{transform:translateX(70px)}
.js [data-anim="zoom"]{transform:scale(.84)}
.js [data-anim="blur"]{filter:blur(12px);transform:scale(1.05)}
.js [data-anim="flip"]{transform:perspective(900px) rotateX(32deg) translateY(30px);transform-origin:top}
.js [data-anim="drop"]{transform:translateY(-64px)}
.js [data-anim="tilt"]{transform:perspective(900px) rotateX(-18deg) translateY(44px);transform-origin:bottom}
.js [data-anim="spin"]{transform:rotate(-14deg) scale(.7)}
.js [data-anim].in,.no-reveal [data-anim]{opacity:1!important;transform:none!important;filter:none!important}
.btn{position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 28px;border-radius:999px;font:700 13px var(--f-body);letter-spacing:.14em;text-transform:uppercase;text-decoration:none;cursor:pointer;border:1.5px solid var(--accent);transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s,background .3s,color .3s}
.btn.solid{background:var(--accent);color:var(--accent-ink,#fff)}
.btn.ghost{background:transparent;color:var(--accent)}
.btn:hover{transform:translateY(-3px);box-shadow:0 12px 26px color-mix(in srgb,var(--accent) 30%,transparent)}
.btn.ghost:hover{background:var(--accent);color:var(--accent-ink,#fff)}
.ripple{position:absolute;border-radius:50%;background:rgba(255,255,255,.5);transform:scale(0);animation:ws-ripple .7s ease-out forwards;pointer-events:none}
@keyframes ws-ripple{to{transform:scale(4);opacity:0}}
.chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.chip{display:inline-flex;align-items:center;gap:6px;font-size:13px;padding:4px 12px;border-radius:999px;background:color-mix(in srgb,var(--soft) 35%,transparent);color:var(--ink);text-decoration:none;transition:background .3s,color .3s}
a.chip:hover{background:var(--accent);color:var(--accent-ink,#fff)}
.dot{width:10px;height:10px;border-radius:50%;border:1px solid color-mix(in srgb,var(--ink) 25%,transparent)}
.ph{position:absolute;inset:0;display:grid;place-items:center;color:#fff;font-family:var(--f-script);font-size:34px;text-shadow:0 2px 10px rgba(0,0,0,.18);text-align:center;padding:10px}
.ph .big{font-size:110px;line-height:1;opacity:.9}

html,body{overflow-x:hidden;overflow-x:clip}   /* no sideways scrolling or gap on phones */
/* meet layout */
.meet{height:230vh;position:relative;margin-top:24px}
.meet-stage{position:sticky;top:0;height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;justify-items:center;max-width:1000px;margin:0 auto;padding:0 20px}
.ms{display:grid;justify-items:center;gap:10px;text-align:center;will-change:transform;grid-row:1;transition:none}
.ms-l{grid-column:1}.ms-r{grid-column:2}
.ms-photo{width:min(230px,44vw)}
.ms-name{font-family:var(--f-script);font-weight:400;font-size:clamp(40px,7vw,68px);line-height:1.05;color:var(--accent);margin:0}
.ms .role{margin:0}
.ms-parents{max-width:30ch;margin:0;color:var(--muted);font-size:14px;line-height:1.5;transition:opacity .2s}
.ms-cross{position:absolute;left:50%;top:50%;width:64px;height:83px;margin:-41px 0 0 -32px;stroke:var(--gold);opacity:0;pointer-events:none}
.ms-together{position:absolute;bottom:14vh;left:0;right:0;text-align:center;font-family:var(--f-head);font-style:italic;color:var(--muted);margin:0;opacity:0}
@media (max-width:760px){
  .meet-stage{grid-template-columns:1fr;grid-template-rows:1fr 1fr;padding:0 16px}
  .ms-l{grid-row:1;grid-column:1}.ms-r{grid-row:2;grid-column:1}
  .ms-photo{width:min(150px,38vw)}
  .ms-name{font-size:42px}
  .ms-cross{top:50%}
}
/* couple */
.couple{display:grid;grid-template-columns:1fr auto 1fr;gap:30px;align-items:start;margin-top:54px}
.person{text-align:center;display:grid;justify-items:center;gap:6px}
.portrait{width:min(300px,78vw);aspect-ratio:4/5;position:relative;border-radius:999px 999px 24px 24px;overflow:hidden;box-shadow:0 22px 50px color-mix(in srgb,var(--accent) 18%,transparent);transition:transform .7s cubic-bezier(.2,.8,.2,1)}
.portrait::after{content:"";position:absolute;inset:10px;border-radius:999px 999px 18px 18px;border:1.5px solid rgba(255,255,255,.75);pointer-events:none}
.portrait.rounded{border-radius:28px}.portrait.rounded::after{border-radius:20px}
.portrait.oval{border-radius:50%}.portrait.oval::after{border-radius:50%}
.portrait.circle{aspect-ratio:1;border-radius:50%}.portrait.circle::after{border-radius:50%}
.person:hover .portrait{transform:translateY(-8px) rotate(-1deg)}
.portrait img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}
.person:hover .portrait img{transform:scale(1.06)}
.role{margin-top:16px;font-size:12.5px;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);font-weight:700}
.pname{font-family:var(--f-script)!important;font-weight:400!important;font-size:clamp(44px,6vw,62px)!important;color:var(--name-color,var(--accent));line-height:1.1}
.about{color:var(--muted);max-width:40ch}
.person .chips{justify-content:center}
.couple-mid{align-self:center;display:grid;justify-items:center;gap:12px;padding-top:40px;max-width:200px;text-align:center}
.rings{width:110px;height:76px}
.rings circle{fill:none;stroke:var(--gold);stroke-width:3;stroke-dasharray:190;stroke-dashoffset:190;transition:stroke-dashoffset calc(1.8s*var(--speed)) ease .2s}
.rings circle+circle{transition-delay:.8s}
.couple-mid.in .rings circle,.no-reveal .rings circle,html:not(.js) .rings circle{stroke-dashoffset:0}
.together{font-family:var(--f-head);font-style:italic;font-size:20px;color:var(--ink)}
@media (max-width:860px){.couple{grid-template-columns:1fr}.couple-mid{padding-top:0;order:0}}

/* events */
.tl{position:relative;margin-top:56px;display:grid;gap:34px}
.tl-line,.tl-fill{position:absolute;left:50%;top:0;bottom:0;width:2px;transform:translateX(-50%)}
.tl-line{background:var(--line)}
.tl-fill{background:linear-gradient(var(--soft),var(--accent),var(--gold));transform-origin:top;transform:translateX(-50%) scaleY(var(--p,0))}
.ev{display:grid;grid-template-columns:1fr 64px 1fr;align-items:center}
.ev .card{grid-column:1;grid-row:1;text-align:right}
.ev:nth-of-type(odd) .card{grid-column:3;text-align:left}
.ev .node{grid-column:2;grid-row:1;justify-self:center;width:56px;height:56px;border-radius:50%;background:var(--bg2);border:2px solid var(--accent);display:grid;place-items:center;z-index:1;box-shadow:0 0 0 6px var(--bg)}
.ev.in .node{animation:ws-pop calc(.7s*var(--speed)) cubic-bezier(.3,1.6,.5,1)}
@keyframes ws-pop{0%{transform:scale(0)}}
.ev .node svg{width:26px;height:26px}
.card{background:var(--bg2);border-radius:20px;padding:24px 26px;box-shadow:0 14px 40px color-mix(in srgb,var(--accent) 10%,transparent);border:1px solid var(--line);transition:transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .45s}
.card:hover{transform:translateY(-6px);box-shadow:0 22px 50px color-mix(in srgb,var(--accent) 18%,transparent)}
.card h3{font-size:30px}
.when{color:var(--accent);font-weight:700;font-size:14px;letter-spacing:.06em}
.where{color:var(--muted);font-size:15px}
.note{font-size:15px;margin-top:6px}
.ev .card .chips{justify-content:flex-end}
.ev:nth-of-type(odd) .card .chips{justify-content:flex-start}
@media (max-width:760px){
  .tl-line,.tl-fill{left:27px}
  .ev{grid-template-columns:56px minmax(0,1fr);gap:16px}
  .ev>*{min-width:0}
  .ev .node{grid-column:1}
  .ev .card,.ev:nth-of-type(odd) .card{grid-column:2;text-align:left}
  .ev .card .chips{justify-content:flex-start}
}

.maplink{display:inline-flex;align-items:center;gap:4px;text-decoration:none;color:var(--muted);border-bottom:1px dashed color-mix(in srgb,var(--accent) 45%,transparent);transition:color .25s,border-color .25s}
.maplink svg{width:14px;height:14px;flex:none;stroke:var(--accent)}
.maplink:hover{color:var(--accent);border-bottom-color:var(--accent)}
.badge{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:3px 10px;border-radius:999px;background:var(--gold);color:#fff;margin-left:8px;vertical-align:middle}
.ev.done .node{background:var(--accent)}
.ev.done .node svg{stroke:#fff!important}
.thumbs{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}
.ev .card .thumbs{justify-content:flex-end}
.ev:nth-of-type(odd) .card .thumbs{justify-content:flex-start}
.thumbs button{position:relative;width:64px;height:64px;border-radius:12px;overflow:hidden;border:0;padding:0;cursor:zoom-in;background:var(--soft);transition:transform .35s cubic-bezier(.3,1.4,.5,1),box-shadow .35s}
.thumbs button:hover{transform:translateY(-4px) rotate(-2deg);box-shadow:0 10px 20px color-mix(in srgb,var(--accent) 25%,transparent)}
.thumbs img{width:100%;height:100%;object-fit:cover;display:block}
.thumbs .more{position:absolute;inset:0;display:grid;place-items:center;background:rgba(0,0,0,.45);color:#fff;font-weight:700;font-size:15px}
@media (max-width:760px){.ev .card .thumbs{justify-content:flex-start}}

/* story */
.story{display:flex;justify-content:center;gap:34px;flex-wrap:wrap;margin-top:50px}
.pol{width:270px;background:var(--bg2);padding:14px 14px 20px;border-radius:6px;box-shadow:0 16px 40px rgba(0,0,0,.1);transform:rotate(var(--r));transition:transform .6s cubic-bezier(.2,.8,.2,1),box-shadow .6s;text-align:center}
.pol:hover{transform:rotate(0) translateY(-10px) scale(1.03);box-shadow:0 26px 60px rgba(0,0,0,.15)}
.pol .pic{aspect-ratio:1;border-radius:3px;overflow:hidden;position:relative}
.pol .pic img{width:100%;height:100%;object-fit:cover;display:block}
.pol .when-tag{font-family:var(--f-script);font-size:40px;color:var(--accent);line-height:1;margin-top:12px}
.pol h3{font-size:24px}
.pol p{color:var(--muted);font-size:15px;margin-top:4px}

/* gallery */
.gallery{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:200px;gap:14px;margin-top:50px}
.gallery button{position:relative;border:0;padding:0;border-radius:18px;overflow:hidden;cursor:zoom-in;background:var(--bg2);transition:transform .25s ease-out,box-shadow .4s}
.gallery button:nth-child(6n+1){grid-column:span 2;grid-row:span 2}
.gallery button:nth-child(6n+4){grid-row:span 2}
.gallery button:hover{box-shadow:0 20px 44px color-mix(in srgb,var(--accent) 24%,transparent)}
.gallery img,.gallery .ph{width:100%;height:100%;object-fit:cover;display:grid;transition:transform .8s cubic-bezier(.2,.8,.2,1)}
.gallery button:hover img,.gallery button:hover .ph{transform:scale(1.07)}
.gallery .cap{position:absolute;left:0;right:0;bottom:0;padding:26px 16px 12px;color:#fff;font:14px var(--f-body);text-align:left;background:linear-gradient(transparent,rgba(0,0,0,.45));transform:translateY(100%);transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.gallery button:hover .cap,.gallery button:focus-visible .cap{transform:none}
@media (max-width:760px){.gallery{grid-template-columns:repeat(2,1fr);grid-auto-rows:160px}}

/* venues */
.venues{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:26px;margin-top:50px}
.venue{background:var(--bg2);border-radius:24px;overflow:hidden;border:1px solid var(--line);box-shadow:0 14px 40px color-mix(in srgb,var(--accent) 10%,transparent);display:flex;flex-direction:column;transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.venue:hover{transform:translateY(-6px)}
.venue .art{background:linear-gradient(180deg,color-mix(in srgb,var(--soft) 40%,var(--bg2)),var(--bg2));padding:22px 22px 0;position:relative;overflow:hidden}
.venue .art svg{width:100%;height:170px;display:block}
.venue .body{padding:22px 26px 26px;display:grid;gap:8px;flex:1;align-content:start;text-align:left}
.venue h3{font-size:30px}
.venue ul{margin:6px 0 14px;padding-left:18px;color:var(--muted);font-size:15px}

/* lightbox */
#lb{position:fixed;inset:0;z-index:90;background:rgba(10,10,20,.88);display:grid;place-items:center;padding:20px;opacity:0;pointer-events:none;transition:opacity .4s}
#lb.show{opacity:1;pointer-events:auto}
#lb .frame{width:min(820px,100%);aspect-ratio:4/3;position:relative;border-radius:16px;overflow:hidden;transform:scale(.9);transition:transform .5s cubic-bezier(.2,.8,.2,1)}
#lb.show .frame{transform:none}
#lb .frame img{width:100%;height:100%;object-fit:contain;background:#000}
#lb .frame.swap{animation:ws-swap .45s cubic-bezier(.2,.8,.2,1)}
@keyframes ws-swap{from{opacity:0;transform:translateX(var(--dir,40px))}}
#lb .lbcap{position:absolute;bottom:20px;left:0;right:0;text-align:center;color:#fff;font-family:var(--f-body)}
.lbbtn{position:absolute;top:50%;transform:translateY(-50%);width:52px;height:52px;border-radius:50%;border:0;background:rgba(255,255,255,.92);color:#000;font-size:22px;cursor:pointer;transition:transform .3s}
.lbbtn:hover{transform:translateY(-50%) scale(1.1)}
.lbbtn.prev{left:16px}.lbbtn.next{right:16px}
.lbbtn.close{top:20px;right:20px;transform:none;font-size:18px}
.lbbtn.close:hover{transform:rotate(90deg)}

/* rsvp */
.rsvp-box{max-width:660px;margin:50px auto 0;background:var(--bg2);border-radius:28px;padding:36px clamp(20px,5vw,44px);border:1px solid var(--line);box-shadow:0 24px 60px color-mix(in srgb,var(--accent) 14%,transparent);text-align:left}
.rsvp-box form{display:grid;gap:18px}
.rsvp-box .row{display:grid;grid-template-columns:1fr 1fr;gap:18px}
@media (max-width:560px){.rsvp-box .row{grid-template-columns:1fr}}
.field{position:relative}
.field input,.field select,.field textarea{width:100%;font:inherit;color:var(--ink);background:transparent;border:1.5px solid var(--line);border-radius:14px;padding:22px 14px 8px;transition:border-color .3s,box-shadow .3s}
.field select{appearance:none;cursor:pointer}
.field select option{color:#000}
.field label{position:absolute;left:15px;top:15px;color:var(--muted);pointer-events:none;transition:transform .3s cubic-bezier(.2,.8,.2,1),color .3s;transform-origin:left}
.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 14%,transparent)}
.field input:focus+label,.field input:not(:placeholder-shown)+label,.field textarea:focus+label,.field textarea:not(:placeholder-shown)+label,.field select+label{transform:translateY(-10px) scale(.78);color:var(--accent)}
.toggle{display:flex;background:color-mix(in srgb,var(--soft) 25%,transparent);border-radius:999px;padding:5px;position:relative}
.toggle input{position:absolute;opacity:0}
.toggle label{flex:1;text-align:center;padding:10px;border-radius:999px;cursor:pointer;position:relative;z-index:1;transition:color .35s;font-weight:700;font-size:14px}
.toggle .pill{position:absolute;top:5px;bottom:5px;left:5px;width:calc(50% - 5px);border-radius:999px;background:var(--accent);transition:transform .45s cubic-bezier(.3,1.3,.5,1)}
.toggle input:checked+label{color:var(--accent-ink,#fff)}
.toggle input#rNo:checked~.pill{transform:translateX(100%)}
.toggle input:focus-visible+label{outline:2px solid var(--accent)}
.rsvp-box fieldset{border:0;padding:0;margin:0;transition:opacity .3s}
.rsvp-box legend{color:var(--muted);font-size:14px;margin-bottom:8px}
.evchecks{display:flex;flex-wrap:wrap;gap:8px}
.evchecks label{cursor:pointer}
.evchecks input{position:absolute;opacity:0}
.evchecks span{display:inline-block;padding:8px 16px;border-radius:999px;border:1.5px solid var(--line);font-size:14px;transition:all .3s cubic-bezier(.2,.8,.2,1)}
.evchecks input:checked+span{background:var(--accent);border-color:var(--accent);color:var(--accent-ink,#fff);transform:scale(1.04)}
.evchecks input:focus-visible+span{outline:2px solid var(--accent);outline-offset:2px}
#thanks{display:none;text-align:center}
#thanks.show{display:block;animation:ws-rise .7s cubic-bezier(.2,.8,.2,1)}
@keyframes ws-rise{from{opacity:0;transform:translateY(30px) scale(.96)}}
#thanks h3{font-family:var(--f-script);font-weight:400;font-size:60px;color:var(--accent)}
#thanks p{color:var(--muted);margin:6px 0 22px}

/* faq */
.faq{max-width:780px;margin:44px auto 0;text-align:left}
.qa{border-bottom:1px solid var(--line)}
.qa button{width:100%;background:none;border:0;color:var(--ink);text-align:left;padding:22px 4px;display:flex;justify-content:space-between;gap:16px;cursor:pointer;font-family:var(--f-head);font-size:24px;font-weight:600}
.qa .plus{flex:none;width:28px;height:28px;border-radius:50%;border:1.5px solid var(--accent);position:relative;transition:transform .45s cubic-bezier(.3,1.4,.5,1),background .3s}
.qa .plus::before,.qa .plus::after{content:"";position:absolute;left:50%;top:50%;width:12px;height:1.5px;background:var(--accent);transform:translate(-50%,-50%)}
.qa .plus::after{transform:translate(-50%,-50%) rotate(90deg)}
.qa.open .plus{transform:rotate(135deg);background:color-mix(in srgb,var(--soft) 30%,transparent)}
.qa .ans{display:grid;grid-template-rows:0fr;transition:grid-template-rows calc(.5s*var(--speed)) cubic-bezier(.2,.8,.2,1)}
.qa.open .ans{grid-template-rows:1fr}
.qa .ans>div{overflow:hidden}
.qa .ans p{color:var(--muted);padding:0 4px 22px;margin:0}

/* floating buttons */
.fab{position:fixed;z-index:65;width:50px;height:50px;border-radius:50%;border:0;background:var(--bg2);color:var(--accent);box-shadow:0 10px 26px color-mix(in srgb,var(--accent) 25%,transparent);cursor:pointer;display:grid;place-items:center;transition:transform .4s cubic-bezier(.3,1.4,.5,1),opacity .4s;font:700 13px var(--f-body)}
.fab:hover{transform:scale(1.08)}
#toTop{right:20px;bottom:20px;opacity:0;pointer-events:none;transform:translateY(20px);font-size:20px}
#toTop.show{opacity:1;pointer-events:auto;transform:none}
#musicBtn{right:20px;bottom:82px}
#musicBtn .eq{display:flex;gap:3px;align-items:flex-end;height:18px}
#musicBtn .eq i{width:3px;height:5px;background:var(--accent);border-radius:2px}
#musicBtn.on .eq i{animation:ws-eq .8s ease-in-out infinite alternate}
#musicBtn.on .eq i:nth-child(2){animation-delay:.2s}#musicBtn.on .eq i:nth-child(3){animation-delay:.4s}
#musicMenu{right:78px;bottom:82px;width:40px;height:40px;font-size:18px}
.mpanel{position:fixed;right:20px;bottom:140px;z-index:66;width:min(300px,calc(100vw - 40px));background:var(--bg2);color:var(--ink);border-radius:18px;padding:18px;box-shadow:0 24px 60px rgba(0,0,0,.25);border:1px solid var(--line);font:14px/1.4 var(--f-body)}
.mp-title{font:700 12px var(--f-body);letter-spacing:.14em;text-transform:uppercase;margin:0 0 10px;color:var(--muted)}
.mp-tracks{display:grid;gap:6px;margin-bottom:14px}
.mp-tr{padding:9px 12px;border-radius:12px;border:1px solid var(--line);background:transparent;color:inherit;text-align:left;cursor:pointer;font:inherit}
.mp-tr.on{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,transparent)}
.mp-row{display:grid;grid-template-columns:1fr 92px 40px;align-items:center;gap:8px;margin-bottom:12px}
.mp-name{display:flex;align-items:center;gap:6px;font-weight:700;font-size:13px;cursor:pointer}
.mp-row input[type=range]{width:100%;accent-color:var(--accent)}
.mp-v{font-size:12px;color:var(--muted);text-align:right}
.mp-stop{margin-top:12px;background:none;border:0;color:var(--muted);text-decoration:underline;cursor:pointer;font:inherit;padding:0}
@keyframes ws-eq{to{height:18px}}

/* design panel */
#designBtn{left:20px;bottom:20px;width:auto;padding:0 18px;border-radius:999px;letter-spacing:.1em;text-transform:uppercase}
#panel{position:fixed;left:20px;bottom:82px;z-index:66;width:min(380px,calc(100vw - 40px));max-height:calc(100vh - 110px);overflow:auto;background:var(--bg2);color:var(--ink);border-radius:20px;padding:20px;box-shadow:0 24px 60px rgba(0,0,0,.25);border:1px solid var(--line);transform-origin:bottom left;transform:scale(.6);opacity:0;pointer-events:none;transition:transform .45s cubic-bezier(.3,1.3,.5,1),opacity .3s;font:15px/1.5 var(--f-body)}
#panel.open{transform:none;opacity:1;pointer-events:auto}
#panel h4{margin:0 0 2px;font-family:var(--f-head);font-size:26px}
#panel h5{margin:18px 0 8px;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
#panel .hint{font-size:13px;color:var(--muted);margin:0 0 6px}
#panel label{display:grid;gap:4px;font-size:13px;font-weight:700;margin-bottom:10px}
#panel select,#panel input[type=text],#panel input[type=search]{font:inherit;font-weight:400;padding:9px 10px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--ink)}
#panel input[type=range]{accent-color:var(--accent)}
.styles{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.styles a{display:block;text-align:center;padding:10px;border-radius:12px;border:1.5px solid var(--line);color:var(--ink);text-decoration:none;font-weight:700;font-size:13px}
.styles a[aria-current=page]{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,transparent)}
.themes{display:flex;gap:8px;flex-wrap:wrap}
.themes button{width:40px;height:40px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:transform .3s;padding:0}
.themes button[aria-pressed=true]{border-color:var(--ink);transform:scale(1.12)}
.callig{display:grid;gap:6px;max-height:260px;overflow:auto;padding:2px}
.callig button{display:flex;justify-content:space-between;align-items:center;gap:10px;text-align:left;border:1.5px solid var(--line);background:var(--bg);color:var(--accent);border-radius:12px;padding:6px 12px;cursor:pointer;font-size:30px;line-height:1.3;transition:border-color .2s,transform .2s}
.callig button small{font:11px var(--f-body);color:var(--muted);white-space:nowrap}
.callig button:hover{transform:translateX(3px)}
.callig button[aria-pressed=true]{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 10%,var(--bg))}
#panel pre{background:var(--bg);border-radius:10px;padding:10px;font-size:11.5px;white-space:pre-wrap;word-break:break-word;margin:8px 0}
#panel .copied{font-size:13px;color:var(--accent);margin-left:8px}

/* iris opening (shared) */
@property --ir{syntax:'<percentage>';inherits:false;initial-value:0%}
.intro-iris{position:fixed;inset:0;z-index:100;display:grid;place-items:center;text-align:center;background:var(--bg);color:var(--accent);--ir:0%;-webkit-mask:radial-gradient(circle at 50% 50%,transparent var(--ir),#000 calc(var(--ir) + .6%));mask:radial-gradient(circle at 50% 50%,transparent var(--ir),#000 calc(var(--ir) + .6%));transition:--ir calc(1.5s*var(--speed)) cubic-bezier(.7,0,.3,1),opacity calc(1.5s*var(--speed)) ease}
.intro-iris.open{--ir:150%;pointer-events:none}
@supports not (mask:radial-gradient(#000,#000)){.intro-iris.open{opacity:0}}
.intro-iris .ii{transition:opacity .5s,transform .7s}
.intro-iris.open .ii{opacity:0;transform:scale(.92)}
.intro-iris b{font-family:var(--f-script);font-weight:400;font-size:clamp(44px,12vw,120px);display:block;line-height:1.1}
.intro-iris small{display:block;letter-spacing:.24em;text-transform:uppercase;font-size:12px;color:var(--muted);margin:8px 0 26px;font-family:var(--f-body)}
.intro-iris .ring{width:120px;height:120px;margin:0 auto 10px;border-radius:50%;border:1.5px solid var(--gold);animation:ws-breathe 2.4s ease-in-out infinite}
@keyframes ws-breathe{50%{transform:scale(1.08);opacity:.5}}

/* video backgrounds */
.vbg{position:absolute;inset:0;overflow:hidden;z-index:-1;background:#111 center/cover no-repeat}
.vbg video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;opacity:0;transition:opacity 1.2s ease}
.vbg video.ready{opacity:1}
.vbg::after{content:"";position:absolute;inset:0;background:var(--veil,rgba(10,12,24,.4))}
.vband{position:relative;isolation:isolate;overflow:hidden;min-height:78vh;display:grid;place-items:center;text-align:center;color:#fff;padding:140px 20px!important}
.vband .vbg video{inset:-12% 0;height:124%;transform:translateY(var(--par,0px))}
.vband .vbg::after{background:linear-gradient(180deg,rgba(8,14,26,.25),rgba(8,14,26,.45) 50%,rgba(8,14,26,.3))}
.vb-quote{font-family:var(--f-script);font-size:clamp(42px,6.5vw,80px);line-height:1.2;max-width:20ch;margin:0 auto;text-shadow:0 4px 30px rgba(0,0,0,.35);text-wrap:balance}
.vb-cite{display:block;margin-top:18px;font:700 12.5px var(--f-body);letter-spacing:.28em;text-transform:uppercase;opacity:.9}
.closing.has-video{position:relative;isolation:isolate;overflow:hidden;min-height:80vh;display:grid;place-content:center;color:#fff!important;background:none!important}
.closing.has-video .vbg::after{background:linear-gradient(180deg,rgba(8,12,24,.15),rgba(8,12,24,.5))}
.closing.has-video .tag,.closing.has-video p{color:#fff!important;text-shadow:0 3px 24px rgba(0,0,0,.35)}
.closing-line{font-family:var(--f-head);font-style:italic;font-size:clamp(22px,3vw,30px);margin:8px 0 4px}

@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  .js [data-anim]{opacity:1;transform:none;filter:none}
  .rings circle{stroke-dashoffset:0}
}`;

/* ================================================================= */
W.init = function(site){
  const C = window.WEDDING;
  if (!C) { document.body.insertAdjacentHTML("afterbegin", '<p style="padding:20px;background:#fee;color:#900;position:relative;z-index:999;font:16px sans-serif">config.js could not be read. Check it for a missing comma or quote near the last line you changed.</p>'); return null; }
  document.documentElement.classList.add("js");
  const st = document.createElement("style"); st.textContent = CSS; document.head.insertBefore(st, document.head.querySelector("style"));

  const D = Object.assign({ style:site.key, theme:"", fonts:{}, intro:"", reveal:"mixed", ambient:"", amount:40, speed:1, nameColor:"", ampColor:"", music:null, designPanel:false }, C.design || {});
  D.fonts = Object.assign({}, site.defaultFonts, D.fonts || {});
  if (!site.themes[D.theme]) D.theme = Object.keys(site.themes)[0];
  if (!site.intros.some(o => o[0] === D.intro)) D.intro = site.intros[0][0];
  if (!site.ambients.some(o => o[0] === D.ambient)) D.ambient = site.ambients[0][0];
  if (!REVEALS.some(o => o[0] === D.reveal)) D.reveal = "mixed";
  if (typeof D.amount !== "number") D.amount = 40;
  W.C = C; W.D = D; W.site = site;

  /* ---- theme, fonts, speed ---- */
  W.applyTheme = key => {
    const t = site.themes[key] || site.themes[Object.keys(site.themes)[0]]; D.theme = site.themes[key] ? key : Object.keys(site.themes)[0];
    const r = document.documentElement.style;
    Object.entries(t).forEach(([k, v]) => { if (k !== "name" && k !== "dark") r.setProperty("--" + k, v); });
    r.setProperty("color-scheme", t.dark ? "dark" : "light");
    site.onTheme && site.onTheme(t);
  };
  W.applyFonts = () => {
    const f = D.fonts, r = document.documentElement.style;
    W.loadFont(f.script, false); W.loadFont(f.heading, true); W.loadFont(f.body, true);
    r.setProperty("--f-script", `"${f.script}", cursive`);
    r.setProperty("--f-head", `"${f.heading}", Georgia, serif`);
    r.setProperty("--f-body", `"${f.body}", "Segoe UI", system-ui, sans-serif`);
  };
  W.applySpeed = () => document.documentElement.style.setProperty("--speed", Math.max(.3, +D.speed || 1));
  W.applyNameColors = () => { const r = document.documentElement.style;
    D.nameColor ? r.setProperty("--name-color", D.nameColor) : r.removeProperty("--name-color");
    D.ampColor ? r.setProperty("--amp-color", D.ampColor) : r.removeProperty("--amp-color"); };
  W.applyTheme(D.theme); W.applyFonts(); W.applySpeed(); W.applyNameColors();

  /* ---- hero text ---- */
  const N1 = C.names?.first || "", N2 = C.names?.second || "";
  const ini = `${esc(N1[0] || "")} &amp; ${esc(N2[0] || "")}`;
  document.title = `${N1} & ${N2}`;
  const set = (id, v, html) => { const el = document.getElementById(id); if (el) el[html ? "innerHTML" : "textContent"] = v; };
  set("mono", ini, true); set("introNames", ini, true);
  set("introDate", C.date?.display || "");
  set("invite", C.inviteLine || "");
  set("dateLine", C.date?.display || ""); set("city", C.city || "");
  set("hashtag", C.hashtag || ""); set("footNames", `${N1} & ${N2} · ${C.date?.display || ""}`);
  const nm = $("#names");
  if (nm) { let i = 0; const w = s => [...s].map(c => `<span class="ch" style="--i:${i++}">${c === " " ? "&nbsp;" : esc(c)}</span>`).join("");
    nm.setAttribute("aria-label", `${N1} and ${N2}`); nm.innerHTML = w(N1) + `<span class="ch amp" style="--i:${i++}">&amp;</span>` + w(N2); }
  set("parents", [C.parents?.first, C.parents?.second].filter(Boolean).map(p => `<span>${esc(p)}</span>`).join(""), true);
  set("verse", C.verse?.text ? C.verse.text.split(" ").map((w, i) => `<span class="w" style="--i:${i}">${esc(w)}</span>`).join(" ") + `<cite>${esc(C.verse.ref)}</cite>` : "", true);

  /* ---- videos ---- */
  const media = (C.media || {})[site.key] || {};
  const vids = [];
  const portrait = matchMedia("(orientation: portrait)");
  W.mountVideo = (holder, slot) => {
    if (!holder || !slot || (typeof slot === "object" && !slot.wide && !slot.tall)) return false;
    const pick = () => typeof slot === "string" ? slot : (portrait.matches && slot.tall ? slot.tall : (slot.wide || slot.tall));
    const v = document.createElement("video");
    v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true; v.preload = "auto";
    ["muted","playsinline","loop","disablepictureinpicture"].forEach(a => v.setAttribute(a, ""));
    v.setAttribute("aria-hidden", "true"); v.tabIndex = -1;
    v.addEventListener("loadeddata", () => v.classList.add("ready"));
    const set = () => { const src = pick(); if (v.dataset.src === src) return; v.dataset.src = src; const poster = src.replace(/\.(mp4|webm|mov)$/i, ".jpg"); holder.style.backgroundImage = `url("${poster}")`; v.poster = poster; v.src = src; if (!reduce && v.dataset.vis === "1") v.play().catch(() => {}); };
    set(); if (typeof slot === "object") portrait.addEventListener("change", set);
    holder.appendChild(v); vids.push(v); return true;
  };
  if (W.mountVideo($("#heroVideo"), media.hero)) $("#home")?.classList.add("has-video");
  if (media.interlude && !$('[data-sec="interlude"]') && $("#sections")) {
    $("#sections").insertAdjacentHTML("beforeend", `<section id="interlude" data-sec="interlude" class="vband"><div class="vbg" id="interVideo"></div><div class="vb-text" data-anim="blur"><p class="vb-quote">${esc(C.interlude?.text || "")}</p>${C.interlude?.ref ? `<cite class="vb-cite">${esc(C.interlude.ref)}</cite>` : ""}</div></section>`);
    W.mountVideo($("#interVideo"), media.interlude);
  }
  const closing = $("#closing");
  if (closing) {
    if (C.closing?.line) closing.querySelector(".tag")?.insertAdjacentHTML("afterend", `<p class="closing-line">${esc(C.closing.line)}</p>`);
    if (media.closing) { closing.insertAdjacentHTML("afterbegin", `<div class="vbg" id="closeVideo"></div>`); if (W.mountVideo($("#closeVideo"), media.closing)) closing.classList.add("has-video"); }
  }
  if ("IntersectionObserver" in window) {
    const vio = new IntersectionObserver(es => es.forEach(en => { const v = en.target; v.dataset.vis = en.isIntersecting ? "1" : "0"; if (en.isIntersecting && !reduce) v.play().catch(() => {}); else v.pause(); }), { threshold:.01 });
    vids.forEach(v => vio.observe(v));
  } else vids.forEach(v => { v.dataset.vis = "1"; if (!reduce) v.play().catch(() => {}); });

  /* ---- sections: order, hide, titles, nav ---- */
  const S = C.sections || {};
  const order = (S.order && S.order.length ? S.order : Object.keys(DEFAULT_TITLES)).filter(k => DEFAULT_TITLES[k]);
  const hide = new Set(S.hide || []);
  const titles = k => Object.assign({}, DEFAULT_TITLES[k], (S.titles || {})[k]);
  const holder = $("#sections");
  const empty = { interlude:!media.interlude, couple:!C.couple, story:!(C.story || []).length, gallery:!(C.gallery || []).length, venues:!(C.venues || []).length, faq:!(C.faq || []).length, events:!(C.events || []).length };
  const shown = [];
  $$("[data-sec]").forEach(el => el.hidden = true);
  order.forEach(k => {
    const el = $(`[data-sec="${k}"]`); if (!el || hide.has(k) || empty[k]) return;
    el.hidden = false; holder.appendChild(el); shown.push(k);
    const t = titles(k); const e = el.querySelector('[data-t="eyebrow"]'), h = el.querySelector('[data-t="title"]');
    if (e) e.textContent = t.eyebrow; if (h) h.textContent = t.title;
  });
  const links = $("#links");
  if (links) links.innerHTML = shown.filter(k => titles(k).nav).map(k => `<li><a href="#${k}">${esc(titles(k).nav)}</a></li>`).join("");
  const rsvpBtn = $("#heroRsvp"); if (rsvpBtn && !shown.includes("rsvp")) rsvpBtn.hidden = true;

  /* ---- placeholders ---- */
  const ph = site.placeholder || ((label, i, big) => `<div class="ph" style="background:linear-gradient(135deg,${["var(--soft),var(--accent)","var(--accent),var(--gold)","var(--gold),var(--soft)"][i % 3]})">${big ? `<span class="big">${esc(label)}</span>` : esc(label)}</div>`);
  W.ph = ph;

  /* ---- couple ---- */
  if (C.couple && $("#coupleGrid")) {
    const p = (x, side, i) => !x ? "" : `
      <article class="person" data-anim="${side}">
        <div class="portrait ${esc(["arch","rounded","oval","circle"].includes(C.couple.frame) ? C.couple.frame : "rounded")}" data-ph="${esc((x.name || "?")[0])}" data-i="${i}">${x.photo ? `<img src="${esc(x.photo)}" alt="${esc(x.fullName || x.name)}" loading="lazy">` : ph((x.name || "?")[0], i, true)}</div>
        <p class="role">${esc(x.role)}</p>
        <h3 class="pname">${esc(x.fullName || x.name)}</h3>
        <p class="about">${esc(x.about)}</p>
        ${x.facts?.length ? `<div class="chips">${x.facts.map(f => `<span class="chip">${esc(f)}</span>`).join("")}</div>` : ""}
      </article>`;
    if (C.couple.layout === "cards") {
      $("#coupleGrid").innerHTML = `<div class="couple">${p(C.couple.bride, "left", 0)}
        <div class="couple-mid" data-anim="zoom"><svg class="rings" viewBox="0 0 110 76" aria-hidden="true"><circle cx="40" cy="38" r="28"/><circle cx="70" cy="38" r="28"/></svg>${C.couple.together ? `<p class="together">${esc(C.couple.together)}</p>` : ""}</div>
        ${p(C.couple.groom, "right", 1)}</div>`;
    } else {
      /* "meet" layout: bride on the left, groom on the right, parents shown first.
         As you scroll, the parents fade away, the two come together, and a cross appears between them. */
      const side = (x, i, parents, cls) => `
        <div class="ms ${cls}" data-side="${cls}">
          <div class="portrait ${esc(["arch","rounded","oval","circle"].includes(C.couple.frame) ? C.couple.frame : "rounded")} ms-photo" data-ph="${esc((x.name || "?")[0])}" data-i="${i}">${x.photo ? `<img src="${esc(x.photo)}" alt="${esc(x.fullName || x.name)}" loading="lazy">` : ph((x.name || "?")[0], i, true)}</div>
          <h3 class="ms-name">${esc(x.name)}</h3>
          <p class="role">${esc(x.role)}</p>
          ${parents ? `<p class="ms-parents">${esc(parents)}</p>` : ""}
        </div>`;
      $("#coupleGrid").innerHTML = `
        <div class="meet" id="meet">
          <div class="meet-stage">
            ${side(C.couple.bride, 0, C.parents?.first, "ms-l")}
            <svg class="ms-cross" viewBox="0 0 40 52" aria-hidden="true"><path d="M20 2v48M6 16h28" fill="none" stroke-width="2.6" stroke-linecap="round"/></svg>
            ${side(C.couple.groom, 1, C.parents?.second, "ms-r")}
            ${C.couple.together ? `<p class="ms-together">${esc(C.couple.together)}</p>` : ""}
          </div>
        </div>`;
      const meet = $("#meet"), L = meet.querySelector(".ms-l"), R = meet.querySelector(".ms-r"), X = meet.querySelector(".ms-cross"), T = meet.querySelector(".ms-together");
      let ticking = false;
      const update = () => {
        ticking = false;
        const r = meet.getBoundingClientRect(), range = Math.max(1, r.height - innerHeight);
        const pr = reduce ? 1 : Math.min(1, Math.max(0, -r.top / range));
        const narrow = innerWidth < 760;
        // how far each family travels so the photos end up side by side with a small gap between them
        const photo = Math.min(230, narrow ? 150 : .44 * innerWidth);
        const move = narrow ? Math.max(0, innerHeight / 4 - photo / 2 - 60) : Math.max(0, Math.min(innerWidth - 40, 1000) / 4 - photo / 2 - 40);
        const t = Math.min(1, pr / .6);                // names travel in during the first 60% of the scroll
        const dx = narrow ? 0 : t * move, dy = narrow ? t * move : 0;
        L.style.transform = `translate(${dx}px, ${dy}px)`;
        R.style.transform = `translate(${-dx}px, ${-dy}px)`;
        const parentsFade = Math.min(1, Math.max(0, (pr - .05) / .3));
        L.querySelector(".ms-parents") && (L.querySelector(".ms-parents").style.cssText = `opacity:${1 - parentsFade};transform:translateY(${-parentsFade * 24}px)`);
        R.querySelector(".ms-parents") && (R.querySelector(".ms-parents").style.cssText = `opacity:${1 - parentsFade};transform:translateY(${-parentsFade * 24}px)`);
        const cross = Math.min(1, Math.max(0, (pr - .55) / .25));
        X.style.opacity = cross; X.style.transform = `scale(${.6 + .4 * cross}) rotate(${(1 - cross) * -40}deg)`;
        if (T) T.style.opacity = Math.min(1, Math.max(0, (pr - .8) / .15));
      };
      const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
      addEventListener("scroll", onScroll, { passive: true });
      addEventListener("resize", onScroll);
      update();
    }
  }

  // a photo that isn't uploaded yet falls back to the pretty placeholder
  $$(".portrait img").forEach(img => img.addEventListener("error", () => { const p = img.parentElement; img.outerHTML = ph(p.dataset.ph, +p.dataset.i, true); }));

  /* ---- events ---- */
  const maps = q => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  const PIN = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';
  const photoSets = [];
  const thumbs = (list, label) => {
    if (!list || !list.length) return "";
    const set = photoSets.push(list.map((p, k) => typeof p === "string" ? { src:p, caption:`${label} · ${k + 1} of ${list.length}` } : p)) - 1;
    const max = 4;
    return `<div class="thumbs">${list.slice(0, max).map((p, k) => `<button type="button" data-set="${set}" data-i="${k}" aria-label="Open ${esc(label)} photo ${k + 1}"><img src="${esc(typeof p === "string" ? p : p.src)}" alt="" loading="lazy">${k === max - 1 && list.length > max ? `<span class="more">+${list.length - max + 1}</span>` : ""}</button>`).join("")}</div>`;
  };
  if ($("#timeline")) $("#timeline").insertAdjacentHTML("beforeend", (C.events || []).map((e, i) => `
    <div class="ev${e.done ? " done" : ""}" data-anim="${i % 2 ? "left" : "right"}">
      <div class="node"><svg viewBox="0 0 24 24" fill="none" style="stroke:var(--accent)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[e.icon] || ICONS.heart}</svg></div>
      <div class="card">
        <p class="when">${esc(e.date)}${e.time ? " · " + esc(e.time) : ""}</p>
        <h3>${esc(e.name)}${e.done ? `<span class="badge">${esc(e.doneLabel || "Celebrated")}</span>` : ""}</h3>
        <p class="where">${e.mapsQuery ? `<a class="maplink" href="${maps(e.mapsQuery)}" target="_blank" rel="noopener" title="Open in Google Maps">${PIN}${esc(e.venue)}</a>` : esc(e.venue)}</p>
        ${e.note ? `<p class="note">${esc(e.note)}</p>` : ""}
        <div class="chips">
          ${e.dress ? `<span class="chip"><span class="dot" style="background:${esc(e.color || "#fff")}"></span>${esc(e.dress)}</span>` : ""}
          ${e.mapsQuery && !e.done ? `<a class="chip" href="${maps(e.mapsQuery)}" target="_blank" rel="noopener">Directions</a>` : ""}
        </div>
        ${thumbs(e.photos, e.name)}
      </div>
    </div>`).join(""));

  /* ---- story ---- */
  if ($("#storyGrid")) $("#storyGrid").innerHTML = (C.story || []).map((s, i) => `
    <article class="pol" data-anim="${["left","up","right"][i % 3]}" style="--r:${[-4,2,-2,3][i % 4]}deg">
      <div class="pic">${s.photo ? `<img src="${esc(s.photo)}" alt="${esc(s.title)}" loading="lazy">` : ph(s.when, i)}</div>
      <p class="when-tag">${esc(s.when)}</p><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p>
    </article>`).join("");

  /* ---- gallery + lightbox ---- */
  const G = C.gallery || [];
  {
    if ($("#galleryGrid")) $("#galleryGrid").innerHTML = G.map((g, i) => `<button type="button" data-i="${i}" data-anim="zoom" aria-label="Open photo: ${esc(g.caption)}">${g.src ? `<img src="${esc(g.src)}" alt="${esc(g.caption)}" loading="lazy">` : ph(g.caption, i)}<span class="cap">${esc(g.caption)}</span></button>`).join("");
    document.body.insertAdjacentHTML("beforeend", `<div id="lb" role="dialog" aria-modal="true" aria-label="Photo viewer"><div class="frame" id="lbFrame"></div><button class="lbbtn prev" id="lbPrev" type="button" aria-label="Previous photo">&#8249;</button><button class="lbbtn next" id="lbNext" type="button" aria-label="Next photo">&#8250;</button><button class="lbbtn close" id="lbClose" type="button" aria-label="Close">&#10005;</button></div>`);
    let cur = 0, L = G; const lb = $("#lb");
    const show = (i, dir) => {
      cur = (i + L.length) % L.length; const g = L[cur], f = $("#lbFrame");
      f.innerHTML = (g.src ? `<img src="${esc(g.src)}" alt="${esc(g.caption)}">` : ph(g.caption, cur)) + `<p class="lbcap">${esc(g.caption)}</p>`;
      if (dir) { f.style.setProperty("--dir", dir > 0 ? "60px" : "-60px"); f.classList.remove("swap"); void f.offsetWidth; f.classList.add("swap"); }
      lb.classList.add("show");
    };
    $$(".thumbs img").forEach(img => img.addEventListener("error", () => img.closest("button").remove()));
    $("#galleryGrid")?.addEventListener("click", e => { const b = e.target.closest("button"); if (b) { L = G; show(+b.dataset.i); $("#lbClose").focus(); } });
    $("#timeline")?.addEventListener("click", e => { const b = e.target.closest(".thumbs button"); if (b) { L = photoSets[+b.dataset.set]; show(+b.dataset.i); $("#lbClose").focus(); } });
    W.openPhotos = (list, i = 0) => { L = list; show(i); };
    $("#lbPrev").onclick = () => show(cur - 1, -1); $("#lbNext").onclick = () => show(cur + 1, 1);
    $("#lbClose").onclick = () => lb.classList.remove("show");
    lb.addEventListener("click", e => { if (e.target === lb) lb.classList.remove("show"); });
    addEventListener("keydown", e => { if (!lb.classList.contains("show")) return; if (e.key === "Escape") lb.classList.remove("show"); if (e.key === "ArrowLeft") show(cur - 1, -1); if (e.key === "ArrowRight") show(cur + 1, 1); });
    let sx = null; lb.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive:true });
    lb.addEventListener("touchend", e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); sx = null; });
    if (!reduce) $$("#galleryGrid button").forEach(b => {
      b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; b.style.transform = `perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg)`; });
      b.addEventListener("pointerleave", () => b.style.transform = "");
    });
  }

  /* ---- venues ---- */
  if ($("#venueGrid")) $("#venueGrid").innerHTML = (C.venues || []).map((v, i) => `
    <article class="venue" data-anim="${i % 2 ? "right" : "left"}">
      <div class="art">${site.venueArt ? site.venueArt(i, v) : ""}</div>
      <div class="body">
        <p class="eyebrow">${esc(v.label)}</p><h3>${v.mapsQuery ? `<a href="${maps(v.mapsQuery)}" target="_blank" rel="noopener" style="color:inherit;text-decoration:none" title="Open in Google Maps">${esc(v.name)}</a>` : esc(v.name)}</h3><p class="where">${v.mapsQuery ? `<a class="maplink" href="${maps(v.mapsQuery)}" target="_blank" rel="noopener">${PIN}${esc(v.address)}</a>` : esc(v.address)}</p>
        ${v.tips?.length ? `<ul>${v.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
        ${v.mapsQuery ? `<div><a class="btn solid" href="${maps(v.mapsQuery)}" target="_blank" rel="noopener">Open in Google Maps</a></div>` : ""}
      </div>
    </article>`).join("");

  /* ---- FAQ ---- */
  if ($("#faqList")) {
    $("#faqList").innerHTML = (C.faq || []).map(([q, a], i) => `<div class="qa" data-anim="up"><button type="button" aria-expanded="false" aria-controls="ans${i}">${esc(q)}<span class="plus" aria-hidden="true"></span></button><div class="ans" id="ans${i}"><div><p>${esc(a)}</p></div></div></div>`).join("");
    $("#faqList").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; const qa = b.parentElement, open = !qa.classList.contains("open"); qa.classList.toggle("open", open); b.setAttribute("aria-expanded", open); });
  }

  /* ---- RSVP ---- */
  if ($("#rsvpMount")) {
    set("rsvpBy", C.rsvp?.by || "");
    $("#rsvpMount").innerHTML = `<div class="rsvp-box" data-anim="flip">
      <form id="rsvpForm" novalidate>
        <div class="toggle" role="radiogroup" aria-label="Can you come?">
          <input type="radio" name="att" id="rYes" checked><label for="rYes">Joyfully accept</label>
          <input type="radio" name="att" id="rNo"><label for="rNo">Regretfully decline</label><span class="pill"></span>
        </div>
        <div class="row">
          <div class="field"><input id="fName" placeholder=" " autocomplete="name"><label for="fName">Your name</label></div>
          <div class="field"><select id="fCount"><option>1</option><option>2</option><option>3</option><option>4</option><option>5 or more</option></select><label for="fCount">Number of guests</label></div>
        </div>
        <fieldset id="evField"><legend>Which events will you attend?</legend><div class="evchecks">${(C.events || []).map((e, i) => e.done ? "" : `<label for="evc${i}"><input type="checkbox" id="evc${i}" value="${esc(e.name)}" checked><span>${esc(e.name)}</span></label>`).join("")}</div></fieldset>
        <div class="field"><textarea id="fMsg" rows="3" placeholder=" "></textarea><label for="fMsg">A blessing or note for us (optional)</label></div>
        <p id="formErr" style="color:var(--accent);display:none;margin:0">Please write your name so we know who's coming.</p>
        <div style="text-align:center"><button class="btn solid" type="submit">Send RSVP</button></div>
      </form>
      <div id="thanks" aria-live="polite"><h3>Thank you!</h3><p id="thanksText"></p>
        <a class="btn solid" id="waBtn" href="#" target="_blank" rel="noopener">Send on WhatsApp</a>
        <p style="margin-top:14px"><button class="btn ghost" id="again" type="button">Edit reply</button></p></div>
    </div>`;
    $$('input[name="att"]').forEach(r => r.addEventListener("change", () => { $("#evField").style.opacity = $("#rNo").checked ? .4 : 1; }));
    $("#rsvpForm").addEventListener("submit", e => {
      e.preventDefault();
      const name = $("#fName").value.trim();
      if (!name) { $("#formErr").style.display = "block"; $("#fName").focus(); return; }
      $("#formErr").style.display = "none";
      const yes = $("#rYes").checked, evs = $$(".evchecks input:checked").map(x => x.value).join(", ") || "None";
      const msg = `RSVP for ${N1} & ${N2}'s wedding\nName: ${name}\nReply: ${yes ? "Joyfully accept" : "Regretfully decline"}\nGuests: ${$("#fCount").value}${yes ? `\nEvents: ${evs}` : ""}\nNote: ${$("#fMsg").value.trim() || "-"}`;
      $("#waBtn").href = `https://wa.me/${String(C.rsvp?.whatsapp || "").replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
      $("#thanksText").textContent = yes ? `We can't wait to celebrate with you, ${name}! Tap below to send your reply to us on WhatsApp.` : `We'll miss you, ${name}. Thank you for letting us know. Tap below to send your reply.`;
      $("#rsvpForm").style.display = "none"; $("#thanks").classList.add("show");
      if (yes && site.celebrate) { const r = $("#thanks").getBoundingClientRect(); site.celebrate(r.left + r.width / 2, r.top + 40); }
    });
    document.addEventListener("click", e => { if (e.target.id === "again") { $("#thanks").classList.remove("show"); $("#rsvpForm").style.display = ""; } });
  }

  /* ---- calendar ---- */
  const cal = $("#calBtn");
  if (cal) try {
    const f = d => new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const v = (C.venues && C.venues[0]) || {};
    cal.href = "https://calendar.google.com/calendar/render?" + new URLSearchParams({ action:"TEMPLATE", text:`${N1} & ${N2}'s Wedding`, dates:`${f(C.date.start)}/${f(C.date.end)}`, location:[v.name, v.address].filter(Boolean).join(", "), details:`Celebrate with us! ${C.hashtag || ""}` });
  } catch(e){ cal.hidden = true; }

  /* ---- countdown ---- */
  (function(){
    const target = new Date(C.date?.start).getTime(), last = {};
    if (isNaN(target) || !$("#cd-d")) return;
    const tick = () => {
      const t = Math.max(0, target - Date.now());
      const v = { d:Math.floor(t/864e5), h:Math.floor(t/36e5) % 24, m:Math.floor(t/6e4) % 60, s:Math.floor(t/1e3) % 60 };
      for (const k in v) { const el = $("#cd-" + k), s = String(v[k]).padStart(2, "0"); if (last[k] !== s) { el.textContent = s; if (last[k] !== undefined && !reduce) { el.classList.remove("flip"); void el.offsetWidth; el.classList.add("flip"); } last[k] = s; } }
    };
    tick(); setInterval(tick, 1000);
  })();

  /* ---- floating buttons ---- */
  document.body.insertAdjacentHTML("beforeend", `<button class="fab" id="toTop" type="button" aria-label="Back to top">&#8593;</button>`);
  $("#toTop").onclick = () => scrollTo({ top:0, behavior: reduce ? "auto" : "smooth" });
  /* ---- music: several tracks that play together, each with its own volume ----
     config.js music: [ { label, src, volume }, ... ]   (volume 0-100, the starting level)
     Visitors can switch each track on or off and change its volume; choices are remembered on that device. */
  if (D.music) {
    const tracks = (Array.isArray(D.music) ? D.music : [D.music]).map((t, i) => typeof t === "string" ? { src:t, label:"Track " + (i + 1), volume:70 } : Object.assign({ label:"Track " + (i + 1), volume:70 }, t));
    let saved = null; try { saved = JSON.parse(localStorage.getItem("wsMusic") || "null"); } catch (e) {}
    const st = tracks.map((t, i) => ({
      on: saved && saved.tracks && saved.tracks[i] ? saved.tracks[i].on !== false : true,
      vol: saved && saved.tracks && saved.tracks[i] && typeof saved.tracks[i].vol === "number" ? saved.tracks[i].vol : t.volume,
    }));
    let playing = false;
    document.body.insertAdjacentHTML("beforeend",
      `<button class="fab mbtn-menu" id="musicMenu" type="button" aria-label="Music options" aria-expanded="false">&#9835;</button>
       <button class="fab" id="musicBtn" type="button" aria-label="Play music"><span class="eq"><i></i><i></i><i></i></span></button>
       <div id="musicPanel" class="mpanel" hidden>
         <p class="mp-title">Music</p>
         ${tracks.map((t, i) => `<div class="mp-row">
            <label class="mp-name"><input type="checkbox" data-on="${i}"> <span>${esc(t.label)}</span></label>
            <input type="range" min="0" max="100" step="1" data-vol="${i}" aria-label="Volume for ${esc(t.label)}">
            <span class="mp-v" data-vv="${i}"></span></div>`).join("")}
         <button type="button" class="mp-stop" id="musicStop">Stop music</button>
       </div>
       ${tracks.map((t, i) => `<audio data-track="${i}" loop preload="none" src="${encodeURI(t.src)}"></audio>`).join("")}`);
    const b = $("#musicBtn"), p = $("#musicPanel"), menu = $("#musicMenu");
    const audios = tracks.map((t, i) => document.querySelector(`audio[data-track="${i}"]`));
    const remember = () => { try { localStorage.setItem("wsMusic", JSON.stringify({ tracks: st.map(s => ({ on: s.on, vol: s.vol })) })); } catch (e) {} };
    const setOn = on => { playing = on; b.classList.toggle("on", on); b.setAttribute("aria-label", on ? "Pause music" : "Play music"); };
    const applyTrack = i => {
      const a = audios[i], s = st[i];
      a.volume = s.vol / 100;
      $(`[data-vv="${i}"]`).textContent = s.vol + "%";
      if (playing && s.on && a.paused) a.play().catch(() => {});
      if (!s.on) a.pause();
    };
    const startAll = () => {
      const ps = st.map((s, i) => s.on ? audios[i].play().then(() => true, () => false) : Promise.resolve(false));
      return Promise.all(ps).then(r => { if (r.some(Boolean)) setOn(true); return r.some(Boolean); });
    };
    // play by default; browsers block sound until the visitor interacts, so start on the first touch, click, key or scroll
    const armStart = () => {
      const go = () => { startAll(); ["pointerdown","keydown","touchstart","scroll","wheel"].forEach(ev => removeEventListener(ev, go, true)); };
      ["pointerdown","keydown","touchstart","scroll","wheel"].forEach(ev => addEventListener(ev, go, { capture: true, passive: true }));
    };
    startAll().then(ok => { if (!ok) armStart(); });
    const stopAll = () => { audios.forEach(a => a.pause()); setOn(false); };
    tracks.forEach((t, i) => {
      const cb = p.querySelector(`[data-on="${i}"]`), r = p.querySelector(`[data-vol="${i}"]`);
      cb.checked = st[i].on; r.value = st[i].vol;
      cb.onchange = () => { st[i].on = cb.checked; if (cb.checked && playing) audios[i].play().catch(() => {}); if (!cb.checked) audios[i].pause(); remember(); };
      r.oninput = () => { st[i].vol = +r.value; applyTrack(i); remember(); };
      applyTrack(i);
    });
    b.onclick = () => { if (playing) stopAll(); else startAll(); };
    const openMenu = o => { p.hidden = !o; menu.setAttribute("aria-expanded", o); };
    menu.onclick = () => openMenu(p.hidden);
    $("#musicStop").onclick = () => { stopAll(); openMenu(false); };
    document.addEventListener("click", e => { if (!p.hidden && !e.target.closest("#musicPanel,#musicMenu")) openMenu(false); });
  }

  /* ---- ripples ---- */
  document.addEventListener("click", e => {
    const b = e.target.closest(".btn"); if (!b || reduce) return;
    const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), sp = document.createElement("span");
    sp.className = "ripple"; sp.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s/2}px;top:${e.clientY - r.top - s/2}px`;
    b.appendChild(sp); setTimeout(() => sp.remove(), 700);
  });

  /* ---- scroll: progress, nav, timeline ---- */
  const nav = $("#nav"); let lastY = scrollY;
  const onScroll = () => {
    const h = document.documentElement, y = scrollY;
    const pg = $("#progress"); if (pg) pg.style.transform = `scaleX(${y / Math.max(1, h.scrollHeight - h.clientHeight)})`;
    if (nav) { nav.classList.toggle("solid", y > 40); nav.classList.toggle("hide", y > lastY && y > 300 && !(links && links.classList.contains("open"))); }
    lastY = y;
    $("#toTop").classList.toggle("show", y > 700);
    const tl = $("#timeline"), fill = $("#tlFill");
    if (tl && fill) { const r = tl.getBoundingClientRect(); fill.style.setProperty("--p", reduce ? 1 : Math.min(1, Math.max(0, (innerHeight * .7 - r.top) / r.height))); }
    if (!reduce) $$(".vband").forEach(b => { const r = b.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) b.style.setProperty("--par", ((r.top + r.height / 2 - innerHeight / 2) * -0.12).toFixed(1) + "px"); });
    site.onScroll && site.onScroll(y);
  };
  addEventListener("scroll", onScroll, { passive:true }); onScroll();
  const burger = $("#burger");
  if (burger && links) {
    burger.onclick = () => { const o = links.classList.toggle("open"); burger.classList.toggle("x", o); burger.setAttribute("aria-expanded", o); };
    links.addEventListener("click", e => { if (e.target.closest("a")) { links.classList.remove("open"); burger.classList.remove("x"); burger.setAttribute("aria-expanded", false); } });
  }

  /* ---- scroll reveal ---- */
  $$("[data-anim]").forEach(el => el.dataset.orig = el.dataset.anim);
  let io = null;
  W.setupReveal = () => {
    document.documentElement.classList.toggle("no-reveal", D.reveal === "none" || reduce);
    let n = 0;
    $$("[data-anim]").forEach(el => {
      el.dataset.anim = D.reveal === "mixed" || D.reveal === "none" ? el.dataset.orig : D.reveal === "slide" ? (n++ % 2 ? "right" : "left") : D.reveal;
    });
    if (D.reveal === "none" || reduce || !("IntersectionObserver" in window)) { $$("[data-anim],[data-draw]").forEach(el => el.classList.add("in")); return; }
    if (io) io.disconnect();
    io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold:.12, rootMargin:"0px 0px -40px 0px" });
    $$("[data-anim],[data-draw]").forEach(el => {
      const sib = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
      el.style.transitionDelay = (sib % 4) * 0.09 * D.speed + "s";
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0 && el.classList.contains("in")) return;
      el.classList.remove("in"); io.observe(el);
    });
  };
  W.setupReveal();
  if ("IntersectionObserver" in window && links) {
    const secIo = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) $$("#links a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id)); }), { rootMargin:"-45% 0px -50% 0px" });
    $$("[data-sec]").forEach(s => secIo.observe(s));
  }

  if (D.designPanel) buildPanel(site, D);
  return W;
};

W.iris = function(){
  const D = W.D, C = W.C;
  let el = $("#irisIntro");
  if (!el) {
    document.body.insertAdjacentHTML("beforeend", `<div class="intro-iris" id="irisIntro" hidden><div class="ii"><b>${esc((C.names?.first || "")[0] || "")} &amp; ${esc((C.names?.second || "")[0] || "")}</b><small>${esc(C.date?.display || "")}</small><button class="btn solid" type="button" id="irisBtn">Open invitation</button></div></div>`);
    el = $("#irisIntro");
  }
  document.body.classList.remove("go"); el.hidden = false; el.classList.remove("open");
  let done = false;
  const open = () => { if (done) return; done = true; el.classList.add("open"); W.start(); setTimeout(() => { el.hidden = true; }, 1600 * (+D.speed || 1)); };
  $("#irisBtn").onclick = open; el.onclick = e => { if (e.target === el) open(); };
  clearTimeout(W._irisT); W._irisT = setTimeout(open, 3200);
};
W.start = function(){ document.body.classList.add("go"); W.site.onStart && W.site.onStart(); };

/* ---------------- design panel ---------------- */
function buildPanel(site, D){
  const C = W.C, N = `${C.names?.first || ""} & ${C.names?.second || ""}`;
  document.body.insertAdjacentHTML("beforeend", `
  <button class="fab" id="designBtn" type="button" aria-expanded="false" aria-controls="panel">Design</button>
  <div id="panel" role="dialog" aria-label="Design settings">
    <h4>Try a look</h4>
    <p class="hint">Everything changes instantly. When you're happy, press <b>Copy settings</b> at the bottom and paste it into config.js.</p>
    <h5>Design</h5>
    <div class="styles">${[["sakura","Sakura blossom"],["ocean","Ocean sunrise"]].map(([k, l]) => `<a href="${k}.html"${k === site.key ? ' aria-current="page"' : ""}>${l}</a>`).join("")}</div>
    <h5>Colours</h5>
    <div class="themes" id="themeBtns">${Object.entries(site.themes).map(([k, t]) => `<button type="button" data-t="${k}" title="${esc(t.name)}" aria-label="${esc(t.name)}" aria-pressed="${k === D.theme}" style="background:${site.swatch(t)}"></button>`).join("")}</div>
    <p class="hint" id="themeName" style="margin-top:6px"></p>
    <h5>Calligraphy for your names</h5>
    <input type="search" id="fontSearch" placeholder="Filter fonts…" aria-label="Filter calligraphy fonts" style="width:100%;margin-bottom:8px">
    <div class="callig" id="callig"></div>
    <label for="pScriptCustom" style="margin-top:10px">Or type any Google Font name<input type="text" id="pScriptCustom" placeholder="e.g. Corinthia"></label>
    <h5>Colour of your names</h5>
    <div style="display:flex;gap:10px;align-items:flex-end;margin-bottom:10px">
      <label for="pNameCol" style="margin:0">Names colour<input type="color" id="pNameCol" style="width:56px;height:36px;border:0;background:none;padding:0"></label>
      <label for="pAmpCol" style="margin:0">"&amp;" colour<input type="color" id="pAmpCol" style="width:56px;height:36px;border:0;background:none;padding:0"></label>
      <button type="button" class="btn ghost" id="pColReset" style="padding:8px 14px">Use theme colour</button>
    </div>
    <h5>Other fonts</h5>
    <label for="pHead">Headings<select id="pHead"></select></label>
    <label for="pBody">Normal text<select id="pBody"></select></label>
    <h5>Animations</h5>
    <label for="pIntro">Opening animation<select id="pIntro">${site.intros.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join("")}</select></label>
    <label for="pReveal">How sections appear as you scroll<select id="pReveal">${REVEALS.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join("")}</select></label>
    <label for="pAmb">Background effect<select id="pAmb">${site.ambients.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join("")}</select></label>
    <label for="pAmount">Effect amount: <span id="pAmountV"></span><input type="range" id="pAmount" min="0" max="100" step="5"></label>
    <label for="pSpeed">Animation speed: <span id="pSpeedV"></span><input type="range" id="pSpeed" min="0.5" max="2" step="0.1"></label>
    <button class="btn ghost" type="button" id="replay" style="width:100%;margin:4px 0 10px">Replay opening</button>
    <h5>Your settings</h5>
    <pre id="pCode"></pre>
    <button class="btn solid" type="button" id="pCopy">Copy settings</button><span class="copied" id="pCopied"></span>
  </div>`);
  const panel = $("#panel"), btn = $("#designBtn");
  let fontsLoaded = false;
  btn.onclick = () => {
    const o = panel.classList.toggle("open"); btn.setAttribute("aria-expanded", o);
    if (o && !fontsLoaded) { fontsLoaded = true; W.FONTS.script.forEach(f => W.loadFont(f)); W.FONTS.heading.concat(W.FONTS.body).forEach(f => W.loadFont(f)); }
  };
  const renderCallig = (filter = "") => {
    const list = W.FONTS.script.includes(D.fonts.script) ? W.FONTS.script : [D.fonts.script, ...W.FONTS.script];
    $("#callig").innerHTML = list.filter(f => f.toLowerCase().includes(filter.toLowerCase())).map(f =>
      `<button type="button" data-f="${esc(f)}" aria-pressed="${f === D.fonts.script}" style="font-family:'${esc(f)}',cursive">${esc(N)}<small>${esc(f)}</small></button>`).join("");
  };
  renderCallig();
  $("#fontSearch").oninput = e => renderCallig(e.target.value);
  $("#callig").onclick = e => { const b = e.target.closest("button"); if (!b) return; D.fonts.script = b.dataset.f; W.applyFonts(); $$("#callig button").forEach(x => x.setAttribute("aria-pressed", x === b)); save(); };
  $("#pScriptCustom").onchange = e => { const v = e.target.value.trim(); if (!v) return; D.fonts.script = v; W.applyFonts(); renderCallig($("#fontSearch").value); save(); };
  const fill = (id, list, val) => { const all = list.includes(val) ? list : [val, ...list]; $(id).innerHTML = all.map(f => `<option ${f === val ? "selected" : ""} style="font-family:'${esc(f)}'">${esc(f)}</option>`).join(""); };
  fill("#pHead", W.FONTS.heading, D.fonts.heading); fill("#pBody", W.FONTS.body, D.fonts.body);
  const toHex = c => { const d = document.createElement("canvas").getContext("2d"); d.fillStyle = c; return d.fillStyle; };
  const syncCols = () => { const cs = getComputedStyle($("#names") || document.body); $("#pNameCol").value = D.nameColor ? toHex(D.nameColor) : toHex(cs.color); const amp = $("#names .amp"); $("#pAmpCol").value = D.ampColor ? toHex(D.ampColor) : toHex(amp ? getComputedStyle(amp).color : cs.color); };
  syncCols();
  $("#pNameCol").oninput = e => { D.nameColor = e.target.value; W.applyNameColors(); save(); };
  $("#pAmpCol").oninput = e => { D.ampColor = e.target.value; W.applyNameColors(); save(); };
  $("#pColReset").onclick = () => { D.nameColor = ""; D.ampColor = ""; W.applyNameColors(); syncCols(); save(); };
  $("#pHead").onchange = e => { D.fonts.heading = e.target.value; W.applyFonts(); save(); };
  $("#pBody").onchange = e => { D.fonts.body = e.target.value; W.applyFonts(); save(); };
  $("#pIntro").value = D.intro; $("#pReveal").value = D.reveal; $("#pAmb").value = D.ambient; $("#pAmount").value = D.amount; $("#pSpeed").value = D.speed;
  $("#themeBtns").onclick = e => { const b = e.target.closest("button"); if (!b) return; W.applyTheme(b.dataset.t); $$("#themeBtns button").forEach(x => x.setAttribute("aria-pressed", x === b)); syncCols(); save(); };
  $("#pIntro").onchange = e => { D.intro = e.target.value; save(); };
  $("#pReveal").onchange = e => { D.reveal = e.target.value; W.setupReveal(); save(); };
  $("#pAmb").onchange = e => { D.ambient = e.target.value; W.site.setAmbient && W.site.setAmbient(D.ambient, D.amount); save(); };
  $("#pAmount").oninput = e => { D.amount = +e.target.value; W.site.setAmbient && W.site.setAmbient(D.ambient, D.amount); save(); };
  $("#pSpeed").oninput = e => { D.speed = +e.target.value; W.applySpeed(); save(); };
  $("#replay").onclick = () => { panel.classList.remove("open"); btn.setAttribute("aria-expanded", false); scrollTo({ top:0 }); W.site.playIntro && W.site.playIntro(true); };
  function save(){
    $("#themeName").textContent = W.site.themes[D.theme].name;
    $("#pAmountV").textContent = D.amount === 0 ? "off" : D.amount; $("#pSpeedV").textContent = (+D.speed).toFixed(1) + "×";
    const q = JSON.stringify;
    $("#pCode").textContent = `design: {\n  style: ${q(W.site.key)},\n  theme: ${q(D.theme)},\n  fonts: {\n    script:  ${q(D.fonts.script)},\n    heading: ${q(D.fonts.heading)},\n    body:    ${q(D.fonts.body)},\n  },\n  intro: ${q(D.intro)},\n  reveal: ${q(D.reveal)},\n  ambient: ${q(D.ambient)},\n  amount: ${D.amount},\n  speed: ${D.speed},\n  nameColor: ${q(D.nameColor || "")},\n  ampColor:  ${q(D.ampColor || "")},\n  music: ${D.music ? JSON.stringify(D.music) : "null"},\n  designPanel: true,\n},`;
  }
  $("#pCopy").onclick = () => {
    const t = $("#pCode").textContent, ok = () => $("#pCopied").textContent = "Copied!";
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(ok).catch(() => { const r = document.createRange(); r.selectNodeContents($("#pCode")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); $("#pCopied").textContent = "Selected. Press Ctrl+C to copy."; });
    setTimeout(() => $("#pCopied").textContent = "", 2500);
  };
  save();
}
})();
