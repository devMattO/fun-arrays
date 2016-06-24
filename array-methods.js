var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/

var hundredThousandairs = null;

function getAccounts( element, index, array ) {
  return dataset.bankBalances[ index ].amount > 100000;
}
hundredThousandairs = dataset.bankBalances.filter( getAccounts );

/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/

var roundedDollar = null;

function newKey( element, index, array ) {
  dataset.bankBalances[ index ].rounded =  Math.round( dataset.bankBalances[ index ].amount );
  return dataset.bankBalances[ index ];
}
roundedDollar = dataset.bankBalances.map( newKey );



/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = null;

function roundingCents( element, index, array ) {
  var numToTheTenth = parseFloat( parseFloat( element.amount ).toFixed( 1 ) );
  return {
    amount: numToTheTenth,
    state: element.state
  };
}
roundedDime = dataset.bankBalances.map( roundingCents );



// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = null;

function totalSum( previousValue, currentValue, el, i, a ) {
  previousValue = parseFloat( previousValue );
  currentValue = parseFloat( currentValue.amount );
  return previousValue + currentValue;
}
sumOfBankBalances = Math.round( dataset.bankBalances.reduce( totalSum, 0 ) * 100 ) / 100;


/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfInterests = dataset.bankBalances.filter( function( element, index, array ) {
  return [ 'WI', 'IL', 'WY', 'OH', 'GA', 'DE' ].indexOf( element.state ) >= 0;
} ).map( function( element, index, array ){
  return parseFloat(Math.round( element.amount * 18.9 ) / 100);
} ).reduce( function( previousValue, currentValue, element, index, array ) {
  return previousValue + currentValue;
}, 0);

sumOfInterests = Math.round(sumOfInterests * 100) / 100;


/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfHighInterests = null;

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = null;

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;

/*
  set higherStateSums to be the sum of
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;

/*
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};