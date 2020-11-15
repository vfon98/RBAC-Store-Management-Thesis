-- Default payment type
INSERT INTO `payment_method`(`name`)
VALUES ('cash'), ('online');

-- Default user group
INSERT INTO `user_group`(`name`, `priority`) VALUES
('admin', 1),
('subadmin', 2),
('manager', 3),
('staff', 4),
('customer', 5);