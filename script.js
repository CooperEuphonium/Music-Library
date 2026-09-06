# Cooper Matthews Music — Arrangement Library

This site is built so you can add music without touching the page layout.

## 1. Add a PDF

Put the PDF inside the `pdfs/` folder.

Example:

`pdfs/my-new-arrangement.pdf`

## 2. Add it to arrangements.json

Open `arrangements.json` and copy one of the existing entries.

Example:

```json
{
  "title": "My New Arrangement",
  "subtitle": "Short description here",
  "category": "Movies & TV",
  "difficulty": "Intermediate",
  "instrument": "Euphonium Solo",
  "composer": "Composer Name",
  "tags": ["Euphonium", "Movie"],
  "pdf": "pdfs/my-new-arrangement.pdf",
  "free": true
}
```

Save the file. The website automatically adds the new card and updates the search/filter menus.

## 3. Change your TikTok and Instagram links

Open `index.html`.

Find:

`https://www.tiktok.com/`

and

`https://www.instagram.com/`

Replace those with your real profile links.

## 4. Change the site name

Search `index.html` for `Cooper Matthews Music` and replace it with whatever brand name you want.

## 5. Preview locally

Because the site loads `arrangements.json`, it works best through a small local web server instead of double-clicking index.html.

If Python is installed, open a terminal in this folder and run:

`python -m http.server 8000`

Then visit:

`http://localhost:8000`

## 6. Put it online free

### GitHub Pages
1. Create a GitHub repository.
2. Upload everything in this folder.
3. Open repository Settings → Pages.
4. Deploy from the main branch.
5. GitHub gives you a public URL.

### Cloudflare Pages
1. Create a Cloudflare Pages project.
2. Connect your GitHub repository.
3. Use no build command.
4. Set the output directory to `/`.
5. Deploy.

## Copyright reminder

Only directly host PDFs you have the right to distribute. For copyrighted arrangements you do not have distribution permission for, replace the PDF link with a legal publisher/product link instead.


## Your current PDF filenames

For the two existing arrangements, upload the PDFs to the `pdfs` folder with these exact names:

- `Last Son Euphonium.pdf`
- `TASM2.pdf`

The website is already configured to look for those exact filenames.
