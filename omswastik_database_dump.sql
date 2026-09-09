-- OM SWASTIK BUILDHOMES — COMPLETE PRODUCTION MYSQL DATABASE DUMP
-- Target Database: omswasti1_omswastik_main
-- Generated: 2026-09-09T10:01:48.706Z

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+05:30";

DROP TABLE IF EXISTS `ActivityLog`;
DROP TABLE IF EXISTS `LocationAdvantage`;
DROP TABLE IF EXISTS `Amenity`;
DROP TABLE IF EXISTS `Faq`;
DROP TABLE IF EXISTS `Testimonial`;
DROP TABLE IF EXISTS `BlogPost`;
DROP TABLE IF EXISTS `Booking`;
DROP TABLE IF EXISTS `Customer`;
DROP TABLE IF EXISTS `SiteVisit`;
DROP TABLE IF EXISTS `FollowUp`;
DROP TABLE IF EXISTS `Lead`;
DROP TABLE IF EXISTS `Plot`;
DROP TABLE IF EXISTS `Project`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `ContactSetting`;

-- =============================================
-- TABLE SCHEMAS
-- =============================================

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'SALES_EXECUTIVE',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `avatar` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_role_idx`(`role`),
    INDEX `User_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `projectType` VARCHAR(191) NOT NULL DEFAULT 'PLOTTED_DEVELOPMENT',
    `location` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL DEFAULT 'Gujarat',
    `fullAddress` VARCHAR(191) NULL,
    `description` TEXT NOT NULL,
    `highlights` TEXT NULL,
    `totalProjectArea` VARCHAR(191) NULL,
    `totalPlots` INTEGER NOT NULL DEFAULT 0,
    `amenitiesList` TEXT NULL,
    `nearbyLandmarks` TEXT NULL,
    `connectivity` TEXT NULL,
    `googleMapUrl` TEXT NULL,
    `heroImage` VARCHAR(191) NULL,
    `videoUrl` TEXT NULL,
    `brochureUrl` TEXT NULL,
    `siteLayoutImage` TEXT NULL,
    `reraNumber` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE',
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Project_slug_key`(`slug`),
    INDEX `Project_status_idx`(`status`),
    INDEX `Project_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plot` (
    `id` VARCHAR(191) NOT NULL,
    `plotNumber` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `sizeSqYd` DOUBLE NOT NULL,
    `sizeSqFt` DOUBLE NOT NULL,
    `lengthFt` DOUBLE NULL,
    `widthFt` DOUBLE NULL,
    `facing` VARCHAR(191) NOT NULL DEFAULT 'EAST',
    `roadWidthFt` DOUBLE NOT NULL DEFAULT 30,
    `isCorner` BOOLEAN NOT NULL DEFAULT false,
    `isParkFacing` BOOLEAN NOT NULL DEFAULT false,
    `isMainRoadFacing` BOOLEAN NOT NULL DEFAULT false,
    `priceTotal` DOUBLE NOT NULL,
    `pricePerUnit` DOUBLE NOT NULL,
    `bookingAmount` DOUBLE NOT NULL DEFAULT 51000,
    `status` VARCHAR(191) NOT NULL DEFAULT 'AVAILABLE',
    `holdUntil` DATETIME(3) NULL,
    `remarks` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Plot_projectId_status_idx`(`projectId`, `status`),
    INDEX `Plot_status_idx`(`status`),
    UNIQUE INDEX `Plot_projectId_plotNumber_key`(`projectId`, `plotNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lead` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `interestedProjectId` VARCHAR(191) NULL,
    `interestedPlotId` VARCHAR(191) NULL,
    `budget` VARCHAR(191) NULL,
    `preferredSize` VARCHAR(191) NULL,
    `locationPreference` VARCHAR(191) NULL,
    `requirement` TEXT NULL,
    `leadSource` VARCHAR(191) NOT NULL DEFAULT 'WEBSITE',
    `assignedUserId` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'NEW',
    `remarks` TEXT NULL,
    `nextFollowUpDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Lead_status_idx`(`status`),
    INDEX `Lead_assignedUserId_idx`(`assignedUserId`),
    INDEX `Lead_interestedProjectId_idx`(`interestedProjectId`),
    INDEX `Lead_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FollowUp` (
    `id` VARCHAR(191) NOT NULL,
    `leadId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `scheduledAt` DATETIME(3) NULL,
    `completedAt` DATETIME(3) NULL,
    `callStatus` VARCHAR(191) NULL,
    `remarks` TEXT NOT NULL,
    `customerRequirement` TEXT NULL,
    `nextAction` VARCHAR(191) NULL,
    `nextFollowUpDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `FollowUp_leadId_idx`(`leadId`),
    INDEX `FollowUp_userId_idx`(`userId`),
    INDEX `FollowUp_scheduledAt_idx`(`scheduledAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteVisit` (
    `id` VARCHAR(191) NOT NULL,
    `leadId` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `plotId` VARCHAR(191) NULL,
    `assignedUserId` VARCHAR(191) NULL,
    `visitDate` DATETIME(3) NOT NULL,
    `visitTime` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'SCHEDULED',
    `remarks` TEXT NULL,
    `postVisitRemarks` TEXT NULL,
    `feedback` TEXT NULL,
    `nextAction` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `SiteVisit_leadId_idx`(`leadId`),
    INDEX `SiteVisit_projectId_idx`(`projectId`),
    INDEX `SiteVisit_assignedUserId_idx`(`assignedUserId`),
    INDEX `SiteVisit_visitDate_idx`(`visitDate`),
    INDEX `SiteVisit_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `panNumber` VARCHAR(191) NULL,
    `aadharNumber` VARCHAR(191) NULL,
    `fullAddress` TEXT NULL,
    `city` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `convertedFromLeadId` VARCHAR(191) NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Customer_convertedFromLeadId_key`(`convertedFromLeadId`),
    INDEX `Customer_phone_idx`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` VARCHAR(191) NOT NULL,
    `bookingNumber` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `plotId` VARCHAR(191) NOT NULL,
    `salesUserId` VARCHAR(191) NULL,
    `bookingDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `bookingAmount` DOUBLE NOT NULL,
    `totalPropertyValue` DOUBLE NOT NULL,
    `paymentMode` VARCHAR(191) NOT NULL DEFAULT 'CHEQUE',
    `paymentReference` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'BOOKING_INITIATED',
    `remarks` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Booking_bookingNumber_key`(`bookingNumber`),
    INDEX `Booking_customerId_idx`(`customerId`),
    INDEX `Booking_projectId_idx`(`projectId`),
    INDEX `Booking_plotId_idx`(`plotId`),
    INDEX `Booking_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogPost` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `featuredImage` VARCHAR(191) NULL,
    `excerpt` TEXT NOT NULL,
    `content` LONGTEXT NOT NULL,
    `author` VARCHAR(191) NOT NULL DEFAULT 'Om Swastik Research Team',
    `publishedAt` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `seoTitle` VARCHAR(191) NULL,
    `seoDescription` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BlogPost_slug_key`(`slug`),
    INDEX `BlogPost_status_idx`(`status`),
    INDEX `BlogPost_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testimonial` (
    `id` VARCHAR(191) NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NULL,
    `review` TEXT NOT NULL,
    `rating` INTEGER NOT NULL DEFAULT 5,
    `avatarImage` VARCHAR(191) NULL,
    `project` VARCHAR(191) NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Testimonial_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faq` (
    `id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `answer` TEXT NOT NULL,
    `category` VARCHAR(191) NOT NULL DEFAULT 'General',
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Faq_category_idx`(`category`),
    INDEX `Faq_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Amenity` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `icon` VARCHAR(191) NULL,
    `projectId` VARCHAR(191) NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    INDEX `Amenity_projectId_idx`(`projectId`),
    INDEX `Amenity_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LocationAdvantage` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `category` VARCHAR(191) NOT NULL DEFAULT 'Connectivity',
    `distanceTime` VARCHAR(191) NULL,
    `icon` VARCHAR(191) NULL,
    `projectId` VARCHAR(191) NULL,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,

    INDEX `LocationAdvantage_projectId_idx`(`projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactSetting` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'default',
    `companyName` VARCHAR(191) NOT NULL DEFAULT 'Om Swastik Buildhomes Pvt. Ltd.',
    `tagline` VARCHAR(191) NOT NULL DEFAULT 'Building Trust. Creating Spaces.',
    `cin` VARCHAR(191) NOT NULL DEFAULT 'U41000UW2026PTC256814',
    `officeAddress` TEXT NOT NULL DEFAULT 'Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, U.P. 201318',
    `primaryPhone` VARCHAR(191) NOT NULL DEFAULT '+919599213531',
    `secondaryPhone` VARCHAR(191) NULL DEFAULT '+919810484742',
    `altPhone` VARCHAR(191) NULL DEFAULT '+919990842233',
    `primaryEmail` VARCHAR(191) NOT NULL DEFAULT 'rahulbisht@omswastikbuildhomes.com',
    `altEmail` VARCHAR(191) NULL DEFAULT 'rahulbisht0802@gmail.com',
    `whatsappNumber` VARCHAR(191) NOT NULL DEFAULT '919599213531',
    `googleMapEmbed` TEXT NULL,
    `facebookUrl` VARCHAR(191) NULL,
    `instagramUrl` VARCHAR(191) NULL,
    `linkedinUrl` VARCHAR(191) NULL,
    `youtubeUrl` VARCHAR(191) NULL,
    `twitterUrl` VARCHAR(191) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivityLog` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `action` VARCHAR(191) NOT NULL,
    `entityType` VARCHAR(191) NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,
    `leadId` VARCHAR(191) NULL,
    `previousValue` VARCHAR(191) NULL,
    `newValue` VARCHAR(191) NULL,
    `details` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ActivityLog_entityType_entityId_idx`(`entityType`, `entityId`),
    INDEX `ActivityLog_userId_idx`(`userId`),
    INDEX `ActivityLog_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Plot` ADD CONSTRAINT `Plot_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lead` ADD CONSTRAINT `Lead_interestedProjectId_fkey` FOREIGN KEY (`interestedProjectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lead` ADD CONSTRAINT `Lead_interestedPlotId_fkey` FOREIGN KEY (`interestedPlotId`) REFERENCES `Plot`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lead` ADD CONSTRAINT `Lead_assignedUserId_fkey` FOREIGN KEY (`assignedUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FollowUp` ADD CONSTRAINT `FollowUp_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FollowUp` ADD CONSTRAINT `FollowUp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SiteVisit` ADD CONSTRAINT `SiteVisit_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SiteVisit` ADD CONSTRAINT `SiteVisit_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SiteVisit` ADD CONSTRAINT `SiteVisit_plotId_fkey` FOREIGN KEY (`plotId`) REFERENCES `Plot`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SiteVisit` ADD CONSTRAINT `SiteVisit_assignedUserId_fkey` FOREIGN KEY (`assignedUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_convertedFromLeadId_fkey` FOREIGN KEY (`convertedFromLeadId`) REFERENCES `Lead`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_plotId_fkey` FOREIGN KEY (`plotId`) REFERENCES `Plot`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_salesUserId_fkey` FOREIGN KEY (`salesUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Amenity` ADD CONSTRAINT `Amenity_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LocationAdvantage` ADD CONSTRAINT `LocationAdvantage_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;



-- =============================================
-- SEED DATA INSERTION
-- =============================================

-- Dumping data for table `User` (4 rows)
INSERT INTO `User` (`id`, `email`, `passwordHash`, `name`, `phone`, `role`, `isActive`, `avatar`, `createdAt`, `updatedAt`) VALUES ('cmtttzn670000v1e8wkivkf1q', 'admin@omswastikbuildhomes.com', '$2a$10$EAWwUiGXjzdjeVcZbKn2MO6tNKuYm4P1fUbuUEQUIcb.CwCrHzDdO', 'Om Swastik SuperAdmin', '+919599213531', 'SUPER_ADMIN', 1, NULL, '2026-09-09 08:23:08', '2026-09-09 08:23:08');
INSERT INTO `User` (`id`, `email`, `passwordHash`, `name`, `phone`, `role`, `isActive`, `avatar`, `createdAt`, `updatedAt`) VALUES ('cmtttzn6k0001v1e8pvvc21bi', 'rahulbisht@omswastikbuildhomes.com', '$2a$10$EAWwUiGXjzdjeVcZbKn2MO6tNKuYm4P1fUbuUEQUIcb.CwCrHzDdO', 'Rahul Bisht', '+919810484742', 'ADMIN', 1, '/images/qr-rahul.png', '2026-09-09 08:23:08', '2026-09-09 08:23:08');
INSERT INTO `User` (`id`, `email`, `passwordHash`, `name`, `phone`, `role`, `isActive`, `avatar`, `createdAt`, `updatedAt`) VALUES ('cmtttzn6q0002v1e8wz4tyau9', 'prafulsingh@omswastikbuildhomes.com', '$2a$10$EAWwUiGXjzdjeVcZbKn2MO6tNKuYm4P1fUbuUEQUIcb.CwCrHzDdO', 'Praful Singh', '+919599213531', 'SALES_MANAGER', 1, '/images/qr-prafull.png', '2026-09-09 08:23:08', '2026-09-09 08:23:08');
INSERT INTO `User` (`id`, `email`, `passwordHash`, `name`, `phone`, `role`, `isActive`, `avatar`, `createdAt`, `updatedAt`) VALUES ('cmtttzn6y0003v1e8688zgcm9', 'santoshgupta@omswastikbuildhomes.com', '$2a$10$EAWwUiGXjzdjeVcZbKn2MO6tNKuYm4P1fUbuUEQUIcb.CwCrHzDdO', 'Santosh Gupta', '+919990842233', 'SALES_EXECUTIVE', 1, '/images/qr-santosh.png', '2026-09-09 08:23:08', '2026-09-09 08:23:08');

-- Dumping data for table `Project` (1 rows)
INSERT INTO `Project` (`id`, `slug`, `name`, `projectType`, `location`, `city`, `state`, `fullAddress`, `description`, `highlights`, `totalProjectArea`, `totalPlots`, `amenitiesList`, `nearbyLandmarks`, `connectivity`, `googleMapUrl`, `heroImage`, `videoUrl`, `brochureUrl`, `siteLayoutImage`, `reraNumber`, `status`, `displayOrder`, `createdAt`, `updatedAt`) VALUES ('cmtttzn7g0004v1e858pzpnl9', 'riddhi', 'Riddhi Premium Plots', 'PLOTTED_DEVELOPMENT', 'Dholera Special Investment Region (SIR)', 'Dholera', 'Gujarat', 'Near Ahmedabad-Dholera Expressway, Dholera SIR, Gujarat', 'Riddhi is a premium plotted development by Om Swastik Buildhomes Pvt. Ltd., strategically positioned within the growth story of Dholera SIR. Designed for investors and visionaries, Riddhi offers an opportunity to be part of India\'s most ambitious smart city project with world-class planned infrastructure, connectivity to major economic corridors, and a forward-thinking urban ecosystem.', '[\"Prime location in Dholera Special Investment Region (SIR)\",\"Direct access to 250m wide Ahmedabad–Dholera Expressway\",\"Minutes away from planned Dholera International Airport\",\"Part of Delhi–Mumbai Industrial Corridor (DMIC)\",\"Clear title plots with demarcated boundaries and wide internal roads\",\"Underground utilities: electricity, water supply, and drainage planning\",\"Close proximity to 300 MW Solar Park & Global Manufacturing Hubs\"]', '50 Acres Planned Development', 120, '[\"Gated Community with 24x7 Security\",\"Wide Internal Paved Roads (30ft & 40ft)\",\"Underground Water Supply Line\",\"Underground Electrical Cabling\",\"Landscaped Green Parks & Tree Plantation\",\"Street Lighting & SCADA Surveillance\",\"Rainwater Harvesting System\",\"Entry Plaza & Boundary Wall\"]', '[{\"name\":\"Dholera International Airport\",\"distance\":\"15 Mins\"},{\"name\":\"Ahmedabad-Dholera Expressway\",\"distance\":\"5 Mins\"},{\"name\":\"Tata Electronics Semiconductor Fab\",\"distance\":\"10 Mins\"},{\"name\":\"Lothal Maritime Heritage Complex\",\"distance\":\"25 Mins\"},{\"name\":\"300 MW Dholera Solar Park\",\"distance\":\"12 Mins\"}]', '[\"Ahmedabad City Center via Expressway: 45 Minutes\",\"High Speed Bullet Train Station: Planned Regional Hub\",\"Dedicated Freight Corridor (DFC): Direct Logistics Link\",\"Seaport & Coastal Shipping Route: Seamless Maritime Trade\"]', 'https://maps.google.com/?q=Dholera+SIR+Gujarat', '/images/hero-dholera.jpg', NULL, NULL, '/images/riddhi-project.jpg', 'Applicable Registration in Progress', 'ACTIVE', 1, '2026-09-09 08:23:08', '2026-09-09 08:23:08');

-- Dumping data for table `Plot` (24 rows)
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde3r0006v1skhncszqz3', 'A-101', 'cmtttzn7g0004v1e858pzpnl9', 150, 1350, 44, 31, 'EAST', 30, 0, 0, 1, 1125000, 7500, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:49', '2026-09-09 09:01:49');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde4d0008v1sk6u1tgnrl', 'A-102', 'cmtttzn7g0004v1e858pzpnl9', 150, 1350, 44, 31, 'EAST', 30, 0, 0, 1, 1125000, 7500, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:49', '2026-09-09 09:01:49');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde4m000av1skqscyhrdq', 'A-103', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 51, 35, 'NORTH', 40, 1, 1, 0, 1640000, 8200, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:49', '2026-09-09 09:01:49');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde4w000cv1skcutqffto', 'A-104', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 51, 35, 'NORTH', 30, 0, 1, 0, 1560000, 7800, 51000, 'HOLD', NULL, 'Client Token Pending', '2026-09-09 09:01:49', '2026-09-09 09:01:49');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde54000ev1skrjd7aj0u', 'A-105', 'cmtttzn7g0004v1e858pzpnl9', 150, 1350, 44, 31, 'NORTH', 30, 0, 0, 0, 1125000, 7500, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:49', '2026-09-09 09:01:49');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde5d000gv1skk3ahuboy', 'A-106', 'cmtttzn7g0004v1e858pzpnl9', 250, 2250, 57, 40, 'NORTH_EAST', 40, 1, 0, 1, 2125000, 8500, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:49', '2026-09-09 09:01:49');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde5l000iv1sksxlfq23s', 'A-107', 'cmtttzn7g0004v1e858pzpnl9', 150, 1350, 44, 31, 'EAST', 30, 0, 0, 0, 1125000, 7500, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:49', '2026-09-09 09:01:49');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde5s000kv1skl9tvcpqx', 'A-108', 'cmtttzn7g0004v1e858pzpnl9', 150, 1350, 44, 31, 'EAST', 30, 0, 0, 0, 1125000, 7500, 51000, 'BOOKED', NULL, 'Booked by Rajiv Sharma', '2026-09-09 09:01:49', '2026-09-09 09:01:49');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde61000mv1sk4jp7q83l', 'B-201', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 51, 35, 'NORTH', 40, 1, 1, 1, 1760000, 8800, 51000, 'SOLD', NULL, 'Registry Done', '2026-09-09 09:01:49', '2026-09-09 09:01:49');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde69000ov1skiofqszom', 'B-202', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 51, 35, 'NORTH', 30, 0, 1, 0, 1600000, 8000, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:49', '2026-09-09 09:01:49');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde6g000qv1skwfhc0cah', 'B-203', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 51, 35, 'NORTH', 30, 0, 1, 0, 1600000, 8000, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:49', '2026-09-09 09:01:49');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde6o000sv1skp1jodvzu', 'B-204', 'cmtttzn7g0004v1e858pzpnl9', 250, 2250, 57, 40, 'EAST', 30, 0, 0, 0, 1900000, 7600, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:49', '2026-09-09 09:01:49');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde6v000uv1skpiop4ewv', 'B-205', 'cmtttzn7g0004v1e858pzpnl9', 300, 2700, 62, 43, 'EAST', 40, 1, 0, 0, 2460000, 8200, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:49', '2026-09-09 09:01:49');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde74000wv1skz0s84ikp', 'B-206', 'cmtttzn7g0004v1e858pzpnl9', 150, 1350, 44, 31, 'WEST', 30, 0, 0, 0, 1080000, 7200, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:49', '2026-09-09 09:01:49');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde7d000yv1sk3cbarvq9', 'B-207', 'cmtttzn7g0004v1e858pzpnl9', 150, 1350, 44, 31, 'WEST', 30, 0, 0, 0, 1080000, 7200, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:49', '2026-09-09 09:01:49');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde7m0010v1sk2uh9j3ap', 'B-208', 'cmtttzn7g0004v1e858pzpnl9', 180, 1620, 48, 34, 'SOUTH_EAST', 30, 1, 0, 0, 1368000, 7600, 51000, 'HOLD', NULL, NULL, '2026-09-09 09:01:50', '2026-09-09 09:01:50');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde7w0012v1skov6zn5w0', 'C-301', 'cmtttzn7g0004v1e858pzpnl9', 500, 4500, 80, 56, 'NORTH_EAST', 60, 1, 1, 1, 4750000, 9500, 51000, 'BLOCKED', NULL, 'Reserved for Commercial Anchor', '2026-09-09 09:01:50', '2026-09-09 09:01:50');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde850014v1skc5muiojx', 'C-302', 'cmtttzn7g0004v1e858pzpnl9', 300, 2700, 62, 43, 'EAST', 40, 0, 0, 1, 2400000, 8000, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:50', '2026-09-09 09:01:50');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde8e0016v1skdzwao3yl', 'C-303', 'cmtttzn7g0004v1e858pzpnl9', 300, 2700, 62, 43, 'EAST', 40, 0, 0, 1, 2400000, 8000, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:50', '2026-09-09 09:01:50');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde8p0018v1sk8c2q425j', 'C-304', 'cmtttzn7g0004v1e858pzpnl9', 250, 2250, 57, 40, 'NORTH', 30, 0, 0, 0, 1875000, 7500, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:50', '2026-09-09 09:01:50');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde8z001av1skvvvp4i81', 'C-305', 'cmtttzn7g0004v1e858pzpnl9', 250, 2250, 57, 40, 'NORTH', 30, 0, 0, 0, 1875000, 7500, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:50', '2026-09-09 09:01:50');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde99001cv1sk0zljjbbd', 'C-306', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 51, 35, 'WEST', 30, 0, 0, 0, 1460000, 7300, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:50', '2026-09-09 09:01:50');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde9k001ev1skaq9u97u0', 'C-307', 'cmtttzn7g0004v1e858pzpnl9', 150, 1350, 44, 31, 'WEST', 30, 0, 0, 0, 1080000, 7200, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:50', '2026-09-09 09:01:50');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvde9u001gv1skaj65jqpt', 'C-308', 'cmtttzn7g0004v1e858pzpnl9', 150, 1350, 44, 31, 'WEST', 30, 0, 0, 0, 1080000, 7200, 51000, 'AVAILABLE', NULL, NULL, '2026-09-09 09:01:50', '2026-09-09 09:01:50');

