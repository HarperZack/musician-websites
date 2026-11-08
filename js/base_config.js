/**
 * =============================================================================
 * base_config.js — Starter Template / Handoff Reference
 * =============================================================================
 *
 * PURPOSE:
 *   This file is the clean-slate starting point for a new musician's website.
 *   Every field is filled with clearly labeled dummy data so the structure and
 *   contract of each property is immediately obvious.
 *
 * HOW TO USE:
 *   1. Duplicate this entire project folder.
 *   2. Rename this file to config.js (replacing the existing one).
 *   3. Replace every value below with the musician's real information.
 *   4. Add their headshot to assets/images/ and update the `headshot` path.
 *   5. Add audio files to assets/audio/ and update the `audioTracks` srcs.
 *
 * NEVER import this file in index.html or app.js — only config.js is imported.
 * This file exists solely as a committed reference template.
 * =============================================================================
 */

export const musicianConfig = {
	// ---------------------------------------------------------------------------
	// Visual Theme Preset
	// Choose one of the built-in themes from css/variables.css:
	//
	// Dark / Cool:
	//   "slate-denim"        – Washed denim, steel blue, cornflower accent (default)
	//   "heather-indigo"     – Muted heather thistle with twilight violet accent
	//   "fog-and-fjord"      – Nordic deep fjord navy with glacial teal accent
	//   "twilight-mauve"     – Dusty mauve-gray with soft periwinkle accent
	//   "ocean-jazz"         – Deep ocean navy with electric teal accent
	//   "midnight-amber"     – Near-black with warm amber/gold accent
	//   "velvet-brass"       – Rich dark warm-brown with antique brass accent
	//   "emerald-lounge"     – Deep charcoal with vivid emerald-green accent
	//
	// Light:
	//   "heather-mist-light" – Airy light heather with royal indigo accent
	//   "clean-light"        – Crisp white with a bold primary-color accent
	// ---------------------------------------------------------------------------
	theme: "slate-denim",

	// ---------------------------------------------------------------------------
	// Profile Basics
	// These values populate the browser tab title, nav brand, hero section, and footer.
	// ---------------------------------------------------------------------------
	name: "Alex Rivera",
	primaryInstruments: "Piano & Vocals",

	// Path to a headshot image in assets/images/.
	// Set to "" or remove the property to hide the avatar circle entirely.
	headshot: "assets/images/headshot.jpg",

	// Each string in this array renders as a separate line under the hero name.
	// Use the HTML entity &bull; for a centered bullet-point separator.
	tagline: [
		"Freelance Musician &bull; Vocalist",
		"Corporate Events, Weddings, &amp; Private Functions"
	],

	location: "Chicago, IL / Midwest Region",

	// ---------------------------------------------------------------------------
	// About Section
	// Each string renders as its own paragraph. Write as many as you need.
	// ---------------------------------------------------------------------------
	bio: [
		"Alex Rivera is a Chicago-based professional pianist and vocalist with over a decade of experience across corporate events, intimate wedding ceremonies, and national touring productions. Known for a versatile repertoire spanning jazz standards, contemporary pop, and classical crossover, Alex brings a polished and adaptable presence to every performance.",
		"Equally comfortable headlining a corporate gala or anchoring a pit orchestra, Alex's formal conservatory training is matched by real-world instincts built night after night on stage. Fast-learning, sight-reading proficient, and always song-first."
	],

	// Short skill/specialty tags shown as badges in the About section.
	highlights: [
		"Piano & Keys",
		"Lead Vocals",
		"Sight-Reading",
		"Harmony Arrangements",
		"Studio Recording",
		"Musical Theatre",
		"Corporate & Gala Events"
	],

	// ---------------------------------------------------------------------------
	// Services & Performance Offerings
	// Each service renders as a card in the Services section.
	//
	// Set `active: false` to temporarily hide a service without deleting it.
	// If `active` is omitted entirely, the service is treated as active.
	// ---------------------------------------------------------------------------
	services: [
		{
			id: "corporate",
			title: "Corporate Events & Galas",
			subtitle: "Sophisticated background & feature sets",
			description: "Tasteful piano sets, ambient jazz, or upbeat cocktail arrangements tailored to award galas, brand launches, and company celebrations.",
			icon: "🍸",
			active: true
		},
		{
			id: "weddings",
			title: "Weddings & Private Celebrations",
			subtitle: "Ceremony, cocktail hour, and reception",
			description: "Full ceremony packages including processional, recessional, and cocktail hour music. Customizable song lists — your day, your vision.",
			icon: "💍",
			active: true
		},
		{
			id: "musicals",
			title: "Musicals & Pit Orchestras",
			subtitle: "Precision reading & ensemble leadership",
			description: "Experienced pit keyboardist for regional theatres, university productions, and touring shows. Familiar with standard Broadway books and click-track setups.",
			icon: "🎭",
			active: true
		},
		{
			id: "festivals",
			title: "Festivals & Concert Series",
			subtitle: "High-energy stage presence",
			description: "Available for summer festivals, concert series, and headline support slots. Full in-ear monitoring setup and professional backline requirements on request.",
			icon: "🎪",
			active: true
		},
		{
			id: "recording",
			title: "Session & Studio Work",
			subtitle: "Keys, piano, and vocal overdubs",
			description: "Remote and in-studio session recording. Piano, synth, organ, and lead/background vocal tracks. Quick turnaround and clean, production-ready takes.",
			icon: "🎙️",
			active: true
		},
		{
			id: "lessons",
			title: "Private Instruction",
			subtitle: "Piano & vocal coaching for all levels",
			description: "One-on-one lessons for beginners through advanced students. Focus areas include music theory, ear training, repertoire development, and performance confidence.",
			icon: "🎓",
			active: false
		}
	],

	// ---------------------------------------------------------------------------
	// Audio Showcase
	// Each track renders as a row in the custom audio player.
	//
	// `src` can be:
	//   - A local file path:  "assets/audio/my-recording.mp3"
	//   - A remote direct URL to an .mp3 or .ogg file (must be CORS-accessible)
	//
	// NOTE: Streaming service links (Spotify, Apple Music, SoundCloud page URLs)
	// will NOT work here — only direct audio file URLs.
	// ---------------------------------------------------------------------------
	audioTracks: [
		{
			id: "track-1",
			title: "Fly Me to the Moon (Solo Piano)",
			genre: "Jazz Standard",
			duration: "3:12",
			src: "assets/audio/fly-me-to-the-moon.mp3"
		},
		{
			id: "track-2",
			title: "All of Me — John Legend Cover (Piano/Vocal)",
			genre: "Pop / Contemporary",
			duration: "4:05",
			src: "assets/audio/all-of-me-cover.mp3"
		},
		{
			id: "track-3",
			title: "Cocktail Hour Medley (Excerpt)",
			genre: "Jazz / Standards Medley",
			duration: "2:48",
			src: "assets/audio/cocktail-medley-excerpt.mp3"
		}
	],

	// ---------------------------------------------------------------------------
	// Media Showcase (YouTube & Instagram Embeds)
	//
	// Supported types:
	//   "youtube"           → pass `youtubeId: "VIDEO_ID"` (the part after ?v= or /shorts/)
	//   "instagram-video"   → pass `postId: "POST_ID"` (the alphanumeric segment in the reel URL)
	//   "instagram-photo"   → pass `postId: "POST_ID"` (the alphanumeric segment in the /p/ URL)
	//
	// How to find a YouTube video ID:
	//   Full URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ → ID: dQw4w9WgXcQ
	//   Short URL: https://youtu.be/dQw4w9WgXcQ → ID: dQw4w9WgXcQ
	//
	// How to find an Instagram post ID:
	//   Reel URL: https://www.instagram.com/reel/ABC123XYZ/ → ID: ABC123XYZ
	//   Post URL: https://www.instagram.com/p/ABC123XYZ/   → ID: ABC123XYZ
	//
	// ⚠️  Instagram embeds will NOT load on localhost (Meta security policy).
	//     They WILL work correctly on the live GitHub Pages URL.
	// ---------------------------------------------------------------------------
	videos: [
		{
			id: "vid-1",
			type: "youtube",
			youtubeId: "YOUTUBE_VIDEO_ID_HERE",
			title: "Live Performance Highlight Reel",
			description: "A collection of live performance clips from various venues."
		},
		{
			id: "vid-2",
			type: "instagram-video",
			postId: "INSTAGRAM_REEL_ID_HERE",
			title: "Behind the Scenes Reel",
			description: "Quick clips from a recent wedding performance."
		},
		{
			id: "vid-3",
			type: "instagram-photo",
			postId: "INSTAGRAM_POST_ID_HERE",
			title: "Post-Show Photo",
			description: "After a great night at the Civic Center."
		}
	],

	// ---------------------------------------------------------------------------
	// Upcoming Performances & Gigs
	// Past dates are automatically hidden by calendar.js — no manual cleanup needed.
	//
	// Date format: "YYYY-MM-DD"
	// Set `isPublic: false` for private/corporate gigs with no ticketing link.
	// Leave `ticketUrl: ""` for free or non-ticketed public events.
	// ---------------------------------------------------------------------------
	performances: [
		{
			date: "2027-02-14",
			time: "7:00 PM",
			title: "Valentine's Jazz Night",
			venue: "The Grand Lounge",
			location: "Chicago, IL",
			ticketUrl: "https://example.com/tickets/valentines-jazz",
			isPublic: true
		},
		{
			date: "2027-03-22",
			time: "6:30 PM",
			title: "Spring Gala — Corporate Event",
			venue: "Private Venue",
			location: "Naperville, IL",
			ticketUrl: "",
			isPublic: false
		},
		{
			date: "2027-05-10",
			time: "8:00 PM",
			title: "Into the Woods (Pit Orchestra)",
			venue: "Civic Theatre",
			location: "Evanston, IL",
			ticketUrl: "https://example.com/tickets/into-the-woods",
			isPublic: true
		}
	],

	// ---------------------------------------------------------------------------
	// Contact & Booking
	// The form submits to Web3Forms (free tier, no backend required).
	//
	// To set up:
	//   1. Go to https://web3forms.com
	//   2. Enter your email address and click "Create Access Key"
	//   3. Paste the generated key into `formAccessKey` below
	//
	// If you prefer Formspree: https://formspree.io/f/YOUR_FORM_ID
	//   Set `formEndpoint` to your Formspree action URL and leave `formAccessKey` empty.
	// ---------------------------------------------------------------------------
	contact: {
		email: "booking@alexrivera.music",
		formEndpoint: "https://api.web3forms.com/submit",
		formAccessKey: "YOUR_WEB3FORMS_ACCESS_KEY_HERE"
	},

	// ---------------------------------------------------------------------------
	// Social Media Links
	// Displayed in the site footer.
	// Use emoji icons or swap to SVG icons in templates/social-link.html.
	// Remove any platforms that don't apply — the array can have any length.
	// ---------------------------------------------------------------------------
	socials: [
		{ platform: "Instagram",  url: "https://instagram.com/YOUR_HANDLE",      icon: "📸" },
		{ platform: "YouTube",    url: "https://youtube.com/@YOUR_CHANNEL",      icon: "▶️" },
		{ platform: "Facebook",   url: "https://facebook.com/YOUR_PAGE",         icon: "👤" },
		{ platform: "LinkedIn",   url: "https://linkedin.com/in/YOUR_PROFILE",   icon: "💼" },
		{ platform: "Spotify",    url: "https://open.spotify.com/artist/YOUR_ID", icon: "🎧" }
	]
};
