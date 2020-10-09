/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : exapp

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2020-09-28 08:42:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cate
-- ----------------------------
DROP TABLE IF EXISTS `cate`;
CREATE TABLE `cate` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cate
-- ----------------------------
INSERT INTO `cate` VALUES ('1', 'phone', '0', '2020-05-15 23:30:13');
INSERT INTO `cate` VALUES ('2', 'tv', '1', '2020-05-16 23:34:06');

-- ----------------------------
-- Table structure for collect
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `collect_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collect
-- ----------------------------
INSERT INTO `collect` VALUES ('3', '斗罗大陆', 'http://img.qiqint.la/27/27755/27755s.jpg', 'pbdhttp://www.qiqint.la/27755/6423469.html', '18');
INSERT INTO `collect` VALUES ('18', '都市之太古分身', 'https://www.x23qb.com/files/article/image/74/74409/74409s.jpg', 'qbxshttps://www.x23qb.com/book/74409/', '17');
INSERT INTO `collect` VALUES ('66', '这该死的修罗场！', 'https://www.x33xs.com/image/367/367098/367098s.jpg', '/33xs/367/367098/', '17');
INSERT INTO `collect` VALUES ('68', 'BOSS级打脸专业户[快穿]', 'https://www.x23qb.com/files/article/image/15/15724/15724s.jpg', 'qbxshttps://www.x23qb.com/book/15724/', '17');
INSERT INTO `collect` VALUES ('70', '剑道第一仙', 'https://www.xsbiquge.com/cover/93/93518/93518s.jpg', 'xbqdhttps://www.xsbiquge.com/93_93518/', '17');
INSERT INTO `collect` VALUES ('71', '我的三界红包群', 'https://www.x23qb.com/files/article/images/nocover.jpg', 'qbxshttps://www.x23qb.com/book/173518/', '17');
INSERT INTO `collect` VALUES ('72', '斗罗大陆3龙王传说', 'https://www.x23qb.com/files/article/image/11/11293/11293s.jpg', 'qbxshttps://www.x23qb.com/book/11293/', '17');
INSERT INTO `collect` VALUES ('73', '元龙', 'https://www.xsbiquge.com/cover/77/77766/77766s.jpg', 'xbqdhttps://www.xsbiquge.com/77_77766/', '17');
INSERT INTO `collect` VALUES ('74', '诱妻入怀：帝少心尖宠', 'https://www.x23qb.com/files/article/image/132/132520/132520s.jpg', 'qbxshttps://www.x23qb.com/book/132520/', '17');
INSERT INTO `collect` VALUES ('76', '寒鸦', 'https://www.x33xs.com/image/355/355900/355900s.jpg', '/33xs/355/355900/', '17');
INSERT INTO `collect` VALUES ('84', '全能高手', 'https://img.manhua.weibo.com/cover/2020/03/11/6321900172_COI0qKky_b.jpg', 'wbmh72440', '17');
INSERT INTO `collect` VALUES ('90', '逆天狂妃', 'https://www.x33xs.com/image/265/265307/265307s.jpg', '/33xs/265/265307/', '28');
INSERT INTO `collect` VALUES ('92', '寒鸦', 'https://www.x33xs.com/image/355/355900/355900s.jpg', '/33xs/355/355900/', '29');

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `follow_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of follow
-- ----------------------------
INSERT INTO `follow` VALUES ('1', '4', '5', '1600157157664');
INSERT INTO `follow` VALUES ('2', '5', '4', '1600157058762');