-- Dumping data for table `Lead` (2 rows)
INSERT INTO `Lead` (`id`, `name`, `mobile`, `email`, `interestedProjectId`, `interestedPlotId`, `budget`, `preferredSize`, `locationPreference`, `requirement`, `leadSource`, `assignedUserId`, `status`, `remarks`, `nextFollowUpDate`, `createdAt`, `updatedAt`) VALUES ('cmttvdebb001ov1skze447a26', 'Amitabh Verma', '+919811002233', 'amitabh.v@outlook.com', 'cmtttzn7g0004v1e858pzpnl9', NULL, '₹10 - 15 Lakhs', '150 - 200 Sq. Yd.', NULL, NULL, 'WEBSITE', 'cmtttzn6q0002v1e8wz4tyau9', 'FOLLOW_UP', 'Interested in North-facing 200 Sq. Yd. plot for long-term investment', '2026-09-10 09:01:50', '2026-09-09 09:01:50', '2026-09-09 09:01:50');
INSERT INTO `Lead` (`id`, `name`, `mobile`, `email`, `interestedProjectId`, `interestedPlotId`, `budget`, `preferredSize`, `locationPreference`, `requirement`, `leadSource`, `assignedUserId`, `status`, `remarks`, `nextFollowUpDate`, `createdAt`, `updatedAt`) VALUES ('cmttvdebt001sv1skv51gnx2n', 'Sunita Aggarwal', '+919910223344', 'sunita.aggarwal@gmail.com', 'cmtttzn7g0004v1e858pzpnl9', NULL, '₹15 - 20 Lakhs', NULL, NULL, NULL, 'WHATSAPP', 'cmtttzn6y0003v1e8688zgcm9', 'SITE_VISIT_SCHEDULED', 'Confirmed site visit from Noida office', NULL, '2026-09-09 09:01:50', '2026-09-09 09:01:50');

