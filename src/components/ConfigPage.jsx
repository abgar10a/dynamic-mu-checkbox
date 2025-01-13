import ForgeUI, { AdminPage, Fragment, Text, useProductContext, useState } from "@forge/ui";
import { getCustomFieldContext } from "../utils/utils";

export const ConfigPage = () => {
    const {
        extensionContext
    } = useProductContext();
    const [customFieldContext] = useState(getCustomFieldContext(extensionContext?.fieldId));
    // let [{ configuration }] = customFieldContext;

    return (
      <AdminPage>
        <Text>{JSON.stringify(extensionContext)}</Text>
      </AdminPage>
    );
};
