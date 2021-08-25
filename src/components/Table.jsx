import ForgeUI, {
    Text,
    TextField,
    Select,
    Option,
    Table,
    Head,
    Row,
    Cell,
    Button
  } from "@forge/ui";
import { formValueObjectTransform } from '../utils/utils';
export const TableElement = ({dataProvider, currencyExchangeCourses, fieldValue}) => {

  const converted = formValueObjectTransform(fieldValue);
  converted.pop();

  console.log(dataProvider);

return <Table children>
    <Head children>
      {dataProvider.tableHeaders.map((e) => (
        <Cell children>
          <Text children>{e}</Text>
        </Cell>
      ))}
    </Head>
    {dataProvider.rowsData.map((e, i) => (
      <Row children >
        <Cell>
          <TextField
            type='number'
            name={e.textFieldName}
            placeholder={converted[i] && converted[i].amount ? converted[i].amount : e.textFieldplaceholder} 
          />
        </Cell>
        <Cell>
          <Select 
            name={e.selectItemName}>
            {currencyExchangeCourses.map((element) => (
              <Option
                defaultSelected={
                  !!(element.label === ((converted[i] && converted[i].currency) ? converted[i].currency.value : false))
                }
                label={element.label}
                value={element.label}
              />
            ))}
          </Select>
        </Cell>
        <Cell>
          <Button
            text='❌'
            onClick={() => deleteRow(i)}
          />
        </Cell>
      </Row>
    ))}
  </Table>
}
