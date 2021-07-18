const ARCHIVED_FARMS_START_PID = 999
const ARCHIVED_FARMS_END_PID = 9999

const GG_ARCHIVED_FARMS_START_PID = 999
const GG_ARCHIVED_FARMS_END_PID = 9999

const isArchivedPid = (pid: number, guildSlug) => {
  switch (guildSlug) {
    case 'gg':
      return pid >= GG_ARCHIVED_FARMS_START_PID && pid <= GG_ARCHIVED_FARMS_END_PID // For Example
    default:
      return pid >= ARCHIVED_FARMS_START_PID && pid <= ARCHIVED_FARMS_END_PID
  }
}

export default isArchivedPid
