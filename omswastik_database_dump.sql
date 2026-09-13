-- OM SWASTIK BUILDHOMES — COMPLETE PRODUCTION MYSQL DATABASE DUMP
-- Target Database: omswasti1_omswastik_main
-- Generated: 2026-09-12T14:28:50.979Z

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

-- Dumping data for table `Plot` (69 rows)
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-01', '1', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 1, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-02', '2', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 0, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-03', '3', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 0, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, 'Allotment in Progress', '2026-09-12 11:29:38', '2026-09-12 13:46:01');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-04', '4', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 0, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-05', '5', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 0, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, 'Client Token Processing', '2026-09-12 11:29:38', '2026-09-12 13:45:44');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-06', '6', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 0, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-07', '7', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 0, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-08', '8', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 0, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-09', '9', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 0, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, 'Registered & Transferred', '2026-09-12 11:29:38', '2026-09-12 13:45:21');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-10', '10', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 1, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-11', '11', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'WEST', 9, 1, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-12', '12', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'WEST', 9, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, 'Allotment in Progress', '2026-09-12 11:29:38', '2026-09-12 13:46:29');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-13', '13', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'WEST', 9, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-14', '14', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'WEST', 9, 1, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-15', '15', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'EAST', 9, 1, 1, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-16', '16', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'EAST', 9, 0, 1, 0, 0, 0, 51000, 'AVAILABLE', NULL, 'Client Token Processing', '2026-09-12 11:29:38', '2026-09-12 13:46:25');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-17', '17', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'EAST', 9, 0, 1, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-18', '18', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'EAST', 9, 1, 1, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-19', '19', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'WEST', 9, 1, 1, 0, 0, 0, 51000, 'AVAILABLE', NULL, 'Allotment in Progress', '2026-09-12 11:29:38', '2026-09-12 13:46:19');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-20', '20', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'WEST', 9, 0, 1, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-21', '21', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'WEST', 9, 0, 1, 0, 0, 0, 51000, 'AVAILABLE', NULL, 'Registered & Transferred', '2026-09-12 11:29:38', '2026-09-12 13:46:15');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-22', '22', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'WEST', 9, 1, 1, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-23', '23', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'EAST', 12, 1, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-24', '24', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'EAST', 12, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, 'Client Token Processing', '2026-09-12 11:29:38', '2026-09-12 13:46:11');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-25', '25', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'EAST', 12, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-26', '26', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'EAST', 12, 1, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-27', '27', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 1, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-28', '28', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, 'Registered & Transferred', '2026-09-12 11:29:38', '2026-09-12 13:46:05');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-29', '29', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-30', '30', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-31', '31', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, 'Allotment in Progress', '2026-09-12 11:29:38', '2026-09-12 13:45:56');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-32', '32', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-33', '33', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-34', '34', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-35', '35', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 1, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-36', '36', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 1, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:38', '2026-09-12 11:29:38');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-37', '37', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-38', '38', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, 'Client Token Processing', '2026-09-12 11:29:39', '2026-09-12 13:45:50');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-39', '39', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-40', '40', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-41', '41', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-42', '42', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-43', '43', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 9, 1, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-44', '44', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'EAST', 9, 1, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-45', '45', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'EAST', 9, 0, 0, 0, 0, 0, 51000, 'BOOKED', NULL, 'Allotment in Progress', '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-46', '46', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'EAST', 9, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-47', '47', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'EAST', 9, 1, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-48', '48', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'WEST', 9, 1, 1, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-49', '49', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'WEST', 9, 0, 1, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-50', '50', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'WEST', 9, 0, 1, 0, 0, 0, 51000, 'AVAILABLE', NULL, 'Registered & Transferred', '2026-09-12 11:29:39', '2026-09-12 13:45:41');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-51', '51', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'WEST', 9, 1, 1, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-52', '52', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'EAST', 9, 1, 1, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-53', '53', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'EAST', 9, 0, 1, 0, 0, 0, 51000, 'HOLD', NULL, 'Client Token Processing', '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-54', '54', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'EAST', 9, 0, 1, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-55', '55', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'EAST', 9, 1, 1, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-56', '56', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'WEST', 12, 1, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-57', '57', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'WEST', 12, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, 'Allotment in Progress', '2026-09-12 11:29:39', '2026-09-12 13:45:36');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-58', '58', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'WEST', 12, 0, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-59', '59', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'WEST', 12, 1, 0, 0, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-60', '60', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 1, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-61', '61', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 0, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-62', '62', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 0, 0, 1, 0, 0, 51000, 'BOOKED', NULL, 'Allotment in Progress', '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-63', '63', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 0, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-64', '64', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 0, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-65', '65', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 0, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, 'Client Token Processing', '2026-09-12 11:29:39', '2026-09-12 13:45:25');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-66', '66', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 0, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-67', '67', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 0, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-68', '68', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 0, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, 'Registered & Transferred', '2026-09-12 11:29:39', '2026-09-12 13:45:29');
INSERT INTO `Plot` (`id`, `plotNumber`, `projectId`, `sizeSqYd`, `sizeSqFt`, `lengthFt`, `widthFt`, `facing`, `roadWidthFt`, `isCorner`, `isParkFacing`, `isMainRoadFacing`, `priceTotal`, `pricePerUnit`, `bookingAmount`, `status`, `holdUntil`, `remarks`, `createdAt`, `updatedAt`) VALUES ('plot-riddhi-69', '69', 'cmtttzn7g0004v1e858pzpnl9', 200, 1800, 72, 25, 'SOUTH', 18, 1, 0, 1, 0, 0, 51000, 'AVAILABLE', NULL, NULL, '2026-09-12 11:29:39', '2026-09-12 11:29:39');

