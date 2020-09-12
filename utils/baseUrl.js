const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://todo-app-pi-blue.vercel.app/"
    : "http://localhost:3000";

export default baseUrl;
