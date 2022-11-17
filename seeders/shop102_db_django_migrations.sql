-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shop102_db
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2022-11-02 19:13:56.973838'),(2,'auth','0001_initial','2022-11-02 19:13:59.850011'),(3,'admin','0001_initial','2022-11-02 19:14:00.512298'),(4,'admin','0002_logentry_remove_auto_add','2022-11-02 19:14:00.568565'),(5,'admin','0003_logentry_add_action_flag_choices','2022-11-02 19:14:00.617357'),(6,'contenttypes','0002_remove_content_type_name','2022-11-02 19:14:01.080692'),(7,'auth','0002_alter_permission_name_max_length','2022-11-02 19:14:01.380532'),(8,'auth','0003_alter_user_email_max_length','2022-11-02 19:14:01.748636'),(9,'auth','0004_alter_user_username_opts','2022-11-02 19:14:01.808370'),(10,'auth','0005_alter_user_last_login_null','2022-11-02 19:14:02.074482'),(11,'auth','0006_require_contenttypes_0002','2022-11-02 19:14:02.109933'),(12,'auth','0007_alter_validators_add_error_messages','2022-11-02 19:14:02.145169'),(13,'auth','0008_alter_user_username_max_length','2022-11-02 19:14:02.413516'),(14,'auth','0009_alter_user_last_name_max_length','2022-11-02 19:14:02.702666'),(15,'auth','0010_alter_group_name_max_length','2022-11-02 19:14:02.995831'),(16,'auth','0011_update_proxy_permissions','2022-11-02 19:14:03.049150'),(17,'auth','0012_alter_user_first_name_max_length','2022-11-02 19:14:03.506265'),(18,'l5','0001_initial','2022-11-02 19:14:08.000768'),(19,'sessions','0001_initial','2022-11-02 19:14:08.292621'),(20,'l5','0002_remove_purchase_bought','2022-11-02 19:29:50.213480'),(21,'l5','0003_alter_bag_idclient','2022-11-02 19:34:12.200260'),(22,'l5','0004_remove_purchase_date_bag_date','2022-11-02 19:46:46.060459'),(23,'l5','0005_client_current_bag_alter_bag_sum','2022-11-03 11:52:02.329000'),(24,'l5','0006_alter_bag_sum','2022-11-03 13:48:55.547864'),(25,'l5','0007_alter_bag_sum','2022-11-03 13:51:04.983596'),(26,'l5','0008_alter_bag_sum','2022-11-03 13:53:46.918592');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-03 21:53:47
