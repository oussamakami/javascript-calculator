window.addEventListener('load', () => {
    assignActionsToBtns();
    registerServiceWorker();
});

function assignActionsToBtns() {
    assignActionsToDigitsBtns();
    assignActionsToOperatorsBtns();
    assignActionsToParenthesesBtns();

    //manually assigning actions to some buttons
    selectItem("AC").addEventListener("click", deleteAll);
    selectItem("DEL").addEventListener("click", deleteLastChar);
    selectItem("dbl0").addEventListener("click", () => { pushNumber(0); pushNumber(0)}); 
    selectItem("PERIOD").addEventListener("click", pushPeriod);
    selectItem("SBMT").addEventListener("click", calculate);
}

let primEntry = selectItem("primEntry"),
    secEntry = selectItem("secEntry");

function selectItem(id) {
    return document.getElementById(id);
}
function deleteAll() {
    primEntry.innerHTML = 0;
    secEntry.innerHTML = '';
    allowCloseParentheses = 0;
}
function deleteLastChar() {
    let primEntryTxt = primEntry.innerHTML,
        primEntryLength = primEntryTxt.length;
    
    if(primEntryTxt[primEntryLength-1] == "("){
        allowCloseParentheses--;
    }
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
    let operators = ['.', '+', '-' ,'x', '÷'],
        primEntryLength = primEntry.innerHTML.length,
        primaryEntryLastChar = primEntry.innerHTML[primEntryLength -1];
    if (operators.indexOf(primaryEntryLastChar) == -1){
        if (primEntryLength == 1 && primaryEntryLastChar == 0 && ['+', '-'].indexOf(operator) != -1){
            primEntry.innerHTML = operator;
        }else {
            primEntry.innerHTML += operator;
        }
    }
}
function pushPeriod() {
    let primaryEntryLastChar = primEntry.innerHTML[primEntry.innerHTML.length -1];
    if(primaryEntryLastChar != '.'){
        primEntry.innerHTML += '.';
    }
}

//global variable associated with pushParentheses()
allowCloseParentheses = 0;
function pushParentheses(orientation){
    let charToAllowPush = ['.', '+', '-' ,'x', '÷', '('],
        primaryEntryLength = primEntry.innerHTML.length;
        primaryEntryLastChar = primEntry.innerHTML[primaryEntryLength -1];
    if (charToAllowPush.indexOf(primaryEntryLastChar) != -1 && orientation == "open"){
        allowCloseParentheses++;
        primEntry.innerHTML += "(";
    }else if (primaryEntryLength == 1 && primaryEntryLastChar == 0){
        allowCloseParentheses++;
        primEntry.innerHTML = "("
    }else if (allowCloseParentheses > 0 && orientation == "close"){
        allowCloseParentheses--;
        primEntry.innerHTML += ")";
    }
}
function calculate() {
    let primEntryTxt = primEntry.innerHTML;
    if(allowCloseParentheses !=0){
        for(i=allowCloseParentheses; i>0;i--){
            primEntryTxt += ")"
        }
        allowCloseParentheses = 0;
    }
    secEntry.innerHTML = `${primEntryTxt}=`;
    primEntryTxt = primEntryTxt.replace(/÷/g, '/');
    primEntryTxt = primEntryTxt.replace(/x/g, '*');
    primEntry.innerHTML = eval(primEntryTxt);

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
function assignActionsToParenthesesBtns() {
    selectItem("openParentheses").addEventListener("click", () => pushParentheses("open"));
    selectItem("closeParentheses").addEventListener("click", () => pushParentheses("close"));
}
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./sw.js');
      } catch (error) {
        console.log(`serviceWorker registration failed - ${error}`);
      }
    }
}
