import api,{ route } from '@forge/api';
import { maxRowsAmounts } from './../data/data';


interface  UserValuesProps {
    amount: number,
    currency: string,
}

interface OutcomeUserCurrency {
    currency: string,
    converted: number
}

interface FormValue {
    amount: number,
    currency: {
        label: string,
        value: string
    }
}

interface Outcome {
    [key: string]: UserValuesProps | OutcomeUserCurrency
}

export const currencyConversion = (fieldValue, provision, currencyExchangeCourses) => {

    const fieldValueArray = formValueObjectTransform(fieldValue);
    fieldValueArray.pop();

    const fieldValueAmountSumm = fieldValueArray.reduce(
        (accumulator: number, currentValue: any) => {
            const {amount, currency} = currentValue;
            const filteredCurrencyExchangeCourse = findChoosenCurrency(currency, currencyExchangeCourses);
            return accumulator += amount / filteredCurrencyExchangeCourse.exchangeValue;
        }, 0);

    const USDSumm = USDtoUserChoiceConversion(fieldValueAmountSumm, fieldValue.userCurrency.currency, currencyExchangeCourses);
    fieldValue.userCurrency.convertedProvision = (USDSumm - ((provision) / 100 * USDSumm)).toFixed(2)
    fieldValue.userCurrency.converted = USDSumm.toFixed(2);
};
 
    
export const formValueObjectTransform = (formValues) => {
    return Object.values(formValues);
};

const findChoosenCurrency = (selectItemLabel, currencyExchangeCourses) => (
    currencyExchangeCourses.find( (element) => element.label === selectItemLabel)
);

const USDtoUserChoiceConversion = (amount, userSummaryDisplayCurrency, currencyExchangeCourses) => {
    const exchangeRate = findChoosenCurrency(userSummaryDisplayCurrency, currencyExchangeCourses);
    return amount * exchangeRate.exchangeValue;
}

export const setOutcomeProps = (index: number, targetObject: FormValue) => {
    const outcome: any = {};
    for(let i=1; i <= index; i++) {
        if(targetObject[`prop${i}`] && targetObject[`prop${i}`].amount && targetObject[`prop${i}`].currency) {
            outcome[`prop${i}`] = {
                amount: +targetObject[`prop${i}`].amount,
                currency: targetObject[`prop${i}`].currency.value || targetObject[`prop${i}`].currency,
            };
        }
    }
    outcome[`userCurrency`] = {
        currency: targetObject[`currency`],
        converted: 0,
        convertedProvision: 0
    }
    return outcome;
}

export const setDataProviderRows = (rowAmount) => {
    const rowsData = [];
    for (let i = 1; i <= rowAmount; i++) {
      rowsData.push(setRowData(i));
    }
    return rowsData;
  };
  
  const setRowData = (index) => (
    {
      textFieldName: `prop${index}.amount`,
      textFieldLabel: `Amount`,
      textFieldplaceholder: `Please provide cash amount`,
      selectItemName: `prop${index}.currency`,
      selectItemLabel: "Choose currency",
      selectItemDefaultValueLabel: "PLN",
      selectItemDefaultValue: "PLN",
    }
  );

export async function getCustomFieldContext(fieldId) {
    const result = await requestJira(fieldId);
    return result.values;
}

async function requestJira(fieldId) {
    let transformedResponseJson;
    const response = await api.asUser().requestJira(route`/rest/api/2/app/field/${fieldId}/context/configuration`);
    try {
        transformedResponseJson = await response.json();
    } catch (e) {
        console.log("Error transformedResponseJson: ", e);
    }
    console.log('transformedResponseJson result: ', transformedResponseJson);
    return transformedResponseJson || {}
}

export const validateMaxRowsAmount = (formData) => {
    if(formData.maxRowsAmount < maxRowsAmounts.min || formData.maxRowsAmount > maxRowsAmounts.max) {
        formData.maxRowsAmount = maxRowsAmounts.max;
    }
}


