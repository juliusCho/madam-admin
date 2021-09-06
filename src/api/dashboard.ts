const apiUserCountPerStatus = async (
  token: string,
): Promise<Record<string, number> | null> => {
  const result = { REST: 11, ACTIVE: 3, BAN: 7, QUIT: 2, INACTIVE: 1 }

  return result
}

export default {
  apiUserCountPerStatus,
}
