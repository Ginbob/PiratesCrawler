CREATE TABLE `beste_werfer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `saison` int(11) DEFAULT NULL,
  `team` varchar(50) DEFAULT NULL,
  `liga` varchar(50) DEFAULT NULL,
  `rang` varchar(50) DEFAULT NULL,
  `nachname` varchar(50) DEFAULT NULL,
  `vorname` varchar(50) DEFAULT NULL,
  `mannschaft` varchar(50) DEFAULT NULL,
  `punkte` int(11) DEFAULT NULL,
  `spiele` int(11) DEFAULT NULL,
  `durchschnitt` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`saison`,`team`,`liga`,`nachname`,`vorname`,`mannschaft`)
) ENGINE=InnoDB AUTO_INCREMENT=17132 DEFAULT CHARSET=utf8;