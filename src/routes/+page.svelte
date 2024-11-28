<script>
	import { onMount } from 'svelte';
	import { fetchPosts } from '$lib/api';
	import Feed from '$components/Feed.svelte';
  
	let posts = [];
	let feedA = [];
	let feedB = [];
	let favourites = new Set();
  
	// Check if running in the browser
	const isBrowser = typeof window !== 'undefined';
  
	// Fetch posts from the API when the component is mounted
	onMount(async () => {
	  posts = await fetchPosts();
	});

	// Reactively update feeds based on posts
	$: {
	  if (posts.length > 0) {
		feedA = posts.filter((post) => post.categories.includes(23));
		feedB = posts.filter((post) => post.categories.some(category => [22, 23].includes(category)));
	  }
	}
  
	// Load favourites from localStorage only on the client-side
	if (isBrowser) {
	  const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
	  storedFavourites.forEach((id) => favourites.add(id));
  
	  // Listen for changes across tabs on the client-side
	  window.addEventListener('favourites-changed', () => {
		const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
		favourites = new Set(storedFavourites);
	  });
	}
  
	// Function to toggle favourite status
	const toggleFavourite = (postId) => {
	  if (favourites.has(postId)) {
		favourites.delete(postId);
	  } else {
		favourites.add(postId);
	  }
	  // Update localStorage
	  if (isBrowser) {
		localStorage.setItem('favourites', JSON.stringify([...favourites]));
		dispatchFavouriteChange();
	  }
	};
  
	// Dispatch custom event to notify other tabs
	const dispatchFavouriteChange = () => {
	  if (isBrowser) {
		window.dispatchEvent(new CustomEvent('favourites-changed'));
	  }
	};
  </script>
  
  <main class="p-5">
	{#if posts.length === 0}
	  <p>Loading posts...</p>
	{:else}
		<div class="flex flex-row justify-between">

			<div class="feed-container basis-[45%]">
				<h2>Travel Posts</h2>
				<Feed posts={feedA} favourites={favourites} toggleFavourite={toggleFavourite} />
			</div>

			<div class="feed-container basis-[45%]">
				<h2>Travel Spotify and Posts</h2>
				<Feed posts={feedB} favourites={favourites} toggleFavourite={toggleFavourite} />
			</div>
		</div>
  
	{/if}
  </main>
  