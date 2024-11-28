import type { UmzugSeed } from "../umzug-migration.type";

const table = {
  name: 'roles',
  schema: 'public',
};

const seed = [
  {
    id: 1,
    name: 'admin'
  },
  {
    id: 2,
    name: 'client'
  }
];

export const up = async (migration: UmzugSeed) => {
  const query = migration.context.getQueryInterface();

  await query.bulkInsert(
    {
      tableName: table.name,
      schema: table.schema,
    },
    seed,
  );
};

export const down = async (migration: UmzugSeed) => {
  const query = migration.context.getQueryInterface();

  await query.bulkDelete(
    {
      tableName: table.name,
      schema: table.schema,
    },
    { id: seed.map((seed) => seed.id) },
  );
};
