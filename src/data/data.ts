interface DataProvide {
  tableHeaders: string[];
  rowsAmount: number;
  rowsData: any[];
  currencySummary: {
    label: string;
    name: string;
    currencySummaryDefaultValueLabel: string;
    currencySummaryDefaultValue: string;
  };
}

export const STORAGE_KEY_PREFIX = "CURRENCY_EXCHANGE_OBJECT_TYPE_FIELD";

export const DEFAULT_CONFIGURATION = {
  tableHeaders: ["Amount", "Currency"],
  rowsAmount: 1,
  rowsData: [
    {textFieldName: `prop1.amount`,
    textFieldLabel: `Amount`,
    textFieldplaceholder: `Please provide cash amount`,
    selectItemName: `prop1.currency`,
    selectItemLabel: "Choose currency",
    selectItemDefaultValueLabel: "PLN",
    selectItemDefaultValue: "PLN",
  },
  ],
  currencySummary: {
    label: "Choose summary currency",
    name: "currency",
    currencySummaryDefaultValueLabel: "PLN",
    currencySummaryDefaultValue: "PLN",
  },
};

export const DEFAULT_CONTEXT_CONFIG = {
    provision: 0,
    maxCurrencyCalculationRows: 5,
    currencyExchangeCourses: [
      {
        label: "USD",
        exchangeValue: 1,
      },
      {
        label: "EUR",
        exchangeValue: 0.84,
      },
      {
        label: "GBP",
        exchangeValue: 0.72,
      },
      {
        label: "PLN",
        exchangeValue: 3.86,
      },
      {
        label: "CHF",
        exchangeValue: 0.91,
      },
    ],
}

export const maxRowsAmounts = {
  min: 1,
  max: 5
};
