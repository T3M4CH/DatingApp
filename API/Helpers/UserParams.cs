namespace API.Helpers;

public class UserParams : PaginationParams
{
    public string OrderBy { get; set; } = "Last Active";
    public int MinAge { get; set; } = 10;
    public int MaxAge { get; set; } = 999;
    public string? CurrentUser { get; set; }
    public string? Gender { get; set; }
}