// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { format } from "bytes";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { JavaFormatterSettingPanel, previewExample } from "../../../FormatterConstants";
import { initializeBlanklineSettings, initializeCommentSettings, initializeCommonSettings, initializeNewlineSettings, initializeWhitespaceSettings, initializeWrappingSettings } from "../../utils";
import { formatCode } from "../../vscode.api";

export const formatterSettingsViewSlice = createSlice({
  name: "formatterSettings",
  initialState: {
    activePanel: JavaFormatterSettingPanel.COMMON,
    commonSettings: initializeCommonSettings(),
    whitespaceSettings: initializeWhitespaceSettings(),
    commentSettings: initializeCommentSettings(),
    wrappingSettings: initializeWrappingSettings(),
    newlineSettings: initializeNewlineSettings(),
    blanklineSettings: initializeBlanklineSettings(),
    content: previewExample.COMMON_EXAMPLE,
    formattedContent: "formatted",
    format: false,
  },
  reducers: {
    updateActivePanel: (state, action) => {
      const activePanel: JavaFormatterSettingPanel = action.payload as JavaFormatterSettingPanel;
      state.activePanel = activePanel;
      switch (activePanel) {
        case JavaFormatterSettingPanel.BLANKLINE:
          state.content = previewExample.BLANKLINE_EXAMPLE;
          break;
        case JavaFormatterSettingPanel.COMMENT:
          state.content = previewExample.COMMENT_EXAMPLE;
          break;
        case JavaFormatterSettingPanel.COMMON:
          state.content = previewExample.COMMON_EXAMPLE;
          break;
        case JavaFormatterSettingPanel.NEWLINE:
          state.content = previewExample.NEWLINE_EXAMPLE;
          break;
        case JavaFormatterSettingPanel.WHITESPACE:
          state.content = previewExample.WHITESPACE_EXAMPLE;
          break;
        case JavaFormatterSettingPanel.WRAPPING:
          state.content = previewExample.WRAPPING_EXAMPLE;
          break;
      }
      state.format = false;
    },
    sendFormatRequest: (state, action) => {
      formatCode(state.content);
    },
    receiveFormatResult: (state, action) => {
      state.formattedContent = action.payload.content;
      state.format = true;
    },
    changeCommonSettings: (state, action) => {
      for (const setting of state.commonSettings) {
        if (setting.id === action.payload.id) {
          setting.value = action.payload.value;
        }
      }
    },
  },
});

export const {
  updateActivePanel,
  sendFormatRequest,
  receiveFormatResult,
  changeCommonSettings,
} = formatterSettingsViewSlice.actions;

export default formatterSettingsViewSlice.reducer;
