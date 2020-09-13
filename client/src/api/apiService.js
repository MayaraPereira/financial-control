import axios from 'axios';

const api = axios.create({ baseURL: 'api' });
const RESOURCE = '/transaction';

//Pega o ano
const CURRENT_YEAR = new Date().getFullYear();
// Declara um array com os anos: ano passado, ano atual e ano que vem
const GLOBAL_YEARS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1];

//Declara um array com os meses do ano de 1 a 12
const GLOBAL_MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

//Declara um array com os nomes dos meses, começando vazio
const MONTH_DESCRIPTIONS = [
  '',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

// Declara um array allPeriods vazio
let allPeriods = [];

//Função para preencher todos os periodos
function _processPeriods() {
  // Inicia vazio
  allPeriods = [];
  // indice 0
  let index = 0;

  // Percorre arrays GLOBAL_YEARS e GLOBAL_MONTHS
  GLOBAL_YEARS.forEach((year) => {
    GLOBAL_MONTHS.forEach((month) => {
      // Cria ID unico formato Ano-Mes passa para String
      //e adiciona 0 no comeco de month se for 1 numero so
      const id = `${year}-${month.toString().padStart(2, '0')}`;
      // Adiciona descrição do ano usando os elementos do Array MONTH_DESCRIPTION
      const monthDescription = `${MONTH_DESCRIPTIONS[month]}/${year}`;

      // Adiciona os elementos no array allPeriods
      allPeriods.push({ id, description: monthDescription, index: index++ });
    });
  });
}

function _prepareTransaction(transaction) {
  const { description, category, _id: id, month, ...otherFields } = transaction;

  return {
    id,
    description,
    category,
    month,
    descriptionLowerCase: description.toLowerCase(),
    categoryLowerCase: category.toLowerCase(),
    monthDescription: MONTH_DESCRIPTIONS[month],
    ...otherFields,
  };
}

async function getTransactionsFrom(period) {
  const { id: yearMonth } = period;
  const { data } = await api.get(`${RESOURCE}?period=${yearMonth}`);

  const frontEndTransaction = data.transactions.map((transaction) => {
    return _prepareTransaction(transaction);
  });

  return frontEndTransaction.sort((a, b) =>
    a.yearMonthDay.localeCompare(b.yearMonthDay)
  );
}

async function getAllPeriods() {
  if (allPeriods.length === 0) {
    _processPeriods();
  }

  return allPeriods;
}

async function deleteTransaction(id) {
  await api.delete(`${RESOURCE}/${id}`);
  return;
}

function getCompleteTransaction(transaction) {
  const { yearMonthDay } = transaction;
  const year = Number(yearMonthDay.substring(0, 4));
  const month = Number(yearMonthDay.substring(5, 7));
  const day = Number(yearMonthDay.substring(8, 10));

  const completeTransaction = {
    ...transaction,
    year,
    month,
    day,
  };

  return completeTransaction;
}

async function updateTransaction(transaction) {
  const { id } = transaction;
  const completeTransaction = getCompleteTransaction(transaction);
  await api.put(`${RESOURCE}/${id}`, completeTransaction);

  const updatedTransaction = _prepareTransaction(completeTransaction);
  return updatedTransaction;
}

async function postTransaction(transaction) {
  const completeTransaction = getCompleteTransaction(transaction);
  const { data } = await api.post(RESOURCE, completeTransaction);

  const newTransaction = _prepareTransaction(data.transaction);
  return newTransaction;
}

export {
  getTransactionsFrom,
  getAllPeriods,
  deleteTransaction,
  postTransaction,
  updateTransaction,
};
