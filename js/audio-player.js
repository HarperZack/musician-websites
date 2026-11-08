/**
 * =============================================================================
 * Audio Player Component
 * =============================================================================
 * Handles playback, playlist selection, progress scrub, and time updates.
 * Playlist row markup is cleanly separated in templates/playlist-item.html.
 */

import { getTemplateClone } from "./template-loader.js";

export class AudioPlayer {
	constructor(tracks, options = {}) {
		this.tracks = tracks || [];
		this.currentIndex = 0;
		this.isPlaying = false;

		// Cache DOM Elements
		this.audio = document.getElementById("main-audio-element");
		this.playBtn = document.getElementById("player-btn-play");
		this.prevBtn = document.getElementById("player-btn-prev");
		this.nextBtn = document.getElementById("player-btn-next");
		this.progressContainer = document.getElementById("player-progress-container");
		this.progressFill = document.getElementById("player-progress-fill");
		this.timeDisplay = document.getElementById("player-time-display");
		this.trackTitle = document.getElementById("player-track-title");
		this.trackGenre = document.getElementById("player-track-genre");
		this.playlistElement = document.getElementById("audio-playlist");

		this.init();
	}

	init() {
		if (!this.audio || this.tracks.length === 0) return;

		this.renderPlaylist();
		this.loadTrack(0);
		this.bindEvents();
	}

	renderPlaylist() {
		if (!this.playlistElement) return;
		this.playlistElement.textContent = "";

		this.tracks.forEach((track, index) => {
			const clone = getTemplateClone("playlist-item");
			if (!clone) return;

			const li = clone.querySelector(".playlist-item");
			const numEl = clone.querySelector("[data-field='num']");
			const titleEl = clone.querySelector("[data-field='title']");
			const genreEl = clone.querySelector("[data-field='genre']");
			const durationEl = clone.querySelector("[data-field='duration']");

			if (index === 0 && li) li.classList.add("active");
			if (li) li.dataset.index = String(index);

			if (numEl) numEl.textContent = String(index + 1).padStart(2, "0");
			if (titleEl) titleEl.textContent = track.title;
			if (genreEl) genreEl.textContent = track.genre || "";
			if (durationEl) durationEl.textContent = track.duration || "--:--";

			if (li) {
				li.addEventListener("click", () => {
					this.loadTrack(index);
					this.play();
				});
			}

			this.playlistElement.appendChild(clone);
		});
	}

	bindEvents() {
		this.playBtn.addEventListener("click", () => this.togglePlay());
		this.prevBtn.addEventListener("click", () => this.prev());
		this.nextBtn.addEventListener("click", () => this.next());
		this.audio.addEventListener("timeupdate", () => this.updateProgress());
		this.audio.addEventListener("ended", () => this.next());
		this.progressContainer.addEventListener("click", (e) => this.seek(e));
	}

	loadTrack(index) {
		if (index < 0 || index >= this.tracks.length) return;
		this.currentIndex = index;
		const track = this.tracks[index];

		this.audio.src = track.src;
		this.trackTitle.textContent = track.title;
		this.trackGenre.textContent = track.genre ? `• ${track.genre}` : "";

		const items = this.playlistElement.querySelectorAll(".playlist-item");
		items.forEach((item, i) => {
			item.classList.toggle("active", i === index);
		});

		this.progressFill.style.width = "0%";
		this.timeDisplay.textContent = `0:00 / ${track.duration || "0:00"}`;
	}

	togglePlay() {
		if (this.isPlaying) {
			this.pause();
		} else {
			this.play();
		}
	}

	play() {
		this.audio.play()
			.then(() => {
				this.isPlaying = true;
				this.playBtn.textContent = "❚❚";
				this.playBtn.setAttribute("aria-label", "Pause");
			})
			.catch((err) => {
				console.warn("Audio playback interrupted or blocked by browser:", err);
			});
	}

	pause() {
		this.audio.pause();
		this.isPlaying = false;
		this.playBtn.textContent = "▶";
		this.playBtn.setAttribute("aria-label", "Play");
	}

	prev() {
		let nextIndex = this.currentIndex - 1;
		if (nextIndex < 0) nextIndex = this.tracks.length - 1;
		this.loadTrack(nextIndex);
		if (this.isPlaying) this.play();
	}

	next() {
		let nextIndex = this.currentIndex + 1;
		if (nextIndex >= this.tracks.length) nextIndex = 0;
		this.loadTrack(nextIndex);
		if (this.isPlaying) this.play();
	}

	updateProgress() {
		if (!this.audio.duration) return;
		const current = this.audio.currentTime;
		const total = this.audio.duration;
		const percent = (current / total) * 100;
		this.progressFill.style.width = `${percent}%`;

		this.timeDisplay.textContent = `${this.formatTime(current)} / ${this.formatTime(total)}`;
	}

	seek(event) {
		if (!this.audio.duration) return;
		const rect = this.progressContainer.getBoundingClientRect();
		const clickX = event.clientX - rect.left;
		const fraction = Math.max(0, Math.min(1, clickX / rect.width));
		this.audio.currentTime = fraction * this.audio.duration;
	}

	formatTime(seconds) {
		if (isNaN(seconds)) return "0:00";
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${String(secs).padStart(2, "0")}`;
	}
}
