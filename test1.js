const options = [
    { position: 1, label: "Option 1", disabled: false },
    { position: 2, label: "Option 2", disabled: true },
    { position: 3, label: "Option 3", disabled: false },
    { position: 4, label: "Option 4", disabled: true },
    { position: 5, label: "Option 5", disabled: false },
  ];
  
  function moveElementAndUpdatePositions(fromIndex, toIndex) {
    let movedOptions = [...options];
    
    const [element] = movedOptions.splice(fromIndex, 1);
    movedOptions.splice(toIndex, 0, element);
    
    movedOptions = movedOptions.map((opt, index) => ({
      ...opt,
      position: index + 1,
    }));
  
    return movedOptions;
  }
  
  const updatedOptions = moveElementAndUpdatePositions(0, 6);
//   console.log(updatedOptions);
console.log(Object.values({prop1: {
    amount: 0,
    currency: "PLN"
  },
  currencySummary: {
    amount: 1,
    currency: "PdLN"
  }}).slice(0, -1));

  