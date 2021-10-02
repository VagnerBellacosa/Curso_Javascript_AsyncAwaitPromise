var chart_1 = anychart.pie([1, 2, 3]);
// set rendering mode to asynchronous
chart_1.draw(true);

var chart_2 = anychart.column([1, 1, 1]);
// set rendering mode to synchronous
chart_2.draw(false);  

var chart_3 = anychart.bar([3, 2, 1]);
// providing no parameter means default: synchronous
chart_3.draw();  