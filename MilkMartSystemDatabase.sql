CREATE DATABASE MilkShop
USE MilkShop
DROP DATABASE MilkShop

CREATE TABLE Roles(
	role_id VARCHAR(10) PRIMARY KEY,
	role_name VARCHAR(50),
)

CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role_id VARCHAR(10) NOT NULL REFERENCES Roles(role_id),
	status BIT DEFAULT 1
);

CREATE TABLE Customer (
	customer_id INT IDENTITY(1,1) PRIMARY KEY REFERENCES Users(user_id),
	loyalty_points INT DEFAULT 0
)


CREATE TABLE Category (
	category_id INT IDENTITY(1,1) PRIMARY KEY,
	category_name nvarchar(50)
);

CREATE TABLE Products (
    product_id INT IDENTITY(1,1) PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    category_id INT REFERENCES Category(category_id)
);

CREATE TABLE Reviews (
    review_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT,
    product_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    review_date DATETIME,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Orders (
    order_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT,
    order_date DATETIME,
    status VARCHAR(10),
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Order_Items (
    order_item_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Vouchers (
    voucher_id INT IDENTITY(1,1) PRIMARY KEY,
    code VARCHAR(50) UNIQUE,
    discount DECIMAL(5, 2),
    expiration_date DATE
);

CREATE TABLE User_Vouchers (
    user_id INT,
    voucher_id INT,
    used BIT DEFAULT 0,
    PRIMARY KEY (user_id, voucher_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (voucher_id) REFERENCES Vouchers(voucher_id)
);

CREATE TABLE Payment_Methods (
    payment_method_id INT IDENTITY(1,1) PRIMARY KEY,
    method_name VARCHAR(50) NOT NULL,
    details TEXT
);

CREATE TABLE Payments (
    payment_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT,
    payment_method_id INT,
    transaction_date DATETIME NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_status VARCHAR(20) NOT NULL,
    payment_details TEXT,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (payment_method_id) REFERENCES Payment_Methods(payment_method_id)
);

CREATE TABLE Posts(
	post_id int IDENTITY(1,1) PRIMARY KEY,
	user_id int,
	FOREIGN KEY (user_id) REFERENCES Users(user_id),
	content text,
	post_date DATETIME,
	product_id int,
	FOREIGN KEY (product_id) REFERENCES Products(product_id)
)

-- Roles
INSERT INTO Roles (role_id, role_name) VALUES ('admin', 'Administrator');
INSERT INTO Roles (role_id, role_name) VALUES ('customer', 'Customer');
INSERT INTO Roles (role_id, role_name) VALUES ('staff', 'Staff');

-- Users
INSERT INTO Users (username, password, email, role_id) VALUES ('admin', 'adminpass', 'admin@example.com', 'admin');
INSERT INTO Users (username, password, email, role_id) VALUES ('user1', 'user1pass', 'user1@example.com', 'customer');
INSERT INTO Users (username, password, email, role_id) VALUES ('user2', 'user2pass', 'user2@example.com', 'customer');
INSERT INTO Users (username, password, email, role_id) VALUES ('user3', 'user3pass', 'user3@example.com', 'customer');
INSERT INTO Users (username, password, email, role_id) VALUES ('user4', 'user4pass', 'user4@example.com', 'customer');
INSERT INTO Users (username, password, email, role_id) VALUES ('user5', 'user5pass', 'user5@example.com', 'customer');
SELECT * FROM Users
-- Customers
INSERT INTO Customer ( loyalty_points) VALUES ( 150);
INSERT INTO Customer ( loyalty_points) VALUES ( 200);
INSERT INTO Customer ( loyalty_points) VALUES ( 300);
INSERT INTO Customer ( loyalty_points) VALUES ( 400);
INSERT INTO Customer ( loyalty_points) VALUES ( 250);

-- Category
INSERT INTO Category (category_name) VALUES ('Baby Care');
INSERT INTO Category (category_name) VALUES ('Maternity');

-- Products
INSERT INTO Products (product_name, description, price, stock, category_id) VALUES ('Baby Shampoo', 'Gentle shampoo for babies', 5.99, 50, 1);
INSERT INTO Products (product_name, description, price, stock, category_id) VALUES ('Baby Lotion', 'Moisturizing lotion for baby skin', 4.99, 30, 1);
INSERT INTO Products (product_name, description, price, stock, category_id) VALUES ('Maternity Dress', 'Comfortable dress for expecting mothers', 29.99, 20, 2);
INSERT INTO Products (product_name, description, price, stock, category_id) VALUES ('Nursing Pillow', 'Support pillow for breastfeeding', 19.99, 15, 2);
INSERT INTO Products (product_name, description, price, stock, category_id) VALUES ('Diaper Bag', 'Spacious diaper bag with multiple pockets', 39.99, 25, 1);

-- Reviews
INSERT INTO Reviews (user_id, product_id, rating, comment, review_date) VALUES (2, 1, 5, 'Great shampoo for my baby!', GETDATE());
INSERT INTO Reviews (user_id, product_id, rating, comment, review_date) VALUES (3, 2, 4, 'Lotion is good but a bit pricey.', GETDATE());
INSERT INTO Reviews (user_id, product_id, rating, comment, review_date) VALUES (4, 3, 5, 'Love this maternity dress!', GETDATE());
INSERT INTO Reviews (user_id, product_id, rating, comment, review_date) VALUES (5, 4, 5, 'Very useful pillow for nursing.', GETDATE());
INSERT INTO Reviews (user_id, product_id, rating, comment, review_date) VALUES (6, 5, 4, 'Bag is spacious but could use more compartments.', GETDATE());

-- Orders
INSERT INTO Orders (user_id, order_date, status, total_amount) VALUES (2, GETDATE(), 'Pending', 45.97);
INSERT INTO Orders (user_id, order_date, status, total_amount) VALUES (3, GETDATE(), 'Completed', 34.98);
INSERT INTO Orders (user_id, order_date, status, total_amount) VALUES (4, GETDATE(), 'Shipped', 29.99);
INSERT INTO Orders (user_id, order_date, status, total_amount) VALUES (5, GETDATE(), 'Delivered', 19.99);
INSERT INTO Orders (user_id, order_date, status, total_amount) VALUES (6, GETDATE(), 'Cancelled', 39.99);

-- Order_Items
INSERT INTO Order_Items (order_id, product_id, quantity, price) VALUES (1, 1, 2, 5.99);
INSERT INTO Order_Items (order_id, product_id, quantity, price) VALUES (1, 2, 1, 4.99);
INSERT INTO Order_Items (order_id, product_id, quantity, price) VALUES (2, 3, 1, 29.99);
INSERT INTO Order_Items (order_id, product_id, quantity, price) VALUES (2, 4, 1, 4.99);
INSERT INTO Order_Items (order_id, product_id, quantity, price) VALUES (3, 3, 1, 29.99);
INSERT INTO Order_Items (order_id, product_id, quantity, price) VALUES (4, 4, 1, 19.99);
INSERT INTO Order_Items (order_id, product_id, quantity, price) VALUES (5, 5, 1, 39.99);

-- Vouchers
INSERT INTO Vouchers (code, discount, expiration_date) VALUES ('DISCOUNT10', 10.00, '2024-12-31');
INSERT INTO Vouchers (code, discount, expiration_date) VALUES ('SAVE20', 20.00, '2024-11-30');
INSERT INTO Vouchers (code, discount, expiration_date) VALUES ('WELCOME5', 5.00, '2024-10-31');
INSERT INTO Vouchers (code, discount, expiration_date) VALUES ('FREESHIP', 0.00, '2024-09-30');
INSERT INTO Vouchers (code, discount, expiration_date) VALUES ('NEWUSER15', 15.00, '2024-08-31');

-- User_Vouchers
INSERT INTO User_Vouchers (user_id, voucher_id, used) VALUES (2, 1, 0);
INSERT INTO User_Vouchers (user_id, voucher_id, used) VALUES (3, 2, 1);
INSERT INTO User_Vouchers (user_id, voucher_id, used) VALUES (4, 3, 0);
INSERT INTO User_Vouchers (user_id, voucher_id, used) VALUES (5, 4, 0);
INSERT INTO User_Vouchers (user_id, voucher_id, used) VALUES (6, 5, 1);

-- Payment_Methods
INSERT INTO Payment_Methods (method_name, details) VALUES ('Credit Card', 'Visa/MasterCard');
INSERT INTO Payment_Methods (method_name, details) VALUES ('PayPal', 'user@example.com');
INSERT INTO Payment_Methods (method_name, details) VALUES ('Bank Transfer', 'Bank XYZ');
INSERT INTO Payment_Methods (method_name, details) VALUES ('Cash on Delivery', 'Pay at your doorstep');
INSERT INTO Payment_Methods (method_name, details) VALUES ('Gift Card', 'Redeemable online');

-- Payments
INSERT INTO Payments (order_id, payment_method_id, transaction_date, amount, transaction_status, payment_details) VALUES (1, 1, GETDATE(), 45.97, 'Pending', 'Transaction ID: 12345');
INSERT INTO Payments (order_id, payment_method_id, transaction_date, amount, transaction_status, payment_details) VALUES (2, 2, GETDATE(), 34.98, 'Completed', 'Transaction ID: 12346');
INSERT INTO Payments (order_id, payment_method_id, transaction_date, amount, transaction_status, payment_details) VALUES (3, 3, GETDATE(), 29.99, 'Shipped', 'Transaction ID: 12347');
INSERT INTO Payments (order_id, payment_method_id, transaction_date, amount, transaction_status, payment_details) VALUES (4, 4, GETDATE(), 19.99, 'Delivered', 'Transaction ID: 12348');
INSERT INTO Payments (order_id, payment_method_id, transaction_date, amount, transaction_status, payment_details) VALUES (5, 5, GETDATE(), 39.99, 'Cancelled', 'Transaction ID: 12349');

-- Posts
INSERT INTO Posts (user_id, content, post_date, product_id) VALUES (2, 'Really happy with the baby shampoo!', GETDATE(), 1);
INSERT INTO Posts (user_id, content, post_date, product_id) VALUES (3, 'The baby lotion works wonders.', GETDATE(), 2);
INSERT INTO Posts (user_id, content, post_date, product_id) VALUES (4, 'This maternity dress is so comfortable!', GETDATE(), 3);
INSERT INTO Posts (user_id, content, post_date, product_id) VALUES (5, 'Nursing pillow is a must-have for new moms.', GETDATE(), 4);
INSERT INTO Posts (user_id, content, post_date, product_id) VALUES (6, 'Love the diaper bag, very practical.', GETDATE(), 5);

SELECT * FROM Users