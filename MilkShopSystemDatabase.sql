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
    description NVARCHAR(MAX),
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock INT NOT NULL,
    brand_id INT REFERENCES Brands(brand_id),
    country_id CHAR(3) REFERENCES Originated_Country(country_id),
    age_range NVARCHAR(255) REFERENCES Age_Range(age_range),
	image_url VARCHAR(512)
);

CREATE TABLE Reviews (
    review_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id),
    product_id INT NOT NULL REFERENCES Products(product_id),
	order_id INT NOT NULL REFERENCES Orders(order_id),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment NVARCHAR(MAX),
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
    details NVARCHAR(MAX)
);

CREATE TABLE Payments (
    payment_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL REFERENCES Orders(order_id),
    payment_method_id INT NOT NULL REFERENCES Payment_Methods(payment_method_id),
    transaction_date DATETIME NOT NULL DEFAULT GETDATE(),
    amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
    transaction_status NVARCHAR(20) NOT NULL,
    payment_details NVARCHAR(MAX)
);

CREATE TABLE Posts (
    post_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id),
	title NVARCHAR(255),
    description NVARCHAR(MAX),
    post_date DATETIME DEFAULT GETDATE(),
	image_url NVARCHAR(MAX)
);

CREATE TABLE Reports (
    report_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id),
    product_id INT NOT NULL REFERENCES Products(product_id),
    order_id INT NOT NULL REFERENCES Orders(order_id),
    report_description NVARCHAR(MAX) NOT NULL,
    report_date DATETIME DEFAULT GETDATE()
);

