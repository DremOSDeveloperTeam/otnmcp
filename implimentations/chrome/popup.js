/*$('#print').click(function do_something(){
    chrome.tabs.executeScript({
    file: 'magic.js'
  }); 
});*/

document.addEventListener('DOMContentLoaded', function() {
    var print = document.getElementById('print');
    // onClick's logic below:
    print.addEventListener('click', function() {
        magics();
    });
});

function magics() {
    console.log("Pull in all variables.");
    var remIP = document.getElementById('remIP').value;
    var remUser = document.getElementById('remUser').value;
    var remPass = document.getElementById('remPass').value;
    var otnIP = document.getElementById('otnIP').value;
    var pdfFile = document.getElementById('pdfFile').value;
    
    console.log("Generate a full download URL.");
    var downloadURL = "ftp://" + remUser + ":" + remPass + "@" + remIP + "/" + pdfFile;
    
    console.log("Download file.");
    chrome.downloads.download({
        url: downloadURL,
        saveAs: false
    },
        function(downloadId) {
            chrome.storage.local.set({'downloadId': downloadId}, function() {
                console.log("Store Download ID.");
                chrome.storage.local.set({'downloadId': downloadId});
            })
        }
    );
    
    // At this point, we will wait for the download to complete. When it does, we continue below.
}

chrome.downloads.onChanged.addListener(function (detail){
   //if(detail.state.current == "complete"){
       console.log("Download complete. Load Download ID into variable.");
       chrome.storage.local.get(['downloadId'], function(result) {
           var downloadId = result.downloadId;
           
           console.log("Upload is under construction. Skipping.");
           window.location.href = 'selectprint.html';
           /*if (otnIP && pdfFile) {
               window.open(pdfFile, '_blank', 
               'toolbar=yes,location=yes,status=yes,' + 
               'scrollbars=auto,copyhistory=no,menubar=no,width=' 
               + ((screen.AvailWidth/2)-12) + ',height=' + 
               (screen.AvailHeight-124) +',left=0,top=0,resizable=yes');
               window.open("ftp://" + otnIP + ':5100', '_blank', 
               'toolbar=yes,location=yes,status=yes,' + 
               'scrollbars=auto,copyhistory=no,menubar=no,width=' 
               + ((screen.AvailWidth/2)-12) + ',height=' 
               + (screen.AvailHeight-124) +',left=' + ((screen.AvailWidth/2)) 
               + '),top=0,resizable=yes');
           }*/
    
           console.log("Cleanup.");
           //chrome.downloads.removeFile(downloadId);
    
           console.log("Done. Display finished.html.");
           //window.location.href = 'finished.html';
       });
   //}
});