-- Dumping data for table `Lead` (7 rows)
INSERT INTO `Lead` (`id`, `name`, `mobile`, `email`, `interestedProjectId`, `interestedPlotId`, `budget`, `preferredSize`, `locationPreference`, `requirement`, `leadSource`, `assignedUserId`, `status`, `remarks`, `nextFollowUpDate`, `createdAt`, `updatedAt`) VALUES ('cmtu3tbm4001ov1lc882ntu4i', 'Amitabh Verma', '+919811002233', 'amitabh.v@outlook.com', 'cmtttzn7g0004v1e858pzpnl9', NULL, '₹10 - 15 Lakhs', '150 - 200 Sq. Yd.', NULL, NULL, 'WEBSITE', 'cmtttzn6q0002v1e8wz4tyau9', 'FOLLOW_UP', 'Interested in North-facing 200 Sq. Yd. plot for long-term investment', '2026-09-10 12:58:10', '2026-09-09 12:58:10', '2026-09-09 12:58:10');
INSERT INTO `Lead` (`id`, `name`, `mobile`, `email`, `interestedProjectId`, `interestedPlotId`, `budget`, `preferredSize`, `locationPreference`, `requirement`, `leadSource`, `assignedUserId`, `status`, `remarks`, `nextFollowUpDate`, `createdAt`, `updatedAt`) VALUES ('cmtu3tbmf001sv1lc3rpi8ttd', 'Sunita Aggarwal', '+919910223344', 'sunita.aggarwal@gmail.com', 'cmtttzn7g0004v1e858pzpnl9', NULL, '₹15 - 20 Lakhs', NULL, NULL, NULL, 'WHATSAPP', 'cmtttzn6y0003v1e8688zgcm9', 'SITE_VISIT_SCHEDULED', 'Confirmed site visit from Noida office', NULL, '2026-09-09 12:58:10', '2026-09-09 12:58:10');
INSERT INTO `Lead` (`id`, `name`, `mobile`, `email`, `interestedProjectId`, `interestedPlotId`, `budget`, `preferredSize`, `locationPreference`, `requirement`, `leadSource`, `assignedUserId`, `status`, `remarks`, `nextFollowUpDate`, `createdAt`, `updatedAt`) VALUES ('cmtwm4yrx0003v1acm1miatdj', 'Ramesh Patel', '9876543210', 'ramesh.patel@gmail.com', NULL, NULL, '11L - 15L', NULL, NULL, 'Direct Allotment Enquiry from Website', 'WEBSITE', 'cmtttzn6y0003v1e8688zgcm9', 'NEW', NULL, NULL, '2026-09-11 07:06:38', '2026-09-11 07:06:38');
INSERT INTO `Lead` (`id`, `name`, `mobile`, `email`, `interestedProjectId`, `interestedPlotId`, `budget`, `preferredSize`, `locationPreference`, `requirement`, `leadSource`, `assignedUserId`, `status`, `remarks`, `nextFollowUpDate`, `createdAt`, `updatedAt`) VALUES ('cmtwmdf3y0007v1acp7y4cpmi', 'Vikramaditya Rathore', '9988776655', 'vikram.rathore@outlook.com', 'cmtttzn7g0004v1e858pzpnl9', NULL, '22L - 35L', NULL, NULL, 'Interested in Corner Villa Plot near 30m road. Urgent enquiry.', 'WEBSITE', 'cmtttzn6y0003v1e8688zgcm9', 'NEW', NULL, NULL, '2026-09-11 07:13:13', '2026-09-11 07:13:13');
INSERT INTO `Lead` (`id`, `name`, `mobile`, `email`, `interestedProjectId`, `interestedPlotId`, `budget`, `preferredSize`, `locationPreference`, `requirement`, `leadSource`, `assignedUserId`, `status`, `remarks`, `nextFollowUpDate`, `createdAt`, `updatedAt`) VALUES ('cmtwmdpwi000bv1ac0ee17369', 'Meenakshi Sundaram', '9840123456', 'meenakshi.s@gmail.com', 'cmtttzn7g0004v1e858pzpnl9', NULL, NULL, NULL, NULL, '[SITE VISIT REQUEST] Date: 2026-09-15 | Slot: Morning | Plot #42', 'SITE_VISIT_MODAL', 'cmtttzn6y0003v1e8688zgcm9', 'SITE_VISIT_SCHEDULED', NULL, NULL, '2026-09-11 07:13:27', '2026-09-11 07:13:27');
INSERT INTO `Lead` (`id`, `name`, `mobile`, `email`, `interestedProjectId`, `interestedPlotId`, `budget`, `preferredSize`, `locationPreference`, `requirement`, `leadSource`, `assignedUserId`, `status`, `remarks`, `nextFollowUpDate`, `createdAt`, `updatedAt`) VALUES ('cmtyh3kgw0019v1948al08a0p', 'Test Visitor', '9876543210', 'testvisitor@example.com', 'cmtttzn7g0004v1e858pzpnl9', NULL, NULL, NULL, NULL, NULL, 'WEBSITE', 'cmtttzn6y0003v1e8688zgcm9', 'NEW', NULL, NULL, '2026-09-12 14:21:07', '2026-09-12 14:21:07');
INSERT INTO `Lead` (`id`, `name`, `mobile`, `email`, `interestedProjectId`, `interestedPlotId`, `budget`, `preferredSize`, `locationPreference`, `requirement`, `leadSource`, `assignedUserId`, `status`, `remarks`, `nextFollowUpDate`, `createdAt`, `updatedAt`) VALUES ('cmtyh3kil001dv194n2ivrwa1', 'Brochure Visitor', '9876543211', 'brochure@example.com', 'cmtttzn7g0004v1e858pzpnl9', NULL, NULL, NULL, NULL, NULL, 'WEBSITE', 'cmtttzn6y0003v1e8688zgcm9', 'NEW', NULL, NULL, '2026-09-12 14:21:07', '2026-09-12 14:21:07');

