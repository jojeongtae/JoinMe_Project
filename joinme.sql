CREATE DATABASE  IF NOT EXISTS `joinme` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `joinme`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: joinme
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `course_tbl`
--

DROP TABLE IF EXISTS `course_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_tbl` (
  `num` int NOT NULL AUTO_INCREMENT,
  `course_name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `body` text NOT NULL,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_tbl`
--

LOCK TABLES `course_tbl` WRITE;
/*!40000 ALTER TABLE `course_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hate_tbl`
--

DROP TABLE IF EXISTS `hate_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hate_tbl` (
  `num` int NOT NULL AUTO_INCREMENT,
  `hater` varchar(40) NOT NULL,
  `hated` varchar(40) NOT NULL,
  `hate_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`num`),
  KEY `hater_user_idx` (`hater`),
  KEY `hated_user_idx` (`hated`),
  CONSTRAINT `hated_user` FOREIGN KEY (`hated`) REFERENCES `login_tbl` (`username`),
  CONSTRAINT `hater_user` FOREIGN KEY (`hater`) REFERENCES `login_tbl` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hate_tbl`
--

LOCK TABLES `hate_tbl` WRITE;
/*!40000 ALTER TABLE `hate_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hate_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like_tbl`
--

DROP TABLE IF EXISTS `like_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like_tbl` (
  `num` int NOT NULL AUTO_INCREMENT,
  `liker` varchar(40) NOT NULL,
  `liked` varchar(40) NOT NULL,
  `like_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`num`),
  KEY `username_idx` (`liker`),
  KEY `liked_user_idx` (`liked`),
  CONSTRAINT `liked_user` FOREIGN KEY (`liked`) REFERENCES `login_tbl` (`username`),
  CONSTRAINT `liker_user` FOREIGN KEY (`liker`) REFERENCES `login_tbl` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_tbl`
--

LOCK TABLES `like_tbl` WRITE;
/*!40000 ALTER TABLE `like_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `like_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_tbl`
--

DROP TABLE IF EXISTS `login_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_tbl` (
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `usernickname` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_tbl`
--

LOCK TABLES `login_tbl` WRITE;
/*!40000 ALTER TABLE `login_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `login_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_tbl`
--

DROP TABLE IF EXISTS `match_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_tbl` (
  `num` int NOT NULL AUTO_INCREMENT,
  `match_male` varchar(40) NOT NULL,
  `match_female` varchar(40) NOT NULL,
  `match_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`num`),
  KEY `male_idx` (`match_male`),
  KEY `match_female_foreignkey_idx` (`match_female`),
  CONSTRAINT `match_female_foreignkey` FOREIGN KEY (`match_female`) REFERENCES `login_tbl` (`username`),
  CONSTRAINT `match_male_foreignkey` FOREIGN KEY (`match_male`) REFERENCES `login_tbl` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_tbl`
--

LOCK TABLES `match_tbl` WRITE;
/*!40000 ALTER TABLE `match_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tbl`
--

DROP TABLE IF EXISTS `user_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tbl` (
  `username` varchar(40) NOT NULL,
  `sexuality` varchar(10) NOT NULL,
  `age` int NOT NULL,
  `height` int NOT NULL,
  `weight` int NOT NULL,
  `interest` varchar(200) DEFAULT NULL,
  `address` varchar(45) NOT NULL,
  `introduction` text,
  `mbti` varchar(10) DEFAULT NULL,
  `profileimg` varchar(200) DEFAULT NULL,
  `liked` int DEFAULT '0',
  PRIMARY KEY (`username`),
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `login_tbl` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tbl`
--

LOCK TABLES `user_tbl` WRITE;
/*!40000 ALTER TABLE `user_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_tbl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-10 15:53:37
