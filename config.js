/* =====================================================================
   ROVINA & TEJAS — WEDDING WEBSITE SETTINGS
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit.
   Rules to avoid breaking things:
     • Keep text inside "double quotes".
     • Keep the comma at the end of each line.
     • To use a quote inside text, write \"  (e.g. "Mum said \"yes\"").
   After saving on GitHub, wait about 1 minute and refresh the site.
   ===================================================================== */

window.WEDDING = {

  /* ---------- 1. THE COUPLE ---------- */
  names: {
    first:  "Rovina",
    second: "Tejas",
  },
  parents: {
    first:  "Daughter of Mr. & Mrs. ________",   // or "" to hide
    second: "Son of Mr. & Mrs. ________",        // or "" to hide
  },
  inviteLine: "By the grace of God and together with their families, request the honour of your presence at their marriage",

  /* Bible verse shown under the names. Some alternatives:
     "Two are better than one... a threefold cord is not quickly broken." — Ecclesiastes 4:9-12
     "And now abideth faith, hope, charity, these three; but the greatest of these is charity." — 1 Corinthians 13:13
     "Whither thou goest, I will go; and where thou lodgest, I will lodge." — Ruth 1:16            */
  verse: {
    text: "Therefore what God hath joined together, let not man put asunder.",
    ref:  "Mark 10:9",
  },

  /* ---------- 2. THE BIG DAY ---------- */
  date: {
    display: "Saturday, 6 February 2027",       // shown on the page, write it any way you like
    start:   "2027-02-06T10:30:00+05:30",       // countdown + calendar. Format: YYYY-MM-DDTHH:MM:00+05:30
    end:     "2027-02-06T22:00:00+05:30",
  },
  city:    "Bengaluru, Karnataka",
  hashtag: "#RovinaWedsTejas",

  /* ---------- 3. EVENTS ----------
     Add, remove or reorder freely. Copy a whole { ... }, block to add one.
     icon can be: "ring", "church", "glass", "heart", "dove", "leaf", "music", "cake"
     color is the little dress-code dot (any colour code).                        */
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

  /* ---------- 4. OUR STORY ----------
     photo: put a picture in the "photos" folder and write e.g. "photos/met.jpg"
            or leave null to show a pretty placeholder.                          */
  story: [
    { when: "2019", title: "We met",       text: "Write a line or two about how you first met.",           photo: null },
    { when: "2022", title: "First trip",   text: "A favourite memory, a trip or an inside joke.",          photo: null },
    { when: "2026", title: "She said yes", text: "How the question was asked, and who cried first.",      photo: null },
  ],

  /* ---------- 5. GALLERY ----------
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

  /* ---------- 6. VENUES (big cards with a map button) ---------- */
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

  /* ---------- 7. RSVP ---------- */
  rsvp: {
    by: "Kindly reply by 6 January 2027",
    whatsapp: "919900000000",   // number that receives replies: country code + number, digits only
  },

  /* ---------- 8. QUESTIONS ---------- */
  faq: [
    ["What should I wear?", "Each event has its own dress note above. For the church, shoulders covered is appreciated."],
    ["Can I bring a plus-one?", "Your invitation lists everyone we've saved a seat for. Message us if you're unsure."],
    ["Will there be vegetarian food?", "Yes, both vegetarian and non-vegetarian food will be served."],
    ["Can I take photos?", "Please keep phones away during the ceremony. At the reception, snap away and use our hashtag!"],
  ],

  /* ---------- 9. LOOK & FEEL ----------
     Easiest way: turn on designPanel, click "Design" on the site, try things,
     then press "Copy settings" and paste over this whole design: { ... } block. */
  design: {
    theme: "sakura",          // "sakura", "ivory", "lavender", "peacock", "midnight"
    fonts: {
      script:  "Great Vibes",         // the fancy font for your names
      heading: "Cormorant Garamond",  // section titles
      body:    "Mulish",              // normal text
      // Any font from fonts.google.com works: copy its exact name here.
    },
    intro: "envelope",        // "envelope" (tap the wax seal) or "none"
    petals: 35,               // number of falling sakura petals, 0 to turn off
    speed: 1,                 // animation speed: 0.6 = faster, 1 = normal, 1.5 = slower
    music: null,              // e.g. "music/song.mp3" (upload the file first) or null for none
    designPanel: true,        // true while testing, false before you share the site
  },
};