CREATE TABLE RefreshTokens (
  token VARCHAR(255) PRIMARY KEY,
  user_id INT,
  expiryDate DATETIME,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE PasswordResetTokens (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
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
INSERT INTO Products (product_name, description, price, stock, brand_id, country_id, age_range, image_url) VALUES
(N'Vinamilk Yoko Gold 1 350g', N'High-quality milk from Yoko Gold for infants 0-1 year.', 229000, 120, 1, 'VNA', '0-1 year', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fyokogold%2Fvinamilk-yoko-gold-1-0-1-tuoi-350g.png?alt=media&token=290cc729-d928-4c6f-933d-9ad5f9557bdd'),
(N'Vinamilk Yoko Gold 2 850g', N'High-quality milk from Yoko Gold for babies 1-2 years.', 435000, 90, 1, 'VNA', '1-2 years', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fyokogold%2Fvinamilk-yoko-gold-1-1-2-tuoi-850g.png?alt=media&token=bf8aad2e-d4ec-4dbf-bda5-2435feef6e22'),
(N'Vinamilk Yoko Gold 1 850g', N'High-quality milk from Yoko Gold for infants 0-1 year.', 449000, 120, 1, 'VNA', '0-1 year', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fyokogold%2Fvinamilk-yoko-gold-1-0-1-tuoi-850g.png?alt=media&token=979b3ee3-9829-4bf4-b072-6a42d927b8da'),
(N'Vinamilk Yoko Gold 3 850g', N'High-quality milk from Yoko Gold for kids 2-6 years.', 337100, 120, 1, 'VNA', '> 2 years old', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fyokogold%2Fvinamilk-yoko-gold-3-2-6-tuoi-850g.png?alt=media&token=40864442-1a1c-4c5a-9217-619ef4d9f7a5'),
(N'Sữa Wakodo MOM 300g', N'Dành cho mẹ mang thai và cho con bú.', 219000, 360, 2, 'JPN', 'Maternal', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fwakodo%2Fwakodo-MOM-300g.png?alt=media&token=b8708ae1-f10d-4f40-8497-087925fc554f'),
(N'Sữa Wakodo MOM 830g', N'Dành cho mẹ mang thai và cho con bú.', 455000, 210, 2, 'JPN', 'Maternal', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fwakodo%2Fwakodo-MOM-830g.png?alt=media&token=5c4e61f2-2b8e-4371-ad7a-913a4a927752'),
(N'Sữa Vinamilk ColosGold số 2 350g (1-2 tuổi)', N'Dành cho trẻ từ 1 đến 2 tuổi.', 219000, 600, 3, 'VNA', '1-2 years', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fvinamilk%2Fsua-vinamilk-colosgold-so-2-350g-1-2-tuoi.png?alt=media&token=4a52d3ba-bc37-47de-9d76-3d47451b2c49'),
(N'Sữa bột Vinamilk Kenko Haru hộp 850g', N'Dành cho trẻ từ 1 đến 2 tuổi.', 605000, 600, 3, 'VNA', '1-2 years', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fvinamilk%2Fsb-vnm-kenko-haru-ht850g.png?alt=media&token=c6d4dfd4-5bed-46f0-8876-c769b5717f9f'),
(N'Sữa Vinamilk ColosGold 1 350g (0-1 tuổi)', N'Dành cho trẻ từ 0-1 tuổi.', 235000, 340, 3, 'VNA', '0-1 year', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fvinamilk%2Fsua-vinamilk-colosgold-so-1-350g-0-1-tuoi.png?alt=media&token=3d109a21-7963-4bf7-bc64-e3c6b17092fc'),
(N'Sữa Dielac Grow Plus 1+, 1-2 tuổi, 850g', N'Dành cho trẻ từ 0-1 tuổi tới từ VN.', 365000, 2450, 3, 'VNA', '1-2 years', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fvinamilk%2Fdielac-grow-plus-1-1-2-tuoi-850g.png?alt=media&token=5c40669c-1af9-44a5-a1c2-1042704eec61'),
(N'Sữa Vinamilk ColosGold số 2 800g (1-2 tuổi)', N'Dành cho trẻ từ 1-2 tuổi tới từ VN.', 419000, 120, 3, 'VNA', '1-2 years', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fvinamilk%2Fsua-vinamilk-colosgold-so-2-800g-1-2-tuoi.png?alt=media&token=678482fd-3f6c-4eb8-a6c8-41f79c758de1'),
(N'Sữa Vinamilk ColosGold số 1 800g (0-1 tuổi)', N'Dành cho trẻ từ 0-1 tuổi tới từ VN.', 449000, 650, 3, 'VNA', '0-1 year', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fvinamilk%2Fsua-vinamilk-colosgold-so-1-800g-0-1-tuoi.png?alt=media&token=8f0ee285-d8f5-45fe-8019-42b2a6ed2efb'),
(N'Sữa Dielac Alpha Gold IQ 3, 850g (1-2 tuổi)', N'Dành cho trẻ từ 1-2 tuổi tới từ Dielac.', 285000, 340, 3, 'VNA', '1-2 years', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fvinamilk%2Fdielac-alpha-gold-iq-2-800g.png?alt=media&token=a3bb6b54-01e1-444c-9084-2f9fa503bdf5'),
(N'Vinamilk Optimum Gold 3, 850g, 1-2 tuổi', N'Dành cho trẻ từ 1-2 tuổi tới từ Optimum.', 369000, 1200, 3, 'VNA', '1-2 years', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fvinamilk%2Fvinamilk-optimum-gold-3-850g-1-2-tuoi.png?alt=media&token=26fb7dcf-3a19-424a-8dd2-8e3443068235'),
(N'Sữa Vinamilk ColosGold số 3 800g (2-6 tuổi)', N'Dành cho trẻ từ 2-6 tuổi tới từ ColosGold.', 359100, 920, 3, 'VNA', '> 2 years old', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fvinamilk%2Fsua-vinamilk-colosgold-so-3-800g-2-6-tuoi.png?alt=media&token=5286086a-e535-4a93-932a-bb2b92283bac'),
(N'Sữa Dielac Grow Plus 2+, 2-10 tuổi, 850g', N'Dành cho trẻ từ 2-10 tuổi tới từ Dielac.', 323100, 490, 3, 'VNA', '> 2 years old', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fvinamilk%2Fdielac-grow-plus-2-2-10-tuoi-850g.png?alt=media&token=45fa5661-0e78-4916-9afb-7f9db2507dac'),
(N'Vinamilk Optimum Gold 4, 850g, 2-6 tuổi', N'Dành cho trẻ từ 2-6 tuổi tới từ Optimum.', 314100, 250, 3, 'VNA', '> 2 years old', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fvinamilk%2Fvinamilk-optimum-gold-4-850g-2-6-tuoi.png?alt=media&token=5921dabf-d7f3-4b4c-b72e-1ad7920b1728'),
(N'Sữa Nutifood Varna Complete 850g', N'Thụy Điển, dưới sự giám sát chặt chẽ theo tiêu chuẩn chất lượng nghiêm ngặt của Viện Nghiên Cứu Dinh Dưỡng Nutifood Thụy Điển', 531000, 750, 4, 'SWE', 'Adult', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fvanma(nutifood)%2Fvarna-complete-850g.png?alt=media&token=da415ee5-9f45-460d-a27e-7f97bf2b1e7b'),
(N'Sữa Nutifood Varna Complete 400g', N'Thụy Điển, dưới sự giám sát chặt chẽ theo tiêu chuẩn chất lượng nghiêm ngặt của Viện Nghiên Cứu Dinh Dưỡng Nutifood Thụy Điển', 269000, 660, 4, 'SWE', 'Adult', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fvanma(nutifood)%2Fsua-nutifood-varna-complete-400g.png?alt=media&token=b418bcc6-11c0-4377-88c5-89f6cfaf87ee'),
(N'Sữa Similac Total Protection 4 900g (2 - 6 tuổi)', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 559000, 260, 5, 'IRE', '> 2 years old', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fsimilac%2Fsua-similac-total-protection-4-5-hmo-900g-2-6-tuoi.png?alt=media&token=aaff8016-4884-485f-bf14-22a1476fee2c'),
(N'Sữa bầu Similac Mom 900g hương Vani', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 455000, 900, 5, 'IRE', 'Maternal', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2FSuame%2Fsua-bau-similac-mom-900g-huong-vani.png?alt=media&token=08650889-fb36-4f1b-95ab-30a6db4371f1'),
(N'Sữa Similac 5G số 4 900g (2-6 tuổi)', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 519000, 500, 5, 'IRE', '> 2 years old', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fsimilac%2Fsua-similac-5g-so-4-900g-2-6-tuoi.png?alt=media&token=aed4c643-fb7a-4775-ae5a-0f07ec989c6b'),
(N'Sữa Similac Neosure 370g (0-12 tháng)', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 252000, 500, 5, 'IRE', '0-1 year', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fsimilac%2Fsimilac-neosure-370g.png?alt=media&token=bac11436-30fe-4f01-937f-610574213187'),
(N'Sữa Similac 5G số 3 1,7kg (1-2 tuổi)', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 895000, 420, 5, 'IRE', '1-2 years', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fsimilac%2Fsua-similac-5g-so-3-1-7kg-1-2-tuoi.png?alt=media&token=7ae364e8-f16c-4851-9679-2839f9cada02'),
(N'Sữa Similac Total Protection 3 900g (1 - 2 tuổi)', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 595000, 210, 5, 'IRE', '1-2 years', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fsimilac%2Fsua-similac-total-protection-3-5-hmo-900g-1-2-tuoi.png?alt=media&token=ee806e13-31dc-47d1-92fb-2ef602fcfb60'),
(N'Sữa Similac 5G số 3 900g (1-2 tuổi)', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 535000, 610, 5, 'IRE', '1-2 years', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fsimilac%2Fsua-similac-5g-so-3-900g-1-2-tuoi.png?alt=media&token=8a436350-e81e-47bd-8808-d66250787a2b'),
(N'Sữa Similac Total Comfort 1 (HMO) 360g (0-12 tháng)', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 305000, 980, 5, 'IRE', '0-1 year', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fsimilac%2Fsimilac-total-comfort-360g.png?alt=media&token=a57804a5-02c1-4324-9af4-898f1578e230'),
(N'Sữa Similac 5G số 4 1,7kg (2-6 tuổi)', N'Abbott Ireland, Cootehill, Co. Cavan, Ireland', 869000, 2200, 5, 'IRE', '> 2 years old', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fsimilac%2Fsua-similac-5g-so-4-1-7kg-2-6-tuoi.png?alt=media&token=18d8b8a3-1745-48d8-a7ce-1733343607f4'),
(N'Sữa dê Hikid 650g (2-9 tuổi)', N'Sản phẩm dinh dưỡng công thức với mục đích ăn bổ sung cho trẻ từ 2 - 9 tuổi: Hikid Goat Gold', 624000, 1200, 6, 'KOR', '> 2 years old', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fhikid%2Fhikid-huong-vani-1-9-tuoi-650g.png?alt=media&token=748ff639-3be2-4465-ae45-18c8ad1959e3'),
(N'Sữa Hikid vị Vani 600g (2-9 tuổi)', N'Sản phẩm dinh dưỡng công thức với mục đích ăn bổ sung cho trẻ từ 2 - 9 tuổi: Hikid Goat Gold', 533000, 870, 6, 'KOR', '> 2 years old', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fhikid%2Fhikid-huong-vani-1-9-tuoi-600g.png?alt=media&token=3ec88819-3499-4d77-9d19-55d598309da6'),
(N'Sữa Friso Gold Pro số 4 800g (3 - 6 tuổi)', N'Sản phẩm dinh dưỡng Friso Gold Pro 4 dành cho trẻ từ 3 - 6 tuổi', 595000, 990, 7, 'NED', '> 2 years old', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Ffrisogoldpro%2Ffriso-gold-pro-so-4-800g-3-6-tuoi.png?alt=media&token=78e5bd0e-62a0-4759-abe8-5a2ff2dcc217'),
(N'Sữa bầu Friso Mum Gold 400g hương cam', N'Thực phẩm bổ sung cho mẹ mang thai và cho con bú, hương cam nhãn hiệu Frisomum Gold DualCare+TM', 269000, 1760, 7, 'NED', 'Maternal', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2FSuame%2Ffriso-mum-gold-huong-cam-400g.png?alt=media&token=c8ceab0c-608f-4e7a-aaf2-3dd8b54f38d3'),
(N'Sữa Frisolac Gold số 3 850g (1 - 2 tuổi)', N'Sữa Frisolac Gold số 3 850g (1 - 2 tuổi)', 519000, 220, 7, 'NED', '1-2 years', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Ffrisogoldpro%2Ffrisolac-gold-pro-so-3-800g-1-3-tuoi.png?alt=media&token=d1f04158-0489-481a-a8aa-d78b36f64776'),
(N'Sữa Friso Gold số 4 850g (2 - 6 tuổi)', N'Sữa Friso Gold số 4 850g (2 - 6 tuổi)', 495000, 1220, 7, 'NED', '> 2 years old', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Ffrisogoldpro%2Ffriso-gold-4-2-6-tuoi-850gr.png?alt=media&token=7a0804ed-3520-4d51-8829-4b1e760228da'),
(N'Sữa Frisolac Gold số 3 1400g (1-2 tuổi)', N'Sữa Frisolac Gold số 3 1400g (1-2 tuổi)', 755000, 920, 7, 'NED', '1-2 years', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Ffrisogoldpro%2Ffrisolac-gold-3-1-2-tuoi-1400gr.png?alt=media&token=905ad11d-14e0-4e7b-94f5-26f3fa81b4ea'),
(N'Sữa Famna Số 2 850g (0-12 tháng tuổi)', N'Sữa Famna Số 2 850g (0-12 tháng tuổi)', 459000, 230, 8, 'SWE', '0-1 year', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Ffanma(nutifood)%2Fsua-famna-step-2-6-12-thang-850g.png?alt=media&token=701addc1-b38a-462a-8683-062eb29551b3'),
(N'Sữa Famna Số 3 850g (1-2 tuổi)', N'Sữa Famna Số 3 850g (1-2 tuổi)', 419000, 560, 8, 'SWE', '1-2 years', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Ffanma(nutifood)%2Fsua-famna-step-3-1-2-tuoi850g.png?alt=media&token=c4b32de3-0ba8-4864-ac94-8f7b0da603ed'),
(N'Sữa Enfagrow Enspire 3 850g (2-6 tuổi)', N'Sản phẩm dinh dưỡng Enfagrow Enspire 3 cho trẻ 2-6 tuổi 850g', 890000, 660, 9, 'THL', '> 2 years old', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fenfamil%2Fenfamil-a-so-3-830g-2flex.png?alt=media&token=2ee06e4e-2d20-4f3d-981a-f1bd503130b7'),
(N'Sữa Enfagrow Enspire 2 850g (1-2 tuổi)', N'Sản phẩm dinh dưỡng công thức Enfagrow Enspire 2 cho trẻ 1-3 tuổi 850g', 965000, 210, 9, 'THL', '1-2 years', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fenfamil%2Fenfagrow-enspire-2-850g.png?alt=media&token=4326fbeb-559e-49be-8784-34459a044092'),
(N'Sữa Enfagrow A+ số 4 830g (2-6 tuổi) 2Flex', N'Thực phẩm bổ sung Enfagrow A+ Neuropro 4 với 2’-FL HMO cho trẻ từ 2-6 tuổi', 515000, 890, 9, 'THL', '> 2 years old', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fenfamil%2Fenfamil-a-so-4-830g-2flex.png?alt=media&token=bc8e0c50-40ba-4dd4-bc92-2997eaa28d18'),
(N'Sữa Enfamil Enspire Infant Formula 581g (0-12 tháng)', N'Sản phẩm dinh dưỡng công thức Enfamil Enspire Infant Formula (dành cho trẻ 0 - 12 tháng tuổi)', 915000, 890, 9, 'THL', '0-1 year', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fenfamil%2Fenfamil-enspire-infant-formula-0-12-thang-tuoi-581g.png?alt=media&token=5db5c79d-5ad8-443e-9109-fc52503fe9a5'),
(N'Sữa Enfagrow A+ số 3 830g (1-3 tuổi) 2Flex', N'Sản phẩm dinh dưỡng công thức Enfagrow A+ Neuropro 3 với 2’-FL HMO follow up formula dành cho trẻ từ 12-36 tháng tuổi', 549000, 440, 9, 'THL', '1-2 years', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fenfamil%2Fenfamil-a-so-1-400g-2flex.png?alt=media&token=48368bb8-0fe9-44d7-a8c1-4b0f99db13e6'),
(N'Sữa Nutramigen A+ LGG 400g (0-12 tháng)', N'Sản phẩm dinh dưỡng công thức Nutramigen A+ LGG với mục đích y tế đặc biệt cho trẻ từ 0 - 12 tháng tuổi', 559000, 660, 9, 'THL', '0-1 year', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fenfamil%2Fnutramigen-a-lgg-400g.png?alt=media&token=f161a3fc-fbc3-4c3d-96a7-4677fa02dfa2'),
(N'Sữa Enfagrow A2 NeuroPro số 3 800g (1 - 6 tuổi)', N'Sữa Enfagrow A2 NeuroPro số 3 800g (1 - 6 tuổi)', 689000, 660, 9, 'THL', '> 2 years old', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fenfamil%2Fenfamil-a-so-2-1700g-2flex.png?alt=media&token=1e84dbba-e0df-4a22-8fca-aae0d705c93d'),
(N'Sữa Enfamil Enspire Infant Formula 850g (0-12 tháng)', N'Sản phẩm dinh dưỡng công thức Enfamil Enspire Infant Formula (dành cho trẻ 0 - 12 tháng tuổi)', 1219000, 760, 9, 'THL', '0-1 year', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fenfamil%2Fenfamil-a-so-1-830g-2flex.png?alt=media&token=b526f594-a703-41d0-8c88-1023249a7751'),
(N'Sữa Bellamys Organic Infant Formula số 1 900g (0-6 tháng)', N'Sữa Bellamys Organic Infant Formula số 1 900g (0-6 tháng)', 1069000, 430, 10, 'FRA', '0-1 year', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Fbellamy%2Fbellamy-s-organic-infant-formula-1-900g-0-6-thang.png?alt=media&token=923a26b8-7473-40e7-8c0f-2a89870523fb'),
(N'Sữa Aptamil Profutura Úc số 4 900g (từ 3 tuổi)', N'Sản phẩm dinh dưỡng công thức với mục đích ăn bổ sung Aptamil Profutura 4 Premium Nutritional Supplement dành cho trẻ từ 3 tuổi', 850000, 340, 11, 'FRA', '> 2 years old', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Faptamil%2Faptamil-san-pham-dinh-duong-cong-thuc-voi-muc-dich-an-bo-sung-profutura-4-premium-nutritional-supplement-danh-cho-tre-tu-3-tuoi.png?alt=media&token=0d1c9f42-88ac-4439-9d5a-f9eb67a90c7d'),
(N'Sữa Aptamil Profutura Duobiotik 1 800g (0-6 tháng)', N'Sản phẩm dinh dưỡng công thức Aptamil Profutura Duobiotik 1', 795000, 1100, 11, 'FRA', '0-1 year', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Faptamil%2Faptamil-profutura-cesarbiotik-1-infant-formula-danh-cho-tre-tu-0--12-thang-tuoi-800g.png?alt=media&token=4bd66e73-3706-46b4-8737-be073e87d54f'),
(N'Aptamil Profutura Cesarbiotik 1 380g (0-12 tháng)', N'Sản phẩm dinh dưỡng công thức Aptamil Profutura CESARBIOTIK 1, dành cho trẻ từ 0-12 tháng tuổi', 355000, 230, 11, 'FRA', '0-1 year', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Faptamil%2Faptamil-profutura-cesarbiotik-1-infant-formula-danh-cho-tre-tu-0--12-thang-tuoi-380g.png?alt=media&token=b68becf9-fdfc-4740-9610-be4265cfe908'),
(N'Sữa Abbott Grow 2 900g (6-12 tháng)', N'Sản phẩm dinh dưỡng công thức cho trẻ 6-12 tháng tuổi: Abbott Grow 2', 329000, 900, 12, 'IRE', '0-1 year', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2FabbottGrow%2Fsua-abbott-grow-2-6-12-thang-900g.png?alt=media&token=810c28e3-754c-4ce5-b171-6fcaaa1027d4'),
(N'Sữa Abbott Grow 3 900g (1-2 tuổi)', N'Sản phẩm dinh dưỡng công thức cho trẻ 1-2 tuổi: Abbott Grow 3', 299000, 320, 12, 'IRE', '1-2 years', 'https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2FabbottGrow%2Fsua-abbott-grow-3-900g-1-2-tuoi.png?alt=media&token=3de16752-0d09-4fa2-9556-6c31a6adba7b')

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

SELECT p.*, o.total_amount, oi. quantity FROM Orders o JOIN Order_Items oi ON o.order_id = oi.order_id JOIN Products p ON oi.product_id = p.product_id WHERE o.user_id = 4 
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