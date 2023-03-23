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

export async function getPost(token: string, id: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/post/${id}`, {
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

export async function likePost(token: string, postid: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/post/like`, {
    method: "POST",
    body: JSON.stringify({
      postid,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Error while liking post");
  }
}

export async function unlikePost(token: string, postid: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/post/unlike`, {
    method: "POST",
    body: JSON.stringify({
      postid,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Error while unliking post");
  }
}

export async function submitComment(
  token: string,
  postid: string,
  comment: string
) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/post/comment`, {
    method: "POST",
    body: JSON.stringify({
      postid,
      comment,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Error while unliking post");
  }
}
