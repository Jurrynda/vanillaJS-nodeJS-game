export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split('/');
  return {
    resource: request[1],
    id: request[2],
  };
};

export const rerenderPage = (page) => {
  document.getElementById('main-container').innerHTML = page.render();
  if (page.after_render) page.after_render();
};
