import React, { useRef, useState, useEffect } from "react";

const tracks = [
	{
		id: 1,
		title: "Acoustic Breeze",
		artist: "Bensound",
		src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
		image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=60",
	},
	{
		id: 2,
		title: "Sunny",
		artist: "KODOMOi",
		src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
		image: "https://images.unsplash.com/photo-1507878866276-a947ef722fee?auto=format&fit=crop&w=800&q=60",
	},
	{
		id: 3,
		title: "Creative Minds",
		artist: "Benjamin Tissot",
		src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
		image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=800&q=60",
	},
];

function formatTime(seconds = 0) {
	const s = Math.floor(seconds % 60).toString().padStart(2, "0");
	const m = Math.floor(seconds / 60).toString().padStart(2, "0");
	return `${m}:${s}`;
}

export default function Player() {
	const audioRef = useRef(null);
	const [index, setIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.volume = volume;
	}, [volume]);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.src = tracks[index].src;
		audio.load();
		if (isPlaying) audio.play().catch(() => {});
	}, [index]);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		if (isPlaying) audio.play().catch(() => {});
		else audio.pause();
	}, [isPlaying]);

	function togglePlay() {
		setIsPlaying((p) => !p);
	}

	function playNext() {
		setIndex((i) => (i + 1) % tracks.length);
		setCurrentTime(0);
		setIsPlaying(true);
	}

	function playPrev() {
		setIndex((i) => (i - 1 + tracks.length) % tracks.length);
		setCurrentTime(0);
		setIsPlaying(true);
	}

	function onTimeUpdate(e) {
		setCurrentTime(e.target.currentTime || 0);
	}

	function onLoadedMeta(e) {
		setDuration(e.target.duration || 0);
	}

	function seek(e) {
		const bar = e.currentTarget;
		const rect = bar.getBoundingClientRect();
		const x = (e.clientX || 0) - rect.left;
		const pct = Math.max(0, Math.min(1, x / rect.width));
		const audio = audioRef.current;
		if (!audio) return;
		audio.currentTime = pct * duration;
		setCurrentTime(audio.currentTime);
	}

	return (
		<div className="max-w-4xl mx-auto p-4">
			<div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur rounded-xl shadow-lg overflow-hidden md:flex">
				{/* Left - artwork (mobile stacked, md side-by-side) */}
				<div className="md:w-1/3 flex-shrink-0">
					<div className="relative w-full h-64 md:h-full">
						<img
							src={tracks[index].image}
							alt={tracks[index].title}
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
						<div className="absolute bottom-4 left-4 text-white">
							<h3 className="text-lg font-semibold">{tracks[index].title}</h3>
							<p className="text-sm opacity-90">{tracks[index].artist}</p>
						</div>
					</div>
				</div>

				{/* Right - controls */}
				<div className="p-4 md:w-2/3 flex flex-col justify-between">
					<div>
						<div className="flex items-center justify-between">
							<div>
								<h4 className="text-lg font-semibold">{tracks[index].title}</h4>
								<p className="text-sm text-gray-600 dark:text-gray-300">{tracks[index].artist}</p>
							</div>
							<div className="text-sm text-gray-500">Playlist • {index + 1}/{tracks.length}</div>
						</div>

						<div className="mt-4">
							<div
								className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
								onClick={seek}
								role="presentation"
							>
								<div
									className="h-2 bg-indigo-500 rounded-full"
									style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
								/>
							</div>

							<div className="flex items-center justify-between mt-2 text-xs text-gray-500">
								<span>{formatTime(currentTime)}</span>
								<span>{formatTime(duration)}</span>
							</div>
						</div>
					</div>

					<div className="mt-6">
						<div className="flex items-center justify-center gap-6">
							<button
								onClick={playPrev}
								className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
								aria-label="Previous"
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19V5l-7 7 7 7zM20 19V5l-7 7 7 7z" />
								</svg>
							</button>

							<button
								onClick={togglePlay}
								className="p-4 rounded-full bg-indigo-600 text-white shadow-lg hover:scale-105 transform"
								aria-label={isPlaying ? "Pause" : "Play"}
							>
								{isPlaying ? (
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6h4v12h-4zM6 6h2v12H6z" />
									</svg>
								) : (
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v18l15-9L5 3z" />
									</svg>
								)}
							</button>

							<button
								onClick={playNext}
								className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
								aria-label="Next"
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5v14l7-7-7-7zM4 5v14l7-7-7-7z" />
								</svg>
							</button>
						</div>

						<div className="mt-4 flex items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<button className="p-2 rounded hover:bg-gray-100" aria-label="Shuffle">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
										<path d="M4 3a1 1 0 000 2h.17l3.4 4.26a1 1 0 00.8.4h.02a1 1 0 00.78-.39L13.7 5H14a1 1 0 100-2h-1a1 1 0 00-.8.4L9.85 6.9 6.46 3.4A1 1 0 005.66 3H4z" />
									</svg>
								</button>
								<button className="p-2 rounded hover:bg-gray-100" aria-label="Repeat">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
										<path d="M4 4v6h2V6h6V4H4zM16 16v-6h-2v4H8v2h8z" />
									</svg>
								</button>
							</div>

							<div className="flex items-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
									<path d="M9 4.5v11a3 3 0 001.5 2.6 1 1 0 11-.99 1.8A5 5 0 018 15V5a1 1 0 10-2 0v10a7 7 0 003.5 6 1 1 0 11-.9 1.8A9 9 0 016 15V5a3 3 0 016 0v11a9 9 0 01-1.5 5.4 1 1 0 11-.9-1.8A7 7 0 0011 15V4.5z" />
								</svg>
								<input
									type="range"
									min="0"
									max="1"
									step="0.01"
									value={volume}
									onChange={(e) => setVolume(Number(e.target.value))}
									className="w-32"
									aria-label="Volume"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<audio
				ref={audioRef}
				onTimeUpdate={onTimeUpdate}
				onLoadedMetadata={onLoadedMeta}
				onEnded={playNext}
				preload="metadata"
			>
				<source src={tracks[index].src} />
			</audio>
		</div>
	);
}
