$(document).ready(function(){
  var primaryVal = "0";
  var secondaryVal = "";
  var queuedOperation = "";
  var evaluated = false;
  var equaled = false;
  
  var evaluate = function(primaryVal, secondaryVal, queuedOperation){
    switch(queuedOperation){
      case "+":
        return add(primaryVal, secondaryVal);
        break;
      case "-":
        return subtract(primaryVal, secondaryVal);
        break;
      case "*":
        return multiply(primaryVal, secondaryVal);
        break;
      case "÷":
        return divide(primaryVal, secondaryVal);
        break;
      case "%":
        return percent(primaryVal, secondaryVal);
        break;
    };
  };
  
  var display = function(){
    if (evaluated || !secondaryVal){
      $(".displayOut").html(primaryVal);
    } else if (secondaryVal && !evaluated){
      $(".displayOut").html(secondaryVal);
    };
  };
  
  var multiply = function(previousVal, currentVal){
    return parseFloat(primaryVal) * parseFloat(currentVal);
  };
  
  var add = function(primaryVal, secondaryVal){
    return parseFloat(primaryVal) + parseFloat(secondaryVal);
  };
  
  var subtract = function(primaryVal, secondaryVal){
    return parseFloat(primaryVal) - parseFloat(secondaryVal);
  };
  
  var divide = function(primaryVal, secondaryVal){
    return parseFloat(primaryVal) / parseFloat(secondaryVal);
  };
  
  var percent = function(previousVal, secondaryVal){
    return (parseFloat(primaryVal) * parseFloat(secondaryVal) / 100);
  };
  
  var reciprocal = function(val){
    return (1 / parseFloat(val));
  };
  
  var sqrt = function(val){
    return Math.sqrt(parseFloat(val));
  };
  
  $(".numberBtn").click(function(){
    var btn = $(this).text();
    if (equaled){
      primaryVal = btn;
      queuedOperation = "";
      secondaryVal = "";
      equaled = false;
    } else if (!queuedOperation){
      if (primaryVal === "0" && btn !== "."){
        primaryVal = btn;
      } else if (btn !== "." || primaryVal.indexOf(".") === -1){
        primaryVal += btn;
      };
    } else if (queuedOperation && (btn !== "." || secondaryVal.indexOf(".") === -1)){
      secondaryVal += btn;
    };
    evaluated = false;
    display();
  });
  
  $(".funcBtn").click(function(){
    var operation = $(this).text();
    if (operation === "√"){
      if (secondaryVal && !evaluated){
        secondaryVal = sqrt(secondaryVal);
      } else {
        primaryVal = sqrt(primaryVal);
      };
    } else if (operation === "1/x"){
      if (evaluated){
        primaryVal = reciprocal(primaryVal);
      } else if (secondaryVal){
        secondaryVal = reciprocal(secondaryVal);
      } else {
        primaryVal = reciprocal(primaryVal);
      };
    } else if (operation === "%"){
      if (secondaryVal){
        secondaryVal = percent(primaryVal, secondaryVal);
      };
    } else if (!queuedOperation){
      queuedOperation = operation;
    } else if (queuedOperation){
      if (operation === "="){
        evaluated = true;
        equaled = true;
        primaryVal = evaluate(primaryVal, secondaryVal, queuedOperation);
      } else {
        if (!evaluated){
          primaryVal = evaluate(primaryVal, secondaryVal, queuedOperation);
        };
        equaled = false;
        queuedOperation = operation;
        secondaryVal = "";
        evaluated = true;
      };
    };
    display();
  });
  
  $(".clearBtn").click(function(){
    primaryVal = "0";
    secondaryVal = "";
    queuedOperation = "";
    evaluated = false;
    equaled = false;
    display();
  });
});