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
    useEffect
  } from "@forge/ui";
  import { DEFAULT_CONTEXT_CONFIG  } from '../data/data';
  import { getCustomFieldContext, validateMaxRowsAmount } from '../utils/utils';

    export const ConfigureContext = () => {
    const { extensionContext: { fieldId }} = useProductContext();

    const [customFieldContext, setCustomFieldContext] = useState(DEFAULT_CONTEXT_CONFIG);
    const {configuration: {provision, maxCurrencyCalculationRows, currencyExchangeCourses}} = customFieldContext;

    console.log(customFieldContext)
    
    useEffect(() => {
      async () => await setCustomFieldContext(getCustomFieldContext(fieldId))
    }, [])
    
    
    console.log(provision);
    
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
          defaultValue={provision}
        />
        <TextField
          type="number"
          name="maxRowsAmount"
          label="Maximum amount of currency"
          defaultValue={maxCurrencyCalculationRows}
        />
        <Table children>
          <Head children>
            <Cell>
              <Text children>Value compared to USD</Text>
            </Cell>
          </Head>
          {
            currencyExchangeCourses.map((e) => (
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