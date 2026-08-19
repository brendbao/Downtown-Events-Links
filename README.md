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
Once GitHub Pages is live, embed with something like:

```html
<iframe src="https://brendbao.github.io/Downtown-Events-Links/" width="100%" height="500" style="border:none;"></iframe>
```
