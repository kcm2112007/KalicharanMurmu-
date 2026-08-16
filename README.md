# Kalicharan Murmu — Personal Portfolio

A fully responsive, single-page portfolio built with plain HTML, CSS, and JavaScript. No frameworks, no build step — just upload and go.

## File structure

```
/
├── index.html
├── style.css
├── script.js
└── assets/
    └── profile.jpg   ← add your photo here
```

## 1. Add your profile photo

Drop your photo into the `assets` folder and name it exactly:

```
assets/profile.jpg
```

That's the path already wired into `index.html`. If the file is missing or fails to load, the site automatically falls back to a clean "KM" initials placeholder — so nothing breaks in the meantime. Once you add the real photo, refresh the page and it will appear automatically (no code changes needed).

If you'd rather use a `.png` or `.webp` file, just update the `src` on this line in `index.html`:

```html
<img src="assets/profile.jpg" ... id="profilePhoto">
```

## 2. Connect the contact form (Formspree)

The contact form currently points to a placeholder Formspree endpoint. To make it actually send you emails:

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form and copy your **Form ID** (it looks like `xzbqjwpe`).
3. Open `index.html`, find this line inside the `<form>` tag:

   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

4. Replace `YOUR_FORM_ID` with your real ID, e.g.:

   ```html
   action="https://formspree.io/f/xzbqjwpe"
   ```

5. Save and re-upload. Until this is done, submitting the form will show a friendly message telling visitors the form isn't connected yet — it won't silently fail.

## 3. Deploy to GitHub Pages

1. Push these files to a GitHub repository (root of the repo, or a `/docs` folder — your choice).
2. Go to the repo's **Settings → Pages**.
3. Under "Build and deployment", select the branch and folder where `index.html` lives.
4. Save — GitHub will give you a live URL within a minute or two.

## Notes

- All colors, spacing, and radii are controlled by CSS custom properties at the top of `style.css` (`:root`), so the whole site can be reskinned by editing one block.
- The site respects `prefers-reduced-motion`: all animations (typing, count-up, scroll-reveal, smooth scroll) are disabled or completed instantly for visitors who have that setting on.
- No phone number, fake stats, fake testimonials, or fake work history are included anywhere on the site.
