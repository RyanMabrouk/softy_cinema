const options = {
  method: "DELETE",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGE3OTZkYmQ3OTg5Mzc2M2IyMzc5ZmFmOTE0ODI3ZSIsInN1YiI6IjY0ZDU3YzUwNGE0YmY2MDBjNzE0NmQwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qBv4z1WpzIVVtAi9l2Rsozc9zVGL9H7m0INILnU2AJ8",
  },
};
export default async function fetchData(path, sessionId = "") {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3${
        path + (sessionId && "?session_id=" + sessionId)
      }`,
      options
    );
    const response = await res.json();
    const data = await response;
    return data.results ? data.results : data;
  } catch (err) {
    console.error(err);
    return err;
  }
}
