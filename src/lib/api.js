// src/lib/api.js
export const fetchPosts = async () => {
	try {
	  const response = await fetch('https://followthislight.com/wp-json/wp/v2/posts');
	  if (!response.ok) {
		throw new Error('Failed to fetch posts');
	  }
	  const data = await response.json();
	  return data;
	} catch (error) {
	  console.error('Error fetching posts:', error);
	  return []; // Return an empty array in case of an error
	}
  };
  