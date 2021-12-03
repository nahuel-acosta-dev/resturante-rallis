$(function() {
    $("[data-bs-toggle='tooltip']").tooltip();
    $("[data-bs-toggle='popover']").popover();
    $(".carousel").carousel({
      interval: 150
    });
  });