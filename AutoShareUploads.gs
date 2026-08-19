/**
 * Automatically makes newly uploaded announcement images
 * viewable by "anyone with the link" so the website widget can display them.
 *
 * Setup:
 * 1. Open the Google Sheet linked to your Form.
 * 2. Extensions -> Apps Script, paste this file's contents in.
 * 3. Click the clock icon (Triggers) on the left sidebar.
 * 4. Add Trigger: function = onFormSubmit, event source = From spreadsheet,
 *    event type = On form submit. Save and authorize when prompted.
 */

function onFormSubmit(e) {
  var row = e.values; // array of submitted values, in column order
  for (var i = 0; i < row.length; i++) {
    var cell = row[i];
    if (typeof cell === 'string' && cell.indexOf('drive.google.com') !== -1) {
      var fileId = extractFileId(cell);
      if (fileId) {
        shareFile(fileId);
      }
    }
  }
}

function extractFileId(url) {
  var match = url.match(/[-\w]{25,}/);
  return match ? match[0] : null;
}

function shareFile(fileId) {
  try {
    var file = DriveApp.getFileById(fileId);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (err) {
    Logger.log('Could not share file ' + fileId + ': ' + err);
  }
}
