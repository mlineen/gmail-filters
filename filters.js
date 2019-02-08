const LINKS = [
  {
    text: "Unread",
    search: "in:inbox label:unread",
    dates: () => {
      return [];
    }
  },
  {
    text: "Today",
    search: "in:inbox after:DATE",
    dates: () => {
      return [moment()];
    }
  },
  {
    text: "Yesterday",
    search: "in:inbox after:DATE before:DATE",
    dates: () => {
      return [moment().subtract(1, "days"), moment()];
    }
  },
  {
    text: "This Week",
    search: "in:inbox after:DATE",
    dates: () => {
      return [moment().startOf("isoWeek")];
    }
  },
  {
    text: "Last Week",
    search: "in:inbox after:DATE before:DATE",
    dates: () => {
      return [
        moment()
          .startOf("isoWeek")
          .subtract(1, "weeks"),
        moment().startOf("isoWeek")
      ];
    }
  },
  {
    text: "This Month",
    search: "in:inbox after:DATE",
    dates: () => {
      return [moment().startOf("month")];
    }
  },
  {
    text: "Last Month",
    search: "in:inbox after:DATE before:DATE",
    dates: () => {
      return [
        moment()
          .startOf("month")
          .subtract(1, "months"),
        moment().startOf("month")
      ];
    }
  }
];

function handleFilterClick(event) {
  const clicked = LINKS.find(function(link) {
    return link.text === event.target.text;
  });

  var a = document.createElement("a");
  a.href = searchHref(clicked.search, clicked.dates());
  a.click();
}

function searchHref(search, replacements) {
  for (var i in replacements) {
    search = search.replace("DATE", replacements[i].format("YYYY-MM-DD"));
  }
  return `#search/${search}`;
}

window.onload = function() {
  // create wrapping div
  var div = document.createElement("div");
  div.id = "gmail-filters-extension";

  // add the links
  for (var link of LINKS) {
    div.insertAdjacentHTML("beforeend", `<a>${link.text}</a>`);
  }

  // insert interface into page
  document
    .getElementsByTagName("header")[0]
    .insertAdjacentElement("afterend", div);

  // register click handler
  div.addEventListener("click", handleFilterClick);
};
