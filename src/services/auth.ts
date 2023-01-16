export async function login(account: string, signedMessage: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ account, signedMessage }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Invalid credentials");
  }
}
