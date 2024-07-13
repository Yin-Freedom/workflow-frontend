export const entity = (classInfo) =>
  `
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * @author ${classInfo.authorName}
 */
@Entity
public class ${classInfo.pascalCaseClassName} implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long ${classInfo.primaryKey};
    ${classInfo.fieldList.map(field => {
    if (classInfo.primaryKey === field.camelCaseName) {
      return '';
    }
    if (classInfo.excludeList.includes(field.camelCaseName)) {
      return '';
    }
    return `
    /**
     * ${field.comment}
     */
    @Column()
    private String ${field.camelCaseName};
    `;
  }).join("")}
}
`;
