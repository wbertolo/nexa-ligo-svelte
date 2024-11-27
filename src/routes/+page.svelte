<script context="module" lang="ts">
	export const prerender = true; // Enable static prerendering for better performance
</script>

<script>
	import { onMount } from 'svelte';
	let posts = [];
	let feedA = [];
	let feedB = [];
	let favorites = new Set();

	// Fetch posts from the API (replace with your actual API endpoint)
	onMount(async () => {
		const res = await fetch('https://api.example.com/posts');
		posts = await res.json();
		feedA = posts.filter((post) => post.filter === 'A');
		feedB = posts.filter((post) => post.filter === 'B');

		// Load favorites from localStorage
		const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		storedFavorites.forEach((id) => favorites.add(id));
	});

	// Function to toggle favorite status
	const toggleFavorite = (postId) => {
		if (favorites.has(postId)) {
			favorites.delete(postId);
		} else {
			favorites.add(postId);
		}
		// Update localStorage
		localStorage.setItem('favorites', JSON.stringify([...favorites]));
		dispatchFavoriteChange();
	};

	// Dispatch custom event to notify other tabs
	const dispatchFavoriteChange = () => {
		window.dispatchEvent(new CustomEvent('favorites-changed'));
	};

	// Listen for favorite changes in other tabs
	window.addEventListener('favorites-changed', () => {
		const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		favorites = new Set(storedFavorites);
	});
</script>

<main>
	<h1>Feed A</h1>
	<div>
		{#each feedA as post}
			<div class="post">
				<h2>{post.title}</h2>
				<p>{post.content}</p>
				<button on:click={() => toggleFavorite(post.id)}>
					{favorites.has(post.id) ? 'Unfavorite' : 'Favorite'}
				</button>
			</div>
		{/each}
	</div>

	<h1>Feed B</h1>
	<div>
		{#each feedB as post}
			<div class="post">
				<h2>{post.title}</h2>
				<p>{post.content}</p>
				<button on:click={() => toggleFavorite(post.id)}>
					{favorites.has(post.id) ? 'Unfavorite' : 'Favorite'}
				</button>
			</div>
		{/each}
	</div>
</main>

<style>
	.post {
		margin-bottom: 20px;
		border: 1px solid #ddd;
		padding: 10px;
	}

	button {
		background-color: #6200ee;
		color: white;
		padding: 10px 20px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #3700b3;
	}
</style>
