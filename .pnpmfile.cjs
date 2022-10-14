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
