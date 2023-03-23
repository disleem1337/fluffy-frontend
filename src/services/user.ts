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
