const Handlebars = require('./assets/handlebars.min-v4.7.3.js');
const chartData = data.user.chart;
const createHTML = function (data) {
  const rawTemplate = document.getElementId(chartTemplate).innerHtml;
//document.querySelector(#);
  const compiledTemplate = Handlebars.compile(rawTemplate)
  const context = {
    chart: data
  }
  const compiledHTML = compiledTemplate(context)
 document.getElementbyId(chartList).append(compiledHTML)
}
createHTML(chartData)
