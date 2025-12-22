import type { EntrestateDatastore, DatastoreDocument, DatastoreEntity, DatastorePlace } from "@/types/entrestateDatastore";
// @ts-ignore
import datastoreRaw from "@/data/entrestate_ai_datastore_v2.json";

const datastore: EntrestateDatastore = datastoreRaw as EntrestateDatastore;

export function getDatastore() {
  return datastore;
}

export function getProjectEntities() {
  return datastore.entities.filter((entity) => entity.type === "project");
}

export function getDeveloperEntities() {
  return datastore.entities.filter((entity) => entity.type === "developer");
}

export function getPlaces(type?: string) {
  if (!type) return datastore.places;
  return datastore.places.filter((place) => place.type === type);
}

export function getProjectDocuments() {
  return datastore.documents;
}

export function findProjectsBy(filter: {
  developerId?: string;
  areaPlaceId?: string;
  maxPrice?: number;
  status?: string;
  limit?: number;
}) {
  const projects = getProjectEntities();
  const filtered = projects.filter((project) => {
    const attributes = (project.attributes || {}) as Record<string, unknown>;
    const getAttr = (key: string) => attributes[key];

    if (filter.developerId && getAttr("developer_id") !== filter.developerId) {
      return false;
    }
    if (filter.areaPlaceId && getAttr("area_place_id") !== filter.areaPlaceId) {
      return false;
    }
    if (filter.status && getAttr("current_status") !== filter.status && getAttr("status") !== filter.status) {
      return false;
    }
    if (filter.maxPrice) {
      const priceRaw = getAttr("price_from") ?? getAttr("priceFromAED");
      const price = typeof priceRaw === "number" ? priceRaw : Number(priceRaw);
      if (price && price > filter.maxPrice) {
        return false;
      }
    }
    return true;
  });

  if (filter.limit) {
    return filtered.slice(0, filter.limit);
  }
  return filtered;
}
