-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: zurik2
-- ------------------------------------------------------
-- Server version	5.7.18

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
-- Table structure for table `alert_file`
--

DROP TABLE IF EXISTS `alert_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alert_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alert_id` int(11) DEFAULT NULL,
  `file_name` varchar(50) DEFAULT NULL,
  `file_path` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alert_file`
--

LOCK TABLES `alert_file` WRITE;
/*!40000 ALTER TABLE `alert_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `alert_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alert_type`
--

DROP TABLE IF EXISTS `alert_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alert_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(30) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `url` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alert_type`
--

LOCK TABLES `alert_type` WRITE;
/*!40000 ALTER TABLE `alert_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `alert_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alerts`
--

DROP TABLE IF EXISTS `alerts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alerts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(150) DEFAULT NULL,
  `name` varchar(150) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `geography_id` int(11) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `regulation_id` int(11) DEFAULT NULL,
  `regulator_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `doctype_id` int(11) DEFAULT NULL,
  `subdoctype_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `email_id` int(11) DEFAULT NULL,
  `sms_id` int(11) DEFAULT NULL,
  `web_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alerts`
--

LOCK TABLES `alerts` WRITE;
/*!40000 ALTER TABLE `alerts` DISABLE KEYS */;
/*!40000 ALTER TABLE `alerts` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `config` VALUES (1,'trialPeriod','30',1,NULL,'2017-04-19 01:22:40',NULL),(2,'paidPeriod-1','365',1,NULL,'2017-04-19 01:23:41',NULL),(3,'paidPeriod-2','1095',1,NULL,'2017-04-19 01:23:42',NULL),(4,'paidPeriod-3','1825',1,NULL,'2017-04-19 01:23:43',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'ALL','ALL',1,1,NULL,NULL,'2017-07-26 00:11:05','2017-07-26 00:11:05'),(2,'EU','Europe',2,1,NULL,1,'2017-07-28 07:13:20','2017-07-28 09:07:19'),(3,'UK','United Kingdom',4,1,NULL,NULL,'2017-07-28 07:14:15','2017-07-28 07:14:15'),(4,'APAC','Asia-Pacific',5,1,NULL,NULL,'2017-07-28 07:19:40','2017-07-28 07:19:40'),(5,'US','United States',3,1,NULL,NULL,'2017-07-28 07:20:06','2017-07-28 07:20:06'),(6,'AUSTRALIA','Australia',6,1,NULL,NULL,'2017-07-28 07:20:48','2017-07-28 07:20:48'),(7,'AFRICA','Africa',7,1,NULL,1,'2017-07-28 07:21:14','2017-07-28 07:21:27'),(8,'MIDDLE EAST','Middle East',8,1,NULL,1,'2017-07-28 07:21:57','2017-07-28 08:03:31'),(9,'HONG KONG','Hong Kong',5,1,NULL,NULL,'2017-07-28 07:56:53','2017-07-28 07:56:53'),(10,'INDIA','India',5,1,NULL,NULL,'2017-07-28 07:57:45','2017-07-28 07:57:45'),(11,'SINGAPORE','singapore',5,1,NULL,NULL,'2017-07-28 07:58:09','2017-07-28 07:58:09'),(12,'AUSTRALIA','Australia',6,1,NULL,NULL,'2017-07-28 07:58:41','2017-07-28 07:58:41'),(13,'DUBAI','Dubai',8,1,NULL,NULL,'2017-07-28 07:59:46','2017-07-28 07:59:46'),(14,'UAE','United Arab Emirates',8,1,NULL,NULL,'2017-07-28 08:00:45','2017-07-28 08:00:45'),(15,'SAUDI ARABIA','Saudi Arabia',8,1,NULL,NULL,'2017-07-28 08:01:23','2017-07-28 08:01:23'),(17,'SOUTH AFRICA','South Africa',7,1,NULL,NULL,'2017-07-28 08:04:34','2017-07-28 08:04:34'),(18,'NIGERIA','Nigeria',7,1,NULL,NULL,'2017-07-28 08:05:24','2017-07-28 08:05:24'),(19,'KENYA','kenya',7,1,NULL,NULL,'2017-07-28 08:05:49','2017-07-28 08:05:49');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
INSERT INTO `document` VALUES (1,'Summary','Summary',1,NULL,NULL,'2017-07-28 10:35:07','2017-07-28 10:35:07'),(2,'Timeline','Timeline',1,NULL,NULL,'2017-07-28 10:35:20','2017-07-28 10:35:20'),(3,'Lifecycle','Lifecycle',1,NULL,NULL,'2017-07-28 10:35:31','2017-07-28 10:35:31'),(4,'Analysis','Analysis',1,NULL,NULL,'2017-07-28 10:35:40','2017-07-28 10:35:40'),(5,'Alerts','Alerts',1,NULL,NULL,'2017-07-28 10:35:50','2017-07-28 10:35:50');
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
INSERT INTO `domain` VALUES (1,'Supervisory','Supervisory',1,NULL,NULL,'2017-07-28 09:23:16','2017-07-28 09:23:16'),(2,'Banking&Credit Union','Banking&Credit Union',1,NULL,NULL,'2017-07-28 09:37:38','2017-07-28 09:37:38'),(3,'Consumer Finance','Consumer Finance',1,NULL,NULL,'2017-07-28 09:39:09','2017-07-28 09:39:09'),(4,'Payment Services','Payment Services',1,NULL,NULL,'2017-07-28 09:39:27','2017-07-28 09:39:27'),(5,'Financial Markets','Financial Markets',1,NULL,NULL,'2017-07-28 09:39:46','2017-07-28 09:39:46'),(6,'Financial Crime','Financial Crime',1,NULL,NULL,'2017-07-28 09:40:08','2017-07-28 09:40:08'),(7,'Insurance&Pensions','Insurance& Pensions',1,NULL,NULL,'2017-07-28 09:40:47','2017-07-28 09:40:47');
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `geography`
--

LOCK TABLES `geography` WRITE;
/*!40000 ALTER TABLE `geography` DISABLE KEYS */;
INSERT INTO `geography` VALUES (1,'ALL','ALL',1,NULL,NULL,'2017-07-26 00:10:14','2017-07-26 00:10:14'),(2,'EU','Europe',1,NULL,NULL,'2017-07-28 07:06:01','2017-07-28 07:06:01'),(3,'US','United States',1,NULL,NULL,'2017-07-28 07:06:22','2017-07-28 07:06:22'),(4,'UK','United Kingdom',1,NULL,NULL,'2017-07-28 07:06:47','2017-07-28 07:06:47'),(5,'APAC','Asia-Pacific',1,NULL,NULL,'2017-07-28 07:10:30','2017-07-28 07:10:30'),(6,'AUSTRALIA','Australia',1,NULL,NULL,'2017-07-28 07:10:52','2017-07-28 07:10:52'),(7,'AFRICA','Africa',1,NULL,NULL,'2017-07-28 07:11:14','2017-07-28 07:11:14'),(8,'MIDDLE EAST','Middle East',1,NULL,1,'2017-07-28 07:11:56','2017-07-28 07:12:55');
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regulation`
--

LOCK TABLES `regulation` WRITE;
/*!40000 ALTER TABLE `regulation` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regulation_document_link`
--

