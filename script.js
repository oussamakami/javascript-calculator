window.addEventListener('load', assignActionsToBtns);

function assignActionsToBtns() {
    assignActionsToDigitsBtns();
    assignActionsToOperatorsBtns();

    //manually assigning actions to some buttons
    selectItem("AC").addEventListener("click", deleteAll);
    selectItem("DEL").addEventListener("click", deleteLastChar);
    selectItem("dbl0").addEventListener("click", () => { pushNumber(0); pushNumber(0)}); 
}

let primEntry = selectItem("primEntry"),
    secEntry = selectItem("secEntry");

function selectItem(id) {
    return document.getElementById(id);
}
function deleteAll() {
    primEntry.innerHTML = 0;
    secEntry.innerHTML = '';
}
function deleteLastChar() {
    let primEntryTxt = primEntry.innerHTML,
        primEntryLength = primEntryTxt.length;

    primEntry.innerHTML = primEntryTxt.slice(0, -1);

    if (primEntryLength == 1) {
        primEntry.innerHTML = "0";
    }
}
function pushNumber(num) {
    let primEntryLength = primEntry.innerHTML.length,
        primEntryVal = Number(primEntry.innerHTML);

    if (primEntryLength == 1 && primEntryVal == 0) {
        primEntry.innerHTML = num;
    } else {
        primEntry.innerHTML += num;
    }
}
function pushOperator(operator) {
    let operators = ['.', '+', '-' ,'x', '÷'];
        primaryEntryLastChar = primEntry.innerHTML[primEntry.innerHTML.length -1];
    if (operators.indexOf(primaryEntryLastChar) == -1){
        primEntry.innerHTML += operator;
    }
}


function assignActionsToDigitsBtns() {
    let numbersBtns = Object.values(document.getElementsByClassName('num'));

    numbersBtns.forEach(val => {
        val.addEventListener("click", () => pushNumber(val.innerHTML));
    });
}
function assignActionsToOperatorsBtns() {
    let operatorsBtns = Object.values(document.getElementsByClassName("operators"));
    operatorsBtns.forEach(val => {
        val.addEventListener("click", () => pushOperator(val.innerHTML));
    });
}