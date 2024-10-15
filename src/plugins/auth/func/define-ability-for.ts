import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { Value } from "@sinclair/typebox/value";
import { permissionActionSchema, permissionSubjectSchema } from "#schema/data";
import type { CreateAbility, MongoAbility } from "@casl/ability";
import type { Permission, Role } from "@prisma/client";
import type { PermissionAction, PermissionSubject } from "#schema/data";

export type AppAbility = MongoAbility<[PermissionAction, PermissionSubject]>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

type RoleWithPermissions = { permissions: Permission[] } & Role ;

export function defineAbilityFor(role: RoleWithPermissions): AppAbility {
  const builder = new AbilityBuilder(createAppAbility);
  const { permissions } = role;
  for (const permission of permissions) {
    const { action, subject } = permission;
    if (Value.Check(permissionActionSchema, action) && Value.Check(permissionSubjectSchema, subject)) {
      builder.can(action, subject);
    }
  }
  return builder.build();
}
