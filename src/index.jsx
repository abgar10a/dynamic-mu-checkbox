import ForgeUI, {render} from "@forge/ui";

import {View} from "./components/view";
import {Edit} from "./components/edit";
import {ContextConfig} from "./components/ConfigureContext";

export const runView = render(<View/>);
export const runEdit = render(<Edit/>);
export const runContextConfig = render(<ContextConfig/>);
