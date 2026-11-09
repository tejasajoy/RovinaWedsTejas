# How to edit the wedding website

There are **two designs**, and both read the same settings file:

| Design | File | Look |
|---|---|---|
| **Ocean sunrise** | `ocean.html` | Golden-hour sun rising over the sea, palms, seagulls, sparkles on the water |
| **Sakura blossom** | `sakura.html` | Cherry blossoms, swaying leaves and jasmine, gold paisley dividers |

You only ever edit **one file: `config.js`**. Names, dates, events, photos, the bride & groom section, fonts, colours and animations all come from there. Type something once and it shows in both designs.

The main link (`…/RovinaWedsTejas/`) opens whichever design you pick with `style:` in `config.js`.

---

## 1. Edit on GitHub (no software needed)

1. Open **github.com/tejasajoy/RovinaWedsTejas**.
2. Click **`config.js`**, then the **pencil icon** (top right of the file).
3. Make your change.
4. Click **Commit changes…**, then **Commit changes** again.
5. Wait about **1 minute** and refresh the site. If nothing changed, press **Ctrl + Shift + R** (or **Cmd + Shift + R** on a Mac).

### The 3 rules that keep the site working

| Rule | Right | Wrong |
|---|---|---|
| Text stays inside double quotes | `first: "Rovina",` | `first: Rovina,` |
| Keep the comma at the end of the line | `city: "Bengaluru",` | `city: "Bengaluru"` |
| A quote inside text needs a backslash | `"He said \"yes\""` | `"He said "yes""` |

If the site shows a red box saying **"config.js could not be read"**, one of these rules was broken in the last line you changed. GitHub keeps every old version: open `config.js` → **History** to see or copy an earlier one.

---

## 2. What's where in `config.js`

| # | Section | What it controls |
|---|---|---|
| 1 | `names`, `parents`, `inviteLine`, `verse` | The top of the page. Other Bible verses are listed in the comments, including one about "many waters" that suits the Ocean design. |
| 2 | `date`, `city`, `hashtag` | `display` is what guests read. `start`/`end` drive the countdown and "Add to calendar". Keep the format `2027-02-06T10:30:00+05:30`. |
| 3 | `couple` | **The Bride & Groom section.** For each of you: full name, role line, photo, a few lines of "about", and little fact tags. `together` is the line between you (or `""` to hide it). |
| 4 | `events` | Each `{ … },` block is one event card. Copy a block to add one; delete a block to remove it. |
| 5 | `story` | The polaroid cards in "Our Story". |
| 6 | `gallery` | The photo grid. |
| 7 | `venues` | The church and reception cards with map buttons. |
| 8 | `rsvp` | `whatsapp` is the number that receives replies: write `91` + 10 digits, with no spaces or +. |
| 9 | `faq` | Each line is `["Question?", "Answer."],` |
| 10 | `sections` | **Order, hide or rename sections** (see below). |
| 11 | `design` | Design, colours, fonts, animations (see section 4). |

**Event icons:** `ring`, `church`, `glass`, `heart`, `dove`, `leaf`, `music`, `cake`, `sun`, `wave`.

### Reordering, hiding and renaming sections

```js
sections: {
  order: ["couple", "events", "story", "gallery", "venues", "rsvp", "faq"],
  hide:  ["faq"],               // hides the Questions section
  titles: {
    couple: { eyebrow: "Meet", title: "The Bride & Groom", nav: "Couple" },
    ...
  },
},
```

- **Move a section:** move its name in `order`. The menu at the top follows the same order.
- **Hide a section:** add its name to `hide`.
- **Rename:** `eyebrow` is the small gold line, `title` is the big calligraphy title, `nav` is the word in the top menu.

---

## 3. Adding photos

1. In the repository, open the **`photos`** folder.
2. Click **Add file → Upload files**, drag your photos in, then **Commit changes**.
3. Use short names with no spaces, e.g. `rovina.jpg`, `tejas.jpg`, `goa-trip.jpg`. Names are case-sensitive: `Photo.JPG` and `photo.jpg` are different files.
4. Point to them in `config.js`:
   - Bride & groom: `photo: "photos/rovina.jpg",`
   - Story cards: `photo: "photos/proposal.jpg"`
   - Gallery: `{ src: "photos/goa-trip.jpg", caption: "Goa, 2023" },`

