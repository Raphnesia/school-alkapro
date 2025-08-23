# TODO - Update /prestasi Page: Single-Column Continuous Carousel

Approved scope:
- Focus only on src/app/prestasi/page.tsx
- Implement a single-column (one card per view) carousel that runs continuously without pause on hover
- Do NOT touch components/PrestasiSwiper.tsx

Steps:
1) Imports
   - Add Swiper imports to src/app/prestasi/page.tsx:
     - import { Swiper, SwiperSlide } from 'swiper/react'
     - import { Autoplay } from 'swiper/modules'
     - import 'swiper/css'

2) Replace Custom Marquee with Swiper
   - Remove the current CSS-based marquee carousel inside the "Prestasi List Section"
   - Implement Swiper with:
     - slidesPerView: 1
     - spaceBetween: 24
     - loop: true
     - autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }
     - speed: 6000 (for smooth continuous motion)
   - Each slide contains exactly one card centered (max-w-xl mx-auto)

3) Preserve Card Content
   - Keep existing three cards (Akademik, Olahraga, Seni) with their badges, titles, descriptions, and years
   - Use the same images as in the current file

4) Fix Broken JSX
   - The third card has malformed/unclosed tags; ensure proper JSX structure
   - Remove inline <style jsx> block related to the old marquee

5) Verification
   - Build/run locally to ensure no TypeScript/JSX errors
   - Verify continuous autoplay works without pausing on hover
   - Ensure responsiveness is maintained

Progress:
- [ ] Step 1
- [ ] Step 2
- [ ] Step 3
- [ ] Step 4
- [ ] Step 5

Notes:
- No new dependency is added; Swiper is already in the project.
- Keep the rest of the /prestasi page unchanged (Hero and Statistics sections remain intact).
