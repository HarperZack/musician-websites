/**
 * =============================================================================
 * Main Application Bootstrap (app.js)
 * =============================================================================
 * Connects the data model (config.js) to the UI components.
 * 
 * STRICT SEPARATION OF CONCERNS:
 * No HTML markup or element construction is permitted here.
 * All markup is defined in dedicated files inside /templates/*.html.
 * This module solely populates text content, attributes, and attaches event listeners.
 */

import { musicianConfig } from "./config.js";
import { preloadTemplates, getTemplateClone } from "./template-loader.js";
import { AudioPlayer } from "./audio-player.js";
import { PerformanceCalendar } from "./calendar.js";
import { MediaGallery } from "./gallery.js";

document.addEventListener("DOMContentLoaded", async () => {
	applyTheme();
	renderProfileBasics();

	// Preload all standalone HTML template files from /templates/*.html
	await preloadTemplates([
		"service-card",
		"badge",
		"social-link",
		"playlist-item",
		"video-card",
		"performance-card",
		"instagram-video",
		"instagram-photo"
	]);

	renderAboutSection();
	renderServices();
	renderSocials();
	setupContactForm();
	setupMobileNavigation();

	// Initialize interactive components
	new AudioPlayer(musicianConfig.audioTracks);
	new MediaGallery(musicianConfig.videos, "media-video-grid");
	new PerformanceCalendar(musicianConfig.performances, "performances-list");
});

/**
 * Injects musician name, tagline, location, and page title from config
 */
function applyTheme() {
	const chosenTheme = musicianConfig.theme || "heather-indigo";
	document.documentElement.setAttribute("data-theme", chosenTheme);
}

function renderProfileBasics() {
	document.title = `${musicianConfig.page_title}` || `${musicianConfig.name} Music`;

	const navName = document.getElementById("nav-musician-name");
	const heroName = document.getElementById("hero-name");
	const heroTaglineContainer = document.getElementById("hero-tagline-container");
	const heroLocation = document.getElementById("hero-location");
	const heroAvatarImg = document.getElementById("hero-avatar-img");
	const footerYear = document.getElementById("current-year");
	const footerCopyright = document.getElementById("footer-copyright");

	if (navName) navName.textContent = musicianConfig.name;
	if (heroName) heroName.textContent = musicianConfig.name;

	if (heroAvatarImg && musicianConfig.headshot) {
		heroAvatarImg.src = musicianConfig.headshot;
		heroAvatarImg.alt = `${musicianConfig.name} Headshot`;
		heroAvatarImg.style.display = "block";
	}

	if (heroTaglineContainer) {
		heroTaglineContainer.textContent = "";
		const taglineLines = Array.isArray(musicianConfig.tagline)
			? musicianConfig.tagline
			: [musicianConfig.tagline];

		taglineLines.forEach((lineText) => {
			const p = document.createElement("p");
			p.className = "hero-tagline";
			p.textContent = lineText.replace(/&bull;/g, "•");
			heroTaglineContainer.appendChild(p);
		});
	}

	if (heroLocation) heroLocation.textContent = musicianConfig.location;
	if (footerYear) footerYear.textContent = String(new Date().getFullYear());
	if (footerCopyright) {
		footerCopyright.textContent = `© ${new Date().getFullYear()} ${musicianConfig.name}. All rights reserved.`;
	}
}

/**
 * Injects bio paragraphs and skill badge tags using templates/badge.html
 */
function renderAboutSection() {
	const bioContainer = document.getElementById("about-bio-container");
	if (bioContainer && Array.isArray(musicianConfig.bio)) {
		bioContainer.textContent = "";
		musicianConfig.bio.forEach((paragraphText) => {
			const p = document.createElement("p");
			p.textContent = paragraphText;
			bioContainer.appendChild(p);
		});
	}

	const highlightsList = document.getElementById("about-highlights-list");
	if (highlightsList && Array.isArray(musicianConfig.highlights)) {
		highlightsList.textContent = "";
		musicianConfig.highlights.forEach((item) => {
			const clone = getTemplateClone("badge");
			if (!clone) return;
			const badge = clone.querySelector("[data-field='label']");
			if (badge) badge.textContent = item;
			highlightsList.appendChild(clone);
		});
	}
}

