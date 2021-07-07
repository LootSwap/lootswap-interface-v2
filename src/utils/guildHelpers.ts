const ARCHIVED_FARMS_START_PID = 999
const ARCHIVED_FARMS_END_PID = 9999

const TROLL_ARCHIVED_FARMS_START_PID = 999
const TROLL_ARCHIVED_FARMS_END_PID = 9999

const isArchivedPid = (pid: number, guildSlug) => {
  switch (guildSlug) {
    case 'troll':
      return pid >= TROLL_ARCHIVED_FARMS_START_PID && pid <= TROLL_ARCHIVED_FARMS_END_PID
    default:
      return pid >= ARCHIVED_FARMS_START_PID && pid <= ARCHIVED_FARMS_END_PID
  }
}

export default isArchivedPid
