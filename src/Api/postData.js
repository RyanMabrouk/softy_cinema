export default async function postData(data, url, sessionId = "") {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGE3OTZkYmQ3OTg5Mzc2M2IyMzc5ZmFmOTE0ODI3ZSIsInN1YiI6IjY0ZDU3YzUwNGE0YmY2MDBjNzE0NmQwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qBv4z1WpzIVVtAi9l2Rsozc9zVGL9H7m0INILnU2AJ8",
    },
    body: JSON.stringify(data),
  };
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3${
        url + (sessionId && "?session_id=" + sessionId)
      }`,
      options
    );
    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
  }
}
