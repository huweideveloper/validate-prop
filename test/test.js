"use strict";

const Validate = require("../src/index");
const assert = require("assert");

describe("Validate", function () {
  it("test Validate", function () {
    const config = {
      userName: {
          type: 'notEmpty',
          message: 'The user name cannot be empty',
      },
      passworld: {
          type: 'notEmpty',
          message: 'The passworld cannot be empty',
      },
      phone: {
          message: "Incorrect phone number format",
          test: (value, key, rule) => {
              if (!value) {
                  return "The cell phone number cannot be empty";
              }
              const isPhone = /^1[3456789]\d{9}$/.test(value);
              if (isPhone) {
                  return null;
              } else {
                  return "Incorrect phone number format";
              }
          },
      },
      code: [{
          type: "notEmpty",
          message: "The captcha cannot be empty",
      },{
          type: "length",
          value: [4, 6],
          message: "The captcha length is between 4 and 6",
      }],
  };

    // successful
    new Validate(config)
      .start({
        userName: 'lucas',
        passworld: 'password123456',
        phone: "13912345678",
        code: "1234",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(list, null);
      });

    // failure
    new Validate(config)
      .start({
        userName: 'lucas',
        passworld: 'password123456',
        phone: "",
        code: "",
      })
      .then(({ error }) => {
        assert.deepStrictEqual(error, "The cell phone number cannot be empty");
      });
  });
});

describe("test notEmpty", function () {
  it("test notEmpty", function () {
    // successful
    new Validate({
      userName: {
        type: "notEmpty",
        message: "The user name cannot be empty",
      },
    })
      .start({
        userName: "lucas",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(list, null);
      });
    //failure
    new Validate({
      userName: {
        type: "notEmpty",
        message: "The user name cannot be empty",
      },
    })
      .start({
        userName: "",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, "The user name cannot be empty");
      });
  });
});

describe("test length", function () {
  it("test length", function () {
    // successful
    new Validate({
      userName: {
        type: "length",
        value: [5, 10],
        message: "The length is 5-10 characters",
      },
    })
      .start({
        userName: "123415",
      })
      .then(({ error, list }) => {
        console.log("error====>"+error)
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(list, null);
      });
    //failure
    new Validate({
      userName: {
        type: "length",
        value: [5, 10],
        message: "The length is 5-10 characters",
      },
    })
      .start({
        userName: "a",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, "The length is 5-10 characters");
      });
    //failure
    new Validate({
      userName: {
        type: "length",
        value: [],
        message: "The length is 5-10 characters",
      },
    })
      .start({
        userName: "a",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, "The length is 5-10 characters");
      });
  });
});

describe("test notEqual", function () {
  it("test notEqual", function () {
    // successful
    new Validate({
      number: {
        type: "notEqual",
        value: "10",
        message: "not equal",
      },
    })
      .start({
        number: "10",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(list, null);
      });
    //failure
    new Validate({
      number: {
        type: "notEqual",
        value: "10",
        message: "not equal",
      },
    })
      .start({
        number: 10,
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, "not equal");
      });
  });
});

describe("test phone", function () {
  it("test phone", function () {
    // successful
    new Validate({
      phoneNumber: {
        type: "phone",
        message: "Incorrect phone number format",
      },
    })
      .start({
        phoneNumber: "13912345678",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(list, null);
      });
    //failure
    new Validate({
      phoneNumber: {
        type: "phone",
        message: "Incorrect phone number format",
      },
    })
      .start({
        phoneNumber: "131",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, "Incorrect phone number format");
      });
  });
});

describe("test email", function () {
  it("test email", function () {
    // successful
    new Validate({
      email: {
        type: "email",
        message: "Email format error",
      },
    })
      .start({
        email: "helloWorld@gmail.com",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(list, null);
      });
    //failure
    new Validate({
      email: {
        type: "email",
        message: "Email format error",
      },
    })
      .start({
        email: "aaa",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, "Email format error");
      });
  });
});

describe("test IDCard", function () {
  it("test IDCard", function () {
    // successful
    new Validate({
      id: {
        type: "IDCard",
        message: "The id card format is incorrect",
      },
    })
      .start({
        id: "110101199003074258",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(list, null);
      });
    //failure
    new Validate({
      id: {
        type: "IDCard",
        message: "The id card format is incorrect",
      },
    })
      .start({
        id: "123123",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, "The id card format is incorrect");
      });
  });
});

describe("test URL", function () {
  it("test URL", function () {
    // successful
    new Validate({
      url: {
        type: "URL",
        message: "Incorrect URL format",
      },
    })
      .start({
        url: "https://www.google.com",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(list, null);
      });
    // successful
    new Validate({
      url: {
        type: "URL",
        message: "Incorrect URL format",
      },
    })
      .start({
        url: "https://google.com",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(list, null);
      });
    // successful
    new Validate({
      url: {
        type: "URL",
        message: "Incorrect URL format",
      },
    })
      .start({
        url: "http://google.com",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(list, null);
      });
    //failure
    new Validate({
      url: {
        type: "URL",
        message: "Incorrect URL format",
      },
    })
      .start({
        url: "https",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, "Incorrect URL format");
      });
  });
});



describe("test enum", function () {
  it("test enum", function () {
    // successful
    new Validate({
      status: {
        type: 'enum',
        value: [-1,0,1,2],
        message: "error",
      },
    })
      .start({
        status: 1,
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(list, null);
      });

      new Validate({
        status: {
          type: 'enum',
          value: {
            status1: 1,
            status2: 2,
          },
          message: "error",
        },
      })
        .start({
          status: 2,
        })
        .then(({ error, list }) => {
          assert.deepStrictEqual(error, null);
          assert.deepStrictEqual(list, null);
        });

      new Validate({
        status: {
          type: 'enum',
          value: [-1,0,1,2],
          message: "error",
        },
      })
        .start({
          status: 10,
        })
        .then(({ error, list }) => {
          assert.deepStrictEqual(error, 'error');
        });
    });
});