-- Dumping data for table `Customer` (2 rows)
INSERT INTO `Customer` (`id`, `name`, `phone`, `email`, `panNumber`, `aadharNumber`, `fullAddress`, `city`, `state`, `convertedFromLeadId`, `notes`, `createdAt`, `updatedAt`) VALUES ('cmtu3tbla001hv1lcmmgw3n50', 'Rajiv Sharma', '+919871122334', 'rajiv.sharma@gmail.com', 'ABCPS1234F', NULL, 'Sector 15, Rohini, New Delhi 110085', 'Delhi', 'Delhi', NULL, 'Investor interested in Dholera semiconductor expansion', '2026-09-09 12:58:10', '2026-09-09 12:58:10');
INSERT INTO `Customer` (`id`, `name`, `phone`, `email`, `panNumber`, `aadharNumber`, `fullAddress`, `city`, `state`, `convertedFromLeadId`, `notes`, `createdAt`, `updatedAt`) VALUES ('cmtu3tbln001kv1lcd0687woz', 'Vikas Patel', '+919825544332', 'vikas.patel@ahmedabadre.com', 'BNXPP5678K', NULL, 'Satellite Road, Ahmedabad, Gujarat 380015', 'Ahmedabad', 'Gujarat', NULL, 'Registered buyer, full payment cleared', '2026-09-09 12:58:10', '2026-09-09 12:58:10');

