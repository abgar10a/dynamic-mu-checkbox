import ForgeUI, {CustomField, render, Text} from "@forge/ui";

import {ContextConfig} from "./components/ConfigureContext";
import { View } from "./components/View";
import { Edit } from "./components/Edit";
import { ConfigPage } from "./components/ConfigPage";

export const runView = render(<View/>);
export const runEdit = render(<Edit/>);
export const runContextConfig = render(<ContextConfig/>);
export const runConfigPage = render(<ConfigPage/>)

// export const runView = render(
//     CustomField(async (fieldValue) => {
//       const selectedOptions = fieldValue?.items?.join(", ") || "No options selected";
//       return <Text>{selectedOptions}</Text>;
//     })
//   );