import axios from "axios";

const github = axios.create({
  baseURL: "https://api.github.com/graphql",
});

class githubClient {
  // Adapter class for the github client

  async fetchByUsername(username) {
    // Makes a POST request for the GraphQL endpoint
    // requesting user information.
    try {
      const response = await github.post(
        "",
        {
          query: `{
            repositoryOwner(login: "${username}") {
              ... on User {
                id
                email
                avatarUrl(size: 50)
              }
              repositories(first: 50) {
                nodes {
                  name
                  description
                  createdAt
                  url
                }
              }
            }
          }`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${"8913ed395c8f47100928a131080d7c88b00e5d3"}`,
          },
        }
      );
      if (!(response.status === 200)) {
        console.error("Application is experiencing instability.");
        return false;
      }
      return response.data;
    } catch (err) {
      console.error("Application is experiencing instability.");
      return false;
    }
  }
}

const ghClientInstance = new githubClient();

export default ghClientInstance;
