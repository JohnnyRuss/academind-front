const configs = {
  shortNumeric: {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  },
  medium: {},
  long: {},
};

function formatDate(dateToFormat) {
  const date = new Date(dateToFormat);
  const formattedDate = new Intl.DateTimeFormat('en-us', configs.shortNumeric)?.format(date);
  return formattedDate.split('/').join('-');
}

export default formatDate;
