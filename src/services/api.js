import { MOCK_MENUS, MOCK_ITEMS } from "../constants/mockData"

const BASE =
  "https://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr"

export async function fetchMenus() {
  try {
    const res = await fetch(`${BASE}/menus`)
    if (!res.ok) throw new Error("fetch failed")
    return await res.json()
  } catch {
    return MOCK_MENUS
  }
}

export async function fetchItems(subMenuId) {
  // subMenuId pode vir como string ("11") ou número (11)
  // endpoint precisa do mesmo id presente no mock/menus.
  const id = Number(subMenuId)

  try {
    const res = await fetch(`${BASE}/items/${id}`)
    if (!res.ok) {
      throw new Error(`fetch failed: ${res.status}`)
    }

    const data = await res.json()

    // A API pode retornar:
    // - Array direta: [{...}]
    // - Objeto com `subMenuItems`: { id, subMenuItems: [...] }
    const arr = Array.isArray(data)
      ? data
      : Array.isArray(data?.subMenuItems)
        ? data.subMenuItems
        : []

    if (!arr || arr.length === 0) {
      throw new Error("empty response")
    }

    return arr
      .filter((i) => i && i.id != null)
      .map((i) => ({
        ...i,
        id: Number(i.id),
        date: i.date ?? "—",
        users: i.users ?? [],
        // campos padrão do front
        read: Boolean(i.read),
        starred: Boolean(i.starred),
      }))
  } catch (err) {
    // Se a API falhar, retorna mock, mas deixa o erro no console
    // para facilitar debug.
    console.warn(
      "fetchItems fallback to mock. submenuId=",
      subMenuId,
      "id=",
      id,
      "err=",
      err,
    )

    const mock = MOCK_ITEMS[id] ?? []
    return mock.map((i) => ({
      ...i,
      date: i.date ?? "—",
      users: i.users ?? [],
      read: Boolean(i.read),
      starred: Boolean(i.starred),
    }))
  }
}

export async function fakeLogin(username, password) {
  await new Promise((r) => setTimeout(r, 600))
  if (
    username.toLowerCase() === "admin" &&
    password.toLowerCase() === "admin"
  ) {
    return {
      ok: true,
      user: { name: "Admin", email: "admin@enki.com", initials: "AD" },
    }
  }
  return { ok: false }
}

