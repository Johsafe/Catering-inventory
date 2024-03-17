-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: catering
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cookedfoods`
--

DROP TABLE IF EXISTS `cookedfoods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cookedfoods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `foodName` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `cloudinary_id` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `quantity` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `RecipeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `RecipeId` (`RecipeId`),
  CONSTRAINT `cookedfoods_ibfk_1` FOREIGN KEY (`RecipeId`) REFERENCES `recipes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cookedfoods`
--

LOCK TABLES `cookedfoods` WRITE;
/*!40000 ALTER TABLE `cookedfoods` DISABLE KEYS */;
INSERT INTO `cookedfoods` VALUES (1,6,'Fried Goat','https://res.cloudinary.com/drselhsl4/image/upload/v1710584907/catering/l2ac4ylp3qwksvbswswz.png','catering/l2ac4ylp3qwksvbswswz',400,100,'2024-03-16 10:28:33','2024-03-16 10:28:33',6),(2,11,'Fried Chicken','https://res.cloudinary.com/drselhsl4/image/upload/v1710586148/catering/uknasisl8pyiatqaxy9l.png','catering/uknasisl8pyiatqaxy9l',50,0,'2024-03-16 10:49:10','2024-03-16 12:06:04',11),(3,7,'Steamed Rice','https://res.cloudinary.com/drselhsl4/image/upload/v1710586266/catering/srfh8ylgzetjgqjukljo.png','catering/srfh8ylgzetjgqjukljo',100,150,'2024-03-16 10:51:08','2024-03-16 10:51:08',7),(4,10,'Boiled Goose  Eggs','https://res.cloudinary.com/drselhsl4/image/upload/v1710589101/catering/p25kczpijoo56f3hhccw.png','catering/p25kczpijoo56f3hhccw',50,200,'2024-03-16 11:38:22','2024-03-16 11:38:22',10),(5,9,'Salad','https://res.cloudinary.com/drselhsl4/image/upload/v1710590094/catering/sruj3qoihmh1zrwc4own.png','catering/sruj3qoihmh1zrwc4own',50,150,'2024-03-16 11:42:36','2024-03-16 11:54:54',11);
/*!40000 ALTER TABLE `cookedfoods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` varchar(255) NOT NULL,
  `pdct_id` int NOT NULL,
  `quantity` int NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `RecipeId` int DEFAULT NULL,
  `ProductId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `RecipeId` (`RecipeId`),
  KEY `ProductId` (`ProductId`),
  CONSTRAINT `ingredients_ibfk_1` FOREIGN KEY (`RecipeId`) REFERENCES `recipes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ingredients_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (1,'1',3,10,'Sukumawiki','https://res.cloudinary.com/drselhsl4/image/upload/v1708347735/catering/twj0gr6yhbxvjm6ba8lm.png','2024-02-26 13:17:42','2024-02-26 13:17:42',NULL,NULL),(2,'1',4,5,'Tomatoes','https://res.cloudinary.com/drselhsl4/image/upload/v1708488493/catering/tknwaecnzbzzirlvkuaw.webp','2024-02-26 13:17:42','2024-02-26 13:17:42',NULL,NULL),(14,'6',7,20,'Goat Meat','https://res.cloudinary.com/drselhsl4/image/upload/v1708488493/catering/tknwaecnzbzzirlvkuaw.webp','2024-03-16 07:42:32','2024-03-16 07:42:32',NULL,NULL),(15,'6',5,5,'Onions','https://res.cloudinary.com/drselhsl4/image/upload/v1710500192/catering/e3rsc1bvpxgrmaiszcrg.png','2024-03-16 07:42:32','2024-03-16 07:42:32',NULL,NULL),(16,'6',4,10,'Tomatoes','https://res.cloudinary.com/drselhsl4/image/upload/v1708518816/catering/qvam80rupst54pqr0mnx.webp','2024-03-16 07:42:32','2024-03-16 07:42:32',NULL,NULL),(17,'7',8,20,'Rice','https://res.cloudinary.com/drselhsl4/image/upload/v1710500304/catering/yuoxisep9vv1ecpkmzsw.png','2024-03-16 07:56:35','2024-03-16 07:56:35',NULL,NULL),(18,'8',3,12,'sukumawiki','https://res.cloudinary.com/drselhsl4/image/upload/v1710499659/catering/jlaukebdavusml9e7xuj.png','2024-03-16 07:57:25','2024-03-16 07:57:25',NULL,NULL),(19,'8',4,3,'Tomatoes','https://res.cloudinary.com/drselhsl4/image/upload/v1708488493/catering/tknwaecnzbzzirlvkuaw.webp','2024-03-16 07:57:25','2024-03-16 07:57:25',NULL,NULL),(20,'8',5,1,'Onions','https://res.cloudinary.com/drselhsl4/image/upload/v1708518816/catering/qvam80rupst54pqr0mnx.webp','2024-03-16 07:57:25','2024-03-16 07:57:25',NULL,NULL),(21,'9',4,10,'Tomatoes','https://res.cloudinary.com/drselhsl4/image/upload/v1708488493/catering/tknwaecnzbzzirlvkuaw.webp','2024-03-16 07:59:06','2024-03-16 07:59:06',NULL,NULL),(22,'9',5,4,'Onions','https://res.cloudinary.com/drselhsl4/image/upload/v1708518816/catering/qvam80rupst54pqr0mnx.webp','2024-03-16 07:59:06','2024-03-16 07:59:06',NULL,NULL),(23,'10',10,20,'Goose Eggs','https://res.cloudinary.com/drselhsl4/image/upload/v1710585112/catering/k69dqftaediliocrr0wr.png','2024-03-16 10:33:41','2024-03-16 10:33:41',NULL,NULL),(24,'11',9,30,'Chicken','https://res.cloudinary.com/drselhsl4/image/upload/v1708518816/catering/qvam80rupst54pqr0mnx.webp','2024-03-16 10:34:19','2024-03-16 10:34:19',NULL,NULL),(25,'11',5,5,'Onions','https://res.cloudinary.com/drselhsl4/image/upload/v1710585025/catering/wjnqt3c8ekvt8a9iqtgg.png','2024-03-16 10:34:19','2024-03-16 10:34:19',NULL,NULL);
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitems`
--

