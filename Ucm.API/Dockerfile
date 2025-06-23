# ------------------------
# Stage 1: Build
# ------------------------
    FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
    WORKDIR /src
    
    # Copy solution and projects
    COPY . .
    
    # Restore & publish
    RUN dotnet restore "Ucm.API/Ucm.API.csproj"
    RUN dotnet publish "Ucm.API/Ucm.API.csproj" -c Release -o /app/publish
    
    # ------------------------
    # Stage 2: Run
    # ------------------------
    FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
    WORKDIR /app
    COPY --from=build /app/publish .
    
    # Expose port used in docker-compose (port 80)
    EXPOSE 8080
    
    # Start the app
    ENTRYPOINT ["dotnet", "Ucm.API.dll"]
    