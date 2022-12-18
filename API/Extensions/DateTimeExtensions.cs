namespace API.Extensions;

public static class DateTimeExtensions
{
    public static int ToAge(this DateTime birth)
    {
        var today = DateTime.Today;
        var age = today.Year - birth.Year;
        if (birth.Date > today.AddYears(-age)) age -= 1;
        return age;
    }
}