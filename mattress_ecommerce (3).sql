-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 18, 2026 at 12:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mattress_ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `type` enum('HOME','OFFICE','OTHER') NOT NULL DEFAULT 'HOME',
  `fullName` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `addressLine1` varchar(191) NOT NULL,
  `addressLine2` varchar(191) DEFAULT NULL,
  `city` varchar(191) NOT NULL,
  `state` varchar(191) NOT NULL,
  `pincode` varchar(191) NOT NULL,
  `landmark` varchar(191) DEFAULT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `userId`, `type`, `fullName`, `phone`, `addressLine1`, `addressLine2`, `city`, `state`, `pincode`, `landmark`, `isDefault`, `createdAt`, `updatedAt`) VALUES
('52e76fa0-c79e-45ee-a61f-ee9b9786d13a', 'a7f35646-3927-4a5f-8dea-0d4beb159da6', 'HOME', 'ravi', '1213457899', 'zXZXZX', NULL, 'fjdfj', 'Tamilnadu', '600116', NULL, 0, '2026-03-05 10:46:35.159', '2026-03-05 10:46:35.159'),
('5ea4a24b-8818-4a87-a6f8-5150f70c9ba6', 'e8e7ea9c-6f4b-4a20-878d-ed1dab75c48f', 'HOME', 'sudha nandhini', '9874653214', 'zXZXZX', NULL, 'fjdfj', 'Tamilnadu', '600116', NULL, 0, '2026-03-06 11:24:55.941', '2026-03-06 12:25:07.547'),
('811ba5ee-ca66-4bd8-9d96-f02791550a5a', 'e8e7ea9c-6f4b-4a20-878d-ed1dab75c48f', 'HOME', 'sudha nandhini', '9874653214', '15, Third main road,', NULL, 'chennai', 'Tamilnadu', '600116', NULL, 1, '2026-03-06 11:42:13.909', '2026-03-06 12:25:07.551'),
('8f945c60-5ab1-42aa-be16-208295961917', 'e8e7ea9c-6f4b-4a20-878d-ed1dab75c48f', 'HOME', 'sudha nandhini', '9874653214', '15, Third main road,', NULL, 'chennai', 'Tamilnadu', '600116', NULL, 0, '2026-03-06 11:25:33.558', '2026-03-06 12:25:07.547'),
('a528881c-e2d5-4ee2-ad2f-1994acc7341a', 'd2cd5944-d5f0-4a16-adcd-7b125e287af2', 'HOME', 'kalaivani v', '01213457899', '15, Third main road,', NULL, 'chennai', 'Tamilnadu', '600116', NULL, 0, '2026-03-12 07:30:41.687', '2026-03-12 07:30:41.687'),
('c98143d1-dec6-4c05-a2a8-a22937b05b34', 'e8e7ea9c-6f4b-4a20-878d-ed1dab75c48f', 'HOME', 'sudha nandhini', '9874653214', '15, Third main road,', NULL, 'chennai', 'Tamilnadu', '600116', NULL, 0, '2026-03-06 11:41:34.638', '2026-03-06 12:25:07.547'),
('cb0eed92-19e5-4988-9bfa-8bd8d850da07', 'e8e7ea9c-6f4b-4a20-878d-ed1dab75c48f', 'HOME', 'sudha nandhini', '9874653214', '15, Third main road,', NULL, 'chennai', 'Tamilnadu', '600116', NULL, 0, '2026-03-06 09:39:57.233', '2026-03-06 12:25:07.547'),
('d8e5e875-9241-456b-9ec7-17a073041c7d', 'b6d54dca-8607-4c8c-870a-8e1db173574c', 'HOME', 'test test', '986532147', '15, Third main road,', NULL, 'chennai', 'Tamilnadu', '600116', NULL, 0, '2026-03-12 09:32:07.408', '2026-03-12 09:32:07.408'),
('f37b5b64-9aae-409a-ade4-384e95849cec', '178a8a3d-8a5a-4227-bf0b-243583f3f9b0', 'HOME', 'mahesh kumar', '7896532145', '15, Third main road,', NULL, 'chennai', 'Tamilnadu', '600116', NULL, 0, '2026-03-06 11:55:49.800', '2026-03-06 11:55:49.800');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` varchar(191) NOT NULL,
  `cartId` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `variantId` varchar(191) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` decimal(10,2) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `parentId` varchar(191) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `metaTitle` varchar(191) DEFAULT NULL,
  `metaDescription` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image`, `parentId`, `isActive`, `sortOrder`, `metaTitle`, `metaDescription`, `createdAt`, `updatedAt`) VALUES
('30822049-e632-406c-a099-2ad7e516459c', 'Latex Foam Mattress', 'latex-foam-mattress', NULL, NULL, NULL, 1, 0, NULL, NULL, '2026-02-17 11:56:50.438', '2026-02-17 11:56:50.438'),
('33442547-4c46-4278-a51b-07fe50dc52d2', 'Memory Foam Mattress', 'memory-foam-mattress', NULL, NULL, NULL, 1, 0, NULL, NULL, '2026-02-17 11:56:50.451', '2026-02-17 11:56:50.451'),
('3f89835c-e08d-41a2-9ff2-3aca7fd9bf63', 'Uncategorized', 'uncategorized', NULL, NULL, NULL, 1, 0, NULL, NULL, '2026-02-17 11:56:50.502', '2026-02-17 11:56:50.502'),
('50c008f4-0f72-4aec-8998-c4fe1ffce4ed', 'Spring Mattress', 'spring-mattress', NULL, NULL, NULL, 1, 0, NULL, NULL, '2026-02-17 11:56:50.471', '2026-02-17 11:56:50.471'),
('652ebeeb-52ae-49a1-b8e2-dee02d11410d', 'Foam Mattress', 'foam-mattress', NULL, NULL, NULL, 1, 0, NULL, NULL, '2026-02-17 11:56:50.427', '2026-02-17 11:56:50.427'),
('66fd9732-0733-439c-9d96-4c7b59c8908f', 'Hybrid Mattress', 'hybrid-mattress', NULL, NULL, NULL, 1, 0, NULL, NULL, '2026-02-17 11:56:50.434', '2026-02-17 11:56:50.434'),
('6d9dff73-cabf-4293-81ee-f0123256eaa7', 'Rebonded Foam Mattress', 'rebonded-foam-mattress', NULL, NULL, NULL, 1, 0, NULL, NULL, '2026-02-17 11:56:50.447', '2026-02-17 11:56:50.447'),
('6e63691f-90f6-4ae5-a6a5-f26ff89a3a87', 'Orthopedic Mattress', 'orthopedic-mattress', NULL, NULL, NULL, 1, 0, NULL, NULL, '2026-02-17 11:56:50.442', '2026-02-17 11:56:50.442'),
('70102c44-eaff-4a8a-b14b-472a4da49a34', 'Bonnell Spring Mattress', 'bonnell-spring-mattress', NULL, NULL, NULL, 1, 0, NULL, NULL, '2026-02-17 11:56:50.455', '2026-03-10 12:28:11.548'),
('8774f28b-f7c0-48f9-82f1-72d5a1ab6025', 'Pocket Spring Mattress', 'pocket-spring-mattress', NULL, NULL, NULL, 1, 0, NULL, NULL, '2026-02-17 11:56:50.491', '2026-02-17 11:56:50.491'),
('ae357c64-e263-4dd0-9533-f8179e7aed7b', 'Coir Mattress', 'coir-mattress', NULL, NULL, NULL, 1, 0, NULL, NULL, '2026-02-17 11:56:50.481', '2026-02-17 11:56:50.481'),
('b011d206-a5eb-4555-81bd-23a164e1776d', 'Euro Top Mattress', 'euro-top-mattress', NULL, NULL, NULL, 1, 0, NULL, NULL, '2026-02-17 11:56:50.461', '2026-02-17 11:56:50.461');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` varchar(191) NOT NULL,
  `code` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `type` enum('PERCENTAGE','FIXED') NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `minOrderValue` decimal(10,2) DEFAULT NULL,
  `maxDiscount` decimal(10,2) DEFAULT NULL,
  `usageLimit` int(11) DEFAULT NULL,
  `usedCount` int(11) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `validFrom` datetime(3) NOT NULL,
  `validUntil` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `code`, `description`, `type`, `value`, `minOrderValue`, `maxDiscount`, `usageLimit`, `usedCount`, `isActive`, `validFrom`, `validUntil`, `createdAt`, `updatedAt`) VALUES
('597fa252-bf8d-4f48-9943-445ab87db35e', 'SLEEP10', '2000 for all orders', 'FIXED', 2000.00, 10000.00, NULL, NULL, 0, 1, '2026-03-12 00:00:00.000', '2026-04-12 00:00:00.000', '2026-03-12 07:52:12.147', '2026-03-12 10:52:44.056'),
('721f8d15-7d3f-4124-90a3-70cd94f26192', 'BED20', '', 'PERCENTAGE', 20.00, NULL, NULL, 2, 0, 1, '2026-03-12 00:00:00.000', '2026-05-12 00:00:00.000', '2026-03-12 09:05:49.587', '2026-03-12 09:12:15.096');

-- --------------------------------------------------------

--
-- Table structure for table `coupon_usages`
--

CREATE TABLE `coupon_usages` (
  `id` varchar(191) NOT NULL,
  `couponCode` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `orderId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupon_usages`
--

INSERT INTO `coupon_usages` (`id`, `couponCode`, `userId`, `orderId`, `createdAt`) VALUES
('16374905-4a0c-42dc-9fd1-c628ab833180', 'BED20', 'b6d54dca-8607-4c8c-870a-8e1db173574c', '14e5ae7d-5129-4405-b608-09e2db81afa7', '2026-03-12 09:45:36.777');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `type` enum('ORDER_PLACED','ORDER_CONFIRMED','ORDER_SHIPPED','ORDER_DELIVERED','ORDER_CANCELLED','PROMOTIONAL') NOT NULL,
  `title` varchar(191) NOT NULL,
  `message` text NOT NULL,
  `link` varchar(191) DEFAULT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` varchar(191) NOT NULL,
  `orderNumber` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `shippingAddressId` varchar(191) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `shippingCharge` decimal(10,2) NOT NULL DEFAULT 0.00,
  `tax` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL,
  `couponCode` varchar(191) DEFAULT NULL,
  `couponDiscount` decimal(10,2) DEFAULT NULL,
  `paymentMethod` enum('RAZORPAY','COD') NOT NULL,
  `paymentStatus` enum('PENDING','PAID','FAILED','REFUNDED') NOT NULL DEFAULT 'PENDING',
  `status` enum('PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED','REFUNDED') NOT NULL DEFAULT 'PENDING',
  `trackingNumber` varchar(191) DEFAULT NULL,
  `estimatedDelivery` datetime(3) DEFAULT NULL,
  `deliveredAt` datetime(3) DEFAULT NULL,
  `customerNotes` text DEFAULT NULL,
  `adminNotes` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `orderNumber`, `userId`, `shippingAddressId`, `subtotal`, `discount`, `shippingCharge`, `tax`, `total`, `couponCode`, `couponDiscount`, `paymentMethod`, `paymentStatus`, `status`, `trackingNumber`, `estimatedDelivery`, `deliveredAt`, `customerNotes`, `adminNotes`, `createdAt`, `updatedAt`) VALUES
('02be8087-225d-4652-9781-dbed398ee5c0', 'ORD97333913793', 'e8e7ea9c-6f4b-4a20-878d-ed1dab75c48f', '811ba5ee-ca66-4bd8-9d96-f02791550a5a', 20099.33, 0.00, 0.00, 3618.00, 23717.33, NULL, NULL, 'COD', 'PENDING', 'DELIVERED', '', NULL, '2026-03-06 11:42:51.652', 'hjrj', '', '2026-03-06 11:42:13.915', '2026-03-06 11:42:51.654'),
('08fdaa91-fb9a-45af-baf5-15c43ea33493', 'ORD00641716911', 'd2cd5944-d5f0-4a16-adcd-7b125e287af2', 'a528881c-e2d5-4ee2-ad2f-1994acc7341a', 1.00, 0.00, 0.00, 0.00, 1.00, NULL, NULL, 'COD', 'PENDING', 'PENDING', NULL, NULL, NULL, 'good', NULL, '2026-03-12 07:30:41.719', '2026-03-12 07:30:41.719'),
('14e3635e-70b5-4044-8434-4b528fc92d00', 'ORD02210347323', 'd2cd5944-d5f0-4a16-adcd-7b125e287af2', 'a528881c-e2d5-4ee2-ad2f-1994acc7341a', 30150.33, 0.00, 0.00, 5427.00, 33577.33, NULL, NULL, 'COD', 'PENDING', 'CANCELLED', '', NULL, NULL, NULL, '', '2026-03-12 07:56:50.386', '2026-03-13 07:50:25.826'),
('14e5ae7d-5129-4405-b608-09e2db81afa7', 'ORD08736764859', 'b6d54dca-8607-4c8c-870a-8e1db173574c', 'd8e5e875-9241-456b-9ec7-17a073041c7d', 24119.33, 5692.00, 0.00, 4341.00, 22768.33, 'BED20', 5692.00, 'COD', 'PENDING', 'CONFIRMED', '', NULL, NULL, NULL, '', '2026-03-12 09:45:36.765', '2026-03-13 09:27:46.037'),
('26be90d1-2432-480f-b37b-401dbb3a9015', 'ORD96333563333', 'e8e7ea9c-6f4b-4a20-878d-ed1dab75c48f', '8f945c60-5ab1-42aa-be16-208295961917', 17587.50, 0.00, 0.00, 3166.00, 20753.50, NULL, NULL, 'COD', 'PENDING', 'CANCELLED', '', NULL, NULL, 'sdsdg', '', '2026-03-06 11:25:33.605', '2026-03-06 11:43:02.841'),
('4be461b4-9c00-4272-ae3f-8a3abe32f27c', 'ORD06457402964', 'd2cd5944-d5f0-4a16-adcd-7b125e287af2', 'a528881c-e2d5-4ee2-ad2f-1994acc7341a', 28139.33, 0.00, 0.00, 5065.00, 26563.33, NULL, NULL, 'COD', 'PENDING', 'PENDING', NULL, NULL, NULL, NULL, NULL, '2026-03-12 09:07:37.403', '2026-03-12 09:07:37.403'),
('4cbee0e6-e3c1-4775-8489-09472beeefab', 'ORD97294642728', 'e8e7ea9c-6f4b-4a20-878d-ed1dab75c48f', 'c98143d1-dec6-4c05-a2a8-a22937b05b34', 1.00, 0.00, 0.00, 0.00, 1.00, NULL, NULL, 'COD', 'PENDING', 'PENDING', NULL, NULL, NULL, 'jdti ', NULL, '2026-03-06 11:41:34.644', '2026-03-06 11:41:34.644'),
('5d1e6be3-feae-40f2-a08d-8c71d878feb2', 'ORD07595169735', 'a7f35646-3927-4a5f-8dea-0d4beb159da6', '52e76fa0-c79e-45ee-a61f-ee9b9786d13a', 22101.96, 0.00, 0.00, 3978.00, 26079.96, NULL, NULL, 'COD', 'PENDING', 'DELIVERED', '', NULL, '2026-03-12 07:24:18.427', 'good', '', '2026-03-05 10:46:35.175', '2026-03-12 07:24:18.428'),
('61d5e4bc-c901-4570-83f5-fbbbce288894', 'ORD98149811306', '178a8a3d-8a5a-4227-bf0b-243583f3f9b0', 'f37b5b64-9aae-409a-ade4-384e95849cec', 1.00, 0.00, 0.00, 0.00, 1.00, NULL, NULL, 'RAZORPAY', 'PAID', 'PROCESSING', '', NULL, NULL, 'good', '', '2026-03-06 11:55:49.813', '2026-03-12 06:51:17.716'),
('627ee82d-0cec-4417-903e-efa9e738f11f', 'ORD07997077448', 'b6d54dca-8607-4c8c-870a-8e1db173574c', 'd8e5e875-9241-456b-9ec7-17a073041c7d', 65659.33, 0.00, 0.00, 11819.00, 61982.33, NULL, NULL, 'COD', 'PENDING', 'PENDING', NULL, NULL, NULL, NULL, NULL, '2026-03-12 09:33:17.078', '2026-03-12 09:33:17.078'),
('753ea1f0-9d32-4f25-b706-62894d94babf', 'ORD89997350795', 'e8e7ea9c-6f4b-4a20-878d-ed1dab75c48f', 'cb0eed92-19e5-4988-9bfa-8bd8d850da07', 133326.65, 0.00, 0.00, 23999.00, 157325.65, NULL, NULL, 'COD', 'PENDING', 'SHIPPED', '', NULL, NULL, 'good', '', '2026-03-06 09:39:57.391', '2026-03-06 09:40:28.239'),
('b127990e-5f9e-4807-bb34-c8f40c62555e', 'ORD06422160484', 'd2cd5944-d5f0-4a16-adcd-7b125e287af2', 'a528881c-e2d5-4ee2-ad2f-1994acc7341a', 24119.33, 0.00, 0.00, 4341.00, 22768.33, NULL, NULL, 'COD', 'PENDING', 'PENDING', NULL, NULL, NULL, NULL, NULL, '2026-03-12 09:07:02.162', '2026-03-12 09:07:02.162'),
('b7ba68d6-181a-4f71-9df6-11e2662ffcc4', 'ORD07927418983', 'b6d54dca-8607-4c8c-870a-8e1db173574c', 'd8e5e875-9241-456b-9ec7-17a073041c7d', 30150.33, 0.00, 0.00, 5427.00, 35577.33, NULL, NULL, 'COD', 'PENDING', 'PENDING', NULL, NULL, NULL, NULL, NULL, '2026-03-12 09:32:07.419', '2026-03-12 09:32:07.419'),
('bb01e2eb-fb88-4194-ad69-b7c600011806', 'ORD06476108591', 'd2cd5944-d5f0-4a16-adcd-7b125e287af2', 'a528881c-e2d5-4ee2-ad2f-1994acc7341a', 28139.33, 0.00, 0.00, 5065.00, 26563.33, NULL, NULL, 'COD', 'PENDING', 'DELIVERED', '', NULL, '2026-03-12 09:09:22.036', NULL, '', '2026-03-12 09:07:56.109', '2026-03-12 09:09:22.038'),
('d82bc597-76c0-45ba-8f79-6f1ca94e1c7b', 'ORD07951346491', 'b6d54dca-8607-4c8c-870a-8e1db173574c', 'd8e5e875-9241-456b-9ec7-17a073041c7d', 24119.33, 0.00, 0.00, 4341.00, 22768.33, NULL, NULL, 'COD', 'PENDING', 'PENDING', NULL, NULL, NULL, NULL, NULL, '2026-03-12 09:32:31.348', '2026-03-12 09:32:31.348'),
('fb443825-5985-4607-b4dc-6da22e8d425b', 'ORD96295949686', 'e8e7ea9c-6f4b-4a20-878d-ed1dab75c48f', '5ea4a24b-8818-4a87-a6f8-5150f70c9ba6', 1.00, 0.00, 0.00, 0.00, 1.00, NULL, NULL, 'COD', 'PENDING', 'PENDING', NULL, NULL, NULL, 'gsgr', NULL, '2026-03-06 11:24:55.951', '2026-03-06 11:24:55.951');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` varchar(191) NOT NULL,
  `orderId` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `variantId` varchar(191) DEFAULT NULL,
  `productName` varchar(191) NOT NULL,
  `variantName` varchar(191) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `orderId`, `productId`, `variantId`, `productName`, `variantName`, `quantity`, `price`, `discount`, `total`, `createdAt`) VALUES
