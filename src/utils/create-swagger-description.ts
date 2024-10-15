import type { PermissionAction, PermissionSubject } from "#schema/data";


type Permission = [PermissionSubject, PermissionAction];

function createPermissionsDescription(permissions: Permission[] = []): string {
  if (permissions.length <= 0) {
    return "";
  }
  return `Required permission${permissions.length === 1 ? "" : "s"}:
  ${permissions.map(([subject, action]) => `- \`${subject}\`: \`${action}\``)}\n\n
`;
}


export function createSwaggerDescription(functionDescription: string, permissions: Permission[] = []): string {
  return `${createPermissionsDescription(permissions)}${functionDescription}`;
}
