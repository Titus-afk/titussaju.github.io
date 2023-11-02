$("[data-active = 'false']").find("input").prop("checked", false);
$("[data-active = 'true']").find("input").prop("checked", true);

function checkbox(selector, state) {
  selector.find("input").attr("checked", state);
  selector.attr("data-active", state);
}

function radio(selector) {
  var radioGroup = selector.attr("group");
  console.log($(`[group = ${radioGroup}]`).find("input"));
  $(`[group = ${radioGroup}]`).attr("data-active", "false");
  $(`[group = ${radioGroup}]`).find("input").attr("checked", "false");
}

function switchCustoms(selector) {
  var switchState = $(selector).attr("data-active");
  switchState == "false" ? ($(selector).attr("data-active", "true"), $(selector).parent().attr("data-active", "true")) : ($(selector).attr("data-active", "false"), $(selector).parent().attr("data-active", "false"));
}

$(document).on("click", ".filter__dropdown .input-checkbox,.filter__dropdown .input-radio", function () {
  var state = $(this).attr("data-active");
  var filterLabelValue = $(this).parents(":eq(1)").find(".filter__value");
  var filterOptionID = $(this).find("label").text().toString().replace(/\s+/g, "");
  var filterOptionValue = $(this).find("label").text();

  console.log(filterOptionID);

  if (state && filterLabelValue.find(`.${filterOptionID}`).length == 0) {
    filterLabelValue.append(`<span class="${filterOptionID}">${filterOptionValue}</span>`);
  } else {
    filterLabelValue.find(`.${filterOptionID}`).remove();
  }
});

$(document).on("click", ".filter__dropdown .input-radio", function () {
  var state = $(this).attr("data-active");
  var filterLabelValue = $(this).parents(":eq(1)").find(".filter__value");
  var filterOptionID = $(this).find("label").text().toString().replace(/\s+/g, "");
  var filterOptionValue = $(this).find("label").text();

  console.log(filterOptionID);

  if (state && filterLabelValue.find(`.${filterOptionID}`).length == 0) {
    filterLabelValue.append(`<span class="${filterOptionID}">${filterOptionValue}</span>`);
  } else {
    filterLabelValue.find(`span`).remove();
    filterLabelValue.append(`<span class="${filterOptionID}">${filterOptionValue}</span>`);
    $(this).parents(":eq(0)").hide();
  }
});

$(document).on("click", ".input-checkbox", function () {
  var $this = $(this);

  if ($this.attr("data-active") == "false") {
    checkbox($this, true);
  } else {
    checkbox($this, false);
  }
});

$(document).on("click", ".input-radio", function () {
  var $this = $(this);

  if ($this.attr("data-active") == "false") {
    radio($this);
    $(this).attr("data-active", "true");
    $(this).find("input").attr("checked", "true");
  }
});

$(document).on("click", ".switch", function () {
  switchCustoms($(this));
});

$(document).on("click", ".filter", function (e) {
  e.stopPropagation();
  $(".filter__dropdown").hide();
  $(this).find(".filter__dropdown").show();
});

$(document).on("click", ".filter--reset", function () {
  $(".filter__value").text("");
  checkbox($(".filter__dropdown .input-checkbox"), false);
});

$(document).on("click", "body", function () {
  $(".search").removeClass("show-result");
  $(".side-navigation").removeClass("open");
  $(".filter__dropdown").css("display", "none");
  $(".feature__dropdown").hide();
  $(".action-bar__actions").hide();
  $(".login-user__dropdown").hide();
});

$(document).on("keyup", ".search  input", function (e) {
  e.stopPropagation();
  var value = $(this).val();
  console.log("sample");
  if (value == "") {
    $(".search").removeClass("show-result");
  } else {
    $(".search").addClass("show-result");
  }
});

$(document).on("click", ".date", function () {
  console.log($(this).find("input"));
});

$(document).on("click", ".menu", function (e) {
  e.stopPropagation();
  $(".side-navigation").addClass("open");
});
$(document).on("click", ".close-menu", function (e) {
  e.stopPropagation();
  $(".side-navigation").removeClass("open");
});

$("#checkin").DataTable({
  dom: '<"top">rt<"bottom"<"left-actions"l>p><"clear">',
  scrollY: false,
  scrollX: true,
});
$("#users").DataTable({
  scrollY: false,
  scrollX: true,
  dom: '<"top">rt<"bottom"<"left-actions"li>p><"clear">',
  columnDefs: [
    {
      orderable: false,
      className: "select-checkbox",
      targets: 0,
    },
  ],
  select: {
    style: "os",
    selector: "td:first-child",
  },
  order: [[1, "asc"]],
  columns: [null, null, null, null, null, null, null, {width: "10%"}],
});

