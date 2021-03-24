// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React from "react";
import { useSelector } from "react-redux";
import { Highlighter } from "../utils/Highlight";

const Preview = (): JSX.Element => {
  const format: boolean = useSelector((state: any) => state.formatterSettings.format);
  const content: string = format ? useSelector((state: any) => state.formatterSettings.formattedContent) : useSelector((state: any) => state.formatterSettings.content);
  return (
    <div>
      <div className="setting-section-header mb-1">
        <h4 className="mb-0">Preview</h4>
      </div>
      <div style={{ height: "400px", overflow: "auto" }}>{Highlighter(content)}</div>
    </div>
  );
};

export default Preview;
