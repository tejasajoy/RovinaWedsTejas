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
    first:  "Daughter of Mr. Prakasham Bedre & Mrs Lalitha Bedre",  // or "" to hide
     
    second: "Son of Mr. Anand R & Mrs. Pushpaltha J",        // or "" to hide
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
    display: "| Friday | 5 February 2027 |",       // shown on the page, write it any way you like
    start:   "2027-02-05T14:00:00+05:30",       // countdown + calendar. Format: YYYY-MM-DDTHH:MM:00+05:30
    end:     "2027-02-05T23:00:00+05:30",
  },
  city:    "Hubli, Karnataka",
  hashtag: "#Rovina&Tejas",

  /* ---------- 3. BRIDE & GROOM SECTION ----------
     photo: upload to the "photos" folder and write e.g. "photos/rovina.jpg", or null.
     facts: little tags under the text. Add or remove as many as you like.          */
  couple: {
    bride: {
      name:     "Rovina",
      fullName: "Rovina B",
      role:     "The Bride",
      photo:    "photos/UI/bride.jpg",     // e.g. a bridal veil; shows a placeholder until the file is uploaded
      about:    "Coffee, food and Vision. She never said what she loves most about Tejas.",
      facts:    ["Coffee or chai?", "Favourite place", "Hidden talent"],
    },
    groom: {
      name:     "Tejas",
      fullName: "Tejas A",
      role:     "The Groom",
      photo:    "photos/UI/groom.jpg",     // e.g. a blazer; shows a placeholder until the file is uploaded
      about:    "Born & raised in Bangalore. Aerospace. The moment I knew Rovina was the one, Fairfield !",
      facts:    ["F1, MotoGP", "Best cook at home", "Always early"],
    },
    together: "Two hearts, one faith, one journey",   // line between the two, or "" to hide
    frame:    "arch",   // photo shape: "rounded", "oval", "circle" or "arch"
    layout:   "meet",      // "meet": bride left, groom right, parents shown, then they come together with a cross as you scroll
                           // "cards": the older side-by-side cards with about text and tags
  },
   
  /* ---------- 4. EVENTS ----------
     Add, remove or reorder freely. Copy a whole { ... }, block to add one.
     icon: "ring", "church", "glass", "heart", "dove", "leaf", "music", "cake", "sun", "wave",
           "dance" (Sangeet), "dhol" (drum), "diya" (oil lamp)
     color: the little dress-code dot (any colour code).
     done: true      → event already happened ("Celebrated" badge, not in the RSVP)
     photos: [...]   → little photos on the card that open a slideshow
     mapsQuery       → the venue name becomes a link to Google Maps                                   */
  events: [
    {
      name: "Engagement",
      date: "Friday, 9 October 2026",
      time: "7:00 PM",
      venue: "Hubli",
      mapsQuery: "",                       // what you'd type in Google Maps, or "" to hide the button
      dress: "Pastels",
      color: "#f6b8c8",
      icon: "ring",
      note: "Thank you to everyone who celebrated with us!",
      done: true,                          // already happened: shows a "Celebrated" badge and leaves it out of the RSVP
      photos: [                            // shown in this order; tap a photo to open the slideshow
        "photos/engagement/hands.jpg",
        "photos/engagement/1H5A6995.jpg",
        "photos/engagement/1H5A7258.jpg",
        "photos/engagement/1H5A7378.jpg",
        "photos/engagement/1H5A7755.jpg",
        "photos/engagement/1H5A7780.jpg",
        "photos/engagement/1H5A6456.jpg",
        "photos/engagement/1H5A6590.jpg",
      ],
    },
    {
      name: "Sangeeth",
      date: "Wed, 3 February 2027",
      time: "7:00 PM",
      venue: "Family Home",
      mapsQuery: "",
      dress: "Party Wear",
      color: "#f3cf55",
      icon: "dance",
      note: "Music, dance performances and dinner",
    },
    {
      name: "Holy Matrimony",
      date: "Friday, 5 February 2027",
      time: "1:00 PM",
      venue: "Agape Church",
      mapsQuery: "Agape Church Hubli",
      dress: "Traditional / Formal",
      color: "#ffffff",
      icon: "church",
      note: "Please be seated by 1:30 PM ",
    },
    {
      name: "Reception",
      date: "Friday, 5 February 2027",
      time: "7:00 PM",
      venue: "The Grand Lawns",
      mapsQuery: "The Grand Lawns Hubli",
      dress: "Evening wear",
      color: "#c84a74",
      icon: "glass",
      note: "Dinner, toasts and dancing",
    },
  ],

  /* ---------- 5. OUR STORY ---------- */
  story: [
    { when: "6th June 2026", title: "We met",       text: "Write a line or two about how you first met.",       photo: null },
    { when: "2026", title: "First selfie",   text: "A favourite memory, a trip or an inside joke.",      photo: null },
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
      label: "Holy Matrimony",
      name: "Agape Church",
      address: "Hubli, Karnataka",
      mapsQuery: "Agape Church Hubli",
      tips: ["Service begins at 1:00 PM", "Please be seated by 1:30 PM"],
    },
    {
      label: "The Reception",
      name: "The Grand Lawns",
      address: "Hubli, Karnataka",
      mapsQuery: "The Grand Lawns Hubli",
      tips: ["Reception from 7:00 PM", "Dinner, toasts and dancing"],
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
    style: "sakura",
    theme: "midnight",
    fonts: {
      script:  "Pinyon Script",
      heading: "Playfair Display",
      body:    "Mulish",
    },
    intro: "curtain",
    reveal: "mixed",
    ambient: "petals-fireflies",
    amount: 60,
    speed: 2,
    nameColor: "#1f2b3d",
    ampColor:  "#b8860c",   // colour of the "&" between the names; "" = theme colour
    /* Background music. Tracks play together. Each has its own starting volume (0 to 100).
       Visitors can switch each track on or off and change its volume with the ♫ button.
       Use null for no music. */
    music: [
      { label: "Ocean waves",   src: "music/WAVES.mp3",           volume: 50 },
      { label: "Piano strings", src: "music/PIRATES STRINGS.mp3", volume: 100 },
    ],
    designPanel: true,        // true while testing, false before you share the site
  },
};
