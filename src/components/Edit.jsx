import ForgeUI, {
    CustomFieldEdit,
    useProductContext,
    Button,
    useState,
    Text
  } from "@forge/ui";
  import api,{ storage } from '@forge/api';
  import { TableElement } from "./Table";
  import { SelectElement } from './Select';
  import { DEFAULT_CONFIGURATION, DEFAULT_CONFIG_CONFIGURATION, STORAGE_KEY_PREFIX  } from '../data/data'
  import { getCustomFieldContext, setDataProviderRows } from './../utils/utils';
  
export const Edit = () => {

    const { 
        extensionContext: { fieldValue, fieldId }, 
        platformContext: { projectKey }
    } = useProductContext();

    const getStorageData = async () => await (storage.get(`${STORAGE_KEY_PREFIX}_${projectKey}`));
    const setStorgaeData = async (projectConfig) => await storage.set(`${STORAGE_KEY_PREFIX}_${projectKey}`, projectConfig);

    const [localStorageData, setLocalStorageData] = useState(getStorageData());
    const [customFieldContext] = useState(getCustomFieldContext(fieldId));
    let [{configuration}] = customFieldContext;

    if(!configuration) {
      configuration = DEFAULT_CONFIG_CONFIGURATION.configuration
    }

    const addRow = () => {
      let rowsSetter = localStorageData.rowsAmount;
      if(localStorageData.rowsAmount >= configuration.maxCurrencyCalculationRows) { 
        rowsSetter = localStorageData.rowsAmount;
      } else {
        rowsSetter = localStorageData.rowsAmount + 1;
      }
      const rowsData = setDataProviderRows(rowsSetter);
      setStorageDataRows(rowsData);
    }
  
    const deleteAllRows = () => {
      const rowsData = setDataProviderRows(1);
      setStorageDataRows(rowsData);
    }

    const setStorageDataRows = (rowsDataSetter) => {
      const defaultSetting = DEFAULT_CONFIGURATION;
      defaultSetting.rowsData = rowsDataSetter;
      defaultSetting.rowsAmount = rowsDataSetter.length;
      setStorgaeData(defaultSetting)
      setLocalStorageData(defaultSetting);
    }
    
    const onSubmit = (formValue) => formValue;
    
    return (
      <CustomFieldEdit onSubmit={onSubmit} header="Edit">
        <Text>Rows: {localStorageData ? localStorageData.rowsAmount : DEFAULT_CONFIGURATION.rowsAmount}/{configuration.maxCurrencyCalculationRows}</Text>
        <TableElement 
          dataProvider={localStorageData ? localStorageData : DEFAULT_CONFIGURATION}
          currencyExchangeCourses={configuration.currencyExchangeCourses}
          fieldValue={fieldValue ? fieldValue : {}}
        />
        <Button text={'Add row +'} appearance='warning' disabled={(localStorageData ? localStorageData.rowsAmount : DEFAULT_CONFIGURATION.rowsAmount) >= configuration.maxCurrencyCalculationRows} onClick={() => addRow()}/>
        <Button text={'Reset'} appearance='danger' onClick={() => deleteAllRows()}/>
        <SelectElement
          dataProvider={localStorageData ? localStorageData : DEFAULT_CONFIGURATION}
          currencyExchangeCourses={configuration.currencyExchangeCourses}
          userCurrency={fieldValue && fieldValue.currency} 
        />
      </CustomFieldEdit>
  
    );
  };