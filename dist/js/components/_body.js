/* Body Component */
$(document).ready(function () {
  var BodyComponent = function BodyComponent($) {
    var $component = $("body");

    function attachEvents() {}

    function init() {
      if (!$component.length) return;
      attachEvents();
    }

    return {
      init: init
    };
  }(jQuery);

  BodyComponent.init();
});