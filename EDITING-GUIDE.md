# How to edit the wedding website

You only ever edit **one file: `config.js`**. Every name, date, event, photo, font and colour on the site comes from there. Leave `index.html` alone.

---

## 1. Edit text on GitHub (no software needed)

1. Open **github.com/tejasajoy/RovinaWedsTejas**.
2. Click **`config.js`**.
3. Click the **pencil icon** (top right of the file) to edit.
4. Change what you need (see the map below).
5. Click the green **Commit changes…** button, then **Commit changes** again.
6. Wait **about 1 minute**, then refresh the website. If you don't see the change, press **Ctrl + Shift + R** (or **Cmd + Shift + R** on a Mac) to force-refresh.

### The 3 rules that keep the site from breaking

| Rule | Right | Wrong |
|---|---|---|
| Text stays inside double quotes | `first: "Rovina",` | `first: Rovina,` |
| Keep the comma at the end of the line | `city: "Bengaluru",` | `city: "Bengaluru"` |
| A quote inside text needs a backslash | `"He said \"yes\""` | `"He said "yes""` |

If the site ever shows a red box saying **"config.js could not be read"**, one of these rules was broken in the last line you changed. Open the file, check that line, and commit again. GitHub keeps every old version under **History**, so nothing is ever lost.

---

## 2. What's where in `config.js`

| Section | What it controls |
|---|---|
| **1. names / parents / inviteLine / verse** | The top of the page: your names, parents' lines, invitation sentence and Bible verse. A few other verses are listed in the comments above it. |
| **2. date** | `display` is the date as guests read it. `start` and `end` drive the countdown and the "Add to calendar" button. Keep the format `2027-02-06T10:30:00+05:30`. |
| **3. events** | Each `{ … },` block is one event card. To **add** one, copy a whole block (from `{` to `},`) and paste it below. To **remove** one, delete its whole block. Their order on the page is the order here. |
| **4. story** | The three photo cards in "Our Story". |
| **5. gallery** | Photos in the gallery (see section 3 below). |
| **6. venues** | The big church and reception cards with the Google Maps button. |
| **7. rsvp** | `whatsapp` is the number that receives RSVPs: write it as `91` + 10-digit number, with no spaces or +. |
| **8. faq** | Each line is `["Question?", "Answer."],` |
| **9. design** | Theme, fonts, intro animation, petals, speed, music. See section 4. |

**Event icons** you can use: `ring`, `church`, `glass`, `heart`, `dove`, `leaf`, `music`, `cake`.

**Map buttons:** for `mapsQuery`, type exactly what you'd search on Google Maps, e.g. `"St. Mary's Basilica Shivajinagar Bengaluru"`. Write `""` to hide the button.

---

## 3. Adding photos

1. On the repository page, click **Add file → Upload files**.
2. Drag your photos in. Before committing, the path at the top must say `photos/`. The easiest way is to first open the `photos` folder, then click **Add file → Upload files** from inside it.
3. Use short names with no spaces: `1.jpg`, `proposal.jpg`, `goa-trip.jpg`.
4. Commit.
5. In `config.js`, point to them:
   ```js
   gallery: [
     { src: "photos/1.jpg", caption: "Our first photo" },
     { src: "photos/goa-trip.jpg", caption: "Goa, 2023" },
   ],
   ```
   For story cards, use `photo: "photos/proposal.jpg"`.

**Tip:** resize photos to about 1600px wide before uploading (any phone editor or squoosh.app does this for free). Big 8 MB phone photos make the site slow for guests.

Names are **case-sensitive**: `Photo1.JPG` and `photo1.jpg` are different files.

---

## 4. Fonts, colours and animations

### The easy way: the Design panel
While `designPanel: true`, a **Design** button appears at the bottom-left of the site.

1. Click **Design**.
2. Try the colour circles, the three font menus, the petals slider, the speed slider and the opening animation. Changes show instantly.
3. Click **Copy settings**.
4. In `config.js`, select the whole `design: { … },` block and paste over it. Commit.

Your choices only stick once you paste them into `config.js` and commit. Refreshing the page goes back to what's in the file.

### Doing it by hand

```js
design: {
  theme: "sakura",          // sakura, ivory, lavender, peacock, midnight
  fonts: {
    script:  "Great Vibes",         // your names and section titles
    heading: "Cormorant Garamond",  // headings
    body:    "Mulish",              // normal text
  },
  intro: "envelope",        // "envelope" or "none"
  petals: 35,               // 0 = no falling petals, 80 = lots
  speed: 1,                 // 0.6 faster, 1 normal, 1.5 slower
  music: null,
  designPanel: true,
},
```

**Any Google font works.** Go to fonts.google.com, pick a font, and copy its name exactly as shown (e.g. `"Cinzel Decorative"`, `"Playfair Display"`).

Good pairings to try:

| Names (script) | Headings | Text |
|---|---|---|
| Great Vibes | Cormorant Garamond | Mulish |
| Pinyon Script | Cinzel | Lato |
| Parisienne | Playfair Display | Nunito |
| Alex Brush | Marcellus | Josefin Sans |
| Allura | Prata | Raleway |

### Background music (optional)
1. Upload an `.mp3` into a folder called `music` (same steps as photos).
2. Set `music: "music/your-song.mp3",`.
3. A small music button appears at the bottom-right. Browsers don't allow music to play until the guest taps it, so it never starts on its own.

Use a song you have the rights to. Instrumental versions work best.

---

## 5. Before you share the link

- [ ] All names, dates, times and venues checked
- [ ] Parents' lines filled in (or set to `""` to hide)
- [ ] WhatsApp number is yours, and a test RSVP reached you
- [ ] Every `mapsQuery` opens the right place
- [ ] Placeholder events you aren't having are deleted
- [ ] `designPanel: false` so guests don't see the Design button
- [ ] Opened on your phone as well as a laptop

---

## 6. Where the site lives

- **Website:** https://tejasajoy.github.io/RovinaWedsTejas/
- **Files:** https://github.com/tejasajoy/RovinaWedsTejas
- **Backup:** on the repository page, click **Code → Download ZIP** once in a while and keep it in Google Drive.

**Turning on hosting** (only needed once, if the website link doesn't work yet):
**Settings → Pages →** under "Branch" choose **main** and **/ (root)** → **Save**. After 1–2 minutes the link at the top of that page goes live.
