export function extractQueryParams(params) {
  const paramsList = params.substring(1).split("&");

  const paramsMap = paramsList.reduce((map, param) => {
    const [name, value] = param.split("=");
    map[name] = value;

    return map;
  }, {});

  return paramsMap;
}