-- ----------------------------
-- Table structure for history
-- ----------------------------
DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num_title` varchar(255) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `book_name` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `createtime` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of history
-- ----------------------------
INSERT INTO `history` VALUES ('3', '第二章 圣魂村2', '312423', '13245', '斗罗大陆', '19', '1600271813202');
INSERT INTO `history` VALUES ('41', '3.影后的霸气粉丝（3）', 'https://www.x23qb.com/files/article/image/15/15724/15724s.jpg', 'qbxs/book/15724/12224612.html', 'BOSS级打脸专业户[快穿]', '17', '1600956345424');
INSERT INTO `history` VALUES ('43', '第七章 异变', 'https://www.x23qb.com/files/article/image/34/34235/34235s.jpg', 'qbxs/book/34235/23342765.html', '圣墟（圣虚）', '17', '1600959116074');
INSERT INTO `history` VALUES ('45', '第1900章 鸡犬不留', 'https://www.zwdu.com/files/article/image/31/31331/31331s.jpg', 'byzw/book/31331/14930060.html', '武神主宰（武神归来）', '17', '1600960312073');
INSERT INTO `history` VALUES ('47', '第一百一十二章 苏奕的不满', 'https://www.xsbiquge.com/cover/93/93518/93518s.jpg', 'xbqd/93_93518/476441.html', '剑道第一仙', '17', '1600998966393');
INSERT INTO `history` VALUES ('48', '第六章 走一个', 'https://www.xsbiquge.com/cover/0/807/807s.jpg', 'xbqd/0_807/4055532.html', '雪中悍刀行', '17', '1600999165180');
INSERT INTO `history` VALUES ('50', '第九百五十三章 加入近战', 'https://www.xsbiquge.com/cover/9/9647/9647s.jpg', 'xbqd/9_9647/9109490.html', '斗罗大陆3龙王传说（龙王传说）', '17', '1601000970150');
INSERT INTO `history` VALUES ('51', '第2章:她只是心疼他', 'https://www.x23qb.com/files/article/image/132/132520/132520s.jpg', 'qbxs/book/132520/54219889.html', '诱妻入怀：帝少心尖宠', '17', '1601011918306');
INSERT INTO `history` VALUES ('52', '第二章生死一线', 'https://www.x23qb.com/files/article/image/74/74409/74409s.jpg', 'qbxs/book/74409/39197765.html', '都市之太古分身', '17', '1601019877824');
INSERT INTO `history` VALUES ('53', '第10章 倾妃，皇上有请', 'https://www.x23qb.com/files/article/image/180/180924/180924s.jpg', 'qbxs/book/180924/67539212.html', '锦鲤弃妃要翻身', '17', '1601091330685');
INSERT INTO `history` VALUES ('56', '\n第十五章  姐好看吗？\n', 'https://www.xsbiquge.com/cover/96/96270/96270s.jpg', 'xbqd/96_96270/61417.html', '逍遥种植大户', '17', '1601092888191');
INSERT INTO `history` VALUES ('57', ' 第5章 Chapter 05 ', 'https://www.x33xs.com/image/355/355900/355900s.jpg', '/33xs/355/355900/43719307.html', '寒鸦', '17', '1601176239092');
INSERT INTO `history` VALUES ('58', '第一章 风之翼', 'https://www.zwdu.com/files/article/image/7/7604/7604s.jpg', 'byzw/book/7604/45174.html', '独裁之剑', '17', '1601187558480');
INSERT INTO `history` VALUES ('59', '第44章 再次进步', 'https://www.zwdu.com/files/article/image/7/7558/7558s.jpg', 'byzw/book/7558/2380.html', '官家', '17', '1601187604904');
INSERT INTO `history` VALUES ('62', '第5章 秘密 文字', 'https://www.xsbiquge.com/cover/9/9326/9326s.jpg', 'xbqd/9_9326/1795065.html', '我的盗墓生涯', '17', '1601187705992');
INSERT INTO `history` VALUES ('63', '第5章 苏照月', 'https://www.xsbiquge.com/cover/17/17618/17618s.jpg', 'qbxs/book/191814/74587794.html', '我有百万亿主角光环', '17', '1601187777255');
INSERT INTO `history` VALUES ('64', '江湖篇之一', 'https://www.zwdu.com/files/article/image/13/13707/13707s.jpg', 'byzw/book/13707/3392832.html', '快穿之无限穿越', '17', '1601187913543');
INSERT INTO `history` VALUES ('66', '第六百二十二章 大结局（四）', 'https://www.zwdu.com/files/article/image/22/22966/22966s.jpg', 'byzw/book/22966/6877320.html', '斗罗大陆II绝世唐门', '17', '1601187956143');
INSERT INTO `history` VALUES ('67', '第三章 旧剑还在 是否锋利', 'https://www.xsbiquge.com/cover/2/2251/2251s.jpg', 'xbqd/2_2251/1529219.html', '神剑永恒', '17', '1601187985790');
INSERT INTO `history` VALUES ('68', '第2章 觉醒武魂', 'https://www.zwdu.com/files/article/image/33/33717/33717s.jpg', 'byzw/book/33717/13456554.html', '斗罗大陆之青莲剑仙', '17', '1601188034863');
INSERT INTO `history` VALUES ('69', '修真女配逆袭记六', 'https://www.zwdu.com/files/article/image/16/16044/16044s.jpg', 'byzw/book/16044/4133930.html', '快穿之炮灰带你飞', '17', '1601188078263');
INSERT INTO `history` VALUES ('70', '第3章 三杀', 'http://img.qiqint.la/114/114704/114704s.jpg', 'pbdhttp://www.qiqint.la/114704/37348799.html', '开局一血', '17', '1601188378110');
INSERT INTO `history` VALUES ('72', '第四章 废材降世？', 'http://img.qiqint.la/36/36081/36081s.jpg', 'pbdhttp://www.qiqint.la/36081/10520651.html', '问鼎巅峰', '17', '1601188562198');
INSERT INTO `history` VALUES ('74', '第4章 圣级灵兽', 'https://www.x23qb.com/files/article/image/179/179313/179313s.jpg', 'qbxs/book/179313/66754890.html', '史上最狂老祖', '17', '1601189934008');
INSERT INTO `history` VALUES ('75', '第五章 倾眸到来', 'https://www.x23qb.com/files/article/image/197/197695/197695s.jpg', 'qbxs/book/197695/77754948.html', '武映三千道', '17', '1601189950861');
INSERT INTO `history` VALUES ('81', '完本感言', 'https://www.x23qb.com/files/article/image/7/7565/7565s.jpg', 'qbxs/book/7565/15516951.html', '古玩大亨', '17', '1601191367313');
INSERT INTO `history` VALUES ('86', '章一 绯色之夜', null, 'xbqd/1_1797/1159432.html', '永夜君王', '27', '1601193987560');
INSERT INTO `history` VALUES ('88', '完本感言', 'https://www.x23qb.com/files/article/image/7/7565/7565s.jpg', 'qbxs/book/7565/15516951.html', '古玩大亨', '27', '1601194666998');
INSERT INTO `history` VALUES ('90', '第五章 胡乱熬药', 'https://www.x23qb.com/files/article/image/13/13889/13889s.jpg', 'qbxs/book/13889/10635199.html', '龙破九天诀', '17', '1601197112848');
INSERT INTO `history` VALUES ('91', '第三章 针灸', 'https://www.zwdu.com/files/article/image/7/7604/7604s.jpg', 'byzw/book/7604/45176.html', '独裁之剑', '29', '1601206563083');
INSERT INTO `history` VALUES ('92', '第12章 炼制', 'https://www.zwdu.com/files/article/image/31/31331/31331s.jpg', 'byzw/book/31331/11914501.html', '武神主宰（武神归来）', '29', '1601206645217');
INSERT INTO `history` VALUES ('93', '第五章 天下第一美人', 'https://www.xsbiquge.com/cover/0/807/807s.jpg', 'xbqd/0_807/4055531.html', '雪中悍刀行', '29', '1601206712564');

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `create_time` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of image
-- ----------------------------
INSERT INTO `image` VALUES ('1', 'http://localhost:3000/uploads/Snipaste_2020-09-15_15-27-27.png', '5', '1600155438582');

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `path` varchar(255) DEFAULT NULL,
  `isopen` tinyint(4) DEFAULT '0',
  `create_time` bigint(20) DEFAULT NULL,
  `postimg` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES ('1', '1', '测试标题', 'http://localhost:3000/uploads/apple.png', '测试路径', '0', '1590243835593', 'http://localhost:3000/uploads/apple.png');
INSERT INTO `post` VALUES ('2', '4', '发生的', 'http://localhost:3000/uploads/Snipaste_2020-09-15_15-27-27.png', '埃及', '0', '1600156859036', 'http://localhost:3000/uploads/Snipaste_2020-09-15_15-27-27.png');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `userpic` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `email` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `status` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `create_time` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('13', '13063206327', 'http://himg.bdimg.com/sys/portrait/item/95fde99d96e584bf32303036c700.jpg', '12345678', '13063206328', null, '0', '1600174736625');
INSERT INTO `user` VALUES ('17', '13063206326', 'http://himg.bdimg.com/sys/portrait/item/95fde99d96e584bf32303036c700.jpg', '123456', '13063206326', null, '1', '1600176258309');
INSERT INTO `user` VALUES ('18', '13856393280', 'http://himg.bdimg.com/sys/portrait/item/95fde99d96e584bf32303036c700.jpg', '1234', '13856393280', null, '0', '1600179558214');
INSERT INTO `user` VALUES ('19', '1306320632', 'http://himg.bdimg.com/sys/portrait/item/95fde99d96e584bf32303036c700.jpg', '12345678', '13063206321', null, '0', '1600266507507');
INSERT INTO `user` VALUES ('20', '13063206311', 'http://himg.bdimg.com/sys/portrait/item/95fde99d96e584bf32303036c700.jpg', '12345678', '13063206311', null, '0', '1600272857800');
INSERT INTO `user` VALUES ('21', '13063206312', 'http://himg.bdimg.com/sys/portrait/item/95fde99d96e584bf32303036c700.jpg', '123', '13063206312', null, '0', '1600308312960');
INSERT INTO `user` VALUES ('22', '13063206322', 'http://himg.bdimg.com/sys/portrait/item/95fde99d96e584bf32303036c700.jpg', '123456', '13063206322', null, '0', '1601027888878');
INSERT INTO `user` VALUES ('24', '13063206329', 'http://himg.bdimg.com/sys/portrait/item/95fde99d96e584bf32303036c700.jpg', '123456', '13063206329', null, '0', '1601031031420');
INSERT INTO `user` VALUES ('25', '15956940898', 'http://himg.bdimg.com/sys/portrait/item/95fde99d96e584bf32303036c700.jpg', '123456', '15956940898', null, '0', '1601192529122');
INSERT INTO `user` VALUES ('27', '13043624940', 'http://himg.bdimg.com/sys/portrait/item/95fde99d96e584bf32303036c700.jpg', '123456', '13043624940', null, '0', '1601192837510');
INSERT INTO `user` VALUES ('28', '13195695667', 'http://himg.bdimg.com/sys/portrait/item/95fde99d96e584bf32303036c700.jpg', '123456', '13195695667', null, '0', '1601196852153');
INSERT INTO `user` VALUES ('29', '13856393289', 'http://himg.bdimg.com/sys/portrait/item/95fde99d96e584bf32303036c700.jpg', '123456', '13856393289', null, '0', '1601204749403');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `job` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `userinfo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('4', '17', '18', '2', '未设置', null, null);
INSERT INTO `userinfo` VALUES ('5', '18', '18', '2', '未设置', null, null);
INSERT INTO `userinfo` VALUES ('6', '19', '18', '2', '未设置', null, null);
INSERT INTO `userinfo` VALUES ('7', '20', '18', '2', '未设置', null, null);
INSERT INTO `userinfo` VALUES ('8', '21', '18', '2', '未设置', null, null);
INSERT INTO `userinfo` VALUES ('9', '22', '18', '2', '未设置', null, null);
INSERT INTO `userinfo` VALUES ('11', '24', '18', '2', '未设置', null, null);
INSERT INTO `userinfo` VALUES ('12', '25', '18', '2', '未设置', null, null);
INSERT INTO `userinfo` VALUES ('13', '27', '18', '2', '未设置', null, null);
INSERT INTO `userinfo` VALUES ('14', '28', '18', '2', '未设置', null, null);
INSERT INTO `userinfo` VALUES ('15', '29', '18', '2', '未设置', null, null);
