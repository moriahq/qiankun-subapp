
export const getRouteIds = () => {
    const [, CompanyId, ProjectId] = window.location.pathname.match(/^\/([^/]+)\/([^/]+)\//) || [];
    return [CompanyId, ProjectId];
};