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
