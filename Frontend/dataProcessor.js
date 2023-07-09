function prepareDataForD3(data) {
  // Initialize an empty array to store the formatted data
  var formattedData = [];

  // Loop through each item in the data response
  for (var i = 0; i < data.length; i++) {
    var item = data[i];

    // Extract the necessary values from the item
    var date = new Date((item['Booking Date'] - 25569) * 86400 * 1000); // Convert Excel date to JavaScript date
    var day = date.getDate(); // Extract the day from the date object
    var amount = item['Amount'];

    // Create a new formatted object with day and amount
    var formattedItem = {
      day: day,
      amount: amount,
    };

    // Push the formatted item to the array
    formattedData.push(formattedItem);
  }

  return formattedData;
}
