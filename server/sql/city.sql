-- 导出  表 city 结构
CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `breviary` varchar(255) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `city_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
