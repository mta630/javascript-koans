var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      productsICanEat = _.chain(products)
          .filter(function(product) {return !product.containsNuts})}
          .filter(function(product) {return _all(product.ingredients, function(ingredient){return ingredient !== "mushrooms"})}))
          .value();

      /* solve using filter() & all() / any() */

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.chain(
        _.range(1000))
        .filter(function (n){return (n % 3 === 0) || (n % 5 === 0)})
        .reduce(function (x, y) {return x += y})
        .value();   /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = {};

      _.chain(products)
    .map(function (product) { return product.ingredients })
    .flatten()
    .reduce(function (memo, ingredientName){ingredientCount[ingredientName] = (ingredientCount[ingredientName] || 0) + 1})
    .value();


    expect(ingredientCount['mushrooms']).toBe(FILL_ME_IN);
  });

  /*********************************************************************************/

  it("should find the largest prime factor of a composite number", function () {
        
      function isPrime(number){
        for (var i = 2; i < number; i ++){
          if (number % i === 0){
            return false;
          }
        }
        return true;
      }

      function largestPrime(num){
        var result = _.chain(
              _.range(num, 0, -1))
              .filter(function (x) { return num % x === 0})
              .filter(function (x) { return isPrime(x) })
              .first()
              .value()

        return result;
      }

      expect(largestPrime(50)).toBe(5);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    

      function isPalindrome(num){
        if (num.toString() === num.toString().split('').reverse().join('')){
          return true;
        } else {
          return false;
        }
      }

      var products = [];

      for (let i = 100; i <= 999; i ++){
        for (let j = 100; j <= 999; j ++){
          products.push(i * j);
        }
      }


      function largestPalindrome() {
        var result = _.chain(products)
            .filter(function (x) { return isPalindrome(x) })
            .sortBy(function (x) { return x })
            .last()
            .value();

        return result;
      }

      expect(largestPalindrome()).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
      function findSmallestNumber(){
  
          let divisors = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11];
          let testPassed;
          let num = divisors[0];

          do {
            num ++;
            testPassed = false;

            for (let n of divisors){
              if (num % n){  
                testPassed = true;
                 break;
              }
            }
          } while (testPassed)

          return num;
        }

        expect(findSmallestNumber()).toBe(232792560);
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
      function sumOfSquares(min,max){
            return _.chain(
              _.range(min,max + 1))
               .map(function(value){return value ** 2;})
               .reduce(function(sum,value){return sum + value;}, 0)
               .value();
      }

    function squareOfSums(min, max){
            return _.chain(
             _.range(min, max +1))
              .reduce(function (sum, value) { return sum += value })
              .value() ** 2;
    }

    function difference(min, max) {
      return squareOfSums(min, max) - sumOfSquares(min, max);
    }

    expect(difference(1,10)).toBe(2640)
  });

  it("should find the 10001st prime", function () {
    
    function isPrime(num){
      for (let i = 2; i < num; i ++){
        if (num % i === 0){
          return false;
        }
      }
      return true;
    }

    function getTargetPrime(target) {
      let totalPrime = 0;
      let result = 0;
  
      do {
      result ++;

      if (isPrime(result)){
        totalPrime ++;
      }

      } while (totalPrime <= target)

      return result;
    }

    expect(getTargetPrime(10001)).toBe(104743);
  });
  */
});
