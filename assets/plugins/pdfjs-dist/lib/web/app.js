/* Copyright 2017 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var uiUtilsLib = require('./ui_utils.js');
var downloadManagerLib = require('./download_manager.js');
var pdfHistoryLib = require('./pdf_history.js');
var preferencesLib = require('./preferences.js');
var pdfSidebarLib = require('./pdf_sidebar.js');
var viewHistoryLib = require('./view_history.js');
var pdfThumbnailViewerLib = require('./pdf_thumbnail_viewer.js');
var toolbarLib = require('./toolbar.js');
var secondaryToolbarLib = require('./secondary_toolbar.js');
var passwordPromptLib = require('./password_prompt.js');
var pdfPresentationModeLib = require('./pdf_presentation_mode.js');
var pdfDocumentPropertiesLib = require('./pdf_document_properties.js');
var handToolLib = require('./hand_tool.js');
var pdfViewerLib = require('./pdf_viewer.js');
var pdfRenderingQueueLib = require('./pdf_rendering_queue.js');
var pdfLinkServiceLib = require('./pdf_link_service.js');
var pdfOutlineViewerLib = require('./pdf_outline_viewer.js');
var overlayManagerLib = require('./overlay_manager.js');
var pdfAttachmentViewerLib = require('./pdf_attachment_viewer.js');
var pdfFindControllerLib = require('./pdf_find_controller.js');
var pdfFindBarLib = require('./pdf_find_bar.js');
var domEventsLib = require('./dom_events.js');
var pdfjsLib = require('./pdfjs.js');
var UNKNOWN_SCALE = uiUtilsLib.UNKNOWN_SCALE;
var DEFAULT_SCALE_VALUE = uiUtilsLib.DEFAULT_SCALE_VALUE;
var MIN_SCALE = uiUtilsLib.MIN_SCALE;
var MAX_SCALE = uiUtilsLib.MAX_SCALE;
var ProgressBar = uiUtilsLib.ProgressBar;
var getPDFFileNameFromURL = uiUtilsLib.getPDFFileNameFromURL;
var noContextMenuHandler = uiUtilsLib.noContextMenuHandler;
var mozL10n = uiUtilsLib.mozL10n;
var parseQueryString = uiUtilsLib.parseQueryString;
var PDFHistory = pdfHistoryLib.PDFHistory;
var Preferences = preferencesLib.Preferences;
var SidebarView = pdfSidebarLib.SidebarView;
var PDFSidebar = pdfSidebarLib.PDFSidebar;
var ViewHistory = viewHistoryLib.ViewHistory;
var PDFThumbnailViewer = pdfThumbnailViewerLib.PDFThumbnailViewer;
var Toolbar = toolbarLib.Toolbar;
var SecondaryToolbar = secondaryToolbarLib.SecondaryToolbar;
var PasswordPrompt = passwordPromptLib.PasswordPrompt;
var PDFPresentationMode = pdfPresentationModeLib.PDFPresentationMode;
var PDFDocumentProperties = pdfDocumentPropertiesLib.PDFDocumentProperties;
var HandTool = handToolLib.HandTool;
var PresentationModeState = pdfViewerLib.PresentationModeState;
var PDFViewer = pdfViewerLib.PDFViewer;
var RenderingStates = pdfRenderingQueueLib.RenderingStates;
var PDFRenderingQueue = pdfRenderingQueueLib.PDFRenderingQueue;
var PDFLinkService = pdfLinkServiceLib.PDFLinkService;
var PDFOutlineViewer = pdfOutlineViewerLib.PDFOutlineViewer;
var OverlayManager = overlayManagerLib.OverlayManager;
var PDFAttachmentViewer = pdfAttachmentViewerLib.PDFAttachmentViewer;
var PDFFindController = pdfFindControllerLib.PDFFindController;
var PDFFindBar = pdfFindBarLib.PDFFindBar;
var getGlobalEventBus = domEventsLib.getGlobalEventBus;
var normalizeWheelEventDelta = uiUtilsLib.normalizeWheelEventDelta;
var animationStarted = uiUtilsLib.animationStarted;
var localized = uiUtilsLib.localized;
var RendererType = uiUtilsLib.RendererType;
var DEFAULT_SCALE_DELTA = 1.1;
var DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT = 5000;
function configure(PDFJS) {
  PDFJS.imageResourcesPath = './images/';
  PDFJS.workerSrc = '../build/pdf.worker.js';
  PDFJS.cMapUrl = '../web/cmaps/';
  PDFJS.cMapPacked = true;
}
var DefaultExernalServices = {
  updateFindControlState: function (data) {},
  initPassiveLoading: function (callbacks) {},
  fallback: function (data, callback) {},
  reportTelemetry: function (data) {},
  createDownloadManager: function () {
    return new downloadManagerLib.DownloadManager();
  },
  supportsIntegratedFind: false,
  supportsDocumentFonts: true,
  supportsDocumentColors: true,
  supportedMouseWheelZoomModifierKeys: {
    ctrlKey: true,
    metaKey: true
  }
};
var PDFViewerApplication = {
  initialBookmark: document.location.hash.substring(1),
  initialDestination: null,
  initialized: false,
  fellback: false,
  appConfig: null,
  pdfDocument: null,
  pdfLoadingTask: null,
  printService: null,
  pdfViewer: null,
  pdfThumbnailViewer: null,
  pdfRenderingQueue: null,
  pdfPresentationMode: null,
  pdfDocumentProperties: null,
  pdfLinkService: null,
  pdfHistory: null,
  pdfSidebar: null,
  pdfOutlineViewer: null,
  pdfAttachmentViewer: null,
  store: null,
  downloadManager: null,
  toolbar: null,
  secondaryToolbar: null,
  eventBus: null,
  pageRotation: 0,
  isInitialViewSet: false,
  viewerPrefs: {
    sidebarViewOnLoad: SidebarView.NONE,
    pdfBugEnabled: false,
    showPreviousViewOnLoad: true,
    defaultZoomValue: '',
    disablePageLabels: false,
    renderer: 'canvas',
    enhanceTextSelection: false,
    renderInteractiveForms: false,
    enablePrintAutoRotate: false
  },
  isViewerEmbedded: window.parent !== window,
  url: '',
  baseUrl: '',
  externalServices: DefaultExernalServices,
  initialize: function pdfViewInitialize(appConfig) {
    var self = this;
    var PDFJS = pdfjsLib.PDFJS;
    Preferences.initialize();
    this.preferences = Preferences;
    configure(PDFJS);
    this.appConfig = appConfig;
    return this._readPreferences().then(function () {
      return self._initializeViewerComponents();
    }).then(function () {
      self.bindEvents();
      self.bindWindowEvents();
      localized.then(function () {
        self.eventBus.dispatch('localized');
      });
      if (self.isViewerEmbedded && !PDFJS.isExternalLinkTargetSet()) {
        PDFJS.externalLinkTarget = PDFJS.LinkTarget.TOP;
      }
      self.initialized = true;
    });
  },
  _readPreferences: function () {
    var self = this;
    var PDFJS = pdfjsLib.PDFJS;
    return Promise.all([Preferences.get('enableWebGL').then(function resolved(value) {
      PDFJS.disableWebGL = !value;
    }), Preferences.get('sidebarViewOnLoad').then(function resolved(value) {
      self.viewerPrefs['sidebarViewOnLoad'] = value;
    }), Preferences.get('pdfBugEnabled').then(function resolved(value) {
      self.viewerPrefs['pdfBugEnabled'] = value;
    }), Preferences.get('showPreviousViewOnLoad').then(function resolved(value) {
      self.viewerPrefs['showPreviousViewOnLoad'] = value;
    }), Preferences.get('defaultZoomValue').then(function resolved(value) {
      self.viewerPrefs['defaultZoomValue'] = value;
    }), Preferences.get('enhanceTextSelection').then(function resolved(value) {
      self.viewerPrefs['enhanceTextSelection'] = value;
    }), Preferences.get('disableTextLayer').then(function resolved(value) {
      if (PDFJS.disableTextLayer === true) {
        return;
      }
      PDFJS.disableTextLayer = value;
    }), Preferences.get('disableRange').then(function resolved(value) {
      if (PDFJS.disableRange === true) {
        return;
      }
      PDFJS.disableRange = value;
    }), Preferences.get('disableStream').then(function resolved(value) {
      if (PDFJS.disableStream === true) {
        return;
      }
      PDFJS.disableStream = value;
    }), Preferences.get('disableAutoFetch').then(function resolved(value) {
      PDFJS.disableAutoFetch = value;
    }), Preferences.get('disableFontFace').then(function resolved(value) {
      if (PDFJS.disableFontFace === true) {
        return;
      }
      PDFJS.disableFontFace = value;
    }), Preferences.get('useOnlyCssZoom').then(function resolved(value) {
      PDFJS.useOnlyCssZoom = value;
    }), Preferences.get('externalLinkTarget').then(function resolved(value) {
      if (PDFJS.isExternalLinkTargetSet()) {
        return;
      }
      PDFJS.externalLinkTarget = value;
    }), Preferences.get('renderer').then(function resolved(value) {
      self.viewerPrefs['renderer'] = value;
    }), Preferences.get('renderInteractiveForms').then(function resolved(value) {
      self.viewerPrefs['renderInteractiveForms'] = value;
    }), Preferences.get('disablePageLabels').then(function resolved(value) {
      self.viewerPrefs['disablePageLabels'] = value;
    }), Preferences.get('enablePrintAutoRotate').then(function resolved(value) {
      self.viewerPrefs['enablePrintAutoRotate'] = value;
    })]).catch(function (reason) {});
  },
  _initializeViewerComponents: function () {
    var self = this;
    var appConfig = this.appConfig;
    return new Promise(function (resolve, reject) {
      var eventBus = appConfig.eventBus || getGlobalEventBus();
      self.eventBus = eventBus;
      var pdfRenderingQueue = new PDFRenderingQueue();
      pdfRenderingQueue.onIdle = self.cleanup.bind(self);
      self.pdfRenderingQueue = pdfRenderingQueue;
      var pdfLinkService = new PDFLinkService({ eventBus: eventBus });
      self.pdfLinkService = pdfLinkService;
      var downloadManager = self.externalServices.createDownloadManager();
      self.downloadManager = downloadManager;
      var container = appConfig.mainContainer;
      var viewer = appConfig.viewerContainer;
      self.pdfViewer = new PDFViewer({
        container: container,
        viewer: viewer,
        eventBus: eventBus,
        renderingQueue: pdfRenderingQueue,
        linkService: pdfLinkService,
        downloadManager: downloadManager,
        renderer: self.viewerPrefs['renderer'],
        enhanceTextSelection: self.viewerPrefs['enhanceTextSelection'],
        renderInteractiveForms: self.viewerPrefs['renderInteractiveForms'],
        enablePrintAutoRotate: self.viewerPrefs['enablePrintAutoRotate']
      });
      pdfRenderingQueue.setViewer(self.pdfViewer);
      pdfLinkService.setViewer(self.pdfViewer);
      var thumbnailContainer = appConfig.sidebar.thumbnailView;
      self.pdfThumbnailViewer = new PDFThumbnailViewer({
        container: thumbnailContainer,
        renderingQueue: pdfRenderingQueue,
        linkService: pdfLinkService
      });
      pdfRenderingQueue.setThumbnailViewer(self.pdfThumbnailViewer);
      self.pdfHistory = new PDFHistory({
        linkService: pdfLinkService,
        eventBus: eventBus
      });
      pdfLinkService.setHistory(self.pdfHistory);
      self.findController = new PDFFindController({ pdfViewer: self.pdfViewer });
      self.findController.onUpdateResultsCount = function (matchCount) {
        if (self.supportsIntegratedFind) {
          return;
        }
        self.findBar.updateResultsCount(matchCount);
      };
      self.findController.onUpdateState = function (state, previous, matchCount) {
        if (self.supportsIntegratedFind) {
          self.externalServices.updateFindControlState({
            result: state,
            findPrevious: previous
          });
        } else {
          self.findBar.updateUIState(state, previous, matchCount);
        }
      };
      self.pdfViewer.setFindController(self.findController);
      var findBarConfig = Object.create(appConfig.findBar);
      findBarConfig.findController = self.findController;
      findBarConfig.eventBus = eventBus;
      self.findBar = new PDFFindBar(findBarConfig);
      self.overlayManager = OverlayManager;
      self.handTool = new HandTool({
        container: container,
        eventBus: eventBus
      });
      self.pdfDocumentProperties = new PDFDocumentProperties(appConfig.documentProperties);
      self.toolbar = new Toolbar(appConfig.toolbar, container, eventBus);
      self.secondaryToolbar = new SecondaryToolbar(appConfig.secondaryToolbar, container, eventBus);
      if (self.supportsFullscreen) {
        self.pdfPresentationMode = new PDFPresentationMode({
          container: container,
          viewer: viewer,
          pdfViewer: self.pdfViewer,
          eventBus: eventBus,
          contextMenuItems: appConfig.fullscreen
        });
      }
      self.passwordPrompt = new PasswordPrompt(appConfig.passwordOverlay);
      self.pdfOutlineViewer = new PDFOutlineViewer({
        container: appConfig.sidebar.outlineView,
        eventBus: eventBus,
        linkService: pdfLinkService
      });
      self.pdfAttachmentViewer = new PDFAttachmentViewer({
        container: appConfig.sidebar.attachmentsView,
        eventBus: eventBus,
        downloadManager: downloadManager
      });
      var sidebarConfig = Object.create(appConfig.sidebar);
      sidebarConfig.pdfViewer = self.pdfViewer;
      sidebarConfig.pdfThumbnailViewer = self.pdfThumbnailViewer;
      sidebarConfig.pdfOutlineViewer = self.pdfOutlineViewer;
      sidebarConfig.eventBus = eventBus;
      self.pdfSidebar = new PDFSidebar(sidebarConfig);
      self.pdfSidebar.onToggled = self.forceRendering.bind(self);
      resolve(undefined);
    });
  },
  run: function pdfViewRun(config) {
    this.initialize(config).then(webViewerInitialized);
  },
  zoomIn: function pdfViewZoomIn(ticks) {
    var newScale = this.pdfViewer.currentScale;
    do {
      newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.ceil(newScale * 10) / 10;
      newScale = Math.min(MAX_SCALE, newScale);
    } while (--ticks > 0 && newScale < MAX_SCALE);
    this.pdfViewer.currentScaleValue = newScale;
  },
  zoomOut: function pdfViewZoomOut(ticks) {
    var newScale = this.pdfViewer.currentScale;
    do {
      newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.floor(newScale * 10) / 10;
      newScale = Math.max(MIN_SCALE, newScale);
    } while (--ticks > 0 && newScale > MIN_SCALE);
    this.pdfViewer.currentScaleValue = newScale;
  },
  get pagesCount() {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
  },
  set page(val) {
    this.pdfViewer.currentPageNumber = val;
  },
  get page() {
    return this.pdfViewer.currentPageNumber;
  },
  get printing() {
    return !!this.printService;
  },
  get supportsPrinting() {
    return PDFPrintServiceFactory.instance.supportsPrinting;
  },
  get supportsFullscreen() {
    var support;
    var doc = document.documentElement;
    support = !!(doc.requestFullscreen || doc.mozRequestFullScreen || doc.webkitRequestFullScreen || doc.msRequestFullscreen);
    if (document.fullscreenEnabled === false || document.mozFullScreenEnabled === false || document.webkitFullscreenEnabled === false || document.msFullscreenEnabled === false) {
      support = false;
    }
    if (support && pdfjsLib.PDFJS.disableFullscreen === true) {
      support = false;
    }
    return pdfjsLib.shadow(this, 'supportsFullscreen', support);
  },
  get supportsIntegratedFind() {
    return this.externalServices.supportsIntegratedFind;
  },
  get supportsDocumentFonts() {
    return this.externalServices.supportsDocumentFonts;
  },
  get supportsDocumentColors() {
    return this.externalServices.supportsDocumentColors;
  },
  get loadingBar() {
    var bar = new ProgressBar('#loadingBar', {});
    return pdfjsLib.shadow(this, 'loadingBar', bar);
  },
  get supportedMouseWheelZoomModifierKeys() {
    return this.externalServices.supportedMouseWheelZoomModifierKeys;
  },
  initPassiveLoading: function pdfViewInitPassiveLoading() {
    throw new Error('Not implemented: initPassiveLoading');
  },
  setTitleUsingUrl: function pdfViewSetTitleUsingUrl(url) {
    this.url = url;
    this.baseUrl = url.split('#')[0];
    var title = getPDFFileNameFromURL(url, '');
    if (!title) {
      try {
        title = decodeURIComponent(pdfjsLib.getFilenameFromUrl(url)) || url;
      } catch (e) {
        title = url;
      }
    }
    this.setTitle(title);
  },
  setTitle: function pdfViewSetTitle(title) {
    if (this.isViewerEmbedded) {
      return;
    }
    document.title = title;
  },
  close: function pdfViewClose() {
    var errorWrapper = this.appConfig.errorWrapper.container;
    errorWrapper.setAttribute('hidden', 'true');
    if (!this.pdfLoadingTask) {
      return Promise.resolve();
    }
    var promise = this.pdfLoadingTask.destroy();
    this.pdfLoadingTask = null;
    if (this.pdfDocument) {
      this.pdfDocument = null;
      this.pdfThumbnailViewer.setDocument(null);
      this.pdfViewer.setDocument(null);
      this.pdfLinkService.setDocument(null, null);
    }
    this.store = null;
    this.isInitialViewSet = false;
    this.pdfSidebar.reset();
    this.pdfOutlineViewer.reset();
    this.pdfAttachmentViewer.reset();
    this.findController.reset();
    this.findBar.reset();
    this.toolbar.reset();
    this.secondaryToolbar.reset();
    if (typeof PDFBug !== 'undefined') {
      PDFBug.cleanup();
    }
    return promise;
  },
  open: function pdfViewOpen(file, args) {
    if (arguments.length > 2 || typeof args === 'number') {
      return Promise.reject(new Error('Call of open() with obsolete signature.'));
    }
    if (this.pdfLoadingTask) {
      return this.close().then(function () {
        Preferences.reload();
        return this.open(file, args);
      }.bind(this));
    }
    var parameters = Object.create(null),
        scale;
    if (typeof file === 'string') {
      this.setTitleUsingUrl(file);
      parameters.url = file;
    } else if (file && 'byteLength' in file) {
      parameters.data = file;
    } else if (file.url && file.originalUrl) {
      this.setTitleUsingUrl(file.originalUrl);
      parameters.url = file.url;
    }
    if (args) {
      for (var prop in args) {
        parameters[prop] = args[prop];
      }
      if (args.scale) {
        scale = args.scale;
      }
      if (args.length) {
        this.pdfDocumentProperties.setFileSize(args.length);
      }
    }
    var self = this;
    self.downloadComplete = false;
    var loadingTask = pdfjsLib.getDocument(parameters);
    this.pdfLoadingTask = loadingTask;
    loadingTask.onPassword = function passwordNeeded(updateCallback, reason) {
      self.passwordPrompt.setUpdateCallback(updateCallback, reason);
      self.passwordPrompt.open();
    };
    loadingTask.onProgress = function getDocumentProgress(progressData) {
      self.progress(progressData.loaded / progressData.total);
    };
    loadingTask.onUnsupportedFeature = this.fallback.bind(this);
    return loadingTask.promise.then(function getDocumentCallback(pdfDocument) {
      self.load(pdfDocument, scale);
    }, function getDocumentError(exception) {
      var message = exception && exception.message;
      var loadingErrorMessage = mozL10n.get('loading_error', null, 'An error occurred while loading the PDF.');
      if (exception instanceof pdfjsLib.InvalidPDFException) {
        loadingErrorMessage = mozL10n.get('invalid_file_error', null, 'Invalid or corrupted PDF file.');
      } else if (exception instanceof pdfjsLib.MissingPDFException) {
        loadingErrorMessage = mozL10n.get('missing_file_error', null, 'Missing PDF file.');
      } else if (exception instanceof pdfjsLib.UnexpectedResponseException) {
        loadingErrorMessage = mozL10n.get('unexpected_response_error', null, 'Unexpected server response.');
      }
      var moreInfo = { message: message };
      self.error(loadingErrorMessage, moreInfo);
      throw new Error(loadingErrorMessage);
    });
  },
  download: function pdfViewDownload() {
    function downloadByUrl() {
      downloadManager.downloadUrl(url, filename);
    }
    var url = this.baseUrl;
    var filename = getPDFFileNameFromURL(this.url);
    var downloadManager = this.downloadManager;
    downloadManager.onerror = function (err) {
      PDFViewerApplication.error('PDF failed to download.');
    };
    if (!this.pdfDocument) {
      downloadByUrl();
      return;
    }
    if (!this.downloadComplete) {
      downloadByUrl();
      return;
    }
    this.pdfDocument.getData().then(function getDataSuccess(data) {
      var blob = pdfjsLib.createBlob(data, 'application/pdf');
      downloadManager.download(blob, url, filename);
    }, downloadByUrl).then(null, downloadByUrl);
  },
  fallback: function pdfViewFallback(featureId) {},
  error: function pdfViewError(message, moreInfo) {
    var moreInfoText = mozL10n.get('error_version_info', {
      version: pdfjsLib.version || '?',
      build: pdfjsLib.build || '?'
    }, 'PDF.js v{{version}} (build: {{build}})') + '\n';
    if (moreInfo) {
      moreInfoText += mozL10n.get('error_message', { message: moreInfo.message }, 'Message: {{message}}');
      if (moreInfo.stack) {
        moreInfoText += '\n' + mozL10n.get('error_stack', { stack: moreInfo.stack }, 'Stack: {{stack}}');
      } else {
        if (moreInfo.filename) {
          moreInfoText += '\n' + mozL10n.get('error_file', { file: moreInfo.filename }, 'File: {{file}}');
        }
        if (moreInfo.lineNumber) {
          moreInfoText += '\n' + mozL10n.get('error_line', { line: moreInfo.lineNumber }, 'Line: {{line}}');
        }
      }
    }
    var errorWrapperConfig = this.appConfig.errorWrapper;
    var errorWrapper = errorWrapperConfig.container;
    errorWrapper.removeAttribute('hidden');
    var errorMessage = errorWrapperConfig.errorMessage;
    errorMessage.textContent = message;
    var closeButton = errorWrapperConfig.closeButton;
    closeButton.onclick = function () {
      errorWrapper.setAttribute('hidden', 'true');
    };
    var errorMoreInfo = errorWrapperConfig.errorMoreInfo;
    var moreInfoButton = errorWrapperConfig.moreInfoButton;
    var lessInfoButton = errorWrapperConfig.lessInfoButton;
    moreInfoButton.onclick = function () {
      errorMoreInfo.removeAttribute('hidden');
      moreInfoButton.setAttribute('hidden', 'true');
      lessInfoButton.removeAttribute('hidden');
      errorMoreInfo.style.height = errorMoreInfo.scrollHeight + 'px';
    };
    lessInfoButton.onclick = function () {
      errorMoreInfo.setAttribute('hidden', 'true');
      moreInfoButton.removeAttribute('hidden');
      lessInfoButton.setAttribute('hidden', 'true');
    };
    moreInfoButton.oncontextmenu = noContextMenuHandler;
    lessInfoButton.oncontextmenu = noContextMenuHandler;
    closeButton.oncontextmenu = noContextMenuHandler;
    moreInfoButton.removeAttribute('hidden');
    lessInfoButton.setAttribute('hidden', 'true');
    errorMoreInfo.value = moreInfoText;
  },
  progress: function pdfViewProgress(level) {
    var percent = Math.round(level * 100);
    if (percent > this.loadingBar.percent || isNaN(percent)) {
      this.loadingBar.percent = percent;
      if (pdfjsLib.PDFJS.disableAutoFetch && percent) {
        if (this.disableAutoFetchLoadingBarTimeout) {
          clearTimeout(this.disableAutoFetchLoadingBarTimeout);
          this.disableAutoFetchLoadingBarTimeout = null;
        }
        this.loadingBar.show();
        this.disableAutoFetchLoadingBarTimeout = setTimeout(function () {
          this.loadingBar.hide();
          this.disableAutoFetchLoadingBarTimeout = null;
        }.bind(this), DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT);
      }
    }
  },
  load: function pdfViewLoad(pdfDocument, scale) {
    var self = this;
    scale = scale || UNKNOWN_SCALE;
    this.pdfDocument = pdfDocument;
    this.pdfDocumentProperties.setDocumentAndUrl(pdfDocument, this.url);
    var downloadedPromise = pdfDocument.getDownloadInfo().then(function () {
      self.downloadComplete = true;
      self.loadingBar.hide();
    });
    this.toolbar.setPagesCount(pdfDocument.numPages, false);
    this.secondaryToolbar.setPagesCount(pdfDocument.numPages);
    var id = this.documentFingerprint = pdfDocument.fingerprint;
    var store = this.store = new ViewHistory(id);
    var baseDocumentUrl;
    baseDocumentUrl = null;
    this.pdfLinkService.setDocument(pdfDocument, baseDocumentUrl);
    var pdfViewer = this.pdfViewer;
    pdfViewer.currentScale = scale;
    pdfViewer.setDocument(pdfDocument);
    var firstPagePromise = pdfViewer.firstPagePromise;
    var pagesPromise = pdfViewer.pagesPromise;
    var onePageRendered = pdfViewer.onePageRendered;
    this.pageRotation = 0;
    var pdfThumbnailViewer = this.pdfThumbnailViewer;
    pdfThumbnailViewer.setDocument(pdfDocument);
    firstPagePromise.then(function (pdfPage) {
      downloadedPromise.then(function () {
        self.eventBus.dispatch('documentload', { source: self });
      });
      self.loadingBar.setWidth(self.appConfig.viewerContainer);
      if (!pdfjsLib.PDFJS.disableHistory && !self.isViewerEmbedded) {
        if (!self.viewerPrefs['showPreviousViewOnLoad']) {
          self.pdfHistory.clearHistoryState();
        }
        self.pdfHistory.initialize(self.documentFingerprint);
        if (self.pdfHistory.initialDestination) {
          self.initialDestination = self.pdfHistory.initialDestination;
        } else if (self.pdfHistory.initialBookmark) {
          self.initialBookmark = self.pdfHistory.initialBookmark;
        }
      }
      var initialParams = {
        destination: self.initialDestination,
        bookmark: self.initialBookmark,
        hash: null
      };
      store.initializedPromise.then(function resolved() {
        var storedHash = null,
            sidebarView = null;
        if (self.viewerPrefs['showPreviousViewOnLoad'] && store.get('exists', false)) {
          var pageNum = store.get('page', '1');
          var zoom = self.viewerPrefs['defaultZoomValue'] || store.get('zoom', DEFAULT_SCALE_VALUE);
          var left = store.get('scrollLeft', '0');
          var top = store.get('scrollTop', '0');
          storedHash = 'page=' + pageNum + '&zoom=' + zoom + ',' + left + ',' + top;
          sidebarView = store.get('sidebarView', SidebarView.NONE);
        } else if (self.viewerPrefs['defaultZoomValue']) {
          storedHash = 'page=1&zoom=' + self.viewerPrefs['defaultZoomValue'];
        }
        self.setInitialView(storedHash, {
          scale: scale,
          sidebarView: sidebarView
        });
        initialParams.hash = storedHash;
        if (!self.isViewerEmbedded) {
          self.pdfViewer.focus();
        }
      }, function rejected(reason) {
        console.error(reason);
        self.setInitialView(null, { scale: scale });
      });
      pagesPromise.then(function resolved() {
        if (!initialParams.destination && !initialParams.bookmark && !initialParams.hash) {
          return;
        }
        if (self.hasEqualPageSizes) {
          return;
        }
        self.initialDestination = initialParams.destination;
        self.initialBookmark = initialParams.bookmark;
        self.pdfViewer.currentScaleValue = self.pdfViewer.currentScaleValue;
        self.setInitialView(initialParams.hash);
      });
    });
    pdfDocument.getPageLabels().then(function (labels) {
      if (!labels || self.viewerPrefs['disablePageLabels']) {
        return;
      }
      var i = 0,
          numLabels = labels.length;
      if (numLabels !== self.pagesCount) {
        console.error('The number of Page Labels does not match ' + 'the number of pages in the document.');
        return;
      }
      while (i < numLabels && labels[i] === (i + 1).toString()) {
        i++;
      }
      if (i === numLabels) {
        return;
      }
      pdfViewer.setPageLabels(labels);
      pdfThumbnailViewer.setPageLabels(labels);
      self.toolbar.setPagesCount(pdfDocument.numPages, true);
      self.toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
    });
    pagesPromise.then(function () {
      if (self.supportsPrinting) {
        pdfDocument.getJavaScript().then(function (javaScript) {
          if (javaScript.length) {
            console.warn('Warning: JavaScript is not supported');
            self.fallback(pdfjsLib.UNSUPPORTED_FEATURES.javaScript);
          }
          var regex = /\bprint\s*\(/;
          for (var i = 0, ii = javaScript.length; i < ii; i++) {
            var js = javaScript[i];
            if (js && regex.test(js)) {
              setTimeout(function () {
                window.print();
              });
              return;
            }
          }
        });
      }
    });
    Promise.all([onePageRendered, animationStarted]).then(function () {
      pdfDocument.getOutline().then(function (outline) {
        self.pdfOutlineViewer.render({ outline: outline });
      });
      pdfDocument.getAttachments().then(function (attachments) {
        self.pdfAttachmentViewer.render({ attachments: attachments });
      });
    });
    pdfDocument.getMetadata().then(function (data) {
      var info = data.info,
          metadata = data.metadata;
      self.documentInfo = info;
      self.metadata = metadata;
      console.log('PDF ' + pdfDocument.fingerprint + ' [' + info.PDFFormatVersion + ' ' + (info.Producer || '-').trim() + ' / ' + (info.Creator || '-').trim() + ']' + ' (PDF.js: ' + (pdfjsLib.version || '-') + (!pdfjsLib.PDFJS.disableWebGL ? ' [WebGL]' : '') + ')');
      var pdfTitle;
      if (metadata && metadata.has('dc:title')) {
        var title = metadata.get('dc:title');
        if (title !== 'Untitled') {
          pdfTitle = title;
        }
      }
      if (!pdfTitle && info && info['Title']) {
        pdfTitle = info['Title'];
      }
      if (pdfTitle) {
        self.setTitle(pdfTitle + ' - ' + document.title);
      }
      if (info.IsAcroFormPresent) {
        console.warn('Warning: AcroForm/XFA is not supported');
        self.fallback(pdfjsLib.UNSUPPORTED_FEATURES.forms);
      }
    });
  },
  setInitialView: function pdfViewSetInitialView(storedHash, options) {
    var scale = options && options.scale;
    var sidebarView = options && options.sidebarView;
    this.isInitialViewSet = true;
    this.pdfSidebar.setInitialView(this.viewerPrefs['sidebarViewOnLoad'] || sidebarView | 0);
    if (this.initialDestination) {
      this.pdfLinkService.navigateTo(this.initialDestination);
      this.initialDestination = null;
    } else if (this.initialBookmark) {
      this.pdfLinkService.setHash(this.initialBookmark);
      this.pdfHistory.push({ hash: this.initialBookmark }, true);
      this.initialBookmark = null;
    } else if (storedHash) {
      this.pdfLinkService.setHash(storedHash);
    } else if (scale) {
      this.pdfViewer.currentScaleValue = scale;
      this.page = 1;
    }
    this.toolbar.setPageNumber(this.pdfViewer.currentPageNumber, this.pdfViewer.currentPageLabel);
    this.secondaryToolbar.setPageNumber(this.pdfViewer.currentPageNumber);
    if (!this.pdfViewer.currentScaleValue) {
      this.pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
    }
  },
  cleanup: function pdfViewCleanup() {
    if (!this.pdfDocument) {
      return;
    }
    this.pdfViewer.cleanup();
    this.pdfThumbnailViewer.cleanup();
    if (this.pdfViewer.renderer !== RendererType.SVG) {
      this.pdfDocument.cleanup();
    }
  },
  forceRendering: function pdfViewForceRendering() {
    this.pdfRenderingQueue.printing = this.printing;
    this.pdfRenderingQueue.isThumbnailViewEnabled = this.pdfSidebar.isThumbnailViewVisible;
    this.pdfRenderingQueue.renderHighestPriority();
  },
  beforePrint: function pdfViewSetupBeforePrint() {
    if (this.printService) {
      return;
    }
    if (!this.supportsPrinting) {
      var printMessage = mozL10n.get('printing_not_supported', null, 'Warning: Printing is not fully supported by this browser.');
      this.error(printMessage);
      return;
    }
    if (!this.pdfViewer.pageViewsReady) {
      var notReadyMessage = mozL10n.get('printing_not_ready', null, 'Warning: The PDF is not fully loaded for printing.');
      window.alert(notReadyMessage);
      return;
    }
    var pagesOverview = this.pdfViewer.getPagesOverview();
    var printContainer = this.appConfig.printContainer;
    var printService = PDFPrintServiceFactory.instance.createPrintService(this.pdfDocument, pagesOverview, printContainer);
    this.printService = printService;
    this.forceRendering();
    printService.layout();
  },
  get hasEqualPageSizes() {
    var firstPage = this.pdfViewer.getPageView(0);
    for (var i = 1, ii = this.pagesCount; i < ii; ++i) {
      var pageView = this.pdfViewer.getPageView(i);
      if (pageView.width !== firstPage.width || pageView.height !== firstPage.height) {
        return false;
      }
    }
    return true;
  },
  afterPrint: function pdfViewSetupAfterPrint() {
    if (this.printService) {
      this.printService.destroy();
      this.printService = null;
    }
    this.forceRendering();
  },
  rotatePages: function pdfViewRotatePages(delta) {
    var pageNumber = this.page;
    this.pageRotation = (this.pageRotation + 360 + delta) % 360;
    this.pdfViewer.pagesRotation = this.pageRotation;
    this.pdfThumbnailViewer.pagesRotation = this.pageRotation;
    this.forceRendering();
    this.pdfViewer.currentPageNumber = pageNumber;
  },
  requestPresentationMode: function pdfViewRequestPresentationMode() {
    if (!this.pdfPresentationMode) {
      return;
    }
    this.pdfPresentationMode.request();
  },
  bindEvents: function pdfViewBindEvents() {
    var eventBus = this.eventBus;
    eventBus.on('resize', webViewerResize);
    eventBus.on('hashchange', webViewerHashchange);
    eventBus.on('beforeprint', this.beforePrint.bind(this));
    eventBus.on('afterprint', this.afterPrint.bind(this));
    eventBus.on('pagerendered', webViewerPageRendered);
    eventBus.on('textlayerrendered', webViewerTextLayerRendered);
    eventBus.on('updateviewarea', webViewerUpdateViewarea);
    eventBus.on('pagechanging', webViewerPageChanging);
    eventBus.on('scalechanging', webViewerScaleChanging);
    eventBus.on('sidebarviewchanged', webViewerSidebarViewChanged);
    eventBus.on('pagemode', webViewerPageMode);
    eventBus.on('namedaction', webViewerNamedAction);
    eventBus.on('presentationmodechanged', webViewerPresentationModeChanged);
    eventBus.on('presentationmode', webViewerPresentationMode);
    eventBus.on('openfile', webViewerOpenFile);
    eventBus.on('print', webViewerPrint);
    eventBus.on('download', webViewerDownload);
    eventBus.on('firstpage', webViewerFirstPage);
    eventBus.on('lastpage', webViewerLastPage);
    eventBus.on('nextpage', webViewerNextPage);
    eventBus.on('previouspage', webViewerPreviousPage);
    eventBus.on('zoomin', webViewerZoomIn);
    eventBus.on('zoomout', webViewerZoomOut);
    eventBus.on('pagenumberchanged', webViewerPageNumberChanged);
    eventBus.on('scalechanged', webViewerScaleChanged);
    eventBus.on('rotatecw', webViewerRotateCw);
    eventBus.on('rotateccw', webViewerRotateCcw);
    eventBus.on('documentproperties', webViewerDocumentProperties);
    eventBus.on('find', webViewerFind);
    eventBus.on('findfromurlhash', webViewerFindFromUrlHash);
    eventBus.on('fileinputchange', webViewerFileInputChange);
  },
  bindWindowEvents: function pdfViewBindWindowEvents() {
    var eventBus = this.eventBus;
    window.addEventListener('wheel', webViewerWheel);
    window.addEventListener('click', webViewerClick);
    window.addEventListener('keydown', webViewerKeyDown);
    window.addEventListener('resize', function windowResize() {
      eventBus.dispatch('resize');
    });
    window.addEventListener('hashchange', function windowHashChange() {
      eventBus.dispatch('hashchange', { hash: document.location.hash.substring(1) });
    });
    window.addEventListener('beforeprint', function windowBeforePrint() {
      eventBus.dispatch('beforeprint');
    });
    window.addEventListener('afterprint', function windowAfterPrint() {
      eventBus.dispatch('afterprint');
    });
    window.addEventListener('change', function windowChange(evt) {
      var files = evt.target.files;
      if (!files || files.length === 0) {
        return;
      }
      eventBus.dispatch('fileinputchange', { fileInput: evt.target });
    });
  }
};
var validateFileURL;
var HOSTED_VIEWER_ORIGINS = ['null', 'http://mozilla.github.io', 'https://mozilla.github.io'];
validateFileURL = function validateFileURL(file) {
  try {
    var viewerOrigin = new URL(window.location.href).origin || 'null';
    if (HOSTED_VIEWER_ORIGINS.indexOf(viewerOrigin) >= 0) {
      return;
    }
    var fileOrigin = new URL(file, window.location.href).origin;
    if (fileOrigin !== viewerOrigin) {
      throw new Error('file origin does not match viewer\'s');
    }
  } catch (e) {
    var message = e && e.message;
    var loadingErrorMessage = mozL10n.get('loading_error', null, 'An error occurred while loading the PDF.');
    var moreInfo = { message: message };
    PDFViewerApplication.error(loadingErrorMessage, moreInfo);
    throw e;
  }
};
function loadAndEnablePDFBug(enabledTabs) {
  return new Promise(function (resolve, reject) {
    var appConfig = PDFViewerApplication.appConfig;
    var script = document.createElement('script');
    script.src = appConfig.debuggerScriptPath;
    script.onload = function () {
      PDFBug.enable(enabledTabs);
      PDFBug.init(pdfjsLib, appConfig.mainContainer);
      resolve();
    };
    script.onerror = function () {
      reject(new Error('Cannot load debugger at ' + script.src));
    };
    (document.getElementsByTagName('head')[0] || document.body).appendChild(script);
  });
}
function webViewerInitialized() {
  var appConfig = PDFViewerApplication.appConfig;
  var file;
  var queryString = document.location.search.substring(1);
  var params = parseQueryString(queryString);
  file = 'file' in params ? params.file : appConfig.defaultUrl;
  validateFileURL(file);
  var waitForBeforeOpening = [];
  var fileInput = document.createElement('input');
  fileInput.id = appConfig.openFileInputName;
  fileInput.className = 'fileInput';
  fileInput.setAttribute('type', 'file');
  fileInput.oncontextmenu = noContextMenuHandler;
  document.body.appendChild(fileInput);
  if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
    appConfig.toolbar.openFile.setAttribute('hidden', 'true');
    appConfig.secondaryToolbar.openFileButton.setAttribute('hidden', 'true');
  } else {
    fileInput.value = null;
  }
  var PDFJS = pdfjsLib.PDFJS;
  if (PDFViewerApplication.viewerPrefs['pdfBugEnabled']) {
    var hash = document.location.hash.substring(1);
    var hashParams = parseQueryString(hash);
    if ('disableworker' in hashParams) {
      PDFJS.disableWorker = hashParams['disableworker'] === 'true';
    }
    if ('disablerange' in hashParams) {
      PDFJS.disableRange = hashParams['disablerange'] === 'true';
    }
    if ('disablestream' in hashParams) {
      PDFJS.disableStream = hashParams['disablestream'] === 'true';
    }
    if ('disableautofetch' in hashParams) {
      PDFJS.disableAutoFetch = hashParams['disableautofetch'] === 'true';
    }
    if ('disablefontface' in hashParams) {
      PDFJS.disableFontFace = hashParams['disablefontface'] === 'true';
    }
    if ('disablehistory' in hashParams) {
      PDFJS.disableHistory = hashParams['disablehistory'] === 'true';
    }
    if ('webgl' in hashParams) {
      PDFJS.disableWebGL = hashParams['webgl'] !== 'true';
    }
    if ('useonlycsszoom' in hashParams) {
      PDFJS.useOnlyCssZoom = hashParams['useonlycsszoom'] === 'true';
    }
    if ('verbosity' in hashParams) {
      PDFJS.verbosity = hashParams['verbosity'] | 0;
    }
    if ('ignorecurrentpositiononzoom' in hashParams) {
      PDFJS.ignoreCurrentPositionOnZoom = hashParams['ignorecurrentpositiononzoom'] === 'true';
    }
    if ('locale' in hashParams) {
      PDFJS.locale = hashParams['locale'];
    }
    if ('textlayer' in hashParams) {
      switch (hashParams['textlayer']) {
        case 'off':
          PDFJS.disableTextLayer = true;
          break;
        case 'visible':
        case 'shadow':
        case 'hover':
          var viewer = appConfig.viewerContainer;
          viewer.classList.add('textLayer-' + hashParams['textlayer']);
          break;
      }
    }
    if ('pdfbug' in hashParams) {
      PDFJS.pdfBug = true;
      var pdfBug = hashParams['pdfbug'];
      var enabled = pdfBug.split(',');
      waitForBeforeOpening.push(loadAndEnablePDFBug(enabled));
    }
  }
  mozL10n.setLanguage(PDFJS.locale);
  if (!PDFViewerApplication.supportsPrinting) {
    appConfig.toolbar.print.classList.add('hidden');
    appConfig.secondaryToolbar.printButton.classList.add('hidden');
  }
  if (!PDFViewerApplication.supportsFullscreen) {
    appConfig.toolbar.presentationModeButton.classList.add('hidden');
    appConfig.secondaryToolbar.presentationModeButton.classList.add('hidden');
  }
  if (PDFViewerApplication.supportsIntegratedFind) {
    appConfig.toolbar.viewFind.classList.add('hidden');
  }
  appConfig.sidebar.mainContainer.addEventListener('transitionend', function (e) {
    if (e.target === this) {
      PDFViewerApplication.eventBus.dispatch('resize');
    }
  }, true);
  appConfig.sidebar.toggleButton.addEventListener('click', function () {
    PDFViewerApplication.pdfSidebar.toggle();
  });
  Promise.all(waitForBeforeOpening).then(function () {
    webViewerOpenFileViaURL(file);
  }).catch(function (reason) {
    PDFViewerApplication.error(mozL10n.get('loading_error', null, 'An error occurred while opening.'), reason);
  });
}
var webViewerOpenFileViaURL;
webViewerOpenFileViaURL = function webViewerOpenFileViaURL(file) {
  if (file && file.lastIndexOf('file:', 0) === 0) {
    PDFViewerApplication.setTitleUsingUrl(file);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      PDFViewerApplication.open(new Uint8Array(xhr.response));
    };
    try {
      xhr.open('GET', file);
      xhr.responseType = 'arraybuffer';
      xhr.send();
    } catch (e) {
      PDFViewerApplication.error(mozL10n.get('loading_error', null, 'An error occurred while loading the PDF.'), e);
    }
    return;
  }
  if (file) {
    PDFViewerApplication.open(file);
  }
};
function webViewerPageRendered(e) {
  var pageNumber = e.pageNumber;
  var pageIndex = pageNumber - 1;
  var pageView = PDFViewerApplication.pdfViewer.getPageView(pageIndex);
  if (pageNumber === PDFViewerApplication.page) {
    PDFViewerApplication.toolbar.updateLoadingIndicatorState(false);
  }
  if (!pageView) {
    return;
  }
  if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
    var thumbnailView = PDFViewerApplication.pdfThumbnailViewer.getThumbnail(pageIndex);
    thumbnailView.setImage(pageView);
  }
  if (pdfjsLib.PDFJS.pdfBug && Stats.enabled && pageView.stats) {
    Stats.add(pageNumber, pageView.stats);
  }
  if (pageView.error) {
    PDFViewerApplication.error(mozL10n.get('rendering_error', null, 'An error occurred while rendering the page.'), pageView.error);
  }
}
function webViewerTextLayerRendered(e) {}
function webViewerPageMode(e) {
  var mode = e.mode,
      view;
  switch (mode) {
    case 'thumbs':
      view = SidebarView.THUMBS;
      break;
    case 'bookmarks':
    case 'outline':
      view = SidebarView.OUTLINE;
      break;
    case 'attachments':
      view = SidebarView.ATTACHMENTS;
      break;
    case 'none':
      view = SidebarView.NONE;
      break;
    default:
      console.error('Invalid "pagemode" hash parameter: ' + mode);
      return;
  }
  PDFViewerApplication.pdfSidebar.switchView(view, true);
}
function webViewerNamedAction(e) {
  var action = e.action;
  switch (action) {
    case 'GoToPage':
      PDFViewerApplication.appConfig.toolbar.pageNumber.select();
      break;
    case 'Find':
      if (!PDFViewerApplication.supportsIntegratedFind) {
        PDFViewerApplication.findBar.toggle();
      }
      break;
  }
}
function webViewerPresentationModeChanged(e) {
  var active = e.active;
  var switchInProgress = e.switchInProgress;
  PDFViewerApplication.pdfViewer.presentationModeState = switchInProgress ? PresentationModeState.CHANGING : active ? PresentationModeState.FULLSCREEN : PresentationModeState.NORMAL;
}
function webViewerSidebarViewChanged(e) {
  PDFViewerApplication.pdfRenderingQueue.isThumbnailViewEnabled = PDFViewerApplication.pdfSidebar.isThumbnailViewVisible;
  var store = PDFViewerApplication.store;
  if (!store || !PDFViewerApplication.isInitialViewSet) {
    return;
  }
  store.initializedPromise.then(function () {
    store.set('sidebarView', e.view).catch(function () {});
  });
}
function webViewerUpdateViewarea(e) {
  var location = e.location,
      store = PDFViewerApplication.store;
  if (store) {
    store.initializedPromise.then(function () {
      store.setMultiple({
        'exists': true,
        'page': location.pageNumber,
        'zoom': location.scale,
        'scrollLeft': location.left,
        'scrollTop': location.top
      }).catch(function () {});
    });
  }
  var href = PDFViewerApplication.pdfLinkService.getAnchorUrl(location.pdfOpenParams);
  PDFViewerApplication.appConfig.toolbar.viewBookmark.href = href;
  PDFViewerApplication.appConfig.secondaryToolbar.viewBookmarkButton.href = href;
  PDFViewerApplication.pdfHistory.updateCurrentBookmark(location.pdfOpenParams, location.pageNumber);
  var currentPage = PDFViewerApplication.pdfViewer.getPageView(PDFViewerApplication.page - 1);
  var loading = currentPage.renderingState !== RenderingStates.FINISHED;
  PDFViewerApplication.toolbar.updateLoadingIndicatorState(loading);
}
function webViewerResize() {
  var currentScaleValue = PDFViewerApplication.pdfViewer.currentScaleValue;
  if (currentScaleValue === 'auto' || currentScaleValue === 'page-fit' || currentScaleValue === 'page-width') {
    PDFViewerApplication.pdfViewer.currentScaleValue = currentScaleValue;
  } else if (!currentScaleValue) {
    PDFViewerApplication.pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
  }
  PDFViewerApplication.pdfViewer.update();
}
function webViewerHashchange(e) {
  if (PDFViewerApplication.pdfHistory.isHashChangeUnlocked) {
    var hash = e.hash;
    if (!hash) {
      return;
    }
    if (!PDFViewerApplication.isInitialViewSet) {
      PDFViewerApplication.initialBookmark = hash;
    } else {
      PDFViewerApplication.pdfLinkService.setHash(hash);
    }
  }
}
var webViewerFileInputChange;
webViewerFileInputChange = function webViewerFileInputChange(e) {
  var file = e.fileInput.files[0];
  if (!pdfjsLib.PDFJS.disableCreateObjectURL && typeof URL !== 'undefined' && URL.createObjectURL) {
    PDFViewerApplication.open(URL.createObjectURL(file));
  } else {
    var fileReader = new FileReader();
    fileReader.onload = function webViewerChangeFileReaderOnload(evt) {
      var buffer = evt.target.result;
      var uint8Array = new Uint8Array(buffer);
      PDFViewerApplication.open(uint8Array);
    };
    fileReader.readAsArrayBuffer(file);
  }
  PDFViewerApplication.setTitleUsingUrl(file.name);
  var appConfig = PDFViewerApplication.appConfig;
  appConfig.toolbar.viewBookmark.setAttribute('hidden', 'true');
  appConfig.secondaryToolbar.viewBookmarkButton.setAttribute('hidden', 'true');
  appConfig.toolbar.download.setAttribute('hidden', 'true');
  appConfig.secondaryToolbar.downloadButton.setAttribute('hidden', 'true');
};
function webViewerPresentationMode() {
  PDFViewerApplication.requestPresentationMode();
}
function webViewerOpenFile() {
  var openFileInputName = PDFViewerApplication.appConfig.openFileInputName;
  document.getElementById(openFileInputName).click();
}
function webViewerPrint() {
  window.print();
}
function webViewerDownload() {
  PDFViewerApplication.download();
}
function webViewerFirstPage() {
  if (PDFViewerApplication.pdfDocument) {
    PDFViewerApplication.page = 1;
  }
}
function webViewerLastPage() {
  if (PDFViewerApplication.pdfDocument) {
    PDFViewerApplication.page = PDFViewerApplication.pagesCount;
  }
}
function webViewerNextPage() {
  PDFViewerApplication.page++;
}
function webViewerPreviousPage() {
  PDFViewerApplication.page--;
}
function webViewerZoomIn() {
  PDFViewerApplication.zoomIn();
}
function webViewerZoomOut() {
  PDFViewerApplication.zoomOut();
}
function webViewerPageNumberChanged(e) {
  var pdfViewer = PDFViewerApplication.pdfViewer;
  pdfViewer.currentPageLabel = e.value;
  if (e.value !== pdfViewer.currentPageNumber.toString() && e.value !== pdfViewer.currentPageLabel) {
    PDFViewerApplication.toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
  }
}
function webViewerScaleChanged(e) {
  PDFViewerApplication.pdfViewer.currentScaleValue = e.value;
}
function webViewerRotateCw() {
  PDFViewerApplication.rotatePages(90);
}
function webViewerRotateCcw() {
  PDFViewerApplication.rotatePages(-90);
}
function webViewerDocumentProperties() {
  PDFViewerApplication.pdfDocumentProperties.open();
}
function webViewerFind(e) {
  PDFViewerApplication.findController.executeCommand('find' + e.type, {
    query: e.query,
    phraseSearch: e.phraseSearch,
    caseSensitive: e.caseSensitive,
    highlightAll: e.highlightAll,
    findPrevious: e.findPrevious
  });
}
function webViewerFindFromUrlHash(e) {
  PDFViewerApplication.findController.executeCommand('find', {
    query: e.query,
    phraseSearch: e.phraseSearch,
    caseSensitive: false,
    highlightAll: true,
    findPrevious: false
  });
}
function webViewerScaleChanging(e) {
  PDFViewerApplication.toolbar.setPageScale(e.presetValue, e.scale);
  PDFViewerApplication.pdfViewer.update();
}
function webViewerPageChanging(e) {
  var page = e.pageNumber;
  PDFViewerApplication.toolbar.setPageNumber(page, e.pageLabel || null);
  PDFViewerApplication.secondaryToolbar.setPageNumber(page);
  if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
    PDFViewerApplication.pdfThumbnailViewer.scrollThumbnailIntoView(page);
  }
  if (pdfjsLib.PDFJS.pdfBug && Stats.enabled) {
    var pageView = PDFViewerApplication.pdfViewer.getPageView(page - 1);
    if (pageView.stats) {
      Stats.add(page, pageView.stats);
    }
  }
}
var zoomDisabled = false,
    zoomDisabledTimeout;
function webViewerWheel(evt) {
  var pdfViewer = PDFViewerApplication.pdfViewer;
  if (pdfViewer.isInPresentationMode) {
    return;
  }
  if (evt.ctrlKey || evt.metaKey) {
    var support = PDFViewerApplication.supportedMouseWheelZoomModifierKeys;
    if (evt.ctrlKey && !support.ctrlKey || evt.metaKey && !support.metaKey) {
      return;
    }
    evt.preventDefault();
    if (zoomDisabled) {
      return;
    }
    var previousScale = pdfViewer.currentScale;
    var delta = normalizeWheelEventDelta(evt);
    var MOUSE_WHEEL_DELTA_PER_PAGE_SCALE = 3.0;
    var ticks = delta * MOUSE_WHEEL_DELTA_PER_PAGE_SCALE;
    if (ticks < 0) {
      PDFViewerApplication.zoomOut(-ticks);
    } else {
      PDFViewerApplication.zoomIn(ticks);
    }
    var currentScale = pdfViewer.currentScale;
    if (previousScale !== currentScale) {
      var scaleCorrectionFactor = currentScale / previousScale - 1;
      var rect = pdfViewer.container.getBoundingClientRect();
      var dx = evt.clientX - rect.left;
      var dy = evt.clientY - rect.top;
      pdfViewer.container.scrollLeft += dx * scaleCorrectionFactor;
      pdfViewer.container.scrollTop += dy * scaleCorrectionFactor;
    }
  } else {
    zoomDisabled = true;
    clearTimeout(zoomDisabledTimeout);
    zoomDisabledTimeout = setTimeout(function () {
      zoomDisabled = false;
    }, 1000);
  }
}
function webViewerClick(evt) {
  if (!PDFViewerApplication.secondaryToolbar.isOpen) {
    return;
  }
  var appConfig = PDFViewerApplication.appConfig;
  if (PDFViewerApplication.pdfViewer.containsElement(evt.target) || appConfig.toolbar.container.contains(evt.target) && evt.target !== appConfig.secondaryToolbar.toggleButton) {
    PDFViewerApplication.secondaryToolbar.close();
  }
}
function webViewerKeyDown(evt) {
  if (OverlayManager.active) {
    return;
  }
  var handled = false,
      ensureViewerFocused = false;
  var cmd = (evt.ctrlKey ? 1 : 0) | (evt.altKey ? 2 : 0) | (evt.shiftKey ? 4 : 0) | (evt.metaKey ? 8 : 0);
  var pdfViewer = PDFViewerApplication.pdfViewer;
  var isViewerInPresentationMode = pdfViewer && pdfViewer.isInPresentationMode;
  if (cmd === 1 || cmd === 8 || cmd === 5 || cmd === 12) {
    switch (evt.keyCode) {
      case 70:
        if (!PDFViewerApplication.supportsIntegratedFind) {
          PDFViewerApplication.findBar.open();
          handled = true;
        }
        break;
      case 71:
        if (!PDFViewerApplication.supportsIntegratedFind) {
          var findState = PDFViewerApplication.findController.state;
          if (findState) {
            PDFViewerApplication.findController.executeCommand('findagain', {
              query: findState.query,
              phraseSearch: findState.phraseSearch,
              caseSensitive: findState.caseSensitive,
              highlightAll: findState.highlightAll,
              findPrevious: cmd === 5 || cmd === 12
            });
          }
          handled = true;
        }
        break;
      case 61:
      case 107:
      case 187:
      case 171:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.zoomIn();
        }
        handled = true;
        break;
      case 173:
      case 109:
      case 189:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.zoomOut();
        }
        handled = true;
        break;
      case 48:
      case 96:
        if (!isViewerInPresentationMode) {
          setTimeout(function () {
            pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
          });
          handled = false;
        }
        break;
      case 38:
        if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
          PDFViewerApplication.page = 1;
          handled = true;
          ensureViewerFocused = true;
        }
        break;
      case 40:
        if (isViewerInPresentationMode || PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page = PDFViewerApplication.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        }
        break;
    }
  }
  if (cmd === 1 || cmd === 8) {
    switch (evt.keyCode) {
      case 83:
        PDFViewerApplication.download();
        handled = true;
        break;
    }
  }
  if (cmd === 3 || cmd === 10) {
    switch (evt.keyCode) {
      case 80:
        PDFViewerApplication.requestPresentationMode();
        handled = true;
        break;
      case 71:
        PDFViewerApplication.appConfig.toolbar.pageNumber.select();
        handled = true;
        break;
    }
  }
  if (handled) {
    if (ensureViewerFocused && !isViewerInPresentationMode) {
      pdfViewer.focus();
    }
    evt.preventDefault();
    return;
  }
  var curElement = document.activeElement || document.querySelector(':focus');
  var curElementTagName = curElement && curElement.tagName.toUpperCase();
  if (curElementTagName === 'INPUT' || curElementTagName === 'TEXTAREA' || curElementTagName === 'SELECT') {
    if (evt.keyCode !== 27) {
      return;
    }
  }
  if (cmd === 0) {
    switch (evt.keyCode) {
      case 38:
      case 33:
      case 8:
        if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== 'page-fit') {
          break;
        }
      case 37:
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          break;
        }
      case 75:
      case 80:
        if (PDFViewerApplication.page > 1) {
          PDFViewerApplication.page--;
        }
        handled = true;
        break;
      case 27:
        if (PDFViewerApplication.secondaryToolbar.isOpen) {
          PDFViewerApplication.secondaryToolbar.close();
          handled = true;
        }
        if (!PDFViewerApplication.supportsIntegratedFind && PDFViewerApplication.findBar.opened) {
          PDFViewerApplication.findBar.close();
          handled = true;
        }
        break;
      case 40:
      case 34:
      case 32:
        if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== 'page-fit') {
          break;
        }
      case 39:
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          break;
        }
      case 74:
      case 78:
        if (PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page++;
        }
        handled = true;
        break;
      case 36:
        if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
          PDFViewerApplication.page = 1;
          handled = true;
          ensureViewerFocused = true;
        }
        break;
      case 35:
        if (isViewerInPresentationMode || PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page = PDFViewerApplication.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        }
        break;
      case 72:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.handTool.toggle();
        }
        break;
      case 82:
        PDFViewerApplication.rotatePages(90);
        break;
    }
  }
  if (cmd === 4) {
    switch (evt.keyCode) {
      case 32:
        if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== 'page-fit') {
          break;
        }
        if (PDFViewerApplication.page > 1) {
          PDFViewerApplication.page--;
        }
        handled = true;
        break;
      case 82:
        PDFViewerApplication.rotatePages(-90);
        break;
    }
  }
  if (!handled && !isViewerInPresentationMode) {
    if (evt.keyCode >= 33 && evt.keyCode <= 40 || evt.keyCode === 32 && curElementTagName !== 'BUTTON') {
      ensureViewerFocused = true;
    }
  }
  if (cmd === 2) {
    switch (evt.keyCode) {
      case 37:
        if (isViewerInPresentationMode) {
          PDFViewerApplication.pdfHistory.back();
          handled = true;
        }
        break;
      case 39:
        if (isViewerInPresentationMode) {
          PDFViewerApplication.pdfHistory.forward();
          handled = true;
        }
        break;
    }
  }
  if (ensureViewerFocused && !pdfViewer.containsElement(curElement)) {
    pdfViewer.focus();
  }
  if (handled) {
    evt.preventDefault();
  }
}
localized.then(function webViewerLocalized() {
  document.getElementsByTagName('html')[0].dir = mozL10n.getDirection();
});
var PDFPrintServiceFactory = {
  instance: {
    supportsPrinting: false,
    createPrintService: function () {
      throw new Error('Not implemented: createPrintService');
    }
  }
};
exports.PDFViewerApplication = PDFViewerApplication;
exports.DefaultExernalServices = DefaultExernalServices;
exports.PDFPrintServiceFactory = PDFPrintServiceFactory;