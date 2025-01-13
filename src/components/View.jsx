import ForgeUI, {
  CustomField,
  useProductContext,
  useState,
  Fragment,
  Text,
  Tag,
  TagGroup, // Import Text component
} from "@forge/ui";
import api from "@forge/api";
import { getCustomFieldContext } from "../utils/utils";

export const View = () => {
  const {
    extensionContext: { fieldValue, fieldId },
  } = useProductContext();
  const [customFieldContext] = useState(getCustomFieldContext(fieldId));
  let [{ configuration }] = customFieldContext;
  const checkedOptions = fieldValue?.options || [];
  const checkedLabels = checkedOptions.map((checkedOpt) => checkedOpt.label);


  console.log(JSON.stringify(fieldValue), 'VVVVVvalview');
  console.log(JSON.stringify(configuration), "VVVVVVopiiitos");

  return (
    // <CustomField>
    //   <Fragment>
    //     {/* Wrap your string in a Text component */}
    //     <Text>gogogogog</Text>
    //   </Fragment>
    // </CustomField>
    // <Tag text = "active"/>
    <TagGroup>
      {
        checkedLabels.map((opt) => (<Tag text={opt}/>))
      }
    </TagGroup>
  );
};
