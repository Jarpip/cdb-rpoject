-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.18-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db_master
CREATE DATABASE IF NOT EXISTS `db_master` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `db_master`;

-- Dumping structure for table db_master.tb_event_log
CREATE TABLE IF NOT EXISTS `tb_event_log` (
  `event_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_type` varchar(50) DEFAULT NULL,
  `event_sub_type` varchar(50) DEFAULT NULL,
  `data_id` int(11) DEFAULT NULL,
  `user_login` varchar(50) DEFAULT NULL,
  `person_name` varchar(250) DEFAULT NULL,
  `position_name` varchar(250) DEFAULT NULL,
  `office_name` varchar(250) DEFAULT NULL,
  `remark` varchar(500) DEFAULT NULL,
  `event_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`event_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8;

-- Dumping data for table db_master.tb_event_log: ~88 rows (approximately)
/*!40000 ALTER TABLE `tb_event_log` DISABLE KEYS */;
INSERT INTO `tb_event_log` (`event_log_id`, `event_type`, `event_sub_type`, `data_id`, `user_login`, `person_name`, `position_name`, `office_name`, `remark`, `event_date`) VALUES
	(2, 'LOGOUT', '', NULL, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 09:19:46'),
	(3, 'LOGIN', '', NULL, 'user1', 'user1', 'position1', 'office1', '', '2022-11-14 09:20:09'),
	(4, 'LOGOUT', '', NULL, 'user1', 'user1', 'position1', 'office1', '', '2022-11-14 09:22:54'),
	(5, 'LOGIN', '', NULL, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 09:23:09'),
	(6, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลวันหยุด', '2022-11-14 09:28:49'),
	(7, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลโครงการ', '2022-11-14 09:28:58'),
	(8, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลระบบ', '2022-11-14 09:29:10'),
	(9, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลวันหยุด', '2022-11-14 09:29:11'),
	(10, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลหน่วยงาน', '2022-11-14 09:29:11'),
	(11, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลตำแหน่งงาน', '2022-11-14 09:29:12'),
	(12, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลโครงการ', '2022-11-14 09:30:26'),
	(13, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลระบบ', '2022-11-14 09:36:40'),
	(14, 'SYSTEM', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'แก้ไขระบบ', '2022-11-14 09:38:41'),
	(15, 'SYSTEM', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'เพิ่มระบบ', '2022-11-14 09:40:08'),
	(16, 'SYSTEM', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'แก้ไขระบบ', '2022-11-14 09:44:59'),
	(17, 'SYSTEM', 'EDIT', 41, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 09:45:10'),
	(19, 'SYSTEM', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'แก้ไขระบบ', '2022-11-14 09:46:30'),
	(20, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลระบบ', '2022-11-14 09:46:32'),
	(21, 'SYSTEM', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'แก้ไขระบบ', '2022-11-14 09:46:43'),
	(22, 'SYSTEM', 'EDIT', 41, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 09:46:46'),
	(24, 'SYSTEM', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'เพิ่มระบบ', '2022-11-14 09:49:38'),
	(25, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลระบบ', '2022-11-14 09:49:39'),
	(26, 'SYSTEM', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'แก้ไขระบบ', '2022-11-14 09:49:40'),
	(27, 'SYSTEM', 'EDIT', 41, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 09:49:46'),
	(28, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลระบบ', '2022-11-14 09:49:48'),
	(29, 'SYSTEM', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'เพิ่มระบบ', '2022-11-14 09:50:09'),
	(30, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลระบบ', '2022-11-14 09:50:15'),
	(31, 'SYSTEM', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'เพิ่มระบบ', '2022-11-14 09:50:16'),
	(32, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลระบบ', '2022-11-14 09:50:17'),
	(33, 'SYSTEM', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'แก้ไขระบบ', '2022-11-14 09:50:18'),
	(34, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลระบบ', '2022-11-14 09:55:38'),
	(35, 'SYSTEM', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'เพิ่มระบบ', '2022-11-14 09:55:52'),
	(36, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลระบบ', '2022-11-14 09:56:00'),
	(37, 'SYSTEM', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'แก้ไขระบบ', '2022-11-14 09:56:02'),
	(41, 'SYSTEM PROJECT', 'ADD', 12, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 09:58:13'),
	(43, 'SYSTEM PROJECT', 'EDIT', 8, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 10:00:42'),
	(44, 'SYSTEM', 'EDIT', 43, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 10:01:17'),
	(45, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลระบบ', '2022-11-14 10:01:18'),
	(46, 'SYSTEM', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'แก้ไขระบบ', '2022-11-14 10:02:34'),
	(50, 'SYSTEM PROJECT', 'DELETE', 8, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 10:17:11'),
	(51, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลระบบ', '2022-11-14 10:17:21'),
	(52, 'SYSTEM', 'DELETE', 41, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 10:18:39'),
	(53, 'SYSTEM', 'SEARCH', NULL, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 10:23:25'),
	(54, 'SYSTEM', 'SEARCH', NULL, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 10:23:37'),
	(55, 'SYSTEM', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'แก้ไขระบบ', '2022-11-14 10:25:46'),
	(56, 'SYSTEM', 'EDIT', 43, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 10:25:58'),
	(57, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลหน่วยงาน', '2022-11-14 10:26:07'),
	(58, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลระบบ', '2022-11-14 10:26:15'),
	(59, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลโครงการ', '2022-11-14 10:36:48'),
	(60, 'PROJECT', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'เพิ่มโครงการ', '2022-11-14 10:37:27'),
	(62, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลโครงการ', '2022-11-14 10:38:01'),
	(63, 'PROJECT', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'แก้ไขโครงการ', '2022-11-14 10:45:54'),
	(64, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลโครงการ', '2022-11-14 10:45:56'),
	(65, 'PROJECT', 'DELETE', 8, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 10:45:58'),
	(67, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลโครงการ', '2022-11-14 10:46:14'),
	(68, 'PROJECT', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'เพิ่มโครงการ', '2022-11-14 10:55:27'),
	(69, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลโครงการ', '2022-11-14 10:55:28'),
	(70, 'PROJECT', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'แก้ไขโครงการ', '2022-11-14 10:55:29'),
	(71, 'PROJECT', 'EDIT', 19, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 10:55:44'),
	(72, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลโครงการ', '2022-11-14 10:55:52'),
	(73, 'PROJECT', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'แก้ไขโครงการ', '2022-11-14 10:56:00'),
	(74, 'PROJECT', 'EDIT', 19, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 10:56:03'),
	(75, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลโครงการ', '2022-11-14 10:56:17'),
	(76, 'PROJECT', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'แก้ไขโครงการ', '2022-11-14 10:56:24'),
	(77, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลโครงการ', '2022-11-14 10:56:25'),
	(78, 'PROJECT', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'เพิ่มโครงการ', '2022-11-14 10:59:46'),
	(79, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลโครงการ', '2022-11-14 10:59:47'),
	(80, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลหน่วยงาน', '2022-11-14 11:03:00'),
	(81, 'OFFICE', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'เพิ่มหน่วยงาน', '2022-11-14 11:03:02'),
	(82, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลหน่วยงาน', '2022-11-14 11:03:03'),
	(83, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลตำแหน่งงาน', '2022-11-14 11:03:16'),
	(84, 'POSITION', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'เพิ่มตำแหน่งงาน', '2022-11-14 11:03:17'),
	(85, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลตำแหน่งงาน', '2022-11-14 11:03:18'),
	(86, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลหน่วยงาน', '2022-11-14 11:03:19'),
	(87, 'OFFICE', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'เพิ่มหน่วยงาน', '2022-11-14 11:03:20'),
	(88, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลวันหยุด', '2022-11-14 11:03:21'),
	(89, 'HOLIDAY', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'เพิ่มวันหยุด', '2022-11-14 11:03:22'),
	(90, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลระบบ', '2022-11-14 11:03:23'),
	(91, 'SYSTEM', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'เพิ่มระบบ', '2022-11-14 11:03:24'),
	(92, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลโครงการ', '2022-11-14 11:03:24'),
	(93, 'PROJECT', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'เพิ่มโครงการ', '2022-11-14 11:03:25'),
	(94, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลโครงการ', '2022-11-14 11:03:26'),
	(95, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลระบบ', '2022-11-14 11:57:54'),
	(102, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลหน่วยงาน', '2022-11-14 12:52:41'),
	(103, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลตำแหน่งงาน', '2022-11-14 12:52:42'),
	(104, 'MENU', 'SELECT', NULL, 'admin', 'admin', 'position1', 'office1', 'ข้อมูลวันหยุด', '2022-11-14 12:52:43'),
	(105, 'LOGOUT', '', NULL, 'admin', 'admin', 'position1', 'office1', '', '2022-11-14 12:56:54');
/*!40000 ALTER TABLE `tb_event_log` ENABLE KEYS */;

-- Dumping structure for table db_master.tb_holiday
CREATE TABLE IF NOT EXISTS `tb_holiday` (
  `holiday_id` int(11) NOT NULL AUTO_INCREMENT,
  `holiday_date` date DEFAULT NULL,
  `holiday_name` varchar(150) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`holiday_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- Dumping data for table db_master.tb_holiday: ~5 rows (approximately)
/*!40000 ALTER TABLE `tb_holiday` DISABLE KEYS */;
INSERT INTO `tb_holiday` (`holiday_id`, `holiday_date`, `holiday_name`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES
	(6, '2022-11-22', 'g', '2022-10-19 09:10:37', 'pip', '2022-10-19 10:41:10', 'pip'),
	(8, '2022-10-10', 'วันนี้', '2022-10-19 10:17:53', 'pip', '2022-10-19 10:37:26', 'pip'),
	(9, '2022-02-17', 'พิเศษ', '2022-10-19 10:38:59', 'pip', '2022-11-11 09:41:09', 'pip'),
	(10, '2022-10-19', 'agb', '2022-10-19 14:04:25', 'pip', NULL, ''),
	(11, '2022-10-26', 'bbb', '2022-10-26 08:47:01', 'pip', NULL, '');
/*!40000 ALTER TABLE `tb_holiday` ENABLE KEYS */;

-- Dumping structure for table db_master.tb_menu
CREATE TABLE IF NOT EXISTS `tb_menu` (
  `menu_id` int(11) NOT NULL,
  `menu_name` varchar(250) DEFAULT NULL,
  `parent_menu_id` int(11) DEFAULT NULL,
  `program_code` varchar(50) DEFAULT NULL,
  `order_no` varchar(10) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `icon_name` varchar(45) DEFAULT NULL,
  `active_flag` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table db_master.tb_menu: ~10 rows (approximately)
/*!40000 ALTER TABLE `tb_menu` DISABLE KEYS */;
INSERT INTO `tb_menu` (`menu_id`, `menu_name`, `parent_menu_id`, `program_code`, `order_no`, `level`, `icon_name`, `active_flag`) VALUES
	(100, 'ข้อมูลโครงการ', NULL, 'main/project-search', '1', 1, 'fa-solid fa-file-lines', 'Y'),
	(101, 'ข้อมูลระบบ', NULL, 'main/system-search', '2', 1, 'fa-solid fa-computer', 'Y'),
	(102, 'ข้อมูลวันหยุด', NULL, 'main/holiday-search', '3', 1, 'fa-solid fa-calendar', 'Y'),
	(103, 'ข้อมูลหน่วยงาน', NULL, 'main/office-search', '4', 1, 'fa-solid fa-building', 'Y'),
	(104, 'ข้อมูลตำแหน่งงาน', NULL, 'main/position-search', '5', 1, 'fa-solid fa-couch', 'Y'),
	(200, 'บันทึกโครงการ', 100, 'main/project', NULL, 2, NULL, 'Y'),
	(201, 'บันทึกระบบ', 101, 'main/system', NULL, 2, NULL, 'Y'),
	(202, 'บันทึกวันหยุด', 102, 'main/holiday', NULL, 2, NULL, 'Y'),
	(203, 'บันทึกหน่วยงาน', 103, 'main/office', NULL, 2, NULL, 'Y'),
	(204, 'บันทึกตำแหน่งงาน', 104, 'main/position', NULL, 2, NULL, 'Y');
/*!40000 ALTER TABLE `tb_menu` ENABLE KEYS */;

-- Dumping structure for table db_master.tb_office
CREATE TABLE IF NOT EXISTS `tb_office` (
  `office_id` int(11) NOT NULL AUTO_INCREMENT,
  `office_name` varchar(150) DEFAULT NULL,
  `office_type` varchar(50) DEFAULT NULL,
  `order_no` int(11) DEFAULT NULL,
  `office_color` varchar(10) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`office_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- Dumping data for table db_master.tb_office: ~6 rows (approximately)
/*!40000 ALTER TABLE `tb_office` DISABLE KEYS */;
INSERT INTO `tb_office` (`office_id`, `office_name`, `office_type`, `order_no`, `office_color`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES
	(3, 'aa', 'กรมสรรพสามิต', 1, 'red', '2022-10-25 11:28:14', 'pip', '2022-10-25 13:08:55', 'pip'),
	(5, 'cc', 'บริษัท', 3, 'yellow', '2022-10-25 11:28:28', 'pip', '2022-10-26 09:46:47', 'pip'),
	(9, 'aa', 'กรมสรรพสามิต', 7, 'green', '2022-10-25 13:34:46', 'pip', NULL, ''),
	(13, 'เทส', 'หน่วยงานอื่น', 1, 'green', '2022-10-26 09:10:55', 'pip', NULL, '');
/*!40000 ALTER TABLE `tb_office` ENABLE KEYS */;

-- Dumping structure for table db_master.tb_position
CREATE TABLE IF NOT EXISTS `tb_position` (
  `position_id` int(11) NOT NULL AUTO_INCREMENT,
  `position_name` varchar(150) DEFAULT NULL,
  `office_type` varchar(50) DEFAULT NULL,
  `order_no` int(11) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`position_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- Dumping data for table db_master.tb_position: ~3 rows (approximately)
/*!40000 ALTER TABLE `tb_position` DISABLE KEYS */;
INSERT INTO `tb_position` (`position_id`, `position_name`, `office_type`, `order_no`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES
	(1, 'a1', 'หน่วยงานอื่น', 1, '2022-10-25 16:21:21', 'pip', '2022-10-26 14:31:16', 'pip'),
	(7, 'aa', 'บริษัท', 3, '2022-10-25 16:34:22', 'pip', NULL, ''),
	(8, 'aaa', 'หน่วยงานอื่น', 4, '2022-10-25 16:34:33', 'pip', NULL, '');
/*!40000 ALTER TABLE `tb_position` ENABLE KEYS */;

-- Dumping structure for table db_master.tb_project
CREATE TABLE IF NOT EXISTS `tb_project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_code` varchar(50) DEFAULT NULL,
  `project_name` varchar(500) DEFAULT NULL,
  `contract_no` varchar(20) DEFAULT NULL,
  `contract_date` date DEFAULT NULL,
  `remark` varchar(2500) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- Dumping data for table db_master.tb_project: ~7 rows (approximately)
/*!40000 ALTER TABLE `tb_project` DISABLE KEYS */;
INSERT INTO `tb_project` (`project_id`, `project_code`, `project_name`, `contract_no`, `contract_date`, `remark`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES
	(5, 'test', 'test', 'test', '2022-09-28', 'test', '2022-09-28 13:28:08', 'pip', NULL, ''),
	(12, 'bb', 'bb', 'bb', '2022-10-17', 'bb', '2022-10-17 15:49:47', 'pip', NULL, ''),
	(13, 'cc', 'cc', 'cc', '2022-10-17', 'cc', '2022-10-17 15:49:53', 'pip', NULL, ''),
	(14, 'dd', 'dd', 'dd', '2022-10-17', 'dd', '2022-10-17 15:49:57', 'pip', NULL, ''),
	(19, 'aaa', 'aaa', 'aa', '2022-10-18', 'aa', '2022-10-31 15:45:57', 'pip', '2022-11-14 10:56:03', 'pip'),
	(20, 'r1', 'r1', 'r1', '2022-11-23', 'r1', '2022-11-07 08:46:38', 'pip', NULL, ''),
	(21, 'fgg', 'ffg', 'FGRT', '2022-11-23', '-', '2022-11-14 10:37:52', 'pip', NULL, '');
/*!40000 ALTER TABLE `tb_project` ENABLE KEYS */;

-- Dumping structure for table db_master.tb_role_menu
CREATE TABLE IF NOT EXISTS `tb_role_menu` (
  `role_menu_id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(10) NOT NULL,
  `menu_id` int(11) NOT NULL,
  PRIMARY KEY (`role_menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- Dumping data for table db_master.tb_role_menu: ~18 rows (approximately)
/*!40000 ALTER TABLE `tb_role_menu` DISABLE KEYS */;
INSERT INTO `tb_role_menu` (`role_menu_id`, `role`, `menu_id`) VALUES
	(1, 'USER1', 100),
	(2, 'USER1', 101),
	(6, 'ADMIN', 100),
	(7, 'ADMIN', 101),
	(8, 'ADMIN', 102),
	(9, 'ADMIN', 103),
	(10, 'ADMIN', 104),
	(13, 'ADMIN', 202),
	(14, 'ADMIN', 203),
	(15, 'ADMIN', 204),
	(16, 'USER2', 100),
	(17, 'USER2', 200),
	(18, 'USER2', 201),
	(19, 'USER2', 101),
	(20, 'USER2', 102),
	(21, 'USER2', 103),
	(22, 'ADMIN', 200),
	(23, 'ADMIN', 201);
/*!40000 ALTER TABLE `tb_role_menu` ENABLE KEYS */;

-- Dumping structure for table db_master.tb_system
CREATE TABLE IF NOT EXISTS `tb_system` (
  `system_id` int(11) NOT NULL AUTO_INCREMENT,
  `system_code` varchar(50) DEFAULT NULL,
  `system_name` varchar(250) DEFAULT NULL,
  `remark` varchar(2500) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`system_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

-- Dumping data for table db_master.tb_system: ~5 rows (approximately)
/*!40000 ALTER TABLE `tb_system` DISABLE KEYS */;
INSERT INTO `tb_system` (`system_id`, `system_code`, `system_name`, `remark`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES
	(12, 'AECDB34', 'เทส', 'เทส', '2022-10-17 13:40:26', 'pip', '2022-10-18 11:09:23', 'pip'),
	(19, 'AECDB35', 'เทสดี', 'เทสดี', '2022-10-17 13:41:10', 'pip', '2022-10-18 09:01:41', 'pip'),
	(23, 'AECDB39', 'aa', 'aa', '2022-10-19 08:19:31', 'pip', '2022-11-11 11:02:08', 'pip'),
	(43, 'a2', 'a23', 'a2', '2022-11-07 15:08:13', 'pip', '2022-11-14 10:25:58', 'pip'),
	(44, 'new', 'new', 'new', '2022-11-01 14:49:02', 'pip', '2022-11-01 14:51:09', 'pip');
/*!40000 ALTER TABLE `tb_system` ENABLE KEYS */;

-- Dumping structure for table db_master.tb_system_project
CREATE TABLE IF NOT EXISTS `tb_system_project` (
  `system_project_id` int(11) NOT NULL AUTO_INCREMENT,
  `system_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `create_by` varchar(50) DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `update_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`system_project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;

-- Dumping data for table db_master.tb_system_project: ~5 rows (approximately)
/*!40000 ALTER TABLE `tb_system_project` DISABLE KEYS */;
INSERT INTO `tb_system_project` (`system_project_id`, `system_id`, `project_id`, `create_date`, `create_by`, `update_date`, `update_by`) VALUES
	(56, 19, 12, '2022-10-18 09:01:40', 'pip', NULL, ''),
	(59, 12, 12, '2022-10-18 11:09:22', 'pip', NULL, ''),
	(74, 44, 19, '2022-11-01 14:48:52', 'pip', NULL, ''),
	(76, 44, 13, '2022-11-01 14:48:58', 'pip', NULL, ''),
	(79, 43, 13, '2022-11-07 15:08:12', 'pip', NULL, '');
/*!40000 ALTER TABLE `tb_system_project` ENABLE KEYS */;

-- Dumping structure for table db_master.tb_user
CREATE TABLE IF NOT EXISTS `tb_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `person_name` varchar(250) DEFAULT NULL,
  `position_name` varchar(250) DEFAULT NULL,
  `office_name` varchar(250) DEFAULT NULL,
  `user_role` varchar(10) DEFAULT NULL,
  `active_flag` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table db_master.tb_user: ~4 rows (approximately)
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` (`user_id`, `user_name`, `password`, `person_name`, `position_name`, `office_name`, `user_role`, `active_flag`) VALUES
	(1, 'user1', 'password', 'user1', 'position1', 'office1', 'USER1', 'Y'),
	(2, 'admin', 'password', 'admin', 'position1', 'office1', 'ADMIN', 'Y'),
	(3, 'admin2', 'password', 'admin2', 'position1', 'office1', 'ADMIN', 'N'),
	(4, 'user2', '1234', 'user2', 'position1', 'office1', 'USER2', 'Y');
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
