async function blogGenerator() {
  let files = getPostFiles('./posts');
  let index = generateIndex(await files);
  let posts = generatePosts(await files);

  return {
      index: await index,   
     posts: await posts
  };
}