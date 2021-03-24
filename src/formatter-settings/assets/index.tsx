// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./style.scss";
import { JavaFormatterSettingPanel, JavaFormatterSettingType } from "../FormatterConstants";
import { App } from "./App";
import store from "./app/store";

export interface JavaFormatterSetting {
  name: string;
  id: string;
  type?: JavaFormatterSettingType;
  value?: string;
  defaultValue?: string;
  candidates?: string[];
  panel?: JavaFormatterSettingPanel;
  // For leaf node, children === undefined
  children?: JavaFormatterSetting[];
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("formatterPanel")
);
