'use strict';

let panelCreated = false;

function createPanelIfSagaMonitorLoaded() {
  if (panelCreated) {
    return;
  }

  chrome.devtools.inspectedWindow.eval(`!!(window.__REDUX_SAGA_MONITOR_GLOBAL_HOOK)`, function (pageHasMonitor) {
    if (!pageHasMonitor || panelCreated) {
      return;
    }

    clearInterval(loadCheckInterval);

    panelCreated = true;

    chrome.devtools.panels.create('Redux Saga Monitor', '', 'index.html', function (panel) {
      // TODO: We should probably add lifecycle callbacks to improve performance.
    });
  });
}

chrome.devtools.network.onNavigated.addListener(function() {
  createPanelIfSagaMonitorLoaded();
});

const loadCheckInterval = setInterval(function () {
  createPanelIfSagaMonitorLoaded();
}, 100);
