import lodash from "lodash";

export function toPascalCase(str) {
  if (lodash.isEmpty(str)) {
    return str;
  }
  // underline
  if (str.indexOf("_") !== -1) {
    str = underlineToCamelCase(str);
  }
  return str[0].toUpperCase() + str.substring(1);
}

export function underlineToCamelCase(str) {
  if (lodash.isEmpty(str)) {
    return str;
  }
  str = str.toLowerCase();
  return str.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

export function camelCaseToUnderline(str) {
  if (lodash.isEmpty(str)) {
    return str;
  }
  if (/[A-Z]/.test(str[0])) {
    str = str[0].toLowerCase() + str.substring(1);
  }
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}
