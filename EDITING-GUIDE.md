# How to edit the wedding website

There are **two designs**, and both read the same settings file:

| Design | File | Look |
|---|---|---|
| **Ocean sunrise** | `ocean.html` | Opens on real golden-hour sea footage, a drone shoreline band mid-page, and ends on cherry blossoms |
| **Sakura blossom** | `sakura.html` | Opens on real cherry-blossom footage, the same shoreline band, and ends on the golden sea |

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
| 10 | `media`, `interlude`, `closing` | **Videos** (see section 3b) plus the verse on the middle video band and the line on the last screen. |
| 11 | `sections` | **Order, hide or rename sections** (see below). |
| 12 | `design` | Design, colours, fonts, animations (see section 4). |

**Event icons:** `ring`, `church`, `glass`, `heart`, `dove`, `leaf`, `music`, `cake`, `sun`, `wave`, `dance` (Sangeet), `dhol` (drum), `diya` (oil lamp). Set one with the `icon:` line inside each event. The drawings themselves live in `shared.js`, so ask Claude if you'd like a new one.

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

- **The video band** is called `interlude`. Move it anywhere in `order`, or put it in `hide`.
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

**Ready-made spots (no config editing needed):**
- `photos/UI/bride.jpg` and `photos/UI/groom.jpg`: the Bride & Groom pictures (e.g. a veil and a blazer). Upload with exactly these names and they appear. Until then, a placeholder shows.
- `photos/engagement/`: engagement pictures. List them under the Engagement event as `photos: ["photos/engagement/1.jpg", ...]` (or ask Claude), and small photos appear on that card that open a slideshow.

**Photo frame shape:** `couple.frame` can be `"rounded"`, `"oval"`, `"circle"` or `"arch"`.

**Past events:** add `done: true` to an event and it gets a "Celebrated" badge and drops out of the RSVP list. Any event can have `photos: [...]`.

**Maps:** if an event or venue has a `mapsQuery`, guests can tap the venue name to open it in Google Maps.

**Tip:** shrink photos to about 1600px wide first (free on squoosh.app). Large phone photos make the site slow for guests. Portrait (tall) photos look best in the bride & groom arches.

---

## 3b. Videos

Each design has **3 video spots**:

| Spot | Where it shows |
|---|---|
| `hero` | Full screen behind your names at the top |
| `interlude` | A full-width band in the middle of the page, with a verse on it |
| `closing` | The last screen, behind your hashtag |

What's set up now:

| | Ocean design | Sakura design |
|---|---|---|
| hero | golden sea (wide on laptops, tall on phones) | cherry blossoms |
| interlude | drone shoreline | drone shoreline |
| closing | cherry blossoms | golden sea |

**Swapping videos:** in `config.js` → `media`, change the path. A spot can be:
- `"videos/web/sakura.mp4"`: one video for every screen
- `{ wide: "videos/web/a.mp4", tall: "videos/web/b.mp4" }`: wide on laptops, tall on phones
- `""`: no video in that spot

**Ready-to-use web versions** of your uploads are in `videos/web`:

| File | From your upload | Size |
|---|---|---|
| `sunset-wide.mp4` | waves with sunset | 3.5 MB |
| `sunset-tall.mp4` | waves tall | 1.3 MB |
| `shore-top.mp4` | waves wide | 3.2 MB |
| `sakura.mp4` | sakura flowers | 1.8 MB |

These are compressed for phones and trimmed so the loop is seamless. Each has a matching `.jpg` that shows while the video loads. Your original uploads stay in `videos` and aren't used by the site.

**Adding a new video:** upload it to the `videos` folder. **Give it its final name before uploading.** Renaming videos on GitHub's website breaks the file. Then either:
- ask Claude to prepare it (compress, loop, make the picture), or
- point to it directly, e.g. `hero: "videos/my-clip.mp4"`. It will work, but large files load slowly on phones.

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
| `intro` (opening) | `dawn` (fades up from darkness with a warm glow), `iris` (opens from a circle), `none` | `envelope` (wax seal), `curtain` (silk curtains part), `iris`, `none` |
| `ambient` (floating effect) | `glow` (golden light specks), `petals` (sakura petals), `both`, `none` | `petals`, `petals-fireflies`, `fireflies`, `none` |
| `reveal` (scroll) | `mixed`, `up`, `blur`, `zoom`, `slide`, `flip`, `none` | same |
| `amount` | 0 (off) to 100 (lots) | same |
| `speed` | 0.6 faster · 1 normal · 1.5 slower | same |

**Name colour:** `nameColor` sets the colour of "Rovina" and "Tejas" (in the hero and the Bride & Groom section), and `ampColor` sets the "&" between them. Use a colour code, e.g. `"#ffffff"` white, `"#d4af37"` gold, `"#f6b8c8"` blush pink, `"#c8603f"` terracotta. Leave as `""` to follow the theme. The Design panel has colour pickers for both.

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
`index.html` (just opens your chosen design), `ocean.html`, `sakura.html` and `shared.js` hold the designs and animations. You don't need to touch them. The original videos in `videos` can stay; the site uses the versions in `videos/web`.
