# Test

This repository purpose is to reproduce the following compilation error in Angular:

```bash
Error: Content and Map of this Source is not available (only size() is supported)
    at SizeOnlySource._error (/home/arturo/Documentos/code/angular-bug/angular-bug/node_modules/webpack-sources/lib/SizeOnlySource.js:16:10)
    at SizeOnlySource.buffer (/home/arturo/Documentos/code/angular-bug/angular-bug/node_modules/webpack-sources/lib/SizeOnlySource.js:30:14)
    at _isSourceEqual (/home/arturo/Documentos/code/angular-bug/angular-bug/node_modules/@angular-devkit/build-angular/node_modules/webpack/lib/util/source.js:21:51)
    at isSourceEqual (/home/arturo/Documentos/code/angular-bug/angular-bug/node_modules/@angular-devkit/build-angular/node_modules/webpack/lib/util/source.js:43:17)
    at Compilation.emitAsset (/home/arturo/Documentos/code/angular-bug/angular-bug/node_modules/@angular-devkit/build-angular/node_modules/webpack/lib/Compilation.js:4411:9)
    at /home/arturo/Documentos/code/angular-bug/angular-bug/node_modules/@angular-devkit/build-angular/node_modules/webpack/lib/Compiler.js:647:23
    at /home/arturo/Documentos/code/angular-bug/angular-bug/node_modules/@angular-devkit/build-angular/node_modules/webpack/lib/Compiler.js:1349:17
    at eval (eval at create (/home/arturo/Documentos/code/angular-bug/angular-bug/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:13:1)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)

Node.js v22.9.0

```

My machine specifications:
- OS: Linux Mint 20.3, Kernel: 5.15.0-117-generic;
- Angular-cli version: 18.2.1;
- Node version: 22.9.0;
- Npm version: 10.8.3.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.5.

# Bug reproduction

1. Run `ng serve`;
2. Alter something in `app.component.html` like adding a `!` in the end of a phrase;
3. Wait angular reload project;
4. Stop process with `ctrl + c`;
5. Run `ng serve` again;
6. Wait between 2 to 10 seconds for the erro to appear.

Following this exact steps makes temporary solutions like "erasing `.angular` file" of cleaning its cache useless.


# What stops the error from occurring

1. **Removing the `package-lock.json` and running `npm i`**;
2. Removing the component `test-one`, leaving the project with only one component, `app`;
3. Removing the `@font-face` import in `styles/styles.scss` together with its reference at line 23 of the same file;
4. Removing the line `aot: true` (`projects.archtitect.options.aot`) from the `angular.json` file;

# Analysis

### `package-lock.json` file

People on the same team with different OSs generating the `package-lock.json` and using it may be one way to encounter this bug. 

In the project that I work I erased the `package-lock.json` and generated it again with `npm i`. The diff shows:
- Several sub-libraries of `node_modules/@esbuild/` being removed:
  - `aix-ppc64`, `android-arm`, `android-arm64`, `android-x64`, `darwin-arm64`, `darwin-x64`, `freebsd-arm64`, `freebsd-x64`, `linux-arm`, `linux-arm64`, `linux-ia32`, `linux-loong64`, `linux-mips64el`, `linux-ppc64`, `linux-riscv64`, `linux-s390x`, `netbsd-x64`, `openbsd-arm64`, `openbsd-x64`, `sunos-x64`, `win32-arm64`, `win32-ia32`, `win32-x64`;
  - Only `linux-x64` was kept.
  - The same occurs with `node_modules/@lmdb/` leaving only `lmdb-linux-x64`, `node_modules/@nx/` leaving only `nx-linux-x64-gnu`, `node_modules/@rollup` leaving only `rollup-linux-x64-gnu`, `node_modules/vite/node_modules/@esbuild` leaving only `linux-x64`;
- `node_modules/@msgpackr-extract/msgpackr-extract-win32-x64` was removed;
-  `node_modules/fsevents` was removed;
 


# Reports of this bug:
- [Stackoverflow (2023)](https://stackoverflow.com/questions/66131297/content-and-map-of-this-source-is-not-available-error-after-upgrading-to-webpa/79008766#79008766);
- [Stackoverflow (2022)](https://stackoverflow.com/questions/70066980/angular-12-content-and-map-of-this-source-is-not-available-only-size-is-suppo/79008740#79008740);
- [Angular issue (2022, reopen of 2021)](https://github.com/angular/angular-cli/issues/24384#issuecomment-1346164431);
- [Angular issue (2021)](https://github.com/angular/angular-cli/issues/22237);
- [Webpack issue (2021)](https://github.com/webpack/webpack/issues/14840#issuecomment-980005874).
