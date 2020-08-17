"use strict";

const Validation = require("../index");
const assert = require("assert");

describe("Validation", function () {
  it("test Validation", function () {
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
    new Validation(config)
      .start({
        userName: 'lucas',
        passworld: 'password123456',
        phone: "13912345678",
        code: "1234",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(key, null);
        assert.deepStrictEqual(result, null);
      });

    // failure
    new Validation(config)
      .start({
        userName: 'lucas',
        passworld: 'password123456',
        phone: "",
        code: "",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, "The cell phone number cannot be empty");
        assert.deepStrictEqual(key, "phone");
      });
  });
});

describe("test notEmpty", function () {
  it("test notEmpty", function () {
    // successful
    new Validation({
      userName: {
        type: "notEmpty",
        message: "The user name cannot be empty",
      },
    })
      .start({
        userName: "lucas",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(key, null);
        assert.deepStrictEqual(result, null);
      });
    //failure
    new Validation({
      userName: {
        type: "notEmpty",
        message: "The user name cannot be empty",
      },
    })
      .start({
        userName: "",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, "The user name cannot be empty");
      });
  });
});

describe("test length", function () {
  it("test length", function () {
    // successful
    new Validation({
      userName: {
        type: "length",
        value: [5, 10],
        message: "The length is 5-10 characters",
      },
    })
      .start({
        userName: "lucas",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(key, null);
        assert.deepStrictEqual(result, null);
      });
    //failure
    new Validation({
      userName: {
        type: "length",
        value: [5, 10],
        message: "The length is 5-10 characters",
      },
    })
      .start({
        userName: "a",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, "The length is 5-10 characters");
      });
  });
});

describe("test notEqual", function () {
  it("test notEqual", function () {
    // successful
    new Validation({
      number: {
        type: "notEqual",
        value: "10",
        message: "not equal",
      },
    })
      .start({
        number: "10",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(key, null);
        assert.deepStrictEqual(result, null);
      });
    //failure
    new Validation({
      number: {
        type: "notEqual",
        value: "10",
        message: "not equal",
      },
    })
      .start({
        number: 10,
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, "not equal");
      });
  });
});

describe("test phone", function () {
  it("test phone", function () {
    // successful
    new Validation({
      phoneNumber: {
        type: "phone",
        message: "Incorrect phone number format",
      },
    })
      .start({
        phoneNumber: "13912345678",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(key, null);
        assert.deepStrictEqual(result, null);
      });
    //failure
    new Validation({
      phoneNumber: {
        type: "phone",
        message: "Incorrect phone number format",
      },
    })
      .start({
        phoneNumber: "131",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, "Incorrect phone number format");
      });
  });
});

describe("test email", function () {
  it("test email", function () {
    // successful
    new Validation({
      email: {
        type: "email",
        message: "Email format error",
      },
    })
      .start({
        email: "helloWorld@gmail.com",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(key, null);
        assert.deepStrictEqual(result, null);
      });
    //failure
    new Validation({
      email: {
        type: "email",
        message: "Email format error",
      },
    })
      .start({
        email: "aaa",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, "Email format error");
      });
  });
});

describe("test IDCard", function () {
  it("test IDCard", function () {
    // successful
    new Validation({
      id: {
        type: "IDCard",
        message: "The id card format is incorrect",
      },
    })
      .start({
        id: "110101199003074258",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(key, null);
        assert.deepStrictEqual(result, null);
      });
    //failure
    new Validation({
      id: {
        type: "IDCard",
        message: "The id card format is incorrect",
      },
    })
      .start({
        id: "123123",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, "The id card format is incorrect");
      });
  });
});

describe("test URL", function () {
  it("test URL", function () {
    // successful
    new Validation({
      url: {
        type: "URL",
        message: "Incorrect URL format",
      },
    })
      .start({
        url: "https://www.google.com",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(key, null);
        assert.deepStrictEqual(result, null);
      });
    // successful
    new Validation({
      url: {
        type: "URL",
        message: "Incorrect URL format",
      },
    })
      .start({
        url: "https://google.com",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(key, null);
        assert.deepStrictEqual(result, null);
      });
    // successful
    new Validation({
      url: {
        type: "URL",
        message: "Incorrect URL format",
      },
    })
      .start({
        url: "http://google.com",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, null);
        assert.deepStrictEqual(key, null);
        assert.deepStrictEqual(result, null);
      });
    //failure
    new Validation({
      url: {
        type: "URL",
        message: "Incorrect URL format",
      },
    })
      .start({
        url: "https",
      })
      .then(({ error, key, result }) => {
        assert.deepStrictEqual(error, "Incorrect URL format");
      });
  });
});
