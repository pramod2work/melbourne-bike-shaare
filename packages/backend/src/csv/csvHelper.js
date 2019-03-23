const fastCsv = require('fast-csv');

async function importCsv(importFilePath) {
  const options = {
    headers: true,
    ignoreEmpty: true,
  };
  const results = [];
  return new Promise((resolve, reject) => {
    fastCsv
      .fromPath(importFilePath, options)
      .on('data', data => {
        results.push(data);
      })
      .on('error', reject)
      .on('end', () => {
        resolve(results);
      });
  });
}

module.exports = {
  importCsv,
};
