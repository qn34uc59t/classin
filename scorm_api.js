var SCORM = {
  API: null,
  initialized: false,
  
  init: function() {
    if (!this.initialized) {
      this.API = window.API || window.parent.API || null;
      if (this.API) {
        this.initialized = true;
        console.log('SCORM API initialized');
      } else {
        console.log('SCORM API not found - running in standalone mode');
      }
    }
    return this.initialized;
  },
  
  setValue: function(element, value) {
    if (this.initialized && this.API) {
      try {
        var result = this.API.LMSSetValue(element, value);
        if (result != "true") {
          var error = this.API.LMSGetLastError();
          console.log('SCORM Error: ' + error);
        } else {
          console.log('SCORM SetValue: ' + element + ' = ' + value);
        }
      } catch (e) {
        console.log('SCORM Exception: ' + e.message);
      }
    }
  },
  
  getValue: function(element) {
    if (this.initialized && this.API) {
      try {
        return this.API.LMSGetValue(element);
      } catch (e) {
        console.log('SCORM Exception: ' + e.message);
        return "";
      }
    }
    return "";
  },
  
  commit: function() {
    if (this.initialized && this.API) {
      try {
        this.API.LMSCommit("");
      } catch (e) {
        console.log('SCORM Commit Exception: ' + e.message);
      }
    }
  },
  
  exit: function() {
    if (this.initialized && this.API) {
      try {
        this.commit();
        this.API.LMSFinish("");
      } catch (e) {
        console.log('SCORM Exit Exception: ' + e.message);
      }
    }
  },
  
  setStatus: function(status) {
    this.setValue("cmi.core.lesson_status", status);
    this.commit();
  }
};

// Initialize SCORM on page load
window.addEventListener('load', function() {
  SCORM.init();
  
  // Mark as launched if in SCORM environment
  if (SCORM.initialized) {
    SCORM.setStatus("incomplete");
    console.log('Lesson launched in SCORM environment');
  }
});

// Clean up on page unload
window.addEventListener('beforeunload', function() {
  SCORM.commit();
});