LOCK TABLES `regulation_document_link` WRITE;
/*!40000 ALTER TABLE `regulation_document_link` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regulator`
--

LOCK TABLES `regulator` WRITE;
/*!40000 ALTER TABLE `regulator` DISABLE KEYS */;
INSERT INTO `regulator` VALUES (1,'ECB','ECB',1,NULL,1,'2017-07-28 09:50:40','2017-07-28 10:41:28'),(2,'EBA','EBA',1,NULL,NULL,'2017-07-28 09:51:02','2017-07-28 09:51:02'),(3,'ESMA','ESMA',1,NULL,NULL,'2017-07-28 09:51:15','2017-07-28 09:51:15'),(4,'EIOPA','EIOPA',1,NULL,NULL,'2017-07-28 09:51:32','2017-07-28 09:51:32'),(5,'BOE','BOE',1,NULL,1,'2017-07-28 09:53:15','2017-07-28 10:16:34'),(6,'PRA','PRA',1,NULL,NULL,'2017-07-28 09:53:28','2017-07-28 09:53:28'),(7,'FCA','FCA',1,NULL,NULL,'2017-07-28 09:53:45','2017-07-28 09:53:45'),(8,'FSOC','FSOC',1,NULL,1,'2017-07-28 09:54:31','2017-07-28 10:17:29'),(9,'OCC','OCC',1,NULL,1,'2017-07-28 09:55:29','2017-07-28 10:20:03'),(10,'FHFA','FHFA',1,NULL,1,'2017-07-28 09:56:12','2017-07-28 10:21:55'),(11,'SEC','SEC',1,NULL,1,'2017-07-28 09:57:03','2017-07-28 10:22:45'),(12,'FINCEN','FINCEN',1,NULL,NULL,'2017-07-28 09:57:20','2017-07-28 09:57:20'),(13,'NAIC','NAIC',1,NULL,NULL,'2017-07-28 09:57:35','2017-07-28 09:57:35'),(14,'HKMA','HKMA',1,NULL,NULL,'2017-07-28 09:57:53','2017-07-28 09:57:53'),(15,'SFC','SFC',1,NULL,NULL,'2017-07-28 09:58:08','2017-07-28 09:58:08'),(16,'OFFICE OF THE COMMISSIONER OF INSURANCE','OFFICE OF THE COMMISSIONER OF INSURANCE',1,NULL,1,'2017-07-28 09:58:23','2017-07-28 09:59:22'),(17,'MAS','MAS',1,NULL,NULL,'2017-07-28 09:59:35','2017-07-28 09:59:35'),(18,'RBI','RBI',1,NULL,NULL,'2017-07-28 09:59:45','2017-07-28 09:59:45'),(19,'SEBI','SEBI',1,NULL,1,'2017-07-28 10:00:20','2017-07-28 10:24:26'),(20,'IRDAI','IRDAI',1,NULL,NULL,'2017-07-28 10:00:38','2017-07-28 10:00:38'),(21,'PFRDA','PFRDA',1,NULL,NULL,'2017-07-28 10:00:51','2017-07-28 10:00:51'),(22,'OSFI','OSFI',1,NULL,NULL,'2017-07-28 10:01:06','2017-07-28 10:01:06'),(24,'CDIC','CDIC',1,NULL,NULL,'2017-07-28 10:02:10','2017-07-28 10:02:10'),(25,'FOC','FOC',1,NULL,NULL,'2017-07-28 10:17:08','2017-07-28 10:17:08'),(26,'FFIEC','FFIEC',1,NULL,NULL,'2017-07-28 10:17:55','2017-07-28 10:17:55'),(27,'PWG','PWG',1,NULL,NULL,'2017-07-28 10:18:10','2017-07-28 10:18:10'),(28,'FDIC','FDIC',1,NULL,NULL,'2017-07-28 10:21:02','2017-07-28 10:21:02'),(29,'NCUA','NCUA',1,NULL,NULL,'2017-07-28 10:21:20','2017-07-28 10:21:20'),(30,'FRB','FRB',1,NULL,NULL,'2017-07-28 10:21:31','2017-07-28 10:21:31'),(31,'CFPB','CFPB',1,NULL,NULL,'2017-07-28 10:22:15','2017-07-28 10:22:15'),(32,'CFTV','CFTV',1,NULL,NULL,'2017-07-28 10:23:09','2017-07-28 10:23:09'),(33,'FINRA','FINRA',1,NULL,NULL,'2017-07-28 10:23:32','2017-07-28 10:23:32'),(34,'NFA','NFA',1,NULL,NULL,'2017-07-28 10:23:46','2017-07-28 10:23:46'),(35,'FMC','FMC',1,NULL,1,'2017-07-28 10:24:34','2017-07-28 10:24:53'),(36,'FSCO','FSCO',1,NULL,NULL,'2017-07-28 10:25:41','2017-07-28 10:25:41'),(37,'CSA','CSA',1,NULL,NULL,'2017-07-28 10:26:08','2017-07-28 10:26:08'),(38,'IIROC(Self)','IIROC(Self)',1,NULL,NULL,'2017-07-28 10:26:29','2017-07-28 10:26:29'),(39,'MFDA(Self)','MFDA(Self)',1,NULL,NULL,'2017-07-28 10:26:47','2017-07-28 10:26:47'),(40,'AMF(Quebec)','AMF(Quebec)',1,NULL,NULL,'2017-07-28 10:27:04','2017-07-28 10:27:04'),(41,'BCSC(British Columbia)','BCSC(British Columbia)',1,NULL,NULL,'2017-07-28 10:27:22','2017-07-28 10:27:22'),(42,'FINTRAC','FINTRAC',1,NULL,NULL,'2017-07-28 10:27:52','2017-07-28 10:27:52'),(43,'ANF(Quebec)','ANF(Quebec)',1,NULL,NULL,'2017-07-28 10:29:41','2017-07-28 10:29:41'),(44,'SAMA','SAMA',1,NULL,NULL,'2017-07-28 10:29:59','2017-07-28 10:29:59'),(45,'CMA','CMA',1,NULL,NULL,'2017-07-28 10:30:19','2017-07-28 10:30:19'),(46,'DFSA','DFSA',1,NULL,NULL,'2017-07-28 10:30:32','2017-07-28 10:30:32'),(47,'CBN','CBN',1,NULL,NULL,'2017-07-28 10:30:49','2017-07-28 10:30:49'),(48,'NSE(Self)','NSE(Self)',1,NULL,NULL,'2017-07-28 10:31:48','2017-07-28 10:31:48'),(50,'SARB','SARB',1,NULL,NULL,'2017-07-28 10:32:57','2017-07-28 10:32:57'),(51,'NCR','NCR',1,NULL,NULL,'2017-07-28 10:33:17','2017-07-28 10:33:17'),(52,'FSB','FSB',1,NULL,NULL,'2017-07-28 10:33:35','2017-07-28 10:33:35'),(53,'ESRB','ESRB',1,NULL,NULL,'2017-07-28 10:41:38','2017-07-28 10:41:38');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'ALL','ALL',1,1,NULL,NULL,'2017-07-26 00:11:57','2017-07-26 00:11:57','ALL'),(11,'ALABAMA','Alabama',5,1,NULL,NULL,'2017-07-28 09:07:58','2017-07-28 09:07:58','AL'),(12,'ALASKA','Alaska',5,1,NULL,NULL,'2017-07-28 09:08:27','2017-07-28 09:08:27','AK'),(13,'CALIFORNIA','california',5,1,NULL,NULL,'2017-07-28 09:08:52','2017-07-28 09:08:52','CA'),(14,'FLORIDA','Florida',5,1,NULL,NULL,'2017-07-28 09:09:22','2017-07-28 09:09:22','FL'),(15,'NEW YORK','New York',5,1,NULL,NULL,'2017-07-28 09:10:07','2017-07-28 09:10:07','NY'),(16,'INDIANA','Indiana',5,1,NULL,NULL,'2017-07-28 09:10:42','2017-07-28 09:10:42','IN'),(17,'NEW MEXICO','New Mexico',5,1,NULL,NULL,'2017-07-28 09:11:14','2017-07-28 09:11:14','NM'),(18,'TEXAS','Texas',5,1,NULL,NULL,'2017-07-28 09:11:48','2017-07-28 09:11:48','TX'),(19,'VIRGINIA','Virginia',5,1,NULL,NULL,'2017-07-28 09:12:20','2017-07-28 09:12:20','VA'),(20,'WASHINGTON','Washington',5,1,NULL,NULL,'2017-07-28 09:13:08','2017-07-28 09:13:08','WA');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription`
--

LOCK TABLES `subscription` WRITE;
/*!40000 ALTER TABLE `subscription` DISABLE KEYS */;
INSERT INTO `subscription` VALUES (1,'2017-04-18 00:23:16','2018-04-16 00:23:16','ALL-EU-US-UK-APAC-AUSTRALIA-AFRICA-MIDDLE EAST',1,1,1,6,'2017-04-18 00:23:16','2017-06-20 05:24:37',NULL,NULL),(2,'2017-07-28 06:51:51','2018-07-28 06:51:51','ALL-EU-US-UK-APAC-AUSTRALIA-AFRICA-MIDDLE EAST',1,2,1,NULL,'2017-07-28 06:51:51',NULL,NULL,NULL);
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
  `web` tinyint(1) DEFAULT NULL,
  `sms` tinyint(1) DEFAULT NULL,
  `email` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_detail`
