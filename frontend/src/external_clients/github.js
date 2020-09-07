import axios from 'axios';

const github = axios.create({
  baseURL: 'https://api.github.com/graphql',
});


class githubClient {
  // Adapter class for the github client

  constructor(axios_client){
    this.request = axios_client
  }

  async fetchByUsername(username) {
    try {
      
      const response = await github.post(
        '',
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
          }`
        }, 
      {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${"8913ed395c8f547100928a131080d7c88b00e5d3"}`
        },
      })
      return response.data
  } catch(err) {
    console.error(err)
    return false
  }}
}

const ghClientInstance = new githubClient(github)

export default ghClientInstance;
