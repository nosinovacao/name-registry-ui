# Contributing
First of all, thank you for considering contributing to the NAME Registry UI, we love contributions!

## Prerequisites
By contributing, you assert that:
* The contribution is your own original work.
* You have the right to assign the copyright for the work (it is not owned by your employer, or you have been given copyright assignment in writing).

## Code
### Code Style for .Net
We use the [normal .NET coding guidelines](https://docs.microsoft.com/en-us/dotnet/standard/design-guidelines/) as a base for the coding style, with some changes such as:
* Use 4 spaces for indentation (no tabs)
* Use `camelCase` for private fiels (do not use `_` )
* Use `this.` when accessing instance members
* Always specify member visibility, even if it's the default (i.e. `private string _foo;` not `string _foo;`)
* All public members must be documented

A StyleCop ruleset is included with the project, and the analyser is run for every build. Any StyleCop violation is considered as a Warning. Pull requests with incorrect styling will be rejected.

### Code Style for TypeScript
We use the [TypeScript coding guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines) for our Angular2 files.
<!-- 
### Unit Tests
Make sure to run all unit tests before creating a pull request. Any new code, including bugfixes, should have unit tests.

To build and run the unit tests, run the build bootstrapper.

On Windows:

    powershell ./build.ps1

On Linux:

    ./build.sh

Please note that the full unit tests suite will only run on Windows. -->

## Contributing Process
Fork, then clone the repo:

    git clone git@github.com:your-username/name-registry-ui.git

[Make sure the tests pass.](#unit-tests)

Make your changes, including tests for the changes you made.

Make sure the solution builds without warnings and tests pass again.

Push to your fork and [submit a pull request](https://github.com/nosinovacao/name-registry-ui/compare/
).

Some things that will increase the chance that your pull request is accepted:

* Write tests.
* Follow our [code style](#code-style).
* Write a good commit message.