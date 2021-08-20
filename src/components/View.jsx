import ForgeUI, {
    CustomField,
    Fragment,
    Text,
    useProductContext,
    useState,
    useEffect
  } from "@forge/ui";
  import api,{ storage } from '@forge/api';
  import { DEFAULT_CONFIGURATION, DEFAULT_CONTEXT_CONFIG, STORAGE_KEY_PREFIX  } from '../data/data'
  import { setOutcomeProps, currencyConversion, getCustomFieldContext } from '../utils/utils'


  export const View = () => {
    const { extensionContext: { fieldValue, fieldId },
      platformContext: { projectKey }
    } = useProductContext();

    const setStorgaeData = async (projectConfig) => await storage.set(`${STORAGE_KEY_PREFIX}_${projectKey}`, projectConfig);
    const getStorageData = async () => await (storage.get(`${STORAGE_KEY_PREFIX}_${projectKey}`) || DEFAULT_CONFIGURATION);

    const [localStorageData] = useState(getStorageData());
    const [customFieldContext, setCustomFieldContext] = useState(async () => await getCustomFieldContext(fieldId) || DEFAULT_CONTEXT_CONFIG);
    const [{configuration: {provision, currencyExchangeCourses}}] = customFieldContext;
    const [customFieldContextFormValues] = useState(async () => await setCustomFieldContextFormValues(fieldValue));
    const {userCurrency: {converted, currency, convertedProvision}} = customFieldContextFormValues;

  async function setCustomFieldContextFormValues(formValue) {
    if(!!formValue) {
      const outcome = await setOutcomeProps(localStorageData ? localStorageData.rowsAmount : DEFAULT_CONFIGURATION.rowsAmount, formValue);
      currencyConversion(outcome, provision, currencyExchangeCourses);
      return outcome;
    } else return {}
  };

    return (
      <CustomField>
        <Fragment>
          {converted ? (
            <Text>Total money: {converted} {currency}</Text>
          ) : (
            <Text>No values yet</Text>
          )}
           {convertedProvision ? (
            <Text>Net summ: {convertedProvision} {currency}</Text>
          ) : (
            null
          )}
        </Fragment>
      </CustomField>
    );
  };
  