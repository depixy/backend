/* eslint-disable @typescript-eslint/naming-convention */
import { AbilityBuilder } from "@casl/ability";
import { createPrismaAbility } from "@casl/prisma";
import type { PureAbility } from "@casl/ability";
import type { PrismaQuery, Subjects } from "@casl/prisma";
import type { Tag, TagCategory, User, UserToken } from "@prisma/client";

export type AppAbilityAction = "create" | "delete" | "edit" | "read";
export type AppAbility = PureAbility<[AppAbilityAction, Subjects<{
  Tag: Tag;
  TagCategory: TagCategory;
  User: User;
  UserToken: UserToken;
}>], PrismaQuery>;


function defineAbilityForUser(builder: AbilityBuilder<AppAbility>, user: User): void {
  const { can } = builder;
  can("read", "Tag");
  can("read", "TagCategory");
  can("read", "User", ["id", "displayName", "role", "createdAt", "updatedAt"], { id: { not: user.id } });
  can("read", "User", { id: user.id });
  can("edit", "User", { id: user.id });
  can("read", "UserToken", { userId: user.id });
  can("create", "UserToken", { userId: user.id });
  can("delete", "UserToken", { userId: user.id });
}

function defineAbilityForAdmin(builder: AbilityBuilder<AppAbility>, user: User): void {
  const { can } = builder;
  can("create", "Tag");
  can("delete", "Tag");
  can("edit", "Tag");
  can("read", "Tag");
  can("create", "TagCategory");
  can("delete", "TagCategory");
  can("edit", "TagCategory");
  can("read", "TagCategory");
  can("read", "User", ["id", "displayName", "role", "createdAt", "updatedAt"], { id: { not: user.id } });
  can("read", "User", { id: user.id });
  can("edit", "User", { id: user.id });
  can("read", "UserToken", { userId: user.id });
  can("create", "UserToken", { userId: user.id });
  can("delete", "UserToken", { userId: user.id });
}

export function defineAbilityFor(user: User | null): AppAbility {
  const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);
  if (user && user.role === "user") {
    defineAbilityForUser(builder, user);
  }
  if (user && user.role === "admin") {
    defineAbilityForAdmin(builder, user);
  }
  return builder.build();
}
