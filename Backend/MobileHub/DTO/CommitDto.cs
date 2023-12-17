namespace MobileHub.DTO
{
    public class CommitDto
    { 
        public string Author { get; set; } = null!;
        public string Message { get; set; } = null!;
        public DateTimeOffset Date { get; set; }
    }
}