-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2024 at 08:23 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `transaction management`
--

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `transaction_type` enum('DEPOSIT','WITHDRAW') NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('PENDING','COMPLETED','FAILED') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `amount`, `transaction_type`, `user_id`, `timestamp`, `status`) VALUES
(1, 234.12, 'DEPOSIT', 1, '2024-11-20 00:30:38', 'COMPLETED'),
(2, 109.59, 'DEPOSIT', 1, '2024-11-20 00:31:12', 'COMPLETED'),
(3, 109.59, 'DEPOSIT', 1, '2024-11-20 00:43:01', 'FAILED'),
(4, 9.59, 'DEPOSIT', 1, '2024-11-20 01:00:54', 'COMPLETED'),
(5, 8.59, 'DEPOSIT', 1, '2024-11-20 01:01:06', 'COMPLETED'),
(6, 8.59, '', 1, '2024-11-20 14:06:56', 'COMPLETED'),
(7, 108.59, '', 1, '2024-11-20 14:07:55', 'COMPLETED'),
(8, 108.59, '', 1, '2024-11-20 14:13:05', 'COMPLETED'),
(9, 108.59, '', 1, '2024-11-20 14:14:16', 'COMPLETED'),
(10, 208.59, '', 1, '2024-11-20 18:39:14', 'COMPLETED'),
(11, 98.59, '', 1, '2024-11-20 18:58:23', 'COMPLETED'),
(12, 988.59, 'DEPOSIT', 1, '2024-11-20 18:58:47', 'COMPLETED'),
(13, 8.50, 'DEPOSIT', 1, '2024-11-20 19:06:21', 'COMPLETED'),
(14, 348.50, 'DEPOSIT', 1, '2024-11-20 20:11:40', 'COMPLETED'),
(15, 348.50, '', 1, '2024-11-20 20:54:38', 'COMPLETED'),
(16, 348.50, 'WITHDRAW', 1, '2024-11-20 20:57:19', 'COMPLETED');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `phone_number` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `phone_number`, `password`, `name`, `created_at`, `total_amount`) VALUES
(1, 2147483647, 'jameel', 'jameel', '2024-11-19 23:31:11', 1772.13),
(2, 1232131, '1234', 'xyz', '2024-11-21 00:13:22', 0.00),
(3, 314242, '698234', 'xyz', '2024-11-21 00:25:53', 0.00),
(7, 321412, '698234', '', '2024-11-21 00:30:03', 0.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone_number` (`phone_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
