isAsync = false;

stage = anychart.graphics.create("container");

chart = anychart.pie([15, 16, 30]);

stage.listenOnce('stagerendered', function() {
    if (isAsync) chart.title("Is Async");
});

chart.container(stage);
chart.draw();

// In async mode, your code will be executed before chart draw.
isAsync = true;


