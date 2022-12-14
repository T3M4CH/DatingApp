namespace API.Errors;

public class ApiException
{
    public ApiException(int statusCode, string message, string details = null!)
    {
        Message = message;
        Details = details;
        StatusCode = statusCode;
    }
    
    public int StatusCode { get; set; }
    public string Message { get; set; }
    public string Details { get; set; }
}