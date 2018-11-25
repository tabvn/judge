-- MySQL dump 10.13  Distrib 5.6.40, for macos10.13 (x86_64)
--
-- Host: localhost    Database: ued
-- ------------------------------------------------------
-- Server version	5.6.40

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
-- Table structure for table `connections`
--

DROP TABLE IF EXISTS `connections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connections` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `sid` varchar(255) DEFAULT NULL,
  `created` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `connections_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `connections`
--

LOCK TABLES `connections` WRITE;
/*!40000 ALTER TABLE `connections` DISABLE KEYS */;
/*!40000 ALTER TABLE `connections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contest_problem`
--

DROP TABLE IF EXISTS `contest_problem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contest_problem` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `problem_id` int(11) unsigned NOT NULL,
  `max_score` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `problem_id` (`problem_id`),
  CONSTRAINT `contest_problem_ibfk_1` FOREIGN KEY (`problem_id`) REFERENCES `problems` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contest_problem`
--

LOCK TABLES `contest_problem` WRITE;
/*!40000 ALTER TABLE `contest_problem` DISABLE KEYS */;
/*!40000 ALTER TABLE `contest_problem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contests`
--

DROP TABLE IF EXISTS `contests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contests` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `use_id` int(11) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start` int(11) DEFAULT NULL,
  `end` int(11) DEFAULT NULL,
  `description` longtext,
  `scoreboard` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `use_id` (`use_id`),
  CONSTRAINT `contests_ibfk_1` FOREIGN KEY (`use_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contests`
--

LOCK TABLES `contests` WRITE;
/*!40000 ALTER TABLE `contests` DISABLE KEYS */;
/*!40000 ALTER TABLE `contests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `original_name` varchar(255) NOT NULL DEFAULT '',
  `size` int(11) NOT NULL,
  `type` varchar(50) NOT NULL DEFAULT '',
  `created` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `files_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (23,9,'db8c8dfd9100c083658dbd00_fairplay.pdf','fairplay.pdf',880252,'application/pdf',1543149659),(24,9,'9895cbcfb2a2bed63a26173e_fairplay.pdf','fairplay.pdf',880252,'application/pdf',1543150938),(25,9,'ff609989dc3b315d969ef3a6_fairplay.pdf','fairplay.pdf',880252,'application/pdf',1543151176),(28,9,'e605a8b9742cec92cbf14561_bakice.pdf','bakice.pdf',83846,'application/pdf',1543151824),(29,9,'4850f05dbba2fa0cbebbd3d2_bakice.pdf','bakice.pdf',83846,'application/pdf',1543157581),(30,9,'f2240d0ee3b5b36d5763cb86_fairplay.pdf','fairplay.pdf',880252,'application/pdf',1543157657);
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problems`
--

DROP TABLE IF EXISTS `problems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `problems` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  `description` longtext,
  `input` longtext,
  `output` longtext,
  `file_id` int(11) unsigned DEFAULT NULL,
  `created` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `file_id` (`file_id`),
  CONSTRAINT `problems_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `problems_ibfk_2` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problems`
--

LOCK TABLES `problems` WRITE;
/*!40000 ALTER TABLE `problems` DISABLE KEYS */;
INSERT INTO `problems` VALUES (11,'Fairplay updated',9,'Desc','In','Out',28,1543149865),(12,'New problem',9,'','','',29,1543157584),(13,'Test problem',9,'','','',30,1543157657),(16,'aaaa',9,'','','',NULL,1543157790),(22,'fsdafsaf',9,'','','',NULL,1543158129),(23,'testdsafsafas',9,'','','',NULL,1543158679),(24,'fsafa',9,'','','',NULL,1543158692),(27,'Tabvn',9,'fsfa','','',NULL,1543161201);
/*!40000 ALTER TABLE `problems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'authenticated');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submission_test`
--

DROP TABLE IF EXISTS `submission_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `submission_test` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `submission_id` int(11) unsigned DEFAULT NULL,
  `test_id` int(11) unsigned DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `memory` double DEFAULT '0',
  `time` double DEFAULT '0',
  `error` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `submission_id` (`submission_id`),
  KEY `test_id` (`test_id`),
  CONSTRAINT `submission_test_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `submissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `submission_test_ibfk_2` FOREIGN KEY (`test_id`) REFERENCES `contests` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submission_test`
--

LOCK TABLES `submission_test` WRITE;
/*!40000 ALTER TABLE `submission_test` DISABLE KEYS */;
/*!40000 ALTER TABLE `submission_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submissions`
--

DROP TABLE IF EXISTS `submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `submissions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT NULL,
  `problem_id` int(11) unsigned DEFAULT NULL,
  `contest_id` int(11) unsigned DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `code` longtext,
  `score` double DEFAULT '0',
  `created` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `problem_id` (`problem_id`),
  KEY `contest_id` (`contest_id`),
  CONSTRAINT `submissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `submissions_ibfk_2` FOREIGN KEY (`problem_id`) REFERENCES `problems` (`id`) ON DELETE CASCADE,
  CONSTRAINT `submissions_ibfk_3` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissions`
--

LOCK TABLES `submissions` WRITE;
/*!40000 ALTER TABLE `submissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_user`
--

DROP TABLE IF EXISTS `team_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `team_id` int(11) unsigned DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `team_id` (`team_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `team_user_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `team_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_user`
--

LOCK TABLES `team_user` WRITE;
/*!40000 ALTER TABLE `team_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teams` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tests`
--

DROP TABLE IF EXISTS `tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tests` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `problem_id` int(11) unsigned NOT NULL,
  `strength` int(11) DEFAULT '10',
  `active` tinyint(1) DEFAULT '1',
  `sample` tinyint(1) DEFAULT '0',
  `created` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `problem_id` (`problem_id`),
  CONSTRAINT `tests_ibfk_1` FOREIGN KEY (`problem_id`) REFERENCES `problems` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tests`
--

LOCK TABLES `tests` WRITE;
/*!40000 ALTER TABLE `tests` DISABLE KEYS */;
INSERT INTO `tests` VALUES (1,27,0,0,0,1543162558),(2,27,0,0,0,1543162600),(3,27,0,0,0,1543162638),(4,27,0,0,0,1543163331),(5,27,0,0,0,1543163577),(6,27,0,0,0,1543163599),(7,27,0,0,0,1543163632),(8,27,0,0,0,1543163640),(9,27,0,0,0,1543163650),(10,27,1,0,0,1543163783),(11,27,1,0,0,1543163816),(12,27,1,0,0,1543163920);
/*!40000 ALTER TABLE `tests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tokens` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT '0',
  `created` int(11) DEFAULT '0',
  `expired` int(11) DEFAULT '0',
  `token` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (2,9,1543030622,1543117022,'3f1fc4fe-10a2-48d1-aee0-d7a0a1241d4f'),(3,9,1543030686,1543117086,'05469059-2637-4a0d-8d24-3da1e1f25ee8'),(4,9,1543030692,1543117092,'4978eb18-920b-4f3e-8d08-4c5f9a4d3694'),(5,9,1543030701,1543117101,'eeffc3cb-3087-49cf-be74-5701e6439fa0'),(7,30,1543031838,1543118238,'47ccfc38-9dec-493e-b714-84f8ff6657ac'),(8,9,1543032017,1543118417,'57755eec-451e-4609-a7f8-897e7c4eea08'),(9,9,1543032066,1543118466,'4286a206-63f9-4e7e-b12c-54ea6e769184'),(10,30,1543032093,1543118493,'c0459288-d7d0-4a24-8129-1e88e9440ca9'),(11,30,1543032094,1543118494,'47dea718-4f43-4be8-9498-9cc6d3a84c9b'),(12,30,1543032095,1543118495,'7ccfccc2-9158-41d9-8dc4-201850f4b54f'),(13,30,1543032098,1543118498,'777329b1-cda0-4138-b28b-cd3bb7a20405'),(14,30,1543032116,1543118516,'37751416-0278-400d-b40c-01a966364a1f'),(15,30,1543032127,1543118527,'7add7ead-f22d-431c-b1a6-851320136156'),(16,30,1543032191,1543118591,'61230e1e-c733-4794-bc7e-44b5929eafab'),(17,30,1543032585,1543118985,'76d17cbf-cf41-42be-8fcb-eb05c90e638b'),(18,30,1543032589,1543118989,'714b188d-fbc0-4fe6-a1ac-8735d666d622'),(19,30,1543032698,1543119098,'070ef045-03e6-486a-b1e8-4f6aca1e9395'),(20,30,1543032769,1543119169,'5970c597-e13d-416f-bcfa-0314ab6d2db1'),(21,30,1543032796,1543119196,'1b575978-7792-4ac8-96b3-861c11dbd9ba'),(22,30,1543032855,1543119255,'a3141b8e-5af4-422a-ba7a-64749426dfab'),(23,30,1543032876,1543119276,'06555b69-a208-43f6-a01c-662c2f084ee7'),(24,30,1543035159,1543121559,'50d2c3a1-d617-4190-af6d-11c1f5565961'),(25,30,1543035236,1543121636,'4909acc4-5b5f-4d34-8d75-ec158af62e25'),(26,30,1543035317,1543121717,'a239cb4c-b7bb-4822-a2f5-1d5c13dd7d24'),(27,30,1543053946,1543140346,'570e086e-e80a-47c1-a295-b3ee7a2d7030'),(28,30,1543054041,1543140441,'ceb5639e-c822-4e05-b68c-c400e34e2ca7'),(29,30,1543054115,1543140515,'05bd9e3b-bb61-42e5-97b6-34c78d411d90'),(30,30,1543054134,1543140534,'72a15aaf-e5b4-4f68-9112-c1ad31fef618'),(31,30,1543054171,1543140571,'d5201a59-a088-47b3-850d-acb90195c37d'),(32,30,1543054179,1543140579,'8ae9efaa-3912-49f1-aef2-1e15df8ec027'),(33,30,1543054186,1543140586,'81ce0555-f321-4258-82e3-a52b73c9e1d5'),(34,30,1543054216,1543140616,'7a33eec1-1a2b-4a06-838e-b87639ca80b8'),(35,30,1543054244,1543140644,'86fc1aa9-f130-4b11-a9a4-48dbd97249fe'),(36,30,1543054282,1543140682,'626ec1a8-6039-40bc-91d9-f0cd52548e3d'),(37,30,1543054283,1543140683,'eee6a5be-796b-4978-a95c-4a168e2408a6'),(38,30,1543054285,1543140685,'afe78dea-d3cc-4dab-8a38-4db6012a189d'),(39,30,1543054296,1543140696,'a2f40f4c-8d6b-4617-bb82-e94707a006fa'),(40,30,1543054310,1543140710,'ca8dfcf7-ec29-4a7d-8543-473edbde7b41'),(41,30,1543054349,1543140749,'a42c6bdd-3517-4b6e-9868-ff91c4c66ebe'),(42,30,1543054351,1543140751,'9b6ddd1e-427f-4632-b2f1-24cc9a8238fb'),(43,30,1543054370,1543140770,'05161203-f21a-4416-876c-3f318019425e'),(44,30,1543054377,1543140777,'f8aa893e-6ef6-4a75-8467-2de8161069fe'),(45,30,1543054378,1543140778,'eeb624b1-9647-4184-9684-1a2f2936b3e0'),(46,30,1543054378,1543140778,'e4b8cc73-7979-4931-a349-a4a550f0c1dd'),(47,30,1543054394,1543140794,'3d5b7511-15fd-4d1e-86ef-01fd8755de5e'),(48,30,1543054527,1543140927,'381f3352-845c-4ab0-b2f6-2d610711e784'),(49,30,1543054528,1543140928,'a17e6c7d-a378-4e72-b57a-123f2374c0e7'),(50,30,1543054529,1543140929,'54b89f6a-2176-4a8a-baa8-3ff49dc95dff'),(51,30,1543054532,1543140932,'ea77ccbd-67b0-4a06-99f2-edfd37ce87dd'),(52,30,1543054533,1543140933,'7ed5b320-0e37-4822-bef7-37d6a350bc17'),(53,30,1543054534,1543140934,'edd26f9f-a7a8-4ff2-b059-36eef8af9e06'),(54,30,1543054576,1543140976,'109a8552-b724-4a91-b756-04819c89a7c0'),(55,30,1543054577,1543140977,'6c145a47-c75a-4f06-8182-21e1677d3fa7'),(56,30,1543054578,1543140978,'9281156a-c57e-499e-8a2b-2a4002a8b272'),(57,30,1543054579,1543140979,'82d7c43c-3267-4aa5-a529-0d2a629ecae9'),(58,30,1543054595,1543140995,'0c3b12a3-b962-4b66-8d46-da990f2c11f4'),(59,30,1543054645,1543141045,'845c489b-dda3-4727-810f-08f9d2cf12e7'),(60,30,1543054646,1543141046,'4052edba-1f7e-4205-9213-d137d76d767e'),(61,30,1543054654,1543141054,'ff0acdb8-faeb-4e31-803d-f99f6def091c'),(62,30,1543054656,1543141056,'ed562c92-0da5-4d1b-a76c-313564e96d08'),(63,30,1543054657,1543141057,'9fe56976-6f1c-4d28-8f23-2c03216184ff'),(64,30,1543054663,1543141063,'35c8fc77-9aa9-4af3-9ecb-e0a51bce1b5b'),(65,30,1543054712,1543141112,'40a5ec46-c5bf-4cff-92e4-d1b0a2963fdd'),(66,30,1543054742,1543141142,'ea7fd9ed-2b85-4478-ba91-a1d4428908d0'),(67,30,1543054787,1543141187,'ccab3d7a-ef23-4a75-bdd6-2a0903c5615d'),(68,30,1543054788,1543141188,'1310b14e-76c7-486d-aab3-c9bfc8d11bdb'),(69,30,1543054789,1543141189,'ecb11e78-2293-4c94-883e-c9392b6711b2'),(70,30,1543054789,1543141189,'e1dc7486-7a63-4a04-87c2-3460d30e810a'),(71,30,1543054790,1543141190,'6b26126c-ab58-4df2-a4cd-16a860116866'),(72,30,1543054811,1543141211,'a42499ee-478d-47bb-adc1-05486890ce1b'),(73,30,1543054914,1543141314,'13099b68-388f-40cd-a6c1-f9235a7395bd'),(74,30,1543054917,1543141317,'59af9964-49e8-43a7-9e94-86d309ab6f26'),(75,30,1543054921,1543141321,'26150437-60b8-44eb-96b4-95c0d840ee02'),(76,30,1543054924,1543141324,'94ded620-cf87-4be8-aa5c-5b7449db1358'),(77,30,1543054939,1543141339,'a5bfcd93-591a-4b14-85c6-313714197ca4'),(78,30,1543054940,1543141340,'e27283f3-a102-49c6-9528-9bf26c193bfd'),(79,30,1543054950,1543141350,'3bf016fc-1da9-4fcd-bd26-cfccb470698b'),(80,30,1543054962,1543141362,'87c4145a-6c2a-45fd-9aa8-a6e7ff0f7f06'),(81,30,1543055015,1543141415,'dfec5f8e-9ad4-40d8-85a8-25c647c90bc9'),(82,30,1543055019,1543141419,'3f3bf507-6fd1-4ccd-a0ed-6541567f2a60'),(83,30,1543055042,1543141442,'6c905917-fb06-47af-b2ec-3347e7d4a81b'),(84,30,1543055076,1543141476,'a130b2b6-b241-4191-a2f8-ef1116fedb6c'),(85,30,1543055085,1543141485,'54568492-238b-46ea-bebd-a3759a8a26ed'),(86,30,1543055097,1543141497,'381dda49-1251-4f52-ab59-7cae7876a053'),(87,30,1543055274,1543141674,'4015082b-cde1-4546-a7f2-5096466c0b18'),(88,30,1543055283,1543141683,'e6c1499c-094d-437d-960f-cea8733e161b'),(89,30,1543055286,1543141686,'170cd5fa-a446-43a3-8cda-8b33d1ee3186'),(90,30,1543055288,1543141688,'5104ad5f-bc74-4424-91e8-0cb7dea4209b'),(91,30,1543055329,1543141729,'266fac42-3142-4741-a383-03fce1196081'),(92,30,1543055333,1543141733,'fe37d3f1-deab-47eb-867b-80d91b71ac43'),(95,30,1543055797,1543142197,'004c6f79-2323-4bbc-b1b3-ba5a71ee5248'),(96,30,1543055838,1543142238,'057415d5-8808-4a60-bfaa-5c6e97271e77'),(97,30,1543055982,1543142382,'bc2c6858-c995-47cb-a3f6-4afb18764c81'),(98,30,1543056002,1543142402,'a6d23111-7cec-40d7-a1a0-5e78894a8c10'),(99,30,1543056036,1543142436,'6e9d1698-930c-4f1e-bc0c-ed2dcfef065a'),(100,30,1543056069,1543142469,'55fd2a3b-d516-4620-ac6c-869f6eb9c385'),(101,30,1543056073,1543142473,'905159ad-7a8d-4bad-878c-5b54fb35dd63'),(102,30,1543065773,1543152173,'7933a108-f869-48ff-89f9-a8591efe3845'),(104,9,1543065798,1543152198,'aec0ca9e-9af6-445a-bd0d-930f1f8eef0f'),(105,9,1543065807,1543152207,'31c826e8-33e0-4cd3-9ef1-20a55658c442'),(107,9,1543066533,1543152933,'5e33d4e6-ced3-4e29-b051-58b37e1e950e'),(109,9,1543066930,1543153330,'78084a73-d3da-42f6-ab48-95b926e45b57'),(110,9,1543066988,1543153388,'9cf91b9d-cd06-4adf-9f48-168da397a81b'),(111,9,1543066996,1543153396,'8eab5d98-4075-439a-9554-78269fb3b65d'),(113,9,1543105829,1543192229,'2b268572-c266-41c5-b82d-abc33c47dede'),(114,9,1543110548,1543196948,'5c88ddea-1a70-4dc5-aa1c-2c54167c1dfb');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT NULL,
  `role_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,9,1);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `class` varchar(255) DEFAULT '',
  `username` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `created` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (9,'Toan','18cntt04','tabvn','toan@tabvn.com','$2a$10$9d/0WWv4hfTguaEPb9PkR.LJ1WkhK0snNw/GUn8fWvf8noOY7spYq',1543000576),(13,'fsaf','fdsafa','','toan@tabv.com','$2a$10$xGVM5oaRqKhexmnIZpsVX.R7pbxSWHVuKVLTpW.Py4YOKFga3bOJi',1543002537),(30,'fdasfsaf','fsdafa','fdsafsa','fsafsa@fdasfsaf.com','$2a$10$hJwcABkrGyNfSyqZaYdNBOx/DI1o.zc54TPbs8C40soqZcB8y8WZe',1543002750),(38,'Toan Nguyen Dinh','18cntt04','12f345678','toanf@tabvn.com','$2a$10$CLf1VBQLAMA2dmnTnkdbluOjdJthDfogFkAD13LvI9t0J5u72gcdO',1543022724);
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

-- Dump completed on 2018-11-25 23:39:29
