# Portfolio photography gallery upgrade

## What changed
- Kept the existing homepage structure and design system.
- Added a short Photography description without Instagram references.
- Added `gallery/photo.html`, `gallery/photo-gallery.css`, and `gallery/photo-gallery.js`.
- Added category filters, search, masonry-style layout, lazy loading, and a keyboard-accessible lightbox.
- Demo images are temporary remote Unsplash images. They are not Danang's photographs.

## How to add real photographs later
1. Put optimized images under `img/photography/`, grouped into folders such as:
   - `img/photography/city/`
   - `img/photography/wildlife-zoo/`
   - `img/photography/everyday/`
2. In `gallery/photo-gallery.js`, replace each demo `image` URL with a relative path, for example:
   `../img/photography/city/bundaran-hi.webp`
3. Update `title`, `category`, `categoryLabel`, `location`, `description`, and `alt`.
4. To add more photographs, duplicate one object in `photographyItems` and give it a unique `id`.

## Deployment
Keep the folder structure intact when uploading to the existing Vercel project. The gallery link from the homepage already points to `gallery/photo.html`.
