import ForgeUI, {
    Select,
    Option,
  } from "@forge/ui";
  
export const SelectElement = ({dataProvider, currencyExchangeCourses, userCurrency}) => (
  <Select
    isRequired={true}
    label={dataProvider.currencySummary.label}
    name={dataProvider.currencySummary.name}
  >
    {currencyExchangeCourses.map((e) => (
      <Option
        defaultSelected={
          !!(
            userCurrency === e.label
          )
        }
        label={e.label}
        value={e.label}
      />
    ))}
  </Select>
);
