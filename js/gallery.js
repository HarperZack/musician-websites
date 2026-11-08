/**
 * =============================================================================
 * Media Gallery Component (YouTube & Instagram Embeds)
 * =============================================================================
 * Renders video & photo embeds using dedicated templates:
 *   - templates/video-card.html      (YouTube 16:9 responsive)
 *   - templates/instagram-video.html (Instagram Reel / Video 9:16)
 *   - templates/instagram-photo.html (Instagram Post / Photo 1:1 or 4:5)
 */

import { getTemplateClone } from "./template-loader.js";

export class MediaGallery {
	constructor(mediaItems, containerId) {
		this.items = mediaItems || [];
		this.container = document.getElementById(containerId);
		this.init();
	}

	init() {
		if (!this.container || this.items.length === 0) return;
		this.render();
	}

	render() {
		this.container.textContent = "";

		this.items.forEach((item) => {
			const type = item.type || (item.youtubeId ? "youtube" : "instagram-video");

			if (type === "youtube") {
				this.renderYouTube(item);
			} else if (type === "instagram-video" || type === "instagram-reel") {
				this.renderInstagram(item, "instagram-video");
			} else if (type === "instagram-photo" || type === "instagram-post") {
				this.renderInstagram(item, "instagram-photo");
			}
		});
	}

	renderYouTube(item) {
		const clone = getTemplateClone("video-card");
		if (!clone) return;

		const iframe = clone.querySelector("[data-field='iframe']");
		const title = clone.querySelector("[data-field='title']");
		const desc = clone.querySelector("[data-field='description']");

		if (iframe && item.youtubeId) {
			iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.youtubeId)}?rel=0&modestbranding=1`;
			iframe.title = item.title || "YouTube Performance Video";
		}
		if (title) title.textContent = item.title || "";
		if (desc) desc.textContent = item.description || "";

		this.container.appendChild(clone);
	}

	renderInstagram(item, templateName) {
		const clone = getTemplateClone(templateName);
		if (!clone) return;

		const iframe = clone.querySelector("[data-field='iframe']");
		const title = clone.querySelector("[data-field='title']");
		const desc = clone.querySelector("[data-field='description']");

		// Extract post/reel ID or normalize embed URL
		// Instagram embed endpoints:
		// Standard posts and reels both respond reliably at /p/{id}/embed/
		let embedUrl = "";
		if (item.postId) {
			embedUrl = `https://www.instagram.com/p/${encodeURIComponent(item.postId)}/embed/`;
		} else if (item.url) {
			// Extract ID from any Instagram URL (e.g. /reel/ID/ or /p/ID/)
			const idMatch = item.url.match(/instagram\.com\/(?:reel|p)\/([^/?#&]+)/i);
			if (idMatch && idMatch[1]) {
				embedUrl = `https://www.instagram.com/p/${encodeURIComponent(idMatch[1])}/embed/`;
			} else {
				const cleanUrl = item.url.split("?")[0].replace(/\/$/, "");
				embedUrl = `${cleanUrl}/embed/`;
			}
		}

		if (iframe && embedUrl) {
			iframe.src = embedUrl;
		}
		if (title) title.textContent = item.title || "";
		if (desc) desc.textContent = item.description || "";

		this.container.appendChild(clone);
	}
}
