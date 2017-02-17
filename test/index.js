'use strict';

const analyzer = require('../');

module.exports = {
  noConfig: {
    major(test) {
      test.expect(1);
      analyzer(
        {},
        { commits: ['feat(thing): Added the thing\nBREAKING CHANGE: api change'] },
        (err, type) => {
          test.equal(type, 'major', 'Unexpected type.');
          test.done();
        });
    },
    minor(test) {
      test.expect(1);
      analyzer(
        {},
        { commits: ['feat(thing): Added the thing'] },
        (err, type) => {
          test.equal(type, 'minor', 'Unexpected type.');
          test.done();
        });
    },
    patch(test) {
      test.expect(1);
      analyzer(
        {},
        { commits: ['fix(thing): Added the thing'] },
        (err, type) => {
          test.equal(type, 'patch', 'Unexpected type.');
          test.done();
        });
    },
  },
};

