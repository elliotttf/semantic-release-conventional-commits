'use strict';

const parser = require('conventional-commits-parser').sync;

/**
 * Determine the type of release to create based on a list of commits.
 *
 * @param {Object} [config={}] semantic-release configuration
 * @param {Object} options semantic-release options
 * @param {Array} options.commits array of commits
 *
 * @return {Promise}
 *   The release type to use.
 */
async function conventionalCommitsAnalyzer(config, { commits }) {
  let type = null;
  const {
    majorTypes = [],
    minorTypes = ['feat', 'chore'],
    patchTypes = ['fix', 'docs', 'refactor', 'style', 'test'],
    mergePattern = /^Merge pull request #(\d+) from (.*)$/,
    mergeCorrespondence = ['id', 'source'],
  } = config;

  const parserOptions = {
    mergePattern,
    mergeCorrespondence,
  };
  commits.map(commit => parser(commit.message, parserOptions))
    .filter(commit => commit)
    .every((commit) => {
      // TODO - handle squash merge commits with lots of sub-commits.

      if (
        majorTypes.indexOf(commit.type) !== -1 ||
        commit.header.match(/^[^!:]+!:/) ||
        commit.notes.find(note => note.title.toUpperCase().match(/BREAKING CHANGE/))
      ) {
        type = 'major';
        return false;
      }

      if (minorTypes.indexOf(commit.type) !== -1) {
        type = 'minor';
      }

      if (!type && patchTypes.indexOf(commit.type) !== -1) {
        type = 'patch';
      }

      return true;
    });

  return type;
}

module.exports = conventionalCommitsAnalyzer;
