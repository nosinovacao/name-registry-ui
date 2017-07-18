FROM microsoft/dotnet:1.1.1-runtime
        
RUN apt-get update        
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -        
RUN apt-get install -y build-essential nodejs

COPY . /app

WORKDIR /app

ENV ASPNETCORE_URLS=http://0.0.0.0:5000

EXPOSE 5000

ENTRYPOINT ["dotnet", "NAME.Registry.Web.dll"]