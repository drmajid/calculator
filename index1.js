function process(){
    let firstValue = getValueOf("valueOne", Number);
    let secondValue = getValueOf("valueTwo", Number);

    let result = firstValue + secondValue;

    setValueOf("result", result);
}

function getValueOf(fieldName, type){
    let fieldValue = document.getElementById(fieldName);
    return type(fieldValue.value);
}

function setValueOf(fieldName, value){
    let fieldValue = document.getElementById(fieldName);
    fieldValue.value = value;
}