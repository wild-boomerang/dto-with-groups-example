/**
 * There should be an abstract class with an abstract method,
 * but it won't work with mapped types (e.g. `IntersectionType`).
 */
export class DtoWithGroups {
  getGroups?(): string[];
}
