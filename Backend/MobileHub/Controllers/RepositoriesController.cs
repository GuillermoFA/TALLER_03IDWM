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

            var repositories = await client.Repository.GetAllForUser("Dizkm8");

            var mappedRepositories = repositories.Select(r => {

                var entity = new RepositoryDto
                {
                    Name = r.Name,
                    CreatedAt = r.CreatedAt,
                    UpdatedAt = r.UpdatedAt,
                    CommitsAmount = 0,
                };
                return entity;

            });

            return Ok(mappedRepositories);


        }




    }
}