-- Dumping data for table `Customer` (2 rows)
INSERT INTO `Customer` (`id`, `name`, `phone`, `email`, `panNumber`, `aadharNumber`, `fullAddress`, `city`, `state`, `convertedFromLeadId`, `notes`, `createdAt`, `updatedAt`) VALUES ('cmttvdeaa001hv1skqkbelail', 'Rajiv Sharma', '+919871122334', 'rajiv.sharma@gmail.com', 'ABCPS1234F', NULL, 'Sector 15, Rohini, New Delhi 110085', 'Delhi', 'Delhi', NULL, 'Investor interested in Dholera semiconductor expansion', '2026-09-09 09:01:50', '2026-09-09 09:01:50');
INSERT INTO `Customer` (`id`, `name`, `phone`, `email`, `panNumber`, `aadharNumber`, `fullAddress`, `city`, `state`, `convertedFromLeadId`, `notes`, `createdAt`, `updatedAt`) VALUES ('cmttvdear001kv1sk2nysr5tk', 'Vikas Patel', '+919825544332', 'vikas.patel@ahmedabadre.com', 'BNXPP5678K', NULL, 'Satellite Road, Ahmedabad, Gujarat 380015', 'Ahmedabad', 'Gujarat', NULL, 'Registered buyer, full payment cleared', '2026-09-09 09:01:50', '2026-09-09 09:01:50');

