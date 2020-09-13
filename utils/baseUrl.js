const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://todo-app-new-one.vercel.app"
    : "http://localhost:3000";

export default baseUrl;
