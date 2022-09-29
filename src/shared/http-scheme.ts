// HTTP/S scheme allowed variations
export enum Scheme {
  http = 'http',
  https = 'https'
}

export type PrependFun = (absoluteURI: string) => string

// URI building HTTP scheme related utilities
export const prepend2Uri =
  (scheme: Scheme) =>
  (absoluteURI: string): string =>
    `${scheme}://${absoluteURI}`
export const prependHttp2Uri = prepend2Uri(Scheme.http)
export const prependHttps2Uri = prepend2Uri(Scheme.https)

export default {
  prepend2Uri,
  prependHttp2Uri,
  prependHttps2Uri
}
