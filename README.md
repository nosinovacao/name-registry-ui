# NAME Registry UI: Web interface for the [NAME Registry API](https://github.com/nosinovacao/name-registry-api)
[![Travis Build Status](https://travis-ci.org/nosinovacao/name-registry-ui.svg?branch=master)](https://travis-ci.org/nosinovacao/name-registry-ui)
[![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/kqfp67ubcilis6xg/branch/master?svg=true)](https://ci.appveyor.com/project/nosinovacao/name-registry-ui/branch/master)
[![Docker Pulls](https://img.shields.io/docker/pulls/nosinovacao/name-registry-ui.svg)](https://hub.docker.com/r/nosinovacao/name-registry-ui/)

NAME Registry UI provides a Web Interface for the [NAME Registry API](https://github.com/nosinovacao/name-registry-api). It provides query capabilities over the registered services.

Its goal is to provide users with human-readable information regarding services and its dependencies in a queriable way.

*Please note that an instance of the Registry API is required.*

### Features
* Single Page (No reloads)
* Mobile Friendly

## Getting Starded
### Running on docker
The Registry UI, just like the API, is provided as a docker image, to spin up a container listening on the port 8080 use the following command.
```bash
docker run -d \
    -e "ConnectionStrings:RegistryApiUrl=http://name-registry-machine:80" \
    -p 8080:5000 \
    nosinovacao/name-registry-ui
```

The environment variable `ConnectionStrings:RegistryApiUrl` sets the external location of the Registry API.

Please note, that although the Registry API URL is specified in the container startup it is necessary that the URL is accessible by the end user.

## Building and testing
We define our build using [Cake](https://github.com/cake-build/cake/), this allows us to define a common ground for developers on different operating systems, but it requires .Net 4.5 or Mono 4.2.3, so make sure you have those dependencies setup.

Bootstrap scripts are provided for both Windows and Linux environments.

To build and run unit tests on Windows execute the command:

```cmd
powershell ./build.ps1
```

To build and run unit tests on Linux execute the command:

```bash
./build.sh
```

## Contributing
We really appreciate your interest in contributing to the NAME Registry UI. 👍

All we ask is that you follow some simple guidelines, so please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

Thank you, [contributors](https://github.com/nosinovacao/name-registry-ui/graphs/contributors)!

## License
Copyright © NOS Inovação.

This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.