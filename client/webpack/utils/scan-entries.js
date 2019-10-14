const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const helpers = require('./helper');

const readdirP = promisify(fs.readdir);
const statP = promisify(fs.stat);


async function findIndexDotJs(root) {
  const filenames = await readdirP(root);
  const subdirs = [];
  for(let i = 0; i < filenames.length; i++) {
    const fname = filenames[i];
    const fpath = path.join(root, fname);
    const fstats = await statP(fpath);

    if (fstats.isFile() && /index.[tj]sx?$/i.test(fname)) {
      return [path.resolve(fpath)];
    }

    if (fstats.isDirectory()) {
      subdirs.push(fpath);
    }
  }
  let indexDotJsFiles = [];
  for (let i = 0; i < subdirs.length; i++) {
    const indexDotJs = await findIndexDotJs(subdirs[i]);
    if (indexDotJs) {
      indexDotJsFiles = indexDotJsFiles.concat(indexDotJs);
    }
  }
  return indexDotJsFiles;
}

function scanEntriesInDirectory(root) {
  const from = path.resolve(root);
  return async () => {
    const files = await findIndexDotJs(root);
    const entries = files.reduce((entries, p) => {
      const relPath = path.relative(from, p);
      const key = path.dirname(relPath);
      entries[key] = p; 
      return entries;
    }, {});
    const keys = Object.keys(entries);
    return keys.reduce((acc, k) => {
      acc[k] = entries[k];
      return acc;
    }, {})
  }
}

function scanEntries(roots) {
  if (typeof roots === 'string') {
    roots = [roots];
  }

  if (Array.isArray(roots)) {
    const expandedRoots = [
      ...new Set(
        roots.reduce((acc, pattern) => {
          const filenames = glob.sync(pattern, {
            cwd: helpers.getAppRoot(),
            absolute: true,
          });
          acc = acc.concat(filenames);
          return acc;
        }, [])
      )
    ]

    return () => Promise.all(expandedRoots.map(r => scanEntriesInDirectory(r)())).then(entries => {
      const mergedEntries = entries.reduce((acc, e) => {
        return Object.assign(acc, e);
      })
      return mergedEntries;
    }).catch(err => {
      console.log(err);
    })
  }

  return () => Promise.resolve([]);
}

module.exports = scanEntries;
