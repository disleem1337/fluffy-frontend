export async function getNotifications(token: string, seen?: boolean) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/notification${
      seen != undefined ? `?seen=${seen}` : ""
    }`,
    {
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
    throw new Error("Invalid credentials");
  }
}

export async function seeNotification(token: string, id: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/notification/${id}/see`,
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
    throw new Error("Invalid credentials");
  }
}
