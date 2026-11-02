# Fresh Bites Bakery Website — Part 3

**Module:** WEDE5020 — Web Development  
**Student number:** ST10502124  
**Project:** Fresh Bites Bakery  
**Repository:** https://github.com/ST10502124/WEDE5020-POE-Part-3-ST10502124  
**Published website:** https://st10502124.github.io/WEDE5020-POE-Part-3-ST10502124/

## Project overview

This project is a responsive website concept for Fresh Bites Bakery. It introduces the bakery, presents product categories and gives visitors separate ways to send a product enquiry or a general message. The website uses HTML5, CSS3 and JavaScript.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Homepage and featured bakery products |
| `about.html` | Bakery story, values and FAQ accordion |
| `products.html` | Product catalogue loaded from JSON with search, category filtering and sorting |
| `enquiry.html` | Product and special-order enquiry form |
| `contact.html` | General contact form |

## Main features

- Responsive navigation and page layouts for desktop and mobile.
- FAQ accordion with accessible expanded-state attributes.
- Product catalogue is loaded dynamically from `js/products.json` using the Fetch API.
- Product search, category filtering and name sorting update the displayed catalogue using JavaScript DOM manipulation.
- Keyboard-accessible image lightbox for product and featured images.
- Product links prefill the enquiry form with the selected product.
- Required fields, email input types and minimum text lengths for form validation.
- Page-specific titles and meta descriptions, canonical URLs, Open Graph and Twitter sharing metadata, semantic headings, labels and image alternative text.
- `robots.txt` and `sitemap.xml` for basic search-engine discovery.
- Reduced-motion CSS support and a skip-to-content link.

## Project structure

```text
WEDE5020-POE-Part-3-ST10502124/
├── index.html
├── about.html
├── products.html
├── enquiry.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── products.json
├── robots.txt
├── sitemap.xml
└── README.md
```

## Running locally

1. Download or clone this repository.
2. Open the project folder in a code editor.
3. Open `index.html` in a browser, or use a local development server.
4. Test the navigation, FAQ, product search/filter and both forms.

## Forms and deployment note

The two forms are marked up for **Netlify Forms** and use JavaScript to submit URL-encoded form data. They need to be deployed to Netlify with form detection enabled before real submissions can be received. **GitHub Pages does not process Netlify Forms**, so the forms will not send messages when hosted only on GitHub Pages. Before using the forms with customers, deploy to Netlify and test the submission inbox, or connect another server-side form service.

The bakery's real telephone number, email address and physical address have not been supplied, so no contact details have been invented. Add confirmed business information before treating the website as a live business site.

## Image and asset note

The homepage and product catalogue currently reference images hosted by Unsplash. These are externally hosted image assets; replace them with original bakery photographs or illustrations where possible, especially if the bakery can provide its own images. Keep meaningful alt text for images.

## Testing checklist

- [ ] Check all five pages and internal navigation.
- [ ] Check layout at desktop, tablet and mobile widths.
- [ ] Test mobile navigation and FAQ accordion.
- [ ] Test product data loading, product search, category filter and name sorting.
- [ ] Open product and featured images with mouse and keyboard; close the lightbox.
- [ ] Open an enquiry from a product card and confirm the product field is prefilled.
- [ ] Test required fields and invalid email addresses.
- [ ] Deploy to the intended hosting service and test the live website.
- [ ] If using forms, deploy to Netlify and confirm real submissions are received.
- [ ] Add confirmed bakery contact details and replace stock imagery with original assets if available.

## SEO and search visibility

Each page has a descriptive title and meta description. The site uses semantic page structure, internal links, descriptive image alt text and clean relative page links. The sitemap lists the five main pages and the robots file points crawlers to that sitemap. Search visibility is not guaranteed by adding these files alone; the live site should also be submitted to Google Search Console and kept updated.

## Changelog

| 2 November 2026 – Product catalogue | Moved catalogue data into `js/products.json` and used the Fetch API to render, search, filter and sort products dynamically. |\n| 2 November 2026 – SEO and form usability | Added canonical and social-sharing metadata to each page and hid the Netlify spam-trap fields from normal visitors. |\n| Update | Changes |
|---|---|
| Part 3 website build | Added the five HTML pages and organised CSS and JavaScript into separate folders. |
| Interactive features | Added mobile navigation, FAQ accordion, JSON product loading, product filtering/search/sorting, keyboard-accessible image lightbox, enquiry prefill and client-side validation with AJAX-style form submission. |
| SEO and documentation | Added page titles/descriptions, canonical URLs, social sharing metadata, robots.txt, sitemap.xml and this README with setup, features, limitations and testing notes. |

## References

- MDN Web Docs, HTML: https://developer.mozilla.org/en-US/docs/Web/HTML
- MDN Web Docs, CSS: https://developer.mozilla.org/en-US/docs/Web/CSS
- MDN Web Docs, JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- Google Search Central, SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Netlify Docs, Forms setup: https://docs.netlify.com/forms/setup/

The stylesheet loads DM Sans and Playfair Display through Google Fonts. Record any additional resources or assets used in future updates.
