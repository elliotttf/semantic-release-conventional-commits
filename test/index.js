'use strict';

const analyzer = require('../');

module.exports = {
  noConfig: {
    major(test) {
      test.expect(1);
      analyzer(
        {},
        {
          commits: [{
            hash: '',
            message: 'feat(thing): Added the thing\nBREAKING CHANGE: api change',
          }],
        })
        .then((type) => {
          test.equal(type, 'major', 'Unexpected type for `BREAKING CHANGE:`.');
          test.done();
        });
    },
    minor(test) {
      test.expect(1);
      analyzer(
        {},
        { commits: [{ hash: '', message: 'feat(thing): Added the thing' }] })
        .then((type) => {
          test.equal(type, 'minor', 'Unexpected type.');
          test.done();
        });
    },
    patch(test) {
      test.expect(1);
      analyzer(
        {},
        { commits: [{ hash: '', message: 'fix(thing): Added the thing' }] })
        .then((type) => {
          test.equal(type, 'patch', 'Unexpected type.');
          test.done();
        });
    },
  },
  majorConfig(test) {
    test.expect(1);
    analyzer(
      { majorTypes: ['break'] },
      { commits: [{ hash: '', message: 'break(thing): Added the thing' }] })
      .then((type) => {
        test.equal(type, 'major', 'Unexpected type.');
        test.done();
      });
  },
  minorConfig(test) {
    test.expect(1);
    analyzer(
      { minorTypes: ['minor'] },
      { commits: [{ hash: '', message: 'minor(thing): Added the thing' }] })
      .then((type) => {
        test.equal(type, 'minor', 'Unexpected type.');
        test.done();
      });
  },
  patchConfig(test) {
    test.expect(1);
    analyzer(
      { patchTypes: ['patch'] },
      { commits: [{ hash: '', message: 'patch(thing): Added the thing' }] })
      .then((type) => {
        test.equal(type, 'patch', 'Unexpected type.');
        test.done();
      });
  },
};