--

LOCK TABLES `subscription_detail` WRITE;
/*!40000 ALTER TABLE `subscription_detail` DISABLE KEYS */;
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
  `doc_id` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subtype_document`
--

LOCK TABLES `subtype_document` WRITE;
/*!40000 ALTER TABLE `subtype_document` DISABLE KEYS */;
INSERT INTO `subtype_document` VALUES (1,'EU','EU',1,1,NULL,NULL,'2017-07-28 10:36:19','2017-07-28 10:36:19');
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
  `regulation_id` int(11) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `regulator_id` int(11) DEFAULT NULL,
  `doctype_id` int(11) DEFAULT NULL,
  `subdoctype_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table_alert`
--

LOCK TABLES `table_alert` WRITE;
/*!40000 ALTER TABLE `table_alert` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'superadmin','$2a$10$g4Synqn5oLwz5JSR16a46uPofLh6C28boN75qbCAxyN2OLfUOQH6S','superadmin@zurik.com','zurik',1,1,'9e88306a-85ad-ae86-83f9-be65c2c51c98',0,NULL,'2017-04-18 00:50:42','2017-04-18 00:50:42','/images/profile/photo/Adam Kohn.jpeg',NULL),(2,'wood','$2a$10$XPMmmO8yyL8p1OXbqB.cQOV/YgLravN/oicb8FqSM44EtkQcBQlsS','wood@gmail.com','zurik',1,1,'d06293bc-5e94-a924-51ba-a843ac07fede',1,NULL,'2017-07-28 06:51:50','2017-07-28 06:51:50','images/profile/photo/01.png','9090909090');
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group`
--

LOCK TABLES `user_group` WRITE;
/*!40000 ALTER TABLE `user_group` DISABLE KEYS */;
INSERT INTO `user_group` VALUES (1,'zurik',1,NULL,'2017-04-17 01:49:25',NULL),(15,'others',1,NULL,'2017-07-26 00:03:09','2017-07-26 00:03:09');
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
INSERT INTO `user_permission` VALUES (1,8),(1,3),(1,1),(1,5),(1,10),(1,4),(1,11),(1,7),(12,7),(12,8),(2,8),(2,1),(2,3),(2,4),(2,5),(2,7),(2,10),(2,11);
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
INSERT INTO `user_role` VALUES (1,1),(2,2);
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

-- Dump completed on 2017-07-28 16:27:12
