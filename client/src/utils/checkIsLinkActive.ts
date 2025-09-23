import { routesConfig } from '@config/routesConfig'

/**
 * Verfica si la ruta actual coincide con la ruta del enlace o si es una subruta de la misma.
 * @param currentPath - La ruta actual.
 * @param route - Ruta a verificar.
 * @returns Verdadero si la ruta actual es igual a la ruta del enlace o si es una subruta de la misma.
 */
export function checkIsLinkActive(currentPath: string, route: string): boolean {
   const isDashboardRoute =
      route === routesConfig.ADMIN_DASHBOARD || route === routesConfig.CLIENT_HOME

   return (
      currentPath === route ||
      (!isDashboardRoute &&
         currentPath.startsWith(route) &&
         currentPath.charAt(route.length) === '/')
   )
}
