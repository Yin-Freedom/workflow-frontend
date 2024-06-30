export function mysqlFieldTypeMap() {
  let map = new Map();
  map.set("bigint", "Long");
  map.set("int", "Integer");
  map.set("tinyint", "Integer");
  map.set("smallint", "Integer");
  map.set("mediumint", "Integer");
  map.set("integer", "Integer");
  //小数
  map.set("float", "Float");
  map.set("double", "Double");
  map.set("decimal", "Double");
  //bool
  map.set("bit", "Boolean");
  //字符串
  map.set("char", "String");
  map.set("varchar", "String");
  map.set("tinytext", "String");
  map.set("text", "String");
  map.set("mediumtext", "String");
  map.set("longtext", "String");
  //日期
  map.set("date", "Date");
  map.set("datetime", "Date");
  map.set("timestamp", "Date");
  return map;
}

export function oracleFieldTypeMap() {
  let map = new Map();
  map.set(/(number)\(([1-9])\)/, "Integer");
  map.set(/(number)\((\d{2,10})\)/, "Long");
  map.set(/decimal/, "BigDecimal");
  map.set(/(varchar2)\((\d+)\)/, "String");
  map.set(/char/, "String");
  map.set(/clob/, "String");
  return map;
}

export function mysqlSwaggerTypeMap() {
  let map = new Map();
  map.set("bigint", "integer");
  map.set("int", "integer");
  map.set("tinyint", "integer");
  map.set("smallint", "integer");
  map.set("mediumint", "integer");
  map.set("integer", "integer");
  map.set("boolean", "boolean");
  map.set("float", "number");
  map.set("double", "number");
  map.set("decimal", "Double");
  return map;
}
