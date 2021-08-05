import ForgeUI, { render } from "@forge/ui";
import { View } from "./components/View";
import { Edit } from "./components/Edit";
import { ConfigureContext } from "./components/ConfigureContext";


export const runEdit = render(<Edit />);
export const runView = render(<View />);
export const runContextualConfiguration = render(<ConfigureContext />);
