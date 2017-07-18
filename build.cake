#addin nuget:https://www.nuget.org/api/v2/?package=Cake.Docker
#addin nuget:https://www.nuget.org/api/v2/?package=Cake.FileHelpers
#addin nuget:https://www.nuget.org/api/v2/?package=Cake.Docker
#addin nuget:https://www.nuget.org/api/v2/?package=Cake.AssemblyInfoReflector

//////////////////////////////////////////////////////////////////////
// ARGUMENTS
//////////////////////////////////////////////////////////////////////

var target = Argument("target", "Full-Build");
var configuration = Argument("configuration", "Release");

var dockerPushCurrentVersion = HasArgument("dockerPushCurrentVersion");
var dockerPushAdditionalTag = Argument<string>("dockerPushAdditionalTag", null);


//////////////////////////////////////////////////////////////////////
// PREPARATION
//////////////////////////////////////////////////////////////////////

// Define directories.
var outputDir = Directory("Output/");
var artifactsDir = outputDir + Directory("Artifacts/");

//////////////////////////////////////////////////////////////////////
// TASKS
//////////////////////////////////////////////////////////////////////

Task("Clean")
    .Does(() =>
    {
        CleanDirectory(artifactsDir);
    });

Task("Restore-NuGet-Packages")
    .Does(() =>
    {
        DotNetCoreRestore("NAME.Registry.UI.sln");
    });

Task("Build")
    .IsDependentOn("Clean")
    .IsDependentOn("Restore-NuGet-Packages")
    .Does(() =>
    {
        var dotNetBuildConfig = new DotNetCoreBuildSettings() {
            Configuration = configuration
        };

        DotNetCoreBuild("NAME.Registry.UI.sln", dotNetBuildConfig);
    });
        
Task("Publish-Website")
    .IsDependentOn("Clean")
    .IsDependentOn("Restore-NuGet-Packages")
    .Does(() => 
    {
        var registryUiLocation = artifactsDir + Directory("NAME.Registry.UI/");

        var settings = new DotNetCorePublishSettings {
            Configuration = configuration,
            OutputDirectory = registryUiLocation
        };

        DotNetCorePublish("./src/NAME.Registry.UI", settings);

        Zip("./Output/Artifacts", "./Output/Artifacts/NAME.Registry.UI.zip", "./Output/Artifacts/**/*");
    });

Task("Docker-Build-AND-Push")
    .Does(() => 
    {
        var registryUiLocation = artifactsDir + Directory("NAME.Registry.UI/");
        
        var reflectedAssemblyInfo = ReflectAssemblyInfo(registryUiLocation + File("NAME.Registry.UI.dll"));
        var currentVersion = reflectedAssemblyInfo.AssemblyFileVersion;
        
        var dockerImage = "nosinovacao/name-registry-ui";
        var tags = new List<string>();

        if (dockerPushCurrentVersion)
            tags.Add(dockerImage + ":" + currentVersion);

        if (!string.IsNullOrWhiteSpace(dockerPushAdditionalTag))
            tags.Add(dockerImage + ":" + dockerPushAdditionalTag);

        var buildSettings = new DockerBuildSettings() {
            Tag = tags.ToArray()
        };

        DockerBuild(buildSettings, registryUiLocation);
    
        foreach(var tag in tags) {
            DockerPush(tag);
        }
    });


//////////////////////////////////////////////////////////////////////
// TASK TARGETS
//////////////////////////////////////////////////////////////////////


Task("Build-AND-Test")
    .IsDependentOn("Build");

Task("AppVeyor")
    .IsDependentOn("Build");

Task("TravisCI")
    .IsDependentOn("Build")
    .IsDependentOn("Publish-Website");

Task("Default")
    .IsDependentOn("Build-AND-Test");
    
//////////////////////////////////////////////////////////////////////
// EXECUTION
//////////////////////////////////////////////////////////////////////

RunTarget(target);