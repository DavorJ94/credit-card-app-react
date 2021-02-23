/* Format 2021-07 */

const dateParser = (inputDate) => {
  const month = inputDate.substring(inputDate.length - 2);
  const year = inputDate.substring(2, 4);

  if (month && year) return `${month}/${year}`;
  else return "";
};

const reverseDateParser = (inputDate) => {
  const month = inputDate.substring(0, 2);
  const year = inputDate.substring(inputDate.length - 2);

  if (month && year) return `${"20" + year}-${month}`;
  else return "";
};

export { dateParser, reverseDateParser };

/* Export format 07/21 */
