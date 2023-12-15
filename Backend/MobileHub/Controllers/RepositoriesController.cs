using DotNetEnv;
using Microsoft.AspNetCore.Mvc;
using Octokit;

namespace MobileHub.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RepositoriesController : ControllerBase
    {


        private GitHubClient ClientProvider()   
        {
            Env.Load();

            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var myToken = Env.GetString("GITHUB_ACCESS_TOKEN");
            var tokenAuth = new Credentials(myToken);
            client.Credentials = tokenAuth;
            return client;

        }
        
        [HttpGet]
        public async Task<ActionResult<List<Repository>>> GetAll()
        {
            var client = ClientProvider();
            var response = await GetAllRepositories(client);
            return Ok(response);
        }

        private async Task<IReadOnlyList<Repository>> GetAllRepositories(GitHubClient client)
        {
            var repositories = await client.Repository.GetAllForUser("Dizkm8");
            repositories = repositories.OrderByDescending(x => x.CreatedAt).ToList();
            return repositories;
        }
    }
}