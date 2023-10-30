import WebKit from "gi://WebKit";
import GObject from "gi://GObject";

import Template from "./WebView.blp" with { type: "uri" };

export const WebView = GObject.registerClass(
  {
    GTypeName: "WebView",
    Template,
  },
  class WebView extends WebKit.WebView {
    constructor({ params = {} }) {
      super(params);
      this.#disableSidebar();
    }

    #disableSidebar() {
      const user_content_manager = this.get_user_content_manager();
      const stylesheet = new WebKit.UserStyleSheet(
        ".devhelp-hidden { display: none; }", // source
        WebKit.UserContentInjectedFrames.ALL_FRAMES, // injected_frames
        WebKit.UserStyleLevel.USER, // level
        null,
        null,
      );
      user_content_manager.add_style_sheet(stylesheet);
    }
  },
);