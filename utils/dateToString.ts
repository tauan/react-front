export default function ConvertDateToString(date) {
  const data = new Date(date);
  const dia =
    data.getDate() + 1 < 10 ? `0${data.getDate() + 1}` : data.getDate() + 1;
  const mes =
    data.getMonth() + 1 < 10 ? `0${data.getMonth() + 1}` : data.getMonth() + 1;
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
