const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://vast-island-73130.herokuapp.com/"
    : "http://localhost:3000";

export default baseUrl;
