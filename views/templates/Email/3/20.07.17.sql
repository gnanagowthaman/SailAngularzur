-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: zurik
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.17.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `value` varchar(150) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES (1,'trialPeriod','30',1,NULL,'2017-04-19 06:52:40',NULL),(2,'paidPeriod-1','365',1,NULL,'2017-04-19 06:53:41',NULL),(3,'paidPeriod-2','1095',1,NULL,'2017-04-19 06:53:42',NULL),(4,'paidPeriod-3','1825',1,NULL,'2017-04-19 06:53:43',NULL);
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `geo_id` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'ALL','ALL',NULL,1,NULL,NULL,NULL,NULL),(2,'INDIA','india',2,1,NULL,NULL,'2017-07-13 05:19:45','2017-07-13 05:19:45'),(3,'CHINA','china',2,1,NULL,NULL,'2017-07-13 06:58:42','2017-07-13 06:58:42'),(4,'texas','texas',3,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
INSERT INTO `document` VALUES (1,'Summary','Summary',1,1,NULL,'2017-03-24 10:19:09',NULL),(2,'Key Timeliness','Key Timeliness',1,1,NULL,'2017-03-24 10:19:10',NULL),(3,'LifeCycle Tracker','LifeCycle Tracker',1,1,NULL,'2017-03-24 10:19:10',NULL),(4,'Database','Database',1,1,NULL,'2017-03-24 10:19:10',NULL),(5,'Regulatory Analysis Level 1','Regulatory Analysis Level 1',1,1,NULL,'2017-03-24 10:19:12',NULL),(11,'Regulatory Analysis Level 2','Regulatory Analysis Level 2',1,1,NULL,'2017-03-24 10:19:12',NULL),(12,'adsafgretr','rt454u57iscfdsgdh',0,NULL,NULL,'2017-07-19 15:12:08','2017-07-19 15:12:08');
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domain`
--

DROP TABLE IF EXISTS `domain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `domain` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domain`
--

LOCK TABLES `domain` WRITE;
/*!40000 ALTER TABLE `domain` DISABLE KEYS */;
INSERT INTO `domain` VALUES (1,'BANKING','BANKING',1,1,6,'2017-03-24 09:30:39','2017-06-21 05:37:49'),(2,'CONSUMER FINANCE','CONSUMER FINANCE',1,1,6,'2017-03-24 09:35:03','2017-06-21 05:37:55'),(3,'FINANCIAL CRIME','FINANCIAL CRIME',1,1,6,'2017-03-24 09:35:11','2017-06-21 05:38:18'),(4,'INSURANCE & PENSION','INSURANCE & PENSION',1,1,6,'2017-03-24 09:35:20','2017-06-21 05:38:00'),(5,'INVESTMENT FUNDS','INVESTMENT FUNDS',1,1,NULL,'2017-03-24 09:35:28',NULL),(6,'PAYMENTS','PAYMENTS',1,1,6,'2017-03-24 09:35:35','2017-06-21 05:38:23'),(7,'SECURITIES MARKET','SECURITIES  MARKET',1,1,1,'2017-03-24 09:35:44','2017-07-19 15:10:18');
/*!40000 ALTER TABLE `domain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domain_regulation_link`
--

DROP TABLE IF EXISTS `domain_regulation_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `domain_regulation_link` (
  `domain_id` int(11) DEFAULT NULL,
  `regulation_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domain_regulation_link`
--

LOCK TABLES `domain_regulation_link` WRITE;
/*!40000 ALTER TABLE `domain_regulation_link` DISABLE KEYS */;
INSERT INTO `domain_regulation_link` VALUES (7,4),(7,5),(7,7),(7,9),(7,14),(1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,16),(3,14),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(2,2),(3,2),(4,2),(7,2),(2,3),(6,3),(3,3),(4,16),(4,11),(5,2),(6,2),(4,3),(5,3),(7,3),(2,4),(3,4),(4,4),(5,4),(6,4),(2,5),(3,5),(4,5),(5,5),(6,5),(2,6),(3,6),(4,6),(5,6),(6,6),(7,6),(2,7),(3,7),(4,7),(5,7),(6,7),(2,8),(3,8),(4,8),(5,8),(6,8),(7,8),(2,9),(3,9),(4,9),(6,9),(5,9),(2,10),(3,10),(4,10),(5,10),(6,10),(7,10),(2,11),(3,11),(5,11),(6,11),(7,11),(2,12),(3,12),(4,12),(5,12),(6,12),(7,12),(2,13),(3,13),(4,13),(5,13),(6,13),(7,13),(2,14),(4,14),(5,14),(6,14),(2,16),(3,16),(5,16),(6,16),(7,16);
/*!40000 ALTER TABLE `domain_regulation_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `path` varchar(200) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `level` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (1,'EMIR Summary.pdf','/EU/INVESTMENT FUNDS/AIFMD/Summary/l1/EMIR Summary.pdf','pdf',1),(2,'EMIR Summary.pdf','/US/BANKING/JOBS Act/Summary/l1/EMIR Summary.pdf','pdf',1),(3,'EMIR Depository.pdf','/APAC/PAYMENTS/OTC TRANSACTION/Database/l1/EMIR Depository.pdf','pdf',1),(4,'EMIR LEVEL 1 Regulatory Tracker.xlsx','/EU/SECURITIES & MARKET/EMIR/Regulatory Analysis Level 1/l1/EMIR LEVEL 1 Regulatory Tracker.xlsx','xlsx',1),(5,'EMIR Timelineness.pdf','/EU/SECURITIES & MARKET/EMIR/Key Timeliness/l1/EMIR Timelineness.pdf','pdf',1),(6,'EMIR LEVEL 2 Regulatory Tracker.xlsx','/EU/SECURITIES & MARKET/EMIR/Regulatory Analysis Level 2/l2/EMIR LEVEL 2 Regulatory Tracker.xlsx','xlsx',2),(7,'EMIR LifeCycle.pdf','/EU/SECURITIES & MARKET/EMIR/LifeCycle Tracker/l1/EMIR LifeCycle.pdf','pdf',1),(8,'EMIR Depository.pdf','/EU/SECURITIES & MARKET/EMIR/Database/l1/EMIR Depository.pdf','pdf',1);
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `geography`
--

DROP TABLE IF EXISTS `geography`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `geography` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `geography`
--

LOCK TABLES `geography` WRITE;
/*!40000 ALTER TABLE `geography` DISABLE KEYS */;
INSERT INTO `geography` VALUES (1,'ALL','ALL',1,NULL,NULL,NULL,NULL),(2,'EU','European Union',1,1,NULL,'2017-03-24 09:27:21',NULL),(3,'US','United States',1,1,NULL,'2017-03-24 09:27:45',NULL),(4,'APAC','Asia-Pacific',1,1,NULL,'2017-03-24 09:27:58',NULL),(5,'AUSTRALIA','australia',0,NULL,1,'2017-07-19 14:16:09','2017-07-19 14:16:22'),(6,'AUSTRALIA','dd',0,NULL,1,'2017-07-19 15:03:37','2017-07-19 15:03:42'),(7,'TEST','tested',0,NULL,NULL,'2017-07-20 06:09:32','2017-07-20 06:09:32');
/*!40000 ALTER TABLE `geography` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `geography_domain_link`
--

DROP TABLE IF EXISTS `geography_domain_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `geography_domain_link` (
  `geography_id` int(11) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `geography_domain_link`
--

LOCK TABLES `geography_domain_link` WRITE;
/*!40000 ALTER TABLE `geography_domain_link` DISABLE KEYS */;
INSERT INTO `geography_domain_link` VALUES (2,5,NULL,NULL),(3,5,NULL,NULL),(4,5,NULL,NULL),(2,1,NULL,NULL),(4,1,NULL,NULL),(3,1,NULL,NULL),(2,2,NULL,NULL),(3,2,NULL,NULL),(4,2,NULL,NULL),(2,4,NULL,NULL),(3,4,NULL,NULL),(4,4,NULL,NULL),(2,7,NULL,NULL),(4,7,NULL,NULL),(3,7,NULL,NULL),(2,3,NULL,NULL),(3,3,NULL,NULL),(4,3,NULL,NULL),(2,6,NULL,NULL),(3,6,NULL,NULL),(4,6,NULL,NULL);
/*!40000 ALTER TABLE `geography_domain_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `geography_regulation_link`
--

DROP TABLE IF EXISTS `geography_regulation_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `geography_regulation_link` (
  `geography_id` int(11) DEFAULT NULL,
  `regulation_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `geography_regulation_link`
--

LOCK TABLES `geography_regulation_link` WRITE;
/*!40000 ALTER TABLE `geography_regulation_link` DISABLE KEYS */;
INSERT INTO `geography_regulation_link` VALUES (2,1,NULL,NULL),(2,2,NULL,NULL),(2,3,NULL,NULL),(2,4,NULL,NULL),(2,5,NULL,NULL),(2,6,NULL,NULL),(2,7,NULL,NULL),(3,8,NULL,NULL),(3,9,NULL,NULL),(3,10,NULL,NULL),(3,11,NULL,NULL),(3,12,NULL,NULL),(4,13,NULL,NULL),(4,14,NULL,NULL),(4,16,NULL,NULL),(2,16,NULL,NULL),(1,1,NULL,NULL),(2,1,2,2);
/*!40000 ALTER TABLE `geography_regulation_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `geo_id` int(100) DEFAULT NULL,
  `news_content` varchar(240) DEFAULT NULL,
  `news_date` timestamp NULL DEFAULT NULL,
  `created_by` varchar(11) DEFAULT NULL,
  `modified_by` varchar(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,4,'alert message','2017-07-16 18:30:00',NULL,'1','2017-07-17 04:22:03','2017-07-17 04:22:13'),(2,2,'news description message content','2017-07-17 00:00:00',NULL,NULL,'2017-07-17 04:59:22','2017-07-17 04:59:22'),(3,1,'news description message','2017-07-17 00:00:00',NULL,NULL,'2017-07-17 04:59:35','2017-07-17 04:59:35'),(4,1,'message news','2017-07-17 00:00:00',NULL,NULL,'2017-07-17 04:59:44','2017-07-17 04:59:44'),(5,1,'alert message','2017-07-17 00:00:00',NULL,NULL,'2017-07-17 04:59:53','2017-07-17 04:59:53'),(6,1,'news description message content','2017-07-17 00:00:00',NULL,NULL,'2017-07-17 05:00:05','2017-07-17 05:00:05'),(7,1,'news description message','2017-07-17 00:00:00',NULL,NULL,'2017-07-17 05:00:22','2017-07-17 05:00:22'),(8,1,'message','2017-07-17 00:00:00',NULL,NULL,'2017-07-17 05:00:36','2017-07-17 05:00:36'),(9,1,'news description message content','2017-07-17 00:00:00',NULL,NULL,'2017-07-17 05:00:59','2017-07-17 05:00:59'),(10,3,'alert message','2017-07-17 00:00:00',NULL,NULL,'2017-07-17 05:01:58','2017-07-17 05:01:58');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission` varchar(100) DEFAULT NULL,
  `permission_type` varchar(30) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'createAdmin','credential',2,NULL,NULL,NULL,NULL),(2,'createUser','credential',2,NULL,NULL,NULL,NULL),(3,'upload','operation',2,NULL,NULL,NULL,NULL),(4,'publish','operation',2,NULL,NULL,NULL,NULL),(5,'delete','operation',2,NULL,NULL,NULL,NULL),(6,'free','subscription',3,NULL,NULL,NULL,NULL),(7,'paid','subscription',3,NULL,NULL,NULL,NULL),(8,'full','access',3,NULL,NULL,NULL,NULL),(9,'restricted','access',3,NULL,NULL,NULL,NULL),(10,'edituser','operation',2,NULL,NULL,NULL,NULL),(11,'deleteuser','operation',2,NULL,NULL,NULL,NULL),(12,'lockuser','operation',2,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regulation`
--

DROP TABLE IF EXISTS `regulation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `regulation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `regulator` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regulation`
--

LOCK TABLES `regulation` WRITE;
/*!40000 ALTER TABLE `regulation` DISABLE KEYS */;
INSERT INTO `regulation` VALUES (1,'AIFMD','AIFMD',1,1,NULL,'2017-03-24 09:38:39',NULL,'AIFMD'),(2,'CRD IV','CRD IV',1,1,NULL,'2017-03-24 09:44:18',NULL,'CRD IV'),(3,'CRR','CRR',1,1,NULL,'2017-03-24 09:44:18',NULL,'CRR'),(4,'EMIR','EMIR',1,1,NULL,'2017-03-24 09:44:18',NULL,'EMIR'),(5,'MiFID II','MiFID II',1,1,NULL,'2017-03-24 09:44:18',NULL,'MiFID II'),(6,'PRIIPs','PRIIPs',1,1,NULL,'2017-03-24 09:44:18',NULL,'PRIIPs'),(7,'SFTR','SFTR',1,1,NULL,'2017-03-24 09:44:23',NULL,'SFTR'),(8,'CPO-PQR','CPO-PQR',1,1,NULL,'2017-03-24 09:44:58',NULL,'CPO-PQR'),(9,'Dodd Frank','Dodd Frank',1,1,NULL,'2017-03-24 09:44:58',NULL,'Dodd Frank'),(10,'FATCA','FATCA',1,1,NULL,'2017-03-24 09:44:58',NULL,'FATCA'),(11,'FORM PF','FORM PF',1,1,NULL,'2017-03-24 09:44:58',NULL,'FORM PF'),(12,'JOBS Act','JOBS Act',1,1,NULL,'2017-03-24 09:44:59',NULL,'JOBS Act'),(13,'CRS/AEOI','CRS/AEOI',1,1,NULL,'2017-03-24 09:44:59',NULL,'CRS/AEOI'),(14,'OTC TRANSACTION','OTC TRANSACTION',1,1,NULL,'2017-03-24 09:44:59',NULL,'OTC TRANSACTION'),(16,'AML','AML',1,1,NULL,'2017-03-24 09:45:04',NULL,'AML');
/*!40000 ALTER TABLE `regulation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regulation_document_file_link`
--

DROP TABLE IF EXISTS `regulation_document_file_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `regulation_document_file_link` (
  `regulation_document_id` int(11) DEFAULT NULL,
  `file_id` int(11) DEFAULT NULL,
  `level` int(2) DEFAULT NULL,
  `is_uploaded` tinyint(1) DEFAULT NULL,
  `is_published` tinyint(1) DEFAULT NULL,
  `uploaded_by` int(11) DEFAULT NULL,
  `published_by` int(11) DEFAULT NULL,
  `uploaded_date` timestamp NULL DEFAULT NULL,
  `published_date` timestamp NULL DEFAULT NULL,
  `tobepublished` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regulation_document_file_link`
--

LOCK TABLES `regulation_document_file_link` WRITE;
/*!40000 ALTER TABLE `regulation_document_file_link` DISABLE KEYS */;
INSERT INTO `regulation_document_file_link` VALUES (131,1,1,1,0,1,NULL,'2017-07-17 09:16:27',NULL,0),(41,2,1,1,0,1,NULL,'2017-07-17 09:17:08',NULL,0),(543,3,1,1,0,1,NULL,'2017-07-17 09:17:35',NULL,0),(577,4,1,1,0,1,NULL,'2017-07-17 09:18:04',NULL,0),(244,5,1,1,0,1,NULL,'2017-07-17 09:18:28',NULL,0),(578,6,2,1,0,1,NULL,'2017-07-17 09:18:54',NULL,0),(251,7,1,1,0,1,NULL,'2017-07-17 09:19:24',NULL,0),(258,8,1,1,0,1,NULL,'2017-07-17 09:19:51',NULL,0);
/*!40000 ALTER TABLE `regulation_document_file_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regulation_document_link`
--

DROP TABLE IF EXISTS `regulation_document_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `regulation_document_link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `geography_id` int(11) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `regulation_id` int(11) DEFAULT NULL,
  `document_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `regulator_id` int(11) DEFAULT NULL,
  `sub_document_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=585 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regulation_document_link`
--

LOCK TABLES `regulation_document_link` WRITE;
/*!40000 ALTER TABLE `regulation_document_link` DISABLE KEYS */;
INSERT INTO `regulation_document_link` VALUES (41,3,1,12,1,3,3,8,2),(111,2,1,2,1,2,2,9,1),(114,2,1,1,2,2,2,9,1),(115,2,1,1,3,2,2,9,1),(116,2,1,1,4,2,2,9,1),(117,2,1,1,5,2,2,9,1),(118,2,1,1,11,2,2,9,1),(119,2,2,1,1,2,2,9,1),(120,2,2,1,2,2,2,9,1),(121,2,2,1,3,2,2,9,1),(122,2,2,1,4,2,2,9,1),(123,2,2,1,5,2,2,9,1),(124,2,2,1,11,2,2,9,1),(125,2,4,1,1,2,2,9,1),(126,2,4,1,2,2,2,9,1),(127,2,4,1,3,2,2,9,1),(128,2,4,1,4,2,2,9,1),(129,2,4,1,5,2,2,9,1),(130,2,4,1,11,2,2,9,1),(131,2,5,1,1,2,2,9,1),(132,2,5,1,2,2,2,9,1),(133,2,5,1,3,2,2,9,1),(134,2,5,1,4,2,2,9,1),(135,2,5,1,5,2,2,9,1),(136,2,5,1,11,2,2,9,1),(137,2,6,1,1,2,2,9,1),(138,2,6,1,2,2,2,9,1),(139,2,6,1,3,2,2,9,1),(140,2,6,1,4,2,2,9,1),(141,2,6,1,5,2,2,9,1),(142,2,6,1,11,2,2,9,1),(145,2,1,2,2,2,2,9,1),(146,2,1,2,4,2,2,9,1),(147,2,1,2,5,2,2,9,1),(148,2,1,2,11,2,2,9,1),(149,2,2,2,1,2,2,9,1),(150,2,2,2,3,2,2,9,1),(151,2,2,2,2,2,2,9,1),(152,2,2,2,4,2,2,9,1),(153,2,2,2,5,2,2,9,1),(154,2,2,2,11,2,2,9,1),(155,2,3,2,1,2,2,9,1),(156,2,3,2,2,2,2,9,1),(157,2,3,2,3,2,2,9,1),(158,2,3,2,4,2,2,9,1),(159,2,3,2,5,2,2,9,1),(160,2,3,2,11,2,2,9,1),(161,2,4,2,1,2,2,9,1),(162,2,4,2,2,2,2,9,1),(163,2,4,2,3,2,2,9,1),(164,2,4,2,4,2,2,9,1),(165,2,4,2,5,2,2,9,1),(166,2,4,2,11,2,2,9,1),(167,2,5,2,1,2,2,9,1),(168,2,5,2,2,2,2,9,1),(169,2,5,2,3,2,2,9,1),(170,2,5,2,4,2,2,9,1),(171,2,5,2,5,2,2,9,1),(172,2,5,2,11,2,2,9,1),(173,2,6,2,1,2,2,9,1),(174,2,6,2,2,2,2,9,1),(175,2,6,2,3,2,2,9,1),(176,2,6,2,4,2,2,9,1),(177,2,6,2,5,2,2,9,1),(178,2,6,2,11,2,2,9,1),(179,2,7,2,11,2,2,9,1),(180,2,7,2,5,2,2,9,1),(181,2,7,2,4,2,2,9,1),(182,2,7,2,3,2,2,9,1),(183,2,7,2,2,2,2,9,1),(184,2,7,2,1,2,2,9,1),(187,2,1,3,1,2,2,9,1),(188,2,1,3,2,2,2,9,1),(189,2,1,3,3,2,2,9,1),(190,2,1,3,4,2,2,9,1),(191,2,1,3,5,2,2,9,1),(192,2,1,3,11,2,2,9,1),(193,2,2,3,11,2,2,9,1),(194,2,2,3,1,2,2,9,1),(195,2,2,3,2,2,2,9,1),(196,2,2,3,3,2,2,9,1),(197,2,2,3,4,2,2,9,1),(198,2,2,3,5,2,2,9,1),(199,2,3,3,1,2,2,9,1),(200,2,3,3,2,2,2,9,1),(201,2,3,3,3,2,2,9,1),(202,2,3,3,4,2,2,9,1),(203,2,3,3,5,2,2,9,1),(204,2,3,3,11,2,2,9,1),(205,2,4,3,1,2,2,9,1),(206,2,4,3,2,2,2,9,1),(207,2,4,3,3,2,2,9,1),(208,2,4,3,4,2,2,9,1),(209,2,4,3,5,2,2,9,1),(210,2,4,3,11,2,2,9,1),(211,2,5,3,1,2,2,9,1),(212,2,5,3,2,2,2,9,1),(213,2,5,3,3,2,2,9,1),(214,2,5,3,4,2,2,9,1),(215,2,5,3,5,2,2,9,1),(216,2,5,3,11,2,2,9,1),(217,2,6,3,1,2,2,9,1),(218,2,6,3,2,2,2,9,1),(219,2,6,3,3,2,2,9,1),(220,2,6,3,4,2,2,9,1),(221,2,6,3,5,2,2,9,1),(222,2,6,3,11,2,2,9,1),(223,2,7,3,1,2,2,9,1),(224,2,7,3,2,2,2,9,1),(225,2,7,3,3,2,2,9,1),(226,2,7,3,4,2,2,9,1),(227,2,7,3,5,2,2,9,1),(228,2,7,3,11,2,2,9,1),(231,2,1,4,1,2,2,9,1),(232,2,2,4,1,2,2,9,1),(233,2,3,4,1,2,2,9,1),(234,2,4,4,1,2,2,9,1),(235,2,5,4,1,2,2,9,1),(236,2,6,4,1,2,2,9,1),(237,2,7,4,1,2,2,9,1),(238,2,1,4,2,2,2,9,1),(239,2,2,4,2,2,2,9,1),(240,2,3,4,2,2,2,9,1),(241,2,4,4,2,2,2,9,1),(242,2,5,4,2,2,2,9,1),(243,2,6,4,2,2,2,9,1),(244,2,7,4,2,2,2,9,1),(245,2,1,4,3,2,2,9,1),(246,2,2,4,3,2,2,9,1),(247,2,3,4,3,2,2,9,1),(248,2,4,4,3,2,2,9,1),(249,2,5,4,3,2,2,9,1),(250,2,6,4,3,2,2,9,1),(251,2,7,4,3,2,2,9,1),(252,2,1,4,4,2,2,9,1),(253,2,2,4,4,2,2,9,1),(254,2,3,4,4,2,2,9,1),(255,2,4,4,4,2,2,9,1),(256,2,5,4,4,2,2,9,1),(257,2,6,4,4,2,2,9,1),(258,2,7,4,4,2,2,9,1),(261,2,1,5,1,2,2,9,1),(262,2,2,5,1,2,2,9,1),(263,2,3,5,1,2,2,9,1),(264,2,4,5,1,2,2,9,1),(265,2,5,5,1,2,2,9,1),(266,2,6,5,1,2,2,9,1),(267,2,7,5,1,2,2,9,1),(268,2,1,5,2,2,2,9,1),(269,2,2,5,2,2,2,9,1),(270,2,3,5,2,2,2,9,1),(271,2,4,5,2,2,2,9,1),(272,2,5,5,2,2,2,9,1),(273,2,6,5,2,2,2,9,1),(274,2,7,5,2,2,2,9,1),(275,2,1,5,3,2,2,9,1),(276,2,2,5,3,2,2,9,1),(277,2,3,5,3,2,2,9,1),(278,2,5,5,3,2,2,9,1),(279,2,6,5,3,2,2,9,1),(280,2,7,5,3,2,2,9,1),(281,2,1,5,4,2,2,9,1),(282,2,2,5,4,2,2,9,1),(283,2,3,5,4,2,2,9,1),(284,2,4,5,4,2,2,9,1),(285,2,5,5,4,2,2,9,1),(286,2,6,5,4,2,2,9,1),(287,2,7,5,4,2,2,9,1),(291,2,1,6,1,2,2,9,1),(292,2,2,6,1,2,2,9,1),(293,2,3,6,1,2,2,9,1),(294,2,4,6,1,2,2,9,1),(295,2,5,6,1,2,2,9,1),(296,2,6,6,1,2,2,9,1),(297,2,7,6,1,2,2,9,1),(298,2,1,6,2,2,2,9,1),(299,2,2,6,2,2,2,9,1),(300,2,3,6,2,2,2,9,1),(301,2,4,6,2,2,2,9,1),(302,2,5,6,2,2,2,9,1),(303,2,6,6,2,2,2,9,1),(304,2,7,6,2,2,2,9,1),(305,2,1,6,4,2,2,9,1),(306,2,2,6,4,2,2,9,1),(307,2,3,6,4,2,2,9,1),(308,2,4,6,4,2,2,9,1),(309,2,5,6,4,2,2,9,1),(310,2,6,6,4,2,2,9,1),(311,2,7,6,4,2,2,9,1),(314,2,1,7,1,2,2,9,1),(315,2,2,7,1,2,2,9,1),(316,2,3,7,1,2,2,9,1),(317,2,4,7,1,2,2,9,1),(318,2,5,7,1,2,2,9,1),(319,2,6,7,1,2,2,9,1),(320,2,7,7,1,2,2,9,1),(321,2,1,7,2,2,2,9,1),(322,2,2,7,2,2,2,9,1),(323,2,3,7,2,2,2,9,1),(324,2,4,7,2,2,2,9,1),(325,2,5,7,2,2,2,9,1),(326,2,6,7,2,2,2,9,1),(327,2,7,7,2,2,2,9,1),(328,2,7,7,3,2,2,9,1),(329,2,1,7,3,2,2,9,1),(330,2,2,7,3,2,2,9,1),(331,2,3,7,3,2,2,9,1),(332,2,4,7,3,2,2,9,1),(333,2,5,7,3,2,2,9,1),(334,2,6,7,3,2,2,9,1),(335,2,1,7,4,2,2,9,1),(336,2,2,7,4,2,2,9,1),(337,2,3,7,4,2,2,9,1),(338,2,4,7,4,2,2,9,1),(339,2,6,7,4,2,2,9,1),(340,2,5,7,4,2,2,9,1),(341,2,7,7,4,2,2,9,1),(344,3,1,8,1,3,3,8,2),(345,3,2,8,1,3,3,8,2),(346,3,3,8,1,3,3,8,2),(347,3,4,8,1,3,3,8,2),(348,3,5,8,1,3,3,8,2),(349,3,6,8,1,3,3,8,2),(350,3,7,8,1,3,3,8,2),(351,3,1,8,2,3,3,8,2),(352,3,2,8,2,3,3,8,2),(353,3,3,8,2,3,3,8,2),(354,3,4,8,2,3,3,8,2),(355,3,5,8,2,3,3,8,2),(356,3,6,8,2,3,3,8,2),(357,3,7,8,2,3,3,8,2),(358,3,1,8,3,3,3,8,2),(359,3,2,8,3,3,3,8,2),(360,3,3,8,3,3,3,8,2),(361,3,4,8,3,3,3,8,2),(362,3,5,8,3,3,3,8,2),(363,3,6,8,3,3,3,8,2),(364,3,7,8,3,3,3,8,2),(365,3,1,8,4,3,3,8,2),(366,3,2,8,4,3,3,8,2),(367,3,3,8,4,3,3,8,2),(368,3,4,8,4,3,3,8,2),(369,3,5,8,4,3,3,8,2),(370,3,6,8,4,3,3,8,2),(371,3,7,8,4,3,3,8,2),(374,3,1,9,1,3,3,8,2),(375,3,2,9,1,3,3,8,2),(376,3,3,9,1,3,3,8,2),(377,3,4,9,1,3,3,8,2),(378,3,6,9,1,3,3,8,2),(379,3,5,9,1,3,3,8,2),(380,3,7,9,1,3,3,8,2),(381,3,1,9,2,3,3,8,2),(382,3,2,9,2,3,3,8,2),(383,3,3,9,2,3,3,8,2),(384,3,4,9,2,3,3,8,2),(385,3,5,9,2,3,3,8,2),(386,3,6,9,2,3,3,8,2),(387,3,7,9,2,3,3,8,2),(388,3,1,9,3,3,3,8,2),(389,3,2,9,3,3,3,8,2),(390,3,3,9,3,3,3,8,2),(391,3,4,9,3,3,3,8,2),(392,3,5,9,3,3,3,8,2),(393,3,6,9,3,3,3,8,2),(394,3,7,9,3,3,3,8,2),(395,3,1,9,4,3,3,8,2),(396,3,2,9,4,3,3,8,2),(397,3,3,9,4,3,3,8,2),(398,3,4,9,4,3,3,8,2),(399,3,5,9,4,3,3,8,2),(400,3,6,9,4,3,3,8,2),(401,3,6,9,4,3,3,8,2),(402,3,7,9,4,3,3,8,2),(405,3,1,10,1,3,3,8,2),(406,3,2,10,1,3,3,8,2),(407,3,3,10,1,3,3,8,2),(408,3,4,10,1,3,3,8,2),(409,3,5,10,1,3,3,8,2),(410,3,6,10,1,3,3,8,2),(411,3,1,10,2,3,3,8,2),(412,3,7,10,1,3,3,8,2),(413,3,2,10,2,3,3,8,2),(414,3,3,10,2,3,3,8,2),(415,3,4,10,2,3,3,8,2),(416,3,5,10,2,3,3,8,2),(417,3,6,10,2,3,3,8,2),(418,3,7,10,2,3,3,8,2),(419,3,1,10,3,3,3,8,2),(420,3,2,10,3,3,3,8,2),(421,3,3,10,3,3,3,8,2),(422,3,4,10,3,3,3,8,2),(423,3,5,10,3,3,3,8,2),(424,3,6,10,3,3,3,8,2),(425,3,7,10,3,3,3,8,2),(426,3,1,10,4,3,3,8,2),(427,3,2,10,4,3,3,8,2),(428,3,3,10,4,3,3,8,2),(429,3,4,10,4,3,3,8,2),(430,3,5,10,4,3,3,8,2),(431,3,6,10,4,3,3,8,2),(432,3,7,10,4,3,3,8,2),(435,3,1,11,1,3,3,8,2),(436,3,2,11,1,3,3,8,2),(437,3,4,11,1,3,3,8,2),(438,3,3,11,1,3,3,8,2),(439,3,5,11,1,3,3,8,2),(440,3,6,11,1,3,3,8,2),(441,3,7,11,1,3,3,8,2),(442,3,7,11,2,3,3,8,2),(443,3,1,11,2,3,3,8,2),(444,3,2,11,2,3,3,8,2),(445,3,3,11,2,3,3,8,2),(446,3,4,11,2,3,3,8,2),(447,3,5,11,2,3,3,8,2),(448,3,6,11,2,3,3,8,2),(449,3,1,11,3,3,3,8,2),(450,3,2,11,3,3,3,8,2),(451,3,3,11,3,3,3,8,2),(452,3,4,11,3,3,3,8,2),(453,3,5,11,3,3,3,8,2),(454,3,6,11,3,3,3,8,2),(455,3,7,11,3,3,3,8,2),(456,3,1,11,4,3,3,8,2),(457,3,2,11,4,3,3,8,2),(458,3,3,11,4,3,3,8,2),(459,3,4,11,4,3,3,8,2),(460,3,5,11,4,3,3,8,2),(461,3,6,11,4,3,3,8,2),(462,3,7,11,4,3,3,8,2),(465,3,2,12,1,3,3,8,2),(466,3,3,12,1,3,3,8,2),(467,3,4,12,1,3,3,8,2),(468,3,5,12,1,3,3,8,2),(469,3,6,12,1,3,3,8,2),(470,3,7,12,1,3,3,8,2),(471,3,1,12,2,3,3,8,2),(472,3,2,12,2,3,3,8,2),(473,3,3,12,2,3,3,8,2),(474,3,4,12,2,3,3,8,2),(475,3,5,12,2,3,3,8,2),(476,3,6,12,2,3,3,8,2),(477,3,7,12,2,3,3,8,2),(478,3,1,12,4,3,3,8,2),(479,3,2,12,4,3,3,8,2),(480,3,3,12,4,3,3,8,2),(481,3,4,12,4,3,3,8,2),(482,3,5,12,4,3,3,8,2),(483,3,6,12,4,3,3,8,2),(484,3,7,12,4,3,3,8,2),(487,4,1,13,1,4,4,10,3),(488,4,2,13,1,4,4,10,3),(489,4,3,13,1,4,4,10,3),(490,4,4,13,1,4,4,10,3),(491,4,5,13,1,4,4,10,3),(492,4,6,13,1,4,4,10,3),(493,4,7,13,1,4,4,10,3),(494,4,1,13,2,4,4,10,3),(495,4,3,13,2,4,4,10,3),(496,4,2,13,2,4,4,10,3),(497,4,4,13,2,4,4,10,3),(498,4,5,13,2,4,4,10,3),(499,4,6,13,2,4,4,10,3),(500,4,7,13,2,4,4,10,3),(501,4,1,13,3,4,4,10,3),(502,4,2,13,3,4,4,10,3),(503,4,3,13,3,4,4,10,3),(504,4,4,13,3,4,4,10,3),(505,4,5,13,3,4,4,10,3),(506,4,6,13,3,4,4,10,3),(507,4,7,13,3,4,4,10,3),(508,4,1,13,4,4,4,10,3),(509,4,2,13,4,4,4,10,3),(510,4,3,13,4,4,4,10,3),(511,4,4,13,4,4,4,10,3),(512,4,5,13,4,4,4,10,3),(513,4,6,13,4,4,4,10,3),(514,4,7,13,4,4,4,10,3),(517,4,1,14,1,4,4,10,3),(518,4,2,14,1,4,4,10,3),(519,4,3,14,1,4,4,10,3),(520,4,4,14,1,4,4,10,3),(521,4,5,14,1,4,4,10,3),(522,4,6,14,1,4,4,10,3),(523,4,7,14,1,4,4,10,3),(524,4,1,14,2,4,4,10,3),(525,4,2,14,2,4,4,10,3),(526,4,3,14,2,4,4,10,3),(527,4,4,14,2,4,4,10,3),(528,4,5,14,2,4,4,10,3),(529,4,6,14,2,4,4,10,3),(530,4,7,14,2,4,4,10,3),(531,4,1,14,3,4,4,10,3),(532,4,2,14,3,4,4,10,3),(533,4,3,14,3,4,4,10,3),(534,4,4,14,3,4,4,10,3),(535,4,5,14,3,4,4,10,3),(536,4,6,14,3,4,4,10,3),(537,4,7,14,3,4,4,10,3),(538,4,1,14,4,4,4,10,3),(539,4,2,14,4,4,4,10,3),(540,4,3,14,4,4,4,10,3),(541,4,4,14,4,4,4,10,3),(542,4,5,14,4,4,4,10,3),(543,4,6,14,4,4,4,10,3),(544,4,7,14,4,4,4,10,3),(547,4,1,16,1,4,4,10,3),(548,4,2,16,1,4,4,10,3),(549,4,3,16,1,4,4,10,3),(550,4,4,16,1,4,4,10,3),(551,4,5,16,1,4,4,10,3),(552,4,6,16,1,4,4,10,3),(553,4,7,16,1,4,4,10,3),(554,4,7,16,2,4,4,10,3),(555,4,6,16,2,4,4,10,3),(556,4,5,16,2,4,4,10,3),(557,4,4,16,2,4,4,10,3),(558,4,2,16,2,4,4,10,3),(559,4,3,16,2,4,4,10,3),(560,4,1,16,2,4,4,10,3),(561,4,1,16,3,4,4,10,3),(562,4,2,16,3,4,4,10,3),(563,4,3,16,3,4,4,10,3),(564,4,4,16,3,4,4,10,3),(565,4,5,16,3,4,4,10,3),(566,4,6,16,3,4,4,10,3),(567,4,7,16,3,4,4,10,3),(568,4,7,16,4,4,4,10,3),(569,4,1,16,4,4,4,10,3),(570,4,2,16,4,4,4,10,3),(571,4,3,16,4,4,4,10,3),(572,4,4,16,4,4,4,10,3),(573,4,5,16,4,4,4,10,3),(574,4,6,16,4,4,4,10,3),(577,2,7,4,5,2,2,9,1),(578,2,7,4,11,2,2,9,1),(579,2,1,6,3,2,2,9,1),(580,2,7,7,5,2,2,9,1),(581,2,7,7,11,2,2,9,1),(582,2,1,6,5,2,2,9,1),(583,2,1,7,5,2,2,9,1),(584,1,1,1,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `regulation_document_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regulator`
--

DROP TABLE IF EXISTS `regulator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `regulator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regulator`
--

LOCK TABLES `regulator` WRITE;
/*!40000 ALTER TABLE `regulator` DISABLE KEYS */;
INSERT INTO `regulator` VALUES (8,'FATCA','database',1,NULL,NULL,NULL,NULL),(9,'CPO-PQR','database',1,NULL,NULL,NULL,NULL),(10,'Dodd Frank','database',1,NULL,NULL,NULL,NULL),(11,'FORM PF','database',1,NULL,NULL,NULL,NULL),(12,'JOBS Act','database',1,NULL,NULL,NULL,NULL),(13,'test regulator','mmmmmm',1,NULL,NULL,'2017-07-17 05:11:26','2017-07-17 05:11:26'),(14,'LI','mmmmmm',1,NULL,NULL,'2017-07-17 05:11:37','2017-07-17 05:11:37'),(15,'test test test','mmmmmm',1,NULL,NULL,'2017-07-17 05:11:45','2017-07-17 05:11:45'),(16,'test test test','mmmmmm',1,NULL,NULL,'2017-07-17 05:11:54','2017-07-17 05:11:54');
/*!40000 ALTER TABLE `regulator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regulator_regulation_link`
--

DROP TABLE IF EXISTS `regulator_regulation_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `regulator_regulation_link` (
  `regulator_id` int(11) DEFAULT NULL,
  `regulation_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regulator_regulation_link`
--

LOCK TABLES `regulator_regulation_link` WRITE;
/*!40000 ALTER TABLE `regulator_regulation_link` DISABLE KEYS */;
INSERT INTO `regulator_regulation_link` VALUES (8,8),(8,9),(2,10),(3,10),(8,11),(8,12),(8,13),(8,1);
/*!40000 ALTER TABLE `regulator_regulation_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(30) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Super admin',NULL,NULL,NULL,NULL),(2,'admin',NULL,NULL,NULL,NULL),(3,'client',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `state_code` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'ALL','ALL',NULL,1,NULL,NULL,NULL,NULL,NULL),(2,'tamil nadu','tamil nadu',2,1,NULL,NULL,NULL,NULL,NULL),(3,'delhi','delhi',2,1,NULL,NULL,NULL,NULL,NULL),(4,'belgium','belgium',3,1,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subscription` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `initiated_date` timestamp NULL DEFAULT NULL,
  `expiry_date` timestamp NULL DEFAULT NULL,
  `access_geo` varchar(50) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `access_country` varchar(300) DEFAULT NULL,
  `access_state` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription`
--

LOCK TABLES `subscription` WRITE;
/*!40000 ALTER TABLE `subscription` DISABLE KEYS */;
INSERT INTO `subscription` VALUES (4,'2017-04-18 05:53:16','2018-04-16 05:53:16','ALL - EU - US - APAC',1,1,1,6,'2017-04-18 05:53:16','2017-06-20 10:54:37',NULL,NULL),(18,'2017-07-19 13:43:01','2018-07-19 13:43:01','',1,4,1,1,'2017-07-19 13:43:01','2017-07-19 14:00:30',NULL,NULL),(19,'2017-07-19 13:56:42','2018-07-19 13:56:42','',1,5,1,1,'2017-07-19 13:56:42','2017-07-19 13:59:31',NULL,NULL),(20,'2017-07-19 15:46:33','2018-07-19 15:46:33','',1,6,1,NULL,'2017-07-19 15:46:33',NULL,NULL,NULL),(21,'2017-07-20 07:41:29','2018-07-20 07:41:29','',1,7,1,NULL,'2017-07-20 07:41:29',NULL,NULL,NULL),(22,'2017-07-20 08:19:58','2018-07-20 08:19:58','',1,8,1,NULL,'2017-07-20 08:19:58',NULL,NULL,NULL),(23,'2017-07-20 08:26:27','2018-07-20 08:26:27','',1,9,1,NULL,'2017-07-20 08:26:27',NULL,NULL,NULL);
/*!40000 ALTER TABLE `subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription_detail`
--

DROP TABLE IF EXISTS `subscription_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subscription_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subscription_id` int(11) DEFAULT NULL,
  `geography_id` int(11) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `regulation_id` int(11) DEFAULT NULL,
  `document_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2523 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_detail`
--

LOCK TABLES `subscription_detail` WRITE;
/*!40000 ALTER TABLE `subscription_detail` DISABLE KEYS */;
INSERT INTO `subscription_detail` VALUES (2466,19,2,1,1,1,2,2),(2467,19,2,1,1,2,2,2),(2468,19,2,1,1,3,2,2),(2469,19,2,1,1,4,2,2),(2470,19,2,1,1,5,2,2),(2471,19,2,1,1,11,2,2),(2472,19,2,2,1,1,2,2),(2473,19,2,2,1,2,2,2),(2474,19,2,2,1,3,2,2),(2475,19,2,2,1,4,2,2),(2476,19,2,2,1,5,2,2),(2477,19,2,2,1,11,2,2),(2478,19,2,4,1,1,2,2),(2479,19,2,4,1,2,2,2),(2480,19,2,4,1,3,2,2),(2481,19,2,4,1,4,2,2),(2482,19,2,4,1,5,2,2),(2483,19,2,4,1,11,2,2),(2484,19,2,5,1,1,2,2),(2485,19,2,5,1,2,2,2),(2486,19,2,5,1,3,2,2),(2487,19,2,5,1,4,2,2),(2488,19,2,5,1,5,2,2),(2489,19,2,5,1,11,2,2),(2490,19,2,6,1,1,2,2),(2491,19,2,6,1,2,2,2),(2492,19,2,6,1,3,2,2),(2493,19,2,6,1,4,2,2),(2494,19,2,6,1,5,2,2),(2495,19,2,6,1,11,2,2),(2496,18,2,1,5,1,2,2),(2497,18,2,2,5,1,2,2),(2498,18,2,3,5,1,2,2),(2499,18,2,4,5,1,2,2),(2500,18,2,5,5,1,2,2),(2501,18,2,6,5,1,2,2),(2502,18,2,7,5,1,2,2),(2503,18,2,1,5,2,2,2),(2504,18,2,2,5,2,2,2),(2505,18,2,3,5,2,2,2),(2506,18,2,4,5,2,2,2),(2507,18,2,5,5,2,2,2),(2508,18,2,6,5,2,2,2),(2509,18,2,7,5,2,2,2),(2510,18,2,1,5,3,2,2),(2511,18,2,2,5,3,2,2),(2512,18,2,3,5,3,2,2),(2513,18,2,5,5,3,2,2),(2514,18,2,6,5,3,2,2),(2515,18,2,7,5,3,2,2),(2516,18,2,1,5,4,2,2),(2517,18,2,2,5,4,2,2),(2518,18,2,3,5,4,2,2),(2519,18,2,4,5,4,2,2),(2520,18,2,5,5,4,2,2),(2521,18,2,6,5,4,2,2),(2522,18,2,7,5,4,2,2);
/*!40000 ALTER TABLE `subscription_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subtype_document`
--

DROP TABLE IF EXISTS `subtype_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subtype_document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subtype_document`
--

LOCK TABLES `subtype_document` WRITE;
/*!40000 ALTER TABLE `subtype_document` DISABLE KEYS */;
INSERT INTO `subtype_document` VALUES (1,'Summary','Summary',1,1,NULL,NULL,NULL),(2,'Key Timeliness','Key Timeliness',1,1,NULL,NULL,NULL),(3,'LifeCycle Tracker','LifeCycle Tracker',1,1,NULL,NULL,NULL),(4,'Database','Database',1,1,NULL,NULL,NULL),(5,'Regulatory Analysis Level 1','Regulatory Analysis Level 1',1,1,NULL,NULL,NULL),(11,'Regulatory Analysis Level 2','Regulatory Analysis Level 2',1,1,NULL,NULL,NULL),(12,'fiiii','regulation analysinhhhhh',1,NULL,NULL,'2017-07-17 05:07:46','2017-07-17 05:07:46'),(13,'documentsnff','regulation analysin',1,NULL,NULL,'2017-07-17 05:08:01','2017-07-17 05:08:01'),(15,'adsdsfd','dAASFSDG',1,NULL,NULL,'2017-07-19 15:12:48','2017-07-19 15:12:48');
/*!40000 ALTER TABLE `subtype_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `table_alert`
--

DROP TABLE IF EXISTS `table_alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `table_alert` (
  `message` varchar(300) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) DEFAULT NULL,
  `domain` varchar(100) DEFAULT NULL,
  `geography` varchar(100) DEFAULT NULL,
  `regulation` varchar(100) DEFAULT NULL,
  `doctype` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `regulator` varchar(100) DEFAULT NULL,
  `subdocument` varchar(100) DEFAULT NULL,
  `regdocid` int(11) DEFAULT NULL,
  `geography_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table_alert`
--

LOCK TABLES `table_alert` WRITE;
/*!40000 ALTER TABLE `table_alert` DISABLE KEYS */;
INSERT INTO `table_alert` VALUES ('INVESTMENT FUNDS >> EU >> AIFMD >> Summary',NULL,NULL,'2017-07-17 13:25:39',1,NULL,'INVESTMENT FUNDS','EU','AIFMD','Summary','india','tamil nadu',NULL,NULL,131,2),('BANKING >> US >> JOBS Act >> Summary',NULL,NULL,'2017-07-17 13:25:39',2,NULL,'BANKING','US','JOBS Act','Summary','india','tamil nadu',NULL,NULL,41,3),('PAYMENTS >> APAC >> OTC TRANSACTION >> Database',NULL,NULL,'2017-07-17 13:25:39',3,NULL,'PAYMENTS','APAC','OTC TRANSACTION','Database','india','tamil nadu',NULL,NULL,543,4),('SECURITIES & MARKET >> EU >> EMIR >> Regulatory Analysis Level 1',NULL,NULL,'2017-07-17 13:25:39',4,NULL,'SECURITIES & MARKET','EU','EMIR','Regulatory Analysis Level 1','india','tamil nadu',NULL,NULL,577,2),('SECURITIES & MARKET >> EU >> EMIR >> Key Timeliness',NULL,NULL,'2017-07-17 13:25:39',5,NULL,'SECURITIES & MARKET','EU','EMIR','Key Timeliness','india','tamil nadu',NULL,NULL,244,2),('SECURITIES & MARKET >> EU >> EMIR >> Regulatory Analysis Level 2',NULL,NULL,'2017-07-17 13:25:39',6,NULL,'SECURITIES & MARKET','EU','EMIR','Regulatory Analysis Level 2','india','tamil nadu',NULL,NULL,578,2),('SECURITIES & MARKET >> EU >> EMIR >> LifeCycle Tracker',NULL,NULL,'2017-07-17 13:25:39',7,NULL,'SECURITIES & MARKET','EU','EMIR','LifeCycle Tracker','india','tamil nadu',NULL,NULL,251,2),('SECURITIES & MARKET >> EU >> EMIR >> Database',NULL,NULL,'2017-07-17 13:25:39',8,NULL,'SECURITIES & MARKET','EU','EMIR','Database','india','tamil nadu',NULL,NULL,258,2);
/*!40000 ALTER TABLE `table_alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `email_id` varchar(100) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `user_group_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `session_id` varchar(240) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `profile_image_link` varchar(100) DEFAULT NULL,
  `mobile_no` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'superadmin','$2a$10$g4Synqn5oLwz5JSR16a46uPofLh6C28boN75qbCAxyN2OLfUOQH6S','superadmin@zurik.com','zurik',1,1,'9e88306a-85ad-ae86-83f9-be65c2c51c98',0,NULL,'2017-04-18 06:20:42','2017-04-18 06:20:42',NULL,NULL),(4,'ball','$2a$10$jN6h5IqyZ.stPo51dKJFkOz3KE.yOKfLUJdssR6krvvJrDJy95TPe','ball@gmail.com','others',8,0,'2b6db753-839c-6777-2357-15d9c2f75624',1,1,'2017-07-19 13:43:01','2017-07-20 08:25:50','images/profile/photo/01.png',NULL),(5,'admin','$2a$10$iHWJFuIqBZeOQxlI9J26keB9IotQJHJcdsQCYCsPIDa07R05t8I.u','admin@gmail.com','zurik',1,0,'bc12e94e-c741-a41d-a947-53a810c25660',1,1,'2017-07-19 13:56:42','2017-07-20 08:25:52','images/profile/photo/01.png',NULL),(6,'adminwer','$2a$10$/qFrqxBGKdQz6dwTzJFEgueg7OoNYG.qe2dChfESRDVArDlekjPJy','adminwer@gmail.com','zurik',1,0,'1b0654be-6513-b77a-4e3a-ab669f59fd65',1,NULL,'2017-07-19 15:46:33','2017-07-20 08:25:54','images/profile/photo/01.png',NULL),(7,'vini','$2a$10$2kYD5hETPRiX2/76hQLiceqUsS38kuI.AD9e7v8x6qpxWpvFPozdy','vinitha@gmail.com','others',9,0,'406a379c-2343-8e53-556f-4a4d68b6be7d',1,NULL,'2017-07-20 07:41:29','2017-07-20 08:05:44','images/profile/photo/01.png',NULL),(8,'vini','$2a$10$YBl61mme8PKScEy/kqcKEuCpIY6sWQe.7EDuZ/M9YmXiAHg5V8Dui','vinitha@gmail.com','others',12,1,'393cfccc-ff51-769c-d4cb-d39e0f0f3250',1,NULL,'2017-07-20 08:19:57','2017-07-20 08:19:57','images/profile/photo/01.png','9876543210'),(9,'vini','$2a$10$I2vpSYQu3X86hl/rnMti.OfWy3Vv97K9W.Mm0U2RG5Xfp34XCbi6.','vinitha@vahaitech.com','zurik',1,1,'ac0f5dd4-3e67-2364-fcc6-42da911545ad',1,NULL,'2017-07-20 08:26:26','2017-07-20 08:26:26','images/profile/photo/01.png','9585751450');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_group`
--

DROP TABLE IF EXISTS `user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group`
--

LOCK TABLES `user_group` WRITE;
/*!40000 ALTER TABLE `user_group` DISABLE KEYS */;
INSERT INTO `user_group` VALUES (1,'zurik',1,NULL,'2017-04-17 07:19:25',NULL),(2,'others',1,NULL,'2017-04-17 07:20:25',NULL),(3,'others',6,NULL,'2017-06-20 10:47:30','2017-06-20 10:47:30'),(4,'others',6,NULL,'2017-06-27 05:55:27','2017-06-27 05:55:27'),(5,'others',6,NULL,'2017-06-27 06:15:56','2017-06-27 06:15:56'),(6,'others',6,NULL,'2017-06-27 06:22:01','2017-06-27 06:22:01'),(7,'others',1,NULL,'2017-07-06 12:57:51','2017-07-06 12:57:51'),(8,'others',1,NULL,'2017-07-19 13:43:00','2017-07-19 13:43:00'),(9,'others',1,NULL,'2017-07-20 07:41:28','2017-07-20 07:41:28'),(10,'others',1,NULL,'2017-07-20 08:06:12','2017-07-20 08:06:12'),(11,'others',1,NULL,'2017-07-20 08:08:56','2017-07-20 08:08:56'),(12,'others',1,NULL,'2017-07-20 08:19:57','2017-07-20 08:19:57');
/*!40000 ALTER TABLE `user_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permission`
--

DROP TABLE IF EXISTS `user_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_permission` (
  `user_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permission`
--

LOCK TABLES `user_permission` WRITE;
/*!40000 ALTER TABLE `user_permission` DISABLE KEYS */;
INSERT INTO `user_permission` VALUES (1,8),(1,3),(1,1),(1,5),(1,10),(1,4),(1,11),(1,7),(7,7),(7,8),(8,7),(8,8),(9,7),(9,9),(10,7),(10,9),(11,7),(11,8),(12,5),(12,1),(12,3),(12,4),(12,7),(12,9),(12,10),(12,11),(13,7),(13,9),(14,7),(14,9),(15,7),(15,8),(16,7),(16,8),(3,8),(3,3),(3,1),(3,5),(3,10),(3,4),(3,11),(3,7),(5,3),(5,1),(5,4),(5,7),(5,9),(5,11),(5,5),(5,10),(4,7),(4,9),(6,1),(6,3),(6,7),(6,9),(6,10),(7,7),(7,8),(8,7),(8,8),(9,3),(9,5),(9,7),(9,8),(9,10),(9,4),(9,11),(9,1);
/*!40000 ALTER TABLE `user_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1),(12,1),(13,2),(14,3),(15,2),(16,2),(2,2),(3,3),(4,3),(5,2),(6,2),(7,3),(8,3),(9,2);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-07-20 16:31:33
