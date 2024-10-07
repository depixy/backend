INSERT INTO "Role" ("name", "editable", "deletable") VALUES ('Admin', false, false);
INSERT INTO "Role" ("name", "editable", "deletable") VALUES ('User', true, false);
INSERT INTO "Role" ("name", "editable", "deletable") VALUES ('Guest', true, false);

INSERT INTO "Permission" ("roleId", "subject", "action") SELECT "id", 'UserToken', 'create:self' FROM "Role";
INSERT INTO "Permission" ("roleId", "subject", "action") SELECT "id", 'UserToken', 'delete:self' FROM "Role";
INSERT INTO "Permission" ("roleId", "subject", "action") SELECT "id", 'UserToken', 'search:self' FROM "Role";

INSERT INTO "Permission" ("roleId", "subject", "action") SELECT "id", 'User', 'create'      FROM "Role" WHERE "name" IN ('Admin', 'Guest');
INSERT INTO "Permission" ("roleId", "subject", "action") SELECT "id", 'User', 'update'      FROM "Role" WHERE "name" IN ('Admin', 'User');
INSERT INTO "Permission" ("roleId", "subject", "action") SELECT "id", 'User', 'delete'      FROM "Role" WHERE "name" IN ('Admin');
INSERT INTO "Permission" ("roleId", "subject", "action") SELECT "id", 'User', 'search'      FROM "Role" WHERE "name" IN ('Admin', 'User');
INSERT INTO "Permission" ("roleId", "subject", "action") SELECT "id", 'User', 'search:self' FROM "Role" WHERE "name" IN ('Admin', 'User');

INSERT INTO "Permission" ("roleId", "subject", "action") SELECT "id", 'TagCategory', 'create' FROM "Role" WHERE "name" IN ('Admin');
INSERT INTO "Permission" ("roleId", "subject", "action") SELECT "id", 'TagCategory', 'update' FROM "Role" WHERE "name" IN ('Admin');
INSERT INTO "Permission" ("roleId", "subject", "action") SELECT "id", 'TagCategory', 'delete' FROM "Role" WHERE "name" IN ('Admin');
INSERT INTO "Permission" ("roleId", "subject", "action") SELECT "id", 'TagCategory', 'search' FROM "Role" WHERE "name" IN ('Admin', 'User');

INSERT INTO "Permission" ("roleId", "subject", "action") SELECT "id", 'Tag', 'create' FROM "Role" WHERE "name" IN ('Admin');
INSERT INTO "Permission" ("roleId", "subject", "action") SELECT "id", 'Tag', 'update' FROM "Role" WHERE "name" IN ('Admin');
INSERT INTO "Permission" ("roleId", "subject", "action") SELECT "id", 'Tag', 'delete' FROM "Role" WHERE "name" IN ('Admin');
INSERT INTO "Permission" ("roleId", "subject", "action") SELECT "id", 'Tag', 'search' FROM "Role" WHERE "name" IN ('Admin', 'User');
