/**
* =============================================================================
* Musician Portfolio - Configuration Contract
* =============================================================================
* 
* DESIGN RATIONALE:
* This file acts as the single source of truth for the entire website.
* To adapt this website for yourself or any other musician friend:
*   1. Duplicate this project.
*   2. Update the values in this file.
*   3. The entire site layout, services, media, and calendar will update automatically
*      without touching any HTML or CSS files.
*/

export const musicianConfig = {
	// ---------------------------------------------------------------------------
	// Visual Theme Preset
	// Blue & Heather options:
	//   - "heather-indigo"    (Muted Scottish heather thistle with twilight violet accent)
	//   - "slate-denim"       (Washed denim, steel blue, and clean cornflower accent)
	//   - "fog-and-fjord"     (Nordic deep fjord navy with glacial seafoam/teal accent)
	//   - "twilight-mauve"    (Dusty mauve-gray heather with soft periwinkle accent)
	//   - "heather-mist-light"(Airy light heather mist with rich royal indigo accent)
	// Other options:
	//   - "ocean-jazz" | "midnight-amber" | "velvet-brass" | "emerald-lounge" | "clean-light"
	// ---------------------------------------------------------------------------
	theme: "ocean-jazz",

	// ---------------------------------------------------------------------------
	// Profile Basics
	// ---------------------------------------------------------------------------
	name: "Zack Harper",
	headshot: "assets/images/pgh_winery.jpg",
	page_title: "Zack Harper Music",
	primaryInstruments: "Guitar",
	tagline: [
		"Freelance Musician &bull; Educator",
		"Musicals, Events, Weddings, & Festivals"
	],

	location: "Pittsburgh, PA / Tri-State Area",
	
	// ---------------------------------------------------------------------------
	// Detailed Biography
	// Each string in this array represents a paragraph in the "About" section.
	// ---------------------------------------------------------------------------

	bio: [
		"Zack Harper is a Pittsburgh-based professional guitarist, transcriber, arranger, and sound engineer specializing in high-demand live performance environments. Equally at home anchoring a complex musical theater pit orchestra, driving high-energy commercial and wedding bands, or stepping in as a last-minute sub on three days' notice, Zack brings impeccable reading, fast-turnaround transcribing, and a song-first mentality to every stage.",
		"Rooted in a deep background as a music educator, Zack brings a nuanced ear to every ensemble. Whether he's transcribing a solo for a student or himself, or arranging a song for a marching band competition, Zack always understands the why behind the score—translating that analytical depth into real-time problem solving."
	],

	// Skills, instruments, or highlights displayed as badges
	highlights: [
		"Acoustic & Electric Guitar",
		"Sight-Reading",
		"Recording Work",
		"Fly Dates",
		"Arranging",
		"Transcribing",
		"Live Mixing"
	],

	// ---------------------------------------------------------------------------
	// Services & Performance Offerings
	// Displayed as cards in the "Services" section
	// ---------------------------------------------------------------------------
	services: [
		{
			id: "corporate",
			title: "Corporate Events & Galas",
			subtitle: "Sophisticated atmosphere & background sets",
			description: "Providing tasteful guitar, or upbeat acoustic arrangements tailored to cocktail receptions, award galas, and brand launches.",
			icon: "🍸",
			active: false
		},
		{
			id: "weddings",
			title: "Weddings & Private Celebrations",
			subtitle: "Ceremony, cocktail hour, and receptions",
			description: "Hired gun with a library of over 700 charts for the wedding and event scene with a surpring penchart for current hits.",
			icon: "💍",
			active: true
		},
		{
			id: "musicals",
			title: "Musicals & Pit Orchestras",
			subtitle: "Precision sight-reading & multi-instrument doubling",
			description: "Experienced pit musician for regional theatres, touring productions, and university productions. Fast rehearsal turnaround and click-track experience.",
			icon: "🎭",
			active: true
		},
		{
			id: "festivals",
			title: "Festivals & Concert Series",
			subtitle: "High-energy ensemble & headline support",
			description: "Available for festival touring, backing artist sets, and one-off concert performances with full stage setup and professional in-ear monitoring.",
			icon: "🎪",
			active: true
		},
		{
			id: "arranging",
			title: "Arranging",
			subtitle: "Specific sounds for your specific group",
			description: "Experience in writing for chamber groups and small/large ensemble in commercial, marching, pop, jazz, and classical settings.",
			icon: "🎼",
			active: true
		},
		{
			id: "transcription",
			title: "Transcription",
			subtitle: "Clean, polished, and correct charts",
			description: "First-hand approval of content and accuracy from artists on their own solos. Full stop.",
			icon: "🎧",
			active: true
		},
		{
			id: "lessons",
			title: "Private Instruction",
			subtitle: "Guitar, Trumpet, and Theory",
			description: "One-on-one lessons for beginners through advanced students. Focus areas include music theory, ear training, repertoire development, and performance confidence.",
			icon: "🎓",
			active: true
		}
	],

	// ---------------------------------------------------------------------------
	// Audio Showcase
	// Local audio clips (.mp3) or direct links to streamable audio
	// ---------------------------------------------------------------------------
	audioTracks: [
		{
			id: "track-1",
			title: "Autumn Leaves (Acoustic Solo)",
			genre: "Jazz / Standard",
			duration: "2:45",
			// Place your audio files in assets/audio/ or use remote URLs
			src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
		},
		{
			id: "track-2",
			title: "Bridal Chorus / Contemporary Arrangement",
			genre: "Wedding / Classical Crossover",
			duration: "3:15",
			src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
		},
		{
			id: "track-3",
			title: "Broadway Pit Overture Excerpt (Reed 1)",
			genre: "Musical Theatre",
			duration: "2:10",
			src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
		}
	],

	// ---------------------------------------------------------------------------
	// Media Showcase (YouTube & Instagram Embeds)
	// Supports:
	//   - type: "youtube"          (pass youtubeId: "...")
	//   - type: "instagram-video"  (pass postId: "..." or url: "https://www.instagram.com/reel/...")
	//   - type: "instagram-photo"  (pass postId: "..." or url: "https://www.instagram.com/p/...")
	// ---------------------------------------------------------------------------
	videos: [
		{
			id: "shes-a-bad-mama",
			type: "instagram",
			postId: "De48dPdJvQQ",
			title: "She's a Bad Mama Jama",
			description: "Quick clip from a recent festival set."
		},
		{
			id: "bangladesh",
			type: "instagram",
			postId: "DaQtXMfJECq",
			title: "Bangladesh transcription",
			description: "Transcription of a popular social media song."
		},
		
	],

	// ---------------------------------------------------------------------------
	// Upcoming Performances & Gigs
	// Expired dates are automatically filtered out by calendar.js!
	// Format dates as YYYY-MM-DD
	// ---------------------------------------------------------------------------
	// performances: [
	// 	{
	// 		date: "2026-12-18",
	// 		time: "8:00 PM",
	// 		title: "Winter Jazz Gala",
	// 		venue: "Grand Ballroom at The Plaza",
	// 		location: "New York, NY",
	// 		ticketUrl: "https://example.com/tickets",
	// 		isPublic: true
	// 	},
	// 	{
	// 		date: "2027-01-15",
	// 		time: "7:30 PM",
	// 		title: "Into the Woods (Pit Orchestra)",
	// 		venue: "Metropolitan Theatre",
	// 		location: "Philadelphia, PA",
	// 		ticketUrl: "https://example.com/theatre-tickets",
	// 		isPublic: true
	// 	},
	// 	{
	// 		date: "2027-02-20",
	// 		time: "6:00 PM",
	// 		title: "Acoustic Sunset Series",
	// 		venue: "Harborside Pavilion",
	// 		location: "Jersey City, NJ",
	// 		ticketUrl: "",
	// 		isPublic: true
	// 	}
	// ],

	// ---------------------------------------------------------------------------
	// Contact & Social Information
	// ---------------------------------------------------------------------------
	contact: {
		email: "booking@examplemusician.com",
		// Form submission endpoint (e.g., https://formspree.io/f/your_form_id or Web3Forms)
		formEndpoint: "https://api.web3forms.com/submit",
		// Optional Web3Forms Access Key or leave empty for demo
		formAccessKey: "YOUR_ACCESS_KEY_HERE"
	},

	socials: [
		{ platform: "Instagram", url: "https://instagram.com", icon: "📸" },
		{ platform: "YouTube", url: "https://youtube.com", icon: "▶️" },
		{ platform: "LinkedIn", url: "https://linkedin.com", icon: "💼" },
		{ platform: "Spotify", url: "https://spotify.com", icon: "🎧" }
	]
};
