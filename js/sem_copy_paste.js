(function($) {
  Drupal.behaviors.sem_copy_paste = {

    /**
     * Helper method to append attribution from settings
     * @param attribution_string
     */
    append: function(attribution_string, context) {
      $('body, div, p, section', context).addtocopy({
        htmlcopytxt: attribution_string,
        minlen:1,
        addcopyfirst: false
      });
    },

    /**
     * Helper method to track with UA
     * @param context
     * @param settings
     */
    track: function () {

      function getSelected() {
        if (window.getSelection) {
          return window.getSelection();
        }
        else {
          if (document.getSelection) {
            return document.getSelection();
          }
          else {
            var selection = document.selection && document.selection.createRange();
            if (selection.text) {
              return selection.text;
            }
            return false;
          }
        }
      }

      $('body').on('copy cut paste', function (ccp) {
        // Track cut, copy or paste with jQuery.
        var selection = getSelected();
        var maxLength = 100; // Up to 100 Characters from your text will be tracked.
        if (selection && (selection = new String(selection).replace(/^\s+|\s+$/g, ''))) {
          // How many characters was copied/cutted/pasted.
          var textLength = selection.length;
          // If the text is longer than maxLength, add ... to the end of the text
          if (selection.length > maxLength) {
            selection = selection.substr(0, maxLength) + "..."
          }
          // Track copied/cut/pasted data in Google Analytics as Events
          ga('send', {
            'hitType': 'event',
            'eventCategory': 'Clipboard',
            'eventAction': ccp.type,
            'eventLabel': selection,
            'eventValue': textLength
          });
        }
      });
    },

    /**
     * Tie into Drupal.behaviors to init
     * @param context
     * @param settings
     */
    attach: function(context, settings) {
      console.log(settings);
      if(typeof settings.sem_copy_paste !== 'undefined') {
        if(settings.sem_copy_paste.attribution.append === 1) {
          var s = settings.sem_copy_paste.attribution.str;
          Drupal.behaviors.sem_copy_paste.append(s, context);
        }

        if(settings.sem_copy_paste.track === 1 && typeof ga !== 'undefined') {
          Drupal.behaviors.sem_copy_paste.track();
        }
      }
    }
  }
})(jQuery);