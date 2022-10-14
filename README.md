# pnpm7-readpackage-file-repro

## Repro

This should install cleanly with pnpm@6 and fail with pnpm@7 with an error like this:

```
ENOENT  ENOENT: no such file or directory, open '/Volumes/git/walkerburgin/pnpm7-readpackage-file-repro/packages/foo-app/stash/FileSaver.js-eligrey-1.3.8.tgz'

This error happened while installing the dependencies of jspdf@1.5.3
```

## Notes

See `.pnpmfile.cjs`: 

```js
function readPackage(pkg) {
  if (pkg.name == "jspdf" && pkg.version == "1.5.3") {
    // jspdf takes a dependency on github.com/eligrey/FileSaver.js/e865e37af9f9947ddcced76b549e27dc45c1cb2e.
    // This corresponds to version 1.3.8. To avoid loading packages from GitHub, override the transitive dependency
    // to a vendored copy of the package in the `stash` directory.
    pkg.dependencies["file-saver"] = "file:stash/FileSaver.js-eligrey-1.3.8.tgz"
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
```

I'm not sure that using `readPackage()` like this was ever intended to work, but it does happen to work in pnpm `6.x.x`. I believe that the regression was
introduced by https://github.com/pnpm/pnpm/pull/4415.
