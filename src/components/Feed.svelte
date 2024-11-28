<script>
	import Post from './Post.svelte';
  
	// Props
	export let posts = [];
	export let favourites;
	export let toggleFavourite;
  
  </script>
  
  <div class="feed">
	{#if posts.length > 0}
		<div class="feed">
			{#each posts as post (post.id)}
				<Post post={post} favourites={favourites} toggleFavourite={toggleFavourite} />
			{/each}
		</div>
	{:else}
		<p>No posts to display.</p>
	{/if}
	
  </div>
  