import lodash from "lodash";
import * as StringUtil from "./StringUtil.js";
import * as FieldType from "./SqlFieldType.js";

export function parseSql(sql) {
  // return sql;
  let entity = {
    uuid: "",
    dabaseType: "oracle",
    // camelCase
    className: "",
    camelCaseClassName: "",
    pascalCaseClassName: "",
    underlineClassName: "",
    primaryKey: "",
    fieldList: [],
    excludeList: []
  };

  sql = sql.trim();
  let lines = sql.split("\n");
  lines.forEach(function (line) {
    let lineInfo = parseLine(line);
    if (lineInfo.type === "attr") {
      entity.fieldList.push(lineInfo);
    } else if (lineInfo.type === "tableName") {
      let tableNameRegx = /create table (if not exists )?(\w+)/i;
      let matchArr = line.match(tableNameRegx);
      let tableName = matchArr[matchArr.length - 1];
      entity.className = StringUtil.underlineToCamelCase(tableName);
      entity.camelCaseClassName = StringUtil.underlineToCamelCase(tableName);
      entity.pascalCaseClassName = StringUtil.toPascalCase(tableName);
      entity.underlineClassName = tableName;
    } else if (lineInfo.type === "primaryKey") {
      let primaryKey = line.match(/primary\s+key\s?\((\w+)\)/i)[1];
      entity.primaryKey = StringUtil.underlineToCamelCase(primaryKey);
    }
  });
  console.log(entity);
  return entity;
}

export function parseLine(line) {
  let lineInfo = {
    type: "",
    comment: "",
    attrClass: "",
    attrLength: "",
    underlineName: "",
    camelCaseName: ""
  };
  line = line.trim();
  if (lodash.isEmpty(line)) {
    lineInfo.type = "blank";
    return lineInfo;
  }
  if (/create table (if not exists )?(\w+)/i.test(line)) {
    lineInfo.type = "tableName";
    return lineInfo;
  }
  if (/primary\s+key\s?\((\w+)\)/i.test(line)) {
    lineInfo.type = "primaryKey";
    return lineInfo;
  }

  if (/(\w+)\s+(\w+)/.test(line)) {
    lineInfo.type = "attr";
    let fieldName = line.match(/(\w+)\s+(\w+)/)[1];
    fieldName = fieldName.toLowerCase();
    lineInfo.underlineName = fieldName;
    lineInfo.camelCaseName = StringUtil.underlineToCamelCase(
      lineInfo.underlineName
    );
  }
  if (/--(.*)/.test(line)) {
    lineInfo.comment = line.match(/--(.*)/)[1].trim();
  }
  if (/#(.*)/.test(line)) {
    lineInfo.comment = line.match(/#(.*)/)[1].trim();
  }

  // 字段类型
  const mysqlFieldTypeMap = FieldType.mysqlFieldTypeMap();
  const oracleFieldTypeMap = FieldType.oracleFieldTypeMap();
  for (let [key, value] of mysqlFieldTypeMap.entries(oracleFieldTypeMap)) {
    if (line.indexOf(key) !== -1) {
      lineInfo.attrClass = value;
    }
  }
  for (let [key, value] of oracleFieldTypeMap.entries(oracleFieldTypeMap)) {
    if (key.test(line)) {
      lineInfo.attrClass = value;

      let matchArr = line.match(key);
      if (matchArr.length > 2) {
        lineInfo.attrLength = matchArr[matchArr.length - 1];
      }
    }
  }
  return lineInfo;
}
