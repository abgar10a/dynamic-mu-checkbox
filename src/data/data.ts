// interface DefaultConfig {
//   tableHeaders: string[],
//   maxRowsAmounts: {
//       min: number,
//       max: number,
//   },
//   currencyPlaceholder: string,
// }

// interface DefaultContextConfig {
//       provision: number,
//       maxCurrencyCalculationRows: number,
//       currencyExchangeCourses: {
//           label: string,
//           exchangeValue: number
//       }[]
// }

interface DefaultContextConfig {
  options: {
    position: string,
    label: string,
    relatedField: string,
    isChecked: boolean,
    required: boolean,
    disabled: boolean
  }[]
}

export const optionsTableHeaders = ["Position", "Text", "Order", "Actions"];
export const configTableHeaders = ["Option", "Related field", "Required", "Actions"];

// export const DEFAULT_CONFIGURATION: DefaultConfig = {
//   tableHeaders: ["Position", "Text", "Order", "Move to position", "Actions"]
// }

// export const DEFAULT_CONTEXT_CONFIG: DefaultContextConfig = {

// }

export const DEFAULT_FIELD_VALUE= {
  prop1: {
    amount: 0,
    currency: "PLN"
  },
  currencySummary: {
    amount: 0,
    currency: "PLN"
  },
};
