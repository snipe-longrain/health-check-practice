using HealthBackend;

var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("Frontend", policy =>
//     {
//         policy
//             .WithOrigins("http://localhost:5173")
//             .AllowAnyHeader()
//             .AllowAnyMethod();
//     });
// });

builder.Services.AddHealthChecks();

var app = builder.Build();

// app.UseCors("Frontend");

app.MapHealthChecks("/health");

app.MapPost("/api/reverse", (ReverseRequest request) =>
{
    var reversed = new string(request.Text.Reverse().ToArray());

    return Results.Ok(reversed);
});

app.MapPost("/api/translate", (TranslateRequest request) =>
{
    var translated = $"[{request.TargetLanguage}] {request.Text}";

    var response = new TranslateResponse(
        OriginalText: request.Text,
        TranslatedText: translated,
        TargetLanguage: request.TargetLanguage
    );

    return Results.Ok(response);
});

app.Run();