DROP TABLE IF EXISTS `orderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_no` varchar(255) NOT NULL,
  `OrderId` int NOT NULL,
  `CookedFoodId` int NOT NULL,
  `quantity` int NOT NULL,
  `food_name` varchar(255) NOT NULL,
  `food_image` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderId` (`OrderId`),
  KEY `CookedFoodId` (`CookedFoodId`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`CookedFoodId`) REFERENCES `cookedfoods` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitems`
--

LOCK TABLES `orderitems` WRITE;
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_no` varchar(255) NOT NULL,
  `customer` varchar(255) NOT NULL,
  `total` float NOT NULL DEFAULT '0',
  `paymentMethod` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'ORD-DAG124','Elphy',0,'Mpesa','2024-03-16 12:06:04','2024-03-16 12:06:04'),(2,'ORD-LG3869','Elphy',0,'Mpesa','2024-03-16 12:06:27','2024-03-16 12:06:27'),(3,'ORD-K1K442','Elphy',0,'Mpesa','2024-03-16 12:08:59','2024-03-16 12:08:59'),(4,'ORD-JP5936','John Doe',0,'Cash','2024-03-16 12:36:17','2024-03-16 12:36:17'),(5,'ORD-B43439','Asgard Tel',0,'Cash','2024-03-16 12:39:35','2024-03-16 12:39:35'),(6,'ORD-F26195','Asgard Tel',0,'Cash','2024-03-16 12:41:09','2024-03-16 12:41:09');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `expire` varchar(255) NOT NULL,
  `cost` float NOT NULL,
  `supplierId` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `cloudinary_id` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `batch` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `inStock` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (3,'sukumawiki','end of june',8000,4,'instock','https://res.cloudinary.com/drselhsl4/image/upload/v1710499659/catering/jlaukebdavusml9e7xuj.png','catering/jlaukebdavusml9e7xuj','Vegetable','June','sukumawiki',6000,'2024-02-19 13:02:16','2024-03-16 10:40:07'),(4,'Tomatoes','end of june',8000,4,'instock','https://res.cloudinary.com/drselhsl4/image/upload/v1708488493/catering/tknwaecnzbzzirlvkuaw.webp','catering/tknwaecnzbzzirlvkuaw','Vegetable','June','tomatoes',19630,'2024-02-21 04:08:13','2024-03-16 10:39:54'),(5,'Onions','12-01-2024',12000,4,'instock','https://res.cloudinary.com/drselhsl4/image/upload/v1708518816/catering/qvam80rupst54pqr0mnx.webp','catering/qvam80rupst54pqr0mnx','Vegetable','January','Onions is a vegetable',13480,'2024-02-21 12:33:37','2024-03-16 11:42:36'),(6,'Potatoes','23-4-2024',1200,4,'inStock','https://res.cloudinary.com/drselhsl4/image/upload/v1710499888/catering/gzj06snpa8zzcbp48sa7.png','catering/gzj06snpa8zzcbp48sa7','Vegetable','April','Potatoes are a vegetable',100,'2024-03-15 10:51:29','2024-03-16 07:32:13'),(7,'Goat Meat','20-4-2024',4000,3,'inStock','https://res.cloudinary.com/drselhsl4/image/upload/v1710500192/catering/e3rsc1bvpxgrmaiszcrg.png','catering/e3rsc1bvpxgrmaiszcrg','Meat','April','Fresh Sweet Goat Meat',160,'2024-03-15 10:56:34','2024-03-16 10:28:32'),(8,'Rice','30-4-2024',12000,7,'inStock','https://res.cloudinary.com/drselhsl4/image/upload/v1710500304/catering/yuoxisep9vv1ecpkmzsw.png','catering/yuoxisep9vv1ecpkmzsw','Cereals','April','Sweet Bahati Rice',280,'2024-03-15 10:58:28','2024-03-16 11:57:21'),(9,'Chicken','27-4-2024',8000,3,'inStock','https://res.cloudinary.com/drselhsl4/image/upload/v1710585025/catering/wjnqt3c8ekvt8a9iqtgg.png','catering/wjnqt3c8ekvt8a9iqtgg','Meat','April','Chicken',140,'2024-03-16 10:30:26','2024-03-16 11:42:36'),(10,'Goose Eggs','27-5-2024',1500,3,'inStock','https://res.cloudinary.com/drselhsl4/image/upload/v1710585112/catering/k69dqftaediliocrr0wr.png','catering/k69dqftaediliocrr0wr','Eggs','April','Fresh Goose Eggs',180,'2024-03-16 10:31:54','2024-03-16 11:38:21');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (6,'Dry Fried Goat  Recipe','A Recipe to cook a dried goat meat.','2024-03-16 07:42:32','2024-03-16 07:42:32'),(7,'Steamed Rice','Steamed Rice Recipe','2024-03-16 07:56:35','2024-03-16 07:56:35'),(8,'Sukumawiki','Fried Sukumawiki Recipe','2024-03-16 07:57:25','2024-03-16 07:57:25'),(9,'Salad Recipe','Salad Recipe','2024-03-16 07:59:06','2024-03-16 07:59:06'),(10,'Boiled Goose Egg Recipe','Boiled Goose Eggs','2024-03-16 10:33:41','2024-03-16 10:33:41'),(11,'Fried Chicken','Fried Chicken Recipe','2024-03-16 10:34:18','2024-03-16 10:34:18');
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (3,'Jacob Kamau','Kenya Meat Association','josephmwamuye11@gmail.com','254798995454','Mombasa,Kenya','2024-02-19 12:18:44','2024-03-15 11:10:09'),(4,'Jose Mwamuye','Fresh Organic Farm','josephmwamuye17@gmail.com','254798995459','Mombasa,Kenya','2024-02-19 12:18:56','2024-03-15 11:10:40'),(5,'David Jc','All Spices Company','achievers@gmail.com','254798453217','Mombasa , Kenya','2024-02-25 13:15:49','2024-03-15 11:11:18'),(7,'Sabina Everlyn','Cereals Company Kenya','cerals@gmail.com','254798564312','Kilifi,Kenya','2024-03-16 06:58:05','2024-03-16 06:58:05');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'asgard','asgard@gmail.com','$2a$10$Lnofz3y4mfXIsgmUDZ1i7elXXvEd4byMB0qpGmdT6p3XKuhD1QLnm','Admin','2024-03-16 20:55:30','2024-03-16 20:55:30'),(2,'Cashier','cashier@gmail.com','$2a$10$ABaRPiw5iWu35Jos3ruJZO7xAmNPHY7IYpO9v9z5Mr9Bqf2Ks6Zim','Cashier','2024-03-16 20:56:19','2024-03-16 20:56:19'),(3,'Chef','chef@gmail.com','$2a$10$WrDCw8Ku1b3XFUX87uWGleisnDiKUhkze1dmdVDyuRAOXWwaEDn52','Chef','2024-03-16 20:57:11','2024-03-16 20:57:11'),(4,'Cashier1','cashier1@gmail.com','$2a$10$069s.3TBPoOqinTyk29BDueKHYjWaAhCc5JIF8lLtLDeQ0THSkhZW','Cashier','2024-03-16 20:57:33','2024-03-16 20:57:33');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-17 19:59:26
