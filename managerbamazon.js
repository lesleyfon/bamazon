var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err)
        throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // connection.end()
    start()

});
var purchaseId;
var purchaseQnt;
var currentIdArr = [];
var currentInvntArr = [];
var currenItemInv;
var itemName;

function start() {
    inquirer
        .prompt({
            name: "managerView",
            type: "list",
            message: "What will you like to do",
            choices: ['View products for Sale', "Add to inventory", "View low Inventory", "Add new product", "Quit"]

        })
        .then(function (options) {
            switch (options.managerView) {
                case "View products for Sale":
                    viewTable()
                    break;
                case "Add to inventory":
                    addInventory()
                    break;
                case "View low Inventory":
                    lowInventory()
                    break;
                case "Add new product":
                    addProduct()
                    break;
                case "Quit":
                    quit()
            }

        })
}

function quit() {
    connection.end()
};

function viewTable() {
    connection.query(" SELECT * FROM product_table", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item #: " + res[i].id + " || Product: " + res[i].prod_name + " || Stock: " + res[i].stock_qty);
        }
        console.log("")
        start()
    })
}

function addInventory() {

    console.log("================ current inventory============")
    connection.query('SELECT * FROM product_table', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item #: " + res[i].id + "|| Product: " + res[i].prod_name + "|| Stock: " + res[i].stock_qty);
            currentIdArr.push(res[i].id);
            currentInvntArr.push(res[i])
        }
        inquirer.prompt([
            {
                name: "inputId",
                type: "input",
                message: "The ID of the product You would like to Update."
            },
            {
                name: "inputQnt",
                type: "input",
                message: "The Quantity of the product would you like to Update."
            }
        ]).then(function (answers) {
            purchaseId = parseInt(answers.inputId);
            purchaseQnt = parseInt(answers.inputQnt);

            if (currentIdArr.indexOf(purchaseId) > -1) {
                var itemIndex = currentIdArr.indexOf(purchaseId);
                console.log("")
                currenItemInv = currentInvntArr[itemIndex].stock_qty;
                updateInv()
            } else {
                console.log("Invalid Id number, Please enter a valid Id number")
                console.log("================================================")
                start()
            };
        })
    });
}

function updateInv() {
    var updatedInv = currenItemInv + purchaseQnt;
    console.log(updatedInv)
    console.log('===============================================')
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
        function (err) {
            if (err) throw err;
            console.log("              Inventory Updated               ");
            console.log("================================================")

            start()
        }

    );
}
