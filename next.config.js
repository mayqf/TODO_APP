// must restart server whenever you make changes in next.config
module.exports = {
  async headers() {
    return [
      {
        // mathching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  env: {
    MONGO_SRV: "mongodb+srv://mda:M.a.1803@reacttodo.gh9ft.mongodb.net/reacttodo?retryWrites=true&w=majority",
    JWT_SECRET: "lkskksksksndhddfd",
  }
};
