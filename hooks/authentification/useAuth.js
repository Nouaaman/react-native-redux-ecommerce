const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const fetchSignUp = async function (data) {
  const fetchUrl = `${baseUrl}/auth/register`;
  try {
    return fetch(fetchUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => response);
  } catch (error) {
    console.log("error ", error);
    return error;
  }
};