$("#users-report").DataTable({
  scrollY: false,
  scrollX: true,
  dom: '<"top">rt<"bottom"<"left-actions"li>p><"clear">',
});

$(document).on("click", ".action-bar__trigger", function (e) {
  e.stopPropagation();
  $(".action-bar__actions").hide();
  $(this).parent().find(".action-bar__actions").show();
});

$(".date").daterangepicker(
  {
    singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format("YYYY"), 10),
  },
  function (start, end, label) {
    $(".date")
      .find(".filter__value")
      .text(`: ${start.format("DD-MM-YYYY")}`);
  }
);
$(".range").daterangepicker(
  {
    opens: "left",
    timePicker: true,
    startDate: moment().startOf("hour"),
    endDate: moment().startOf("hour").add(32, "hour"),
  },
  function (start, end, label) {
    $(".range")
      .find(".filter__value")
      .text(`: ${start.format("DD-MM-YYYY (hh:mm a)")} - ${end.format("DD-MM-YYYY (hh:mm a)")} `);
  }
);

$(document).on("click", ".login-user", function (e) {
  e.stopPropagation();
  $(".login-user__dropdown").toggle();
});

$(document).on("click", ".password", function () {
  var state = $(this).find("[data-password]").attr("data-password");
  console.log(state);
  state == "true" ? ($(this).find("[data-password]").attr("data-password", "false"), $(this).parent().find("input").attr("type", "password")) : ($(this).find("[data-password]").attr("data-password", "true"), $(this).parent().find("input").attr("type", "text"));
});

$('[type="password"]').each(function () {
  console.log($(this));
  $(this).parent().addClass("position-relative");
  $(this).parent().append(`<button type="button" class="btn password">
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)">
        <path d="M1 12C1 12 5 5 12 5C19 5 23 12 23 12C23 12 19 19 12 19C5 19 1 12 1 12Z" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path data-password="false" d="M22.4906 2L23.5864 3.26254L1.09581 22.783L0 21.5205L22.4906 2Z" fill="#4F4F4F" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="24" height="24" fill="white" transform="translate(24 24.1147) rotate(-180)" />
        </clipPath>
      </defs>
    </svg>
  </button>`);
});

// Custom Drag Component


// let pos = {top: 0, left: 0, x: 0, y: 0};

// $(document).on('mousemove','.custom-table__overflow',function(e){
//   pos = {
//     // The current scroll
//     left: $(this).scrollLeft,
//     top: $(this).scrollTop,
//     // Get the current mouse position
//     x: e.clientX,
//     y: e.clientY,
//   };

//   console.log(pos.x)
// });

// $(document).on('mousedown','.custom-table__overflow',function(e){
//     // How far the mouse has been moved
//     const dx = e.clientX - pos.x;
//     const dy = e.clientY - pos.y;

//     // Scroll the element
//     $(this).scrollTop(pos.top - dy);
//     $(this).scrollLeft(pos.top - dx);
// })

document.addEventListener('DOMContentLoaded', function() {
  const ele = document.getElementsByClassName('custom-table__overflow')[0];
  const allelements = document.getElementsByClassName('custom-table__overflow');

  ele.style.cursor = 'grab';

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandler = function(e) {
      ele.style.cursor = 'grabbing';
      ele.style.userSelect = 'none';

      pos = {
          left: ele.scrollLeft,
          top: ele.scrollTop,
          // Get the current mouse position
          x: e.clientX,
          y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function(e) {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      $('.custom-table__overflow').scrollLeft(pos.left - dx)
  };

  const mouseUpHandler = function() {
      ele.style.cursor = 'grab';
      ele.style.removeProperty('user-select');

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
  };

  // Attach the handler
  ele.addEventListener('mousedown', mouseDownHandler);

  for (var i = 0; i < allelements.length; i++) {
    allelements[i].addEventListener('mousedown', mouseDownHandler);
}
  
});

const mouseDownHandler = function (e) {
  pos = {
    // The current scroll
    left: ele.scrollLeft,
    top: ele.scrollTop,
    // Get the current mouse position
    x: e.clientX,
    y: e.clientY,
  };

  console.log(pos);

  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
};

const mouseMoveHandler = function (e) {
  // How far the mouse has been moved
  const dx = e.clientX - pos.x;
  const dy = e.clientY - pos.y;
  console.log("Event Triggered")
  // Scroll the element
  ele.scrollTop = pos.top - dy;
  ele.scrollLeft = pos.left - dx;
};
