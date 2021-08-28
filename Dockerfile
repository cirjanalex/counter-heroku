FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash \
    && apt-get install nodejs -yq

COPY . .
RUN dotnet publish  -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-env /app/out .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet counter.dll
#ENTRYPOINT ["dotnet", "counter.dll"]