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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `RecipeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `RecipeId` (`RecipeId`),
  CONSTRAINT `cookedfoods_ibfk_1` FOREIGN KEY (`RecipeId`) REFERENCES `recipes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cookedfoods`
--

LOCK TABLES `cookedfoods` WRITE;
/*!40000 ALTER TABLE `cookedfoods` DISABLE KEYS */;
INSERT INTO `cookedfoods` VALUES (2,4,'Sukumawiki','https://res.cloudinary.com/drselhsl4/image/upload/v1709484003/catering/m1inwcsjx2e1fnnejpqj.jpg','catering/m1inwcsjx2e1fnnejpqj',20,'2024-03-03 16:40:04','2024-03-03 16:40:04',4);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (1,'1',3,10,'Sukumawiki','https://res.cloudinary.com/drselhsl4/image/upload/v1708347735/catering/twj0gr6yhbxvjm6ba8lm.png','2024-02-26 13:17:42','2024-02-26 13:17:42',NULL,NULL),(2,'1',4,5,'Tomatoes','https://res.cloudinary.com/drselhsl4/image/upload/v1708488493/catering/tknwaecnzbzzirlvkuaw.webp','2024-02-26 13:17:42','2024-02-26 13:17:42',NULL,NULL),(7,'4',3,1000,'Sukumawiki','https://res.cloudinary.com/drselhsl4/image/upload/v1708347735/catering/twj0gr6yhbxvjm6ba8lm.png','2024-02-27 18:28:28','2024-02-28 04:48:55',NULL,NULL),(8,'4',4,50,'Tomatoes','https://res.cloudinary.com/drselhsl4/image/upload/v1708488493/catering/tknwaecnzbzzirlvkuaw.webp','2024-02-27 18:28:28','2024-02-28 04:48:55',NULL,NULL),(9,'4',3,1000,'Sukumawiki','https://res.cloudinary.com/drselhsl4/image/upload/v1708347735/catering/twj0gr6yhbxvjm6ba8lm.png','2024-02-27 18:52:16','2024-02-27 18:52:16',NULL,NULL),(10,'4',4,50,'Tomatoes','https://res.cloudinary.com/drselhsl4/image/upload/v1708488493/catering/tknwaecnzbzzirlvkuaw.webp','2024-02-27 18:52:16','2024-02-27 18:52:16',NULL,NULL),(11,'4',5,500,'Onions','https://res.cloudinary.com/drselhsl4/image/upload/v1708518816/catering/qvam80rupst54pqr0mnx.webp','2024-02-27 18:52:16','2024-02-27 18:52:16',NULL,NULL);
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
  `food_id` int NOT NULL,
  `quantity` int NOT NULL,
  `food_name` varchar(255) NOT NULL,
  `food_image` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `OrderOrderNo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderOrderNo` (`OrderOrderNo`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`OrderOrderNo`) REFERENCES `orders` (`order_no`) ON DELETE SET NULL ON UPDATE CASCADE
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
  `order_no` varchar(255) NOT NULL,
  `customer` varchar(255) NOT NULL,
  `total` float NOT NULL DEFAULT '0',
  `paymentMethod` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`order_no`),
  UNIQUE KEY `order_no` (`order_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (3,'sukumawiki','end of june',8000,1,'instock','https://res.cloudinary.com/drselhsl4/image/upload/v1708347735/catering/twj0gr6yhbxvjm6ba8lm.png','catering/twj0gr6yhbxvjm6ba8lm','vegetable','June','sukumawiki',16000,'2024-02-19 13:02:16','2024-03-03 16:40:29'),(4,'Tomatoes','end of june',8000,1,'instock','https://res.cloudinary.com/drselhsl4/image/upload/v1708488493/catering/tknwaecnzbzzirlvkuaw.webp','catering/tknwaecnzbzzirlvkuaw','vegetable','June','tomatoes',145,'2024-02-21 04:08:13','2024-03-03 16:40:29'),(5,'Onions','12-01-2024',12000,3,'instock','https://res.cloudinary.com/drselhsl4/image/upload/v1708518816/catering/qvam80rupst54pqr0mnx.webp','catering/qvam80rupst54pqr0mnx','Vegetable','January','Onions is a vegetable',18500,'2024-02-21 12:33:37','2024-03-03 16:40:29');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (4,'Salad New Recipe-Offer','Sweet Salad ','2024-02-27 18:28:27','2024-02-28 04:48:55');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (3,'vendor','organic grocaeries','josephmwamuye11@gmail.com','254798995454','Mombasa,Kenya','2024-02-19 12:18:44','2024-02-19 12:18:44'),(4,'vendor','organic grocaeries','josephmwamuye17@gmail.com','254798995459','Mombasa,Kenya','2024-02-19 12:18:56','2024-02-25 14:45:45'),(5,'Achievers Org','Achievers Organic Farm','achievers@gmail.com','254798453217','Mombasa , Kenya','2024-02-25 13:15:49','2024-02-25 14:45:11');
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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2024-03-03 19:42:24
