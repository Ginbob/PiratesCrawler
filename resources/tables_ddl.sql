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

CREATE TABLE `beste_freiwerfer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `saison` int(11) DEFAULT NULL,
  `team` varchar(50) DEFAULT NULL,
  `liga` varchar(50) DEFAULT NULL,
  `rang` varchar(50) DEFAULT NULL,
  `nachname` varchar(50) DEFAULT NULL,
  `vorname` varchar(50) DEFAULT NULL,
  `mannschaft` varchar(50) DEFAULT NULL,
  `versuche` int(11) DEFAULT NULL,
  `treffer` int(11) DEFAULT NULL,
  `quote` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`saison`,`team`,`liga`,`nachname`,`vorname`,`mannschaft`)
) ENGINE=InnoDB AUTO_INCREMENT=9409 DEFAULT CHARSET=utf8;

CREATE TABLE `beste_dreierwerfer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `saison` int(11) DEFAULT NULL,
  `team` varchar(50) DEFAULT NULL,
  `liga` varchar(50) DEFAULT NULL,
  `rang` varchar(50) DEFAULT NULL,
  `nachname` varchar(50) DEFAULT NULL,
  `vorname` varchar(50) DEFAULT NULL,
  `mannschaft` varchar(50) DEFAULT NULL,
  `dreier` int(11) DEFAULT NULL,
  `spiele` int(11) DEFAULT NULL,
  `durchschnitt` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`saison`,`team`,`liga`,`nachname`,`vorname`,`mannschaft`)
) ENGINE=InnoDB AUTO_INCREMENT=7632 DEFAULT CHARSET=utf8;

CREATE TABLE `tabelle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `saison` int(11) DEFAULT NULL,
  `team` varchar(50) DEFAULT NULL,
  `liga` varchar(50) DEFAULT NULL,
  `rang` varchar(50) DEFAULT NULL,
  `mannschaft` varchar(50) DEFAULT NULL,
  `spiele` int(11) DEFAULT NULL,
  `punkte` varchar(50) DEFAULT NULL,
  `koerbe` varchar(50) DEFAULT NULL,
  `differenz` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`saison`,`team`,`liga`,`mannschaft`)
) ENGINE=InnoDB AUTO_INCREMENT=5469 DEFAULT CHARSET=utf8;

CREATE TABLE `ergebnisse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `saison` int(11) DEFAULT NULL,
  `team` varchar(50) DEFAULT NULL,
  `liga` varchar(50) DEFAULT NULL,
  `spieltag` int(11) DEFAULT NULL,
  `nummer` int(11) DEFAULT NULL,
  `datum` varchar(50) DEFAULT NULL,
  `heim` varchar(50) DEFAULT NULL,
  `gast` varchar(50) DEFAULT NULL,
  `endstand` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`saison`,`team`,`liga`,`spieltag`,`nummer`,`datum`,`heim`,`gast`,`endstand`)
) ENGINE=InnoDB AUTO_INCREMENT=7767 DEFAULT CHARSET=utf8;