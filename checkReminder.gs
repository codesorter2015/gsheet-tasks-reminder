function daysBetween( date1, date2 ) {
  var one_day=1000*60*60*24;
  
  date1.setHours(0,0,0,0);
  date2.setHours(0,0,0,0);
  
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();
  var difference_ms = date2_ms - date1_ms;
  return Math.round(difference_ms/one_day); 
}

function checkReminder() {
  // get the spreadsheet object
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // set the first sheet as active
  SpreadsheetApp.setActiveSheet(spreadsheet.getSheets()[0]);
  // fetch this sheet
  var sheet = spreadsheet.getActiveSheet();
   
  // figure out what the last row is
  var lastRow = sheet.getLastRow();
 
  // the rows are indexed starting at 1, and the first row
  // is the headers, so start with row 2
  var startRow = 4;
 
  // grab column 5 (the 'days left' column) 
  var range = sheet.getRange(startRow,1,lastRow-startRow+1,3 );
  var numRows = range.getNumRows();
  var grid = range.getValues();
   
   
  var warning_count = 0;
  var msg = "";
   
  // Loop over the days left values
  for (var i = 0; i <= numRows - 1; i++) {
    var status = grid[i][0];
    var days_between = grid[i][1] ? daysBetween(new Date(), grid[i][1]) : -1;
    if(!status && (days_between == 7 || days_between == 2)) {
      
      var reminder_name = grid[i][2];
       
      msg = msg + "Reminder: "+reminder_name+" is due in "+days_between+" days.\n";
      warning_count++;
    }
  }
   
  if(warning_count) {
    MailApp.sendEmail("abc@abc.com,abc@abc.com", 
        "Reminder from To-do spreadsheet", msg);
  }
   
};
