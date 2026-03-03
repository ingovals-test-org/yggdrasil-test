FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

ARG APP_VERSION=unknown
ENV APP_VERSION=${APP_VERSION}

# Copy pre-built publish output (built with: dotnet publish -c Release)
COPY bin/Release/net10.0/publish .

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "sample-dotnet-app.dll"]
