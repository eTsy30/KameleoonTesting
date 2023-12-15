export function getColor(name: string) {
  switch (name.toLowerCase()) {
    case 'market.company.com':
      return 'red'
    case 'games.company.com':
      return 'blue'
    case 'delivery.company.com':
      return 'violet'
    default:
      return 'Unknown color'
  }
}
