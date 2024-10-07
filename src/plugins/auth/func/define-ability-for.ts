import { AbilityBuilder, createMongoAbility } from "@casl/ability";

import type { MongoAbility, CreateAbility } from "@casl/ability";
import type { Permission, Role } from "@prisma/client";

const actions = [
  "create",
  "create:self",
  "update",
  "update:self",
  "delete",
  "delete:self",
  "search",
  "search:self",
  "detail",
  "detail:self"
] as const;

const subjects = [
  "UserToken",
  "User",
  "Tag",
  "TagCategory",
  "Role",
  "Permission"
] as const;

export type Action = typeof actions[number];
export type Subject = typeof subjects[number];

export type AppAbility = MongoAbility<[Action, Subject]>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

type RoleWithPermissions = { permissions: Permission[] } & Role ;

function isAction(action: string): action is Action {
  return actions.includes(action as Action);
}

function isSubject(subject: string): subject is Subject {
  return subjects.includes(subject as Subject);
}

export function defineAbilityFor(role: RoleWithPermissions): AppAbility {
  const builder = new AbilityBuilder(createAppAbility);
  const { permissions } = role;
  for (const permission of permissions) {
    const { action, subject } = permission;
    if (isAction(action) && isSubject(subject)) {
      builder.can(action, subject);
    }
  }
  return builder.build();
}
