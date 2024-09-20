-- MySQL dump 10.13  Distrib 8.4.0, for Linux (x86_64)
--
-- Host: localhost    Database: shop
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('697b64e5-3553-4ac9-82e8-7fc50c4acf8c','675891fdbe8dc7e1e7a9782c2a4f3024674ba4b259462b071e7572bd200d9dca','2024-08-07 15:41:07.686','20240807154107_init',NULL,NULL,'2024-08-07 15:41:07.550',1),('9a4a9d04-79e0-4be4-8228-82528597e02c','e1c8fdc7492bba02b602eb7f2f3fe1c199b5ec6d4e387b832743a105c205f209','2024-08-14 15:04:11.683','20240814150411_v1',NULL,NULL,'2024-08-14 15:04:11.622',1),('e91a3c48-dae8-41be-abd3-b2c2145faa45','cfc947bb83937736fdcc34ea90d2b430394f8aa50fa56b5f68f9eb2b2bc631d4','2024-08-14 15:12:37.360','20240814151237_v2',NULL,NULL,'2024-08-14 15:12:37.246',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baskets`
--

DROP TABLE IF EXISTS `baskets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baskets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cookieId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `variantId` int NOT NULL,
  `quantity` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baskets`
--

LOCK TABLES `baskets` WRITE;
/*!40000 ALTER TABLE `baskets` DISABLE KEYS */;
INSERT INTO `baskets` VALUES (1,'test',1,2,'2024-08-07 17:30:05.560');
/*!40000 ALTER TABLE `baskets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stockListing`
--

DROP TABLE IF EXISTS `stockListing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stockListing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pictureCount` int NOT NULL,
  `mainCategory` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `minPrice` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `hidden` tinyint(1) NOT NULL DEFAULT '0',
  `inStock` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockListing`
--

LOCK TABLES `stockListing` WRITE;
/*!40000 ALTER TABLE `stockListing` DISABLE KEYS */;
INSERT INTO `stockListing` VALUES (1,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Coffee',4654,'2024-08-21 09:48:51.231',0,1),(2,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Coffee',4654,'2024-08-21 09:53:04.509',0,0),(3,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Coffee',4654,'2024-08-21 09:53:04.509',0,1),(4,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Coffee',4654,'2024-08-21 09:53:04.509',0,1),(5,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Coffee',4654,'2024-08-21 09:53:04.509',0,1),(6,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Coffee',4654,'2024-08-21 09:53:04.509',0,1),(7,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Coffee',4654,'2024-08-21 09:53:04.509',0,1),(8,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Coffee',4654,'2024-08-21 09:53:04.509',0,1),(9,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Coffee',4654,'2024-08-21 09:53:04.509',0,1),(10,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Grinders',4654,'2024-08-21 09:53:04.509',0,1),(11,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Grinders',4654,'2024-08-21 09:53:04.509',0,1),(12,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Grinders',4654,'2024-08-21 09:53:04.509',0,1),(13,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Brewers',4654,'2024-08-21 09:53:04.509',0,1),(14,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Brewers',4654,'2024-08-21 09:53:04.509',0,1),(15,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Brewers',4654,'2024-08-21 09:53:04.509',0,1),(16,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Accessories',4654,'2024-08-21 09:53:04.509',0,1),(17,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Accessories',4654,'2024-08-21 09:53:04.509',0,1),(18,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Accessories',4654,'2024-08-21 09:53:04.509',0,1),(19,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Grinders',4654,'2024-08-21 09:53:04.509',0,1),(20,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Brewers',4654,'2024-08-21 09:53:04.509',0,1),(21,'La Marzocco Linea Mini 1','This is the Linea Mini. Featuring the iconic design and performance of a La Marzocco espresso machine, redesigned for the home.; Inspired by the Linea Classic, the Linea Mini comes with dual boilers and an integrated brew group that allows the machine to achieve the temperature stability and energy efficiency of the saturated brew group in a reduced footprint.; The Linea Mini is handmade with the same components used in La Marzocco\'s commercial machines to ensure the same durability that the Linea Classic has become famous for.',4,'Accessories',4654,'2024-08-21 09:53:04.509',0,1);
/*!40000 ALTER TABLE `stockListing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stockVariant`
--

DROP TABLE IF EXISTS `stockVariant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stockVariant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listingId` int NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `stock` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockVariant`
--

LOCK TABLES `stockVariant` WRITE;
/*!40000 ALTER TABLE `stockVariant` DISABLE KEYS */;
INSERT INTO `stockVariant` VALUES (1,1,'Machine Only',4654,100,'2024-08-21 11:35:04.509'), (2,1,'Machine & One Year\'s Coffee Subscription',4754,100,'2024-08-21 11:35:04.509'), (3,1,'Machine & Two Year\'s Coffee Subscription',4854,0,'2024-08-21 11:35:04.509'), (4,2,'Machine Only',4654,0,'2024-08-21 11:35:04.509'), (5,2,'Machine & One Year\'s Coffee Subscription',4754,0,'2024-08-21 11:35:04.509'), (6,2,'Machine & Two Year\'s Coffee Subscription',4854,0,'2024-08-21 11:35:04.509'), (7,3,'Machine Only',4654,100,'2024-08-21 11:35:04.509'), (8,3,'Machine & One Year\'s Coffee Subscription',4754,0,'2024-08-21 11:35:04.509'), (9,3,'Machine & Two Year\'s Coffee Subscription',4854,0,'2024-08-21 11:35:04.509'), (10,4,'Machine Only',4654,0,'2024-08-21 11:35:04.509'), (11,4,'Machine & One Year\'s Coffee Subscription',4754,100,'2024-08-21 11:35:04.509'), (12,4,'Machine & Two Year\'s Coffee Subscription',4854,100,'2024-08-21 11:35:04.509'), (13,5,'Machine Only',4654,100,'2024-08-21 11:35:04.509'), (14,5,'Machine & One Year\'s Coffee Subscription',4754,100,'2024-08-21 11:35:04.509'), (15,5,'Machine & Two Year\'s Coffee Subscription',4854,0,'2024-08-21 11:35:04.509'), (16,6,'Machine Only',4654,100,'2024-08-21 11:35:04.509'), (17,6,'Machine & One Year\'s Coffee Subscription',4754,0,'2024-08-21 11:35:04.509'), (18,6,'Machine & Two Year\'s Coffee Subscription',4854,100,'2024-08-21 11:35:04.509'), (19,7,'Machine Only',4654,0,'2024-08-21 11:35:04.509'), (20,7,'Machine & One Year\'s Coffee Subscription',4754,100,'2024-08-21 11:35:04.509'), (21,7,'Machine & Two Year\'s Coffee Subscription',4854,100,'2024-08-21 11:35:04.509'), (22,8,'Machine Only',4654,100,'2024-08-21 11:35:04.509'), (23,8,'Machine & One Year\'s Coffee Subscription',4754,100,'2024-08-21 11:35:04.509'), (24,8,'Machine & Two Year\'s Coffee Subscription',4854,0,'2024-08-21 11:35:04.509'), (25,9,'Machine Only',4654,100,'2024-08-21 11:35:04.509'), (26,9,'Machine & One Year\'s Coffee Subscription',4754,0,'2024-08-21 11:35:04.509'), (27,9,'Machine & Two Year\'s Coffee Subscription',4854,100,'2024-08-21 11:35:04.509'), (28,10,'Machine Only',4654,0,'2024-08-21 11:35:04.509'), (29,10,'Machine & One Year\'s Coffee Subscription',4754,100,'2024-08-21 11:35:04.509'), (30,10,'Machine & Two Year\'s Coffee Subscription',4854,100,'2024-08-21 11:35:04.509'), (31,11,'Machine Only',4654,100,'2024-08-21 11:35:04.509'), (32,11,'Machine & One Year\'s Coffee Subscription',4754,100,'2024-08-21 11:35:04.509'), (33,11,'Machine & Two Year\'s Coffee Subscription',4854,0,'2024-08-21 11:35:04.509'), (34,12,'Machine Only',4654,100,'2024-08-21 11:35:04.509'), (35,12,'Machine & One Year\'s Coffee Subscription',4754,0,'2024-08-21 11:35:04.509'), (36,12,'Machine & Two Year\'s Coffee Subscription',4854,100,'2024-08-21 11:35:04.509'), (37,13,'Machine Only',4654,0,'2024-08-21 11:35:04.509'), (38,13,'Machine & One Year\'s Coffee Subscription',4754,100,'2024-08-21 11:35:04.509'), (39,13,'Machine & Two Year\'s Coffee Subscription',4854,100,'2024-08-21 11:35:04.509'), (40,14,'Machine Only',4654,100,'2024-08-21 11:35:04.509'), (41,14,'Machine & One Year\'s Coffee Subscription',4754,100,'2024-08-21 11:35:04.509'), (42,14,'Machine & Two Year\'s Coffee Subscription',4854,0,'2024-08-21 11:35:04.509'), (43,15,'Machine Only',4654,100,'2024-08-21 11:35:04.509'), (44,15,'Machine & One Year\'s Coffee Subscription',4754,0,'2024-08-21 11:35:04.509'), (45,15,'Machine & Two Year\'s Coffee Subscription',4854,100,'2024-08-21 11:35:04.509'), (46,16,'Machine Only',4654,0,'2024-08-21 11:35:04.509'), (47,16,'Machine & One Year\'s Coffee Subscription',4754,100,'2024-08-21 11:35:04.509'), (48,16,'Machine & Two Year\'s Coffee Subscription',4854,100,'2024-08-21 11:35:04.509'), (49,17,'Machine Only',4654,100,'2024-08-21 11:35:04.509'), (50,17,'Machine & One Year\'s Coffee Subscription',4754,100,'2024-08-21 11:35:04.509'), (51,17,'Machine & Two Year\'s Coffee Subscription',4854,0,'2024-08-21 11:35:04.509'), (52,18,'Machine Only',4654,100,'2024-08-21 11:35:04.509'), (53,18,'Machine & One Year\'s Coffee Subscription',4754,0,'2024-08-21 11:35:04.509'), (54,18,'Machine & Two Year\'s Coffee Subscription',4854,100,'2024-08-21 11:35:04.509'), (55,19,'Machine Only',4654,0,'2024-08-21 11:35:04.509'), (56,19,'Machine & One Year\'s Coffee Subscription',4754,100,'2024-08-21 11:35:04.509'), (57,19,'Machine & Two Year\'s Coffee Subscription',4854,100,'2024-08-21 11:35:04.509'), (58,20,'Machine Only',4654,100,'2024-08-21 11:35:04.509'), (59,20,'Machine & One Year\'s Coffee Subscription',4754,100,'2024-08-21 11:35:04.509'), (60,20,'Machine & Two Year\'s Coffee Subscription',4854,0,'2024-08-21 11:35:04.509'), (61,21,'Machine Only',4654,100,'2024-08-21 11:35:04.509'), (62,21,'Machine & One Year\'s Coffee Subscription',4754,0,'2024-08-21 11:35:04.509'), (63,21,'Machine & Two Year\'s Coffee Subscription',4854,100,'2024-08-21 11:35:04.509');
/*!40000 ALTER TABLE `stockVariant` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-21 13:13:51
