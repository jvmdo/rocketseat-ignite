export function buildPathRegex(path) {
  const slugMatcher = /:([a-z]+)/gi;
  const pathMatcher = path.replaceAll(slugMatcher, "(?<$1>[a-z0-9_-]+)");
  const pathRegex = new RegExp(`^${pathMatcher}(?<query>\\?.*)?`);

  return pathRegex;
}
