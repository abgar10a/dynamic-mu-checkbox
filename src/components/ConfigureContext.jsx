import ForgeUI, {
  useProductContext,
  CustomFieldContextConfig,
  Table,
  Head,
  Cell,
  Text,
  Row,
  useState,
  Button,
  SectionMessage,
  TextField,
} from "@forge/ui";
import { optionsTableHeaders } from "../data/data";
import { createDefaultOption } from "../utils/utils";
import { MoveDown } from "../icons/MoveDown";

export const ContextConfig = () => {
  const {
    extensionContext: { configuration },
  } = useProductContext();

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const [options, setOptions] = useState(configuration?.options || []);
  const [error, setError] = useState(null);

  const onSubmit = (formData) => {
    console.log(JSON.stringify(formData), "Form Data");
    console.log(JSON.stringify(options), "Options after modification");
    let newOptions = [];

    for (let i = 0; i < options.length; i++) {
      let opt = options[i];
      let newLabel = formData[`text${i}`];
      console.log(newLabel, "newlabel");
      
      if (newLabel) {
        newOptions.push({...opt, label: newLabel})
      }
      
    }

    return {
      configuration: {
        options: newOptions,
      },
    };
  };

  const moveOption = (fromIndex, toIndex) => {
    let movedOptions = [...options];

    const [element] = movedOptions.splice(fromIndex, 1);
    movedOptions.splice(toIndex, 0, element);

    movedOptions = movedOptions.map((opt, index) => ({
      ...opt,
      position: index + 1,
    }));

    setOptions(movedOptions);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingValue(options[index].label);
  };

  const addOption = () => {
    // if (newOption.trim() && !options.some((option) => option.label === newOption.trim())) {
    //   setOptions([
    //     ...options,
    //     createDefaultOption({ label: newOption.trim(), position: options.length + 1 }),
    //   ]);
    //   setNewOption('');
    // }
    setOptions([...options, createDefaultOption({ position: options.length + 1 })])
  };

  const deleteOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const toggleDisable = (index) => {
    setOptions(
      options.map((option, i) =>
        i === index ? { ...option, disabled: !option.disabled } : option
      )
    );
  };

  const saveEditing = () => {
    const updatedOptions = [...options];
    updatedOptions[editingIndex].label = editingValue;
    setOptions(updatedOptions);
    setEditingIndex(null);
    setEditingValue('');
  };

  return (
    <CustomFieldContextConfig onSubmit={onSubmit}>
      {error && <SectionMessage appearance="error">{error}</SectionMessage>}
      {/* <div style={{ marginBottom: '16px' }}> */}
      {/* <TextField
          label="Add option"
          placeholder="Enter a new option"
          value={newOption}
          name="newOption"
          // onChange={(value) => setNewOption(value)}
        /> */}
      {/* </div> */}

      <Table>
        <Head>
          {optionsTableHeaders.map((header, index) => (
            <Cell key={index}>
              <Text>{header}</Text>
            </Cell>
          ))}
        </Head>
        {options.map((opt, index) => (
          <Row key={index}>
            <Cell>
              <Text>{opt.position}</Text>
            </Cell>
            <Cell>
              {/* {editingIndex !== index ? (
                <Text>{opt.label}</Text>
              ) : (
                <TextField
                  value={editingValue}
                  onChange={(value) => setEditingValue(value)}
                  name="editLabel"
                />
              )} */}
              <TextField
                name={`text${index}`}
                defaultValue={opt.label}
              />
            </Cell>
            <Cell>
              <Button
                onClick={() => moveOption(index, index + 1)} text="Move Down" icon="arrow-down"/>
              <Button onClick={() => moveOption(index, index - 1)} text="Move Up" icon="arrow-up" />
            </Cell>
            {/* <Cell>
              <TextField
                value={movePosition}
                onChange={(value) => setMovePosition(value)}
                name="movePosition"
                placeholder="Pos"
              />
              <Button
                onClick={() => moveOption(index, parseInt(movePosition, 10) - 1)}
                text="Move"
              />
            </Cell> */}
            <Cell>
              {editingIndex === index ? (
                <Button onClick={saveEditing} text="Save" />
              ) : (
                <Button onClick={() => startEditing(index)} text="Edit" />
              )}
              <Button onClick={() => deleteOption(index)} text="Delete" />
              <Button
                onClick={() => toggleDisable(index)}
                text={opt.disabled ? 'Enable' : 'Disable'}
              />
            </Cell>
          </Row>
        ))}
      </Table>

      <Button appearance="primary" onClick={addOption} text="Add new option" icon="add" />

    </CustomFieldContextConfig>
  );
};
