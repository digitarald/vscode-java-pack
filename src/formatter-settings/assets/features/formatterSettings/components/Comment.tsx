// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import React from "react";
import { useSelector} from "react-redux";
import { JavaFormatterSetting } from "../../..";
import Setting from "./Setting";

const Comment = (): JSX.Element => {
  const settings: JavaFormatterSetting[] = useSelector((state: any) => state.formatterSettings.commentSettings);

  return (
    <div>
        <Setting setting={settings}/>
    </div>
  );
};

export default Comment;