-- Dumping data for table `FollowUp` (1 rows)
INSERT INTO `FollowUp` (`id`, `leadId`, `userId`, `scheduledAt`, `completedAt`, `callStatus`, `remarks`, `customerRequirement`, `nextAction`, `nextFollowUpDate`, `createdAt`) VALUES ('cmtu3tbma001qv1lcwnk1e38i', 'cmtu3tbm4001ov1lc882ntu4i', 'cmtttzn6q0002v1e8wz4tyau9', NULL, NULL, 'ANSWERED', 'Customer discussed Dholera airport timeline and expressway connectivity. Requested brochure and site layout.', 'Looking for 200 Sq. Yd. plot with 30ft road width', 'Send site visit invitation for this weekend', '2026-09-10 12:58:10', '2026-09-09 12:58:10');

-- Dumping data for table `SiteVisit` (2 rows)
INSERT INTO `SiteVisit` (`id`, `leadId`, `projectId`, `plotId`, `assignedUserId`, `visitDate`, `visitTime`, `status`, `remarks`, `postVisitRemarks`, `feedback`, `nextAction`, `createdAt`, `updatedAt`) VALUES ('cmtu3tbmm001uv1lccqicrqub', 'cmtu3tbmf001sv1lc3rpi8ttd', 'cmtttzn7g0004v1e858pzpnl9', NULL, 'cmtttzn6y0003v1e8688zgcm9', '2026-09-12 12:58:10', '11:00 AM', 'SCHEDULED', 'Client traveling with family to inspect Block A and B plots.', NULL, NULL, 'Confirm vehicle arrangement from Ahmedabad junction', '2026-09-09 12:58:10', '2026-09-09 12:58:10');
INSERT INTO `SiteVisit` (`id`, `leadId`, `projectId`, `plotId`, `assignedUserId`, `visitDate`, `visitTime`, `status`, `remarks`, `postVisitRemarks`, `feedback`, `nextAction`, `createdAt`, `updatedAt`) VALUES ('cmtwmdpwp000dv1acyokldhk8', 'cmtwmdpwi000bv1ac0ee17369', 'cmtttzn7g0004v1e858pzpnl9', NULL, 'cmtttzn6y0003v1e8688zgcm9', '2026-09-15 00:00:00', 'Morning (10:00 AM - 1:00 PM)', 'SCHEDULED', 'Requested from website form by Meenakshi Sundaram (9840123456)', NULL, NULL, NULL, '2026-09-11 07:13:27', '2026-09-11 07:13:27');

