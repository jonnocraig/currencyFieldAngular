'use strict';

angular.module('liveInputApp')
  .factory('FormatOptionsFactory', function FormatOptionsFactory() {
    return {
      isNumber: /[0-9]/,
      prefix: '£',
      centsSeparator: '.',
      thousandsSeparator: ',',
      limit: 11,
      centsLimit: 10,
      maxValue: 100000000000 // 100B
    };
  })
  .factory('FormatUtil', ['FormatOptionsFactory', function (FormatOptionsFactory) {

      var decimalCount = -1,
        centsSeparator = FormatOptionsFactory.centsSeparator,
        limit = FormatOptionsFactory.limit,
        centsLimit = FormatOptionsFactory.centsLimit,
        isNumber = FormatOptionsFactory.isNumber,
        thousandsSeparator = FormatOptionsFactory.thousandsSeparator,
        prefix = FormatOptionsFactory.prefix,
        maxValue = FormatOptionsFactory.maxValue;

      var toNumbers = function (str) {
        var formatted = '',
          charVal,
          i,
          l,
          splitValue = [];
        
        decimalCount = -1;
        if (str.indexOf(centsSeparator) > -1) {
          splitValue = str.split(centsSeparator);
          decimalCount = splitValue[1].length;
        }

        for (i = 0, l = (str.length); i < l; i++) {
          charVal = str.charAt(i);
          if (charVal && charVal.match(isNumber)) {
            formatted = formatted + charVal;
          }
        }
        return formatted;
      };

      var currencyFormat = function (value) {
        var formatted = toNumbers(value),
          thousandsFormatted = '',
          thousandsCount = 0,
          charVal,
          centsVal,
          integerVal,
          hasDecimals = decimalCount > -1;

        if (hasDecimals) {
          centsVal = formatted.substring(formatted.length - decimalCount, formatted.length);
          integerVal = formatted.substring(0, formatted.length - decimalCount);
        } else {
          integerVal = formatted;
        }

        // limit user input
        if (integerVal.length > limit) {
          integerVal = integerVal.substr(0, limit);
        }
        if (centsVal && centsVal.length > centsLimit) {
          centsVal = centsVal.substr(0, centsLimit);
        }

        formatted = (hasDecimals === false) ? integerVal : integerVal + centsSeparator + centsVal;

        if (thousandsSeparator || $.trim(thousandsSeparator) !== '') {
          for (var j = integerVal.length; j > 0; j--) {
            charVal = integerVal.substr(j - 1, 1);
            thousandsCount++;
            if (thousandsCount % 3 === 0) {
              charVal = thousandsSeparator + charVal;
            }
            thousandsFormatted = charVal + thousandsFormatted;
          }
          if (thousandsFormatted.substr(0, 1) === thousandsSeparator) {
            thousandsFormatted = thousandsFormatted.substring(1, thousandsFormatted.length);
          }
          formatted = (hasDecimals === false) ? thousandsFormatted : thousandsFormatted + centsSeparator + centsVal;
        }
        
        if (prefix) {
          formatted = prefix + formatted;
        }
        return formatted;
      };
    
      function keyCheck(evt, elem) {
        var code = (evt.keyCode ? evt.keyCode : evt.which),
          typed = String.fromCharCode(code),
          str = elem[0].value,
          functional = false,
          isNumeric = false,
          newValue;

        switch(typed) {
        case 'k':
        case 'K':
          newValue = toNumbers(str) * 1000;
          functional = true;
          break;
        case 'm':
        case 'M':
          newValue = toNumbers(str) * 1000000;
          functional = true;
          break;
        case 'b':
        case 'B':
          newValue = toNumbers(str) * 1000000000;
          functional = true;
          break;
        default:
          if (typed && typed.match(isNumber)) {
            isNumeric = true;
          }
          break;
        }

        // ensure the user cannot enter multiple cents symbols
        if (functional === true || isNumeric === true || validateCents(str + typed, code) === true) {
          // when doing calculations above the cents separators are removed
          if (functional === true) {
            newValue = formatDecimals(newValue.toString());
            if (newValue < maxValue) {
              elem.val(currencyFormat(newValue.toString()));
            }
            evt.preventDefault();
            evt.stopPropagation();
            return false;
          } else {
            return true;
          }
        } else {
          evt.preventDefault();
          evt.stopPropagation();
          return false;
        }
      }

      var formatDecimals = function (str) {
        var formatted = '',
          charVal,
          valLength = str.length,
          decimalIndex,
          j;

        if (decimalCount > -1) {
          decimalIndex = valLength - (decimalCount === 0 ? 1 : decimalCount);
          for (j = 0; j < valLength; j++) {
            charVal = str.charAt(j);
            if (charVal && charVal.match(isNumber)) {
              if (j === decimalIndex) {
                formatted = formatted + centsSeparator + charVal;
              } else {
                formatted = formatted + charVal;
              }
            }
          }
        } else {
          formatted = str;
        }
        return formatted;
      };

      var validateCents = function (str, typedCode) {
        var splitCount = [];
        if (String.fromCharCode(typedCode) === centsSeparator) {
          splitCount = str.split(centsSeparator).length;
          if (splitCount > 2) {
            return false;
          }
          return true;
        }
        return false;
      };

      var validate = function (str) {
        var trimmedVal;
        // trim trailing 0's
        if (str.length > 0) {
          trimmedVal = formatDecimals(toNumbers(str));
          // only trim if there are decimals
          if (decimalCount > -1) {
            trimmedVal = parseFloat(trimmedVal).toString();
          } else {
            trimmedVal = str;
          }
         // return currencyFormat(Number(formatDecimals(Number(toNumbers(str)).toFixed(centsLimit)).toString()));
        } else {
          trimmedVal = str;
        }
        return trimmedVal;
      };
      
      return {
        currencyFormat: currencyFormat,
        keyCheck: keyCheck,
        validate: validate
      };
      
    }]);