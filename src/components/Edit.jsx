import ForgeUI, {
  CustomFieldEdit,
  useProductContext,
  useState,
  Checkbox,
  SectionMessage,
  CheckboxGroup,
  Text, // Import CheckboxGroup
} from "@forge/ui";
import {
  getCustomFieldContext,
} from "./../utils/utils";
import {
  DEFAULT_FIELD_VALUE,
} from "../data/data";

export const Edit = () => {
  const {
    extensionContext: { fieldValue, fieldId },
  } = useProductContext();
  const [customFieldContext] = useState(getCustomFieldContext(fieldId));
  const checkedOptions = fieldValue?.options || [];
  const checkedLabels = checkedOptions.map((checkedOpt) => checkedOpt.label);

  const [error, setError] = useState(null);

  let [{ configuration }] = customFieldContext;

  console.log(JSON.stringify(checkedLabels), 'eeeCHECKEDLABELS\n');
  // console.log(JSON.stringify(configuration), 'eee\n');

  const onSubmit = (formValue) => {
    // const copy = JSON.parse(JSON.stringify(formValue));
    let selectedOpts = formValue?.options || []
    
    return selectedOpts.filter((opt) => !checkedLabels.includes(opt.label));
  };


  return (
    <CustomFieldEdit onSubmit={onSubmit}>
    {error && <SectionMessage appearance="error">{error}</SectionMessage>}
      
    {/* Wrap Checkbox components inside a CheckboxGroup */}
      <CheckboxGroup name="options">
        {configuration?.options.map((option) => (
          <Checkbox
            value={option}
            label={option.label}
            defaultChecked={checkedLabels.includes(option.label)}
          />
        ))}
      </CheckboxGroup>
    </CustomFieldEdit>
  );
};
