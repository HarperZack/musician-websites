/**
 * =============================================================================
 * Template Loader Utility (template-loader.js)
 * =============================================================================
 * Fetches standalone HTML template files from the /templates directory,
 * parses them into reusable DocumentFragment / DOM elements, and caches them.
 * 
 * DESIGN RATIONALE:
 * Keeps index.html completely free of clutter while keeping 100% of HTML
 * markup in dedicated .html files for editing and maintenance.
 */

const templateCache = new Map();

/**
 * Loads and caches an HTML template by its name (e.g., 'service-card').
 * @param {string} templateName - The filename without extension in /templates/
 * @returns {Promise<DocumentFragment>}
 */
export async function loadTemplate(templateName) {
	if (templateCache.has(templateName)) {
		return templateCache.get(templateName);
	}

	try {
		const response = await fetch(`templates/${templateName}.html`);
		if (!response.ok) {
			throw new Error(`Failed to load template '${templateName}': ${response.statusText}`);
		}

		const htmlText = await response.text();
		const parser = new DOMParser();
		const doc = parser.parseFromString(htmlText, "text/html");

		// Extract template elements into a DocumentFragment
		const fragment = document.createDocumentFragment();
		Array.from(doc.body.childNodes).forEach((node) => {
			fragment.appendChild(node.cloneNode(true));
		});

		templateCache.set(templateName, fragment);
		return fragment;
	} catch (error) {
		console.error(`[TemplateLoader] Error loading ${templateName}:`, error);
		throw error;
	}
}

/**
 * Preloads an array of template names in parallel.
 * @param {string[]} names - Array of template names without extension
 * @returns {Promise<void>}
 */
export async function preloadTemplates(names) {
	await Promise.all(names.map((name) => loadTemplate(name)));
}

/**
 * Synchronously retrieves a cloned instance of a preloaded template.
 * @param {string} templateName
 * @returns {DocumentFragment|null}
 */
export function getTemplateClone(templateName) {
	const cached = templateCache.get(templateName);
	if (!cached) {
		console.error(`[TemplateLoader] Template '${templateName}' was not preloaded.`);
		return null;
	}
	return cached.cloneNode(true);
}
