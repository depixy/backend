function createPermissionsDescription(permissions: [string, string][] = []): string {
  if (permissions.length <= 0) {
    return "";
  }
  return `Required permission${permissions.length === 1 ? "" : "s"}:
  ${permissions.map(([subject, action]) => `- \`${subject}\`: \`${action}\``)}\n\n
`;
}


export function createSwaggerDescription(functionDescription: string, permissions: [string, string][] = []): string {
  return `${createPermissionsDescription(permissions)}${functionDescription}`;
}
