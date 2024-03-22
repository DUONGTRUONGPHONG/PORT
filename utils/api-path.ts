import { PaginationInfo, SortitionInfo } from "@/objects";

export const aph = {
  site: site,
  user: user,
  role: role,
  group: group,
  permission: permission,
  figure: figure,
  paging: paging,
  sorting: sorting,
};

function site(siteId: number): string {
  return `/site:${siteId}`;
}

function figure(figureId: number): string {
  return `/figure:${figureId}`;
}

function permission(permissionId: number): string {
  return `/permission:${permissionId}`;
}

function user(userId: number): string {
  return `/user:${userId}`;
}

function role(roleId: number): string {
  return `/role:${roleId}`;
}

function group(groupId: number): string {
  return `/group:${groupId}`;
}

function paging(pagination: PaginationInfo): string {
  return `/paging:${pagination.page}-${pagination.limit}`;
}

function sorting(sortition?: SortitionInfo): string {
  if (!sortition || sortition === undefined) return "";
  const sortString = sortition.toString();
  return sortString && sortString !== undefined ? `/sorting:${sortString}` : "";
}