**Tip:** shrink photos to about 1600px wide first (free on squoosh.app). Large phone photos make the site slow for guests. Portrait (tall) photos look best in the bride & groom arches.

---

## 4. Design, fonts, colours and animations

### The easy way: the Design panel
While `designPanel: true`, a **Design** button sits at the bottom-left of the site. Open it and you can:

- **Switch design:** Sakura blossom or Ocean sunrise
- **Pick colours:** 5 themes per design
- **Pick calligraphy for your names:** 40+ fonts, each shown with your names. Type in the filter box to search, or type any Google Font name.
- **Change other fonts:** headings and normal text
- **Choose the opening animation**
- **Choose how sections appear as you scroll**
- **Choose a background effect** and how much of it
- **Change animation speed**
- **Replay opening** to see your choice again

When you like it, press **Copy settings**, then in `config.js` select the whole `design: { … },` block and paste over it. Commit.

Changes in the panel are only a preview. They stay only once you paste them into `config.js` and commit.

### All the options

| Setting | Ocean | Sakura |
|---|---|---|
| `theme` | `golden`, `dawn`, `tropical`, `dusk`, `pearl` | `sakura`, `ivory`, `lavender`, `peacock`, `midnight` |
| `intro` (opening) | `sunrise` (sun rises from the sea), `tide` (a wave washes away), `none` | `envelope` (wax seal), `curtain` (silk curtains part), `none` |
| `ambient` (background) | `both`, `sparkles`, `birds`, `none` | `petals`, `petals-fireflies`, `fireflies`, `none` |
| `reveal` (scroll) | `mixed`, `up`, `blur`, `zoom`, `slide`, `flip`, `none` | same |
| `amount` | 0 (off) to 100 (lots) | same |
| `speed` | 0.6 faster · 1 normal · 1.5 slower | same |

**Fonts:** any font on fonts.google.com works. Copy its name exactly, e.g. `script: "Pinyon Script",`.

Pairings to try:

| Names | Headings | Text | Feel |
|---|---|---|---|
| Great Vibes | Cormorant Garamond | Mulish | Classic |
| Pinyon Script | Cinzel | Lato | Formal, church-like |
| Island Moments | Playfair Display | Nunito | Beachy (Ocean) |
| The Nautigal | Marcellus | Jost | Breezy (Ocean) |
| Mrs Saint Delafield | Prata | Raleway | Elegant |
| Corinthia | Gilda Display | Karla | Romantic |
| Allura | Rozha One | Poppins | Indian festive |

### Background music (optional)
Upload an `.mp3` into a folder called `music`, then set `music: "music/your-song.mp3",`. A music button appears at the bottom-right. Browsers only play music after the guest taps that button.

---

## 5. Before you share the link

- [ ] Names, dates, times and venues checked
- [ ] Parents' lines filled in (or `""` to hide)
- [ ] Bride & groom text and photos added
- [ ] WhatsApp number is yours, and a test RSVP reached you
- [ ] Every `mapsQuery` opens the right place
- [ ] Placeholder events you aren't having are deleted
- [ ] `style` set to the design you want guests to see
- [ ] `designPanel: false`, so guests don't see the Design button
- [ ] Checked on a phone as well as a laptop

---

## 6. Links

- **Website:** https://tejasajoy.github.io/RovinaWedsTejas/ (opens your chosen design)
- **Ocean directly:** …/RovinaWedsTejas/ocean.html
- **Sakura directly:** …/RovinaWedsTejas/sakura.html
- **Backup:** **Code → Download ZIP** now and then, and keep it in Google Drive.

**If the website link doesn't work yet:** go to **Settings → Pages**, under "Branch" choose **main** and **/ (root)**, then **Save**. Wait 1–2 minutes.

### Files you can ignore
`index.html` (just opens your chosen design), `ocean.html`, `sakura.html` and `shared.js` hold the designs and animations. You don't need to touch them.
