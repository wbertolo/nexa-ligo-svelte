<script>
	import Post from './Post.svelte';
  
	// Define props
	export let posts = [];
	export let favorites;
	export let toggleFavorite;
	export let test;
  
	// Log posts to verify
	console.log('Received posts in Feed:', posts);
	console.log(test);

  </script>
  
  <div class="feed">
	{#if posts.length > 0}
		<div class="feed">
			{#each posts as post (post.id)}
				<Post {post} {favorites} {toggleFavorite} />
			{/each}
		</div>
	{:else}
		<p>No posts to display.</p>
	{/if}
	
  </div>
  