<script>
	import { onMount } from 'svelte';
	import { fetchPosts } from '$lib/api';
	import Feed from '$components/Feed.svelte';
  
	let posts = [];
	let feedA = [];
	let feedB = [];
	let favorites = new Set();
  
	// Check if running in the browser
	const isBrowser = typeof window !== 'undefined';
  
	// Fetch posts from the API when the component is mounted
	onMount(async () => {
	  posts = await fetchPosts();
	});

	$: {
		if (posts.length > 0) {
			feedA = posts.filter((post) => post.categories.includes(23));
			feedB = posts.filter((post) => post.categories.includes(22));
			console.log('Updated Feed A:', feedA);
			console.log('Updated Feed B:', feedB);
		}
  	}

	// Reactively update feeds based on posts (if necessary)
	// Svelte will automatically update feedA and feedB if posts change
	$: {
	  // Only filter if posts have been updated (this ensures reactivity)
	  if (posts.length > 0) {
		feedA = posts.filter((post) => post.categories.includes(23));
		feedB = posts.filter((post) => post.categories.includes(22));
	  }
	}
  
	// Load favorites from localStorage only on the client-side
	if (isBrowser) {
	  const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
	  storedFavorites.forEach((id) => favorites.add(id));
  
	  // Listen for changes across tabs on the client-side
	  window.addEventListener('favorites-changed', () => {
		const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		favorites = new Set(storedFavorites);
	  });
	}
  
	// Function to toggle favorite status
	const toggleFavorite = (postId) => {
	  if (favorites.has(postId)) {
		favorites.delete(postId);
	  } else {
		favorites.add(postId);
	  }
	  // Update localStorage
	  if (isBrowser) {
		localStorage.setItem('favorites', JSON.stringify([...favorites]));
		dispatchFavoriteChange();
	  }
	};
  
	// Dispatch custom event to notify other tabs
	const dispatchFavoriteChange = () => {
	  if (isBrowser) {
		window.dispatchEvent(new CustomEvent('favorites-changed'));
	  }
	};
  </script>
  
  <main>
	{#if posts.length === 0}
	  <p>Loading posts...</p>  <!-- Display loading message until posts are fetched -->
	{:else}
	  <h1>Feed A</h1>
	  <Feed posts={feedA} favorites={favorites} toggleFavorite={toggleFavorite} />
  
	  <h1>Feed B</h1>
	  <Feed posts={feedB} favorites={favorites} toggleFavorite={toggleFavorite} />
	{/if}
  </main>
  
  <style>
	h1 {
	  font-size: 24px;
	  margin-top: 40px;
	}
  </style>
  