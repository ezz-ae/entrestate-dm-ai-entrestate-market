export type DatastoreEntity = {
  id: string;
  type: string;
  name: string;
  attributes?: Record<string, unknown>;
};

export type DatastorePlace = {
  id: string;
  type: "city" | "area" | string;
  name: string;
  kind: string;
  geometry: Record<string, unknown> | null;
  attributes?: Record<string, unknown>;
};

export type DatastoreChunk = {
  id: string;
  text: string;
  embedding: number[];
  entities: string[];
  place_refs: string[];
  metadata?: Record<string, unknown>;
};

export type DatastoreDocument = {
  id: string;
  title: string;
  source_id: string;
  url: string | null;
  chunks: DatastoreChunk[];
};

export type EntrestateDatastore = {
  entities: DatastoreEntity[];
  places: DatastorePlace[];
  documents: DatastoreDocument[];
};
