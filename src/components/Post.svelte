<script>
	export let post;
	export let favorites;
	export let toggleFavorite;

	const isFavorite = favorites.has(post.id);
	console.log('post', post);
</script>

<div class="post">
	<h2>{post.title}</h2>
	<p>{post.content}</p>
	<button on:click={() => toggleFavorite(post.id)}>
		{isFavorite ? 'Unfavorite' : 'Favorite'}
	</button>
</div>

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
