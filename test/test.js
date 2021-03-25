"use strict";

const validate = require("../index");
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
    validate(config,{
        userName: 'lucas',
        passworld: 'password123456',
        phone: "13912345678",
        code: "1234",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, '');
        assert.deepStrictEqual(list, null);
      });

    // failure
    validate(config,{
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
    validate({
      userName: {
        type: "notEmpty",
        message: "The user name cannot be empty",
      },
    },{
        userName: "lucas",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, '');
        assert.deepStrictEqual(list, null);
      });
    //failure
    validate({
      userName: {
        type: "notEmpty",
        message: "The user name cannot be empty",
      },
    },{
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
    validate({
      userName: {
        type: "length",
        value: [5, 10],
        message: "The length is 5-10 characters",
      },
    },{
        userName: "123415",
      })
      .then(({ error, list }) => {
        console.log("error====>"+error)
        assert.deepStrictEqual(error, '');
        assert.deepStrictEqual(list, null);
      });
    //failure
    validate({
      userName: {
        type: "length",
        value: [5, 10],
        message: "The length is 5-10 characters",
      },
    },{
        userName: "a",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, "The length is 5-10 characters");
      });
    //failure
    validate({
      userName: {
        type: "length",
        value: [],
        message: "The length is 5-10 characters",
      },
    },{
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
    validate({
      number: {
        type: "notEqual",
        value: "10",
        message: "not equal",
      },
    },{
        number: "10",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, '');
        assert.deepStrictEqual(list, null);
      });
    //failure
    validate({
      number: {
        type: "notEqual",
        value: "10",
        message: "not equal",
      },
    },{
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
    validate({
      phoneNumber: {
        type: "phone",
        message: "Incorrect phone number format",
      },
    },{
        phoneNumber: "13912345678",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, '');
        assert.deepStrictEqual(list, null);
      });
    //failure
    validate({
      phoneNumber: {
        type: "phone",
        message: "Incorrect phone number format",
      },
    },{
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
    validate({
      email: {
        type: "email",
        message: "Email format error",
      },
    },{
        email: "helloWorld@gmail.com",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, '');
        assert.deepStrictEqual(list, null);
      });
    //failure
    validate({
      email: {
        type: "email",
        message: "Email format error",
      },
    },{
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
    validate({
      id: {
        type: "IDCard",
        message: "The id card format is incorrect",
      },
    },{
        id: "110101199003074258",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, '');
        assert.deepStrictEqual(list, null);
      });
    //failure
    validate({
      id: {
        type: "IDCard",
        message: "The id card format is incorrect",
      },
    },{
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
    validate({
      url: {
        type: "URL",
        message: "Incorrect URL format",
      },
    },{
        url: "https://www.google.com",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, '');
        assert.deepStrictEqual(list, null);
      });
    // successful
    validate({
      url: {
        type: "URL",
        message: "Incorrect URL format",
      },
    },{
        url: "https://google.com",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, '');
        assert.deepStrictEqual(list, null);
      });
    // successful
    validate({
      url: {
        type: "URL",
        message: "Incorrect URL format",
      },
    },{
        url: "http://google.com",
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, '');
        assert.deepStrictEqual(list, null);
      });
    //failure
    validate({
      url: {
        type: "URL",
        message: "Incorrect URL format",
      },
    },{
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
    validate({
      status: {
        type: 'enum',
        value: [-1,0,1,2],
        message: "error",
      },
    },{
        status: 1,
      })
      .then(({ error, list }) => {
        assert.deepStrictEqual(error, '');
        assert.deepStrictEqual(list, null);
      });

      validate({
        status: {
          type: 'enum',
          value: {
            status1: 1,
            status2: 2,
          },
          message: "error",
        },
      },{
          status: 2,
        })
        .then(({ error, list }) => {
          assert.deepStrictEqual(error, '');
          assert.deepStrictEqual(list, null);
        });

      validate({
        status: {
          type: 'enum',
          value: [-1,0,1,2],
          message: "error",
        },
      },{
          status: 10,
        })
        .then(({ error, list }) => {
          assert.deepStrictEqual(error, 'error');
        });
    });
});