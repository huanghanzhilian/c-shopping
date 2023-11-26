const baseUrl = process.env.BASE_URL;

const Get = async (url, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};

const Post = async (url, post, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

const Put = async (url, post, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

const Patch = async (url, post, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

const Delete = async (url, post, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: token },
  });

  const data = await res.json();
  return data;
};

const fetchData = { Get, Post, Put, Patch, Delete };
export default fetchData;
