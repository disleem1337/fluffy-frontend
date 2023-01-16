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

export async function setup(token: string, data: any) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/setup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const data = await response.json();
    throw new Error(data.message);
  }
}
