# Downtown Events Announcement Widget

A lightweight widget that displays the latest announcement image (uploaded via a Google Form)
as a clickable image, for embedding into the Squarespace "Downtown Events" page.

## How it works
1. Anyone fills out the linked Google Form: uploads an image, provides a link URL, and an optional caption.
2. The `AutoShareUploads.gs` Apps Script (installed as a trigger on the Form's response Sheet)
   automatically makes each newly uploaded image viewable by "anyone with the link."
3. `index.html` fetches the latest row from the Sheet (via https://opensheet.elk.sh) and renders
   the image as a clickable link pointing to the submitted URL.

## Setup checklist
- [ ] Google Form created with fields matching `FIELD_IMAGE`, `FIELD_LINK`, `FIELD_CAPTION` in `index.html`
- [ ] Form responses linked to a Google Sheet
- [ ] Sheet sharing set to "Anyone with the link" (Viewer)
- [ ] `AutoShareUploads.gs` installed + trigger configured in Apps Script
- [ ] GitHub Pages enabled on this repo (Settings -> Pages -> deploy from `main` branch)
- [ ] Widget URL embedded into Squarespace via an Embed/Code block (iframe)

## Embedding into Squarespace
Once GitHub Pages is live, embed with a Squarespace **Code Block** (not a plain URL/Embed
block — it needs to run the `<script>` below) containing:

```html
<iframe id="downtown-events-widget"
        src="https://brendbao.github.io/Downtown-Events-Links/?v=2"
        width="100%" height="500" style="border:none;" scrolling="no"></iframe>
<script>
  window.addEventListener("message", function (event) {
    if (!event.data || event.data.type !== "downtown-events-height") return;
    var iframe = document.getElementById("downtown-events-widget");
    if (iframe) iframe.style.height = event.data.height + "px";
  });
</script>
```

The `height="500"` on the iframe is only an initial/fallback value. `index.html` posts
its actual rendered height (via `postMessage`) to the parent page whenever the content
changes — new announcements loading, images finishing loading, or switching calendar
months — and the listener script above resizes the iframe to match, so the calendar
and announcement list are never cut off or padded with dead space. `scrolling="no"`
avoids a second/inner scrollbar since the iframe now grows to fit its content instead
of scrolling internally.

The `?v=2` query string is a cache-buster. Browsers and Squarespace's CDN can cache
iframe contents, so after pushing changes to `index.html` on `main` (and waiting for
the "pages build and deployment" GitHub Action to finish), bump the number in the
Squarespace embed code (e.g. `?v=3`) and re-save the page so it fetches the latest
version instead of a stale cached copy.

**Note:** GitHub Pages only serves what's on the `main` branch. If you don't see your
latest changes reflected on the live Squarespace page, first confirm the change has
been merged into `main` and that the "pages build and deployment" workflow has
completed (Actions tab), before assuming it's a caching issue.
