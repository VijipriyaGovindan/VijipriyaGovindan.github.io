//Data Part of MVC
var budgetController = (function(){

    class CreditDebit {
        constructor(id, desc, value, type) {
            this.id = id;
            this.desc = desc;
            this.value = value;
            this.type = type;
            this.percentage = -1;
        }
        calcPerc(totalIncome)
        {
            if (totalIncome > 0) {
                this.percentage = Math.round((this.value / totalIncome) * 100);
            } else {
                this.percentage = -1;
            }
        }
        getPerc()
        {
            return this.percentage;
        }

    }

    var budgetData = 
    { 
        allItems : {
            exp: [], inc:[]
        },
        totals :{
            exp :0,
            inc :0
        },
        budget :0,
        percentage:-1


    };
    var calculateTotal = function(type) {
        var sum = 0;
        budgetData.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        budgetData.totals[type] = sum;
    };
    var calculateBudget= function() {
            
        // calculate total income and expenses
        calculateTotal('exp');
        calculateTotal('inc');  
        // Calculate the budget: income - expenses
        budgetData.budget = budgetData.totals.inc - budgetData.totals.exp;
        
        // calculate the percentage of income that we spent
        if (budgetData.totals.inc > 0) {
            budgetData.percentage = Math.round((budgetData.totals.exp / budgetData.totals.inc) * 100);
        } else {
            budgetData.percentage = -1;
        }            
        
        // Expense = 100 and income 300, spent 33.333% = 100/300 = 0.3333 * 100
    };
    var calculatePercentage = function(){
        budgetData.allItems['exp'].forEach(function(current)
        { current.calcPerc(budgetData.totals.inc);});
    };
    

    return{
        addItem : function(obj)
        {
            var newItem, ID;
            
            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1
            
            // Create new ID
            if (budgetData.allItems[obj.type].length > 0) {
                ID = budgetData.allItems[obj.type][budgetData.allItems[obj.type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            newItem = new CreditDebit(ID, obj.description, obj.value,obj.type);
           
            
            // Push it into our data structure
            budgetData.allItems[obj.type].push(newItem);
            
            // Return the new element
            return newItem;
        },
        getBudget : function(){
            calculateBudget();
            return {
                budget: budgetData.budget,
                totalInc: budgetData.totals.inc,
                totalExp: budgetData.totals.exp,
                percentage: budgetData.percentage
            };
        },
        getPercentages: function() {
            calculatePercentage();
            var allPerc = budgetData.allItems.exp.map(function(cur) {
                return cur.getPerc();
            });
            return allPerc;
        },
        deleteItem: function(type, id) {
            var ids, index;
            
            // id = 6
            //data.allItems[type][id];
            // ids = [1 2 4  8]
            //index = 3
           /* ids = (budgetData.allItems[type]).indexOf(id);
            console.log(ids);
            console.log(typeof(budgetData.allItems[type]).get);
            if (index !== -1) {
                       budgetData.allItems[type].splice(index, 1);
            } */
           ids = budgetData.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                budgetData.allItems[type].splice(index, 1);
            } 
            
        },

    };


})();
//UI part of MVC
var UIController = (function()
{
    //Declare all static harcode variables/values
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    //Get Input Data
    var getInputData = function()
    {
        return{
            type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
         
        };
    };
    var getCurrencyFormat =function(objValue)
     {
               let n= new Number(objValue);
                    var myObj = {
                    style: "currency",
                    currency: "CAD"
                    }
                    return(n.toLocaleString("en-CA", myObj));
     };
    var displayMonth = function()
    {
        document.querySelector(DOMstrings.dateLabel).textContent = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }

        
    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };
    return{
        getInput: function() {
            return getInputData();
            
        },
        getDomStrings:function() 
        {
          return DOMstrings;
        },
        addListItem: function(obj) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            
            if (obj.type === 'inc') {
                element = DOMstrings.incomeContainer;
                
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (obj.type === 'exp') {
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.desc);
            newHtml = newHtml.replace('%value%', obj.value);
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        initialzeCahrt : function(){
            google.charts.load('current', {'packages':['corechart']});
            
        },
        clearFields: function() {
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            
            fieldsArr[0].focus();
        },
        displayBudget : function(obj){
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
         
           
            document.querySelector(DOMstrings.budgetLabel).textContent = getCurrencyFormat(obj.budget);
            document.querySelector(DOMstrings.incomeLabel).textContent = getCurrencyFormat(obj.totalInc);
            document.querySelector(DOMstrings.expensesLabel).textContent =getCurrencyFormat(obj.totalExp);
            
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
           // let chartData = [["Type", 'Amount Spent'],['Expense',obj.totalExp],['Income', obj.totalInc]];
          
         //   this.drawChart(chartData);
            
        },
        displayPercentages: function(percentages) {
            
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            for (var i = 0; i < fields.length; i++) {
          //  nodeListForEach(fields, function(current, index) {
                current = fields[i];
                if (percentages[i] > 0) {
                     current.textContent = percentages[i] + '%';
                } else {
                    current.textContent = '---';
                }
            }
            
        },
        deleteListItem : function(selectedId){
            var el = document.getElementById(selectedId);
            el.parentNode.removeChild(el);

        },
        displayMonth : function()
        {
            displayMonth();
        },

        // Draw the chart and set the chart values
        drawChart:function(chartdata) {
        
                var data = google.visualization.arrayToDataTable(chartdata);
               
            
                // Optional; add a title and set the width and height of the chart
                var options = {'title':'My Monthly Budget', 'width':250, 'height':200};
            
                // Display the chart inside the <div> element with id="piechart"
                var chart = new google.visualization.PieChart(document.getElementById('piechart'));
                chart.draw(data, options);
            }

    };

    
})();
// Controller of MVC
var controller = (function(data,UI){

    var dom = UI.getDomStrings();
    //Set up Listeners
    var setListeners = function()
    {
        document.querySelector(dom.inputBtn).addEventListener('click',addItem);
        document.querySelector(dom.container).addEventListener('click',ctrlDeleteItem);
    };

    var addItem = function()
    {
        //Get the input field
        var input = UI.getInput();
       // console.log(input);
        //Add the item to the budget cntl
        var newItem = data.addItem(input);
        //Display the Item on the UI

               // 4. Clear the fields
            UI.clearFields();
        UI.addListItem(newItem);
        //Calculate Budget
        var budgetData = data.getBudget();
        //Display it on the UI Top
        UI.displayBudget(budgetData);
        // Calculate %
        var perc = data.getPercentages();
        //Display % againtst each item
        UI.displayPercentages(perc);



    };
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID) {
            
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // 1. delete the item from the data structure
            budgetController.deleteItem(type, ID);
            
            // 2. Delete the item from the UI
            UIController.deleteListItem(itemID);
            
            // 3. Update and show the new budget
            //Calculate Budget
            var budgetData = data.getBudget();
            //Display it on the UI Top
            UI.displayBudget(budgetData);
            
            // 4. Calculate and update percentages
                    // Calculate %
            var perc = data.getPercentages();
            //Display % againtst each item
            UI.displayPercentages(perc);
        }
    };

return{
    init : function(){
        UIController.displayMonth();
     // UIController.initialzeCahrt();
       UIController.displayBudget({
            budget: 0,
            totalInc: 0,
            totalExp: 0,
            percentage: -1
        }); 
       
    setListeners();
} 
    
};
})(budgetController,UIController);
controller.init();