/**
 * Injects services using templates/service-card.html
 */
function renderServices() {
	const grid = document.getElementById("services-grid");
	if (!grid || !Array.isArray(musicianConfig.services)) return;

	grid.textContent = "";

	const activeServices = musicianConfig.services.filter(
		(service) => service.active !== false
	);

	grid.setAttribute("data-count", String(activeServices.length));

	activeServices.forEach((service) => {
		const clone = getTemplateClone("service-card");
		if (!clone) return;
		
		const iconEl = clone.querySelector("[data-field='icon']");
		const titleEl = clone.querySelector("[data-field='title']");
		const subtitleEl = clone.querySelector("[data-field='subtitle']");
		const descEl = clone.querySelector("[data-field='description']");

		if (iconEl) iconEl.textContent = service.icon || "🎵";
		if (titleEl) titleEl.textContent = service.title;
		if (subtitleEl) subtitleEl.textContent = service.subtitle || "";
		if (descEl) descEl.textContent = service.description;

		grid.appendChild(clone);
	});
}

/**
 * Injects social links using templates/social-link.html
 */
function renderSocials() {
	const container = document.getElementById("social-links");
	if (!container || !Array.isArray(musicianConfig.socials)) return;

	container.textContent = "";

	musicianConfig.socials.forEach((item) => {
		const clone = getTemplateClone("social-link");
		if (!clone) return;

		const anchor = clone.querySelector("[data-field='anchor']");
		const icon = clone.querySelector("[data-field='icon']");
		const platform = clone.querySelector("[data-field='platform']");

		if (anchor) {
			anchor.href = item.url;
			anchor.setAttribute("aria-label", item.platform);
		}
		if (icon) icon.textContent = item.icon || "🔗";
		if (platform) platform.textContent = item.platform;

		container.appendChild(clone);
	});
}

/**
 * Form submission event listener and feedback text toggling
 */
function setupContactForm() {
	const form = document.getElementById("booking-form");
	const status = document.getElementById("form-status");
	if (!form || !status) return;

	form.addEventListener("submit", async (e) => {
		if (musicianConfig.contact?.formEndpoint) {
			e.preventDefault();
			status.textContent = "Sending inquiry...";
			status.className = "form-status sending";

			const formData = new FormData(form);
			if (musicianConfig.contact.formAccessKey) {
				formData.append("access_key", musicianConfig.contact.formAccessKey);
			}

			try {
				const response = await fetch(musicianConfig.contact.formEndpoint, {
					method: "POST",
					body: formData,
					headers: { Accept: "application/json" }
				});

				if (response.ok) {
					status.textContent = "Thank you! Your message has been received. I will get back to you shortly.";
					status.className = "form-status success";
					form.reset();
				} else {
					status.textContent = "There was an issue sending your message. Please try emailing directly.";
					status.className = "form-status error";
				}
			} catch (err) {
				status.textContent = "Network error. Please reach out via email directly.";
				status.className = "form-status error";
			}
		}
	});
}

/**
 * Mobile Navigation Drawer Toggle
 */
function setupMobileNavigation() {
	const toggle = document.getElementById("nav-toggle");
	const navLinks = document.getElementById("nav-links");
	if (!toggle || !navLinks) return;

	toggle.addEventListener("click", () => {
		const isExpanded = toggle.getAttribute("aria-expanded") === "true";
		toggle.setAttribute("aria-expanded", String(!isExpanded));
		navLinks.classList.toggle("nav-open");
	});

	navLinks.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => {
			toggle.setAttribute("aria-expanded", "false");
			navLinks.classList.remove("nav-open");
		});
	});
}
