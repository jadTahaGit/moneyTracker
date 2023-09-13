const wordCategoryMapping = {
  "Lydia Reinthaler": "Rent",
  "STUD.WERK MUENCHEN": "Rent",
  "Studierendenwerk Muen": "Rent",
  Miete: "Rent",
  "SALON PRINZ": "Haircut",
  Haircut: "Haircut",
  //Supermarket
  ROSSMANN: "Supermarket",
  "DM FIL": "Supermarket",
  REWE: "Supermarket",
  EDEKA: "Supermarket",
  "ISTANBUL MARKET": "Supermarket",
  LIDL: "Supermarket",
  "NETTO MARKEN-DISCOU.": "Supermarket",
  NETTO: "Supermarket",
  "ALDI SE": "Supermarket",
  "ERNST MUC HBF": "Supermarket",
  "BAECKEREI OGGI": "Supermarket",
  //Resturants
  "DEAN DAVID": "Resturaunts",
  "HELEIHEL HASSANEIN": "Resturaunts",
  "Honghong Noodles": "Resturaunts",
  MCDONALDS: "Resturaunts",
  Theresienwiese: "Resturaunts",
  SAUSALITOS: "Resturaunts",
  HAMBURGEREI: "Resturaunts",
  //Shoping
  Vodafone: "Phone",
  EBAY: "Shoping",
  AMAZON: "Shoping",
  //Freetime & Fun
  AMZNPrime: "Freetime",
  kino: "Freetime",
  "Mastercard 5299": "Credit Card",
  "5299 5270 0511 6505": "Credit Card",
  //Transport
  MVG: "Transport",
  "Tier Mobility": "Transport",
  Bolt: "Transport",
  "MUE VERKEHRSGESELLS ": "Transport",
  "Lime Electric": "Transport",
  "DB Vertrieb GmbH": "Transport",
  FlixMobility: "Transport",
  "Osterr.Postbus": "Transport",
  //General One
  VERKEHR: "Transport",
  HAFTUNF: "Insurance",
  Krankenkasse: "Insurance",
  "Techniker Krankenkasse": "Insurance",
  KVR: "State",
  Bundeskasse: "State",
  "EIGENE KREDITKARTENABRECHN.": "Sparkasse",
  //Software&BussinessInvestment
  FIVERR: "Software&BussinessInvestment",
  "MO-Editor": "Software&BussinessInvestment",
  Adobe: "Software&BussinessInvestment",
  "ADOBE SYSTEMS SOFTWARE": "Software&BussinessInvestment",
  "Hostinger International": "Software&BussinessInvestment",
  "Apple Services": "Software&BussinessInvestment",
  "Canva Pty": "Software&BussinessInvestment",
  "Lebara Germany": "Software&BussinessInvestment",
  "Google Ireland": "Software&BussinessInvestment",
  "Microsoft Payments": "Software&BussinessInvestment",
  SATURN: "Software&BussinessInvestment",
  //Stocks
  "TRADE REPUBLIC": "stocks",
  //Health&Sport
  "FIT STAR": "Health&Sport",
  MICHAELIBAD: "Health&Sport",
  APOTHEKE: "Health&Sport",
  "TOWASAN GmbH": "Health&Sport",
  //Coachings
  "Tatiana Espitia": "Coahing1TO1",
  "Pedro Sousa": "Coahing1TO1",
  expande: "Coahing1TO1",
  AUDIBLE: "Education",
  LMU: "Education",
  "Udemy Ireland": "Education",
  "Hamza Ahmed": "Education",
  Digistore24: "Education",
  CopeCart: "Education",
  //Charity
  "BRK-KV Muenchen": "Charity",
  //Travel
  "Landesbank Hessen-Thuringen": "Travel",
  Lufthansa: "Travel",
  PEGASUS: "Travel",
  Pegasus: "Travel",
  "YEVHENIIA SKOK": "Travel",
  "ALI AL-DARRAJI": "Travel",
  "ali al daraji": "Travel",
  "Miriam Matisova": "Travel",
  "MAKA RAZMADZE": "Friends",
  "YESSICA MOESSNER": "Friends",
  "Somaya Abdallah-Zeidan": "Friends",
  "JUNFENG CHEN": "Friends",
  "omar diab": "Friends",
  KfW: "KFW",
  mediawave: "mediawave",
  "NewGrow GmbH": "Zendigma",
  InStaff: "InStaff",
  PayPal: "PayPal",
  //Saving
  karimooo: "Saving",
  "Sparkonto,3mon.Kuendig.": "Saving",
};

const assignCategories = (transactions) => {
  return transactions.map((transaction) => {
    const bookingText = transaction["Booking Text"];
    const purpose = transaction["Purpose of Transaction"];
    const payerReceiver = transaction["Payer/Receiver"];
    const amount = transaction["Amount"];
    let category;

    if (bookingText.includes("BARGELDEINZAHLUNG")) {
      category = "Bar Geld Einzahlung";
    } else if (bookingText.includes("UMBUCHUNG")) {
      category = "Umbuchung";
    } else if (bookingText.includes("UEBERTRAG (UEBERWEISUNG)")) {
      category = "Umbuchung";
    } else if (bookingText.includes("BARGELDAUSZAHLUNG")) {
      // For the case when haircut inserted manually
      if (purpose.includes("Haircut")) {
        category = "Haircut";
      } else {
        category = "Bar Geld Auszahlung";
      }
    } else if (bookingText.includes("EIGENE KREDITKARTENABRECHN.")) {
      category = "Credit Card";
    } else if (bookingText.includes("ABSCHLUSS")) {
      category = "Sparkasse";
    } else if (
      payerReceiver &&
      payerReceiver.includes("PayPal") &&
      amount > 0
    ) {
      category = "Bussines Income";
    } else {
      const purpose = transaction["Purpose of Transaction"];
      const purposeMatchingCategory = Object.entries(wordCategoryMapping).find(
        ([word, category]) =>
          typeof purpose === "string" && purpose.includes(word)
      );

      if (purposeMatchingCategory) {
        category = purposeMatchingCategory[1];
      } else {
        const payerReceiver = transaction["Payer/Receiver"];
        const payerReceiverMatchingCategory = Object.entries(
          wordCategoryMapping
        ).find(
          ([word, category]) =>
            typeof payerReceiver === "string" && payerReceiver.includes(word)
        );

        if (payerReceiverMatchingCategory) {
          category = payerReceiverMatchingCategory[1];
        } else {
          category = "Unknown";
        }
      }
    }

    if (category === "Unknown") {
      console.warn("Transaction assigned to Unknown category:", transaction);
    }

    return {
      ...transaction,
      category: category,
    };
  });
};

module.exports = assignCategories;