-- Dumping data for table `Testimonial` (3 rows)
INSERT INTO `Testimonial` (`id`, `customerName`, `designation`, `review`, `rating`, `avatarImage`, `project`, `displayOrder`, `isActive`, `createdAt`) VALUES ('cmtu3tbnq0020v1lchhx7ze9n', 'Dr. Alok Srivastava', 'Senior Consultant & Investor, Delhi NCR', 'Investing in Riddhi at Dholera through Om Swastik Buildhomes has been completely transparent. Their team provided clear documentation, expressway updates, and flawless assistance throughout the selection.', 5, NULL, 'Riddhi Premium Plots', 1, 1, '2026-09-09 12:58:10');
INSERT INTO `Testimonial` (`id`, `customerName`, `designation`, `review`, `rating`, `avatarImage`, `project`, `displayOrder`, `isActive`, `createdAt`) VALUES ('cmtu3tbnx0021v1lcpdl1w709', 'Mahesh K. Bansal', 'Business Owner, Noida West', 'Dholera is India\'s future manufacturing capital with Tata Electronics and other giants establishing facilities. Rahul Bisht and Praful Singh gave genuine, fact-backed guidance without unnecessary hype.', 5, NULL, 'Riddhi Premium Plots', 2, 1, '2026-09-09 12:58:10');
INSERT INTO `Testimonial` (`id`, `customerName`, `designation`, `review`, `rating`, `avatarImage`, `project`, `displayOrder`, `isActive`, `createdAt`) VALUES ('cmtu3tbo40022v1lcmrjuhk1c', 'Hitesh Parikh', 'NRI Investor, Gujarat', 'I inspected the site layout and the location advantage of Riddhi. The expressway connectivity to Ahmedabad makes this an outstanding high-growth asset. Highly recommended developer.', 5, NULL, 'Riddhi Premium Plots', 3, 1, '2026-09-09 12:58:10');

-- Dumping data for table `Faq` (5 rows)
INSERT INTO `Faq` (`id`, `question`, `answer`, `category`, `displayOrder`, `isActive`, `createdAt`) VALUES ('cmtu3tbms001vv1lcdct6d0f7', 'What is Dholera Special Investment Region (SIR)?', 'Dholera SIR is India\'s first greenfield industrial smart city being developed as a major node of the Delhi–Mumbai Industrial Corridor (DMIC). Spanning 920 sq. km, it features planned multi-modal connectivity including an international airport, expressways, high-speed rail, and dedicated freight corridors.', 'Dholera SIR', 1, 1, '2026-09-09 12:58:10');
INSERT INTO `Faq` (`id`, `question`, `answer`, `category`, `displayOrder`, `isActive`, `createdAt`) VALUES ('cmtu3tbmy001wv1lcsyi5g0oh', 'Where is Riddhi Premium Plots located?', 'Riddhi is strategically located within the planned development zone of Dholera SIR, Gujarat, in direct proximity to the 250m wide Ahmedabad–Dholera Expressway and minutes away from the upcoming Dholera International Airport.', 'Riddhi Plots', 2, 1, '2026-09-09 12:58:10');
INSERT INTO `Faq` (`id`, `question`, `answer`, `category`, `displayOrder`, `isActive`, `createdAt`) VALUES ('cmtu3tbn5001xv1lcxicopc5u', 'What plot sizes are available in Riddhi?', 'Riddhi offers thoughtfully demarcated residential and prime investment plots ranging from 150 Sq. Yd. (1,350 Sq. Ft.), 200 Sq. Yd. (1,800 Sq. Ft.), 250 Sq. Yd., 300 Sq. Yd. up to 500 Sq. Yd., with wide internal roads of 30ft and 40ft.', 'Riddhi Plots', 3, 1, '2026-09-09 12:58:10');
INSERT INTO `Faq` (`id`, `question`, `answer`, `category`, `displayOrder`, `isActive`, `createdAt`) VALUES ('cmtu3tbnc001yv1lc4a6hfj2r', 'What is the booking process for a plot?', 'You can select an available plot from our interactive online inventory or during a site visit, submit your initial booking token of ₹51,000, verify documents, and complete allotment documentation through our executive team.', 'Investment', 4, 1, '2026-09-09 12:58:10');
INSERT INTO `Faq` (`id`, `question`, `answer`, `category`, `displayOrder`, `isActive`, `createdAt`) VALUES ('cmtu3tbni001zv1lcpx7cd28o', 'How can I schedule a physical site visit to Dholera?', 'You can easily schedule a site visit through our website or by contacting our executive desk directly via Call or WhatsApp. Our team assists with local guidance, transport pickup, and comprehensive on-site plot verification.', 'General', 5, 1, '2026-09-09 12:58:10');