('0a55ed2a-b58d-4665-a88b-391e51921412', '61d5e4bc-c901-4570-83f5-fbbbce288894', '59782b5d-5102-4810-ab0e-fac78483ecca', NULL, 'Demo', '72x60', 1, 1.00, 0.00, 1.00, '2026-03-06 11:55:49.813'),
('11ad8a1c-950c-4b22-aa3f-45fd86a5b832', '4cbee0e6-e3c1-4775-8489-09472beeefab', '0358a2f6-b70d-4aff-8ba3-b8f3bc8e131f', NULL, 'Reactive Re-bonded Foam Mattress', 'Queen', 1, 1.00, 0.00, 1.00, '2026-03-06 11:41:34.644'),
('1c1cf9e7-4b7c-433c-9ab4-8d724f9e6c71', '753ea1f0-9d32-4f25-b706-62894d94babf', '352de8a6-d0ef-45d5-a720-d78790250bed', 'ab54650b-a8df-46ab-a27c-35116d5692b6', 'Euro Top-K Mattress', 'King | 78x72', 1, 29479.33, 0.00, 29479.33, '2026-03-06 09:39:57.391'),
('306d4c04-5622-47d1-bce7-c73d99f307cf', '14e3635e-70b5-4044-8434-4b528fc92d00', '0358a2f6-b70d-4aff-8ba3-b8f3bc8e131f', NULL, 'Reactive Re-bonded Foam Mattress', 'Queen', 1, 1.00, 0.00, 1.00, '2026-03-12 07:56:50.386'),
('3200b337-b7f7-4aa0-865f-a73d4f7a5a06', '753ea1f0-9d32-4f25-b706-62894d94babf', 'a4120b13-b182-46a8-9af6-84896f16f391', 'ade6e70c-435a-4cfb-833b-d4d5d490f8df', 'Memory Foam Deluxe Mattress', 'King | 72x72', 1, 24119.33, 0.00, 24119.33, '2026-03-06 09:39:57.391'),
('3920f57b-1fc7-4345-8b10-0936b6bf318b', '14e3635e-70b5-4044-8434-4b528fc92d00', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', NULL, 'Reactive Plus Latex Foam Mattress', 'King | 72x72', 1, 30149.33, 0.00, 30149.33, '2026-03-12 07:56:50.386'),
('4864c8f6-39b8-4ee8-b88f-728a0d5936d9', '4be461b4-9c00-4272-ae3f-8a3abe32f27c', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', NULL, 'Reactive Plus Memory Foam Mattress', 'King | 72x72', 1, 28139.33, 0.00, 28139.33, '2026-03-12 09:07:37.403'),
('57f8c529-88d6-4f78-895e-ee06b210de2b', '753ea1f0-9d32-4f25-b706-62894d94babf', 'b3dd7723-8687-47ec-a46b-08553530378a', 'a4e95c72-b630-4c14-9d6f-4a21cc866786', 'Pocket Spring Deluxe Mattress', 'King | 72x72', 1, 20099.33, 0.00, 20099.33, '2026-03-06 09:39:57.391'),
('5fdfc94a-1a55-468d-b524-4d9d9ea20d32', '02be8087-225d-4652-9781-dbed398ee5c0', 'b3dd7723-8687-47ec-a46b-08553530378a', NULL, 'Pocket Spring Deluxe Mattress', 'King | 72x72', 1, 20099.33, 0.00, 20099.33, '2026-03-06 11:42:13.915'),
('61fd5f09-b9d5-4bba-9e24-21b0c1591731', 'd82bc597-76c0-45ba-8f79-6f1ca94e1c7b', 'a4120b13-b182-46a8-9af6-84896f16f391', NULL, 'Memory Foam Deluxe Mattress', 'King | 72x72', 1, 24119.33, 0.00, 24119.33, '2026-03-12 09:32:31.348'),
('632a425e-12b2-4ab0-a9b8-1c20d2aff240', 'b127990e-5f9e-4807-bb34-c8f40c62555e', 'a4120b13-b182-46a8-9af6-84896f16f391', NULL, 'Memory Foam Deluxe Mattress', 'King | 72x72', 1, 24119.33, 0.00, 24119.33, '2026-03-12 09:07:02.162'),
('7bb7bd0d-192d-4e43-abad-b5444f515a6d', 'fb443825-5985-4607-b4dc-6da22e8d425b', '0358a2f6-b70d-4aff-8ba3-b8f3bc8e131f', NULL, 'Reactive Re-bonded Foam Mattress', 'Queen', 1, 1.00, 0.00, 1.00, '2026-03-06 11:24:55.951'),
('876c34a5-016f-4043-a14b-a8ae0aa8b935', '627ee82d-0cec-4417-903e-efa9e738f11f', '36af496c-a620-4b7c-9fbb-421ff6640123', NULL, 'Grande Plus Mattress', 'King | 72x72', 1, 65659.33, 0.00, 65659.33, '2026-03-12 09:33:17.078'),
('8fd9e982-e68e-4ef7-963f-a813aaa4bff7', 'b7ba68d6-181a-4f71-9df6-11e2662ffcc4', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', NULL, 'Reactive Plus Latex Foam Mattress', 'King | 72x72', 1, 30149.33, 0.00, 30149.33, '2026-03-12 09:32:07.419'),
('9ae76e85-15fd-4b79-b48d-83d283b2025c', '26be90d1-2432-480f-b37b-401dbb3a9015', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', NULL, 'Reactive Re-bonded Foam Mattress', 'King | 72x72', 1, 17587.50, 0.00, 17587.50, '2026-03-06 11:25:33.605'),
('9d9ecbcc-f131-427a-899c-51d0c1b55d57', 'bb01e2eb-fb88-4194-ad69-b7c600011806', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', NULL, 'Reactive Plus Memory Foam Mattress', 'King | 72x72', 1, 28139.33, 0.00, 28139.33, '2026-03-12 09:07:56.109'),
('a9e8bd1f-1dfe-495d-ac2a-d5ccb57a9bb9', '5d1e6be3-feae-40f2-a08d-8c71d878feb2', '59782b5d-5102-4810-ab0e-fac78483ecca', NULL, 'Demo', '72x60', 1, 22101.96, 0.00, 22101.96, '2026-03-05 10:46:35.175'),
('b8d53272-3314-4ac8-9561-c81aa1cc938d', 'b7ba68d6-181a-4f71-9df6-11e2662ffcc4', '0358a2f6-b70d-4aff-8ba3-b8f3bc8e131f', NULL, 'Reactive Re-bonded Foam Mattress', 'Queen', 1, 1.00, 0.00, 1.00, '2026-03-12 09:32:07.419'),
('d49a78a5-c32c-4fb1-914b-f2adb6cef26b', '08fdaa91-fb9a-45af-baf5-15c43ea33493', '59782b5d-5102-4810-ab0e-fac78483ecca', NULL, 'Demo', '72x60', 1, 1.00, 0.00, 1.00, '2026-03-12 07:30:41.719'),
('e8d33b7b-ae80-49fb-b8a3-6fdd8fb3d638', '753ea1f0-9d32-4f25-b706-62894d94babf', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'c8df4156-f757-4177-b2d6-c2785978a910', 'Reactive Plus Latex Foam Mattress', 'King | 72x72', 1, 30149.33, 0.00, 30149.33, '2026-03-06 09:39:57.391'),
('ec7b2397-7184-475f-ad6a-222cd92390c0', '14e5ae7d-5129-4405-b608-09e2db81afa7', 'a4120b13-b182-46a8-9af6-84896f16f391', NULL, 'Memory Foam Deluxe Mattress', 'King | 72x72', 1, 24119.33, 0.00, 24119.33, '2026-03-12 09:45:36.765'),
('eda77c95-1d57-46b8-98c0-411debd951f1', '753ea1f0-9d32-4f25-b706-62894d94babf', '352de8a6-d0ef-45d5-a720-d78790250bed', '5ba25c16-18bc-4485-a221-94aa424120b6', 'Euro Top-K Mattress', 'King | 72x72', 1, 29479.33, 0.00, 29479.33, '2026-03-06 09:39:57.391');

-- --------------------------------------------------------

--
-- Table structure for table `order_status_history`
--

CREATE TABLE `order_status_history` (
  `id` varchar(191) NOT NULL,
  `orderId` varchar(191) NOT NULL,
  `status` enum('PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED','REFUNDED') NOT NULL,
  `notes` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_status_history`
--

INSERT INTO `order_status_history` (`id`, `orderId`, `status`, `notes`, `createdAt`) VALUES
('1acd2930-7a48-4e4d-9ac0-24f7f49ee099', '627ee82d-0cec-4417-903e-efa9e738f11f', 'PENDING', 'Order placed by customer', '2026-03-12 09:33:17.078'),
('1c81cd55-489e-4f74-8dd2-9a458df04065', '4be461b4-9c00-4272-ae3f-8a3abe32f27c', 'PENDING', 'Order placed by customer', '2026-03-12 09:07:37.403'),
('1d92c9c4-50ff-474a-95e3-d36e286ecb67', '753ea1f0-9d32-4f25-b706-62894d94babf', 'PENDING', 'Order placed by customer', '2026-03-06 09:39:57.391'),
('225e2a1b-7a27-4bd4-9140-ce2cc60e095a', '26be90d1-2432-480f-b37b-401dbb3a9015', 'PENDING', 'Order placed by customer', '2026-03-06 11:25:33.605'),
('2353840b-04dd-42ad-85dc-2a569f063c13', '14e3635e-70b5-4044-8434-4b528fc92d00', 'CONFIRMED', 'Status changed to CONFIRMED', '2026-03-13 07:49:08.395'),
('23ba7e91-9871-457b-a9c7-2e90d44ac762', '08fdaa91-fb9a-45af-baf5-15c43ea33493', 'PENDING', 'Order placed by customer', '2026-03-12 07:30:41.719'),
('2e026d43-2f61-4f3f-b7be-f9fa787601e3', 'b127990e-5f9e-4807-bb34-c8f40c62555e', 'PENDING', 'Order placed by customer', '2026-03-12 09:07:02.162'),
('2e45efa5-6a19-41e1-952b-432a2b1161c3', '26be90d1-2432-480f-b37b-401dbb3a9015', 'CANCELLED', 'Status changed to CANCELLED', '2026-03-06 11:43:02.841'),
('349b5d3d-1aaf-4098-bf04-372bf6e0306f', '5d1e6be3-feae-40f2-a08d-8c71d878feb2', 'SHIPPED', 'Status changed to SHIPPED', '2026-03-12 07:19:16.279'),
('3663fb4e-8955-4650-8fb5-d53266a020b7', '14e5ae7d-5129-4405-b608-09e2db81afa7', 'CONFIRMED', 'Status changed to CONFIRMED', '2026-03-13 09:27:46.037'),
('4fdf45bb-328f-4617-bc65-4db355484802', '14e5ae7d-5129-4405-b608-09e2db81afa7', 'PENDING', 'Order placed by customer', '2026-03-12 09:45:36.765'),
('5e4c9611-e5f5-41db-bdf5-ef611645cef4', '5d1e6be3-feae-40f2-a08d-8c71d878feb2', 'CONFIRMED', 'Status changed to CONFIRMED', '2026-03-12 07:16:22.743'),
('6288b7a0-a164-488f-bb31-11dd91ae06ee', '02be8087-225d-4652-9781-dbed398ee5c0', 'DELIVERED', 'Status changed to DELIVERED', '2026-03-06 11:42:49.428'),
('63a9508a-8c99-4349-b4dd-4d6869650d2d', 'd82bc597-76c0-45ba-8f79-6f1ca94e1c7b', 'PENDING', 'Order placed by customer', '2026-03-12 09:32:31.348'),
('6d02274a-ec1b-4bca-a720-e34294b4335f', '753ea1f0-9d32-4f25-b706-62894d94babf', 'SHIPPED', 'Status changed to SHIPPED', '2026-03-06 09:40:28.239'),
('7793851d-c22e-4ddc-8b89-12ac642cf6d0', 'bb01e2eb-fb88-4194-ad69-b7c600011806', 'PENDING', 'Order placed by customer', '2026-03-12 09:07:56.109'),
('8269070b-96d6-4a82-978b-abe5bd1c535a', 'bb01e2eb-fb88-4194-ad69-b7c600011806', 'DELIVERED', 'Status changed to DELIVERED', '2026-03-12 09:09:22.038'),
('8d4190fd-bee1-43d5-9c05-e22e4bbcb4b3', '61d5e4bc-c901-4570-83f5-fbbbce288894', 'PENDING', 'Order placed by customer', '2026-03-06 11:55:49.813'),
('944f24c1-97b9-4772-941f-6d9abed7a8a3', '02be8087-225d-4652-9781-dbed398ee5c0', 'DELIVERED', 'Status changed to DELIVERED', '2026-03-06 11:42:51.654'),
('9d793b3d-f2d0-4f99-a138-c17cbb821761', '5d1e6be3-feae-40f2-a08d-8c71d878feb2', 'DELIVERED', 'Status changed to DELIVERED', '2026-03-12 07:24:01.676'),
('a3c65ea9-77f3-498a-a35d-2065afa0ef9d', '14e3635e-70b5-4044-8434-4b528fc92d00', 'CANCELLED', 'Status changed to CANCELLED', '2026-03-13 07:50:25.826'),
('ab10c767-fb20-424b-b0ba-106d40c071a7', '61d5e4bc-c901-4570-83f5-fbbbce288894', 'PROCESSING', 'Status changed to PROCESSING', '2026-03-12 06:51:17.716'),
('ac5e7d2e-da72-4af5-8b5c-e21271344903', '02be8087-225d-4652-9781-dbed398ee5c0', 'PENDING', 'Order placed by customer', '2026-03-06 11:42:13.915'),
('b84d4570-201b-4faf-9eb4-b3f574c42fdc', '5d1e6be3-feae-40f2-a08d-8c71d878feb2', 'PENDING', 'Order placed by customer', '2026-03-05 10:46:35.175'),
('b993e29b-b7e6-4c8a-8cfc-12550a5b00f9', '5d1e6be3-feae-40f2-a08d-8c71d878feb2', 'SHIPPED', 'Status changed to SHIPPED', '2026-03-12 07:19:18.696'),
('bb66d3b8-a8fd-4b3a-b321-2fcc66e66046', 'fb443825-5985-4607-b4dc-6da22e8d425b', 'PENDING', 'Order placed by customer', '2026-03-06 11:24:55.951'),
('c0c4bfec-d276-4f60-85a7-140ca2f64b53', 'b7ba68d6-181a-4f71-9df6-11e2662ffcc4', 'PENDING', 'Order placed by customer', '2026-03-12 09:32:07.419'),
('dc2327f1-9682-4bc1-85ae-da3d3387d2ce', '4cbee0e6-e3c1-4775-8489-09472beeefab', 'PENDING', 'Order placed by customer', '2026-03-06 11:41:34.644'),
('de8f713b-5302-4d81-ad70-8832dd7e216e', '14e3635e-70b5-4044-8434-4b528fc92d00', 'PENDING', 'Order placed by customer', '2026-03-12 07:56:50.386'),
('fde409a5-abb3-4974-9ed6-d51136214c1e', '5d1e6be3-feae-40f2-a08d-8c71d878feb2', 'DELIVERED', 'Status changed to DELIVERED', '2026-03-12 07:24:18.428'),
('fe61aae4-8046-46cb-a555-e1dc8d11994d', '14e3635e-70b5-4044-8434-4b528fc92d00', 'SHIPPED', 'Status changed to SHIPPED', '2026-03-13 07:49:29.540');

-- --------------------------------------------------------

--
-- Table structure for table `page_seo`
--

CREATE TABLE `page_seo` (
  `id` varchar(191) NOT NULL,
  `pageSlug` varchar(191) NOT NULL,
  `pageLabel` varchar(191) NOT NULL,
  `title` varchar(191) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `keywords` text DEFAULT NULL,
  `ogTitle` varchar(191) DEFAULT NULL,
  `ogDescription` text DEFAULT NULL,
  `ogImage` varchar(191) DEFAULT NULL,
  `robotsIndex` tinyint(1) NOT NULL DEFAULT 1,
  `robotsFollow` tinyint(1) NOT NULL DEFAULT 1,
  `canonicalUrl` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `page_seo`
--

INSERT INTO `page_seo` (`id`, `pageSlug`, `pageLabel`, `title`, `description`, `keywords`, `ogTitle`, `ogDescription`, `ogImage`, `robotsIndex`, `robotsFollow`, `canonicalUrl`, `createdAt`, `updatedAt`) VALUES
('361470ed-0e4a-4b09-810e-a4c071cc610a', 'about', 'About Us', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, '2026-03-12 10:12:07.807', '2026-03-12 10:12:07.807'),
('42aabe90-c67e-4263-8d11-50b0cb102f90', 'products', 'Products Listing', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, '2026-03-12 10:12:07.807', '2026-03-12 10:12:07.807'),
('cb962e3c-7142-4c06-9926-93be5b4c01a4', 'cart', 'Cart Page', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, '2026-03-12 10:12:07.807', '2026-03-12 10:12:07.807'),
('cbec077a-445a-45a1-ba64-c895fec24471', 'contact', 'Contact Us', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, '2026-03-12 10:12:07.807', '2026-03-12 10:12:07.807'),
('deda4cd8-5870-4c4b-a364-857d9c0dc368', 'checkout', 'Checkout Page', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, '2026-03-12 10:12:07.807', '2026-03-12 10:12:07.807'),
('e8f46d58-d472-4514-b6a8-52dc5f73cc9e', 'home', 'Home Page', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, '2026-03-12 10:12:07.807', '2026-03-12 10:12:07.807');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `used` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`id`, `email`, `token`, `expiresAt`, `used`, `createdAt`) VALUES
('05015910-0228-426b-be35-4d19eea25d88', 'sudhanandhinis@gmail.com', 'cb387b321cc079d6f16d2fd34d3bae3b8cfa0b120f254fcbb2b9ebe93e4dc8ee', '2026-03-13 08:41:42.251', 0, '2026-03-13 07:41:42.259'),
('24f7a06e-36dc-4b3a-bf39-2e36cab3b188', 'sudhanandhinis@gmail.com', '9897f86f1f77d397a20a315a1d2b83dbfe11dded987a497caea7c95f530d19fa', '2026-03-13 08:24:06.917', 1, '2026-03-13 07:24:06.923'),
('44aadc99-f313-4cee-bf35-324eaf084342', 'support@sunsys.in', 'a46a21e284a38cad1b168dde4ef128255224b6af597e857bba52f8b01b340de8', '2026-03-13 08:42:54.818', 1, '2026-03-13 07:42:54.821'),
('44d5e21d-a3dc-40d0-9f8d-de5657b40c77', 'sudhanandhinis@gmail.com', '87dcb89570628ed7c4cee371a6ea93c28d5f3f60ffe5ae2c124e40f59b23e951', '2026-03-13 08:24:01.301', 1, '2026-03-13 07:24:01.364'),
('b3f7bbc7-5c5b-4a76-a372-67556a6eb481', 'sudhanandhinis@gmail.com', 'e2f306b9012f37bbacaab82ab0a35393fbe246076f94cb2f5aaaba56b78eac5b', '2026-03-13 08:24:14.790', 1, '2026-03-13 07:24:14.794');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` varchar(191) NOT NULL,
  `orderId` varchar(191) NOT NULL,
  `razorpayOrderId` varchar(191) DEFAULT NULL,
  `razorpayPaymentId` varchar(191) DEFAULT NULL,
  `razorpaySignature` varchar(191) DEFAULT NULL,
  `method` enum('RAZORPAY','COD') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('PENDING','PAID','FAILED','REFUNDED') NOT NULL DEFAULT 'PENDING',
  `transactionId` varchar(191) DEFAULT NULL,
  `failureReason` text DEFAULT NULL,
  `paidAt` datetime(3) DEFAULT NULL,
  `refundedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `orderId`, `razorpayOrderId`, `razorpayPaymentId`, `razorpaySignature`, `method`, `amount`, `status`, `transactionId`, `failureReason`, `paidAt`, `refundedAt`, `createdAt`, `updatedAt`) VALUES
('02643d4e-d597-4681-96e9-c7242fa09371', 'fb443825-5985-4607-b4dc-6da22e8d425b', NULL, NULL, NULL, 'COD', 1.00, 'PENDING', NULL, NULL, NULL, NULL, '2026-03-06 11:24:56.092', '2026-03-06 11:24:56.092'),
('17645bbb-6871-410a-b38d-93b1813a928b', '4be461b4-9c00-4272-ae3f-8a3abe32f27c', NULL, NULL, NULL, 'COD', 26563.33, 'PENDING', NULL, NULL, NULL, NULL, '2026-03-12 09:07:37.425', '2026-03-12 09:07:37.425'),
('1d2e15b6-27b6-41c6-951a-2f335a9c96ab', '627ee82d-0cec-4417-903e-efa9e738f11f', NULL, NULL, NULL, 'COD', 61982.33, 'PENDING', NULL, NULL, NULL, NULL, '2026-03-12 09:33:17.088', '2026-03-12 09:33:17.088'),
('224b2516-af00-4e35-9ee2-516a03e01894', 'b127990e-5f9e-4807-bb34-c8f40c62555e', NULL, NULL, NULL, 'COD', 22768.33, 'PENDING', NULL, NULL, NULL, NULL, '2026-03-12 09:07:02.169', '2026-03-12 09:07:02.169'),
('610b9c41-3f21-42e2-b957-d24e0725c442', 'bb01e2eb-fb88-4194-ad69-b7c600011806', NULL, NULL, NULL, 'COD', 26563.33, 'PENDING', NULL, NULL, NULL, NULL, '2026-03-12 09:07:56.121', '2026-03-12 09:07:56.121'),
('733b06d1-d4df-4cdf-8913-6694f69210cf', '14e3635e-70b5-4044-8434-4b528fc92d00', NULL, NULL, NULL, 'COD', 33577.33, 'PENDING', NULL, NULL, NULL, NULL, '2026-03-12 07:56:50.425', '2026-03-12 07:56:50.425'),
('8290fa04-b8b9-4d9f-bc1c-06e874ac7990', '4cbee0e6-e3c1-4775-8489-09472beeefab', NULL, NULL, NULL, 'COD', 1.00, 'PENDING', NULL, NULL, NULL, NULL, '2026-03-06 11:41:34.655', '2026-03-06 11:41:34.655'),
('854f8813-24eb-4a92-8965-b9b8cfa39e34', 'd82bc597-76c0-45ba-8f79-6f1ca94e1c7b', NULL, NULL, NULL, 'COD', 22768.33, 'PENDING', NULL, NULL, NULL, NULL, '2026-03-12 09:32:31.358', '2026-03-12 09:32:31.358'),
('aa4713ff-5948-4891-ab7a-16090506ce99', '26be90d1-2432-480f-b37b-401dbb3a9015', NULL, NULL, NULL, 'COD', 20753.50, 'PENDING', NULL, NULL, NULL, NULL, '2026-03-06 11:25:33.644', '2026-03-06 11:25:33.644'),
('b247db76-c00c-44a6-958b-e88c62db1148', '14e5ae7d-5129-4405-b608-09e2db81afa7', NULL, NULL, NULL, 'COD', 22768.33, 'PENDING', NULL, NULL, NULL, NULL, '2026-03-12 09:45:36.780', '2026-03-12 09:45:36.780'),
('b70d7c02-7291-4908-9da4-11c91dad08ae', '02be8087-225d-4652-9781-dbed398ee5c0', NULL, NULL, NULL, 'COD', 23717.33, 'PENDING', NULL, NULL, NULL, NULL, '2026-03-06 11:42:13.927', '2026-03-06 11:42:13.927'),
('baf87e9a-b553-4788-970a-32d26c71239b', '61d5e4bc-c901-4570-83f5-fbbbce288894', 'order_SNvm2caISvCT7C', 'pay_SNvmXg237LgOIS', 'a7766dba66485375fbd5594107f71c03fca38505b58ef17de45a4ff0156a36b9', 'RAZORPAY', 1.00, 'PAID', NULL, NULL, '2026-03-06 11:55:49.818', NULL, '2026-03-06 11:55:49.819', '2026-03-06 11:55:49.819'),
('e898c4bd-5464-4504-b46b-63353817c0f9', '08fdaa91-fb9a-45af-baf5-15c43ea33493', NULL, NULL, NULL, 'COD', 1.00, 'PENDING', NULL, NULL, NULL, NULL, '2026-03-12 07:30:41.761', '2026-03-12 07:30:41.761'),
('fd55f361-581e-4251-8729-b1e8907bc883', 'b7ba68d6-181a-4f71-9df6-11e2662ffcc4', NULL, NULL, NULL, 'COD', 35577.33, 'PENDING', NULL, NULL, NULL, NULL, '2026-03-12 09:32:07.432', '2026-03-12 09:32:07.432');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` longtext DEFAULT NULL,
  `shortDescription` text DEFAULT NULL,
  `basePrice` decimal(10,2) DEFAULT NULL,
  `discountPercent` int(11) NOT NULL DEFAULT 0,
  `discountPrice` decimal(10,2) DEFAULT NULL,
  `sku` varchar(191) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `lowStockAlert` int(11) NOT NULL DEFAULT 10,
  `brand` varchar(191) DEFAULT NULL,
  `material` varchar(191) DEFAULT NULL,
  `warranty` varchar(191) DEFAULT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `metaTitle` varchar(191) DEFAULT NULL,
  `metaDescription` text DEFAULT NULL,
  `metaKeywords` varchar(191) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE','OUT_OF_STOCK','DISCONTINUED') NOT NULL DEFAULT 'ACTIVE',
  `isFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `isNewArrival` tinyint(1) NOT NULL DEFAULT 0,
  `isBestseller` tinyint(1) NOT NULL DEFAULT 0,
  `viewCount` int(11) NOT NULL DEFAULT 0,
  `salesCount` int(11) NOT NULL DEFAULT 0,
  `avgRating` decimal(3,2) NOT NULL DEFAULT 0.00,
  `reviewCount` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `allowReviews` tinyint(1) NOT NULL DEFAULT 1,
  `dimensions` varchar(191) DEFAULT NULL,
  `firmness` varchar(191) DEFAULT NULL,
  `inStock` tinyint(1) NOT NULL DEFAULT 1,
  `isPublished` tinyint(1) NOT NULL DEFAULT 1,
  `sizeGroups` varchar(191) DEFAULT NULL,
  `taxClass` varchar(191) DEFAULT NULL,
  `taxStatus` varchar(191) DEFAULT 'taxable',
  `type` varchar(191) NOT NULL DEFAULT 'variable',
  `visibility` varchar(191) NOT NULL DEFAULT 'visible',
  `wcId` int(11) DEFAULT NULL,
  `ogDescription` text DEFAULT NULL,
  `ogImage` varchar(191) DEFAULT NULL,
  `ogTitle` varchar(191) DEFAULT NULL,
  `robotsFollow` tinyint(1) NOT NULL DEFAULT 1,
  `robotsIndex` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `description`, `shortDescription`, `basePrice`, `discountPercent`, `discountPrice`, `sku`, `stock`, `lowStockAlert`, `brand`, `material`, `warranty`, `features`, `metaTitle`, `metaDescription`, `metaKeywords`, `status`, `isFeatured`, `isNewArrival`, `isBestseller`, `viewCount`, `salesCount`, `avgRating`, `reviewCount`, `createdAt`, `updatedAt`, `allowReviews`, `dimensions`, `firmness`, `inStock`, `isPublished`, `sizeGroups`, `taxClass`, `taxStatus`, `type`, `visibility`, `wcId`, `ogDescription`, `ogImage`, `ogTitle`, `robotsFollow`, `robotsIndex`) VALUES
('0358a2f6-b70d-4aff-8ba3-b8f3bc8e131f', 'Reactive Re-bonded Foam Mattress', 'reactive-re-bonded-foam-mattress-1772781696672', 'An idle, ultimate support system with an art of turning luxury into sleep, without compromising on quality, comfort and style. An unbeatable combination of stability, firmness, economy and durability. This is a medium hard mattress, provides exceptional value for money and also gives extra support for back and is a medium firm mattress. Features a Premium Quality knitted Fabric with quality Chain stitched quilting. High quality foam gives the desired comfort level & orthopaedic support.\n\n \nOur greatest satisfaction is helping our customers find the most comfortable, best quality mattress, at the most affordable price. Truly, you can expect more and get more out of our products.\n\n  Disclaimer: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size and Price, please visit the factory. In case of online purchase, please provide us the correct mattress size (in inches) after measurement. ', 'An idle, ultimate support system with an art of turning luxury into sleep, without compromising on quality, comfort and style. An unbeatable combination of stability, firmness, economy and durability. ', 15000.00, 0, 12000.00, '12', 0, 10, 'Foam Mattress', 'Reactive Re-bonded Foam Mattress', '5', NULL, NULL, NULL, NULL, 'ACTIVE', 1, 0, 0, 32, 0, 0.00, 0, '2026-03-06 07:21:37.700', '2026-03-13 06:11:05.499', 1, NULL, NULL, 1, 1, NULL, NULL, 'taxable', 'variable', 'visible', NULL, NULL, NULL, NULL, 1, 1),
('352de8a6-d0ef-45d5-a720-d78790250bed', 'Euro Top-K Mattress', 'euro-top-k-mattress', '<table border=\"1\" width=\"200\">\r\\n<tbody style=\"text-transform: uppercase;\">\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff; text-transform: uppercase;\">DESCRIPTION</td>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff; text-transform: uppercase;\">SPECIFICATION</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Grade Type</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">euro top mattress</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Type of Spring</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">POCKETED</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Mattress Description</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">ONE SIDE EURO -TOP</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Wire Diameter</td>\r\\n<td style=\"padding: 10px 10px;\">1.8MM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Border/Edge Support/Side Support</td>\r\\n<td style=\"padding: 10px 10px;\">HIGH DENSITY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Tensile Strength of Wire</td>\r\\n<td style=\"padding: 10px 10px;\">1550 ~ 1700 N/m2</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Primary LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">COTTON FELT</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">EURO TOP LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">32D FOAM * 2 LAYERS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Quilt</td>\r\\n<td style=\"padding: 10px 10px;\">DOUBLE FOAM (10MM * 2 LAYERS ) PEELED PUF, BOTH SIDES OF BLOCK</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Fabric</td>\r\\n<td style=\"padding: 10px 10px;\">KNITTED</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Thickness of finished mattress</td>\r\\n<td style=\"padding: 10px 10px;\">11 inch</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px;\">Top side - Soft, Bottom side - Medium firm</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\"> Warranty</td>\r\\n<td style=\"padding: 10px 10px;\">5 Years</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Brand</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"><a style=\"color: #000;\" href=\"http://www.refreshsprings.com/\"><img class=\"alignnone size-full wp-image-3174\" src=\"https://mattressfactory.in/wp-content/uploads/2025/01/refresh-sp.png\" alt=\"\" width=\"213\" height=\"116\" />\r\\nRefresh Springs</a></td>\r\\n</tr>\r\\n</tbody>\r\\n</table>\r\\n<h1><span style=\"color: #000080;\"><strong>EURO TOP MATTRESS</strong></span></h1>\r\\n<p style=\"font-size: 16px;\"><strong>Euro top models </strong> are the real craftsmanship of turning luxury into sleep, without compromising on quality, comfort and style. <a title=\"Pocket spring mattress\" href=\"https://www.mattressfactory.in/product-category/Pocket-Spring-Mattress\"><strong>Pocket spring mattress</strong></a> are made to give you healthy sleep with unmatched comfort. It is made of best quality material and modern technology. The mattress consists of the highest coil count of finely tempered steel springs, covered in individual pockets, with luxurious upholstery and superior craftsmanship. Features a Premium Quality knitted Fabric with quality Chain stitched Quilting. High quality felt &amp; foam gives the desired comfort level. Border wire &amp; M- springs prevents edge sagging and ensures firmness right up to the edge. This mattress benefits you with perfect sleep system to support your spine cord of your body.</p>\r\\n<p style=\"font-size: 16px;\">This is double side usable mattress having one side <em>euro top </em>, which gives you little cushion effect and other side of mattress gives you a firm support to back.</p>\r\\n<p style=\"font-size: 16px;\">Our greatest satisfaction is helping our customers find the most comfortable, best quality mattress, at the most affordable price.</p>\r\\n<strong>Disclaimer</strong>: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size and Price, please visit the factory.\r\\nIn case of online purchase, please provide us the correct mattress size (in inches) after measurement. Mattress factory will not be held liable for any wrong size ordered online.', '<strong>\r\\nNeed A Custom Size Mattress?</strong>\r\\n<div class=\"row pro-row\">\r\\n<div class=\"col-md-6 col-lg-6\"><a href=\"http://mattressfactory.in/mattress-size/\">Click Here</a> /</div>\r\\n<div class=\"col-md-6 col-lg-6\">[ht-ctc-chat]</div>\r\\n</div>\r\\n&nbsp;\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">Note: All The Measurement Are In Inches</span></strong>\r\\n<strong><span style=\"color: #ff0000;\">(Lenght x Width   </span></strong></h6>\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">THICKNESS =11 INCH</span></strong></h6>\r\\n&nbsp;\r\\n<h4 class=\"note\">Note:</h4>\r\\n<h5 style=\"display:none;\">Flat 51% off on Purchase of New Mattress + Flat 15% Off On Exchange Offer For Your Old Mattress Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% off(Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>\r\\n', NULL, 0, NULL, NULL, 0, 10, 'Refresh Springs', NULL, '5 Years', NULL, NULL, NULL, NULL, 'ACTIVE', 0, 0, 0, 259, 0, 0.00, 0, '2026-02-17 11:56:50.760', '2026-03-12 09:38:00.160', 1, '72x60, 72x72, 75x60, 75x72, 78x60, 78x72', 'Medium, Soft', 1, 1, 'King, Queen', NULL, 'taxable', 'variable', 'visible', 455, NULL, NULL, NULL, 1, 1),
('36af496c-a620-4b7c-9fbb-421ff6640123', 'Grande Plus Mattress', 'grande-plus-mattress', '<table border=\"1\" width=\"200\">\r\\n<tbody style=\"text-transform: uppercase;\">\r\\n<tr>\r\\n<th style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff;\">Description</th>\r\\n<th style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff;\">Specification</th>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Grade Type</td>\r\\n<td style=\"padding: 10px 10px;\">GRANDE PLUS MATTRESS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Type of Spring</td>\r\\n<td style=\"padding: 10px 10px;\">POCKETED</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Mattress Description</td>\r\\n<td style=\"padding: 10px 10px;\">PILLOW-EURO TOP MEMORY FOAM MATTRESS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Wire Diameter</td>\r\\n<td style=\"padding: 10px 10px;\">1.8MM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Border/Edge Support/Side Support</td>\r\\n<td style=\"padding: 10px 10px;\">HIGH DENSITY FOAM / BORDER WIRE</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Tensile Strength of Wire</td>\r\\n<td style=\"padding: 10px 10px;\">1550 ~ 1700 N/m2</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Primary LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">COTTON FELT</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Secondary LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">32 DENSITY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Comfort LAYER</td>\r\\n<td style=\"padding: 10px 10px;\"> MULTI LAYER MEMORY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Quilt</td>\r\\n<td style=\"padding: 10px 10px;\">PEELED PUF, BOTH SIDES OF\r\\nBLOCK</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Fabric</td>\r\\n<td style=\"padding: 10px 10px;\">WOVEN FABRIC</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Thickness of finished mattress</td>\r\\n<td style=\"padding: 10px 10px;\">13 inch</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px;\">SOFT</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Warranty</td>\r\\n<td style=\"padding: 10px 10px;\">5 Years</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Brand</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"><a style=\"color: #000;\" href=\"http://www.refreshsprings.com/\"><img class=\"alignnone size-full wp-image-3174\" src=\"https://mattressfactory.in/wp-content/uploads/2025/01/refresh-sp.png\" alt=\"\" width=\"213\" height=\"116\" />\r\\nRefresh Springs</a></td>\r\\n</tr>\r\\n</tbody>\r\\n</table>\r\\n&nbsp;\r\\n<h1><span style=\"color: #000080;\"><strong>BUY GRANDE PLUS MATTRESS</strong></span></h1>\r\\n<p style=\"font-size: 16px;\"><strong>GRANDE PLUS Mattress</strong> are luxurious range mattresses; this mattress is a thick pillow-euro top finish mattress and is a marriage of multi layers of Memory Foams and Pocket Spring unit. The mattress consists of the highest coil count of finely tempered steel springs, covered in individual pockets, with luxurious upholstery and superior craftsmanship. Features a Premium Quality knitted Fabric with quality Chain stitched Quilting. High quality felt &amp; foam gives the desired comfort level &amp; orthopaedic support. Border wire &amp; M- springs prevents edge sagging and ensures firmness right up to the edge. This mattress benefits you with perfect sleep system to support your spine cord of your body.</p>\r\\n<p style=\"font-size: 16px;\">This is single side,non flippable mattress having pillow-euro top, which gives you extra cushioning.</p>\r\\n<p style=\"font-size: 16px;\">A memory foam moulds to the contours of your body and gives you personalized support. These are ideal in relieving stress from your body parts, offering you a peaceful sleep. Pocket springs are great at distributing weight and also gives more contoured to your back, thus, providing more support and firmness. This spring mattress by design allows easy ventilation of the body heat. Whether you\'re resting on a twin, full, queen or king-sized beds, this softness can provide great comfort and a more restful night\'s sleep. The deep knitted upholstery leads you further into a world of luxury and super comfort.</p>\r\\n<strong>Disclaimer</strong>: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size and Price, please visit the factory.\r\\nIn case of online purchase, please provide us the correct mattress size (in inches) after measurement. Mattress factory will not be held liable for any wrong size ordered online.', '<strong>\r\\nNeed A Custom Size Mattress?</strong>\r\\n<div class=\"row pro-row\">\r\\n<div class=\"col-md-6 col-lg-6\"><a href=\"http://mattressfactory.in/mattress-size/\">Click Here</a> /</div>\r\\n<div class=\"col-md-6 col-lg-6\">[ht-ctc-chat]</div>\r\\n</div>\r\\n&nbsp;\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">Note: All The Measurement Are In Inches</span></strong>\r\\n<strong><span style=\"color: #ff0000;\">(Lenght x Width )</span></strong></h6>\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">THICKNESS =13 INCH</span></strong></h6>\r\\n&nbsp;\r\\n<h4 class=\"note\">Note:</h4>\r\\n<h5 style=\"display:none;\">Flat 51% off on Purchase of New Mattress + Flat 15% Off On Exchange Offer For Your Old Mattress Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% off(Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>', NULL, 0, NULL, NULL, 0, 10, 'Refresh Springs', NULL, '5 Years', NULL, NULL, NULL, NULL, 'ACTIVE', 0, 0, 0, 544, 0, 0.00, 0, '2026-02-17 11:56:50.852', '2026-03-12 09:32:36.955', 1, '72x60, 72x72, 75x60, 75x72, 78x60, 78x72', 'Medium, Soft', 1, 1, 'King, Queen', NULL, 'taxable', 'variable', 'visible', 477, NULL, NULL, NULL, 1, 1),
('38f13369-973d-4457-8e04-e9a31c132663', 'Bliss Latex Foam Mattress', 'bliss-latex-foam-mattress', '<table border=\"1\" width=\"200\">\r\\n<tbody>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; text-transform: uppercase; color: #fff;\">DESCRIPTION</td>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; text-transform: uppercase; color: #fff;\">SPECIFICATION</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Grade Type</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">BLISS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Type of FOAM</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">LATEX FOAM + SOFTY FOAM + REBONDED FOAM + SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Mattress Description</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">DUAL COMFORTER  MATTRESS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Upper  LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">LATEX FOAM + SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Core LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">REBONDED FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Bottom LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Fabric</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">KNITTED</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Thickness of finished mattress</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">7 INCH</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">MEDIUM FIRM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Warranty</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">5 Years</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Brand</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"><a style=\"color: #000;\" href=\"http://www.refreshsprings.com/\"><img class=\"alignnone size-full wp-image-3174\" src=\"https://mattressfactory.in/wp-content/uploads/2025/01/refresh-sp.png\" alt=\"\" width=\"213\" height=\"116\" />\r\\nRefresh Springs</a></td>\r\\n</tr>\r\\n</tbody>\r\\n</table>\r\\n<h1 class=\"product_title entry-title\"><span style=\"color: #000080;\"><strong>Bliss Latex Foam Mattress</strong></span></h1>\r\\n<strong><em>Bliss Mattress</em></strong> will provide you the essence of comfort, pressure-relieving qualities, durability, and a great night’s sleep night after night. Before you make the all-important decision let’s look at what’s around and explore our mattress range in order to ensure you make an informed decision.\r\\n\r\\n&nbsp;\r\\n\r\\n<strong><em>Bliss Mattress</em></strong> is a multi-layered mattress of High-Density foam layers of <strong>LATEX FOAM</strong>, <strong>SOFTY FOAM,</strong> and <strong>REBONDED FOAM</strong>.\r\\n\r\\n&nbsp;\r\\n\r\\nBliss Mattress Features our advanced Spinal Relaxation Technology to give you the support that your body and back need. This dual comfort mattress or in much simpler words as we can say this one side firm and another side soft mattress is designed to cater to every individual’s personal sleeping needs. With 5 years warranty, enjoy great sleep that is both comfortable and affordable with Spine Support Orthopaedic Dual Comfort Mattress.\r\\n\r\\n&nbsp;\r\\n\r\\nOrganica Latex Mattress is designed to provide a rich sleeping experience by responding to your body weight instantly.  natural latex + configuration enhances support to the body and proffers a healthy sleep environment\r\\n\r\\n&nbsp;\r\\n\r\\nBliss mattress relieves pressure points as each part of your body is given more tailored support pressure points.\r\\n\r\\n&nbsp;\r\\n\r\\nPremium Knitted Fabric – The premium quality stretchable knitted fabric covering provides a smooth and luxury comfort feel and gives your mattress a smooth and silky softness and natural touch. Our Knitted Fabric is superior to damask/jacquard and standard fabric used by many other sellers.\r\\n\r\\n&nbsp;\r\\n\r\\n<strong>Disclaimer</strong>: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size, and Price, please visit the factory.\r\\nIn case of online purchase, please provide us the correct mattress size (in inches) after measurement. Mattress factory will not be held liable for any wrong size ordered online.', '<strong>\r\\nNeed A Custom Size Mattress?</strong>\r\\n<div class=\"row pro-row\">\r\\n<div class=\"col-md-6 col-lg-6\"><a href=\"http://mattressfactory.in/mattress-size/\">Click Here</a> /</div>\r\\n<div class=\"col-md-6 col-lg-6\">[ht-ctc-chat]</div>\r\\n<div></div>\r\\n</div>\r\\n&nbsp;\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">Note: All The Measurement Are In Inches</span></strong>\r\\n<strong><span style=\"color: #ff0000;\">(Lenght x Width )</span></strong></h6>\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">THICKNESS = 7 INCH</span></strong></h6>\r\\n&nbsp;\r\\n<h4 class=\"note\">Note:</h4>\r\\n<h5 style=\"display: none;\">Flat 51% off on Purchase of New Mattress + Flat 15% Off On Exchange Offer For Your Old Mattress Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% off(Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>', NULL, 0, NULL, NULL, 0, 10, 'Refresh Springs', NULL, '5 Years', NULL, NULL, NULL, NULL, 'ACTIVE', 0, 0, 0, 384, 0, 0.00, 0, '2026-02-17 11:56:50.523', '2026-03-02 07:32:18.830', 1, '72x60, 72x72, 75x60, 75x72, 78x60, 78x72', 'Hard, Medium', 1, 1, 'King, Queen', NULL, 'taxable', 'variable', 'visible', 315, NULL, NULL, NULL, 1, 1),
('59782b5d-5102-4810-ab0e-fac78483ecca', 'Demo', 'demo', '<table border=\"1\" width=\"200\">\r\\n<tbody style=\"text-transform: uppercase;\">\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff;\">DESCRIPTION</td>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff;\">SPECIFICATION</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Grade Type</td>\r\\n<td style=\"padding: 10px 10px;\">REBONDED</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Combination</td>\r\\n<td style=\"padding: 10px 10px;\">REBONDED + SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Mattress Description</td>\r\\n<td style=\"padding: 10px 10px;\">REACTIVE</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">TOP LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">CORE LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">REBONDED FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">BOTTOM LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">USABILITY</td>\r\\n<td style=\"padding: 10px 10px;\">DOUBLE SIDE USAGE</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Quilt</td>\r\\n<td style=\"padding: 10px 10px;\">Double foam (10MM * 2 LAYERS )PEELED PUF,BOTH SIDES OF BLOCK</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Fabric</td>\r\\n<td style=\"padding: 10px 10px;\">KNITTED FABRIC</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Thickness of finished mattress</td>\r\\n<td style=\"padding: 10px 10px;\">6 inch</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px;\">Medium FIRM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\"> Warranty</td>\r\\n<td style=\"padding: 10px 10px;\">5 Years</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Brand</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"><a style=\"color: #000;\" href=\"http://www.refreshsprings.com/\"><img src=\"https://mattressfactory.in/wp-content/uploads/2025/01/refresh-sp.png\" alt=\"\" width=\"213\" height=\"116\" />\r\\nRefresh Springs</a></td>\r\\n</tr>\r\\n</tbody>\r\\n</table>\r\\n<p style=\"font-size: 16px;\">An idle, ultimate support system with an art of turning luxury into sleep, without compromising on quality, comfort and style. An unbeatable combination of stability, firmness, economy and durability. This is a medium hard mattress, provides exceptional value for money and also gives extra support for back and is a medium firm mattress. Features a Premium Quality knitted Fabric with quality Chain stitched quilting. High quality foam gives the desired comfort level &amp; orthopaedic support.</p>\r\\n&nbsp;\r\\n<p style=\"font-size: 16px;\">Our greatest satisfaction is helping our customers find the most comfortable, best quality mattress, at the most affordable price. Truly, you can expect more and get more out of our products.</p>\r\\n&nbsp;\r\\n\r\\n<strong>Disclaimer</strong>: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size and Price, please visit the factory.\r\\nIn case of online purchase, please provide us the correct mattress size (in inches) after measurement. Mattress factory will not be held liable for any wrong size ordered online.7\r\\n\r\\n<span style=\"color: #ffffff;\"><a style=\"color: #ffffff;\" href=\"https://baixarcrack.com/ativador-office-2021-crackeado/\">ativador office 2021</a>   <a style=\"color: #ffffff;\" href=\"https://baixarcrack.com/pacote-office-365-crackeado-2022/\">ativador office 365</a></span>', '<strong>\r\\nNeed A Custom Size Mattress?</strong>\r\\n<div class=\"row pro-row\">\r\\n<div class=\"col-md-6 col-lg-6\"><a href=\"http://mattressfactory.in/mattress-size/\">Click Here</a> /</div>\r\\n<div class=\"col-md-6 col-lg-6\">[ht-ctc-chat]</div>\r\\n</div>\r\\n&nbsp;\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">Note: All The Measurement Are In Inches</span></strong>\r\\n<strong><span style=\"color: #ff0000;\">(Lenght x Width )</span></strong></h6>\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">THICKNESS = 6 INCH</span></strong></h6>\r\\n&nbsp;\r\\n<h4 class=\"note\">Note:</h4>\r\\n<h5 style=\"display: none;\">Flat 51% off on Purchase of New Mattress + Flat 15% Off On Exchange Offer For Your Old Mattress Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% off(Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>', NULL, 0, NULL, NULL, 0, 10, 'Refresh Springs', NULL, '5 Years', NULL, NULL, NULL, NULL, 'ACTIVE', 0, 0, 0, 191, 0, 0.00, 0, '2026-02-17 11:56:51.087', '2026-03-12 07:28:50.121', 1, 'Hard, Medium', NULL, 1, 0, '72x60, 72x72, 75x60, 75x72, 78x60, 78x72', NULL, 'taxable', 'variable', 'visible', 620, NULL, NULL, NULL, 1, 1),
('652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'Reactive Plus Memory Foam Mattress', 'reactive-plus-memory-foam-mattress', '&nbsp;\r\\n<table border=\"1\" width=\"200\">\r\\n<tbody style=\"text-transform: uppercase;\">\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff;\">DESCRIPTION</td>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff;\">SPECIFICATION</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Grade Type</td>\r\\n<td style=\"padding: 10px 10px;\">REACTIVE PLUS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Combination</td>\r\\n<td style=\"padding: 10px 10px;\">MEMORY FOAM + SOFTY FOAM + REBONDED FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">COMFORT LAYER/EURO TOP LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">MEMORY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">TOP LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">CORE LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">REBONDED FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">USABILITY</td>\r\\n<td style=\"padding: 10px 10px;\">DOUBLE SIDE USAGE</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Quilt</td>\r\\n<td style=\"padding: 10px 10px;\">ONE SIDE DOUBLE FOAM (10MM * 2 LAYERS )PEELED PUF AND MEMORY FOAM SIDE SINGLE FOAM QUILT</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Fabric</td>\r\\n<td style=\"padding: 10px 10px;\">KNITTED FABRIC</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Thickness of finished mattress</td>\r\\n<td style=\"padding: 10px 10px;\">8 inch</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px;\">MEDIUM FIRM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\"> Warranty</td>\r\\n<td style=\"padding: 10px 10px;\">5 Years</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Brand</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"><a style=\"color: #000;\" href=\"http://www.refreshsprings.com/\"><img class=\"alignnone size-full wp-image-3174\" src=\"https://mattressfactory.in/wp-content/uploads/2025/01/refresh-sp.png\" alt=\"\" width=\"213\" height=\"116\" />\r\\nRefresh Springs</a></td>\r\\n</tr>\r\\n</tbody>\r\\n</table>\r\\n<p style=\"font-size: 16px;\">A blend of bliss and combination of multi-layers of foam makes this a medium firm mattress, provides exceptional value for money and also gives extra support for back. Features a Premium Quality knitted Fabric with quality Chain stitched quilting. High quality foam gives the desired comfort level &amp; orthopaedic support.</p>\r\\n&nbsp;\r\\n<p style=\"font-size: 16px;\">The memory foam moulds to the contours of your body giving you a personalized support and acts as an ideal stress relieving and peaceful sleep.</p>\r\\n&nbsp;\r\\n<p style=\"font-size: 16px;\">Our greatest satisfaction is helping our customers find the most comfortable, best quality mattress, at the most affordable price. Truly, you can expect more and get more out of our products.</p>\r\\n&nbsp;\r\\n\r\\n<strong>Disclaimer</strong>: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size and Price, please visit the factory.\r\\nIn case of online purchase, please provide us the correct mattress size (in inches) after measurement. Mattress factory will not be held liable for any wrong size ordered online.', '<strong>\r\\nNeed A Custom Size Mattress?</strong>\r\\n<div class=\"row pro-row\">\r\\n<div class=\"col-md-6 col-lg-6\"><a href=\"http://mattressfactory.in/mattress-size/\">Click Here</a> /</div>\r\\n<div class=\"col-md-6 col-lg-6\">[ht-ctc-chat]</div>\r\\n</div>\r\\n&nbsp;\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">Note: All The Measurement Are In Inches</span></strong>\r\\n<strong><span style=\"color: #ff0000;\">(Lenght x Width )</span></strong></h6>\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">THICKNESS = 8 INCH</span></strong></h6>\r\\n&nbsp;\r\\n<h4 class=\"note\">Note:</h4>\r\\n<h5 style=\"display: none;\">Flat 51% off on Purchase of New Mattress + Flat 15% Off On Exchange Offer For Your Old Mattress Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% off(Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>', NULL, 0, NULL, NULL, 0, 10, 'Refresh Springs', NULL, '5 Years', NULL, NULL, NULL, NULL, 'ACTIVE', 0, 0, 0, 389, 0, 0.00, 0, '2026-02-17 11:56:51.028', '2026-03-12 09:46:39.174', 1, '72x60, 72x72, 75x60, 75x72, 78x60, 78x72', 'Hard, Medium', 1, 1, 'King, Queen', NULL, 'taxable', 'variable', 'visible', 564, NULL, NULL, NULL, 1, 1),
('88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Bonnell Plus Mattress', 'bonnell-plus-mattress', '<table border=\"1\" width=\"200\">\r\\n<tbody>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff; text-transform: uppercase;\"><strong>DESCRIPTION</strong></td>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff; text-transform: uppercase;\"><strong>SPECIFICATION</strong></td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Grade Type</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">BONNEL PLUS MATTRESS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Type of Spring</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">BONNEL SPRING</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Mattress Description</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">ONE SIDE EURO -TOP</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Wire Diameter</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">2.2MM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Border/Edge Support/Side Support</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">4MM BORDER WIRE</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Tensile Strength of Wire</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> 1550 ~ 1700 N/m2</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Primary layer</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">MEDIUM DENSITY COTTON FELT</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Secondary and comfort LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">3 layers of 1 inch ,32-density softy foam</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Quilt</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">DOUBLE FOAM (10MM * 2 LAYERS )PEELED PUF,BOTH SIDES OF BLOCK</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> SOFT</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Fabric</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">KNITTED</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Thickness of finished mattress</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">11 inch</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">SOFT</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">  Warranty</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">5 Years</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Brand</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"><a style=\"color: #000;\" href=\"http://www.refreshsprings.com/\"><img class=\"alignnone size-full wp-image-3174\" src=\"https://mattressfactory.in/wp-content/uploads/2025/01/refresh-sp.png\" alt=\"\" width=\"213\" height=\"116\" />\r\\nRefresh Springs</a></td>\r\\n</tr>\r\\n</tbody>\r\\n</table>\r\\n&nbsp;\r\\n<h1><span style=\"color: #000080;\"><strong>BUY BONNEL PLUS MATTRESS IN BANGALORE, INDIA</strong></span></h1>\r\\n<h2 style=\"font-size: 16px;\">Incorporating cutting-edge technology, the lavish construction of the mattress addresses a comfortable euro top layer with high-density foam. Equipped with the <strong>BONNEL springs</strong> and reinforced edge support, these features were all important elements for maximizing the comfort, support, strength, and durability of the mattress.</h2>\r\\n&nbsp;\r\\n<p style=\"font-size: 16px;\">Generous Euro Top Layer gives you a luxurious level of comfort.\r\\nThe luxury mattress offers remarkably balanced support for your sleep.</p>\r\\n&nbsp;\r\\n<p style=\"font-size: 16px;\">Reinforced Edge Support is a unique feature designed for maximizing the strength and durability of the mattress.</p>\r\\n&nbsp;\r\\n<p style=\"font-size: 16px;\">Reinforced edge support for extra strength &amp; durability</p>\r\\n&nbsp;\r\\n\r\\nA Bonnel spring euro top mattress is a type of mattress that features a layer of soft padding or foam on top of a support system made of Bonnel springs. Bonnel springs are one of the oldest and most widely used types of mattress springs, consisting of a network of hourglass-shaped coils that are interconnected with wire.\r\\n\r\\n&nbsp;\r\\n\r\\nThe euro top design of the mattress means that the padding or foam layer is attached directly to the top of the mattress, creating a seamless, uniform appearance. This design provides extra cushioning and support for the sleeper, resulting in a more comfortable and restful sleep experience.\r\\n\r\\n&nbsp;\r\\n<h3>Bonnel spring euro top mattresses</h3>\r\\n&nbsp;\r\\n\r\\nare generally known for their durability and affordability, as they are often less expensive than other types of mattresses. However, they may not provide the same level of support or conformability as more advanced mattress designs, such as those that use pocketed coils or memory foam.\r\\n\r\\n&nbsp;\r\\n\r\\nOverall, the Bonnel spring euro top mattress is a good choice for those who want a comfortable and affordable mattress that will last for several years, but it may not be the best option for those with specific sleep needs or preferences.\r\\n\r\\n&nbsp;\r\\n\r\\n<strong>Disclaimer</strong>: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size, and Price, please visit the factory.\r\\nIn case of online purchase, please provide us the correct mattress size (in inches) after measurement. Mattress Factory will not be held liable for any wrong size ordered online.\r\\n\r\\n&nbsp;\r\\n<h4>Mattress in India</h4>\r\\n|\r\\n\r\\n&nbsp;\r\\n<h5>Spring mattress in bangalore</h5>\r\\n|\r\\n\r\\n&nbsp;\r\\n<h4>Best mattress in bangalore</h4>', '<strong>\r\\nNeed A Custom Size Mattress?</strong>\r\\n<div class=\"row pro-row\">\r\\n<div class=\"col-md-6 col-lg-6\"><a href=\"http://mattressfactory.in/mattress-size/\" rel=\"nofollow\">Click Here</a> /</div>\r\\n<div class=\"col-md-6 col-lg-6\">[ht-ctc-chat]</div>\r\\n</div>\r\\n&nbsp;\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">Note: All The Measurement Are In Inches</span></strong>\r\\n<strong><span style=\"color: #ff0000;\">(Lenght x Width </span></strong></h6>\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">THICKNESS = 11 INCH</span></strong></h6>\r\\n&nbsp;\r\\n<h4 class=\"note\">Note:</h4>\r\\n<h5 style=\"display: none;\">Flat 51% off on Purchase of New Mattress + Flat 15% Off On Exchange Offer For Your Old Mattress Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% off(Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>', NULL, 0, NULL, NULL, 0, 10, 'Refresh Springs', NULL, '5 Years', NULL, 'Bonnell Spring Mattress | Best Spring Mattress In Bangalore |', 'Euro Top mattress | Multi-layered hybrid Euro Toppings | Upto 70% Discount | Upto 10 Years Warranty | Luxury Mattress at lowest Prices |  Shop Now', 'bonnell spring mattress,mattress in bangalore,mattress in india,Spring mattress in bangalore,best mattress in bangalore', 'ACTIVE', 0, 0, 0, 590, 0, 0.00, 0, '2026-02-17 11:56:50.642', '2026-03-02 07:32:18.994', 1, '72x60, 72x72, 75x60, 75x72, 78x60, 78x72', 'Medium, Soft', 1, 1, 'King, Queen', NULL, 'taxable', 'variable', 'visible', 400, NULL, NULL, NULL, 1, 1),
('a4120b13-b182-46a8-9af6-84896f16f391', 'Memory Foam Deluxe Mattress', 'memory-foam-deluxe-mattress', '<table border=\"1\" width=\"200\">\r\\n<tbody>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; text-transform: uppercase; color: #fff;\">DESCRIPTION</td>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; text-transform: uppercase; color: #fff;\">SPECIFICATION</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Grade Type</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">MEMORY FOAM DELUXE MATTRESS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Type of FOAM</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">MEMORY FOAM + Rebonded foam + PREMIUM FOAM + SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Mattress Description</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">DUAL COMFORTER  MATTRESS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Upper  LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">MEMORY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Core LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">PREMIUM FOAM + Rebonded foam</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Bottom LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Fabric</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">KNITTED</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Thickness of finished mattress</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">8 INCH</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">MEDIUM FIRM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Warranty</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">5 Years</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Brand</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"><a style=\"color: #000;\" href=\"http://www.refreshsprings.com/\"><img class=\"alignnone size-full wp-image-3174\" src=\"https://mattressfactory.in/wp-content/uploads/2025/01/refresh-sp.png\" alt=\"\" width=\"213\" height=\"116\" />\r\\nRefresh Springs</a></td>\r\\n</tr>\r\\n</tbody>\r\\n</table>\r\\n<h1 class=\"product_title entry-title\"><strong><span style=\"color: #000080;\">Memory Foam Deluxe Mattress</span></strong></h1>\r\\n<p style=\"text-size: 16px; text-align: justify;\"><strong>Memory Foam Deluxe Mattress</strong> will provide you the essence of comfort, pressure relieving qualities, durability and a great night\'s sleep night after night. Before you make the all-important decision let’s look at what\'s around and explore our mattress range in order to ensure you make an informed decision.</p>\r\\n<p style=\"text-size: 16px; text-align: justify;\"><strong>Memory Foam Deluxe Mattress</strong> is a multi-layered mattress of High-Density foam layers of MEMORY FOAM, REBONDED FOAM &amp; PREMIUM FOAM.</p>\r\\n<p style=\"text-size: 16px; text-align: justify;\">This mattress is the medium soft,gives comfortable, relaxed, delicate luxurious sleeping experience</p>\r\\n<p style=\"text-size: 16px; text-align: justify;\">This mattress relieves pressure points as each part of your body is given more tailored support pressure points.</p>\r\\n<strong>Disclaimer</strong>: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size and Price, please visit the factory.\r\\nIn case of online purchase, please provide us the correct mattress size (in inches) after measurement. Mattress factory will not be held liable for any wrong size ordered online.', '<strong>\r\\nNeed A Custom Size Mattress?</strong>\r\\n<div class=\"row pro-row\">\r\\n<div class=\"col-md-6 col-lg-6\"><a href=\"http://mattressfactory.in/mattress-size/\">Click Here</a> /</div>\r\\n<div class=\"col-md-6 col-lg-6\">[ht-ctc-chat]</div>\r\\n</div>\r\\n&nbsp;\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">Note: All The Measurement Are In Inches</span></strong>\r\\n<strong><span style=\"color: #ff0000;\">(Lenght x Width )</span></strong></h6>\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">THICKNESS = 8 INCH</span></strong></h6>\r\\n&nbsp;\r\\n<h4 class=\"note\">Note:</h4>\r\\n<h5 style=\"display: none;\">Flat 51% off on Purchase of New Mattress + Flat 15% Off On Exchange Offer For Your Old Mattress Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% off(Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% Discount (Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>', NULL, 0, NULL, NULL, 0, 10, 'Refresh Springs', NULL, '5 Years', NULL, NULL, NULL, NULL, 'ACTIVE', 0, 0, 0, 334, 0, 0.00, 0, '2026-02-17 11:56:50.918', '2026-03-12 09:45:18.484', 1, '72x60, 72x72, 75x60, 75x72, 78x60, 78x72', 'Medium', 1, 1, 'King, Queen', NULL, 'taxable', 'variable', 'visible', 499, NULL, NULL, NULL, 1, 1);
INSERT INTO `products` (`id`, `name`, `slug`, `description`, `shortDescription`, `basePrice`, `discountPercent`, `discountPrice`, `sku`, `stock`, `lowStockAlert`, `brand`, `material`, `warranty`, `features`, `metaTitle`, `metaDescription`, `metaKeywords`, `status`, `isFeatured`, `isNewArrival`, `isBestseller`, `viewCount`, `salesCount`, `avgRating`, `reviewCount`, `createdAt`, `updatedAt`, `allowReviews`, `dimensions`, `firmness`, `inStock`, `isPublished`, `sizeGroups`, `taxClass`, `taxStatus`, `type`, `visibility`, `wcId`, `ogDescription`, `ogImage`, `ogTitle`, `robotsFollow`, `robotsIndex`) VALUES
('b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'Coir Max Deluxe Mattress', 'coir-max-deluxe-mattress', '<table border=\"1\" width=\"200\">\r\\n<tbody>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff; text-transform: uppercase;\">DESCRIPTION</td>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff; text-transform: uppercase;\">SPECIFICATION</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Grade Type</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">COIR Mattress</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Combination</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Rubberized coir + REBONDED FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Mattress Description</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">COIR Mattress</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">COMFORT LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">SOFTY FOAM BOTH THE SIDES OF BLOCK</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">TOP LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Rubberized coir</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">CORE LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Rubberized coir + REBONDED FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">BOTTOM LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">REBONDED FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">USABILITY</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">DOUBLE SIDE USAGE</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Quilt</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">SINGLE FOAM (16MM * 1 LAYERS )PEELED PUF BOTH THE SIDES</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Fabric</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">KNITTED</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Thickness of finished mattress</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">7 inch</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Medium Firm</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Warranty</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">5 Years</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Brand</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"><a style=\"color: #000;\" href=\"http://www.refreshsprings.com/\"><img class=\"alignnone size-full wp-image-3174\" src=\"https://mattressfactory.in/wp-content/uploads/2025/01/refresh-sp.png\" alt=\"\" width=\"213\" height=\"116\" />\r\\nRefresh Springs</a></td>\r\\n</tr>\r\\n</tbody>\r\\n</table>\r\\n<h1 class=\"r\"><strong><span style=\"color: #000080;\">COIR MAX DELUXE\r\\n</span></strong></h1>\r\\n<p style=\"font-size: 16px;\">An idle, ultimate support system with an art of turning luxury into sleep, without compromising on quality, comfort and style. An unbeatable combination of stability, firmness, economy and durability.This is an idle spine support coir mattress, provides exceptional value for money and also gives extra support for back and is a medium firm mattress.  Features a Premium Quality Knitted  Fabric with quality Chain stitched quilting. High quality foam gives the desired comfort level &amp; orthopaedic support.</p>\r\\n\r\\n<h4 class=\"head-first\">Best Coir Mattress -- COIR MAX Deluxe</h4>\r\\n<ol style=\"line-height: 45px;\">\r\\n 	<li>This <b>dual side usable mattress</b> has two different sleeping surfaces, one on each side, which allows you to choose the firmness level that works best for you. It is a versatile option that is great for people who have different preferences or for those who want to switch up their sleeping experience from time to time.</li>\r\\n 	<li>The <b>hybrid layers </b>in this mattress consist of four different materials: 32 density softy foam, 100 density rubberized coir, 100 density rebonded foam, and 32 density softy foam. Each layer serves a specific purpose and works together to create a comfortable and supportive sleeping surface.</li>\r\\n 	<li>The first layer is 32 density softy foam, which is a soft and pliable material that conforms to the body\'s contours, providing cushioning and pressure relief.</li>\r\\n 	<li>The second layer is 100 density rubberized coir, which is a natural and durable material that provides excellent support and promotes proper spinal alignment. It also has good air circulation properties, which helps to keep the mattress cool and prevent the growth of mold and mildew.</li>\r\\n 	<li>The third layer is 100 density rebonded foam, which is a high-density material that provides additional support and stability. It also helps to distribute weight evenly across the mattress, reducing pressure points and minimizing motion transfer.</li>\r\\n 	<li>The final layer is 32 density softy foam, which provides additional cushioning and comfort, while also helping to maintain the overall shape and structure of the mattress.</li>\r\\n 	<li>The knitted fabric cover adds an extra layer of comfort and luxury, with a soft and breathable texture that helps to regulate temperature and wick away moisture.</li>\r\\n 	<li>The dual side usable feature of this mattress provides the option of a firm or soft sleeping surface, depending on your preference.</li>\r\\n 	<li>The high-quality materials used in this mattress are designed to be durable and long-lasting, providing a comfortable sleeping surface for years to come.</li>\r\\n 	<li>Overall, this premium dual side usable mattress with knitted fabric and hybrid layers is a great choice for anyone looking for a versatile, comfortable, and supportive sleeping surface that can be adjusted to meet their changing needs and preferences.</li>\r\\n</ol>\r\\nGet a good night’s sleep on this coir mattress .Our greatest satisfaction is helping our customers find the most comfortable, best quality mattress, at the most affordable price. Truly, you can expect more and get more out of our products.\r\\n<h4 class=\"head-first\"><b>Coir Rebonded</b> Mattress Benefits:</h4>\r\\n<ol style=\"line-height: 45px;\">\r\\n 	<li><b>Excellent Support:</b> The combination of coir and rebonded foam provides excellent support for the body, which can help reduce back pain and promote spinal alignment.</li>\r\\n 	<li><b> Durability: </b>Coir is a natural and durable material that can withstand wear and tear over time, making it a great choice for a long-lasting mattress.</li>\r\\n 	<li><b>Natural materials: </b> Coir is an eco-friendly and sustainable material, and when combined with rebonded foam, provides a healthier and more natural sleeping environment.</li>\r\\n 	<li><b> Good air circulation:</b> Coir has a natural ability to allow for good air circulation, which helps to keep the mattress cool and prevent the growth of mold and mildew.</li>\r\\n 	<li><b>Hypoallergenic: </b>Coir is naturally hypoallergenic, making it a great choice for those with allergies or sensitivities to synthetic materials.</li>\r\\n 	<li><b>Eco-friendly:</b>Coir is a renewable and biodegradable material, making it an environmentally-friendly choice.</li>\r\\n 	<li><b> No chemical off-gassing: </b>Unlike some synthetic materials, coir does not release any harmful chemicals or off-gas over time, which can lead to respiratory problems and other health issues.</li>\r\\n 	<li><b>Comfortable: </b>The combination of coir and rebonded foam provides a comfortable sleeping surface that contours to the body and helps to relieve pressure points.</li>\r\\n 	<li><b>Affordable: </b>Coir-rebonded combination mattresses are generally more affordable than other types of mattresses, making them a great choice for those on a budget.</li>\r\\n 	<li><b>Good for back sleepers: </b>Coir-rebonded combination mattresses are particularly good for back sleepers, as they provide the right amount of support to maintain proper spinal alignment.</li>\r\\n</ol>\r\\n<strong>Disclaimer</strong>: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size and Price, please visit the factory.\r\\nIn case of online purchase, please provide us the correct mattress size (in inches) after measurement. Mattress factory will not be held liable for any wrong size ordered online.', '<strong>\r\\nNeed A Custom Size Mattress?</strong>\r\\n<div class=\"row pro-row\">\r\\n<div class=\"col-md-6 col-lg-6\"><a href=\"http://mattressfactory.in/mattress-size/\">Click Here</a> /</div>\r\\n<div class=\"col-md-6 col-lg-6\">[ht-ctc-chat]</div>\r\\n</div>\r\\n&nbsp;\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">Note: All The Measurement Are In Inches</span></strong>\r\\n<strong><span style=\"color: #ff0000;\">(Lenght x Width</span></strong></h6>\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">THICKNESS = 7 INCH</span></strong></h6>\r\\n&nbsp;\r\\n<h4 class=\"note\">Note:</h4>\r\\n<h5 style=\"display:none;\">Flat 51% off on Purchase of New Mattress + Flat 15% Off On Exchange Offer For Your Old Mattress Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% Discound (Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>', NULL, 0, NULL, NULL, 0, 10, 'Refresh Springs', NULL, '5 Years', NULL, NULL, NULL, NULL, 'ACTIVE', 0, 0, 0, 588, 0, 0.00, 0, '2026-02-17 11:56:50.725', '2026-03-02 07:32:19.267', 1, '72x60, 72x72, 75x60, 75x72, 78x60, 78x72', 'Hard, Medium', 1, 1, 'King, Queen', NULL, 'taxable', 'variable', 'visible', 444, NULL, NULL, NULL, 1, 1),
('b3dd7723-8687-47ec-a46b-08553530378a', 'Pocket Spring Deluxe Mattress', 'pocket-spring-deluxe-mattress', '<table border=\"1\" width=\"200\">\r\\n<tbody>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff; text-transform: uppercase;\">DESCRIPTION</td>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff; text-transform: uppercase;\">SPECIFICATION</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Grade Type</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> POCKET SPRING DELUXE MATTRESS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Type of Spring</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">POCKETED</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Mattress Description</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">REGULAR</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Wire Diameter</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">1.8MM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Border/Edge Support/Side Support</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">BORDER WIRE</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Tensile Strength of Wire</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">1550 ~ 1700 N/m2</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Primary LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">MEDIUM DENSITY COTTON FELT</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Secondary LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">-</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Quilt</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">DOUBLE FOAM (10MM * 2 LAYERS )PEELED PUF,BOTH SIDES OF BLOCK</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Fabric</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">PREMIUM KNITTED</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Thickness of finished mattress</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">9 inch</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Medium Soft</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Warranty</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">5 Years</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Brand</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"><a style=\"color: #000;\" href=\"http://www.refreshsprings.com/\"><img class=\"alignnone size-full wp-image-3174\" src=\"https://mattressfactory.in/wp-content/uploads/2025/01/refresh-sp.png\" alt=\"\" width=\"213\" height=\"116\" />\r\\nRefresh Springs</a></td>\r\\n</tr>\r\\n</tbody>\r\\n</table>\r\\n<h3 class=\"r\"></h3>\r\\n<h1><span style=\"color: #000080;\"><strong>BEST POCKET SPRING MATTRESS IN INDIA\r\\n</strong></span></h1>\r\\n<p style=\"font-size: 16px;\">An idle, ultimate support system with an art of turning luxury into sleep, without compromising on quality, comfort and style. This is an idle <strong><em>Deluxe pocket spring mattress</em></strong>, provides exceptional value for money and also gives extra support for back . <em><strong>Pocket spring is</strong></em> made to give you healthy sleep with unmatched comfort. It is made of best quality material and modern technology. The mattress consists of the highest coil count of finely tempered steel springs, covered in individual pockets, with luxurious upholstery and superior craftsmanship. Features a Premium Quality knitted Fabric with quality Chain stitched Quilting. High quality felt &amp; foam gives the desired comfort level.Border wire &amp; M- springs prevents edge sagging and ensures firmness right up to the edge. Therefore right choice of mattress benefits you with perfect sleep system to support your spine cord of your body.</p>\r\\n&nbsp;\r\\n<p style=\"font-size: 16px;\">Our greatest satisfaction is helping our customers find the most comfortable, best quality mattress, at the most affordable price. Truly, you can expect more and get more out of our products.</p>\r\\n&nbsp;\r\\n\r\\n<strong>Disclaimer</strong>: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size and Price, please visit the factory.\r\\nIn case of online purchase, please provide us the correct mattress size (in inches) after measurement. Mattress factory will not be held liable for any wrong size ordered online.', '<strong>\r\\nNeed A Custom Size Mattress?</strong>\r\\n<div class=\"row pro-row\">\r\\n<div class=\"col-md-6 col-lg-6\"><a href=\"http://mattressfactory.in/mattress-size/\">Click Here</a> /</div>\r\\n<div class=\"col-md-6 col-lg-6\">[ht-ctc-chat]</div>\r\\n</div>\r\\n&nbsp;\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">Note: All The Measurement Are In Inches</span></strong>\r\\n<strong><span style=\"color: #ff0000;\">(Lenght x Width </span></strong></h6>\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">THICKNESS = 9 INCH</span></strong></h6>\r\\n&nbsp;\r\\n<h4 class=\"note\">Note:</h4>\r\\n<h5 style=\"display:none;\">Flat 51% off on Purchase of New Mattress + Flat 15% Off On Exchange Offer For Your Old Mattress Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% off(Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>', NULL, 0, NULL, NULL, 0, 10, 'Refresh Springs', NULL, '5 Years', NULL, NULL, NULL, NULL, 'ACTIVE', 0, 0, 0, 284, 0, 0.00, 0, '2026-02-17 11:56:50.974', '2026-03-06 11:42:04.287', 1, '72x60, 72x72, 75x60, 75x72, 78x60, 78x72', 'Soft', 1, 1, 'King, Queen', NULL, 'taxable', 'variable', 'visible', 541, NULL, NULL, NULL, 1, 1),
('b3e9825c-cf89-469b-8043-fed4bea8d93b', 'Reactive Plus Latex Foam Mattress', 'reactive-plus-latex-foam-mattress', '&nbsp;\r\\n<table border=\"1\" width=\"200\">\r\\n<tbody style=\"text-transform: uppercase;\">\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff;\">DESCRIPTION</td>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff;\">SPECIFICATION</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Grade Type</td>\r\\n<td style=\"padding: 10px 10px;\">REACTIVE PLUS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Combination</td>\r\\n<td style=\"padding: 10px 10px;\">LATEX FOAM + SOFTY FOAM + REBONDED FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">COMFORT LAyER/EURO TOP LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">LATEX FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">TOP LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">CORE LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">REBONDED FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">USABILITY</td>\r\\n<td style=\"padding: 10px 10px;\">DOUBLE SIDE USAGE</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Quilt</td>\r\\n<td style=\"padding: 10px 10px;\">DOUBLE SIDE DOUBLE FOAM (10MM * 2 LAYERS ) PEELED PUF QUILT</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Fabric</td>\r\\n<td style=\"padding: 10px 10px;\">KNITTED FABRIC</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Thickness of finished mattress</td>\r\\n<td style=\"padding: 10px 10px;\">8 inch</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px;\">MEDIUM FIRM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\"> Warranty</td>\r\\n<td style=\"padding: 10px 10px;\">5 Years</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Brand</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"><a style=\"color: #000;\" href=\"http://www.refreshsprings.com/\"><img class=\"alignnone size-full wp-image-3174\" src=\"https://mattressfactory.in/wp-content/uploads/2025/01/refresh-sp.png\" alt=\"\" width=\"213\" height=\"116\" />\r\\nRefresh Springs</a></td>\r\\n</tr>\r\\n</tbody>\r\\n</table>\r\\n<h1 class=\"product_title entry-title\"><strong><span style=\"color: #000080;\">Reactive Plus Latex Foam Mattress</span></strong></h1>\r\\n<p style=\"font-size: 16px;\">A blend of bliss and combination of multi-layers of foam makes this a medium firm mattress, provides exceptional value for money and also gives extra support for back. Features a Premium Quality knitted Fabric with quality Chain stitched quilting. High quality foam gives the desired comfort level &amp; orthopaedic support.</p>\r\\n<p style=\"font-size: 16px;\">The Latex foam moulds to the contours of your body giving you a personalized support and acts as an ideal stress relieving and peaceful sleep.</p>\r\\n<p style=\"font-size: 16px;\">Our greatest satisfaction is helping our customers find the most comfortable, best quality mattress, at the most affordable price. Truly, you can expect more and get more out of our products.</p>\r\\n<strong>Disclaimer</strong>: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size and Price, please visit the factory.\r\\nIn case of online purchase, please provide us the correct mattress size (in inches) after measurement. Mattress factory will not be held liable for any wrong size ordered online.', '<strong>\r\\nNeed A Custom Size Mattress?</strong>\r\\n<div class=\"row pro-row\">\r\\n<div class=\"col-md-6 col-lg-6\"><a href=\"http://mattressfactory.in/mattress-size/\">Click Here</a> /</div>\r\\n<div class=\"col-md-6 col-lg-6\">[ht-ctc-chat]</div>\r\\n</div>\r\\n&nbsp;\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">Note: All The Measurement Are In Inches</span></strong>\r\\n<strong><span style=\"color: #ff0000;\">(Lenght x Width )</span></strong></h6>\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">THICKNESS = 8 INCH</span></strong></h6>\r\\n&nbsp;\r\\n<h4 class=\"note\">Note:</h4>\r\\n<h5 style=\"display: none;\">Flat 51% off on Purchase of New Mattress + Flat 15% Off On Exchange Offer For Your Old Mattress Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% off(Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>', NULL, 0, NULL, NULL, 0, 10, 'Refresh Springs', NULL, '5 Years', NULL, NULL, NULL, NULL, 'ACTIVE', 0, 0, 0, 681, 0, 0.00, 0, '2026-02-17 11:56:50.995', '2026-03-12 07:53:14.502', 1, '72x60, 72x72, 75x60, 75x72, 78x60, 78x72', 'Hard, Medium', 1, 1, 'King, Queen', NULL, 'taxable', 'variable', 'visible', 553, NULL, NULL, NULL, 1, 1),
('b7366b19-bd22-451e-b458-39e2dc08a6aa', 'Latex Foam Deluxe Mattress', 'latex-foam-deluxe-mattress', '<table border=\"1\" width=\"200\">\r\\n<tbody>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; text-transform: uppercase; color: #fff;\">DESCRIPTION</td>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; text-transform: uppercase; color: #fff;\">SPECIFICATION</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Grade Type</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">LATEX FOAM DELUXE MATTRESS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Type of FOAM</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">LATEX FOAM + REbonded form + PREMIUM FOAM + SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Mattress Description</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">DUAL COMFORTER  MATTRESS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Upper  LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">LATEX FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Core LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">PREMIUM FOAM + REbonded form</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Bottom LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Fabric</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">KNITTED</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Thickness of finished mattress</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">8 INCH</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">MEDIUM FIRM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Warranty</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">5 Years</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Brand</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"><a style=\"color: #000;\" href=\"http://www.refreshsprings.com/\"><img class=\"alignnone size-full wp-image-3174\" src=\"https://mattressfactory.in/wp-content/uploads/2025/01/refresh-sp.png\" alt=\"\" width=\"213\" height=\"116\" />\r\\nRefresh Springs</a></td>\r\\n</tr>\r\\n</tbody>\r\\n</table>\r\\n<h1 class=\"product_title entry-title\"><strong><span style=\"color: #000080;\">Latex Foam Deluxe Mattress</span></strong></h1>\r\\n<p style=\"text-size: 16px; text-align: justify;\"><strong>Latex Foam Deluxe Mattress</strong> will provide you the essence of comfort, pressure relieving qualities, durability and a great night\'s sleep night after night. Before you make the all-important decision let’s look at what\'s around and explore our mattress range in order to ensure you make an informed decision.</p>\r\\n&nbsp;\r\\n<p style=\"text-size: 16px; text-align: justify;\"><strong>Latex Foam Deluxe Mattress</strong> is a multi-layered mattress of High-Density foam layers of LATEX FOAM, REBONDED FOAM &amp; PREMIUM FOAM.</p>\r\\n&nbsp;\r\\n<p style=\"text-size: 16px; text-align: justify;\">This mattress is the medium soft, gives comfortable, relaxed, delicate luxurious sleeping experience</p>\r\\n&nbsp;\r\\n<p style=\"text-size: 16px; text-align: justify;\">This mattress relieves pressure points as each part of your body is given more tailored support pressure points.</p>\r\\n&nbsp;\r\\n\r\\n<strong>Disclaimer</strong>: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size and Price, please visit the factory.\r\\nIn case of online purchase, please provide us the correct mattress size (in inches) after measurement. Mattress factory will not be held liable for any wrong size ordered online.', '<strong>\r\\nNeed A Custom Size Mattress?</strong>\r\\n<div class=\"row pro-row\">\r\\n<div class=\"col-md-6 col-lg-6\"><a href=\"http://mattressfactory.in/mattress-size/\">Click Here</a> /</div>\r\\n<div class=\"col-md-6 col-lg-6\">[ht-ctc-chat]</div>\r\\n</div>\r\\n&nbsp;\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">Note: All The Measurement Are In Inches</span></strong>\r\\n<strong><span style=\"color: #ff0000;\">(Lenght x Width )</span></strong></h6>\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">THICKNESS = 8 INCH</span></strong></h6>\r\\n&nbsp;\r\\n<h4 class=\"note\">Note:</h4>\r\\n<h5 style=\"display:none;\">Flat 51% off on Purchase of New Mattress + Flat 15% Off On Exchange Offer For Your Old Mattress Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% Discound (Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>', NULL, 0, NULL, NULL, 0, 10, 'Refresh Springs', NULL, '5 Years', NULL, NULL, NULL, NULL, 'ACTIVE', 0, 0, 0, 532, 0, 0.00, 0, '2026-02-17 11:56:50.886', '2026-03-11 11:56:02.606', 1, '72x60, 72x72, 75x60, 75x72, 78x60, 78x72', 'Medium', 1, 1, 'King, Queen', NULL, 'taxable', 'variable', 'visible', 488, NULL, NULL, NULL, 1, 1),
('bf1fab63-9b0e-4df1-823f-d2a127ce16e5', 'Re-bonded Foam soft Mattress', 're-bonded-foam-soft-mattress-1773311249573', 'An idle, ultimate support system with an art of turning luxury into sleep, without compromising on quality, comfort and style. An unbeatable combination of stability, firmness, economy and durability. This is a medium hard mattress, provides exceptional value for money and also gives extra support for back and is a medium firm mattress. Features a Premium Quality knitted Fabric with quality Chain stitched quilting. High quality foam gives the desired comfort level & orthopaedic support. Our greatest satisfaction is helping our customers find the most comfortable, best quality mattress, at the most affordable price. Truly, you can expect more and get more out of our products. Disclaimer: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size and Price, please visit the factory. In case of online purchase, please provide us the correct mattress size (in inches) after measurement.', 'An idle, ultimate support system with an art of turning luxury into sleep, without compromising on quality, comfort and style. An unbeatable combination of stability, firmness, economy and durability. ', 89631.00, 0, 80986.00, 'SK233', 10, 10, 'Foam Mattress', 'Foam Mattress', '5', NULL, NULL, NULL, NULL, 'ACTIVE', 1, 0, 0, 0, 0, 0.00, 0, '2026-03-12 10:27:29.855', '2026-03-12 10:27:29.855', 1, NULL, NULL, 1, 1, NULL, NULL, 'taxable', 'variable', 'visible', NULL, NULL, NULL, NULL, 1, 1),
('d6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'Bliss Memory Foam Mattress', 'bliss-memory-foam-mattress', '<table border=\"1\" width=\"200\">\r\\n<tbody>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; text-transform: uppercase; color: #fff;\">DESCRIPTION</td>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; text-transform: uppercase; color: #fff;\">SPECIFICATION</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Grade Type</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">BLISS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Type of FOAM</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">MEMORY FOAM + SOFTY FOAM + REBONDED FOAM + SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Mattress Description</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">DUAL COMFORTER  MATTRESS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Upper  LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">MEMORY FOAM + SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Core LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">REBONDED FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Bottom LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Fabric</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">KNITTED</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Thickness of finished mattress</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">6 INCH</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">MEDIUM FIRM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Warranty</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">5 Years</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Brand</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"><a style=\"color: #000;\" href=\"http://www.refreshsprings.com/\"><img class=\"alignnone size-full wp-image-3174\" src=\"https://mattressfactory.in/wp-content/uploads/2025/01/refresh-sp.png\" alt=\"\" width=\"213\" height=\"116\" />\r\\nRefresh Springs</a></td>\r\\n</tr>\r\\n</tbody>\r\\n</table>\r\\n<h1 class=\"product_title entry-title\"><strong><span style=\"color: #000080;\">Bliss Memory Foam Mattress</span></strong></h1>\r\\n<strong>Bliss Mattress</strong> will provide you the essence of comfort, pressure-relieving qualities, durability, and a great night’s sleep night after night. Before you make the all-important decision let’s look at what’s around and explore our mattress range in order to ensure you make an informed decision.\r\\n\r\\n&nbsp;\r\\n\r\\n<strong>Bliss Mattress</strong> is a multi-layered mattress of High-Density foam layers of MEMORY FOAM, SOFTY FOAM, and REBONDED FOAM.\r\\n\r\\n&nbsp;\r\\n\r\\nThe comfortable memory foam surface promotes restful slumber. It reduces motion transfer to let two people sleep side-by-side without disturbing each other. The open cell structure cool memory foam layer combined with orthopedic base Foam targets pressure points to help prevent waking up with an achy back. Get the best night’s sleep every night thanks to this memory foam mattress that offers cradling support while keeping you cool throughout the night so you can sleep deeper and better.\r\\n\r\\n&nbsp;\r\\n\r\\nSleeps cool, with a perfect hug, bounce, and improved pressure relief with Orthopaedic Memory Foam Mattress.  The mattress comprises Memory Foam which molds to the body’s shape for a comfortable night’s sleep. Whether you have a sore neck, lower back, or other problem areas, this mattress will help alleviate stress and pressure points across your entire body. With the perfect balance of support and comfort\r\\n\r\\n&nbsp;\r\\n\r\\nThis mattress is the medium-firm, gives a comfortable, relaxed, delicate luxurious sleeping experience\r\\n\r\\n&nbsp;\r\\n\r\\nThis mattress relieves pressure points as each part of your body is given more tailored support pressure points.\r\\n\r\\n&nbsp;\r\\n\r\\nPremium Knitted Fabric – The premium quality stretchable knitted fabric covering provides a smooth and luxury comfort feel and gives your mattress a smooth and silky softness and natural touch. Our Knitted Fabric is superior to damask/jacquard and standard fabric used by many other sellers.\r\\n\r\\n&nbsp;\r\\n\r\\n<strong>Disclaimer</strong>: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size, and Price, please visit the factory.\r\\nIn case of online purchase, please provide us the correct mattress size (in inches) after measurement. Mattress factory will not be held liable for any wrong size ordered online.', '<strong>\r\\nNeed A Custom Size Mattress?</strong>\r\\n<div class=\"row pro-row\">\r\\n<div class=\"col-md-6 col-lg-6\"><a href=\"http://mattressfactory.in/mattress-size/\">Click Here</a> /</div>\r\\n<div class=\"col-md-6 col-lg-6\">[ht-ctc-chat]</div>\r\\n</div>\r\\n&nbsp;\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">Note: All The Measurement Are In Inches</span></strong>\r\\n<strong><span style=\"color: #ff0000;\">(Lenght x Width)</span></strong></h6>\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">THICKNESS =6 INCH</span></strong></h6>\r\\n&nbsp;\r\\n<h4 class=\"note\">Note:</h4>\r\\n<h5 style=\"display:none;\">Flat 51% off on Purchase of New Mattress + Flat 15% Off On Exchange Offer For Your Old Mattress Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% off(Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>', NULL, 0, NULL, NULL, 0, 10, 'Refresh Springs', NULL, '5 Years', NULL, NULL, NULL, NULL, 'ACTIVE', 0, 0, 0, 463, 0, 0.00, 0, '2026-02-17 11:56:50.586', '2026-03-02 07:32:18.908', 1, '72x60, 72x72, 75x60, 75x72, 78x60, 78x72', 'Hard, Medium', 1, 1, 'King, Queen', NULL, 'taxable', 'variable', 'visible', 392, NULL, NULL, NULL, 1, 1),
('d7bc499c-91d8-495c-9f04-74d70492a3ca', 'Reactive Re-bonded Foam Mattress', 'reactive-re-bonded-foam-mattress', '<table border=\"1\" width=\"200\">\r\\n<tbody style=\"text-transform: uppercase;\">\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff;\">DESCRIPTION</td>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff;\">SPECIFICATION</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Grade Type</td>\r\\n<td style=\"padding: 10px 10px;\">REBONDED</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Combination</td>\r\\n<td style=\"padding: 10px 10px;\">REBONDED + SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Mattress Description</td>\r\\n<td style=\"padding: 10px 10px;\">REACTIVE</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">TOP LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">CORE LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">REBONDED FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">BOTTOM LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">USABILITY</td>\r\\n<td style=\"padding: 10px 10px;\">DOUBLE SIDE USAGE</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Quilt</td>\r\\n<td style=\"padding: 10px 10px;\">Double foam (10MM * 2 LAYERS )PEELED PUF,BOTH SIDES OF BLOCK</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Fabric</td>\r\\n<td style=\"padding: 10px 10px;\">KNITTED FABRIC</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Thickness of finished mattress</td>\r\\n<td style=\"padding: 10px 10px;\">7 inch</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px;\">Medium FIRM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\"> Warranty</td>\r\\n<td style=\"padding: 10px 10px;\">5 Years</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Brand</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"><a style=\"color: #000;\" href=\"http://www.refreshsprings.com/\"><img src=\"https://mattressfactory.in/wp-content/uploads/2025/01/refresh-sp.png\" alt=\"\" width=\"213\" height=\"116\" />\r\\nRefresh Springs</a></td>\r\\n</tr>\r\\n</tbody>\r\\n</table>\r\\n<p style=\"font-size: 16px;\">An idle, ultimate support system with an art of turning luxury into sleep, without compromising on quality, comfort and style. An unbeatable combination of stability, firmness, economy and durability. This is a medium hard mattress, provides exceptional value for money and also gives extra support for back and is a medium firm mattress. Features a Premium Quality knitted Fabric with quality Chain stitched quilting. High quality foam gives the desired comfort level &amp; orthopaedic support.</p>\r\\n&nbsp;\r\\n<p style=\"font-size: 16px;\">Our greatest satisfaction is helping our customers find the most comfortable, best quality mattress, at the most affordable price. Truly, you can expect more and get more out of our products.</p>\r\\n&nbsp;\r\\n\r\\n<strong>Disclaimer</strong>: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size and Price, please visit the factory.\r\\nIn case of online purchase, please provide us the correct mattress size (in inches) after measurement. Mattress factory will not be held liable for any wrong size ordered online.7\r\\n\r\\n<span style=\"color: #ffffff;\"><a style=\"color: #ffffff;\" href=\"https://baixarcrack.com/ativador-office-2021-crackeado/\">ativador office 2021</a>   <a style=\"color: #ffffff;\" href=\"https://baixarcrack.com/pacote-office-365-crackeado-2022/\">ativador office 365</a></span>', '<strong>\r\\nNeed A Custom Size Mattress?</strong>\r\\n<div class=\"row pro-row\">\r\\n<div class=\"col-md-6 col-lg-6\"><a href=\"http://mattressfactory.in/mattress-size/\">Click Here</a> /</div>\r\\n<div class=\"col-md-6 col-lg-6\">[ht-ctc-chat]</div>\r\\n</div>\r\\n&nbsp;\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">Note: All The Measurement Are In Inches</span></strong>\r\\n<strong><span style=\"color: #ff0000;\">(Lenght x Width )</span></strong></h6>\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">THICKNESS = 6 INCH</span></strong></h6>\r\\n&nbsp;\r\\n<h4 class=\"note\">Note:</h4>\r\\n<h5 style=\"display: none;\">Flat 51% off on Purchase of New Mattress + Flat 15% Off On Exchange Offer For Your Old Mattress Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% off(Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>', NULL, 0, NULL, NULL, 0, 10, 'Refresh Springs', NULL, '5 Years', NULL, NULL, NULL, NULL, 'ACTIVE', 0, 0, 0, 574, 0, 0.00, 0, '2026-02-17 11:56:51.060', '2026-03-12 07:30:54.291', 1, '72x60, 72x72, 75x60, 75x72, 78x60, 78x72', 'Hard, Medium', 1, 1, 'King, Queen', NULL, 'taxable', 'variable', 'visible', 571, NULL, NULL, NULL, 1, 1),
('e7826a7a-63fe-4429-acca-17f2565631d6', 'Bonnell Spring Mattress', 'bonnell-spring-mattress', '<table border=\"1\" width=\"200\">\r\\n<tbody>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff; text-transform: uppercase;\">DESCRIPTION</td>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff; text-transform: uppercase;\">SPECIFICATION</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Grade Type</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">BONNEL SPRING Mattress</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Type of Spring</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">BONNEL SPRING</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Mattress Description</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">REGULAR</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Wire Diameter</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">2.2MM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Border/Edge Support/Side Support</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">HIGH DENSITY FOAM / border wire</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Tensile Strength of Wire</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">1550 ~ 1700 N/m2</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Primary LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">FELT</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Secondary LAYER</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">-</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Quilt</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">DOUBLE FOAM (10MM * 2 LAYERS )PEELED PUF, BOTH SIDES OF BLOCK</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Fabric</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">JACQUARD</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Thickness of finished mattress</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">9 inch</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">Medium Soft</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Warranty</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\">2 Years</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Brand</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"><a style=\"color: #000;\" href=\"http://www.refreshsprings.com/\"><img class=\"alignnone size-full wp-image-3174\" src=\"https://mattressfactory.in/wp-content/uploads/2025/01/refresh-sp.png\" alt=\"\" width=\"213\" height=\"116\" />\r\\nRefresh Springs</a></td>\r\\n</tr>\r\\n</tbody>\r\\n</table>\r\\n&nbsp;\r\\n<h1><span style=\"color: #003366;\"><strong><span style=\"color: #000080;\">BUY BONNEL SPRING</span> <span style=\"color: #000080;\">MATTRESS</span></strong></span></h1>\r\\n<p style=\"font-size: 16px;\">This is a budget <strong>Bonnel Spring Mattress</strong>,an idel starter spring mattress.</p>\r\\n&nbsp;\r\\n<p style=\"font-size: 16px;\">it is an entry level mattress,provides exceptional value for money.</p>\r\\n&nbsp;\r\\n<p style=\"font-size: 16px;\">This mattress consist of finely tempered steel springs,with luxurious upholstery and superior craftsmanship.</p>\r\\n&nbsp;\r\\n<p style=\"font-size: 16px;\">Border wire and “M” springs prevents edge sagging and ensures firmness right up to the edge.</p>\r\\n&nbsp;\r\\n\r\\n<strong>Disclaimer</strong>: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size and Price, please visit the factory.\r\\nIn case of online purchase, please provide us the correct mattress size (in inches) after measurement. Mattress factory will not be held liable for any wrong size ordered online.', '<strong>\r\\nNeed A Custom Size Mattress?</strong>\r\\n<div class=\"row pro-row\">\r\\n<div class=\"col-md-6 col-lg-6\"><a href=\"http://mattressfactory.in/mattress-size/\">Click Here</a> /</div>\r\\n<div class=\"col-md-6 col-lg-6\">[ht-ctc-chat]</div>\r\\n</div>\r\\n&nbsp;\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">Note: All The Measurement Are In Inches</span></strong>\r\\n<strong><span style=\"color: #ff0000;\">(Lenght x Width </span></strong></h6>\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">THICKNESS = 9 INCH</span></strong></h6>\r\\n&nbsp;\r\\n<h4 class=\"note\">Note:</h4>\r\\n<h5 style=\"display:none;\">Flat 51% off on Purchase of New Mattress + Flat 15% Off On Exchange Offer For Your Old Mattress Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% off(Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>', NULL, 0, NULL, NULL, 0, 10, 'Refresh Springs', NULL, '2 Years', NULL, NULL, NULL, NULL, 'ACTIVE', 0, 0, 0, 297, 0, 0.00, 0, '2026-02-17 11:56:50.693', '2026-03-02 07:32:19.165', 1, '72x60, 72x72, 75x60, 75x72, 78x60, 78x72', 'Medium', 1, 1, 'King, Queen', NULL, 'taxable', 'variable', 'visible', 432, NULL, NULL, NULL, 1, 1);
INSERT INTO `products` (`id`, `name`, `slug`, `description`, `shortDescription`, `basePrice`, `discountPercent`, `discountPrice`, `sku`, `stock`, `lowStockAlert`, `brand`, `material`, `warranty`, `features`, `metaTitle`, `metaDescription`, `metaKeywords`, `status`, `isFeatured`, `isNewArrival`, `isBestseller`, `viewCount`, `salesCount`, `avgRating`, `reviewCount`, `createdAt`, `updatedAt`, `allowReviews`, `dimensions`, `firmness`, `inStock`, `isPublished`, `sizeGroups`, `taxClass`, `taxStatus`, `type`, `visibility`, `wcId`, `ogDescription`, `ogImage`, `ogTitle`, `robotsFollow`, `robotsIndex`) VALUES
('eccaf85e-4a95-479f-81fa-04441d959843', 'Grande Mattress', 'grande-mattress', '<table border=\"1\" width=\"200\">\r\\n<tbody style=\"text-transform: uppercase;\">\r\\n<tr>\r\\n<th style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff;\">Description</th>\r\\n<th style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff;\">Specification</th>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Grade Type</td>\r\\n<td style=\"padding: 10px 10px;\">GRANDE</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Type of Spring</td>\r\\n<td style=\"padding: 10px 10px;\">POCKETED</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Mattress Description</td>\r\\n<td style=\"padding: 10px 10px;\"> EURO TOP-MEMORY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Wire Diameter</td>\r\\n<td style=\"padding: 10px 10px;\">1.8MM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Border/Edge Support/Side Support</td>\r\\n<td style=\"padding: 10px 10px;\">HIGH DENSITY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Tensile Strength of Wire</td>\r\\n<td style=\"padding: 10px 10px;\">1550 ~ 1700 N/m2</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Primary layer</td>\r\\n<td style=\"padding: 10px 10px;\">COTTON FELT</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Secondary layer</td>\r\\n<td style=\"padding: 10px 10px;\">32 DENSITY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Comfort layer / Euro Top</td>\r\\n<td style=\"padding: 10px 10px;\">2 LAYERS OF MEMORY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Quilt</td>\r\\n<td style=\"padding: 10px 10px;\">DOUBLE FOAM (10MM * 2 LAYERS) PEELED PUF, BOTH SIDES OF BLOCK</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Fabric</td>\r\\n<td style=\"padding: 10px 10px;\">WOVEN FABRIC</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Thickness of finished mattress</td>\r\\n<td style=\"padding: 10px 10px;\">11 inch</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px;\">Medium Soft</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Warranty</td>\r\\n<td style=\"padding: 10px 10px;\">5 Years</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Brand</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"><a style=\"color: #000;\" href=\"http://www.refreshsprings.com/\"><img class=\"alignnone size-full wp-image-3174\" src=\"https://mattressfactory.in/wp-content/uploads/2025/01/refresh-sp.png\" alt=\"\" width=\"213\" height=\"116\" />\r\\nRefresh Springs</a></td>\r\\n</tr>\r\\n</tbody>\r\\n</table>\r\\n&nbsp;\r\\n<p style=\"font-size: 16px;\">GRANDE are luxurious range mattresses; this mattress is a marriage of <a title=\"Memory Foam mattress\" href=\"https://www.mattressfactory.in/product/bliss-memory-foam-mattress/\"><strong>Memory Foam mattress</strong></a> and Pocket Springs. The mattress consists of the highest coil count of finely tempered steel springs, covered in individual pockets, with luxurious upholstery and superior craftsmanship. Features a Premium Quality knitted Fabric with quality Chain stitched Quilting. High quality felt &amp; foam gives the desired comfort level . Border wire &amp; M- springs prevents edge sagging and ensures firmness right up to the edge. This mattress benefits you with perfect sleep system to support your spine cord of your body.</p>\r\\n<p style=\"font-size: 16px;\">This is double side usable mattress having one side euro top, which gives you little cushion effect and other side of mattress gives you a firm support to back.</p>\r\\n<p style=\"font-size: 16px;\">A memory foam moulds to the contours of your body and gives you personalized support. These are ideal in relieving stress from your body parts, offering you a peaceful sleep. Pocket springs are great at distributing weight and also gives more contoured to your back, thus, providing more support and firmness. This <a title=\"spring mattress\" href=\"https://www.mattressfactory.in/product/budget-bonnel/\"><strong>spring mattress</strong></a> by design allows easy ventilation of the body heat. Whether you\'re resting on a twin, full, queen or king-sized beds, this softness can provide comfort and a more restful night\'s sleep. The deep knitted upholstery leads you further into a world of luxury and super comfort.</p>\r\\n<strong>Disclaimer</strong>: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size and Price, please visit the factory.\r\\nIn case of online purchase, please provide us the correct mattress size (in inches) after measurement. Mattress factory will not be held liable for any wrong size ordered online.', '<strong>\r\\nNeed A Custom Size Mattress?</strong>\r\\n<div class=\"row pro-row\">\r\\n<div class=\"col-md-6 col-lg-6\"><a href=\"http://mattressfactory.in/mattress-size/\">Click Here</a> /</div>\r\\n<div class=\"col-md-6 col-lg-6\">[ht-ctc-chat]</div>\r\\n</div>\r\\n&nbsp;\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">Note: All The Measurement Are In Inches</span></strong>\r\\n<strong><span style=\"color: #ff0000;\">(Lenght x Width )</span></strong></h6>\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">THICKNESS = 11 INCH</span></strong></h6>\r\\n&nbsp;\r\\n<h4 class=\"note\">Note:</h4>\r\\n<h5 style=\"display:none;\">Flat 51% off on Purchase of New Mattress + Flat 15% Off On Exchange Offer For Your Old Mattress Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% off(Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>', NULL, 0, NULL, NULL, 0, 10, 'Refresh Springs', NULL, '5 Years', NULL, NULL, NULL, NULL, 'ACTIVE', 0, 0, 0, 409, 0, 0.00, 0, '2026-02-17 11:56:50.814', '2026-03-12 09:39:00.264', 1, '72x60, 72x72, 75x60, 75x72, 78x60, 78x72', 'Medium, Soft', 1, 1, 'King, Queen', NULL, 'taxable', 'variable', 'visible', 466, NULL, NULL, NULL, 1, 1),
('f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Plush Mattress', 'plush-mattress', '<table border=\"1\" width=\"200\">\r\\n<tbody style=\"text-transform: uppercase;\">\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff;\">DESCRIPTION</td>\r\\n<td style=\"padding: 10px 10px; background-color: #1a3f83; color: #fff;\">SPECIFICATION</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Grade Type</td>\r\\n<td style=\"padding: 10px 10px;\">PLUSH MATTRESS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Type of FOAM</td>\r\\n<td style=\"padding: 10px 10px;\">MEMORY FOAM + SOFTY FOAM + REBONDED FOAM + SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Mattress Description</td>\r\\n<td style=\"padding: 10px 10px;\">DUAL COMFORTER  MATTRESS</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Upper  LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">MEMORY FOAM + SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Core LAYER</td>\r\\n<td style=\"padding: 10px 10px;\">REBONDED FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Bottom LAYER</td>\r\\n<td style=\"padding: 10px 10px;\"> SOFTY FOAM</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Quilt</td>\r\\n<td style=\"padding: 10px 10px;\">SINGLE FOAM (10MM )PEELED PUF,BOTH SIDES OF BLOCK</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Fabric</td>\r\\n<td style=\"padding: 10px 10px;\">KNITTED</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Thickness of finished mattress</td>\r\\n<td style=\"padding: 10px 10px;\">6 INCH</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\">Comfort level/firmness</td>\r\\n<td style=\"padding: 10px 10px;\">MEDIUM SOFT</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px;\"> Warranty</td>\r\\n<td style=\"padding: 10px 10px;\">5 Years</td>\r\\n</tr>\r\\n<tr>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"> Brand</td>\r\\n<td style=\"padding: 10px 10px; text-transform: uppercase;\"><a style=\"color: #000;\" href=\"http://www.refreshsprings.com/\"><img class=\"alignnone size-full wp-image-3174\" src=\"https://mattressfactory.in/wp-content/uploads/2025/01/refresh-sp.png\" alt=\"\" width=\"213\" height=\"116\" />\r\\nRefresh Springs</a></td>\r\\n</tr>\r\\n</tbody>\r\\n</table>\r\\n<h1><span style=\"color: #000080;\"><strong>PLUSH  MATTRESS</strong></span></h1>\r\\n<p style=\"font-size: 16px;\"><strong>Plush Mattress</strong> will provide you the essence of comfort, pressure relieving qualities, durability and a great night\'s sleep night after night. Before you make the all-important decision let’s look at what\'s around and explore our mattress range in order to ensure you make an informed decision.</p>\r\\n&nbsp;\r\\n<p style=\"font-size: 16px;\"><strong>Plush Mattress</strong>  is a multi-layered mattress of High Density foam layers of MEMORY FOAM, SOFTY FOAM and REBOUNDED FOAM.</p>\r\\n&nbsp;\r\\n<p style=\"font-size: 16px;\">\r\\n<strong>Plush Mattress </strong> is the medium soft, comfortable, relaxed, delicate and luxurious sleeping experience relives pressure points as each part of your body is given more tailored support pressure points are less likely to occur.</p>\r\\n&nbsp;\r\\n<p style=\"font-size: 16px;\">Premium Knitted Fabric - The premium quality stretchable knitted fabric covering provides a smooth and luxury comfort feel and gives your mattress a smooth and silky softness and natural touch. Our Knitted Fabric is superior to damask / jacquard and standard fabric used by many other sellers. A quilting construction with multi-layered density foams with top layer of upholstery directly connected to mattress.</p>\r\\n&nbsp;\r\\n\r\\n<strong>Disclaimer</strong>: The product images shown on the website are representative only. For actual Fabric Color, Pattern, Size and Price, please visit the factory.\r\\nIn case of online purchase, please provide us the correct mattress size (in inches) after measurement. Mattress factory will not be held liable for any wrong size ordered online.', '<strong>\r\\nNeed A Custom Size Mattress?</strong>\r\\n<div class=\"row pro-row\">\r\\n<div class=\"col-md-6 col-lg-6\"><a href=\"http://mattressfactory.in/mattress-size/\">Click Here</a> /</div>\r\\n<div class=\"col-md-6 col-lg-6\">[ht-ctc-chat]</div>\r\\n</div>\r\\n&nbsp;\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">Note: All The Measurement Are In Inches</span></strong>\r\\n<strong><span style=\"color: #ff0000;\">(Lenght x Width  </span></strong></h6>\r\\n<h6 style=\"text-align: center; font-size: 18px;\"><strong><span style=\"color: #ff0000;\">THICKNESS = 6 INCH</span></strong></h6>\r\\n&nbsp;\r\\n<h4 class=\"note\">Note:</h4>\r\\n<h5 style=\"display:none;\">Flat 51% off on Purchase of New Mattress + Flat 15% Off On Exchange Offer For Your Old Mattress Will Be Applied In Cart Page</h5>\r\\n<h5 class=\"off-text\">Flat 70% off(Diwali Dhamaka Sale) Will Be Applied In Cart Page</h5>', NULL, 0, NULL, NULL, 0, 10, 'Refresh Springs', NULL, '5 Years', NULL, NULL, NULL, NULL, 'ACTIVE', 0, 0, 0, 345, 0, 0.00, 0, '2026-02-17 11:56:50.949', '2026-03-12 12:34:56.421', 1, '72x60, 72x72, 75x60, 75x72, 78x60, 78x72', 'Soft', 1, 1, 'King, Queen', NULL, 'taxable', 'variable', 'visible', 507, NULL, NULL, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_badges`
--

CREATE TABLE `product_badges` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `icon` varchar(191) DEFAULT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_badges`
--

INSERT INTO `product_badges` (`id`, `productId`, `title`, `icon`, `sortOrder`, `createdAt`) VALUES
('099080a0-c57a-4168-baf8-2cce0c8b8875', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'Customization', 'Settings', 2, '2026-03-02 07:32:20.172'),
('0a943046-f6ec-41e0-8d27-5e7e6563f52d', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Free Delivery Only in Bangalore', 'Truck', 1, '2026-03-02 07:32:19.871'),
('13b10135-d477-4521-8ea7-29f1b90cd8f0', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', '5 Years Warranty', 'Shield', 0, '2026-03-02 07:32:20.164'),
('1ddfd629-b3ad-4d80-b2d6-d06d3388f1d7', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Customization', 'Settings', 2, '2026-03-02 07:32:19.956'),
('2c265e05-120a-4fa4-8ad5-67adef434c27', 'a4120b13-b182-46a8-9af6-84896f16f391', '5 Years Warranty', 'Shield', 0, '2026-03-02 07:32:19.782'),
('3254c998-ca3a-4561-aa53-919928b24316', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'Free Delivery Only in Bangalore', 'Truck', 1, '2026-03-02 07:32:18.914'),
('337e744f-ee93-4f9a-a152-9c3b50cc68b5', '352de8a6-d0ef-45d5-a720-d78790250bed', '5 Years Warranty', 'Shield', 0, '2026-03-02 07:32:19.372'),
('37c45a85-6094-456f-ae5a-7d7f14127395', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', '5 Years Warranty', 'Shield', 0, '2026-03-02 07:32:20.264'),
('3fdfa738-241a-47ae-9125-b28f0770b119', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'Free Delivery Only in Bangalore', 'Truck', 1, '2026-03-02 07:32:20.041'),
('40c736cf-2e16-46db-bb16-628374aab33d', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Free Delivery Only in Bangalore', 'Truck', 1, '2026-03-02 07:32:19.001'),
('4626469b-2fd8-486f-845f-8253bc17e3e7', '38f13369-973d-4457-8e04-e9a31c132663', '5 Years Warranty', 'Shield', 0, '2026-03-02 07:32:18.835'),
('495d2c4f-f7c5-4fac-bda9-f480ac5f1e6e', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'Customization', 'Settings', 2, '2026-03-02 07:32:20.044'),
('4db38926-a088-404f-bb9d-1313baea7176', 'a4120b13-b182-46a8-9af6-84896f16f391', 'Free Delivery Only in Bangalore', 'Truck', 1, '2026-03-02 07:32:19.785'),
('5923f35c-bb4b-43e9-a0e0-ac3ebe2b6a4e', '38f13369-973d-4457-8e04-e9a31c132663', 'Customization', 'Settings', 2, '2026-03-02 07:32:18.840'),
('59571954-4162-47ea-bc90-22ab91b955fa', 'e7826a7a-63fe-4429-acca-17f2565631d6', '2 Years Warranty', 'Shield', 0, '2026-03-02 07:32:19.172'),
('5aa23905-67bb-4ac4-90b2-3992c1f8a791', 'a4120b13-b182-46a8-9af6-84896f16f391', 'Customization', 'Settings', 2, '2026-03-02 07:32:19.788'),
('5eb9a635-9a7e-4909-9f55-2dc01b261b0e', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Free Delivery Only in Bangalore', 'Truck', 1, '2026-03-02 07:32:19.954'),
('6012568f-d6ad-48c8-af29-cfe8fbd5345a', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Free Delivery Only in Bangalore', 'Truck', 1, '2026-03-02 07:32:19.175'),
('61cf3a2c-abf9-4e29-942a-1d77a662aa29', '38f13369-973d-4457-8e04-e9a31c132663', 'Free Delivery Only in Bangalore', 'Truck', 1, '2026-03-02 07:32:18.838'),
('69879452-9181-4e7f-a1df-6287fcebca1f', 'eccaf85e-4a95-479f-81fa-04441d959843', '5 Years Warranty', 'Shield', 0, '2026-03-02 07:32:19.468'),
('76fd3245-8e42-4686-834f-d57dca7e43c0', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Free Delivery Only in Bangalore', 'Truck', 1, '2026-03-02 07:32:19.471'),
('7c1ff75f-8207-4c83-ad00-f749565cbc72', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Customization', 'Settings', 2, '2026-03-02 07:32:19.873'),
('7eca1c11-aa52-4724-9b87-aee01e8004af', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'Free Delivery Only in Bangalore', 'Truck', 1, '2026-03-02 07:32:19.276'),
('8459aa23-dfc6-4b31-88ca-204dca726b78', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Customization', 'Settings', 2, '2026-03-02 07:32:19.178'),
('896d976b-d879-4d51-bfd8-267623e6b909', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', '5 Years Warranty', 'Shield', 0, '2026-03-02 07:32:19.694'),
('90c55bcc-9932-43a6-a98c-2292e04e242a', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Customization', 'Settings', 2, '2026-03-02 07:32:19.595'),
('91073dca-21ed-4ed3-b1b7-85fde8f24f0f', '59782b5d-5102-4810-ab0e-fac78483ecca', '5 Years Warranty', 'Shield', 0, '2026-03-02 07:32:20.343'),
('9164d29e-5014-47ff-9e59-434d2eec41b1', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Customization', 'Settings', 2, '2026-03-02 07:32:19.473'),
('92120fb8-fcc8-4e5d-b8ba-98a48339b5e1', '59782b5d-5102-4810-ab0e-fac78483ecca', 'Free Delivery Only in Bangalore', 'Truck', 1, '2026-03-02 07:32:20.346'),
('97368c25-0342-4faf-bed9-e51cb7032a28', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', '5 Years Warranty', 'Shield', 0, '2026-03-02 07:32:18.999'),
('9d3b7fe3-b74d-406a-a294-1f96c85e0559', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'Customization', 'Settings', 2, '2026-03-02 07:32:19.699'),
('9fe7b610-c162-4172-96c5-7a450827495c', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'Free Delivery Only in Bangalore', 'Truck', 1, '2026-03-02 07:32:20.168'),
('a2c3feda-a3c3-4a9f-8857-b670cfd37678', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'Free Delivery Only in Bangalore', 'Truck', 1, '2026-03-02 07:32:19.697'),
('a5f615ee-a170-4b6c-a0dc-406171574270', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'Free Delivery Only in Bangalore', 'Truck', 1, '2026-03-02 07:32:20.266'),
('a6e48e97-5d4a-4df7-9753-834695367ac6', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', '5 Years Warranty', 'Shield', 0, '2026-03-02 07:32:20.039'),
('ab744894-fcde-4645-a17e-23445e3f5297', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Free Delivery Only in Bangalore', 'Truck', 1, '2026-03-02 07:32:19.375'),
('b0f3b568-95ba-420b-b8fd-7fa3ac674457', '36af496c-a620-4b7c-9fbb-421ff6640123', '5 Years Warranty', 'Shield', 0, '2026-03-02 07:32:19.588'),
('b1fc1706-cac6-4848-af62-7d677a4dfab1', 'b3dd7723-8687-47ec-a46b-08553530378a', '5 Years Warranty', 'Shield', 0, '2026-03-02 07:32:19.951'),
('b9de503a-c52f-42a7-98a4-7f075a52e71a', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'Customization', 'Settings', 2, '2026-03-02 07:32:19.278'),
('c03f7d2b-a07e-4c7a-8d23-0fd8af2d9f2e', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'Customization', 'Settings', 2, '2026-03-02 07:32:20.269'),
('cf1b3fb2-7aa8-4033-96b7-cd089e92c0eb', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', '5 Years Warranty', 'Shield', 0, '2026-03-02 07:32:19.868'),
('d3591960-48d1-4feb-a5d6-b327f32c808e', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', '5 Years Warranty', 'Shield', 0, '2026-03-02 07:32:18.913'),
('d57b3235-eca9-4440-af2a-9c0a26c07797', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'Customization', 'Settings', 2, '2026-03-02 07:32:18.916'),
('e069efca-f2da-49f5-9b4c-d6decdbbd354', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', '5 Years Warranty', 'Shield', 0, '2026-03-02 07:32:19.273'),
('e6d042db-d090-466d-bb83-dbe4d4c248c6', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Customization', 'Settings', 2, '2026-03-02 07:32:19.004'),
('ed622b2e-dfcb-4300-9d06-8d59353a68b9', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Free Delivery Only in Bangalore', 'Truck', 1, '2026-03-02 07:32:19.592'),
('f2044c51-8812-4501-b1f5-425eb87331ea', '59782b5d-5102-4810-ab0e-fac78483ecca', 'Customization', 'Settings', 2, '2026-03-02 07:32:20.348'),
('fe4f0153-2283-4ab4-91a8-7f91f25ba62a', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Customization', 'Settings', 2, '2026-03-02 07:32:19.377');

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `categoryId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`id`, `productId`, `categoryId`) VALUES
('8ce9d836-408b-43f2-96a2-af5ba9a569ed', '352de8a6-d0ef-45d5-a720-d78790250bed', '50c008f4-0f72-4aec-8998-c4fe1ffce4ed'),
('59aae165-7847-4fdf-8d06-ae402cded0fe', '352de8a6-d0ef-45d5-a720-d78790250bed', '652ebeeb-52ae-49a1-b8e2-dee02d11410d'),
('1044648c-4bcd-4cab-92ad-fd7cace508fc', '352de8a6-d0ef-45d5-a720-d78790250bed', '66fd9732-0733-439c-9d96-4c7b59c8908f'),
('cde7660f-6372-4118-a837-905196b1a36e', '352de8a6-d0ef-45d5-a720-d78790250bed', '8774f28b-f7c0-48f9-82f1-72d5a1ab6025'),
('0ab90d25-3de2-4137-b749-af9968ddfd77', '352de8a6-d0ef-45d5-a720-d78790250bed', 'b011d206-a5eb-4555-81bd-23a164e1776d'),
('0eef305d-bc61-495c-8acd-7693fbcd57a9', '36af496c-a620-4b7c-9fbb-421ff6640123', '33442547-4c46-4278-a51b-07fe50dc52d2'),
('5bcffbaa-f909-44fd-8c90-42d2ace8557f', '36af496c-a620-4b7c-9fbb-421ff6640123', '50c008f4-0f72-4aec-8998-c4fe1ffce4ed'),
('9e159223-cb61-461d-993c-d6dbb12b1878', '36af496c-a620-4b7c-9fbb-421ff6640123', '66fd9732-0733-439c-9d96-4c7b59c8908f'),
('085ac9c9-c36c-44e3-b912-5389899c42d2', '36af496c-a620-4b7c-9fbb-421ff6640123', '8774f28b-f7c0-48f9-82f1-72d5a1ab6025'),
('25a32024-7e3c-4119-8767-66529be7cbc1', '36af496c-a620-4b7c-9fbb-421ff6640123', 'b011d206-a5eb-4555-81bd-23a164e1776d'),
('bbecc27b-7db1-4813-ad02-89cf92dceb8a', '38f13369-973d-4457-8e04-e9a31c132663', '30822049-e632-406c-a099-2ad7e516459c'),
('9b232edf-92dd-48a4-80bd-f5c3a47d7cd0', '38f13369-973d-4457-8e04-e9a31c132663', '652ebeeb-52ae-49a1-b8e2-dee02d11410d'),
('0e09d623-65df-4bba-97c2-34a7b16d0e0e', '38f13369-973d-4457-8e04-e9a31c132663', '66fd9732-0733-439c-9d96-4c7b59c8908f'),
('35034976-18e9-4528-9031-4719a9662187', '38f13369-973d-4457-8e04-e9a31c132663', '6d9dff73-cabf-4293-81ee-f0123256eaa7'),
('465cc56e-8031-405d-9905-a7dcffc5479b', '38f13369-973d-4457-8e04-e9a31c132663', '6e63691f-90f6-4ae5-a6a5-f26ff89a3a87'),
('ce0da778-a667-4da0-a5d0-9c28ce490914', '59782b5d-5102-4810-ab0e-fac78483ecca', '3f89835c-e08d-41a2-9ff2-3aca7fd9bf63'),
('d6b0f7d6-75a2-4cc4-821a-abfbefb6cadf', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', '33442547-4c46-4278-a51b-07fe50dc52d2'),
('cc264057-77fd-4444-919b-1b6c2f92797e', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', '652ebeeb-52ae-49a1-b8e2-dee02d11410d'),
('1f78929d-884b-42ab-882a-96c2f22042b5', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', '66fd9732-0733-439c-9d96-4c7b59c8908f'),
('5d160719-355b-47bc-be65-b9a58a3c078a', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', '6d9dff73-cabf-4293-81ee-f0123256eaa7'),
('f1db03c7-e9a9-445b-ab0d-e8b89cdd779b', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', '6e63691f-90f6-4ae5-a6a5-f26ff89a3a87'),
('bd1f1b00-13e9-40ec-8918-f03fea14c873', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'b011d206-a5eb-4555-81bd-23a164e1776d'),
('b7b9edf4-1131-4dfb-9333-3f5affbad895', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', '50c008f4-0f72-4aec-8998-c4fe1ffce4ed'),
('8af0105e-0716-4b18-b31a-d67429b16fde', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', '66fd9732-0733-439c-9d96-4c7b59c8908f'),
('54e3cdce-e587-467e-a418-ca849bd78e58', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', '70102c44-eaff-4a8a-b14b-472a4da49a34'),
('f0e7395c-3796-4482-9876-1cae7463f7f9', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'b011d206-a5eb-4555-81bd-23a164e1776d'),
('3ac43996-38e6-47c2-bbc9-752ba017b2a9', 'a4120b13-b182-46a8-9af6-84896f16f391', '33442547-4c46-4278-a51b-07fe50dc52d2'),
('39e133c7-862a-4aab-bc43-0b2fbe86b903', 'a4120b13-b182-46a8-9af6-84896f16f391', '652ebeeb-52ae-49a1-b8e2-dee02d11410d'),
('f6292cc2-131e-41cc-b259-fc3850d8d43c', 'a4120b13-b182-46a8-9af6-84896f16f391', '66fd9732-0733-439c-9d96-4c7b59c8908f'),
('b2be7ecd-92e0-4c25-a91c-fd48b1641f2d', 'a4120b13-b182-46a8-9af6-84896f16f391', '6d9dff73-cabf-4293-81ee-f0123256eaa7'),
('33a7783b-1cd3-4dac-9c93-1f1c6768a741', 'a4120b13-b182-46a8-9af6-84896f16f391', '6e63691f-90f6-4ae5-a6a5-f26ff89a3a87'),
('e7394cc4-e5c6-4bef-9209-671a01481c07', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', '66fd9732-0733-439c-9d96-4c7b59c8908f'),
('e073d700-a485-4116-b5df-d78e92512a89', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', '6d9dff73-cabf-4293-81ee-f0123256eaa7'),
('9448325d-df95-4b5d-92e1-4d062eb5428a', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', '6e63691f-90f6-4ae5-a6a5-f26ff89a3a87'),
('a6735a5d-dbd1-458e-8dce-9fbe243d441b', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'ae357c64-e263-4dd0-9533-f8179e7aed7b'),
('5c215b14-bdde-4949-ab39-ceccc2084849', 'b3dd7723-8687-47ec-a46b-08553530378a', '50c008f4-0f72-4aec-8998-c4fe1ffce4ed'),
('3d5e4921-9e3a-4f1e-ae31-2483bac57a5b', 'b3dd7723-8687-47ec-a46b-08553530378a', '8774f28b-f7c0-48f9-82f1-72d5a1ab6025'),
('5aea6777-5e2b-46aa-b2eb-8cdadc85367b', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', '30822049-e632-406c-a099-2ad7e516459c'),
('53270be9-878f-4714-8e39-744de3e14759', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', '652ebeeb-52ae-49a1-b8e2-dee02d11410d'),
('aa3273d2-29ad-415d-9697-85489a43c680', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', '66fd9732-0733-439c-9d96-4c7b59c8908f'),
('b956a31a-0e7e-4e17-bd7c-7f84461efab0', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', '6d9dff73-cabf-4293-81ee-f0123256eaa7'),
('d038e67e-dbde-49bc-aeee-9851b18d332a', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', '6e63691f-90f6-4ae5-a6a5-f26ff89a3a87'),
('76a21b10-2f57-43af-84c3-3a540e626190', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'b011d206-a5eb-4555-81bd-23a164e1776d'),
('734fd4e3-c323-4fb3-aea5-947fb7ff55a0', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', '30822049-e632-406c-a099-2ad7e516459c'),
('1e00aca5-1ac2-48dd-9bfe-378803e079b3', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', '652ebeeb-52ae-49a1-b8e2-dee02d11410d'),
('bd5d925e-74a0-4056-94ab-36a1dbf3cb3d', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', '66fd9732-0733-439c-9d96-4c7b59c8908f'),
('27f7fa14-2c0b-4352-8cce-a581d819e215', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', '6d9dff73-cabf-4293-81ee-f0123256eaa7'),
('e5c6125b-4e76-4aac-b62a-302dcf51d436', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', '6e63691f-90f6-4ae5-a6a5-f26ff89a3a87'),
('45117e28-5623-42ee-9312-71333f9c42d3', 'bf1fab63-9b0e-4df1-823f-d2a127ce16e5', '50c008f4-0f72-4aec-8998-c4fe1ffce4ed'),
('f56c159d-6258-4d3d-8824-6eb91a82ca03', 'bf1fab63-9b0e-4df1-823f-d2a127ce16e5', 'b011d206-a5eb-4555-81bd-23a164e1776d'),
('3723d219-9d7e-40c8-97c7-5e863f03eff3', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', '33442547-4c46-4278-a51b-07fe50dc52d2'),
('314cfcdc-9c69-431a-a8f6-049d92b4a40a', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', '652ebeeb-52ae-49a1-b8e2-dee02d11410d'),
('cebdd606-db70-4ad7-98b4-05447d608882', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', '66fd9732-0733-439c-9d96-4c7b59c8908f'),
('0402ce04-bd90-4904-91f7-e2ba6aaa973a', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', '6d9dff73-cabf-4293-81ee-f0123256eaa7'),
('4062d0fc-27a3-4cf5-883e-c8a94cc996f0', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', '6e63691f-90f6-4ae5-a6a5-f26ff89a3a87'),
('9ce2a3e5-ad03-43da-aed2-5adaed09e52f', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', '652ebeeb-52ae-49a1-b8e2-dee02d11410d'),
('af2f5578-8337-43cc-92ab-71d5e5367219', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', '66fd9732-0733-439c-9d96-4c7b59c8908f'),
('aca2c42f-aa94-474f-92a7-d2dbac73f3ce', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', '6d9dff73-cabf-4293-81ee-f0123256eaa7'),
('61dc075d-3164-41e8-b2cb-6e362c1dd29a', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', '6e63691f-90f6-4ae5-a6a5-f26ff89a3a87'),
('210a6f71-9ebd-4b55-999b-61a3b10730ac', 'e7826a7a-63fe-4429-acca-17f2565631d6', '50c008f4-0f72-4aec-8998-c4fe1ffce4ed'),
('c8af1278-c6c5-455c-b9de-fb7f80a5bb58', 'e7826a7a-63fe-4429-acca-17f2565631d6', '66fd9732-0733-439c-9d96-4c7b59c8908f'),
('7d034239-a748-4a70-b963-233d23be6a4e', 'e7826a7a-63fe-4429-acca-17f2565631d6', '70102c44-eaff-4a8a-b14b-472a4da49a34'),
('588ae00a-eadc-46bd-a87d-79affa9c5b2d', 'eccaf85e-4a95-479f-81fa-04441d959843', '33442547-4c46-4278-a51b-07fe50dc52d2'),
('3c41e0d7-a2ea-4511-9cdc-39fcd41b2262', 'eccaf85e-4a95-479f-81fa-04441d959843', '50c008f4-0f72-4aec-8998-c4fe1ffce4ed'),
('2a611835-4274-4e2d-9818-3f6af85ef664', 'eccaf85e-4a95-479f-81fa-04441d959843', '66fd9732-0733-439c-9d96-4c7b59c8908f'),
('efa2c311-86a8-4f15-b069-46634616ba98', 'eccaf85e-4a95-479f-81fa-04441d959843', '8774f28b-f7c0-48f9-82f1-72d5a1ab6025'),
('29256bd5-dbf4-4389-b368-8b084b16ce7f', 'eccaf85e-4a95-479f-81fa-04441d959843', 'b011d206-a5eb-4555-81bd-23a164e1776d'),
('4df9c8d3-4d06-472a-8ebb-b064010da83f', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', '33442547-4c46-4278-a51b-07fe50dc52d2'),
('bb9b7e16-ef57-4e4e-88f4-37d56bc022a1', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', '652ebeeb-52ae-49a1-b8e2-dee02d11410d'),
('ea4091d9-c02d-4ba2-910a-a07ff18ff8a3', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', '66fd9732-0733-439c-9d96-4c7b59c8908f');

-- --------------------------------------------------------

--
-- Table structure for table `product_freebies`
--

CREATE TABLE `product_freebies` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_freebies`
--

INSERT INTO `product_freebies` (`id`, `productId`, `name`, `image`, `sortOrder`, `createdAt`) VALUES
('0656001b-5ecb-4a06-8097-e92daf5dc8c0', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'Waterproof Protector', NULL, 1, '2026-03-02 07:32:20.277'),
('0840451a-42aa-441c-b530-ee50c1c79cd1', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Waterproof Protector', NULL, 1, '2026-03-02 07:32:19.185'),
('0e7628ef-5fd9-4b59-a983-bc4e83fc1b9d', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Free Pillow', NULL, 0, '2026-03-02 07:32:19.382'),
('1b89fbea-16ba-4626-8b8f-88ddead94b31', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Free Pillow', NULL, 0, '2026-03-02 07:32:19.477'),
('1f147d29-cd54-4a17-abd3-f014071e2c17', 'a4120b13-b182-46a8-9af6-84896f16f391', 'Free Pillow', NULL, 0, '2026-03-02 07:32:19.793'),
('21c4fd63-a682-4b89-8dc2-61719198421c', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Waterproof Protector', NULL, 1, '2026-03-02 07:32:19.480'),
('28463104-76f8-4b5f-992c-362523968712', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'Waterproof Protector', NULL, 1, '2026-03-02 07:32:20.050'),
('2a826be9-1f77-46e1-846b-433ffb0767c3', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Free Pillow', NULL, 0, '2026-03-02 07:32:19.183'),
('319ab86f-6943-44c5-891f-6554b2a8aa94', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'Free Pillow', NULL, 0, '2026-03-02 07:32:20.274'),
('374364ce-fa81-4509-89e8-30afd4a423ed', 'bf1fab63-9b0e-4df1-823f-d2a127ce16e5', 'Free pillow', '/uploads/products/product-1773311184237-pqa9woyug9h.jpg', 0, '2026-03-12 10:27:29.855'),
('3cedc949-e861-4a00-bc40-a3908f1bb4c3', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Waterproof Protector', NULL, 1, '2026-03-02 07:32:19.607'),
('434de5ef-ca07-4cab-8b48-3d3c3b257588', '0358a2f6-b70d-4aff-8ba3-b8f3bc8e131f', 'Water proof bed', NULL, 1, '2026-03-06 11:23:53.570'),
('441718ff-86fb-4f5a-a638-836d379cc50a', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'Waterproof Protector', NULL, 1, '2026-03-02 07:32:20.182'),
('4c5647fb-eff4-4215-8f91-49a145fef958', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Waterproof Protector', NULL, 1, '2026-03-02 07:32:19.963'),
('5966ced2-8f8b-4e25-ac87-c81f56b00f5e', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'Free Pillow', NULL, 0, '2026-03-02 07:32:20.179'),
('5fd482a0-d1aa-4165-9516-6a9f595dd26a', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Waterproof Protector', NULL, 1, '2026-03-02 07:32:19.880'),
('672be8e4-624b-4b83-bc73-489d85ff5c93', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'Waterproof Protector', NULL, 1, '2026-03-02 07:32:19.706'),
('79df5fbf-7f10-4709-a449-6cf15d8cfcbb', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'Free Pillow', NULL, 0, '2026-03-02 07:32:20.048'),
('92d1fdc2-777a-4978-977f-0fc489e56404', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'Waterproof Protector', NULL, 1, '2026-03-02 07:32:19.285'),
('9ad27269-d40a-444c-a8f5-3ec882ff7327', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'Waterproof Protector', NULL, 1, '2026-03-02 07:32:18.922'),
('9b5a0f91-efcc-4f18-9868-866a4ffe5e56', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'Free Pillow', NULL, 0, '2026-03-02 07:32:19.283'),
('a10c93fa-fea2-4a74-a1f8-8980a132aadc', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Free Pillow', NULL, 0, '2026-03-02 07:32:19.878'),
('a407ffc1-66e2-4edb-9fef-79234685daec', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Waterproof Protector', NULL, 1, '2026-03-02 07:32:19.011'),
('aa29f3e1-82c9-4707-be21-fdb7a13c8d0c', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'Free Pillow', NULL, 0, '2026-03-02 07:32:18.920'),
('bba1a516-7502-4a05-a9bc-d617f40f0afd', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Free Pillow', NULL, 0, '2026-03-02 07:32:19.009'),
('bd5a6b47-dd0c-4b85-9c18-cfd273911785', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'Free Pillow', NULL, 0, '2026-03-02 07:32:19.704'),
('c54d9742-eb81-4de3-9913-d39cfe809275', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Waterproof Protector', NULL, 1, '2026-03-02 07:32:19.385'),
('c82af074-9ab3-478c-a77e-6c9a8a4f83e1', '38f13369-973d-4457-8e04-e9a31c132663', 'Free Pillow', NULL, 0, '2026-03-02 07:32:18.844'),
('d033888a-3cf8-4865-8bdc-a8ec244bc436', 'bf1fab63-9b0e-4df1-823f-d2a127ce16e5', 'water proof', '/uploads/products/product-1773311210452-ea5r5i19se4.jpg', 1, '2026-03-12 10:27:29.855'),
('eb56e933-f3f9-4ef3-9bb5-495c895a4385', 'a4120b13-b182-46a8-9af6-84896f16f391', 'Waterproof Protector', NULL, 1, '2026-03-02 07:32:19.795'),
('eba259b4-d9f5-4ec6-8df8-2109dcfec267', '38f13369-973d-4457-8e04-e9a31c132663', 'Waterproof Protector', NULL, 1, '2026-03-02 07:32:18.846'),
('eca411ed-ca86-4021-895a-1f240234762a', '0358a2f6-b70d-4aff-8ba3-b8f3bc8e131f', 'Free Pillow', '/uploads/products/product-1772782509839-brqkask2caf.jpg', 0, '2026-03-06 11:23:53.570'),
('ee124972-c907-45dc-891e-dd22210df38c', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Free Pillow', NULL, 0, '2026-03-02 07:32:19.960'),
('fdc23526-2566-475f-bcc0-76acf1011759', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Free Pillow', NULL, 0, '2026-03-02 07:32:19.601');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `url` varchar(191) NOT NULL,
  `altText` varchar(191) DEFAULT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `isPrimary` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `productId`, `url`, `altText`, `sortOrder`, `isPrimary`, `createdAt`) VALUES
('01fee22e-4757-433e-8b4e-226048dbddee', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'https://mattressfactory.in/wp-content/uploads/2025/01/view.jpg', 'Bonnell Spring Mattress', 0, 1, '2026-03-02 07:32:19.032'),
('09051706-ec81-4f91-97e1-a7af56934028', '59782b5d-5102-4810-ab0e-fac78483ecca', 'https://mattressfactory.in/wp-content/uploads/2025/01/reactive-plus2-1-1.jpg', 'Demo', 1, 0, '2026-03-06 09:52:54.464'),
('0b0382eb-4451-4199-8587-307311131b90', '38f13369-973d-4457-8e04-e9a31c132663', 'https://mattressfactory.in/wp-content/uploads/2024/11/02.jpg', 'Bliss Latex Foam Mattress', 1, 0, '2026-03-02 07:32:18.786'),
('0c2fbd40-2537-4daa-a4f0-80156740de49', '38f13369-973d-4457-8e04-e9a31c132663', 'https://mattressfactory.in/wp-content/uploads/2024/11/04.jpg', 'Bliss Latex Foam Mattress', 3, 0, '2026-03-02 07:32:18.794'),
('0feb0fe5-8612-4c37-9971-21f9779a234d', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'https://mattressfactory.in/wp-content/uploads/2025/01/reactive-rebounded2.jpg', 'Reactive Re-bonded Foam Mattress', 2, 0, '2026-03-02 07:32:20.213'),
('16247399-4a01-42f5-8067-114ef974a91e', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'https://mattressfactory.in/wp-content/uploads/2025/01/reactive-rebounded1.jpg', 'Reactive Re-bonded Foam Mattress', 0, 1, '2026-03-02 07:32:20.208'),
('16ed8b7b-bddd-442c-b66d-38711e8cb5b6', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'https://mattressfactory.in/wp-content/uploads/2025/01/reactive-rebounded3.jpg', 'Reactive Re-bonded Foam Mattress', 1, 0, '2026-03-02 07:32:20.211'),
('17464caa-af95-43d7-a3c4-8e5dca5bfefb', 'eccaf85e-4a95-479f-81fa-04441d959843', 'https://mattressfactory.in/wp-content/uploads/2025/01/GetAllProductDetailsImages-2.jpg', 'Grande Mattress', 0, 1, '2026-03-02 07:32:19.411'),
('1b503f21-85ac-45ac-8fb3-6b5cd018bcd2', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'https://mattressfactory.in/wp-content/uploads/2025/01/top-view-2.jpg', 'Bonnell Spring Mattress', 1, 0, '2026-03-02 07:32:19.035'),
('1eef6c41-1f88-472a-9acf-bd532903b4fe', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'https://mattressfactory.in/wp-content/uploads/2025/01/1-1.jpg', 'Bonnell Plus Mattress', 1, 0, '2026-03-02 07:32:18.947'),
('1fa5ddc6-55b7-470b-ba56-249ee41d19a9', '352de8a6-d0ef-45d5-a720-d78790250bed', 'https://mattressfactory.in/wp-content/uploads/2025/01/eurotopk2-1.jpg', 'Euro Top-K Mattress', 0, 1, '2026-03-02 07:32:19.313'),
('2082aebd-9eb9-44e9-804d-9ba738f71091', '352de8a6-d0ef-45d5-a720-d78790250bed', 'https://mattressfactory.in/wp-content/uploads/2025/01/web_ergo-foam.png', 'Euro Top-K Mattress', 3, 0, '2026-03-02 07:32:19.321'),
('20b142d4-46bb-4c41-b0ac-161a9f0e8985', 'a4120b13-b182-46a8-9af6-84896f16f391', 'https://mattressfactory.in/wp-content/uploads/2025/01/budget-pocket-3.jpg', 'Memory Foam Deluxe Mattress', 2, 0, '2026-03-02 07:32:19.738'),
('2da201da-4fa1-46ee-ae09-f4d6dc641dfb', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'https://mattressfactory.in/wp-content/uploads/2025/01/reactive-plus-latex.jpg', 'Reactive Plus Memory Foam Mattress', 3, 0, '2026-03-02 07:32:20.087'),
('31871d6d-5d5d-4823-be7c-3cbad1acb701', 'b3dd7723-8687-47ec-a46b-08553530378a', 'https://mattressfactory.in/wp-content/uploads/2025/01/leaftlet3.jpg', 'Pocket Spring Deluxe Mattress', 2, 0, '2026-03-02 07:32:19.902'),
('39fcccc9-dbc1-4ed4-86f0-51be518b6d12', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'https://mattressfactory.in/wp-content/uploads/2025/01/plush2-2.jpg', 'Plush Mattress', 0, 1, '2026-03-02 07:32:19.818'),
('471b8a31-bc20-4b04-a45d-4a4e7be3fdf6', '352de8a6-d0ef-45d5-a720-d78790250bed', 'https://mattressfactory.in/wp-content/uploads/2025/01/eurotopk3-1.jpg', 'Euro Top-K Mattress', 2, 0, '2026-03-02 07:32:19.319'),
('48e4dc7e-7060-4251-b916-5f2a866cee9f', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'https://mattressfactory.in/wp-content/uploads/2025/01/side-view-2.jpg', 'Bonnell Spring Mattress', 2, 0, '2026-03-02 07:32:19.037'),
('50dcc69b-5900-49c1-8dd2-bdee79fd22ce', '0358a2f6-b70d-4aff-8ba3-b8f3bc8e131f', '/uploads/products/product-1772781562903-lkzxt6li72f.jpg', NULL, 1, 0, '2026-03-06 11:23:53.507'),
('543918a4-a66f-4ca7-af53-7bf8fc22424c', 'bf1fab63-9b0e-4df1-823f-d2a127ce16e5', '/uploads/products/product-1773311085416-5j7ezslnwso.jpg', NULL, 1, 0, '2026-03-12 10:27:29.855'),
('58a9023b-4288-4297-8f85-c342c1a4f3b7', '0358a2f6-b70d-4aff-8ba3-b8f3bc8e131f', '/uploads/products/product-1772781553093-2qiwtlqmm0w.jpg', NULL, 0, 1, '2026-03-06 11:23:53.507'),
('59b27fcd-1369-43a4-ab67-a3f8e7bf45b8', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'https://mattressfactory.in/wp-content/uploads/2024/11/bliss-latex-foam.jpg', 'Bliss Memory Foam Mattress', 4, 0, '2026-03-02 07:32:18.879'),
('5cebfa93-73a6-4ece-a785-095ec44cb694', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'https://mattressfactory.in/wp-content/uploads/2025/01/inte.jpg', 'Bonnell Plus Mattress', 3, 0, '2026-03-02 07:32:18.951'),
('679e3e78-dee1-4ce5-8d50-2801e5659f2a', '38f13369-973d-4457-8e04-e9a31c132663', 'https://mattressfactory.in/wp-content/uploads/2024/11/bliss-latex-foam.jpg', 'Bliss Latex Foam Mattress', 4, 0, '2026-03-02 07:32:18.796'),
('6ad73fa2-1135-4975-8e4f-5ecdad2b2c7b', '36af496c-a620-4b7c-9fbb-421ff6640123', 'https://mattressfactory.in/wp-content/uploads/2025/01/0111.jpg', 'Grande Plus Mattress', 2, 0, '2026-03-02 07:32:19.508'),
('6dc5f3ba-770e-4699-9620-70838195b4e8', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'https://mattressfactory.in/wp-content/uploads/2025/01/coirmaxdelux4.png', 'Coir Max Deluxe Mattress', 3, 0, '2026-03-02 07:32:19.222'),
('6fe4748b-61c8-4232-bf63-44663b89e115', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'https://mattressfactory.in/wp-content/uploads/2025/01/reactive-plus3.jpg', 'Reactive Plus Latex Foam Mattress', 0, 1, '2026-03-02 07:32:19.989'),
('744dadde-431c-4bed-964c-65cd0740274f', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'https://mattressfactory.in/wp-content/uploads/2025/01/latexfoam-deluxe1.jpg', 'Latex Foam Deluxe Mattress', 3, 0, '2026-03-02 07:32:19.648'),
('7640dc9e-7093-4e2e-b7fe-03479f22fd53', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'https://mattressfactory.in/wp-content/uploads/2025/01/cross-section-of-bonnel.png', 'Bonnell Spring Mattress', 3, 0, '2026-03-02 07:32:19.040'),
('7de0336e-a23c-4421-b32c-894e0c40cccc', '36af496c-a620-4b7c-9fbb-421ff6640123', 'https://mattressfactory.in/wp-content/uploads/2025/01/4-plus.jpg', 'Grande Plus Mattress', 1, 0, '2026-03-02 07:32:19.506'),
('802be0a7-e883-4e0d-bbc4-724d4d53a8e3', 'b3dd7723-8687-47ec-a46b-08553530378a', 'https://mattressfactory.in/wp-content/uploads/2025/01/bp.jpg', 'Pocket Spring Deluxe Mattress', 1, 0, '2026-03-02 07:32:19.900'),
('80aa52b3-3d88-4158-8313-0a0cde982a15', '38f13369-973d-4457-8e04-e9a31c132663', 'https://mattressfactory.in/wp-content/uploads/2024/11/03.jpg', 'Bliss Latex Foam Mattress', 2, 0, '2026-03-02 07:32:18.788'),
('8aa03fed-220d-4cb1-be38-de98d2699203', '36af496c-a620-4b7c-9fbb-421ff6640123', 'https://mattressfactory.in/wp-content/uploads/2025/01/3-plus.jpg', 'Grande Plus Mattress', 0, 1, '2026-03-02 07:32:19.503'),
('90af4035-3760-4eeb-be7b-ff70a8baf3f1', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'https://mattressfactory.in/wp-content/uploads/2025/01/reactive-plus-latex.jpg', 'Reactive Plus Latex Foam Mattress', 1, 0, '2026-03-02 07:32:19.991'),
('9147dd6e-626b-4362-9371-04d3e41c193d', 'b3dd7723-8687-47ec-a46b-08553530378a', 'https://mattressfactory.in/wp-content/uploads/2025/01/spine-care6.jpg', 'Pocket Spring Deluxe Mattress', 3, 0, '2026-03-02 07:32:19.905'),
('9446d220-74d5-4c8b-8085-632491cc2f76', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'https://mattressfactory.in/wp-content/uploads/2025/01/plush2.jpg', 'Plush Mattress', 1, 0, '2026-03-02 07:32:19.821'),
('95e2b9b4-10c3-42c1-a85e-99a21ba25348', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'https://mattressfactory.in/wp-content/uploads/2025/01/reactive-plus2-1.jpg', 'Reactive Plus Memory Foam Mattress', 2, 0, '2026-03-02 07:32:20.084'),
('9a8f956b-aec2-44e6-9d0c-6ab33b9e72b5', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'https://mattressfactory.in/wp-content/uploads/2025/01/budget-pocket-3.jpg', 'Latex Foam Deluxe Mattress', 2, 0, '2026-03-02 07:32:19.645'),
('9e343f81-1ad0-4943-aec7-4e148f84d72e', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'https://mattressfactory.in/wp-content/uploads/2024/11/01.jpg', 'Bliss Memory Foam Mattress', 0, 1, '2026-03-02 07:32:18.871'),
('a0ad5ceb-fd59-4f19-9af3-42205d8ff3d4', 'a4120b13-b182-46a8-9af6-84896f16f391', 'https://mattressfactory.in/wp-content/uploads/2025/01/budget-pocket-1.jpg', 'Memory Foam Deluxe Mattress', 0, 1, '2026-03-02 07:32:19.733'),
('a4ef259d-e219-4af2-b753-cfa3786d0c2f', '36af496c-a620-4b7c-9fbb-421ff6640123', 'https://mattressfactory.in/wp-content/uploads/2025/01/grande-plus-1.jpg', 'Grande Plus Mattress', 3, 0, '2026-03-02 07:32:19.510'),
('b0285a42-e739-40c3-bfd7-683a5a09c431', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'https://mattressfactory.in/wp-content/uploads/2024/11/03.jpg', 'Bliss Memory Foam Mattress', 2, 0, '2026-03-02 07:32:18.875'),
('b03fade5-3e7d-42bc-b0ab-ea0964509994', '38f13369-973d-4457-8e04-e9a31c132663', 'https://mattressfactory.in/wp-content/uploads/2024/11/01.jpg', 'Bliss Latex Foam Mattress', 0, 1, '2026-03-02 07:32:18.784'),
('b2e06004-804c-4b5a-9e5d-0e24f27dc580', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'https://mattressfactory.in/wp-content/uploads/2024/11/02.jpg', 'Bliss Memory Foam Mattress', 1, 0, '2026-03-02 07:32:18.873'),
('b34f5801-1e46-416d-b686-59750ed54b2f', 'a4120b13-b182-46a8-9af6-84896f16f391', 'https://mattressfactory.in/wp-content/uploads/2025/01/latexfoam-deluxe1.jpg', 'Memory Foam Deluxe Mattress', 3, 0, '2026-03-02 07:32:19.740'),
('b522ffb0-d620-4872-881f-bd9858159248', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'https://mattressfactory.in/wp-content/uploads/2025/01/coirmaxdelux2.png', 'Coir Max Deluxe Mattress', 0, 1, '2026-03-02 07:32:19.213'),
('b98fa9de-ec11-4a80-86e0-c1b0ee0dcd67', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'https://mattressfactory.in/wp-content/uploads/2025/01/plush2-1.jpg', 'Plush Mattress', 2, 0, '2026-03-02 07:32:19.824'),
('bb130477-5d41-4625-bf25-ecb4313c40cd', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'https://mattressfactory.in/wp-content/uploads/2025/01/2-1.jpg', 'Bonnell Plus Mattress', 0, 1, '2026-03-02 07:32:18.944'),
('c3741640-886e-48ed-94f5-ca8b178daa40', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'https://mattressfactory.in/wp-content/uploads/2025/01/reactive-plus2-2.jpg', 'Reactive Plus Memory Foam Mattress', 1, 0, '2026-03-02 07:32:20.082'),
('c8ffa406-b56f-480f-bbcf-9f3eb3d1af2f', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'https://mattressfactory.in/wp-content/uploads/2025/01/budget-pocket-1.jpg', 'Latex Foam Deluxe Mattress', 0, 1, '2026-03-02 07:32:19.640'),
('cad97b3a-422f-46b1-951c-2189ffa884fa', 'a4120b13-b182-46a8-9af6-84896f16f391', 'https://mattressfactory.in/wp-content/uploads/2025/01/budget-pocket-2.jpg', 'Memory Foam Deluxe Mattress', 1, 0, '2026-03-02 07:32:19.735'),
('d6125a3f-9eba-4e99-8ce2-452aea6d24dd', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'https://mattressfactory.in/wp-content/uploads/2025/01/budget-pocket-2.jpg', 'Latex Foam Deluxe Mattress', 1, 0, '2026-03-02 07:32:19.643'),
('d7f2dcff-fb28-4cbc-96b7-fb6cf3858e86', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'https://mattressfactory.in/wp-content/uploads/2024/11/04.jpg', 'Bliss Memory Foam Mattress', 3, 0, '2026-03-02 07:32:18.877'),
('dc1bbca0-42fb-4012-995f-db73871aec6f', '59782b5d-5102-4810-ab0e-fac78483ecca', 'https://mattressfactory.in/wp-content/uploads/2025/01/reactive-plus3-1.jpg', 'Demo', 0, 1, '2026-03-06 09:52:54.464'),
('ddce2014-2b80-4bf8-95bb-09c5a99305b1', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'https://mattressfactory.in/wp-content/uploads/2025/01/reactive-plus2-2.jpg', 'Reactive Plus Latex Foam Mattress', 2, 0, '2026-03-02 07:32:19.994'),
('df112b11-fba1-4a9b-a1bd-50b1150a4fc2', 'eccaf85e-4a95-479f-81fa-04441d959843', 'https://mattressfactory.in/wp-content/uploads/2025/01/GetProductImage-1-1.jpg', 'Grande Mattress', 1, 0, '2026-03-02 07:32:19.413'),
('e03a1473-eda4-4c0a-b09b-3942200bb21d', 'bf1fab63-9b0e-4df1-823f-d2a127ce16e5', '/uploads/products/product-1773311076504-7s6t3huzxrh.webp', NULL, 0, 1, '2026-03-12 10:27:29.855'),
('e25eb528-d150-476b-adb6-4764264d5cfd', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'https://mattressfactory.in/wp-content/uploads/2025/01/web_impressa-plus-1.jpg', 'Plush Mattress', 3, 0, '2026-03-02 07:32:19.826'),
('e38170d3-a29d-4ca9-91f3-055c5b0722d8', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'https://mattressfactory.in/wp-content/uploads/2025/01/reactive-plus3.jpg', 'Reactive Plus Memory Foam Mattress', 0, 1, '2026-03-02 07:32:20.079'),
('e52d8892-7285-4f40-95dc-2bb3235274f9', 'eccaf85e-4a95-479f-81fa-04441d959843', 'https://mattressfactory.in/wp-content/uploads/2025/01/SILVERSPRING-copy.png', 'Grande Mattress', 3, 0, '2026-03-02 07:32:19.418'),
('e612a31a-d51c-4cc7-82ae-cc53d15f4636', '352de8a6-d0ef-45d5-a720-d78790250bed', 'https://mattressfactory.in/wp-content/uploads/2025/01/eurotopk4-1.jpg', 'Euro Top-K Mattress', 1, 0, '2026-03-02 07:32:19.315'),
('e9eafab8-f53e-42fd-83cc-4a9f54400bb7', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'https://mattressfactory.in/wp-content/uploads/2025/01/coirmaxdelux3.png', 'Coir Max Deluxe Mattress', 2, 0, '2026-03-02 07:32:19.219'),
('efed3334-41fc-44d4-aa36-0faa4555c7f5', '59782b5d-5102-4810-ab0e-fac78483ecca', 'https://mattressfactory.in/wp-content/uploads/2025/01/reactive-plus-latex-1.jpg', 'Demo', 2, 0, '2026-03-06 09:52:54.464'),
('f2fdab27-73ca-4a17-8af4-3a9073f7e853', 'eccaf85e-4a95-479f-81fa-04441d959843', 'https://mattressfactory.in/wp-content/uploads/2025/01/GetProductImage-4.jpg', 'Grande Mattress', 2, 0, '2026-03-02 07:32:19.416'),
('f445ea8d-9137-4e3b-ab2d-aa4e467df25d', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'https://mattressfactory.in/wp-content/uploads/2025/01/3-1.jpg', 'Bonnell Plus Mattress', 2, 0, '2026-03-02 07:32:18.949'),
('f59955a7-ca64-44bb-95d9-dd060544783e', 'b3dd7723-8687-47ec-a46b-08553530378a', 'https://mattressfactory.in/wp-content/uploads/2025/01/spine-care-2.jpg', 'Pocket Spring Deluxe Mattress', 0, 1, '2026-03-02 07:32:19.898'),
('f603645d-a6b3-4817-b021-487be180bc67', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'https://mattressfactory.in/wp-content/uploads/2025/01/reactive-plus2-1.jpg', 'Reactive Plus Latex Foam Mattress', 3, 0, '2026-03-02 07:32:19.996'),
('f9a318d2-1247-4a88-a5e1-e011f25c2d1d', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'https://mattressfactory.in/wp-content/uploads/2025/01/coirmaxdelux1.png', 'Coir Max Deluxe Mattress', 1, 0, '2026-03-02 07:32:19.216');

-- --------------------------------------------------------

--
-- Table structure for table `product_specifications`
--

CREATE TABLE `product_specifications` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `label` varchar(191) NOT NULL,
  `value` text NOT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_specifications`
--

INSERT INTO `product_specifications` (`id`, `productId`, `label`, `value`, `sortOrder`, `createdAt`) VALUES
('0222cd88-3652-49ac-b61c-713238d4743a', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'Combination', 'LATEX FOAM + SOFTY FOAM + REBONDED FOAM', 1, '2026-03-02 07:32:20.006'),
('04e0c821-f5a2-401d-94db-a0d115f8c69e', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Secondary LAYER', '-', 7, '2026-03-02 07:32:19.928'),
('05717485-ae3f-474a-9b5d-9403d7daa9fd', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Warranty', '5 Years', 12, '2026-03-02 07:32:19.361'),
('05d9cc5d-d6cd-4e6b-a202-108b5d8ab49a', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Primary LAYER', 'COTTON FELT', 6, '2026-03-02 07:32:19.342'),
('069d5b42-d5af-426d-a2bd-07d51fc1eb18', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Mattress Description', 'ONE SIDE EURO -TOP', 2, '2026-03-02 07:32:19.332'),
('0736d77b-d9de-4e23-82e4-2cf54079135c', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Quilt', 'DOUBLE FOAM (10MM * 2 LAYERS ) PEELED PUF, BOTH SIDES OF BLOCK', 8, '2026-03-02 07:32:19.348'),
('0bd122cc-fa0f-4708-9c4f-9efc7c1c6c83', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'Fabric', 'KNITTED FABRIC', 7, '2026-03-02 07:32:20.109'),
('0be5e788-2d8f-4d31-b2ba-8ba0a9fa1722', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Grade Type', 'PLUSH MATTRESS', 0, '2026-03-02 07:32:19.831'),
('0cd49223-37c5-4fc8-a21b-38799d36d58d', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Fabric', 'PREMIUM KNITTED', 9, '2026-03-02 07:32:19.933'),
('0cf1768a-982f-4432-802d-06a932ab51ee', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Tensile Strength of Wire', '1550 ~ 1700 N/m2', 5, '2026-03-02 07:32:19.126'),
('0df4f509-124c-4feb-8107-90c756311eba', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Mattress Description', 'REGULAR', 2, '2026-03-02 07:32:19.916'),
('0e5516ca-a040-4d05-9f9e-3df43e379863', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Border/Edge Support/Side Support', '4MM BORDER WIRE', 4, '2026-03-02 07:32:18.966'),
('0f760b85-2c71-44ad-af12-8420eb316cad', 'a4120b13-b182-46a8-9af6-84896f16f391', 'Warranty', '5 Years', 9, '2026-03-02 07:32:19.771'),
('11986cc6-f605-4772-bb01-a2f6ec3bebbb', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Primary LAYER', 'MEDIUM DENSITY COTTON FELT', 6, '2026-03-02 07:32:19.926'),
('124fda2a-5e63-45f4-bb2e-ffc7a98caccd', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'Mattress Description', 'REACTIVE', 2, '2026-03-02 07:32:20.225'),
('14e2d701-6658-44b0-8748-8bdf12805c34', 'a4120b13-b182-46a8-9af6-84896f16f391', 'Comfort level/firmness', 'MEDIUM FIRM', 8, '2026-03-02 07:32:19.766'),
('1567230c-89fc-48df-b417-50e72e811558', '38f13369-973d-4457-8e04-e9a31c132663', 'Upper  LAYER', 'LATEX FOAM + SOFTY FOAM', 3, '2026-03-02 07:32:18.810'),
('166ce585-63d4-45df-b40a-69a315449ea3', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Warranty', '5 Years', 10, '2026-03-02 07:32:19.857'),
('196f4a81-71c7-4c67-8f33-2e7431cddc4a', 'a4120b13-b182-46a8-9af6-84896f16f391', 'Type of FOAM', 'MEMORY FOAM + Rebonded foam + PREMIUM FOAM + SOFTY FOAM', 1, '2026-03-02 07:32:19.747'),
('1a89e286-5ca6-425b-86ff-81cd2aaa8c8a', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Brand', 'Refresh Springs', 11, '2026-03-02 07:32:19.860'),
('1b1b21c5-2126-4a8a-8e27-7059b5047c68', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'Grade Type', 'REBONDED', 0, '2026-03-02 07:32:20.219'),
('1b934fbd-1bee-420f-b302-353000c770f3', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Brand', 'Refresh Springs', 13, '2026-03-02 07:32:19.943'),
('1be4a033-f7c1-4018-9537-415fb45eac39', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'BOTTOM LAYER', 'REBONDED FOAM', 6, '2026-03-02 07:32:19.243'),
('1c58788d-0920-4113-9e3b-081cdc3a48f9', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Thickness of finished mattress', '11 inch', 10, '2026-03-02 07:32:19.355'),
('1f4c7ad5-3e64-4313-851c-c56c24935600', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Comfort level/firmness', 'Medium Soft', 11, '2026-03-02 07:32:19.938'),
('20df8dc5-d22a-4ae9-b91d-6f5b82befe92', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Brand', 'Refresh Springs', 14, '2026-03-02 07:32:19.574'),
('21ecf46b-2ae7-48f3-9ff1-f85c648c96e2', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Quilt', 'SINGLE FOAM (10MM )PEELED PUF,BOTH SIDES OF BLOCK', 6, '2026-03-02 07:32:19.846'),
('243400e7-90c7-45c6-83f5-639a4ebe813a', 'bf1fab63-9b0e-4df1-823f-d2a127ce16e5', 'Combination', 'REBONDED + SOFTY FOAM', 2, '2026-03-12 10:27:29.855'),
('2677bfe6-cb87-4ba1-bdf7-c0bbf29c173e', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'Mattress Description', 'DUAL COMFORTER  MATTRESS', 2, '2026-03-02 07:32:18.887'),
('28f35892-73da-4dee-82e7-78303d2acf44', '38f13369-973d-4457-8e04-e9a31c132663', 'Grade Type', 'BLISS', 0, '2026-03-02 07:32:18.802'),
('2930e26f-a748-4695-bd6a-69974129202a', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Thickness of finished mattress', '6 INCH', 8, '2026-03-02 07:32:19.852'),
('29b2c509-f499-4221-96a6-80ad03a61099', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'Comfort level/firmness', 'MEDIUM FIRM', 8, '2026-03-02 07:32:19.679'),
('2a3c9a48-3693-4b77-a258-bd5758a6fe66', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'USABILITY', 'DOUBLE SIDE USAGE', 7, '2026-03-02 07:32:19.245'),
('2bc185ab-b3b8-40fe-9121-b33861247c76', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'Warranty', '5 Years', 12, '2026-03-02 07:32:19.262'),
('2e35ef39-3d66-4cd7-a873-6104a135ffb8', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'TOP LAYER', 'Rubberized coir', 4, '2026-03-02 07:32:19.238'),
('2ee2b8ad-c4e5-44aa-be60-d51eb05c4da1', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Quilt', 'PEELED PUF, BOTH SIDES OF\r\nBLOCK', 9, '2026-03-02 07:32:19.542'),
('2f0164c2-9a10-407b-8299-cff45d3b4931', '59782b5d-5102-4810-ab0e-fac78483ecca', 'CORE LAYER', 'REBONDED FOAM', 4, '2026-03-06 09:52:54.471'),
('2fb0a386-7ba9-49b2-91d1-c63ac857ce42', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Quilt', 'DOUBLE FOAM (10MM * 2 LAYERS )PEELED PUF, BOTH SIDES OF BLOCK', 8, '2026-03-02 07:32:19.140'),
('2fe12c21-fee5-4d76-8664-7c659cea3658', '59782b5d-5102-4810-ab0e-fac78483ecca', 'Brand', 'Refresh Springs', 12, '2026-03-06 09:52:54.471'),
('30b78cf5-4a46-47e3-b843-eb4b68610664', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'Thickness of finished mattress', '7 inch', 10, '2026-03-02 07:32:19.253'),
('321d6e37-7684-43ae-a158-e8863247c9c3', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'Quilt', 'Double foam (10MM * 2 LAYERS )PEELED PUF,BOTH SIDES OF BLOCK', 7, '2026-03-02 07:32:20.238'),
('354d2ec1-b001-43d2-a620-33b9cd08cdc2', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'Brand', 'Refresh Springs', 13, '2026-03-02 07:32:19.264'),
('368dbcdb-60fc-4bd0-8bb9-80a40514df7a', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Mattress Description', 'DUAL COMFORTER  MATTRESS', 2, '2026-03-02 07:32:19.836'),
('3cb2a7d5-c8b3-436a-bea9-296648303943', '59782b5d-5102-4810-ab0e-fac78483ecca', 'Fabric', 'KNITTED FABRIC', 8, '2026-03-06 09:52:54.471'),
('3d20d4b3-d18f-4c65-9cf0-a8fe620a4e21', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Border/Edge Support/Side Support', 'HIGH DENSITY FOAM', 4, '2026-03-02 07:32:19.434'),
('3d3e9179-2251-45a5-96cc-e8541449dac3', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'COMFORT LAYER/EURO TOP LAYER', 'MEMORY FOAM', 2, '2026-03-02 07:32:20.096'),
('3ea9dfea-c1a5-4c51-80b3-cc94c31154fc', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Secondary LAYER', '-', 7, '2026-03-02 07:32:19.135'),
('3eb344e4-d75c-4738-a9f4-4bb94bba2b6c', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Fabric', 'WOVEN FABRIC', 10, '2026-03-02 07:32:19.448'),
('3f463aee-b319-43c1-bfb2-b049969665f2', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'Brand', 'Refresh Springs', 11, '2026-03-02 07:32:20.031'),
('3f6808f6-67de-41ad-8033-21513082d9c7', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'Upper  LAYER', 'MEMORY FOAM + SOFTY FOAM', 3, '2026-03-02 07:32:18.890'),
('3f9b27c9-1406-4ecd-a4bd-119b7df43efd', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Wire Diameter', '1.8MM', 3, '2026-03-02 07:32:19.429'),
('40d5a450-121f-4bc8-a219-4fb2f2d717b2', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Tensile Strength of Wire', '1550 ~ 1700 N/m2', 5, '2026-03-02 07:32:19.533'),
('413ecad4-b746-45ce-852f-1736abef792f', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Brand', 'Refresh Springs', 13, '2026-03-02 07:32:19.162'),
('42d03fc1-ed26-41e0-b334-86ece230de3f', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'Thickness of finished mattress', '8 inch', 8, '2026-03-02 07:32:20.023'),
('4318e3d6-bb51-4afe-b7e7-cbb71e2b577b', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Primary LAYER', 'COTTON FELT', 6, '2026-03-02 07:32:19.535'),
('441492d7-6c35-40dc-abd7-b006758af2c1', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Core LAYER', 'REBONDED FOAM', 4, '2026-03-02 07:32:19.841'),
('447e92c8-6bd2-4b07-b8c2-cc7a7b05f0da', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Fabric', 'WOVEN FABRIC', 10, '2026-03-02 07:32:19.549'),
('44ef3036-3446-4871-bdd4-fe7487feab29', 'a4120b13-b182-46a8-9af6-84896f16f391', 'Mattress Description', 'DUAL COMFORTER  MATTRESS', 2, '2026-03-02 07:32:19.750'),
('450f681d-bbce-4c2c-ad2a-fc50ffa1a780', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'Fabric', 'KNITTED FABRIC', 8, '2026-03-02 07:32:20.243'),
('45fd437e-24ee-4d66-9c30-620627d5c0d0', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'Fabric', 'KNITTED', 6, '2026-03-02 07:32:18.896'),
('46ad97e0-3406-4772-bc0b-81e581d106a0', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Warranty', '5 Years', 13, '2026-03-02 07:32:19.458'),
('4829f26b-af11-452a-ad48-9ddc2839b185', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Thickness of finished mattress', '11 inch', 11, '2026-03-02 07:32:19.451'),
('4b712034-caf5-42d5-bc0e-ede5c6bec1b0', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'Thickness of finished mattress', '8 INCH', 7, '2026-03-02 07:32:19.677'),
('4b790fdd-f786-4425-bab8-6a2c0a5e60eb', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Grade Type', 'BONNEL SPRING Mattress', 0, '2026-03-02 07:32:19.054'),
('4c0e8929-3380-4b2e-96dd-d6ac1a450018', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Grade Type', 'euro top mattress', 0, '2026-03-02 07:32:19.326'),
('4d3ef9c5-290e-4d07-8c3d-bc8f7bf55511', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'Fabric', 'KNITTED', 6, '2026-03-02 07:32:19.671'),
('4df46a1e-46a1-4c20-a294-58c7dd71cee4', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Warranty', '5 Years', 13, '2026-03-02 07:32:18.989'),
('4e326cd9-44bd-4a89-bd95-db5abac32306', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Comfort level/firmness', 'MEDIUM SOFT', 9, '2026-03-02 07:32:19.854'),
('4f216703-0a96-4703-b782-408bb46a9688', '0358a2f6-b70d-4aff-8ba3-b8f3bc8e131f', 'Combination', ' REBONDED + SOFTY FOAM', 1, '2026-03-06 11:23:53.560'),
('4f8cd79d-9f73-4dcc-968f-20da32c09237', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Tensile Strength of Wire', '1550 ~ 1700 N/m2', 5, '2026-03-02 07:32:19.437'),
('4fe0b7f7-5c17-4444-83ca-b68bc34c5a8c', '38f13369-973d-4457-8e04-e9a31c132663', 'Brand', 'Refresh Springs', 10, '2026-03-02 07:32:18.825'),
('4fe8895a-686f-46bc-99c8-b89da94f3ca9', '59782b5d-5102-4810-ab0e-fac78483ecca', 'USABILITY', 'DOUBLE SIDE USAGE', 6, '2026-03-06 09:52:54.471'),
('5066df6c-744b-436e-a351-8490a43f62c9', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Grade Type', 'BONNEL PLUS MATTRESS', 0, '2026-03-02 07:32:18.957'),
('5201e8fd-565a-46da-8919-10431dae0088', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'COMFORT LAyER/EURO TOP LAYER', 'LATEX FOAM', 2, '2026-03-02 07:32:20.009'),
('525962bd-906d-4673-8998-7e0f66519c71', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Quilt', 'DOUBLE FOAM (10MM * 2 LAYERS) PEELED PUF, BOTH SIDES OF BLOCK', 9, '2026-03-02 07:32:19.446'),
('52b7e7f0-add8-4fc3-9292-ae419c82f0d4', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Mattress Description', 'PILLOW-EURO TOP MEMORY FOAM MATTRESS', 2, '2026-03-02 07:32:19.523'),
('53b3bd29-0474-48ad-8a1b-451bf5d02a01', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'CORE LAYER', 'REBONDED FOAM', 4, '2026-03-02 07:32:20.014'),
('550aaaa7-4ba4-49ca-93a8-8251c0f58cd7', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Grade Type', 'GRANDE', 0, '2026-03-02 07:32:19.422'),
('5560e8b0-4757-4300-9e03-50264ea82f56', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'USABILITY', 'DOUBLE SIDE USAGE', 5, '2026-03-02 07:32:20.104'),
('55870948-fe41-49c5-94f5-7a384bceeca3', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Comfort level/firmness', 'SOFT', 12, '2026-03-02 07:32:18.986'),
('56cad078-ec9f-4cd2-9265-14ab6afc78e8', 'a4120b13-b182-46a8-9af6-84896f16f391', 'Core LAYER', 'PREMIUM FOAM + Rebonded foam', 4, '2026-03-02 07:32:19.755'),
('58f93b2d-d601-4a4a-afb9-8c89ae3d843e', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Comfort level/firmness', 'Medium Soft', 11, '2026-03-02 07:32:19.154'),
('590194fe-fd96-406e-bfbd-d4a25ff68656', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Border/Edge Support/Side Support', 'HIGH DENSITY FOAM', 4, '2026-03-02 07:32:19.337'),
('5d1d79f4-cd6b-4a0b-b623-b49a6eb00424', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Upper  LAYER', 'MEMORY FOAM + SOFTY FOAM', 3, '2026-03-02 07:32:19.839'),
('5e05c4e8-016c-43f5-bd03-686c0d7955d9', '59782b5d-5102-4810-ab0e-fac78483ecca', 'BOTTOM LAYER', 'SOFTY FOAM', 5, '2026-03-06 09:52:54.471'),
('5eea31b4-774b-4ce4-a80c-e09470035d72', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Quilt', 'DOUBLE FOAM (10MM * 2 LAYERS )PEELED PUF,BOTH SIDES OF BLOCK', 8, '2026-03-02 07:32:19.931'),
('5fe7a2a3-ec21-4e9c-8bb3-7ce04c4867d6', '352de8a6-d0ef-45d5-a720-d78790250bed', 'EURO TOP LAYER', '32D FOAM * 2 LAYERS', 7, '2026-03-02 07:32:19.345'),
('6121f60d-8223-416f-8342-732f2737fc94', '38f13369-973d-4457-8e04-e9a31c132663', 'Thickness of finished mattress', '7 INCH', 7, '2026-03-02 07:32:18.818'),
('613b343f-ac8c-4ce9-9c5e-71c1de0a33aa', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'Comfort level/firmness', 'Medium FIRM', 10, '2026-03-02 07:32:20.249'),
('644742ad-08eb-4648-9cb8-dacf1189b813', '38f13369-973d-4457-8e04-e9a31c132663', 'Mattress Description', 'DUAL COMFORTER  MATTRESS', 2, '2026-03-02 07:32:18.807'),
('652e8799-97da-4f2a-a92c-9bf9e249a861', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'Combination', 'MEMORY FOAM + SOFTY FOAM + REBONDED FOAM', 1, '2026-03-02 07:32:20.094'),
('665b89fb-93b3-45fe-8bae-171ca8bc0b06', 'bf1fab63-9b0e-4df1-823f-d2a127ce16e5', 'Combination', 'REBONDED + SOFTY FOAM', 1, '2026-03-12 10:27:29.855'),
('67a1e3f4-14b6-4514-94f6-3168fb20d2c7', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'Type of FOAM', 'LATEX FOAM + REbonded form + PREMIUM FOAM + SOFTY FOAM', 1, '2026-03-02 07:32:19.656'),
('6ae412c8-953e-42a9-b539-e833c88c1093', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Wire Diameter', '2.2MM', 3, '2026-03-02 07:32:18.964'),
('6cac3151-2d70-421f-b830-c0303c3838cd', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'Core LAYER', 'REBONDED FOAM', 4, '2026-03-02 07:32:18.892'),
('6fa7c2cd-2c68-425a-b543-466b3031e33b', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'Comfort level/firmness', 'Medium Firm', 11, '2026-03-02 07:32:19.259'),
('6fc28a6b-26b5-4a11-b920-72e753e11631', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'Combination', 'REBONDED + SOFTY FOAM', 1, '2026-03-02 07:32:20.222'),
('765b60eb-203c-4d31-b05a-84b552c71df8', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'Upper  LAYER', 'LATEX FOAM', 3, '2026-03-02 07:32:19.663'),
('772a94b3-fe9d-4fb4-a938-8ac47bf24e93', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Mattress Description', 'ONE SIDE EURO -TOP', 2, '2026-03-02 07:32:18.962'),
('786c21d2-c8d8-474d-b980-36aa9e527f4d', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Comfort level/firmness', 'Medium Soft', 12, '2026-03-02 07:32:19.455'),
('78970a94-09fd-4b76-8626-bb2437540b3c', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Type of Spring', 'POCKETED', 1, '2026-03-02 07:32:19.329'),
('795df06b-e484-432e-93e6-11a6daccf000', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Fabric', 'KNITTED', 9, '2026-03-02 07:32:19.350'),
('79ebb484-d78a-4d0c-b739-1f7389b35525', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Type of Spring', 'POCKETED', 1, '2026-03-02 07:32:19.425'),
('7a864e0f-b167-4bf4-acf8-9cb082823a71', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Primary LAYER', 'FELT', 6, '2026-03-02 07:32:19.131'),
('7abf6cbe-380b-4657-8d4a-f9caba67e135', '38f13369-973d-4457-8e04-e9a31c132663', 'Bottom LAYER', 'SOFTY FOAM', 5, '2026-03-02 07:32:18.814'),
('7d9fe50f-010b-4fd6-a75b-fa884d117308', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Type of FOAM', 'MEMORY FOAM + SOFTY FOAM + REBONDED FOAM + SOFTY FOAM', 1, '2026-03-02 07:32:19.834'),
('7e52cec6-7a8b-4311-ba17-d2660530fe43', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Secondary layer', '32 DENSITY FOAM', 7, '2026-03-02 07:32:19.442'),
('800b7182-6d11-4b04-a54e-71a96e9d9ed0', '59782b5d-5102-4810-ab0e-fac78483ecca', 'Grade Type', 'REBONDED', 0, '2026-03-06 09:52:54.471'),
('80802037-f3e1-46e5-b417-4f421c0a3924', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Secondary LAYER', '32 DENSITY FOAM', 7, '2026-03-02 07:32:19.538'),
('81f40221-97fd-497c-9be0-d04a9ab14bf8', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Tensile Strength of Wire', '1550 ~ 1700 N/m2', 5, '2026-03-02 07:32:18.969'),
('8271af67-1ffd-44cf-bfbc-7257c5e03f5b', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'Fabric', 'KNITTED FABRIC', 7, '2026-03-02 07:32:20.020'),
('8538d70d-b6fc-4d48-b007-9f86ed288888', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Type of Spring', 'POCKETED', 1, '2026-03-02 07:32:19.520'),
('8543fe56-0a2d-4e35-a9cc-3c639ca812cd', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Comfort level/firmness', 'Top side - Soft, Bottom side - Medium firm', 11, '2026-03-02 07:32:19.358'),
('8644cd2f-4061-4e08-85bd-0640b2bcf0d3', '38f13369-973d-4457-8e04-e9a31c132663', 'Core LAYER', 'REBONDED FOAM', 4, '2026-03-02 07:32:18.812'),
('88be085b-dd1c-4ac5-9f54-e5478809bb1a', 'a4120b13-b182-46a8-9af6-84896f16f391', 'Thickness of finished mattress', '8 INCH', 7, '2026-03-02 07:32:19.763'),
('8aa4619a-cbe6-463e-ab12-464ea7f3bc6e', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Wire Diameter', '1.8MM', 3, '2026-03-02 07:32:19.528'),
('8cf45272-a17d-473f-9f33-50867243d661', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Primary layer', 'COTTON FELT', 6, '2026-03-02 07:32:19.439'),
('8d631e15-6e07-41e3-9eb4-98b780463c3e', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'BOTTOM LAYER', 'SOFTY FOAM', 5, '2026-03-02 07:32:20.233'),
('8d6a5bc7-a4a2-4e39-b3b9-0ba811a79ca7', '0358a2f6-b70d-4aff-8ba3-b8f3bc8e131f', 'Combination', ' REBONDED + SOFTY FOAM', 2, '2026-03-06 11:23:53.560'),
('8e59b737-d260-41e7-9888-60d4ed142dca', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Secondary and comfort LAYER', '3 layers of 1 inch ,32-density softy foam', 7, '2026-03-02 07:32:18.974'),
('8fa5def9-bbd7-4d7a-911e-1de90eb5b837', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'Quilt', 'SINGLE FOAM (16MM * 1 LAYERS )PEELED PUF BOTH THE SIDES', 8, '2026-03-02 07:32:19.248'),
('90410101-2b39-46de-9375-e77072bae16a', '59782b5d-5102-4810-ab0e-fac78483ecca', 'TOP LAYER', 'SOFTY FOAM', 3, '2026-03-06 09:52:54.471'),
('90ecd79f-1f40-4f89-af1a-d93f22c65bc9', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'Grade Type', 'COIR Mattress', 0, '2026-03-02 07:32:19.227'),
('90fd5a36-6ba1-42c1-8bf3-83838ee286a8', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Tensile Strength of Wire', '1550 ~ 1700 N/m2', 5, '2026-03-02 07:32:19.924'),
('918a555e-b554-4a8b-bb4d-ceafd303189f', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'USABILITY', 'DOUBLE SIDE USAGE', 5, '2026-03-02 07:32:20.016'),
('9768f300-06f2-4d15-aece-569dbe3bdff3', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Thickness of finished mattress', '9 inch', 10, '2026-03-02 07:32:19.936'),
('9af06d5b-2466-4a7c-8b4c-fcc2ed1606d4', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Type of Spring', 'BONNEL SPRING', 1, '2026-03-02 07:32:19.066'),
('9b722d7a-4e52-4a55-93ff-b5b646f0d03c', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'Grade Type', 'LATEX FOAM DELUXE MATTRESS', 0, '2026-03-02 07:32:19.653'),
('9baba1e6-b4af-4511-b96e-bd1495046182', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'Brand', 'Refresh Springs', 10, '2026-03-02 07:32:19.685'),
('9c6c23e6-802b-4761-a016-bdaae919403a', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'Bottom LAYER', 'SOFTY FOAM', 5, '2026-03-02 07:32:19.668'),
('a45665ed-3a22-4107-b147-48b37e15a804', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Tensile Strength of Wire', '1550 ~ 1700 N/m2', 5, '2026-03-02 07:32:19.340'),
('a571249e-1876-4dd5-8a6e-e62f325e9c9e', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Primary layer', 'MEDIUM DENSITY COTTON FELT', 6, '2026-03-02 07:32:18.971'),
('a77cb6ae-8c88-4c45-b1cb-f42c86d8cfd7', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Comfort LAYER', 'MULTI LAYER MEMORY FOAM', 8, '2026-03-02 07:32:19.540'),
('a82d8020-ade5-496e-95a9-431b00341e09', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'Fabric', 'KNITTED', 9, '2026-03-02 07:32:19.251'),
('aba52b36-0e1d-4621-872f-d657789c8e23', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'USABILITY', 'DOUBLE SIDE USAGE', 6, '2026-03-02 07:32:20.235'),
('abb2a557-120e-46e7-8cf6-ac2dda10785d', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'Thickness of finished mattress', '6 INCH', 7, '2026-03-02 07:32:18.898'),
('abb60aa1-7edf-44d2-9b11-b1cfe062617b', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'Brand', 'Refresh Springs', 10, '2026-03-02 07:32:18.906'),
('abdb12dd-1bbc-4b0c-98bd-8dd3d1e6902f', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'Grade Type', 'BLISS', 0, '2026-03-02 07:32:18.883'),
('ac27366a-b920-40d6-a171-19c2e2d72b17', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'Combination', 'Rubberized coir + REBONDED FOAM', 1, '2026-03-02 07:32:19.230'),
('ac347db4-433c-4ffa-9f35-faf018aa444a', '59782b5d-5102-4810-ab0e-fac78483ecca', 'Warranty', '5 Years', 11, '2026-03-06 09:52:54.471'),
('ac812aa9-f372-4780-96f1-2098c3980ec7', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'Grade Type', 'REACTIVE PLUS', 0, '2026-03-02 07:32:20.091'),
('af8a5db8-5cb2-4a05-8e64-8789578c3756', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Border/Edge Support/Side Support', 'HIGH DENSITY FOAM / BORDER WIRE', 4, '2026-03-02 07:32:19.531'),
('afa4f3b7-ce7d-46b4-bdbb-59aab1a90253', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'Grade Type', 'REACTIVE PLUS', 0, '2026-03-02 07:32:20.003'),
('b05c96c0-41a3-4f45-b709-d92d573195f0', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'Warranty', '5 Years', 9, '2026-03-02 07:32:18.903'),
('b09066f9-e5bb-45de-8abe-a4d97419f71f', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Comfort layer / Euro Top', '2 LAYERS OF MEMORY FOAM', 8, '2026-03-02 07:32:19.444'),
('b1ffb1c6-5307-4c64-a377-ea7f8d9020be', 'a4120b13-b182-46a8-9af6-84896f16f391', 'Bottom LAYER', 'SOFTY FOAM', 5, '2026-03-02 07:32:19.757'),
('b22d1eb1-57f3-4fb7-a51b-cdf21463795e', '38f13369-973d-4457-8e04-e9a31c132663', 'Type of FOAM', 'LATEX FOAM + SOFTY FOAM + REBONDED FOAM + SOFTY FOAM', 1, '2026-03-02 07:32:18.805'),
('b5496663-2b55-4248-9cd5-1968c102ac67', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'Type of FOAM', 'MEMORY FOAM + SOFTY FOAM + REBONDED FOAM + SOFTY FOAM', 1, '2026-03-02 07:32:18.885'),
('b599bff0-3f85-44e8-91c7-fada280205b9', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'COMFORT LAYER', 'SOFTY FOAM BOTH THE SIDES OF BLOCK', 3, '2026-03-02 07:32:19.235'),
('b5a24d25-aa1e-41d6-94e1-0505589bbad5', 'a4120b13-b182-46a8-9af6-84896f16f391', 'Upper  LAYER', 'MEMORY FOAM', 3, '2026-03-02 07:32:19.753'),
('b690e045-cc30-4757-8054-e3a579d9183d', '59782b5d-5102-4810-ab0e-fac78483ecca', 'Combination', 'REBONDED + SOFTY FOAM', 1, '2026-03-06 09:52:54.471'),
('b72129ed-c51d-4965-936e-90687558ec34', '0358a2f6-b70d-4aff-8ba3-b8f3bc8e131f', 'Combination', ' REBONDED + SOFTY FOAM', 0, '2026-03-06 11:23:53.560'),
('b7f6a3ea-c310-410d-b4a7-28d554914ca2', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Warranty', '2 Years', 12, '2026-03-02 07:32:19.159'),
('b9755ee4-64e8-468b-8443-3f128b0980f8', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'Thickness of finished mattress', '7 inch', 9, '2026-03-02 07:32:20.246'),
('bc511ff4-5bbd-45a4-b9f2-ebde45f03c6f', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Warranty', '5 Years', 13, '2026-03-02 07:32:19.568'),
('be907156-f875-4b64-8f61-7e20d1415c60', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'Brand', 'Refresh Springs', 11, '2026-03-02 07:32:20.139'),
('c040b06f-d6e7-42a6-b403-5a8bede07119', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Grade Type', 'GRANDE PLUS MATTRESS', 0, '2026-03-02 07:32:19.515'),
('c0c4f5cd-d2ef-437f-a9bf-bb3cf7c37827', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Warranty', '5 Years', 12, '2026-03-02 07:32:19.941'),
('c236123c-a720-43b2-a200-adaaecf45010', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'Quilt', 'ONE SIDE DOUBLE FOAM (10MM * 2 LAYERS )PEELED PUF AND MEMORY FOAM SIDE SINGLE FOAM QUILT', 6, '2026-03-02 07:32:20.106'),
('c47ee1a0-ee2e-467c-aa7e-1bfe928ff9b0', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'Bottom LAYER', 'SOFTY FOAM', 5, '2026-03-02 07:32:18.893'),
('c728c431-b66d-4e1d-99a0-27cbc16f9b68', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Comfort level/firmness', 'SOFT', 12, '2026-03-02 07:32:19.562'),
('c996d0fe-d4c4-44a7-837e-78a5c814f04c', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Brand', 'Refresh Springs', 14, '2026-03-02 07:32:19.461'),
('cb0c5c17-25ab-4747-97f4-97ceb62ec7e2', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Type of Spring', 'BONNEL SPRING', 1, '2026-03-02 07:32:18.959'),
('cc86f540-163e-454f-afd8-eff441d2ccfd', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'Mattress Description', 'COIR Mattress', 2, '2026-03-02 07:32:19.232'),
('cd10d0c0-ac9e-40a9-ad65-314921f8145d', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'Warranty', '5 Years', 10, '2026-03-02 07:32:20.028'),
('cd7965da-4958-4911-974d-cc5e4971a863', '59782b5d-5102-4810-ab0e-fac78483ecca', 'Thickness of finished mattress', '6 inch', 9, '2026-03-06 09:52:54.471'),
('cdfc07ab-41cf-4b71-b079-f804bb220322', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'Warranty', '5 Years', 10, '2026-03-02 07:32:20.117'),
('cec54cfe-d852-4433-b823-863b08446ef2', '59782b5d-5102-4810-ab0e-fac78483ecca', 'Comfort level/firmness', 'Medium FIRM', 10, '2026-03-06 09:52:54.471'),
('ceffab60-01b8-4521-ab4d-48c116352c99', 'a4120b13-b182-46a8-9af6-84896f16f391', 'Fabric', 'KNITTED', 6, '2026-03-02 07:32:19.760'),
('cf743307-685b-4d9f-9066-58df2ce79a2f', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', 'Comfort level/firmness', 'MEDIUM FIRM', 8, '2026-03-02 07:32:18.900'),
('cfd25d3e-bd88-43b7-890d-e3c67809264a', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Type of Spring', 'POCKETED', 1, '2026-03-02 07:32:19.914'),
('d0d0714c-b3de-4646-b1c9-7b8dbcbc6bf1', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Thickness of finished mattress', '9 inch', 10, '2026-03-02 07:32:19.150'),
('d2d2189d-5986-4001-a8c2-2a47a8e9461b', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Brand', 'Refresh Springs', 13, '2026-03-02 07:32:19.364'),
('d2f7f4a0-8991-4828-a74c-df0d0ee462ac', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'CORE LAYER', 'REBONDED FOAM', 4, '2026-03-02 07:32:20.102'),
('d302ee37-20fc-439a-9ef1-db2c7e49faa9', 'a4120b13-b182-46a8-9af6-84896f16f391', 'Grade Type', 'MEMORY FOAM DELUXE MATTRESS', 0, '2026-03-02 07:32:19.745'),
('d35530e0-25b1-4a51-82b1-fe443ca71de1', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'Comfort level/firmness', 'MEDIUM FIRM', 9, '2026-03-02 07:32:20.114'),
('d6703fba-083b-4e29-934b-ae5c046d4617', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'Comfort level/firmness', 'MEDIUM FIRM', 9, '2026-03-02 07:32:20.025'),
('d718a7ef-d4c7-47d7-beff-ce506e25224a', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Brand', 'Refresh Springs', 14, '2026-03-02 07:32:18.991'),
('d7ce054e-5f7f-4c88-bdbc-076d4d5ca2bf', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Mattress Description', 'REGULAR', 2, '2026-03-02 07:32:19.112'),
('da1ad097-9d37-45df-9a7e-a3ae0c18f693', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Fabric', 'KNITTED', 10, '2026-03-02 07:32:18.982'),
('da5c3144-6ffd-4eaf-afbe-e37be45fd30b', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'TOP LAYER', 'SOFTY FOAM', 3, '2026-03-02 07:32:20.099'),
('dc6e9e34-e2ad-4550-81ca-8d76cb9257c5', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Fabric', 'JACQUARD', 9, '2026-03-02 07:32:19.144'),
('de68b979-8550-4d89-8848-2634f09fcf10', '38f13369-973d-4457-8e04-e9a31c132663', 'Comfort level/firmness', 'MEDIUM FIRM', 8, '2026-03-02 07:32:18.820'),
('deae3f01-d8bc-407b-b874-05961cac0f46', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'CORE LAYER', 'REBONDED FOAM', 4, '2026-03-02 07:32:20.230'),
('df77200e-858f-4842-959d-09493f434756', 'eccaf85e-4a95-479f-81fa-04441d959843', 'Mattress Description', 'EURO TOP-MEMORY FOAM', 2, '2026-03-02 07:32:19.427'),
('dffde6ec-0067-4cc5-9360-43f545bf88e5', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'Mattress Description', 'DUAL COMFORTER  MATTRESS', 2, '2026-03-02 07:32:19.661'),
('e48adf6c-6b81-43ff-9ddd-3e066d7d2e5b', '59782b5d-5102-4810-ab0e-fac78483ecca', 'Quilt', 'Double foam (10MM * 2 LAYERS )PEELED PUF,BOTH SIDES OF BLOCK', 7, '2026-03-06 09:52:54.471'),
('e59efe2f-51ad-4324-89c5-0e3d88a2dad1', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'Warranty', '5 Years', 11, '2026-03-02 07:32:20.251'),
('e5e620b8-3638-469d-9001-10953c9389a7', '352de8a6-d0ef-45d5-a720-d78790250bed', 'Wire Diameter', '1.8MM', 3, '2026-03-02 07:32:19.334'),
('e6adea9e-a953-4d2d-b958-f00b39fb5c20', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'Quilt', 'DOUBLE SIDE DOUBLE FOAM (10MM * 2 LAYERS ) PEELED PUF QUILT', 6, '2026-03-02 07:32:20.018'),
('e731db36-c975-4861-945d-fad63f79ffff', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'Brand', 'Refresh Springs', 12, '2026-03-02 07:32:20.254'),
('ea897f10-7783-4c95-b02e-fed7f002637e', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'Warranty', '5 Years', 9, '2026-03-02 07:32:19.682'),
('eaeadbd0-333d-44ce-89c7-58099143aa70', 'bf1fab63-9b0e-4df1-823f-d2a127ce16e5', 'Combination', 'REBONDED + SOFTY FOAM', 0, '2026-03-12 10:27:29.855'),
('eb281361-6f64-4102-af9e-6d78249acf47', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Border/Edge Support/Side Support', 'BORDER WIRE', 4, '2026-03-02 07:32:19.921'),
('ebd36518-1cf1-4fb7-9e3e-36a6e65e4d9f', '59782b5d-5102-4810-ab0e-fac78483ecca', 'Mattress Description', 'REACTIVE', 2, '2026-03-06 09:52:54.471'),
('ec2fa4ce-cea8-4ebd-81b9-716fceb24093', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Wire Diameter', '2.2MM', 3, '2026-03-02 07:32:19.117'),
('edf9d952-5bd2-433f-ba1d-70115e16ff8f', 'a4120b13-b182-46a8-9af6-84896f16f391', 'Brand', 'Refresh Springs', 10, '2026-03-02 07:32:19.774'),
('eecd9a73-8372-4a29-8dd9-6d51efe807ee', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', 'Thickness of finished mattress', '8 inch', 8, '2026-03-02 07:32:20.112'),
('ef41855d-c659-4ace-bbfc-879779f44c16', '38f13369-973d-4457-8e04-e9a31c132663', 'Warranty', '5 Years', 9, '2026-03-02 07:32:18.823'),
('ef874b4c-85b7-4183-b095-fa57deb40629', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Thickness of finished mattress', '11 inch', 11, '2026-03-02 07:32:18.984'),
('efad97fb-0186-4dcb-887a-1f819c4cc050', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Fabric', 'KNITTED', 7, '2026-03-02 07:32:19.849'),
('f267a35d-7dc4-4795-9eda-911cc4f14b31', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', 'Bottom LAYER', 'SOFTY FOAM', 5, '2026-03-02 07:32:19.844'),
('f27c171a-9bd2-42ea-844a-f02230db13b7', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', 'TOP LAYER', 'SOFTY FOAM', 3, '2026-03-02 07:32:20.011'),
('f37bf56c-d2d4-462a-a520-501f0ceb4236', 'e7826a7a-63fe-4429-acca-17f2565631d6', 'Border/Edge Support/Side Support', 'HIGH DENSITY FOAM / border wire', 4, '2026-03-02 07:32:19.122'),
('f3f33baa-b15b-46f3-bf5a-e62c38124c39', '36af496c-a620-4b7c-9fbb-421ff6640123', 'Thickness of finished mattress', '13 inch', 11, '2026-03-02 07:32:19.555'),
('f71d6bae-7e7d-447f-a37f-4d878971de31', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Grade Type', 'POCKET SPRING DELUXE MATTRESS', 0, '2026-03-02 07:32:19.911'),
('f739248e-d795-4039-b9b7-711754d4cc9f', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', 'CORE LAYER', 'Rubberized coir + REBONDED FOAM', 5, '2026-03-02 07:32:19.240'),
('f769a1ef-eec5-4d85-a9f8-fcd777633310', 'b3dd7723-8687-47ec-a46b-08553530378a', 'Wire Diameter', '1.8MM', 3, '2026-03-02 07:32:19.919'),
('f7c4e810-4f10-4f17-a593-cac4e32c2c4f', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Comfort level/firmness', 'SOFT', 9, '2026-03-02 07:32:18.979'),
('f9ee1322-43a2-4635-8f20-09a674b75788', '38f13369-973d-4457-8e04-e9a31c132663', 'Fabric', 'KNITTED', 6, '2026-03-02 07:32:18.816'),
('fd458cd6-aa49-4396-b0a1-7fab5d4489c5', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', 'TOP LAYER', 'SOFTY FOAM', 3, '2026-03-02 07:32:20.228'),
('fd4621b6-32ee-4722-94cf-e293dec3f2b2', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', 'Quilt', 'DOUBLE FOAM (10MM * 2 LAYERS )PEELED PUF,BOTH SIDES OF BLOCK', 8, '2026-03-02 07:32:18.977'),
('fd49868e-2f73-4cd3-a78a-7d1a00706ea0', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', 'Core LAYER', 'PREMIUM FOAM + REbonded form', 4, '2026-03-02 07:32:19.666');

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `size` varchar(191) NOT NULL,
  `thickness` varchar(191) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `sku` varchar(191) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `color` varchar(191) DEFAULT NULL,
  `weight` varchar(191) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `firmness` varchar(191) DEFAULT NULL,
  `inStock` tinyint(1) NOT NULL DEFAULT 1,
  `parentWcId` int(11) DEFAULT NULL,
  `salePrice` decimal(10,2) DEFAULT NULL,
  `sizeGroup` varchar(191) DEFAULT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `wcId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`id`, `productId`, `size`, `thickness`, `price`, `sku`, `stock`, `color`, `weight`, `isActive`, `createdAt`, `updatedAt`, `firmness`, `inStock`, `parentWcId`, `salePrice`, `sizeGroup`, `sortOrder`, `wcId`) VALUES
('0022a41c-19d0-4375-855b-1bef89811f8d', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', '78x60', NULL, 35999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.216', '2026-03-02 07:32:20.506', NULL, 1, 400, 24119.33, 'Queen', 6, 405),
('01ef0392-ed4f-4d3d-9d6c-caf880e175ad', 'b3dd7723-8687-47ec-a46b-08553530378a', '78x60', NULL, 25999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.429', '2026-03-02 07:32:20.748', NULL, 1, 541, 17419.33, 'Queen', 6, 546),
('058030db-a0df-459a-b0ce-002d578307d0', 'a4120b13-b182-46a8-9af6-84896f16f391', '72x60', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.367', '2026-03-02 07:32:20.677', NULL, 1, 499, 20099.33, 'Queen', 4, 500),
('05ae56d7-8329-4f9b-b31e-ef2d9b598280', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', '78x72', NULL, 44999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.456', '2026-03-02 07:32:20.776', NULL, 1, 553, 30149.33, 'King', 3, 559),
('08b66d5a-2933-43b6-9b06-b7ff038e11b5', '38f13369-973d-4457-8e04-e9a31c132663', '75x72', NULL, 38999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.165', '2026-03-02 07:32:20.454', NULL, 1, 315, 26129.33, 'King', 2, 319),
('0d48626a-5f0c-4692-9b92-c9d9960cca14', 'e7826a7a-63fe-4429-acca-17f2565631d6', '78x60', NULL, 25999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.238', '2026-03-02 07:32:20.531', NULL, 1, 432, 17419.33, 'Queen', 6, 437),
('0dace930-0a8e-43ca-a7f9-bc1da724db5a', '38f13369-973d-4457-8e04-e9a31c132663', '78x72', NULL, 38999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.172', '2026-03-02 07:32:20.463', NULL, 1, 315, 26129.33, 'King', 3, 321),
('112e051c-75e1-47a1-8b97-9320e77794cc', '352de8a6-d0ef-45d5-a720-d78790250bed', '75x60', NULL, 37999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.277', '2026-03-02 07:32:20.582', NULL, 1, 455, 25459.33, 'Queen', 5, 458),
('11d25584-a8b0-48a4-80af-3c95021ed587', '59782b5d-5102-4810-ab0e-fac78483ecca', '', NULL, 32585.00, NULL, 0, NULL, NULL, 1, '2026-03-06 09:52:54.557', '2026-03-06 09:52:54.557', 'Medium', 1, NULL, 1.00, '75x72', 3, NULL),
('13ae0010-8ed2-4be5-af0c-10062a9744af', 'eccaf85e-4a95-479f-81fa-04441d959843', '78x60', NULL, 65999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.308', '2026-03-02 07:32:20.621', NULL, 1, 466, 44219.33, 'Queen', 6, 471),
('18b8b09c-8ad2-4b1e-98f9-b7b4e7328e3e', 'e7826a7a-63fe-4429-acca-17f2565631d6', '78x72', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.242', '2026-03-02 07:32:20.537', NULL, 1, 432, 20099.33, 'King', 3, 438),
('1b8140ae-5898-46f2-8e78-c0238363530c', '59782b5d-5102-4810-ab0e-fac78483ecca', '', NULL, 32988.00, NULL, 0, NULL, NULL, 1, '2026-03-06 09:52:54.557', '2026-03-06 09:52:54.557', 'Medium', 1, NULL, 1.00, '72x60', 0, NULL),
('2027a505-6e84-4098-b821-6e2c217761a1', '38f13369-973d-4457-8e04-e9a31c132663', '72x72', NULL, 38999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.153', '2026-03-02 07:32:20.447', NULL, 1, 315, 26129.33, 'King', 1, 317),
('218f8d48-093a-4649-b7ba-9598f3367fa5', 'bf1fab63-9b0e-4df1-823f-d2a127ce16e5', '72*60', '6', 69801.00, NULL, 0, NULL, NULL, 1, '2026-03-12 10:27:29.855', '2026-03-12 10:27:29.855', 'Soft', 1, NULL, 60459.00, 'King', 1, NULL),
('259087d2-413c-4f48-879c-0e74d2b05f1b', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', '75x72', NULL, 41999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.212', '2026-03-02 07:32:20.502', NULL, 1, 400, 28139.33, 'King', 2, 404),
('2bbe9b2e-cc0b-496c-9e77-b54ea8e4716d', 'eccaf85e-4a95-479f-81fa-04441d959843', '72x60', NULL, 65999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.293', '2026-03-02 07:32:20.603', NULL, 1, 466, 44219.33, 'Queen', 4, 467),
('2d180d84-903d-4d7d-a7ba-a7f8b83fd7e5', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', '72x60', NULL, 22500.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.482', '2026-03-02 07:32:20.803', NULL, 1, 571, 15075.00, 'Queen', 4, 572),
('371fded7-0f03-4b58-8668-ea2135b7bc9f', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', '78x72', NULL, 35999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.409', '2026-03-02 07:32:20.728', NULL, 1, 507, 24119.33, 'King', 3, 513),
('37cb0810-b128-4c07-b71a-815a8a871bb7', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', '78x60', NULL, 37999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.453', '2026-03-02 07:32:20.772', NULL, 1, 553, 25459.33, 'Queen', 6, 558),
('38863baf-b307-448c-aad0-51fadc3f0536', '352de8a6-d0ef-45d5-a720-d78790250bed', '78x60', NULL, 37999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.285', '2026-03-02 07:32:20.590', NULL, 1, 455, 25459.33, 'Queen', 6, 460),
('39dc8c8e-a03f-4e10-b849-74373006f4c1', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', '78x72', NULL, 41999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.220', '2026-03-02 07:32:20.510', NULL, 1, 400, 28139.33, 'King', 3, 406),
('3d66728c-10a8-465c-b640-93685f38b2df', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', '72x60', NULL, 37999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.437', '2026-03-02 07:32:20.756', NULL, 1, 553, 25459.33, 'Queen', 4, 554),
('3e5b0476-a9f7-496a-b373-2698f32c6d65', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', '72x60', NULL, 33999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.342', '2026-03-02 07:32:20.653', NULL, 1, 488, 22779.33, 'Queen', 4, 489),
('3eb2d7e3-3cad-4a09-b43d-2f8f3b24fa33', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', '78x60', NULL, 34999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.475', '2026-03-02 07:32:20.796', NULL, 1, 564, 23449.33, 'Queen', 6, 569),
('3f4a3a73-651a-47ca-b950-43c710860454', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', '75x72', NULL, 44999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.449', '2026-03-02 07:32:20.768', NULL, 1, 553, 30149.33, 'King', 2, 557),
('3f89fdd3-5085-4d1d-a308-5f66e9d94fbf', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', '75x72', NULL, 35999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.402', '2026-03-02 07:32:20.717', NULL, 1, 507, 24119.33, 'King', 2, 511),
('48f6fc68-bbc1-4d00-9ba6-07cdf901df23', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', '78x72', NULL, 39999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.363', '2026-03-02 07:32:20.673', NULL, 1, 488, 26799.33, 'King', 3, 494),
('4a351f59-94cf-45e0-af15-b6162efe1276', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', '75x60', NULL, 22500.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.489', '2026-03-02 07:32:20.811', NULL, 1, 571, 15075.00, 'Queen', 5, 574),
('4dad34e5-a5b2-4327-a8c0-4605e03dd46a', '59782b5d-5102-4810-ab0e-fac78483ecca', '', NULL, 39585.00, NULL, 0, NULL, NULL, 1, '2026-03-06 09:52:54.557', '2026-03-06 09:52:54.557', 'Medium', 1, NULL, 1.00, '78x72', 5, NULL),
('4dd31f36-8bdc-4d1c-b7d9-00565fe088ed', 'b3dd7723-8687-47ec-a46b-08553530378a', '75x60', NULL, 25999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.421', '2026-03-02 07:32:20.740', NULL, 1, 541, 17419.33, 'Queen', 5, 544),
('4f6da695-8ca8-47d1-b84a-a7988a249edb', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', '75x60', NULL, 34999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.468', '2026-03-02 07:32:20.788', NULL, 1, 564, 23449.33, 'Queen', 5, 567),
('511bfaf3-d037-4f8c-9f9e-a32235971ba1', '36af496c-a620-4b7c-9fbb-421ff6640123', '78x72', NULL, 97999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.338', '2026-03-02 07:32:20.649', NULL, 1, 477, 65659.33, 'King', 3, 487),
('53092d6d-704f-4e67-97ac-cf8b5371ebcd', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', '72x72', NULL, 39999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.347', '2026-03-02 07:32:20.657', NULL, 1, 488, 26799.33, 'King', 1, 490),
('54445ec3-5ab0-45fd-b535-58b982ac4614', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', '75x72', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.256', '2026-03-02 07:32:20.560', NULL, 1, 444, 20099.33, 'King', 2, 448),
('545a934b-8d59-4275-b20d-072262f8146e', '36af496c-a620-4b7c-9fbb-421ff6640123', '75x72', NULL, 97999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.329', '2026-03-02 07:32:20.641', NULL, 1, 477, 65659.33, 'King', 2, 485),
('5719a45b-657d-4d61-81bd-b48e40221289', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', '72x72', NULL, 26250.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.485', '2026-03-02 07:32:20.807', NULL, 1, 571, 17587.50, 'King', 1, 573),
('586da7f9-92b2-4d59-9b1f-81a814a80f46', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', '78x60', NULL, 25999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.260', '2026-03-02 07:32:20.565', NULL, 1, 444, 17419.33, 'King', 6, 449),
('5ba25c16-18bc-4485-a221-94aa424120b6', '352de8a6-d0ef-45d5-a720-d78790250bed', '72x72', NULL, 43999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.274', '2026-03-02 07:32:20.578', NULL, 1, 455, 29479.33, 'King', 1, 457),
('61bc8432-42d8-4d47-ae08-ec342630d499', '36af496c-a620-4b7c-9fbb-421ff6640123', '75x60', NULL, 81999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.325', '2026-03-02 07:32:20.637', NULL, 1, 477, 54939.33, 'Queen', 5, 484),
('61c4ce05-6893-410e-aaa2-c6d1e4762724', '36af496c-a620-4b7c-9fbb-421ff6640123', '78x60', NULL, 81999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.334', '2026-03-02 07:32:20.645', NULL, 1, 477, 54939.33, 'Queen', 6, 486),
('6adcfa08-6c72-49c9-8614-8c6dd46ab2e9', '59782b5d-5102-4810-ab0e-fac78483ecca', '', NULL, 32988.00, NULL, 0, NULL, NULL, 1, '2026-03-06 09:52:54.557', '2026-03-06 09:52:54.557', 'Medium', 1, NULL, 1.00, '75x60', 2, NULL),
('6b37ba66-86e2-4ee6-b824-43d10e95461a', '352de8a6-d0ef-45d5-a720-d78790250bed', '72x60', NULL, 37999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.270', '2026-03-02 07:32:20.574', NULL, 1, 455, 25459.33, 'Queen', 4, 456),
('6c9dc6d5-b25a-46f9-9bf3-7f2e495dfff4', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', '75x60', NULL, 37999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.445', '2026-03-02 07:32:20.764', NULL, 1, 553, 25459.33, 'Queen', 5, 556),
('6ded9e1c-2ff8-4879-be64-30843734840c', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', '72x72', NULL, 41999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.464', '2026-03-02 07:32:20.784', NULL, 1, 564, 28139.33, 'King', 1, 566),
('6fec7146-16f8-4704-bacc-e02bd09fc791', '59782b5d-5102-4810-ab0e-fac78483ecca', '', NULL, 32988.00, NULL, 0, NULL, NULL, 1, '2026-03-06 09:52:54.557', '2026-03-06 09:52:54.557', 'Medium', 1, NULL, 1.00, '78x60', 4, NULL),
('720f9d77-6efe-495a-bc7d-26ed5198511a', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', '72x60', NULL, 35999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.201', '2026-03-02 07:32:20.489', NULL, 1, 400, 24119.33, 'Queen', 4, 401),
('743c0a62-4e3f-4441-af95-c77761981d85', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', '75x60', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.186', '2026-03-02 07:32:20.474', NULL, 1, 392, 20099.33, 'Queen', 5, 395),
('79e24a4d-58d9-4255-a847-b1b41fb19d9a', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', '72x72', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.249', '2026-03-02 07:32:20.550', NULL, 1, 444, 20099.33, 'King', 1, 446),
('7c0df5fc-c7d9-421a-ae2f-4e1267a94f91', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', '75x72', NULL, 35999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.189', '2026-03-02 07:32:20.478', NULL, 1, 392, 24119.33, 'King', 2, 396),
('8082440b-b499-4706-b22b-0e1539a0346c', 'eccaf85e-4a95-479f-81fa-04441d959843', '72x72', NULL, 78999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.297', '2026-03-02 07:32:20.608', NULL, 1, 466, 52929.33, 'King', 1, 468),
('8218aafd-dfb1-43c0-a84c-b9d8fa9bd5dc', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', '75x72', NULL, 41999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.472', '2026-03-02 07:32:20.792', NULL, 1, 564, 28139.33, 'King', 2, 568),
('82971f80-16af-460d-a4bb-4a6e1c714afb', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', '78x60', NULL, 33999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.359', '2026-03-02 07:32:20.669', NULL, 1, 488, 22779.33, 'Queen', 6, 493),
('82ec59e5-52e9-41a3-8ded-97e7264bd600', 'e7826a7a-63fe-4429-acca-17f2565631d6', '75x60', NULL, 25999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.231', '2026-03-02 07:32:20.523', NULL, 1, 432, 17419.33, 'Queen', 5, 435),
('8485ea4f-d8dc-4c28-8ea7-6374444a7574', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', '78x72', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.266', '2026-03-02 07:32:20.570', NULL, 1, 444, 20099.33, 'King', 3, 450),
('8722f078-4259-4157-8175-91a8fb827595', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', '72x60', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.391', '2026-03-02 07:32:20.702', NULL, 1, 507, 20099.33, 'Queen', 4, 508),
('8aa43a10-894f-4ce7-aa13-e0d51daaf05a', 'b3dd7723-8687-47ec-a46b-08553530378a', '72x60', NULL, 25999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.413', '2026-03-02 07:32:20.732', NULL, 1, 541, 17419.33, 'Queen', 4, 542),
('8c89dce5-4553-4f17-9e3e-486b085b4a5b', 'e7826a7a-63fe-4429-acca-17f2565631d6', '75x72', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.234', '2026-03-02 07:32:20.527', NULL, 1, 432, 20099.33, 'King', 2, 436),
('8e3b6d71-3dd3-4855-a5f0-16caaa6ae7b5', 'eccaf85e-4a95-479f-81fa-04441d959843', '78x72', NULL, 78999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.312', '2026-03-02 07:32:20.625', NULL, 1, 466, 52929.33, 'King', 3, 472),
('91be745d-30e7-4c1d-8cbd-69f2e9f49a14', '38f13369-973d-4457-8e04-e9a31c132663', '75x60', NULL, 32999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.161', '2026-03-02 07:32:20.451', NULL, 1, 315, 22109.33, 'Queen', 5, 318),
('92a472e4-65df-4599-b093-5fec156b57b1', 'bf1fab63-9b0e-4df1-823f-d2a127ce16e5', '72*60', '7', 78995.00, NULL, 0, NULL, NULL, 1, '2026-03-12 10:27:29.855', '2026-03-12 10:27:29.855', 'Medium', 1, NULL, 70896.00, 'Queen', 0, NULL),
('94e1d9ea-6289-40f8-bd40-5cef8688822b', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', '72x60', NULL, 34999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.460', '2026-03-02 07:32:20.780', NULL, 1, 564, 23449.33, 'Queen', 4, 565),
('967f6aca-83b1-4ead-95c4-8579ae326bce', '59782b5d-5102-4810-ab0e-fac78483ecca', '', NULL, 39585.00, NULL, 0, NULL, NULL, 1, '2026-03-06 09:52:54.557', '2026-03-06 09:52:54.557', 'Medium', 1, NULL, 1.00, '72x72', 1, NULL),
('972ed20f-2d25-4051-bb9f-ae9081a410c1', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', '78x60', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.193', '2026-03-02 07:32:20.482', NULL, 1, 392, 20099.33, 'Queen', 6, 397),
('9acb5a2b-c3b1-4bc1-b5c1-0a754c81f347', 'b3dd7723-8687-47ec-a46b-08553530378a', '75x72', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.425', '2026-03-02 07:32:20.744', NULL, 1, 541, 20099.33, 'King', 2, 545),
('9b15d1ce-3ece-461c-bd20-3e73ebb7c9c9', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', '78x60', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.406', '2026-03-02 07:32:20.724', NULL, 1, 507, 20099.33, 'Queen', 6, 512),
('9bf56e81-015c-49b8-8cf7-c6296f4f327a', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', '72x72', NULL, 35999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.182', '2026-03-02 07:32:20.470', NULL, 1, 392, 24119.33, 'King', 1, 394),
('a4e95c72-b630-4c14-9d6f-4a21cc866786', 'b3dd7723-8687-47ec-a46b-08553530378a', '72x72', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.417', '2026-03-02 07:32:20.736', NULL, 1, 541, 20099.33, 'King', 1, 543),
('a7bace35-f4fd-48df-a872-abac90d5049d', 'eccaf85e-4a95-479f-81fa-04441d959843', '75x60', NULL, 65999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.301', '2026-03-02 07:32:20.612', NULL, 1, 466, 44219.33, 'Queen', 5, 469),
('a9fc2922-fcfe-4e4f-92d0-e860fa9411eb', '38f13369-973d-4457-8e04-e9a31c132663', '72x60', NULL, 32999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.148', '2026-03-02 07:32:20.442', NULL, 1, 315, 22109.33, 'Queen', 4, 316),
('ab54650b-a8df-46ab-a27c-35116d5692b6', '352de8a6-d0ef-45d5-a720-d78790250bed', '78x72', NULL, 43999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.289', '2026-03-02 07:32:20.599', NULL, 1, 455, 29479.33, 'King', 3, 461),
('ade6e70c-435a-4cfb-833b-d4d5d490f8df', 'a4120b13-b182-46a8-9af6-84896f16f391', '72x72', NULL, 35999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.371', '2026-03-02 07:32:20.681', NULL, 1, 499, 24119.33, 'King', 1, 501),
('b45d4863-0dcf-4ae6-bff3-f7eff299ef53', '36af496c-a620-4b7c-9fbb-421ff6640123', '72x60', NULL, 81999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.316', '2026-03-02 07:32:20.629', NULL, 1, 477, 54939.33, 'Queen', 4, 482),
('b6c613e5-1f97-4213-8dbf-c98995545efc', 'eccaf85e-4a95-479f-81fa-04441d959843', '75x72', NULL, 78999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.304', '2026-03-02 07:32:20.617', NULL, 1, 466, 52929.33, 'King', 2, 470),
('b6d7fcc1-d459-4b3e-87e1-3010a3540d4a', '352de8a6-d0ef-45d5-a720-d78790250bed', '75x72', NULL, 43999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.281', '2026-03-02 07:32:20.586', NULL, 1, 455, 29479.33, 'King', 2, 459),
('b870c326-3cdd-4f51-9690-3ad452740d55', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', '72x60', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.176', '2026-03-02 07:32:20.467', NULL, 1, 392, 20099.33, 'Queen', 4, 393),
('ba5d5afd-8e66-4c6a-b1e7-74ece60a52a6', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', '72x60', NULL, 25999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.246', '2026-03-02 07:32:20.544', NULL, 1, 444, 17419.33, 'Queen', 4, 445),
('be141ff9-bce8-456e-918e-8a2757aed752', 'b3dd7723-8687-47ec-a46b-08553530378a', '78x72', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.433', '2026-03-02 07:32:20.752', NULL, 1, 541, 20099.33, 'King', 3, 547),
('bf04fc2a-c24c-4389-afc3-a767285fc69f', 'a4120b13-b182-46a8-9af6-84896f16f391', '78x60', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.383', '2026-03-02 07:32:20.694', NULL, 1, 499, 20099.33, 'Queen', 6, 504),
('bf9a682e-eae6-45b7-944a-7319d7aee289', '38f13369-973d-4457-8e04-e9a31c132663', '78x60', NULL, 32999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.168', '2026-03-02 07:32:20.459', NULL, 1, 315, 22109.33, 'Queen', 6, 320),
('bfc4ebfb-c279-4d53-a793-d7a7f9cfa0c8', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', '75x72', NULL, 39999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.355', '2026-03-02 07:32:20.665', NULL, 1, 488, 26799.33, 'King', 2, 492),
('bfcd3349-594b-4b1a-b070-75c874e8c318', 'e7826a7a-63fe-4429-acca-17f2565631d6', '72x60', NULL, 25999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.223', '2026-03-02 07:32:20.514', NULL, 1, 432, 17419.33, 'Queen', 4, 433),
('c453e8e8-0341-467b-b2e1-b5911a55e686', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', '75x60', NULL, 35999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.208', '2026-03-02 07:32:20.498', NULL, 1, 400, 24119.33, 'Queen', 5, 403),
('c51e2e95-c8dc-4bdf-b3b6-b3d5e3acb237', '88939dca-7ff7-41ae-8bf6-52aa4c725eae', '72x72', NULL, 41999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.205', '2026-03-02 07:32:20.494', NULL, 1, 400, 28139.33, 'King', 1, 402),
('c8df4156-f757-4177-b2d6-c2785978a910', 'b3e9825c-cf89-469b-8043-fed4bea8d93b', '72x72', NULL, 44999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.441', '2026-03-02 07:32:20.760', NULL, 1, 553, 30149.33, 'King', 1, 555),
('cb7434ce-de30-4406-bae8-41a2023b3495', 'e7826a7a-63fe-4429-acca-17f2565631d6', '72x72', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.227', '2026-03-02 07:32:20.518', NULL, 1, 432, 20099.33, 'King', 1, 434),
('d233a949-e1f0-4dd0-9885-8581be9891cb', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', '75x60', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.398', '2026-03-02 07:32:20.710', NULL, 1, 507, 20099.33, 'Queen', 5, 510),
('d66e7dfd-6c1d-40a0-9d56-051622c80eec', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', '78x72', NULL, 26250.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.499', '2026-03-02 07:32:20.823', NULL, 1, 571, 17587.50, 'King', 3, 577),
('dcf5a0ca-0d12-4693-a22b-2f4b5efae418', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', '75x72', NULL, 26250.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.492', '2026-03-02 07:32:20.815', NULL, 1, 571, 17587.50, 'King', 2, 575),
('de3214ef-8004-4312-b0d5-81871bd5ff06', 'b7366b19-bd22-451e-b458-39e2dc08a6aa', '75x60', NULL, 33999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.352', '2026-03-02 07:32:20.661', NULL, 1, 488, 22779.33, 'Queen', 5, 491),
('e7b1125a-5d2a-4b30-b3fa-2437e60b591e', 'f3c0be53-4c5f-41af-8e8c-3d0b0eff3bd6', '72x72', NULL, 35999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.394', '2026-03-02 07:32:20.706', NULL, 1, 507, 24119.33, 'King', 1, 509),
('e82aba1b-95c5-424c-9b78-d31797630afc', 'b15d9d88-54bc-4b7e-acc2-b8b083a6d3c8', '75x60', NULL, 25999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.253', '2026-03-02 07:32:20.555', NULL, 1, 444, 17419.33, 'Queen', 5, 447),
('f048eaf9-b59c-40b0-aa7b-af8608fb33de', 'a4120b13-b182-46a8-9af6-84896f16f391', '75x72', NULL, 35999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.379', '2026-03-02 07:32:20.689', NULL, 1, 499, 24119.33, 'King', 2, 503),
('f07a75cb-0ae4-42fb-a24a-13d5b65676c5', '36af496c-a620-4b7c-9fbb-421ff6640123', '72x72', NULL, 97999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.321', '2026-03-02 07:32:20.633', NULL, 1, 477, 65659.33, 'King', 1, 483),
('f14489c4-b1a1-47a7-9bda-136723f6d16c', 'd7bc499c-91d8-495c-9f04-74d70492a3ca', '78x60', NULL, 22500.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.495', '2026-03-02 07:32:20.819', NULL, 1, 571, 15075.00, 'Queen', 6, 576),
('f6560282-e420-4946-9903-503356c4f43c', 'a4120b13-b182-46a8-9af6-84896f16f391', '75x60', NULL, 29999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.375', '2026-03-02 07:32:20.686', NULL, 1, 499, 20099.33, 'Queen', 5, 502),
('f985e4b0-2977-4453-a9e0-e30d4870b352', '652b6617-b32a-4ee3-9365-cfa82cd1bb07', '78x72', NULL, 41999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.479', '2026-03-02 07:32:20.799', NULL, 1, 564, 28139.33, 'King', 3, 570),
('faef6831-0c37-42f1-bf9e-763dc147f594', '0358a2f6-b70d-4aff-8ba3-b8f3bc8e131f', '', NULL, 1.00, NULL, 0, NULL, NULL, 1, '2026-03-06 11:23:53.578', '2026-03-06 11:23:53.578', 'Medium', 1, NULL, NULL, 'Queen', 0, NULL),
('fbf2ba02-b424-4e14-8c72-78050a161d2d', 'a4120b13-b182-46a8-9af6-84896f16f391', '78x72', NULL, 35999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.387', '2026-03-02 07:32:20.698', NULL, 1, 499, 24119.33, 'King', 3, 505),
('fcf4c011-95d4-4b76-b361-cf522f6445a2', 'd6a15f90-f5e8-45ff-a348-9027c2a7d0af', '78x72', NULL, 35999.00, NULL, 0, NULL, NULL, 1, '2026-02-17 11:56:51.197', '2026-03-02 07:32:20.486', NULL, 1, 392, 24119.33, 'King', 3, 398);

-- --------------------------------------------------------

--
-- Table structure for table `related_products`
--

CREATE TABLE `related_products` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `relatedProductId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `rating` int(11) NOT NULL,
  `title` varchar(191) DEFAULT NULL,
  `comment` text NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT 0,
  `isApproved` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `value` text NOT NULL,
  `type` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `type`, `createdAt`, `updatedAt`) VALUES
('1d332954-f4ae-4e88-828e-d8efbf6c453a', 'social_twitter', '', 'string', '2026-03-12 09:54:43.572', '2026-03-12 10:00:33.738'),
('34d177c4-b511-4371-967b-91914d707c89', 'seo_robots_txt', '', 'string', '2026-03-12 09:54:43.572', '2026-03-12 10:00:33.738'),
('3b5d3fd0-f724-4f64-aead-db0294e144b0', 'social_instagram', '', 'string', '2026-03-12 09:54:43.572', '2026-03-12 10:00:33.738'),
('94619139-0c44-4f92-892b-cf1adf016c72', 'seo_default_description', 'Good mattress,  cheap mattress', 'string', '2026-03-12 09:54:43.571', '2026-03-12 10:00:33.738'),
('988a1c99-ccb9-4aa3-ae83-c186dea25952', 'seo_google_site_verification', '', 'string', '2026-03-12 09:54:43.572', '2026-03-12 10:00:33.738'),
('99203391-ca0b-493f-84ef-db241606a403', 'social_youtube', '', 'string', '2026-03-12 09:54:43.572', '2026-03-12 10:00:33.738'),
('99c61941-d46e-4976-b877-c9c462bb8ff6', 'seo_default_keywords', 'mattress, good mattress', 'string', '2026-03-12 09:54:43.572', '2026-03-12 10:00:33.738'),
('ab74be8a-3394-4ea7-bc77-3ecdd3089c37', 'seo_title_template', 'mattress factory', 'string', '2026-03-12 09:54:43.571', '2026-03-12 10:00:33.738'),
('b4a03dfb-71f8-4203-8027-ad44cd0e89b3', 'seo_tagline', 'Premium mattress', 'string', '2026-03-12 09:54:43.571', '2026-03-12 10:00:33.738'),
('bc39bd7e-cf4b-4b9c-8261-c084aac38d9e', 'seo_google_analytics_id', '', 'string', '2026-03-12 09:54:43.572', '2026-03-12 10:00:33.738'),
('d641c6c0-b853-4f4f-88b7-8ec7a3c718af', 'social_facebook', '', 'string', '2026-03-12 09:54:43.572', '2026-03-12 10:00:33.738'),
('d7167686-214a-42d3-81e2-80f073531203', 'seo_canonical_url', 'sunsys.in', 'string', '2026-03-12 09:54:43.571', '2026-03-12 10:00:33.738'),
('ec375c99-5818-485e-a312-6c7896bb41ec', 'seo_og_image', '', 'string', '2026-03-12 09:54:43.571', '2026-03-12 10:00:33.738'),
('eed0a43b-b50d-45c3-8d73-4b30a1cb3f91', 'seo_site_name', 'Mattress Factory', 'string', '2026-03-12 09:54:43.571', '2026-03-12 10:00:33.738'),
('efb67dc1-b82c-4625-a90a-7fa8999fef09', 'social_whatsapp', '', 'string', '2026-03-12 09:54:43.572', '2026-03-12 10:00:33.738');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `firstName` varchar(191) DEFAULT NULL,
  `lastName` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `role` enum('CUSTOMER','ADMIN') NOT NULL DEFAULT 'CUSTOMER',
  `status` enum('ACTIVE','INACTIVE','SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
  `emailVerified` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `lastName`, `phone`, `role`, `status`, `emailVerified`, `createdAt`, `updatedAt`) VALUES
('178a8a3d-8a5a-4227-bf0b-243583f3f9b0', 'mahesh@gmail.com', 'eaf2ee8dd7f1d4e7cc5e2c4604545e98:e2f89e7f05cb29e59ba40570385682b74eda9ea931ed54617ff710e1baea65252a246abc0eb54036e21ba52ce07b7cc074c17a9d390dee0c4c887a508663eadd', 'mahesh', 'kumar', '7896532145', 'CUSTOMER', 'ACTIVE', 0, '2026-03-06 11:53:14.129', '2026-03-06 11:53:14.129'),
('246feb1e-0e6e-41ff-8453-536c7fb4a910', 'kala@gmail.com', 'c7a86efe6f77abd3aab7c6f18234c069:c2c685658362399487b31e8414aac39a43b3887a3584417a44b154a5b2da6fe0f6fa8369511f19daf288ff129b5bc7e9636d8e66d3e26e5b3af86f5c9616931a', 'Ravi', 'Kumar', '09863897415', 'CUSTOMER', 'ACTIVE', 0, '2026-03-05 10:55:50.465', '2026-03-05 10:55:50.465'),
('a7f35646-3927-4a5f-8dea-0d4beb159da6', 'support@sunsys.in', '6b267620d188ddce027325c559de27c5:0224c993940b6bd750eb8d088ca59a30f2c79c1e83f4336ca5057c9e56d4492b6f15a054ade57fba380dfac8d7e9b95f1968863d0cb811168d4c401934a62b20', 'ravi', '-', '1213457899', 'CUSTOMER', 'ACTIVE', 0, '2026-03-05 10:46:35.065', '2026-03-13 07:43:18.596'),
('b2513a1d-47c2-4f27-88e7-54c0594a47d4', 'admin@mattressstore.com', '$2a$10$uV7pJggqX18BQ0vFTnCsNO3myASh2DFZLposl8wLmFdbLiY6bRvze', 'Admin', NULL, NULL, 'ADMIN', 'ACTIVE', 0, '2026-03-13 06:19:08.330', '2026-03-13 06:19:08.330'),
('b6d54dca-8607-4c8c-870a-8e1db173574c', 'test@gmail.com', 'fcb69e097538db01af6084777c71eebc:64f3aa5bd1dfc9b194ad36565376accd9a714c7731142f6bd751b60e7452ad9d4427e3b238e29ebf19f9f06725003302358547ace2937d007929a6c1ba153151', 'test', 'test', '986532147', 'CUSTOMER', 'ACTIVE', 0, '2026-03-12 09:31:50.074', '2026-03-12 09:31:50.074'),
('d2cd5944-d5f0-4a16-adcd-7b125e287af2', 'sudhanandhinis@gmail.com', '05b8119ead19e5c28e1f6ac529bd658a:65ae87a802568b22837abff64bdc4c15c60f78315b375bf963e564ffbe3f59bcec1680261cffaeac4cd110387387f66e91c2f7cbb7c7b84c597787d41aabc9a9', 'kalaivani', 'v', '01213457899', 'CUSTOMER', 'ACTIVE', 0, '2026-03-12 07:30:22.069', '2026-03-12 07:30:22.069'),
('e8e7ea9c-6f4b-4a20-878d-ed1dab75c48f', 'sudhanandhini@sunsys.in', '5e2e53a5403a4743b162b42dfa891764:074394e1f632261b523a0f422593971233a31c30e0d9e7e9c9d55bd03037897305a836dcfa868441e147c1c053bdb7e845efcdb7778921bf04049e0a438498e4', 'sudha', 'nandhini', '9874653214', 'CUSTOMER', 'ACTIVE', 0, '2026-03-06 06:40:37.666', '2026-03-12 07:05:35.864');

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wishlist_items`
--

CREATE TABLE `wishlist_items` (
  `id` varchar(191) NOT NULL,
  `wishlistId` varchar(191) NOT NULL,
  `productId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('e50cb7cc-2daa-4a3b-bbd8-9e74ce814eb2', '8961ce3fc2a3359349dfac8a0f19dee430fa5fd9df9582d278e2bba5193d0501', '2026-01-28 09:38:17.880', '20260128093816_init', NULL, NULL, '2026-01-28 09:38:16.464', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addresses_userId_idx` (`userId`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `carts_userId_key` (`userId`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_items_cartId_idx` (`cartId`),
  ADD KEY `cart_items_productId_idx` (`productId`),
  ADD KEY `cart_items_variantId_fkey` (`variantId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_name_key` (`name`),
  ADD UNIQUE KEY `categories_slug_key` (`slug`),
  ADD KEY `categories_slug_idx` (`slug`),
  ADD KEY `categories_parentId_idx` (`parentId`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `coupons_code_key` (`code`),
  ADD KEY `coupons_code_idx` (`code`);

--
-- Indexes for table `coupon_usages`
--
ALTER TABLE `coupon_usages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `coupon_usages_orderId_key` (`orderId`),
  ADD UNIQUE KEY `coupon_usages_couponCode_userId_key` (`couponCode`,`userId`),
  ADD KEY `coupon_usages_couponCode_idx` (`couponCode`),
  ADD KEY `coupon_usages_userId_idx` (`userId`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_userId_idx` (`userId`),
  ADD KEY `notifications_isRead_idx` (`isRead`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_orderNumber_key` (`orderNumber`),
  ADD KEY `orders_userId_idx` (`userId`),
  ADD KEY `orders_orderNumber_idx` (`orderNumber`),
  ADD KEY `orders_status_idx` (`status`),
  ADD KEY `orders_shippingAddressId_fkey` (`shippingAddressId`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_orderId_idx` (`orderId`),
  ADD KEY `order_items_productId_idx` (`productId`),
  ADD KEY `order_items_variantId_fkey` (`variantId`);

--
-- Indexes for table `order_status_history`
--
ALTER TABLE `order_status_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_status_history_orderId_idx` (`orderId`);

--
-- Indexes for table `page_seo`
--
ALTER TABLE `page_seo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `page_seo_pageSlug_key` (`pageSlug`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `password_resets_token_key` (`token`),
  ADD KEY `password_resets_email_idx` (`email`),
  ADD KEY `password_resets_token_idx` (`token`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payments_orderId_key` (`orderId`),
  ADD UNIQUE KEY `payments_razorpayOrderId_key` (`razorpayOrderId`),
  ADD UNIQUE KEY `payments_razorpayPaymentId_key` (`razorpayPaymentId`),
  ADD KEY `payments_orderId_idx` (`orderId`),
  ADD KEY `payments_razorpayOrderId_idx` (`razorpayOrderId`),
  ADD KEY `payments_razorpayPaymentId_idx` (`razorpayPaymentId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_slug_key` (`slug`),
  ADD UNIQUE KEY `products_sku_key` (`sku`),
  ADD UNIQUE KEY `products_wcId_key` (`wcId`),
  ADD KEY `products_slug_idx` (`slug`),
  ADD KEY `products_sku_idx` (`sku`),
  ADD KEY `products_status_idx` (`status`),
  ADD KEY `products_wcId_idx` (`wcId`);

--
-- Indexes for table `product_badges`
--
ALTER TABLE `product_badges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_badges_productId_idx` (`productId`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_categories_productId_categoryId_key` (`productId`,`categoryId`),
  ADD KEY `product_categories_productId_idx` (`productId`),
  ADD KEY `product_categories_categoryId_idx` (`categoryId`);

--
-- Indexes for table `product_freebies`
--
ALTER TABLE `product_freebies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_freebies_productId_idx` (`productId`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_images_productId_idx` (`productId`);

--
-- Indexes for table `product_specifications`
--
ALTER TABLE `product_specifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_specifications_productId_idx` (`productId`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_variants_sku_key` (`sku`),
  ADD UNIQUE KEY `product_variants_wcId_key` (`wcId`),
  ADD KEY `product_variants_productId_idx` (`productId`),
  ADD KEY `product_variants_sku_idx` (`sku`),
  ADD KEY `product_variants_wcId_idx` (`wcId`);

--
-- Indexes for table `related_products`
--
ALTER TABLE `related_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `related_products_productId_relatedProductId_key` (`productId`,`relatedProductId`),
  ADD KEY `related_products_productId_idx` (`productId`),
  ADD KEY `related_products_relatedProductId_idx` (`relatedProductId`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_productId_idx` (`productId`),
  ADD KEY `reviews_userId_idx` (`userId`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_key` (`key`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`),
  ADD KEY `users_email_idx` (`email`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `wishlists_userId_key` (`userId`);

--
-- Indexes for table `wishlist_items`
--
ALTER TABLE `wishlist_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `wishlist_items_wishlistId_productId_key` (`wishlistId`,`productId`),
  ADD KEY `wishlist_items_wishlistId_idx` (`wishlistId`),
  ADD KEY `wishlist_items_productId_idx` (`productId`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_items_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_shippingAddressId_fkey` FOREIGN KEY (`shippingAddressId`) REFERENCES `addresses` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `order_status_history`
--
ALTER TABLE `order_status_history`
  ADD CONSTRAINT `order_status_history_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `product_badges`
--
ALTER TABLE `product_badges`
  ADD CONSTRAINT `product_badges_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD CONSTRAINT `product_categories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_categories_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_freebies`
--
ALTER TABLE `product_freebies`
  ADD CONSTRAINT `product_freebies_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_specifications`
--
ALTER TABLE `product_specifications`
  ADD CONSTRAINT `product_specifications_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `related_products`
--
ALTER TABLE `related_products`
  ADD CONSTRAINT `related_products_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `related_products_relatedProductId_fkey` FOREIGN KEY (`relatedProductId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD CONSTRAINT `wishlists_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wishlist_items`
--
ALTER TABLE `wishlist_items`
  ADD CONSTRAINT `wishlist_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `wishlist_items_wishlistId_fkey` FOREIGN KEY (`wishlistId`) REFERENCES `wishlists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
