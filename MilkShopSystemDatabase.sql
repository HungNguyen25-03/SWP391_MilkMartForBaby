CREATE DATABASE MilkShop
USE MilkShop
DROP DATABASE MilkShop

CREATE TABLE Roles (
    role_id VARCHAR(20) PRIMARY KEY,
    role_name NVARCHAR(50) NOT NULL
);

CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL,
    password NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    role_id VARCHAR(20) NOT NULL REFERENCES Roles(role_id),
    status BIT DEFAULT 1
);

CREATE TABLE Customer (
    customer_id INT PRIMARY KEY REFERENCES Users(user_id),
    loyalty_points INT DEFAULT 0
);

CREATE TABLE Product_Categories (
    category_id INT IDENTITY(1,1) PRIMARY KEY,
    category_name NVARCHAR(100) NOT NULL
);

CREATE TABLE Brands (
    brand_id INT IDENTITY(1,1) PRIMARY KEY,
    brand_name NVARCHAR(255) NOT NULL,
	category_id INT REFERENCES Product_Categories(category_id) 
);

CREATE TABLE Originated_Country (
    country_id CHAR(3) PRIMARY KEY,
    country_name NVARCHAR(100) NOT NULL,
	category_id INT REFERENCES Product_Categories(category_id) 
);

CREATE TABLE Age_Range (
    age_range NVARCHAR(255) PRIMARY KEY,
	category_id INT REFERENCES Product_Categories(category_id) 
);

CREATE TABLE Products (
    product_id INT IDENTITY(1,1) PRIMARY KEY,
    product_name NVARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock INT NOT NULL,
    brand_id INT REFERENCES Brands(brand_id),
    country_id CHAR(3) REFERENCES Originated_Country(country_id),
    age_range NVARCHAR(255) REFERENCES Age_Range(age_range),
);

CREATE TABLE Reviews (
    review_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id),
    product_id INT NOT NULL REFERENCES Products(product_id),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    review_date DATETIME DEFAULT GETDATE()
);

CREATE TABLE Orders (
    order_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id),
    order_date DATETIME DEFAULT GETDATE(),
    status NVARCHAR(10),
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0)
);

CREATE TABLE Order_Items (
    order_item_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL REFERENCES Orders(order_id),
    product_id INT NOT NULL REFERENCES Products(product_id),
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0)
);

CREATE TABLE Vouchers (
    voucher_id INT IDENTITY(1,1) PRIMARY KEY,
    code NVARCHAR(50) UNIQUE NOT NULL,
    discount DECIMAL(5, 2) NOT NULL CHECK (discount >= 0),
    expiration_date DATE NOT NULL
);

CREATE TABLE User_Vouchers (
    user_id INT NOT NULL REFERENCES Users(user_id),
    voucher_id INT NOT NULL REFERENCES Vouchers(voucher_id),
    used BIT DEFAULT 0,
    PRIMARY KEY (user_id, voucher_id)
);

CREATE TABLE Payment_Methods (
    payment_method_id INT IDENTITY(1,1) PRIMARY KEY,
    method_name NVARCHAR(50) NOT NULL,
    details TEXT
);

CREATE TABLE Payments (
    payment_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL REFERENCES Orders(order_id),
    payment_method_id INT NOT NULL REFERENCES Payment_Methods(payment_method_id),
    transaction_date DATETIME NOT NULL DEFAULT GETDATE(),
    amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
    transaction_status NVARCHAR(20) NOT NULL,
    payment_details TEXT
);

CREATE TABLE Posts (
    post_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id),
    content TEXT,
    post_date DATETIME DEFAULT GETDATE(),
    product_id INT REFERENCES Products(product_id)
);

