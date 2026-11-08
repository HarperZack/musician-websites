/**
 * =============================================================================
 * Calendar & Performance Feed Component
 * =============================================================================
 * Filters upcoming performances so that passed gigs don't clutter the page.
 * Uses templates/performance-card.html for all card markup.
 */

import { getTemplateClone } from "./template-loader.js";

export class PerformanceCalendar {
	constructor(performances, containerId) {
		this.performances = performances || [];
		this.container = document.getElementById(containerId);
		this.emptyState = document.getElementById("no-performances-msg");
		this.init();
	}

	init() {
		if (!this.container) return;
		this.render();
	}

	render() {
		this.container.textContent = "";

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const upcoming = this.performances
			.filter((gig) => {
				const gigDate = new Date(gig.date + "T00:00:00");
				return gigDate >= today;
			})
			.sort((a, b) => new Date(a.date) - new Date(b.date));

		if (upcoming.length === 0) {
			if (this.emptyState) {
				this.emptyState.style.display = "block";
			}
			return;
		}

		if (this.emptyState) {
			this.emptyState.style.display = "none";
		}

		upcoming.forEach((gig) => {
			const clone = getTemplateClone("performance-card");
			if (!clone) return;

			const dateObj = new Date(gig.date + "T00:00:00");
			const monthStr = dateObj.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
			const dayNum = String(dateObj.getDate());
			const weekday = dateObj.toLocaleDateString("en-US", { weekday: "short" });

			const monthEl = clone.querySelector("[data-field='month']");
			const dayEl = clone.querySelector("[data-field='day']");
			const weekdayEl = clone.querySelector("[data-field='weekday']");
			const titleEl = clone.querySelector("[data-field='title']");
			const venueEl = clone.querySelector("[data-field='venue']");
			const locationEl = clone.querySelector("[data-field='location']");
			const timeEl = clone.querySelector("[data-field='time']");
			const ticketBtn = clone.querySelector("[data-field='ticket-btn']");
			const freeBadge = clone.querySelector("[data-field='free-badge']");

			if (monthEl) monthEl.textContent = monthStr;
			if (dayEl) dayEl.textContent = dayNum;
			if (weekdayEl) weekdayEl.textContent = weekday;
			if (titleEl) titleEl.textContent = gig.title;
			if (venueEl) venueEl.textContent = gig.venue;
			if (locationEl) locationEl.textContent = gig.location;
			if (timeEl) timeEl.textContent = gig.time || "";

			if (gig.ticketUrl) {
				if (ticketBtn) {
					ticketBtn.href = gig.ticketUrl;
					ticketBtn.style.display = "inline-block";
				}
			} else {
				if (freeBadge) {
					freeBadge.style.display = "inline-block";
				}
			}

			this.container.appendChild(clone);
		});
	}
}
