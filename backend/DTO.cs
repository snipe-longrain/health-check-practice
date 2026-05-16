namespace HealthBackend;

record ReverseRequest(string Text);

public record TranslateRequest(string Text, string TargetLanguage);

public record TranslateResponse(string OriginalText, string TranslatedText, string TargetLanguage);