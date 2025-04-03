export const formatCurrency = (value: number) =>{
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "EUR",
      }).format(value);
} 