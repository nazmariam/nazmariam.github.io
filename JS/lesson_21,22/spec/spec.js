var pow = require('../js/dist/pow.js');

describe("pow", function() {

	// 1st test

  it("math pow (positive rate)", function() {
  	// prepare
  	var result;
  	// act
  	result = pow(8,2);
  	// assert
    expect(result).not.toBe.Undefined;
  });

	// 2nd test

  it("math pow (positive rate)", function() {
  	// prepare
  	var result;
  	// act
  	result = pow(5,2);
  	// assert
    expect(result).toEqual(25);
  });

 	// 3d test

  it("math pow (negative rate)", function() {
  	// prepare
  	var result;
  	// act
  	result = pow(5,-2);
  	// assert
    expect(result).toBe(0.04);
  });
});