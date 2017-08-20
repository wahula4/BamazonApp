# BamazonApp

Bamazon is an Amazon-like storefront using MySQL and Node.js.  There are two options while running this app.  For customer's, the app will take in orders and deplete stock from the store's inventory.  For manager's, the app will allow the user to view and add to product inventory.

The command for the customer view in the terminal is 'node bamazonCustomer', which will return the following:

(customerStep1.PNG)

After viewing the list of available products to purchase, the user will enter in the unique ID of the product and will then be prompted for a product quantity.  Once a quantity has been entered, the total cost will be calculated.

(customerStep3.PNG)

The command for the manager view in the terminal is 'node bamazonManager', which will return the following:

(managerStep1.png)

The four options for managers are: view inventory, view low inventory, add to current inventory, and add new product.  The 'view inventory' option will return a list of all products:

(managerStep2.png)

The 'view low inventory' option will return a list of products that have a stock of less than 5:

(managerStep3.png)

The 'add to current inventory' option will prompt the user for a product ID and then ask how much stock to add:

(managerStep5.png)

The 'add new product' option will ask for a product name, department, quantity, and price:

(managerStep6.png)
