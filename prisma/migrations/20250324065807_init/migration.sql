-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login_name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "password_hash" BLOB NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user_token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "expired_at" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "user_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tag_category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tag_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "tag_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_child_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_child_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_child_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_login_name_key" ON "user"("login_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_token_user_id_idx" ON "user_token"("user_id");

-- CreateIndex
CREATE INDEX "user_token_expired_at_idx" ON "user_token"("expired_at" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "tag_category_name_key" ON "tag_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_child_tags_AB_unique" ON "_child_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_child_tags_B_index" ON "_child_tags"("B");
