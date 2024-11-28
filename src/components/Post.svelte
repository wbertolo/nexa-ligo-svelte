<script>
	import DOMPurify from 'dompurify';

	export let post;
	export let favourites;
	export let toggleFavourite;

	const isFavourite = favourites.has(post.id);
	const title = DOMPurify.sanitize(post.title.rendered);
	const excerpt = DOMPurify.sanitize(post.excerpt.rendered);
</script>

<div class="post p-5 mb-5 border">
	<h3>{@html title}</h3>
	<p>{@html excerpt}</p>
	<button 
		class="bg-[#6200ee] hover:bg-[#3700b3] text-white py-2 px-3 border rounded-md cursor-pointer"
		on:click={() => toggleFavourite(post.id)}
	>
		{isFavourite ? 'Unfavourite' : 'Favourite'}
	</button>
</div>
