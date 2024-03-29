export async function me(token: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Invalid credentials");
  }
}

export async function setup(token: string, data: FormData) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/setup`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: data,
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const data = await response.json();
    throw new Error(data.message);
  }
}

export async function getUser(token: string, id: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const data = await response.json();
    throw new Error(data.message);
  }
}

export async function getStats(token: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/stats`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const data = await response.json();
    throw new Error(data.message);
  }
}

export async function getAllUser(token: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/allUser`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const data = await response.json();
    throw new Error(data.message);
  }
}

export async function getOtherUserStats(token: string, userid: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/user/otheruserstats`,
    {
      method: "POST",
      body: JSON.stringify({
        userid,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Error while unliking post");
  }
}

export async function followUser(token: string, userid: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/user/${userid}/follow`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Error while unliking post");
  }
}

export async function unfollowUser(token: string, userid: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/user/${userid}/unfollow`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Error while unliking post");
  }
}
