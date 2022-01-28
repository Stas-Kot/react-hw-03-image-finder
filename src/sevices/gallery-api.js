function fetchGallery(name, api_KEY, page) {
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=${api_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`We're sorry, there are no more results for: "${name}"`),
    );
  });
}

const api = {
  fetchGallery,
};

export default api;