-- Dumping data for table `ContactSetting` (1 rows)
INSERT INTO `ContactSetting` (`id`, `companyName`, `tagline`, `cin`, `officeAddress`, `primaryPhone`, `secondaryPhone`, `altPhone`, `primaryEmail`, `altEmail`, `whatsappNumber`, `googleMapEmbed`, `facebookUrl`, `instagramUrl`, `linkedinUrl`, `youtubeUrl`, `twitterUrl`, `updatedAt`) VALUES ('default', 'Om Swastik Buildhomes Pvt. Ltd.', 'Building Trust. Creating Spaces.', 'U41000UW2026PTC256814', 'Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B, Greater Noida West, U.P. 201318', '+919599213531', '+919810484742', '+919990842233', 'rahulbisht@omswastikbuildhomes.com', 'rahulbisht0802@gmail.com', '919599213531', 'https://maps.google.com', 'https://facebook.com', 'https://instagram.com', 'https://linkedin.com', NULL, NULL, '2026-09-09 08:23:08');

-- Dumping data for table `ActivityLog` (24 rows)
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtwlhjsy0001v1acthbmrvmi', 'cmtttzn670000v1e8wkivkf1q', 'PLOT_STATUS_CHANGED', 'Plot', 'cmtu3tbfr0006v1lcpu562w8k', NULL, 'AVAILABLE', 'HOLD', 'Plot #A-101 status changed from AVAILABLE to HOLD by Om Swastik SuperAdmin', '2026-09-11 06:48:26');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtwm4ys90005v1acgrmnp04e', 'cmtttzn6y0003v1e8688zgcm9', 'LEAD_CREATED', 'Lead', 'cmtwm4yrx0003v1acm1miatdj', 'cmtwm4yrx0003v1acm1miatdj', NULL, NULL, 'Public enquiry received from Ramesh Patel via WEBSITE. Assigned to staff.', '2026-09-11 07:06:38');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtwmdf460009v1ac05g3pwjx', 'cmtttzn6y0003v1e8688zgcm9', 'LEAD_CREATED', 'Lead', 'cmtwmdf3y0007v1acp7y4cpmi', 'cmtwmdf3y0007v1acp7y4cpmi', NULL, NULL, 'Public enquiry received from Vikramaditya Rathore via WEBSITE. Assigned to staff.', '2026-09-11 07:13:13');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtwmdpwu000fv1acryuehyvt', 'cmtttzn6y0003v1e8688zgcm9', 'LEAD_CREATED', 'Lead', 'cmtwmdpwi000bv1ac0ee17369', 'cmtwmdpwi000bv1ac0ee17369', NULL, NULL, 'Public enquiry received from Meenakshi Sundaram via SITE_VISIT_MODAL. Assigned to staff.', '2026-09-11 07:13:27');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyef3t40005v194c6snothi', 'cmtttzn6y0003v1e8688zgcm9', 'LEAD_CREATED', 'Lead', 'cmtyef3su0003v1941bmth6n6', NULL, NULL, NULL, 'Public enquiry received from Test Visitor via WELCOME_POPUP. Assigned to staff.', '2026-09-12 13:06:07');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyeu6jx0009v194zz3gf8bh', 'cmtttzn6y0003v1e8688zgcm9', 'LEAD_CREATED', 'Lead', 'cmtyeu6jo0007v194v3c8wfjs', NULL, NULL, NULL, 'Public enquiry received from Hero Visitor via HERO_DOWNLOAD_BUTTON. Assigned to staff.', '2026-09-12 13:17:50');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyf1xyw000dv194w0lwm34p', 'cmtttzn6y0003v1e8688zgcm9', 'LEAD_CREATED', 'Lead', 'cmtyf1xyl000bv1947f1hpf9o', NULL, NULL, NULL, 'Public enquiry received from Brochure Lead via BROCHURE_DOWNLOAD. Assigned to staff.', '2026-09-12 13:23:52');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyftk4v000fv194fia3s7yq', 'cmtttzn670000v1e8wkivkf1q', 'PLOT_STATUS_CHANGED', 'Plot', 'plot-riddhi-09', NULL, 'SOLD', 'AVAILABLE', 'Plot #9 status changed from SOLD to AVAILABLE by Om Swastik SuperAdmin', '2026-09-12 13:45:21');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyftnoe000hv194202tsnca', 'cmtttzn670000v1e8wkivkf1q', 'PLOT_STATUS_CHANGED', 'Plot', 'plot-riddhi-65', NULL, 'HOLD', 'AVAILABLE', 'Plot #65 status changed from HOLD to AVAILABLE by Om Swastik SuperAdmin', '2026-09-12 13:45:25');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyftqm0000jv194l59y5q3r', 'cmtttzn670000v1e8wkivkf1q', 'PLOT_STATUS_CHANGED', 'Plot', 'plot-riddhi-68', NULL, 'SOLD', 'AVAILABLE', 'Plot #68 status changed from SOLD to AVAILABLE by Om Swastik SuperAdmin', '2026-09-12 13:45:29');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyftvn8000lv194slsrma3s', 'cmtttzn670000v1e8wkivkf1q', 'PLOT_STATUS_CHANGED', 'Plot', 'plot-riddhi-57', NULL, 'BOOKED', 'AVAILABLE', 'Plot #57 status changed from BOOKED to AVAILABLE by Om Swastik SuperAdmin', '2026-09-12 13:45:36');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyftzoe000nv194tvq4xx49', 'cmtttzn670000v1e8wkivkf1q', 'PLOT_STATUS_CHANGED', 'Plot', 'plot-riddhi-50', NULL, 'SOLD', 'AVAILABLE', 'Plot #50 status changed from SOLD to AVAILABLE by Om Swastik SuperAdmin', '2026-09-12 13:45:41');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyfu29h000pv194lv31z0it', 'cmtttzn670000v1e8wkivkf1q', 'PLOT_STATUS_CHANGED', 'Plot', 'plot-riddhi-05', NULL, 'HOLD', 'AVAILABLE', 'Plot #5 status changed from HOLD to AVAILABLE by Om Swastik SuperAdmin', '2026-09-12 13:45:44');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyfu6x0000rv194rweh7qg7', 'cmtttzn670000v1e8wkivkf1q', 'PLOT_STATUS_CHANGED', 'Plot', 'plot-riddhi-38', NULL, 'HOLD', 'AVAILABLE', 'Plot #38 status changed from HOLD to AVAILABLE by Om Swastik SuperAdmin', '2026-09-12 13:45:50');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyfubjk000tv194wpgfr1kd', 'cmtttzn670000v1e8wkivkf1q', 'PLOT_STATUS_CHANGED', 'Plot', 'plot-riddhi-31', NULL, 'BOOKED', 'AVAILABLE', 'Plot #31 status changed from BOOKED to AVAILABLE by Om Swastik SuperAdmin', '2026-09-12 13:45:56');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyfufh0000vv194i5d5ff99', 'cmtttzn670000v1e8wkivkf1q', 'PLOT_STATUS_CHANGED', 'Plot', 'plot-riddhi-03', NULL, 'BOOKED', 'AVAILABLE', 'Plot #3 status changed from BOOKED to AVAILABLE by Om Swastik SuperAdmin', '2026-09-12 13:46:01');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyfui85000xv194e9ocgduk', 'cmtttzn670000v1e8wkivkf1q', 'PLOT_STATUS_CHANGED', 'Plot', 'plot-riddhi-28', NULL, 'SOLD', 'AVAILABLE', 'Plot #28 status changed from SOLD to AVAILABLE by Om Swastik SuperAdmin', '2026-09-12 13:46:05');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyfun8o000zv194a5di7m30', 'cmtttzn670000v1e8wkivkf1q', 'PLOT_STATUS_CHANGED', 'Plot', 'plot-riddhi-24', NULL, 'HOLD', 'AVAILABLE', 'Plot #24 status changed from HOLD to AVAILABLE by Om Swastik SuperAdmin', '2026-09-12 13:46:11');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyfupyn0011v1948g08b5a8', 'cmtttzn670000v1e8wkivkf1q', 'PLOT_STATUS_CHANGED', 'Plot', 'plot-riddhi-21', NULL, 'SOLD', 'AVAILABLE', 'Plot #21 status changed from SOLD to AVAILABLE by Om Swastik SuperAdmin', '2026-09-12 13:46:15');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyfuswf0013v194vnwp0onj', 'cmtttzn670000v1e8wkivkf1q', 'PLOT_STATUS_CHANGED', 'Plot', 'plot-riddhi-19', NULL, 'BOOKED', 'AVAILABLE', 'Plot #19 status changed from BOOKED to AVAILABLE by Om Swastik SuperAdmin', '2026-09-12 13:46:19');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyfuxdz0015v194yndoge22', 'cmtttzn670000v1e8wkivkf1q', 'PLOT_STATUS_CHANGED', 'Plot', 'plot-riddhi-16', NULL, 'HOLD', 'AVAILABLE', 'Plot #16 status changed from HOLD to AVAILABLE by Om Swastik SuperAdmin', '2026-09-12 13:46:25');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyfv0om0017v194wyl47sif', 'cmtttzn670000v1e8wkivkf1q', 'PLOT_STATUS_CHANGED', 'Plot', 'plot-riddhi-12', NULL, 'BOOKED', 'AVAILABLE', 'Plot #12 status changed from BOOKED to AVAILABLE by Om Swastik SuperAdmin', '2026-09-12 13:46:29');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyh3khg001bv194o6xkvh91', 'cmtttzn6y0003v1e8688zgcm9', 'LEAD_CREATED', 'Lead', 'cmtyh3kgw0019v1948al08a0p', 'cmtyh3kgw0019v1948al08a0p', NULL, NULL, 'Public enquiry received from Test Visitor via WEBSITE. Assigned to staff.', '2026-09-12 14:21:07');
INSERT INTO `ActivityLog` (`id`, `userId`, `action`, `entityType`, `entityId`, `leadId`, `previousValue`, `newValue`, `details`, `createdAt`) VALUES ('cmtyh3kiz001fv1944opo4e5e', 'cmtttzn6y0003v1e8688zgcm9', 'LEAD_CREATED', 'Lead', 'cmtyh3kil001dv194n2ivrwa1', 'cmtyh3kil001dv194n2ivrwa1', NULL, NULL, 'Public enquiry received from Brochure Visitor via WEBSITE. Assigned to staff.', '2026-09-12 14:21:07');

SET FOREIGN_KEY_CHECKS = 1;
