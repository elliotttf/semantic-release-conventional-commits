# Semantic Release Conventional Commits

[![Build Status](https://travis-ci.org/elliotttf/semantic-release-conventional-commits.svg?branch=master)](https://travis-ci.org/elliotttf/semantic-release-conventional-commits)
[![Coverage Status](https://coveralls.io/repos/github/elliotttf/semantic-release-conventional-commits/badge.svg?branch=master)](https://coveralls.io/github/elliotttf/semantic-release-conventional-commits?branch=master)

This is a [semantic-release](https://www.npmjs.com/package/semantic-release)
plugin used to detect _all_ of the [conventional](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit) commit message styles.

The commit analyzer that ships with semantic-release only catches `fix` and
`feat` commits ([#12](https://github.com/semantic-release/commit-analyzer/issues/12)).

To use this plugin, add the following to `package.json`:

```json
"release: {
  "analyzeCommits": "semantic-release-conventional-commits"
}
```

## Configuration

By default, the behavior of this analyzer is very similar to the analyzer that
ships with semantic-release. In addition to `fix`, `feat` and `BREAKING CHANGE`
support, the following messages create the corresponding releases:

* minor
  * `feat`
  * `chore`
* patch
  * `fix`
  * `docs`
  * `refactor`
  * `style`
  * `test`

You can also configure additional behavior in package.json as follows:

```json
"release": {
  "analyzeCommits": {
    "path": "semantic-release-conventional-commits"
    "majorTypes": ["major", "breaking"],
    "minorTypes": ["feat", "minor"],
    "patchTypes": ["fix", "patch"],
    "mergePattern": "/^Merge pull request #(\d+) from (.*)$/",
    "mergeCorrespondence": "['id', 'source']"
  }
}
```

Which would cause major releases on messages with a `major` or `breaking` type,
minor releases on messages with a `feat` or `minor` type, and patch releases on
messages with a `fix` or `patch` type.

The `mergePattern` and `mergeCorrespondence` allow you to detect a merge commit
and use the first line of the body as the header to determine the release type.

Note: configuring the type behavior will override the default type detection behavior.

