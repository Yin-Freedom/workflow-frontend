import * as StringUtil from "../../util/StringUtil.js";
export const entity = classInfo =>
  `
/**
 * @author ${classInfo.authorName}
 */
@Entity
@Table(name="${classInfo.underlineClassName}")
public class ${classInfo.pascalCaseClassName} implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "${StringUtil.camelCaseToUnderline(classInfo.primaryKey)}")
    private Long ${classInfo.primaryKey};
${classInfo.fieldList
  .map(field => {
    return `
    // ${field.comment}
    @Column(name = "${field.underlineName}")
    private String ${field.camelCaseName};
    `;
  })
  .join("")}
}
`;