CREATE TABLE RefreshTokens (
  token VARCHAR(255) PRIMARY KEY,
  user_id INT,
  expiryDate DATETIME,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insert into Roles
INSERT INTO Roles (role_id, role_name) VALUES
('admin', 'Admin'),
('customer', 'Customer'),
('staff', 'Staff');

-- Insert into Users
INSERT INTO Users (username, password, email, role_id) VALUES
('admin_user', 'password123', 'admin@example.com', 'admin'),
('customer1', 'password123', 'customer1@example.com', 'customer'),
('customer2', 'password123', 'customer2@example.com', 'customer'),
('staff1', '123456789', 'staff1@example.com', 'staff');
-- Insert into Customer
INSERT INTO Customer (customer_id, loyalty_points) VALUES
(2, 100),
(3, 150);

-- Insert into Product_Categories
INSERT INTO Product_Categories (category_name) VALUES
('Brands'),
('Originated countries'),
('Age ranges');

-- Insert into Brands
INSERT INTO Brands (brand_name, category_id) VALUES
('Yoko Gold', 1),
('Wakodo', 1),
('Vinamilk', 1),
('Vanma (Nutifood)', 1),
('Similac', 1),
('Hikid', 1),
('Friso Gold Pro', 1),
('Fanma (Nutifood)', 1),
('Enfamil', 1),
('Bellamy', 1),
('Aptamil', 1),
('Abbot Grow', 1)

-- Insert into Originated_Country
INSERT INTO Originated_Country (country_id, country_name, category_id) VALUES
('FRA', 'France ', 2),
('AUS', 'Australia ', 2),
('THL', 'Thailand', 2),
('NED', 'Netherlands', 2),
('KOR', 'Korea', 2),
('IRE', 'Ireland', 2),
('SWE', 'Sweden', 2),
('VNA', 'Viet Nam', 2),
('USA', 'United States', 2),
('CAN', 'Canada', 2),
('JPN', 'Japan', 2),
('GER', 'Germany', 2);

-- Insert into Age_Range
INSERT INTO Age_Range (age_range, category_id) VALUES
('0-1 year', 3),
('1-2 years', 3),
('> 2 years old', 3),
('Maternal', 3),
('Adult', 3);

-- Insert into Products
INSERT INTO Products (product_name, description, price, stock, brand_id, country_id, age_range) VALUES
(N'Vinamilk Yoko Gold 1 350g', N'High-quality milk from Yoko Gold for infants 0-1 year.', 229000, 120, 1, 'VNA', '0-1 year'),
(N'Vinamilk Yoko Gold 2 850g', N'High-quality milk from Yoko Gold for babies 1-2 years.', 435000, 90, 1, 'VNA', '1-2 years'),
(N'Vinamilk Yoko Gold 1 850g', N'High-quality milk from Yoko Gold for infants 0-1 year.', 449000, 120, 1, 'VNA', '0-1 year'),
(N'Vinamilk Yoko Gold 3 850g', N'High-quality milk from Yoko Gold for kids 2-6 years.', 337100, 120, 1, 'VNA', '> 2 years old'),
(N'Sữa Wakodo MOM 300g', N'Dành cho mẹ mang thai và cho con bú.', 219000, 360, 2, 'JPN', 'Maternal'),
(N'Sữa Wakodo MOM 830g', N'Dành cho mẹ mang thai và cho con bú.', 455000, 210, 2, 'JPN', 'Maternal'),
(N'Sữa Vinamilk ColosGold số 2 350g (1-2 tuổi)', N'Dành cho trẻ từ 1 đến 2 tuổi.', 219000, 600, 3, 'VNA', '1-2 years'),
(N'Sữa bột Vinamilk Kenko Haru hộp 850g', N'Dành cho trẻ từ 1 đến 2 tuổi.', 605000, 600, 3, 'VNA', '1-2 years'),
(N'Sữa Vinamilk ColosGold 1 350g (0-1 tuổi)', N'Dành cho trẻ từ 0-1 tuổi.', 235000, 340, 3, 'VNA', '0-1 year'),
(N'Sữa Dielac Grow Plus 1+, 1-2 tuổi, 850g', N'Dành cho trẻ từ 0-1 tuổi tới từ VN.', 365000, 2450, 3, 'VNA', '1-2 years'),
(N'Sữa Vinamilk ColosGold số 2 800g (1-2 tuổi)', N'Dành cho trẻ từ 1-2 tuổi tới từ VN.', 419000, 120, 3, 'VNA', '1-2 years'),
(N'Sữa Vinamilk ColosGold số 1 800g (0-1 tuổi)', N'Dành cho trẻ từ 0-1 tuổi tới từ VN.', 449000, 650, 3, 'VNA', '0-1 year'),
(N'Sữa Dielac Alpha Gold IQ 3, 850g (1-2 tuổi)', N'Dành cho trẻ từ 1-2 tuổi tới từ Dielac.', 285000, 340, 3, 'VNA', '1-2 years'),
(N'Vinamilk Optimum Gold 3, 850g, 1-2 tuổi', N'Dành cho trẻ từ 1-2 tuổi tới từ Optimum.', 369000, 1200, 3, 'VNA', '1-2 years'),
(N'Sữa Vinamilk ColosGold số 3 800g (2-6 tuổi)', N'Dành cho trẻ từ 2-6 tuổi tới từ ColosGold.', 359100, 920, 3, 'VNA', '> 2 years old'),
(N'Sữa Dielac Grow Plus 2+, 2-10 tuổi, 850g', N'Dành cho trẻ từ 2-10 tuổi tới từ Dielac.', 323100, 490, 3, 'VNA', '> 2 years old'),
(N'Vinamilk Optimum Gold 4, 850g, 2-6 tuổi', N'Dành cho trẻ từ 2-6 tuổi tới từ Optimum.', 314100, 250, 3, 'VNA', '> 2 years old'),
(N'Sữa Nutifood Varna Complete 850g', N'Thụy Điển, dưới sự giám sát chặt chẽ theo tiêu chuẩn chất lượng nghiêm ngặt của Viện Nghiên Cứu Dinh Dưỡng Nutifood Thụy Điển', 531000, 750, 4, 'SWE', 'Adult'),
(N'Sữa Nutifood Varna Complete 400g', N'Thụy Điển, dưới sự giám sát chặt chẽ theo tiêu chuẩn chất lượng nghiêm ngặt của Viện Nghiên Cứu Dinh Dưỡng Nutifood Thụy Điển', 269000, 660, 4, 'SWE', 'Adult'),
(N'Sữa Similac Total Protection 4 900g (2 - 6 tuổi)', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 559000, 260, 5, 'IRE', '> 2 years old'),
(N'Sữa bầu Similac Mom 900g hương Vani', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 455000, 900, 5, 'IRE', 'Maternal'),
(N'Sữa Similac 5G số 4 900g (2-6 tuổi)', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 519000, 500, 5, 'IRE', '> 2 years old'),
(N'Sữa Similac Neosure 370g (0-12 tháng)', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 252000, 500, 5, 'IRE', '0-1 year'),
(N'Sữa Similac 5G số 3 1,7kg (1-2 tuổi)', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 895000, 420, 5, 'IRE', '1-2 years'),
(N'Sữa Similac Total Protection 3 900g (1 - 2 tuổi)', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 595000, 210, 5, 'IRE', '1-2 years'),
(N'Sữa Similac 5G số 3 900g (1-2 tuổi)', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 535000, 610, 5, 'IRE', '1-2 years'),
(N'Sữa Similac Total Comfort 1 (HMO) 360g (0-12 tháng)', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 305000, 980, 5, 'IRE', '0-1 year'),
(N'Sữa Similac 5G số 4 1,7kg (2-6 tuổi)', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 869000, 2200, 5, 'IRE', '> 2 years old'),
(N'Sữa dê Hikid 650g (2-9 tuổi)', N'Sản phẩm dinh dưỡng công thức với mục đích ăn bổ sung cho trẻ từ 2 - 9 tuổi: Hikid Goat Gold', 624000, 1200, 6, 'KOR', '> 2 years old'),
(N'Sữa Hikid vị Vani 600g (2-9 tuổi)', N'Sản phẩm dinh dưỡng công thức với mục đích ăn bổ sung cho trẻ từ 2 - 9 tuổi: Hikid Goat Gold', 533000, 870, 6, 'KOR', '> 2 years old'),
(N'Sữa Friso Gold Pro số 4 800g (3 - 6 tuổi)', N'Sản phẩm dinh dưỡng Friso Gold Pro 4 dành cho trẻ từ 3 - 6 tuổi', 595000, 990, 7, 'NED', '> 2 years old'),
(N'Sữa bầu Friso Mum Gold 400g hương cam', N'Thực phẩm bổ sung cho mẹ mang thai và cho con bú, hương cam nhãn hiệu Frisomum Gold DualCare+TM', 269000, 1760, 7, 'NED', 'Maternal'),
(N'Sữa Frisolac Gold số 3 850g (1 - 2 tuổi)', N'Sữa Frisolac Gold số 3 850g (1 - 2 tuổi)', 519000, 220, 7, 'NED', '1-2 years'),
(N'Sữa Friso Gold số 4 850g (2 - 6 tuổi)', N'Sữa Friso Gold số 4 850g (2 - 6 tuổi)', 495000, 1220, 7, 'NED', '> 2 years old'),
(N'Sữa Frisolac Gold số 3 1400g (1-2 tuổi)', N'Sữa Frisolac Gold số 3 1400g (1-2 tuổi)', 755000, 920, 7, 'NED', '1-2 years'),
(N'Sữa Famna Số 2 850g (0-12 tháng tuổi)', N'Sữa Famna Số 2 850g (0-12 tháng tuổi)', 459000, 230, 8, 'SWE', '0-1 year'),
(N'Sữa Famna Số 3 850g (1-2 tuổi)', N'Sữa Famna Số 3 850g (1-2 tuổi)', 419000, 560, 8, 'SWE', '1-2 years'),
(N'Sữa Enfagrow Enspire 3 850g (2-6 tuổi)', N'Sản phẩm dinh dưỡng Enfagrow Enspire 3 cho trẻ 2-6 tuổi 850g', 890000, 660, 9, 'THL', '> 2 years old'),
(N'Sữa Enfagrow Enspire 2 850g (1-2 tuổi)', N'Sản phẩm dinh dưỡng công thức Enfagrow Enspire 2 cho trẻ 1-3 tuổi 850g', 965000, 210, 9, 'THL', '1-2 years'),
(N'Sữa Enfagrow A+ số 4 830g (2-6 tuổi) 2Flex', N'Thực phẩm bổ sung Enfagrow A+ Neuropro 4 với 2’-FL HMO cho trẻ từ 2-6 tuổi', 515000, 890, 9, 'THL', '> 2 years old'),
(N'Sữa Enfamil Enspire Infant Formula 581g (0-12 tháng)', N'Sản phẩm dinh dưỡng công thức Enfamil Enspire Infant Formula (dành cho trẻ 0 - 12 tháng tuổi)', 515000, 890, 9, 'THL', '0-1 year'),
(N'Sữa Enfagrow A+ số 3 830g (1-3 tuổi) 2Flex', N'Sản phẩm dinh dưỡng công thức Enfagrow A+ Neuropro 3 với 2’-FL HMO follow up formula dành cho trẻ từ 12-36 tháng tuổi', 549000, 440, 9, 'THL', '1-2 years'),
(N'Sữa Nutramigen A+ LGG 400g (0-12 tháng)', N'Sản phẩm dinh dưỡng công thức Nutramigen A+ LGG với mục đích y tế đặc biệt cho trẻ từ 0 - 12 tháng tuổi', 559000, 660, 9, 'THL', '0-1 year'),
(N'Sữa Enfagrow A2 NeuroPro số 3 800g (1 - 6 tuổi)', N'Sữa Enfagrow A2 NeuroPro số 3 800g (1 - 6 tuổi)', 689000, 660, 9, 'THL', '> 2 years old'),
(N'Sữa Enfamil Enspire Infant Formula 850g (0-12 tháng)', N'Sản phẩm dinh dưỡng công thức Enfamil Enspire Infant Formula (dành cho trẻ 0 - 12 tháng tuổi)', 1219000, 760, 9, 'THL', '0-1 year'),
(N'Sữa Bellamys Organic Infant Formula số 1 900g (0-6 tháng)', N'Sữa Bellamys Organic Infant Formula số 1 900g (0-6 tháng)', 1069000, 430, 10, 'FRA', '0-1 year'),
(N'Sữa Aptamil Profutura Úc số 4 900g (từ 3 tuổi)', N'Sản phẩm dinh dưỡng công thức với mục đích ăn bổ sung Aptamil Profutura 4 Premium Nutritional Supplement dành cho trẻ từ 3 tuổi', 850000, 340, 11, 'FRA', '> 2 years old'),
(N'Sữa Aptamil Profutura Duobiotik 1 800g (0-6 tháng)', N'Sản phẩm dinh dưỡng công thức Aptamil Profutura Duobiotik 1', 795000, 1100, 11, 'FRA', '0-1 year'),
(N'Aptamil Profutura Cesarbiotik 1 380g (0-12 tháng)', N'Sản phẩm dinh dưỡng công thức Aptamil Profutura CESARBIOTIK 1, dành cho trẻ từ 0-12 tháng tuổi', 355000, 230, 11, 'FRA', '0-1 year'),
(N'Sữa Abbott Grow 2 900g (6-12 tháng)', N'Sản phẩm dinh dưỡng công thức cho trẻ 6-12 tháng tuổi: Abbott Grow 2', 329000, 900, 12, 'IRE', '0-1 year'),
(N'Sữa Abbott Grow 3 900g (1-2 tuổi)', N'Sản phẩm dinh dưỡng công thức cho trẻ 1-2 tuổi: Abbott Grow 3', 299000, 320, 12, 'IRE', '1-2 years')


-- Insert into Orders
INSERT INTO Orders (user_id, order_date, status, total_amount) VALUES
(4, '2024-06-18', 'Pending', 1200000),
(2, '2024-06-01', 'Completed', 55.98),
(3, '2024-06-05', 'Pending', 29.99);

-- Insert into Order_Items
INSERT INTO Order_Items (order_id, product_id, quantity, price) VALUES
(3, 2, 2, 400000),
(3, 2, 2, 800000),
(1, 1, 1, 25.99),
(1, 2, 1, 19.99),
(2, 3, 1, 29.99);

-- Insert into Vouchers
INSERT INTO Vouchers (code, discount, expiration_date) VALUES
('DISCOUNT10', 10.00, '2024-12-31'),
('WELCOME5', 5.00, '2024-06-30'),
('SPRING20', 20.00, '2024-07-31'),
('SUMMER15', 15.00, '2024-08-31'),
('FALL10', 10.00, '2024-09-30'),
('WINTER5', 5.00, '2024-10-31'),
('NEWYEAR25', 25.00, '2025-01-01');

-- Insert into Payment_Methods
INSERT INTO Payment_Methods (method_name, details) VALUES
('Momo', 'Mobile Money'),
('Zalopay', 'Online payment by Zalo'),
('Credit Card', 'Visa, MasterCard, Amex'),
('PayPal', 'paypal@example.com'),
('Bank Transfer', 'Account Number: 123456789, Bank: ABC Bank'),
('Cash on Delivery', 'Payment upon delivery'),
('Gift Card', 'Gift card code can be applied at checkout');

-- Insert into Payments
INSERT INTO Payments (order_id, payment_method_id, transaction_date, amount, transaction_status, payment_details) VALUES
(1, 1, '2024-06-01', 55.98, 'Completed', 'Visa ending in 1234'),
(2, 2, '2024-06-05', 29.99, 'Pending', 'PayPal transaction ID: abc123'),
(1, 3, '2024-06-01', 55.98, 'Completed', 'Bank transfer reference number: 987654321'),
(2, 4, '2024-06-05', 29.99, 'Pending', 'Payment will be collected upon delivery'),
(1, 5, '2024-06-01', 55.98, 'Completed', 'Gift card code: GIFT2024');

-- Additional Payments for variety
INSERT INTO Payments (order_id, payment_method_id, transaction_date, amount, transaction_status, payment_details) VALUES
(2, 1, '2024-06-07', 29.99, 'Completed', 'MasterCard ending in 5678'),
(1, 2, '2024-06-01', 55.98, 'Completed', 'PayPal transaction ID: def456'),
(2, 3, '2024-06-05', 29.99, 'Failed', 'Bank transfer failed, insufficient funds'),
(1, 4, '2024-06-01', 55.98, 'Completed', 'Payment will be collected upon delivery'),
(2, 5, '2024-06-05', 29.99, 'Pending', 'Gift card code: SUMMERGIFT');
