const wordCategoryMapping = {
  'Lydia Reinthaler': 'Rent',
  'STUD.WERK MUENCHEN': 'Rent',
  Miete: 'Rent',
  ROSSMANN: 'Essentials',
  'SALON PRINZ': 'Essentials',
  'DM FIL': 'Food',
  REWE: 'Food',
  EDEKA: 'Food',
  'ISTANBUL MARKET': 'Food',
  LIDL: 'Food',
  'NETTO MARKEN-DISCOU.': 'Food',
  NETTO: 'Food',
  'ALDI SE': 'Food',
  'ERNST MUC HBF': 'Food',
  'BAECKEREI OGGI': 'Food',
  'DEAN DAVID': 'Resturaunts',
  'HELEIHEL HASSANEIN': 'Resturaunts',
  'Honghong Noodles': 'Resturaunts',
  MCDONALDS: 'Resturaunts',
  Theresienwiese: 'Resturaunts',
  SAUSALITOS: 'Resturaunts',
  Vodafone: 'Essentials',
  EBAY: 'Essentials',
  AMAZON: 'Essentials',

  //Freetime & Fun
  AMZNPrime: 'Freetime',
  kino: 'Freetime',
  'Mastercard 5299': 'Credit Card',
  //Transport
  MVG: 'Transport',
  'Lime Electric': 'Transport',
  'DB Vertrieb GmbH': 'Transport',
  FlixMobility: 'Transport',
  'Osterr.Postbus': 'Transport',
  //General One
  VERKEHR: 'Transport',
  HAFTUNF: 'Insurance',
  Krankenkasse: 'Insurance',
  'Techniker Krankenkasse': 'Insurance',
  LMU: 'LMU',
  KVR: 'State',
  Bundeskasse: 'State',
  'EIGENE KREDITKARTENABRECHN.': 'Sparkasse',
  //Software
  Adobe: 'Software',
  'Apple Services': 'Software',
  'Canva Pty': 'Software',
  'Google Ireland': 'Software',
  SATURN: 'SATURN',
  'TRADE REPUBLIC': 'stocks',
  //Self-Investments
  'FIT STAR': 'Self-Investment',
  MICHAELIBAD: 'Self-Investment',
  'TOWASAN GmbH': 'Self-Investment',
  'Tatiana Espitia': 'Self-Investment',
  'Pedro Sousa': 'Self-Investment',
  expande: 'Self-Investment',
  AUDIBLE: 'Self-Investment',
  'Udemy Ireland': 'Self-Investment',
  //Charity
  'BRK-KV Muenchen': 'Charity',
  //Travel
  'Landesbank Hessen-Thuringen': 'Travel',
  Lufthansa: 'Travel',
  PEGASUS: 'Travel',
  Pegasus: 'Travel',
  'YEVHENIIA SKOK': 'Travel',
  'ALI AL-DARRAJI': 'Travel',
  'ali al daraji': 'Travel',
  'Miriam Matisova': 'Travel',
  'MAKA RAZMADZE': 'Friends',
  'YESSICA MOESSNER': 'Friends',
  'Somaya Abdallah-Zeidan': 'Friends',
  'JUNFENG CHEN': 'Friends',
  'omar diab': 'Friends',
  KfW: 'KFW',
  mediawave: 'mediawave',
  FIVERR: 'FIVERR',
  InStaff: 'InStaff',
  PayPal: 'PayPal',
};

const assignCategories = (transactions) => {
  console.log(transactions);
  return transactions.map((transaction) => {
    const bookingText = transaction['Booking Text'];
    let category;

    if (bookingText.includes('BARGELDEINZAHLUNG')) {
      category = 'Bar Geld Einzahlung';
    } else if (bookingText.includes('UMBUCHUNG')) {
      category = 'Umbuchung';
    } else if (bookingText.includes('UEBERTRAG (UEBERWEISUNG)')) {
      category = 'Umbuchung';
    } else if (bookingText.includes('BARGELDAUSZAHLUNG')) {
      category = 'Bar Geld Auszahlung';
    } else if (bookingText.includes('EIGENE KREDITKARTENABRECHN.')) {
      category = 'Credit Card';
    } else if (bookingText.includes('ABSCHLUSS')) {
      category = 'Sparkasse';
    } else {
      const purpose = transaction['Purpose of Transaction'];
      const purposeMatchingCategory = Object.entries(wordCategoryMapping).find(
        ([word, category]) =>
          typeof purpose === 'string' && purpose.includes(word)
      );

      if (purposeMatchingCategory) {
        category = purposeMatchingCategory[1];
      } else {
        const payerReceiver = transaction['Payer/Receiver'];
        const payerReceiverMatchingCategory = Object.entries(
          wordCategoryMapping
        ).find(
          ([word, category]) =>
            typeof payerReceiver === 'string' && payerReceiver.includes(word)
        );

        if (payerReceiverMatchingCategory) {
          category = payerReceiverMatchingCategory[1];
        } else {
          category = 'Unknown';
        }
      }
    }

    if (category === 'Unknown') {
      console.warn('Transaction assigned to Unknown category:', transaction);
    }

    return {
      ...transaction,
      category: category,
    };
  });
};

module.exports = assignCategories;
