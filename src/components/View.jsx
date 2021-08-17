import ForgeUI, {
    CustomField,
    Fragment,
    Text,
    useProductContext,
    useState
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
    const [customFieldContext] = useState(getCustomFieldContext(fieldId));
    let [{configuration}] = customFieldContext;
    const [customFieldContextFormValues] = useState(setCustomFieldContextFormValues(fieldValue));

    if(!configuration) {
      configuration = DEFAULT_CONTEXT_CONFIG.configuration;
      setStorgaeData(DEFAULT_CONFIGURATION);
    }

  async function setCustomFieldContextFormValues(formValue) {
    if(!!formValue) {
      const outcome = await setOutcomeProps(localStorageData ? localStorageData.rowsAmount : DEFAULT_CONFIGURATION.rowsAmount, formValue);
      currencyConversion(outcome, 
        configuration ? configuration.provision : DEFAULT_CONTEXT_CONFIG.configuration.provision, 
        configuration ? configuration.currencyExchangeCourses : DEFAULT_CONTEXT_CONFIG.configuration.currencyExchangeCourses);
      return outcome;
    } else return {}
  };

    return (
      <CustomField>
        <Fragment>
          {customFieldContextFormValues && customFieldContextFormValues.userCurrency ? (
            <Text>Total money: {customFieldContextFormValues.userCurrency.converted} {customFieldContextFormValues.userCurrency.currency}</Text>
          ) : (
            <Text>No values yet</Text>
          )}
           {customFieldContextFormValues && customFieldContextFormValues.userCurrency ? (
            <Text>Net summ: {customFieldContextFormValues.userCurrency.convertedProvision} {customFieldContextFormValues.userCurrency.currency}</Text>
          ) : (
            null
          )}
        </Fragment>
      </CustomField>
    );
  };
  