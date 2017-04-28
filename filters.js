const ID = "gmail-filters-extension";

function addContainer() {
  var container = document.createElement("ul");
  container.setAttribute("id", ID);
  //document.body.insertAdjacentElement("afterbegin", container);
  document.getElementsByClassName("nM")[0].insertAdjacentElement("afterbegin", container);
}

function addFilter(label, string, moments) {
  var filter = replaceMoments(string, moments);
  var link = createLink(label, filterToHref(filter));
  document.getElementById(ID).appendChild(link);
}

function createLink(value, href) {
  var li = document.createElement("li");
  var link = document.createElement("a");
  link.setAttribute("href", href);
  link.appendChild(document.createTextNode(value));
  li.appendChild(link);
  return li;
}

function filterToHref(filter) {
  var base = window.location.href.split("#")[0];
  return base + "#search/" + wwwFormUrlEncoded(filter);
}

function replaceMoments(string, moments) {
  for (var i in moments) {
    string = string.replace("DATE", moments[i].format("YYYY-MM-DD"));
  }
  return string;
}

function wwwFormUrlEncoded(href) {
  return encodeURIComponent(href).replace("%20", "+");
}

/*
  Create a container
  Add filters
*/
setTimeout(function() {
  addContainer();

  addFilter(
    "Today",
    "in:inbox after:DATE",
    [moment()]
  );

  addFilter(
    "Yesterday",
    "in:inbox after:DATE before:DATE",
    [moment().subtract(1, "days"), moment()]
  );

  addFilter(
    "This Week",
    "in:inbox after:DATE",
    [moment().startOf("isoWeek")]
  );

  addFilter(
    "Last Week",
    "in:inbox after:DATE before:DATE",
    [moment().startOf("isoWeek").subtract(1, "weeks"), moment().startOf("isoWeek")]
  );

  addFilter(
    "This Month",
    "in:inbox after:DATE",
    [moment().startOf('month')]
  );
}, 5000);
