import ForgeUI, {
    CustomFieldEdit,
    useProductContext,
    Button,
    ButtonSet,
    useState,
    Text,
  } from "@forge/ui";
  import api,{ storage } from '@forge/api';
  import { TableElement } from "./Table";
  import { SelectElement } from './Select';
  import { DEFAULT_CONFIGURATION, DEFAULT_CONTEXT_CONFIG, STORAGE_KEY_PREFIX  } from '../data/data'
  import { getCustomFieldContext, setDataProviderRows } from './../utils/utils';
  
  export const Edit = () => {

    const { 
        extensionContext: { fieldValue, fieldId }, 
        platformContext: { projectKey }
    } = useProductContext();

    const getStorageData = async () => await (storage.get(`${STORAGE_KEY_PREFIX}_${projectKey}`));
    const setStorageData = async (projectConfig) => await storage.set(`${STORAGE_KEY_PREFIX}_${projectKey}`, projectConfig);

    const [localStorageData, setLocalStorageData] = useState(getStorageData());
    const [customFieldContext] = useState(getCustomFieldContext(fieldId));
    let [{configuration}] = customFieldContext;

    if(!configuration) {
      configuration = DEFAULT_CONTEXT_CONFIG.configuration
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

    const deleteRow = (index) => {
      let localStorageCopy = localStorageData;
      localStorageCopy.rowsData = localStorageCopy.rowsData.filter((e,i) => i !== index);
      setLocalStorageData(localStorageCopy)
    }

    const deleteAllRows = () => {
      const rowsData = setDataProviderRows(1);
      setStorageDataRows(rowsData);
    }

    const setStorageDataRows = (rowsDataSetter) => {
      let defaultSetting = DEFAULT_CONFIGURATION;
      defaultSetting.rowsData = rowsDataSetter;
      defaultSetting.rowsAmount = rowsDataSetter.length;
      console.log('original', DEFAULT_CONFIGURATION)
      console.log('setter', defaultSetting)
      setStorageData(defaultSetting)
      setLocalStorageData(defaultSetting);
    }

    const onSubmit = (formValue) => formValue;
    
    return (
      <CustomFieldEdit onSubmit={onSubmit} header="Edit">
        <Text>Rows: {localStorageData.rowsAmount}/{configuration.maxCurrencyCalculationRows}</Text>
        <TableElement 
          dataProvider={localStorageData ? localStorageData : DEFAULT_CONFIGURATION}
          currencyExchangeCourses={configuration.currencyExchangeCourses}
          fieldValue={fieldValue ? fieldValue : {}}
          deleteRow={deleteRow}
        />
        <ButtonSet>
            <Button 
              text='Add row' 
              disabled={localStorageData.rowsAmount >= configuration.maxCurrencyCalculationRows} 
              onClick={() => addRow()}
            />
            <Button 
              text='Reset'  
              appearance='danger' 
              onClick={() => deleteAllRows()}
            />
        </ButtonSet>
        
        <SelectElement
          dataProvider={localStorageData ? localStorageData : DEFAULT_CONFIGURATION}
          currencyExchangeCourses={configuration.currencyExchangeCourses}
          userCurrency={fieldValue && fieldValue.currency} 
        />
      </CustomFieldEdit>
  
    );
  };