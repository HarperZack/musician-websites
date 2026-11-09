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
        if (!this.container) {
            console.error("❌ SILENT ERROR: init() aborted because container element was not found in DOM!");
            return;
        }
        if (this.items.length === 0) {
            console.warn("⚠️ SILENT ERROR: init() aborted because items array is empty!");
            return;
        }
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
        if (!clone) {
            console.error(`❌ SILENT ERROR: getTemplateClone("${templateName}") returned null. Check your template paths/names!`);
            return;
        }

        const container = clone.querySelector("[data-field='embed-container']");
        if (!container) {
            console.error(`❌ SILENT ERROR: [data-field='embed-container'] not found inside template: "${templateName}"`);
            return;
        }

        let postUrl = "";
        if (item.postId) {
            postUrl = `https://www.instagram.com/p/${item.postId}/`;
        } else if (item.url) {
            postUrl = item.url.split("?")[0];
        }

        if (postUrl) {
            container.innerHTML = `
                <blockquote 
                    class="instagram-media" 
                    data-instgrm-permalink="${postUrl}" 
                    data-instgrm-version="14"
                    style="background:#FFF; border:0; margin:1px; max-width:540px; min-width:326px; width:calc(100% - 2px);">
                </blockquote>
            `;
        }

        const title = clone.querySelector("[data-field='title']");
        const desc = clone.querySelector("[data-field='description']");
        if (title) title.textContent = item.title || "";
        if (desc) desc.textContent = item.description || "";

        this.container.appendChild(clone);

        if (window.instgrm && window.instgrm.Embeds) {
            window.instgrm.Embeds.process();
        }
    }

// 	renderInstagram(item, templateName) {
//     console.group(`[Instagram Embed Debugger] - Item ID: ${item.id || 'Unknown'}`);
//     console.log("1. Item Data Received:", item);

//     const clone = getTemplateClone(templateName);
//     if (!clone) {
//         console.error("❌ FAILED: getTemplateClone returned null/undefined for template:", templateName);
//         console.groupEnd();
//         return;
//     }

//     const title = clone.querySelector("[data-field='title']");
//     const desc = clone.querySelector("[data-field='description']");
//     const container = clone.querySelector("[data-field='embed-container']");

//     console.log("2. Target DOM Elements Found:", {
//         container: !!container,
//         title: !!title,
//         desc: !!desc
//     });

//     if (!container) {
//         console.error("❌ FAILED: Could not find [data-field='embed-container'] in template!");
//         console.groupEnd();
//         return;
//     }

//     let postUrl = "";
//     if (item.postId) {
//         postUrl = `https://www.instagram.com/reel/${item.postId}/`;
//     } else if (item.url) {
//         postUrl = item.url.split("?")[0];
//     }
//     console.log("3. Constructed Canonical URL:", postUrl);

//     if (postUrl) {
//         container.innerHTML = `
//             <blockquote 
//                 class="instagram-media" 
//                 data-instgrm-permalink="${postUrl}" 
//                 data-instgrm-version="14"
//                 style="background:#FFF; border:0; margin:1px; max-width:540px; min-width:326px; width:calc(100% - 2px);">
//             </blockquote>
//         `;
//     }

//     if (title) title.textContent = item.title || "";
//     if (desc) desc.textContent = item.description || "";

//     this.container.appendChild(clone);
//     console.log("4. Clone appended to main DOM container.");

//     // Trigger or load Instagram Embed Script
//     if (window.instgrm && window.instgrm.Embeds) {
//         console.log("5. Instagram window.instgrm found. Triggering process()...");
//         window.instgrm.Embeds.process();
//     } else {
//         console.log("5. Instagram script not found. Injecting //www.instagram.com/embed.js...");
//         const script = document.createElement("script");
//         script.async = true;
//         script.src = "//www.instagram.com/embed.js";
//         script.onload = () => console.log("6. embed.js successfully loaded from Instagram.");
//         script.onerror = (err) => console.error("❌ FAILED to load embed.js (CORS or network block):", err);
//         document.body.appendChild(script);
//     }
//     console.groupEnd();
// }
	
}
