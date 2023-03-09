export async function createPost(token: string, data: FormData) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/post`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: token,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Error while posting new content");
  }
}

export async function getLatestPosts(token: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/post/feed`, {
    headers: {
      Authorization: token,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Error while posting new content");
  }
}

export async function userPosts(token: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/post`, {
    headers: {
      Authorization: token,
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    throw new Error("Error while posting new content");
  }
}
