<p align="center">
  <a href="https://github.com/lyra/embedded-form-examples/actions/workflows/playwright.yml"><img alt="github-status-action status" 
    src="https://github.com/lyra/embedded-form-examples/actions/workflows/playwright.yml/badge.svg"></a>
</p>

# Embedded Form Examples

This is a repository of all the different kinds of integrations that can be done using [Lyra's JavaScript library][GlueLink].

## Examples

- [custom/errors/errorsByField][custom/errors/errorsByField]: When there is an error on a specific field, displays the error on an element behind it.

## Installation

The examples included are fully functional, in order to run them, just execute the following:

### Build

```Shell
npm install
npm run build
```

### API Server

The payment application needs an API to generate the test payment tokens. It can be set it up with:

```Shell
npm run server
```

### Static Server

To serve the examples, set up the static server with:

```Shell
npm run e2e:server
```

After that you can access to the examples on:

http://127.0.0.1:8080/[examplepath]

## Tests

Tu run the included e2e tests:

```Shell
npm run test
```

[GlueLink]: https://github.com/lyra/embedded-form-glue
[custom/errors/errorsByField]: https://github.com/lyra/embedded-form-examples/tree/main/examples/custom/errors/errorsByField