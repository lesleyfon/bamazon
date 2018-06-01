var mysql = require("mysql");

var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome To Bamazon!!!");
    console.log("================================================")

    start();
});
var purchaseId;
var purchaseQnt;
var currentIdArr = [];
var currentInvntArr = [];
var currenItemInv;
var currentItemPrc;
var itemName;
function start() {
    console.log("================ current inventory============")
    connection.query('SELECT * FROM product_table', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item #: " + res[i].id + "|| Product: " + res[i].prod_name + "|| Price: " + res[i].price);
            currentIdArr.push(res[i].id);
            currentInvntArr.push(res[i])
        }
        // console.log();
        inquirer.prompt([
            {
                name: "inputId",
                type: "input",
                message: "The ID of the product You would like to buy."
            },
            {
                name: "inputQnt",
                type: "input",
                message: "the qnty of the product would you like to buy."
            }
        ]).then(function (answers) {
            purchaseId = parseInt(answers.inputId);
            purchaseQnt = parseInt(answers.inputQnt);
            if (currentIdArr.indexOf(purchaseId) > -1) {
                var itemIndex = currentIdArr.indexOf(purchaseId);
                currenItemInv = currentInvntArr[itemIndex].stock_qty;
                currentItemPrc = currentInvntArr[itemIndex].price
                itemName = currentInvntArr[itemIndex].prod_name
                if (purchaseQnt <= currentInvntArr[itemIndex].stock_qty) {
                    updateInv()
                } else {
                    console.log("Sorry we dont have enough inventory. please enter a new amount\n")
                    console.log("================================================")

                    start()

                }


            } else {
                console.log("Invalid Id number, Please enter a valid Id number")
                console.log("================================================")

                start()
            };


        })
    });
}
function updateInv() {
    var updatedInv = currenItemInv - purchaseQnt;
    // console.log("\n Updated inventory is " + updatedInv + "\n")
    connection.query(
        "UPDATE product_table SET ? WHERE ?",
        [
          {
            stock_qty: updatedInv
          },
          {
            id: purchaseId
          }
        ],
        function(err) {
          if (err) throw err;
          console.log("Inventory Updated");
          console.log("================================================")

          displayOrder()
        }

      );
}

function displayOrder(){
    console.log("        ***Your Order is complete***");
    console.log("================================================")
    console.log(`You ordered ${purchaseQnt} x ${itemName}`)
   console.log("Order total: $" + currentItemPrc * purchaseQnt) ;
}