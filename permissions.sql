-- 14. Create user and grant SELECT, INSERT, UPDATE
CREATE USER 'store_manager'@'localhost'
IDENTIFIED BY 'password123';

GRANT SELECT, INSERT, UPDATE
      ON store.*
          TO 'store_manager'@'localhost';


-- 15. Revoke UPDATE
REVOKE UPDATE
    ON store.*
    FROM 'store_manager'@'localhost';


-- 16. Grant DELETE only on Sales table
GRANT DELETE
ON store.Sales
TO 'store_manager'@'localhost';