-- Dumping data for table `Booking` (2 rows)
INSERT INTO `Booking` (`id`, `bookingNumber`, `customerId`, `projectId`, `plotId`, `salesUserId`, `bookingDate`, `bookingAmount`, `totalPropertyValue`, `paymentMode`, `paymentReference`, `status`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvdeaj001jv1skf81lu2of', 'OSB-2026-001', 'cmttvdeaa001hv1skqkbelail', 'cmtttzn7g0004v1e858pzpnl9', 'cmttvde5s000kv1skl9tvcpqx', 'cmtttzn6y0003v1e8688zgcm9', '2026-09-09 09:01:50', 51000, 1125000, 'NEFT', 'NEFT99881122', 'BOOKED', 'Booking advance received, agreement in drafting', '2026-09-09 09:01:50', '2026-09-09 09:01:50');
INSERT INTO `Booking` (`id`, `bookingNumber`, `customerId`, `projectId`, `plotId`, `salesUserId`, `bookingDate`, `bookingAmount`, `totalPropertyValue`, `paymentMode`, `paymentReference`, `status`, `remarks`, `createdAt`, `updatedAt`) VALUES ('cmttvdeaz001mv1skke5mdho6', 'OSB-2026-002', 'cmttvdear001kv1sk2nysr5tk', 'cmtttzn7g0004v1e858pzpnl9', 'cmttvde61000mv1sk4jp7q83l', 'cmtttzn6k0001v1e8pvvc21bi', '2026-09-09 09:01:50', 1760000, 1760000, 'RTGS', 'RTGS11223344', 'COMPLETED', 'Registry completed, ownership handed over', '2026-09-09 09:01:50', '2026-09-09 09:01:50');

-- Dumping data for table `FollowUp` (1 rows)
INSERT INTO `FollowUp` (`id`, `leadId`, `userId`, `scheduledAt`, `completedAt`, `callStatus`, `remarks`, `customerRequirement`, `nextAction`, `nextFollowUpDate`, `createdAt`) VALUES ('cmttvdebk001qv1skmkheu1ld', 'cmttvdebb001ov1skze447a26', 'cmtttzn6q0002v1e8wz4tyau9', NULL, NULL, 'ANSWERED', 'Customer discussed Dholera airport timeline and expressway connectivity. Requested brochure and site layout.', 'Looking for 200 Sq. Yd. plot with 30ft road width', 'Send site visit invitation for this weekend', '2026-09-10 09:01:50', '2026-09-09 09:01:50');

-- Dumping data for table `SiteVisit` (1 rows)
INSERT INTO `SiteVisit` (`id`, `leadId`, `projectId`, `plotId`, `assignedUserId`, `visitDate`, `visitTime`, `status`, `remarks`, `postVisitRemarks`, `feedback`, `nextAction`, `createdAt`, `updatedAt`) VALUES ('cmttvdec9001uv1sk2jrj76ak', 'cmttvdebt001sv1skv51gnx2n', 'cmtttzn7g0004v1e858pzpnl9', NULL, 'cmtttzn6y0003v1e8688zgcm9', '2026-09-12 09:01:50', '11:00 AM', 'SCHEDULED', 'Client traveling with family to inspect Block A and B plots.', NULL, NULL, 'Confirm vehicle arrangement from Ahmedabad junction', '2026-09-09 09:01:50', '2026-09-09 09:01:50');

-- Dumping data for table `Testimonial` (3 rows)
INSERT INTO `Testimonial` (`id`, `customerName`, `designation`, `review`, `rating`, `avatarImage`, `project`, `displayOrder`, `isActive`, `createdAt`) VALUES ('cmttvdeed0020v1skmgl9su07', 'Dr. Alok Srivastava', 'Senior Consultant & Investor, Delhi NCR', 'Investing in Riddhi at Dholera through Om Swastik Buildhomes has been completely transparent. Their team provided clear documentation, expressway updates, and flawless assistance throughout the selection.', 5, NULL, 'Riddhi Premium Plots', 1, 1, '2026-09-09 09:01:50');
INSERT INTO `Testimonial` (`id`, `customerName`, `designation`, `review`, `rating`, `avatarImage`, `project`, `displayOrder`, `isActive`, `createdAt`) VALUES ('cmttvdeel0021v1skzcdq83w0', 'Mahesh K. Bansal', 'Business Owner, Noida West', 'Dholera is India\'s future manufacturing capital with Tata Electronics and other giants establishing facilities. Rahul Bisht and Praful Singh gave genuine, fact-backed guidance without unnecessary hype.', 5, NULL, 'Riddhi Premium Plots', 2, 1, '2026-09-09 09:01:50');
INSERT INTO `Testimonial` (`id`, `customerName`, `designation`, `review`, `rating`, `avatarImage`, `project`, `displayOrder`, `isActive`, `createdAt`) VALUES ('cmttvdeev0022v1skaxpfxsu7', 'Hitesh Parikh', 'NRI Investor, Gujarat', 'I inspected the site layout and the location advantage of Riddhi. The expressway connectivity to Ahmedabad makes this an outstanding high-growth asset. Highly recommended developer.', 5, NULL, 'Riddhi Premium Plots', 3, 1, '2026-09-09 09:01:50');

-- Dumping data for table `Faq` (5 rows)
INSERT INTO `Faq` (`id`, `question`, `answer`, `category`, `displayOrder`, `isActive`, `createdAt`) VALUES ('cmttvdeci001vv1skvitidqfq', 'What is Dholera Special Investment Region (SIR)?', 'Dholera SIR is India\'s first greenfield industrial smart city being developed as a major node of the Delhi–Mumbai Industrial Corridor (DMIC). Spanning 920 sq. km, it features planned multi-modal connectivity including an international airport, expressways, high-speed rail, and dedicated freight corridors.', 'Dholera SIR', 1, 1, '2026-09-09 09:01:50');
INSERT INTO `Faq` (`id`, `question`, `answer`, `category`, `displayOrder`, `isActive`, `createdAt`) VALUES ('cmttvdecu001wv1sk033lpr7o', 'Where is Riddhi Premium Plots located?', 'Riddhi is strategically located within the planned development zone of Dholera SIR, Gujarat, in direct proximity to the 250m wide Ahmedabad–Dholera Expressway and minutes away from the upcoming Dholera International Airport.', 'Riddhi Plots', 2, 1, '2026-09-09 09:01:50');
INSERT INTO `Faq` (`id`, `question`, `answer`, `category`, `displayOrder`, `isActive`, `createdAt`) VALUES ('cmttvdedl001xv1sk8ez2fwk6', 'What plot sizes are available in Riddhi?', 'Riddhi offers thoughtfully demarcated residential and prime investment plots ranging from 150 Sq. Yd. (1,350 Sq. Ft.), 200 Sq. Yd. (1,800 Sq. Ft.), 250 Sq. Yd., 300 Sq. Yd. up to 500 Sq. Yd., with wide internal roads of 30ft and 40ft.', 'Riddhi Plots', 3, 1, '2026-09-09 09:01:50');
INSERT INTO `Faq` (`id`, `question`, `answer`, `category`, `displayOrder`, `isActive`, `createdAt`) VALUES ('cmttvdedu001yv1sk8z4f7dns', 'What is the booking process for a plot?', 'You can select an available plot from our interactive online inventory or during a site visit, submit your initial booking token of ₹51,000, verify documents, and complete allotment documentation through our executive team.', 'Investment', 4, 1, '2026-09-09 09:01:50');
INSERT INTO `Faq` (`id`, `question`, `answer`, `category`, `displayOrder`, `isActive`, `createdAt`) VALUES ('cmttvdee5001zv1sk80qe8t9m', 'How can I schedule a physical site visit to Dholera?', 'You can easily schedule a site visit through our website or by contacting our executive desk directly via Call or WhatsApp. Our team assists with local guidance, transport pickup, and comprehensive on-site plot verification.', 'General', 5, 1, '2026-09-09 09:01:50');

-- Dumping data for table `ContactSetting` (1 rows)
INSERT INTO `ContactSetting` (`id`, `companyName`, `tagline`, `cin`, `officeAddress`, `primaryPhone`, `secondaryPhone`, `altPhone`, `primaryEmail`, `altEmail`, `whatsappNumber`, `googleMapEmbed`, `facebookUrl`, `instagramUrl`, `linkedinUrl`, `youtubeUrl`, `twitterUrl`, `updatedAt`) VALUES ('default', 'Om Swastik Buildhomes Pvt. Ltd.', 'Building Trust. Creating Spaces.', 'U41000UW2026PTC256814', 'Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, U.P. 201318', '+919599213531', '+919810484742', '+919990842233', 'rahulbisht@omswastikbuildhomes.com', 'rahulbisht0802@gmail.com', '919599213531', 'https://maps.google.com', 'https://facebook.com', 'https://instagram.com', 'https://linkedin.com', NULL, NULL, '2026-09-09 08:23:08');

SET FOREIGN_KEY_CHECKS = 1;
