var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    password: "6sept1993",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err)
        throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // connection.end()
    start()

});

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
            console.log("Item #: " + res[i].id + " || Product: " + res[i].prod_name + " || Price: " + res[i].price);

        }
        console.log("")
        start()
    })
}

function addInventory() {
    inquirer.prompt([
        {
            name: "inputId",
            type: "input",
            message: "What is the Id of the product you would like to add",

        }

    ]).then(function(){
        
    })

}
// start()