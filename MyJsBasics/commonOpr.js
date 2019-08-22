const myValue = document.querySelector('.iNumber');
const myButtonEvet = document.querySelector('.bSubmit');
const pRes = document.querySelector('.pResult');
myButtonEvet.addEventListener("click", guessOutput);
var randonNum = 0;
let guessTurn = 0;
function generateRandomNo()
{
    randonNum = Math.round(Math.random()*100)
}
function restartGame()
{
    myButtonEvet.disabled = true;
    guessTurn = 0;
    randonNum = 0;
    myValue.value = "";
    var myReset = document.createElement("button");
    myReset.textContent = "Restart the Game";
    document.body.appendChild(myReset);
    myReset.addEventListener("click", setDefault);
}
function setDefault()
{
    myButtonEvet.disabled = false;
    myReset.parentNode.removeChild(myReset);
}
function guessOutput()
{
    if(guessTurn === 0)
    {
        generateRandomNo();
    }
    else if(guessTurn === 10)
    {
        restartGame();
    }
    guessTurn++;
    let tempNum = myValue.value-randonNum;
    if(tempNum === 0)
    {
        pRes.textContent ="Right Guess" + myValue.value;
        restartGame();
    }
    else if(tempNum <= -10)
    {
        pRes.textContent = "no of turns left" + (10-guessTurn)+ "  Your value is too less, Try Again";
    }
    else if(tempNum >= 10)
    {
        pRes.textContent = "no of turns left" + (10-guessTurn)+ "  Your value is too far";
    }
    else
    {
        pRes.textContent = "no of turns left" + (10-guessTurn)+  "  Keep Guessing";
    }
    

}
function Person(name, age)
{
    name= name;
    age= age;
    this.display = ()=>{console.log("name. is"+ name);};
}
var person1 = new Person("V1", 25);
console.log(person1.display())