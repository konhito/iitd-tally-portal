/**
 * Simple token-based project sharing utility.
 * In production, use proper JWT or a DB-backed token.
 * Here we encode projectId into a base64 token with a secret prefix.
 */

const SECRET = "orcish-iitd-2026"

export function generateShareToken(projectId: string): string {
  const payload = JSON.stringify({ projectId, secret: SECRET, ts: Date.now() })
  return btoa(payload).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

export function verifyShareToken(token: string): { projectId: string } | null {
  try {
    const padded = token.replace(/-/g, "+").replace(/_/g, "/")
    const padLength = (4 - (padded.length % 4)) % 4
    const decoded = atob(padded + "=".repeat(padLength))
    const payload = JSON.parse(decoded)
    if (payload.secret !== SECRET || !payload.projectId) return null
    return { projectId: payload.projectId }
  } catch {
    return null
  }
}

export const PROJECT_NAMES: Record<string, string> = {
  p1: "AI Automation System",
  p2: "Smart City Infrastructure",
  p3: "Fintech Platform MVP",
  p4: "Healthcare Analytics App",
}
