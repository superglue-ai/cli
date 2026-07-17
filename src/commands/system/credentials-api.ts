import type {
  AccessibleCredentials,
  CredentialSetSummary,
  SuperglueClient,
} from "@superglue/shared";

function getCreatedAt(set: AccessibleCredentials): number {
  if (!set.createdAt) return Number.POSITIVE_INFINITY;
  const timestamp = new Date(set.createdAt).getTime();
  return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
}

export function resolveOwnedCredentialSet(
  sets: AccessibleCredentials[],
): AccessibleCredentials | undefined {
  const owned = sets.filter((set) => set.isOwner);
  return (
    owned.find((set) => set.isDefault) || owned.sort((a, b) => getCreatedAt(a) - getCreatedAt(b))[0]
  );
}

export async function getOwnedCredentialSet(
  client: SuperglueClient,
  systemId: string,
): Promise<AccessibleCredentials | undefined> {
  const sets = await client.listCredentials({ systemId });
  return resolveOwnedCredentialSet(sets);
}

export async function setOwnedCredentials({
  client,
  systemId,
  credentials,
}: {
  client: SuperglueClient;
  systemId: string;
  credentials: Record<string, unknown>;
}): Promise<CredentialSetSummary | null> {
  const existing = await getOwnedCredentialSet(client, systemId);
  if (!existing) {
    if (Object.keys(credentials).length === 0) return null;
    return client.createCredentials({ systemId, credentials });
  }
  return client.replaceCredentials(existing.id, credentials);
}

export async function clearOwnedCredentials(
  client: SuperglueClient,
  systemId: string,
): Promise<CredentialSetSummary | null> {
  const existing = await getOwnedCredentialSet(client, systemId);
  if (!existing) return null;
  return client.replaceCredentials(existing.id, {});
}
