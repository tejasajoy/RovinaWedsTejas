/* =====================================================================
   ROVINA & TEJAS — WEDDING WEBSITE SETTINGS
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit. Both designs (Sakura and
   Ocean) read from this file, so you type everything once.

   Rules to avoid breaking things:
     • Keep text inside "double quotes".
     • Keep the comma at the end of each line.
     • To use a quote inside text, write \"  (e.g. "Mum said \"yes\"").
   After saving on GitHub, wait about 1 minute and refresh the site.
   ===================================================================== */

window.WEDDING = {

 /* ---------- 1. THE COUPLE (top of the page) ---------- */
  names: {
    first:  "Rovina B",
    second: "Tejas A",
  },
  parents: {
    first:  "Daughter of Mr. Prakasham Bedre & Mrs Lalitha Bedre",   // or "" to hide
    second: "Son of Mr. Anand R & & Mrs. Pushpaltha J",        // or "" to hide
  },
  inviteLine: "By the grace of Our Lord Christ and together with their families, request the honour of your presence at their marriage",

  /* Bible verse under the names. Some alternatives:
     "Two are better than one... a threefold cord is not quickly broken." — Ecclesiastes 4:9-12
     "And now abideth faith, hope, charity, these three; but the greatest of these is charity." — 1 Corinthians 13:13
     "Whither thou goest, I will go; and where thou lodgest, I will lodge." — Ruth 1:16
     "Many waters cannot quench love, neither can the floods drown it." — Song of Solomon 8:7  (lovely with the Ocean design) */
  verse: {
    text: "Therefore what God has joined together, let no man separate.",
    ref:  "Mark 10:9",
  },

  /* ---------- 2. THE BIG DAY ---------- */
  date: {
    display: "|Friday | 5 February 2027 |",       // shown on the page, write it any way you like
    start:   "2027-02-05T14:00:00+05:30",       // countdown + calendar. Format: YYYY-MM-DDTHH:MM:00+05:30
    end:     "2027-02-05T23:00:00+05:30",
  },
  city:    "Hubli, Karnataka",
  hashtag: "#Rovina∞Tejas",

  /* ---------- 3. BRIDE & GROOM SECTION ----------
     photo: upload to the "photos" folder and write e.g. "photos/rovina.jpg", or null.
     facts: little tags under the text. Add or remove as many as you like.          */
  couple: {
    bride: {
      name:     "Rovina",
      fullName: "Rovina B",
      role:     "The Bride",
      photo:    null,
      about:    "A few lines about the bride: where she grew up, what she does, what makes her laugh and what she loves most about Tejas.",
      facts:    ["Coffee or chai?", "Favourite place", "Hidden talent"],
    },
    groom: {
      name:     "Tejas",
      fullName: "Tejas A",
      role:     "The Groom",
      photo:    null,
      about:    "A few lines about the groom: Born & raised in Bangalore, works for Aerospace, his hobbies and the moment he knew Rovina was the one.",
      facts:    ["F1, MotoGP", "Best cook at home", "Always early"],
    },
    together: "Two hearts, one faith, one journey",   // line between the two, or "" to hide
  },
   
  /* ---------- 4. EVENTS ----------
     Add, remove or reorder freely. Copy a whole { ... }, block to add one.
     icon: "ring", "church", "glass", "heart", "dove", "leaf", "music", "cake", "sun", "wave",
           "dance" (Sangeet), "dhol" (drum), "diya" (oil lamp)
     color: the little dress-code dot (any colour code).                                   */
  events: [
    {
      name: "Engagement",
      date: "Sun, 10 January 2027",
      time: "5:00 PM",
      venue: "Venue name",
      mapsQuery: "",                       // what you'd type in Google Maps, or "" to hide the button
      dress: "Pastels",
      color: "#f6b8c8",
      icon: "ring",
      note: "Ring ceremony followed by dinner",
    },
    {
      name: "Roce / Haldi",
      date: "Thu, 4 February 2027",
      time: "4:00 PM",
      venue: "Family home",
      mapsQuery: "",
      dress: "White & yellow",
      color: "#f3cf55",
      icon: "leaf",
      note: "Delete this event if you are not having it",
    },
    {
      name: "Sangeet",
      date: "Wed, 3 February 2027",
      time: "7:00 PM",
      venue: "Venue name",
      mapsQuery: "",
      dress: "Glam & sparkle",
      color: "#b48cf2",
      icon: "dance",
      note: "Music, dance performances and dinner",
    },
    {
      name: "Holy Matrimony",
      date: "Sat, 6 February 2027",
      time: "10:30 AM",
      venue: "St. Mary's Basilica",
      mapsQuery: "St. Mary's Basilica Shivajinagar Bengaluru",
      dress: "Traditional / formal",
      color: "#ffffff",
      icon: "church",
      note: "Nuptial Mass. Please be seated by 10:15 AM",
    },
    {
      name: "Reception",
      date: "Sat, 6 February 2027",
      time: "7:00 PM",
      venue: "Reception venue",
      mapsQuery: "",
      dress: "Evening wear",
      color: "#c84a74",
      icon: "glass",
      note: "Dinner, toasts and dancing",
    },
  ],

  /* ---------- 5. OUR STORY ---------- */
  story: [
    { when: "2019", title: "We met",       text: "Write a line or two about how you first met.",       photo: null },
    { when: "2022", title: "First trip",   text: "A favourite memory, a trip or an inside joke.",      photo: null },
    { when: "2026", title: "She said yes", text: "How the question was asked, and who cried first.",  photo: null },
  ],

  /* ---------- 6. GALLERY ----------
     Upload photos to the "photos" folder, then list them here.
     Example: { src: "photos/1.jpg", caption: "Goa, 2023" },                    */
  gallery: [
    { src: null, caption: "Our first photo" },
    { src: null, caption: "Sunday mornings" },
    { src: null, caption: "Family" },
    { src: null, caption: "The proposal" },
    { src: null, caption: "Adventures" },
    { src: null, caption: "Us" },
  ],

  /* ---------- 7. VENUES ---------- */
  venues: [
    {
      label: "The Ceremony",
      name: "St. Mary's Basilica",
      address: "Shivajinagar, Bengaluru, Karnataka 560001",
      mapsQuery: "St. Mary's Basilica Shivajinagar Bengaluru",
      tips: ["Parking is limited, carpooling helps", "Mass begins on time, please arrive early"],
    },
    {
      label: "The Reception",
      name: "Reception venue",
      address: "Address goes here",
      mapsQuery: "",
      tips: ["Valet parking available", "Dinner is served from 8:00 PM"],
    },
  ],

  /* ---------- 8. RSVP ---------- */
  rsvp: {
    by: "Kindly reply by 6 January 2027",
    whatsapp: "919900000000",   // number that receives replies: country code + number, digits only
  },

  /* ---------- 9. QUESTIONS ---------- */
  faq: [
    ["What should I wear?", "Each event has its own dress note above. For the church, shoulders covered is appreciated."],
    ["Can I bring a plus-one?", "Your invitation lists everyone we've saved a seat for. Message us if you're unsure."],
    ["Will there be vegetarian food?", "Yes, both vegetarian and non-vegetarian food will be served."],
    ["Can I take photos?", "Please keep phones away during the ceremony. At the reception, snap away and use our hashtag!"],
  ],

  /* ---------- 10. VIDEOS ----------
     Each design has 3 video spots:
       hero      – full screen behind your names at the top
       interlude – a full-width band in the middle of the page with a verse on it
       closing   – the last screen, behind the hashtag
     A spot can be:
       "videos/web/clip.mp4"                                  one video for every screen
       { wide: "videos/web/a.mp4", tall: "videos/web/b.mp4" }  wide for laptops, tall for phones
       ""                                                     no video in that spot
     Ready-made web versions of your uploads are in videos/web.
     To use a new video, upload it to the videos folder and write its path here
     (Claude can shrink big files for you; a picture with the same name ending .jpg
     is shown while the video loads).                                                  */
  media: {
    ocean: {
      hero:      { wide: "videos/web/sunset-wide.mp4", tall: "videos/web/sunset-tall.mp4" },
      interlude: "videos/web/shore-top.mp4",
      closing:   "videos/web/sakura.mp4",
    },
    sakura: {
      hero:      "videos/web/sakura.mp4",
      interlude: "videos/web/shore-top.mp4",
      closing:   { wide: "videos/web/sunset-wide.mp4", tall: "videos/web/sunset-tall.mp4" },
    },
  },
  interlude: {
    text: "Many waters cannot quench love, neither can the floods drown it.",
    ref:  "Song of Solomon 8:7",
  },
  closing: {
    line: "We can't wait to celebrate with you",
  },

  /* ---------- 11. SECTIONS: order, hide, rename ----------
     order: the order sections appear on the page (and in the menu).
     hide:  put a section name here to hide it, e.g. hide: ["story", "faq"],
     titles: change the small line (eyebrow), the big title, and the menu word.
     "interlude" is the video band; move it anywhere in the order, or hide it.  */
  sections: {
    order: ["couple", "events", "story", "interlude", "gallery", "venues", "rsvp", "faq"],
    hide:  [],
    titles: {
      couple:  { eyebrow: "Meet",         title: "The Bride & Groom",  nav: "Couple" },
      events:  { eyebrow: "Join us for",  title: "The Celebrations",   nav: "Events" },
      story:   { eyebrow: "How it began", title: "Our Story",          nav: "Our Story" },
      gallery: { eyebrow: "Moments",      title: "Gallery",            nav: "Gallery" },
      venues:  { eyebrow: "Where",        title: "Venues",             nav: "Venues" },
      rsvp:    { eyebrow: "Kindly reply", title: "Will you join us?",  nav: "RSVP" },
      faq:     { eyebrow: "Good to know", title: "Questions",          nav: "FAQ" },
    },
  },

  /* ---------- 12. LOOK & FEEL ----------
     Easiest way: keep designPanel: true, click "Design" on the site, try things,
     then press "Copy settings" and paste over this whole design: { ... } block.

     style:   "ocean" or "sakura"
     theme:   ocean  → "golden", "dawn", "tropical", "dusk", "pearl"
              sakura → "sakura", "ivory", "lavender", "peacock", "midnight"
     intro:   ocean  → "dawn" (fades up from dark), "iris" (opens from a circle), "none"
              sakura → "envelope", "curtain", "iris", "none"
     reveal:  "mixed", "up", "blur", "zoom", "slide", "flip", "none"
     ambient: ocean  → "glow" (golden light specks), "petals" (sakura petals), "both", "none"
              sakura → "petals", "petals-fireflies", "fireflies", "none"
     amount:  how much background effect, 0 to 100
     speed:   0.6 = faster, 1 = normal, 1.5 = slower                         */
  design: {
    style: "ocean",
    theme: "golden",
    fonts: {
      script:  "Great Vibes",         // calligraphy for your names (40+ choices in the Design panel)
      heading: "Cormorant Garamond",  // section titles
      body:    "Mulish",              // normal text
    },
    intro: "dawn",
    reveal: "mixed",
    ambient: "glow",
    amount: 40,
    speed: 1,
    music: null,              // e.g. "music/song.mp3" (upload the file first) or null
    designPanel: true,        // true while testing, false before you share the site
  },
};
