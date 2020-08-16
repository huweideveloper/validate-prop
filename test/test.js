
'use strict';

const Validation = require('../index');
const assert = require('assert');


describe('Validation', function() {
  it('test Validation', function() {
    const config = {
      userId: {
        type: "length",
        value: [0, 10],
        message: 'userId error',
      },
      email: [
        {
          type: "notEmpty",
          message: 'Mail is not empty',
        },
        {
          type: "isEmail",
          message: ' Incorrect mail format',
        },
      ]
    };
    const model = {
      userId: 'abc123',
      email: 'helloWrold@gmail.com',
    }
    new Validation(config).start(model).then(({ error, key, result }) => {
      assert.deepStrictEqual(error, null);
    })

  });
});
