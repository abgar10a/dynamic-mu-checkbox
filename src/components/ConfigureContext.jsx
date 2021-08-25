import ForgeUI, {
    useProductContext,
    CustomFieldContextConfig,
    TextField,
    Table,
    Row,
    Cell,
    Head,
    Text,
    useState,
  } from "@forge/ui";
  import { DEFAULT_CONTEXT_CONFIG } from '../data/data';
  import { getCustomFieldContext, validateMaxRowsAmount } from '../utils/utils';

    export const ConfigureContext = () => {
    const { extensionContext: { fieldId }} = useProductContext();

    const [customFieldContext] = useState(getCustomFieldContext(fieldId));
    let [{configuration}] = customFieldContext;

    if(!configuration) {
      configuration = DEFAULT_CONTEXT_CONFIG.configuration
    }

    const onSubmit = (formData) => {
      validateMaxRowsAmount(formData);
      return {
        configuration: {
          provision: +formData.provision,
          maxCurrencyCalculationRows: +formData.maxRowsAmount,
          currencyExchangeCourses: [
            {
              label: "USD",
              exchangeValue: +formData.USD,
            },
            {
              label: "EUR",
              exchangeValue: +formData.EUR,
            },
            {
              label: "GBP",
              exchangeValue: +formData.GBP,
            },
            {
              label: "PLN",
              exchangeValue: +formData.PLN,
            },
            {
              label: "CHF",
              exchangeValue: +formData.CHF,
            },
          ],
        },
      };
    };
  
    return (
      <CustomFieldContextConfig onSubmit={onSubmit}>
      <TextField
        type="number"
          name="provision"
          label="Bank provision (%)"
          defaultValue={configuration.provision}
        />
        <TextField
          type="number"
          name="maxRowsAmount"
          label="Maximum amount of currency"
          defaultValue={configuration.maxCurrencyCalculationRows}
        />
        <Table children>
          <Head children>
            <Cell>
              <Text children>Value compared to USD</Text>
            </Cell>
          </Head>
          {configuration.currencyExchangeCourses.map((e) => (
              <Row children>
                <Cell>
                  <TextField
                    name={e.label}
                    label={e.label}
                    placeholder={e.curencyValue}
                    defaultValue={e.exchangeValue && e.exchangeValue}
                  />
                </Cell>
              </Row>
            ))}
        </Table>
      </CustomFieldContextConfig>
    );
};