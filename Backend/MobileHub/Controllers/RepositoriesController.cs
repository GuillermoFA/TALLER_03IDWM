using DotNetEnv;
using Microsoft.AspNetCore.Mvc;
using MobileHub.DTO;
using Octokit;

namespace MobileHub.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RepositoriesController : ControllerBase
    {


        [HttpGet]
        public async Task<ActionResult<IEnumerable<RepositoryDto>>> GetAll()
        {
            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var tokenAuth = Env.GetString("GITHUB_ACCESS_TOKEN");
            client.Credentials = new Credentials(tokenAuth);

            var commits = await client.Repository.Commit.GetAll("Dizkm8", "Backend");

            var repositories = await client.Repository.GetAllForUser("Dizkm8");

            repositories = repositories.OrderByDescending(x => x.CreatedAt).ToList();

            var getCommitsTaks = repositories.Select(r => GetCommitsByRepository(client, r.Name));
            var commitsResults = await Task.WhenAll(getCommitsTaks);

            var mappedRepositories = repositories.Select((r, index) => {

                var entity = new RepositoryDto
                {
                    Name = r.Name,
                    CreatedAt = r.CreatedAt,
                    UpdatedAt = r.UpdatedAt,
                    CommitsAmount = commitsResults[index]
                };
                return entity;

            });

            return Ok(mappedRepositories);

        }

        private async Task<int> GetCommitsByRepository ( GitHubClient client, string repoName)
        {
            var commits = await client.Repository.Commit.GetAll("Dizkm8", repoName);
            if(commits is null) return 0;
            return commits.Count;

        }



    }
}